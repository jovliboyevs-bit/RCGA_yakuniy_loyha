import hashlib
import os
import uuid
from datetime import datetime, timedelta
from typing import Any, Optional, Union, Dict
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from backend.app.core.config import settings
from backend.app.models.token_blacklist import TokenBlacklist

ALGORITHM = "HS256"

# Redis client initialization (optional, fallback to DB)
_redis_client = None

def get_redis_client():
    global _redis_client
    if _redis_client is not None:
        return _redis_client
    if not settings.REDIS_URL:
        return None
    try:
        import redis
        client = redis.from_url(settings.REDIS_URL, socket_connect_timeout=1, socket_timeout=1)
        client.ping()
        _redis_client = client
        return _redis_client
    except Exception:
        return None

def get_password_hash(password: str) -> str:
    """Safe PBKDF2 HMAC SHA256 password hashing (standard & secure)"""
    salt = os.urandom(16)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return f"{salt.hex()}:{key.hex()}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        salt_hex, key_hex = hashed_password.split(':')
        salt = bytes.fromhex(salt_hex)
        expected_key = bytes.fromhex(key_hex)
        key = hashlib.pbkdf2_hmac('sha256', plain_password.encode('utf-8'), salt, 100000)
        return key == expected_key
    except Exception:
        return False

def create_access_token(
    subject: Union[str, Any],
    role: str = "USER",
    expires_delta: Optional[timedelta] = None
) -> Dict[str, Any]:
    """Generates an access token with unique jti, role, and expiration."""
    jti = str(uuid.uuid4())
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "role": str(role),
        "type": "access",
        "jti": jti,
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return {
        "token": encoded_jwt,
        "jti": jti,
        "expires_at": expire,
        "expires_in": int((expire - datetime.utcnow()).total_seconds())
    }

def create_refresh_token(
    subject: Union[str, Any],
    expires_delta: Optional[timedelta] = None
) -> Dict[str, Any]:
    """Generates a refresh token with unique jti, type=refresh, and expiration."""
    jti = str(uuid.uuid4())
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "type": "refresh",
        "jti": jti,
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return {
        "token": encoded_jwt,
        "jti": jti,
        "expires_at": expire,
        "expires_in": int((expire - datetime.utcnow()).total_seconds())
    }

def decode_token(token: str) -> Dict[str, Any]:
    """Decodes and validates a JWT token."""
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])

def is_token_blacklisted(jti: str, db: Session) -> bool:
    """Checks whether token jti is revoked in Redis or Database."""
    # 1. Check Redis first if available
    r = get_redis_client()
    if r:
        try:
            if r.exists(f"blacklist:{jti}"):
                return True
        except Exception:
            pass
    
    # 2. Check Database
    return db.query(TokenBlacklist).filter(TokenBlacklist.jti == jti).first() is not None

def revoke_token(token: str, db: Session, user_id: Optional[int] = None) -> bool:
    """Adds token to Redis and Database blacklist."""
    try:
        payload = decode_token(token)
        jti = payload.get("jti")
        token_type = payload.get("type", "access")
        exp = payload.get("exp")
        
        if not jti or not exp:
            return False
            
        expires_at = datetime.utcfromtimestamp(exp)
        now = datetime.utcnow()
        ttl_seconds = max(1, int((expires_at - now).total_seconds()))

        # 1. Save in Redis with TTL
        r = get_redis_client()
        if r:
            try:
                r.setex(f"blacklist:{jti}", ttl_seconds, "revoked")
            except Exception:
                pass

        # 2. Save in DB blacklist
        existing = db.query(TokenBlacklist).filter(TokenBlacklist.jti == jti).first()
        if not existing:
            blacklist_entry = TokenBlacklist(
                jti=jti,
                token_type=token_type,
                user_id=user_id,
                expires_at=expires_at,
                revoked_at=now
            )
            db.add(blacklist_entry)
            db.commit()
        return True
    except JWTError:
        return False
