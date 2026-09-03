from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.db.database import get_db
from backend.app.models.institution import Institution
from backend.app.schemas.institution import InstitutionResponse

router = APIRouter()

@router.get("", response_model=List[InstitutionResponse])
def read_institutions(
    country: Optional[str] = None,
    type: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    query = db.query(Institution)
    if country:
        query = query.filter(Institution.country == country.upper())
    if type:
        query = query.filter(Institution.type.ilike(f"%{type}%"))
    return query.offset(skip).limit(limit).all()
