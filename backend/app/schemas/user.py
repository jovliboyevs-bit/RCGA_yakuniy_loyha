import re
from typing import Optional, List, Union
from datetime import datetime
from pydantic import BaseModel, EmailStr, field_validator
from backend.app.models.user import UserRole, CAREC_COUNTRIES
from backend.app.schemas.pagination import PaginatedResponse

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: Optional[str] = UserRole.USER.value
    institution_id: Optional[int] = None
    organization: Optional[str] = None
    country: Optional[str] = None
    orcid_id: Optional[str] = None

    @field_validator("country")
    @classmethod
    def validate_country(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v.strip():
            v_upper = v.strip().upper()
            if v_upper not in CAREC_COUNTRIES:
                raise ValueError(f"Mamlakat kodi CAREC davlatlariga mos bo'lishi kerak: {', '.join(CAREC_COUNTRIES)}")
            return v_upper
        return v

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v.strip():
            v_clean = v.strip().upper()
            valid_roles = [r.value for r in UserRole]
            if v_clean not in valid_roles:
                mapping = {
                    "SUPER ADMIN": "SUPERADMIN",
                    "CONTENT EDITOR": "MODERATOR",
                    "GUEST": "USER"
                }
                v_clean = mapping.get(v_clean, v_clean)
                if v_clean not in valid_roles:
                    raise ValueError(f"Yaroqsiz rol. Ruxsat etilgan rollar: {', '.join(valid_roles)}")
            return v_clean
        return UserRole.USER.value

class UserCreate(UserBase):
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Parol kamida 8 ta belgidan iborat bo'lishi kerak.")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Parolda kamida bitta katta harf (A-Z) bo'lishi kerak.")
        if not re.search(r"[a-z]", v):
            raise ValueError("Parolda kamida bitta kichik harf (a-z) bo'lishi kerak.")
        if not re.search(r"\d", v):
            raise ValueError("Parolda kamida bitta raqam (0-9) bo'lishi kerak.")
        if not re.search(r"[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?~`]", v):
            raise ValueError("Parolda kamida bitta maxsus belgi (!@#$%^&*...) bo'lishi kerak.")
        return v

class UserResponse(UserBase):
    id: int
    is_verified: bool
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse

class TokenRefreshRequest(BaseModel):
    refresh_token: str

class MessageResponse(BaseModel):
    detail: str

class PaginatedUserResponse(PaginatedResponse[UserResponse]):
    pass
