from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import cast, String
from typing import List, Optional

from backend.app.db.database import get_db
from backend.app.models.publication import Publication
from backend.app.models.user import User, UserRole
from backend.app.schemas.publication import (
    PublicationResponse,
    PublicationCreate,
    PublicationUpdate,
    PaginatedPublicationResponse
)
from backend.app.core.i18n import get_language, serialize_localized
from backend.app.core.pagination import apply_date_filter, apply_sorting, paginate_query
from backend.app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

I18N_PUBLICATION_FIELDS = ["title", "abstract"]

ALLOWED_SORT_FIELDS = {
    "created_at": Publication.created_at,
    "date": Publication.created_at,
    "published_year": Publication.published_year,
    "year": Publication.published_year,
    "views_count": Publication.views_count,
    "views": Publication.views_count,
    "downloads_count": Publication.downloads_count,
    "downloads": Publication.downloads_count,
    "citations_count": Publication.citations_count,
    "citations": Publication.citations_count,
    "id": Publication.id,
    "category": Publication.category,
}

def require_publication_creator(current_user: User = Depends(get_current_user)) -> User:
    role = str(current_user.role).upper().replace(" ", "").replace("_", "")
    allowed = {
        UserRole.SUPERADMIN.value,
        UserRole.MODERATOR.value,
        UserRole.RESEARCHER.value,
        "SUPERADMIN",
        "MODERATOR",
        "RESEARCHER",
        "CONTENTEDITOR"
    }
    if role not in allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Nashrlarni qo'shish yoki tahrirlash uchun Tadqiqotchi, Moderator yoki Admin huquqi talab qilinadi."
        )
    return current_user

def require_publication_deleter(current_user: User = Depends(get_current_user)) -> User:
    role = str(current_user.role).upper().replace(" ", "").replace("_", "")
    allowed = {UserRole.SUPERADMIN.value, UserRole.MODERATOR.value, "SUPERADMIN", "MODERATOR"}
    if role not in allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Nashrlarni o'chirish uchun Moderator yoki Superadmin huquqi talab qilinadi."
        )
    return current_user

@router.get("", response_model=PaginatedPublicationResponse, summary="List publications with pagination, sorting and filtering")
def read_publications(
    page: int = Query(1, ge=1, description="Sahifa raqami"),
    size: int = Query(20, ge=1, le=100, description="Har sahifadagi nashrlar soni"),
    category: Optional[str] = Query(None, description="Kategoriya: Iqlim, Tuproq, Suv, Agro-biotexnologiya va boshqalar"),
    country: Optional[str] = Query(None, description="CAREC davlati bo'yicha filtr"),
    date_from: Optional[str] = Query(None, description="Boshlanish sanasi (YYYY-MM-DD)"),
    date_to: Optional[str] = Query(None, description="Tugash sanasi (YYYY-MM-DD)"),
    year: Optional[int] = Query(None, description="Nashr qilingan yil (masalan, 2026)"),
    featured: Optional[bool] = Query(None, description="Tanlangan (featured) nashrlar"),
    search: Optional[str] = Query(None, description="Sarlavha, mualliflar yoki annotatsiyada qidirish"),
    q: Optional[str] = Query(None, description="Umumiy qidiruv so'zi"),
    sort_by: Optional[str] = Query("-created_at", description="Saralash: -created_at, published_year, downloads_count, views_count"),
    skip: Optional[int] = Query(None, ge=0, description="Legacy pagination: skip"),
    limit: Optional[int] = Query(None, ge=1, le=100, description="Legacy pagination: limit"),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    query = db.query(Publication)

    # Category filter
    if category and category.lower() not in ["barchasi", "all"]:
        query = query.filter(Publication.category.ilike(f"%{category}%"))

    # Year filter
    if year:
        query = query.filter(Publication.published_year == year)

    # Featured filter
    if featured is not None:
        query = query.filter(Publication.is_featured == featured)

    # Country filter
    if country and country.lower() not in ["barchasi", "all"]:
        pat = f"%{country}%"
        query = query.filter(
            (Publication.authors.ilike(pat)) |
            (cast(Publication.title, String).ilike(pat)) |
            (cast(Publication.abstract, String).ilike(pat))
        )

    # Date range filter on created_at
    query = apply_date_filter(query, Publication.created_at, date_from, date_to)

    # Search filter (either 'search' or 'q')
    search_term = search or q
    if search_term:
        search_pat = f"%{search_term}%"
        query = query.filter(
            (cast(Publication.title, String).ilike(search_pat)) | 
            (Publication.authors.ilike(search_pat)) |
            (cast(Publication.abstract, String).ilike(search_pat)) |
            (Publication.category.ilike(search_pat)) |
            (Publication.doi.ilike(search_pat))
        )

    # Sorting
    query = apply_sorting(query, sort_by, ALLOWED_SORT_FIELDS, Publication.created_at, default_order="desc")

    # Pagination
    paged_query, meta = paginate_query(query, page=page, size=size, skip=skip, limit=limit)
    items = paged_query.all()

    return {
        "items": [serialize_localized(item, lang, I18N_PUBLICATION_FIELDS) for item in items],
        "total": meta["total"],
        "page": meta["page"],
        "size": meta["size"],
        "pages": meta["pages"]
    }

@router.get("/{pub_id}", response_model=PublicationResponse, summary="Get publication detail")
def read_publication_detail(
    pub_id: int,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    pub = db.query(Publication).filter(Publication.id == pub_id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Nashr topilmadi")
    pub.views_count = (pub.views_count or 0) + 1
    db.commit()
    db.refresh(pub)
    return serialize_localized(pub, lang, I18N_PUBLICATION_FIELDS)

@router.post("", response_model=PublicationResponse, status_code=201, summary="Create publication")
def create_publication(
    pub_in: PublicationCreate,
    current_user: User = Depends(require_publication_creator),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    pub = Publication(
        title=pub_in.title if isinstance(pub_in.title, dict) else {"uz": str(pub_in.title)},
        abstract=pub_in.abstract if isinstance(pub_in.abstract, dict) else ({"uz": str(pub_in.abstract)} if pub_in.abstract else {}),
        category=pub_in.category,
        authors=pub_in.authors,
        doi=pub_in.doi,
        file_url=pub_in.file_url,
        cover_image=pub_in.cover_image,
        published_year=pub_in.published_year or 2026,
        is_featured=pub_in.is_featured or False
    )
    db.add(pub)
    db.commit()
    db.refresh(pub)
    return serialize_localized(pub, lang, I18N_PUBLICATION_FIELDS)

@router.put("/{pub_id}", response_model=PublicationResponse, summary="Update publication")
def update_publication(
    pub_id: int,
    pub_in: PublicationUpdate,
    current_user: User = Depends(require_publication_creator),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    pub = db.query(Publication).filter(Publication.id == pub_id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Nashr topilmadi")

    if pub_in.category is not None:
        pub.category = pub_in.category
    if pub_in.authors is not None:
        pub.authors = pub_in.authors
    if pub_in.doi is not None:
        pub.doi = pub_in.doi
    if pub_in.file_url is not None:
        pub.file_url = pub_in.file_url
    if pub_in.cover_image is not None:
        pub.cover_image = pub_in.cover_image
    if pub_in.published_year is not None:
        pub.published_year = pub_in.published_year
    if pub_in.is_featured is not None:
        pub.is_featured = pub_in.is_featured

    if pub_in.title is not None:
        if isinstance(pub_in.title, dict):
            new_title = dict(pub.title or {})
            new_title.update(pub_in.title)
            pub.title = new_title
        else:
            new_title = dict(pub.title or {})
            new_title["uz"] = str(pub_in.title)
            pub.title = new_title

    if pub_in.abstract is not None:
        if isinstance(pub_in.abstract, dict):
            new_abs = dict(pub.abstract or {})
            new_abs.update(pub_in.abstract)
            pub.abstract = new_abs
        else:
            new_abs = dict(pub.abstract or {})
            new_abs["uz"] = str(pub_in.abstract)
            pub.abstract = new_abs

    db.commit()
    db.refresh(pub)
    return serialize_localized(pub, lang, I18N_PUBLICATION_FIELDS)

@router.delete("/{pub_id}", summary="Delete publication")
def delete_publication(
    pub_id: int,
    current_user: User = Depends(require_publication_deleter),
    db: Session = Depends(get_db)
):
    pub = db.query(Publication).filter(Publication.id == pub_id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Nashr topilmadi")
    db.delete(pub)
    db.commit()
    return {"message": "Nashr muvaffaqiyatli o'chirildi", "id": pub_id}

@router.post("/{pub_id}/download", summary="Log publication download")
def download_publication(pub_id: int, db: Session = Depends(get_db)):
    pub = db.query(Publication).filter(Publication.id == pub_id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Nashr topilmadi")
    pub.downloads_count = (pub.downloads_count or 0) + 1
    db.commit()
    return {"message": "Download logged successfully", "downloads_count": pub.downloads_count}
