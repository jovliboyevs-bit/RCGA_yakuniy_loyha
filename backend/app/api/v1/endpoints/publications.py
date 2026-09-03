from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.db.database import get_db
from backend.app.models.publication import Publication
from backend.app.schemas.publication import PublicationResponse, PublicationCreate

router = APIRouter()

@router.get("", response_model=List[PublicationResponse])
def read_publications(
    category: Optional[str] = None,
    year: Optional[int] = None,
    featured: Optional[bool] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
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
        query = query.filter(
            (Publication.title_uz.ilike(f"%{search}%")) | 
            (Publication.authors.ilike(f"%{search}%")) |
            (Publication.abstract_uz.ilike(f"%{search}%"))
        )
    return query.order_by(Publication.created_at.desc()).offset(skip).limit(limit).all()

@router.get("/{pub_id}", response_model=PublicationResponse)
def read_publication_detail(pub_id: int, db: Session = Depends(get_db)):
    pub = db.query(Publication).filter(Publication.id == pub_id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Nashr topilmadi")
    pub.views_count += 1
    db.commit()
    db.refresh(pub)
    return pub

@router.post("/{pub_id}/download")
def download_publication(pub_id: int, db: Session = Depends(get_db)):
    pub = db.query(Publication).filter(Publication.id == pub_id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Nashr topilmadi")
    pub.downloads_count += 1
    db.commit()
    return {"message": "Download logged successfully", "downloads_count": pub.downloads_count}

@router.post("", response_model=PublicationResponse)
def create_publication(pub_in: PublicationCreate, db: Session = Depends(get_db)):
    pub = Publication(**pub_in.dict())
    db.add(pub)
    db.commit()
    db.refresh(pub)
    return pub
