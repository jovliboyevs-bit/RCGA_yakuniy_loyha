from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError
from typing import List, Union

from backend.app.db.database import get_db
from backend.app.models.user import User, UserRole
from backend.app.schemas.user import UserCreate, UserResponse, Token, TokenRefreshRequest, MessageResponse
from backend.app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    decode_token,
    is_token_blacklisted,
    revoke_token,
)
from backend.app.core.config import settings
from backend.app.core.limiter import limiter
from backend.app.core.rbac import require_role as rbac_require_role

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Autentifikatsiya xatosi: Token yaroqsiz yoki muddati o'tgan.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(token)
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type", "access")
        jti: str = payload.get("jti")

        if user_id is None or token_type != "access" or jti is None:
            raise credentials_exception

        # Check Token Blacklist (revocation check via Redis/DB)
        if is_token_blacklisted(jti, db):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Ushbu token bekor qilingan (tizimdan chiqilgan). Qaytadan login qiling.",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Foydalanuvchi hisobi faol emas.")
    return user

def require_role(allowed_roles: Union[List[str], List[UserRole]]):
    """Dependency that checks if the authenticated user has any of the allowed roles."""
    checker = rbac_require_role(allowed_roles)
    def role_dependency(current_user: User = Depends(get_current_user)) -> User:
        return checker(current_user)
    return role_dependency

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def register_user(
    request: Request,
    user_in: UserCreate,
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.email == user_in.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ushbu email bilan foydalanuvchi allaqachon ro'yxatdan o'tgan."
        )

    hashed_pwd = get_password_hash(user_in.password)
    user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        hashed_password=hashed_pwd,
        role=user_in.role or UserRole.USER.value,
        institution_id=user_in.institution_id,
        organization=user_in.organization,
        country=user_in.country,
        orcid_id=user_in.orcid_id,
        is_verified=False,
        is_active=True
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=Token)
@limiter.limit("5/minute")
def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email yoki parol noto'g'ri."
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Foydalanuvchi hisobi faol emas."
        )

    # Issue access and refresh tokens
    access = create_access_token(subject=user.id, role=user.role)
    refresh = create_refresh_token(subject=user.id)

    return {
        "access_token": access["token"],
        "refresh_token": refresh["token"],
        "token_type": "bearer",
        "expires_in": access["expires_in"],
        "user": user
    }

@router.post("/refresh", response_model=Token)
@limiter.limit("10/minute")
def refresh_token(
    request: Request,
    body: TokenRefreshRequest,
    db: Session = Depends(get_db)
):
    try:
        payload = decode_token(body.refresh_token)
        user_id = payload.get("sub")
        token_type = payload.get("type")
        jti = payload.get("jti")

        if not user_id or token_type != "refresh" or not jti:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Yaroqsiz refresh token."
            )

        if is_token_blacklisted(jti, db):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token bekor qilingan. Qaytadan kiring."
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token muddati o'tgan yoki yaroqsiz."
        )

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Foydalanuvchi topilmadi yoki hisob faol emas."
        )

    # Revoke old refresh token (token rotation)
    revoke_token(body.refresh_token, db, user_id=user.id)

    # Issue fresh token pair
    access = create_access_token(subject=user.id, role=user.role)
    new_refresh = create_refresh_token(subject=user.id)

    return {
        "access_token": access["token"],
        "refresh_token": new_refresh["token"],
        "token_type": "bearer",
        "expires_in": access["expires_in"],
        "user": user
    }

@router.post("/logout", response_model=MessageResponse)
def logout(
    token: str = Depends(oauth2_scheme),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    revoke_token(token, db, user_id=current_user.id)
    return {"detail": "Tizimdan muvaffaqiyatli chiqildi. Token bekor qilindi."}

@router.get("/me", response_model=UserResponse)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user
