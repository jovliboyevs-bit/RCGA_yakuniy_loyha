from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import cast, String
from typing import List, Optional

from backend.app.db.database import get_db
from backend.app.models.institution import Institution
from backend.app.models.user import User, UserRole
from backend.app.schemas.institution import (
    InstitutionResponse,
    InstitutionCreate,
    InstitutionUpdate,
    PaginatedInstitutionResponse
)
from backend.app.core.i18n import get_language, serialize_localized
from backend.app.core.pagination import apply_sorting, paginate_query
from backend.app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

I18N_INSTITUTION_FIELDS = ["name", "country_name", "description"]

ALLOWED_SORT_FIELDS = {
    "id": Institution.id,
    "country": Institution.country,
    "type": Institution.type,
    "is_partner": Institution.is_partner,
}

def require_institution_editor(current_user: User = Depends(get_current_user)) -> User:
    role = str(current_user.role).upper().replace(" ", "").replace("_", "")
    allowed = {UserRole.SUPERADMIN.value, UserRole.MODERATOR.value, "SUPERADMIN", "MODERATOR", "CONTENTEDITOR"}
    if role not in allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Tashkilotlarni boshqarish uchun ruxsat yetarli emas."
        )
    return current_user

@router.get("", response_model=PaginatedInstitutionResponse, summary="List institutions with pagination, sorting and filtering")
def read_institutions(
    page: int = Query(1, ge=1, description="Sahifa raqami"),
    size: int = Query(50, ge=1, le=100, description="Har sahifadagi tashkilotlar soni"),
    country: Optional[str] = Query(None, description="CAREC davlat kodi: UZ, KZ, KG, TJ, TM, AF, AZ, GE, PK, MN, CN"),
    category: Optional[str] = Query(None, description="Tashkilot toifasi/turi (University, Research Institute...)"),
    type: Optional[str] = Query(None, description="Tashkilot turi"),
    is_partner: Optional[bool] = Query(None, description="Hamkorlik holati"),
    sort_by: Optional[str] = Query("id", description="Saralash: id, country, type"),
    q: Optional[str] = Query(None, description="Tashkilot nomi yoki tavsifida qidirish"),
    skip: Optional[int] = Query(None, ge=0, description="Legacy pagination: skip"),
    limit: Optional[int] = Query(None, ge=1, le=100, description="Legacy pagination: limit"),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    query = db.query(Institution)

    # Country filter
    if country and country.lower() not in ["barchasi", "all"]:
        query = query.filter(Institution.country == country.upper())

    # Type / category filter
    inst_type = type or category
    if inst_type and inst_type.lower() not in ["barchasi", "all"]:
        query = query.filter(Institution.type.ilike(f"%{inst_type}%"))

    # Partner filter
    if is_partner is not None:
        query = query.filter(Institution.is_partner == is_partner)

    # Text search
    if q:
        q_pat = f"%{q}%"
        query = query.filter(
            (cast(Institution.name, String).ilike(q_pat)) |
            (cast(Institution.country_name, String).ilike(q_pat)) |
            (cast(Institution.description, String).ilike(q_pat)) |
            (Institution.website.ilike(q_pat))
        )

    # Sorting
    query = apply_sorting(query, sort_by, ALLOWED_SORT_FIELDS, Institution.id, default_order="asc")

    # Pagination
    paged_query, meta = paginate_query(query, page=page, size=size, skip=skip, limit=limit)
    items = paged_query.all()

    return {
        "items": [serialize_localized(item, lang, I18N_INSTITUTION_FIELDS) for item in items],
        "total": meta["total"],
        "page": meta["page"],
        "size": meta["size"],
        "pages": meta["pages"]
    }

@router.get("/{inst_id}", response_model=InstitutionResponse, summary="Get institution detail")
def read_institution_detail(
    inst_id: int,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    item = db.query(Institution).filter(Institution.id == inst_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Tashkilot topilmadi")
    return serialize_localized(item, lang, I18N_INSTITUTION_FIELDS)

@router.post("", response_model=InstitutionResponse, status_code=201, summary="Create institution")
def create_institution(
    inst_in: InstitutionCreate,
    current_user: User = Depends(require_institution_editor),
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

@router.put("/{inst_id}", response_model=InstitutionResponse, summary="Update institution")
def update_institution(
    inst_id: int,
    inst_in: InstitutionUpdate,
    current_user: User = Depends(require_institution_editor),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    inst = db.query(Institution).filter(Institution.id == inst_id).first()
    if not inst:
        raise HTTPException(status_code=404, detail="Tashkilot topilmadi")

    if inst_in.country is not None:
        inst.country = inst_in.country.upper()
    if inst_in.type is not None:
        inst.type = inst_in.type
    if inst_in.website is not None:
        inst.website = inst_in.website
    if inst_in.logo_url is not None:
        inst.logo_url = inst_in.logo_url
    if inst_in.is_partner is not None:
        inst.is_partner = inst_in.is_partner

    if inst_in.name is not None:
        if isinstance(inst_in.name, dict):
            new_name = dict(inst.name or {})
            new_name.update(inst_in.name)
            inst.name = new_name
        else:
            new_name = dict(inst.name or {})
            new_name["uz"] = str(inst_in.name)
            inst.name = new_name

    if inst_in.country_name is not None:
        if isinstance(inst_in.country_name, dict):
            new_c = dict(inst.country_name or {})
            new_c.update(inst_in.country_name)
            inst.country_name = new_c
        else:
            new_c = dict(inst.country_name or {})
            new_c["uz"] = str(inst_in.country_name)
            inst.country_name = new_c

    if inst_in.description is not None:
        if isinstance(inst_in.description, dict):
            new_desc = dict(inst.description or {})
            new_desc.update(inst_in.description)
            inst.description = new_desc
        else:
            new_desc = dict(inst.description or {})
            new_desc["uz"] = str(inst_in.description)
            inst.description = new_desc

    db.commit()
    db.refresh(inst)
    return serialize_localized(inst, lang, I18N_INSTITUTION_FIELDS)

@router.delete("/{inst_id}", summary="Delete institution")
def delete_institution(
    inst_id: int,
    current_user: User = Depends(require_institution_editor),
    db: Session = Depends(get_db)
):
    inst = db.query(Institution).filter(Institution.id == inst_id).first()
    if not inst:
        raise HTTPException(status_code=404, detail="Tashkilot topilmadi")
    db.delete(inst)
    db.commit()
    return {"message": "Tashkilot muvaffaqiyatli o'chirildi", "id": inst_id}
