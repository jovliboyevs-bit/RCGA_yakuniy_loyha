from typing import List, Union
from fastapi import Depends, HTTPException, status
from backend.app.models.user import User, UserRole

def require_role(allowed_roles: Union[List[str], List[UserRole]]):
    """
    FastAPI dependency factory enforcing Role-Based Access Control (RBAC).
    Usage:
        @router.get("/protected", dependencies=[Depends(require_role(["SUPERADMIN", "MODERATOR"]))])
    """
    normalized_allowed = [
        r.value if isinstance(r, UserRole) else str(r).upper().replace(" ", "")
        for r in allowed_roles
    ]

    def role_checker(current_user: User) -> User:
        user_role = str(current_user.role).upper().replace(" ", "")
        
        # SUPERADMIN always has top-level bypass
        if user_role == UserRole.SUPERADMIN.value or user_role in normalized_allowed:
            return current_user

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Ushbu amal uchun ruxsat yo'q. Talab qilinadigan rollar: {', '.join(normalized_allowed)}"
        )
    return role_checker

# Pre-defined convenience dependencies
require_superadmin = require_role([UserRole.SUPERADMIN])
require_moderator = require_role([UserRole.SUPERADMIN, UserRole.MODERATOR])
require_researcher = require_role([UserRole.SUPERADMIN, UserRole.MODERATOR, UserRole.RESEARCHER])
require_farmer = require_role([UserRole.SUPERADMIN, UserRole.FARMER])

