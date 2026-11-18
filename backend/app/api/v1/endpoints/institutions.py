from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.db.database import get_db
from backend.app.models.institution import Institution
from backend.app.schemas.institution import InstitutionResponse, InstitutionCreate
from backend.app.core.i18n import get_language, serialize_localized

router = APIRouter()

I18N_INSTITUTION_FIELDS = ["name", "country_name", "description"]

@router.get("", response_model=List[InstitutionResponse])
def read_institutions(
    country: Optional[str] = None,
    type: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    query = db.query(Institution)
    if country:
        query = query.filter(Institution.country == country.upper())
    if type:
        query = query.filter(Institution.type.ilike(f"%{type}%"))
    items = query.offset(skip).limit(limit).all()
    return [serialize_localized(item, lang, I18N_INSTITUTION_FIELDS) for item in items]

@router.post("", response_model=InstitutionResponse, status_code=201)
def create_institution(
    inst_in: InstitutionCreate,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    inst = Institution(
        name=inst_in.name if isinstance(inst_in.name, dict) else {"uz": str(inst_in.name), "en": str(inst_in.name)},
        country_name=inst_in.country_name if isinstance(inst_in.country_name, dict) else ({"uz": str(inst_in.country_name)} if inst_in.country_name else {}),
        description=inst_in.description if isinstance(inst_in.description, dict) else ({"uz": str(inst_in.description)} if inst_in.description else {}),
        country=inst_in.country.upper(),
        type=inst_in.type or "University",
        website=inst_in.website,
        logo_url=inst_in.logo_url,
        is_partner=inst_in.is_partner if inst_in.is_partner is not None else True
    )
    db.add(inst)
    db.commit()
    db.refresh(inst)
    return serialize_localized(inst, lang, I18N_INSTITUTION_FIELDS)
