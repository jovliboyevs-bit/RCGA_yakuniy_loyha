from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import cast, String
from typing import List, Optional
from backend.app.db.database import get_db
from backend.app.models.publication import Publication
from backend.app.schemas.publication import PublicationResponse, PublicationCreate
from backend.app.core.i18n import get_language, serialize_localized

router = APIRouter()

I18N_PUBLICATION_FIELDS = ["title", "abstract"]

@router.get("", response_model=List[PublicationResponse])
def read_publications(
    category: Optional[str] = None,
    year: Optional[int] = None,
    featured: Optional[bool] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    query = db.query(Publication)
    if category and category.lower() != "barchasi":
        query = query.filter(Publication.category.ilike(f"%{category}%"))
    if year:
        query = query.filter(Publication.published_year == year)
    if featured is not None:
        query = query.filter(Publication.is_featured == featured)
    if search:
        search_pat = f"%{search}%"
        query = query.filter(
            (cast(Publication.title, String).ilike(search_pat)) | 
            (Publication.authors.ilike(search_pat)) |
            (cast(Publication.abstract, String).ilike(search_pat))
        )
    items = query.order_by(Publication.created_at.desc()).offset(skip).limit(limit).all()
    return [serialize_localized(item, lang, I18N_PUBLICATION_FIELDS) for item in items]

@router.get("/{pub_id}", response_model=PublicationResponse)
def read_publication_detail(
    pub_id: int,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    pub = db.query(Publication).filter(Publication.id == pub_id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Nashr topilmadi")
    pub.views_count += 1
    db.commit()
    db.refresh(pub)
    return serialize_localized(pub, lang, I18N_PUBLICATION_FIELDS)

@router.post("/{pub_id}/download")
def download_publication(pub_id: int, db: Session = Depends(get_db)):
    pub = db.query(Publication).filter(Publication.id == pub_id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Nashr topilmadi")
    pub.downloads_count += 1
    db.commit()
    return {"message": "Download logged successfully", "downloads_count": pub.downloads_count}

@router.post("", response_model=PublicationResponse, status_code=201)
def create_publication(
    pub_in: PublicationCreate,
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
