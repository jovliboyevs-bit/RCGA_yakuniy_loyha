from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.db.database import get_db
from backend.app.models.news import News
from backend.app.schemas.news import NewsResponse, NewsCreate

router = APIRouter()

@router.get("", response_model=List[NewsResponse])
def read_news(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    query = db.query(News)
    if category and category.lower() != "barchasi":
        query = query.filter(News.category.ilike(f"%{category}%"))
    if featured is not None:
        query = query.filter(News.is_featured == featured)
    return query.order_by(News.published_at.desc()).offset(skip).limit(limit).all()

@router.get("/{news_id}", response_model=NewsResponse)
def read_news_detail(news_id: int, db: Session = Depends(get_db)):
    item = db.query(News).filter(News.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Yangilik topilmadi")
    item.views_count += 1
    db.commit()
    db.refresh(item)
    return item

@router.post("", response_model=NewsResponse, status_code=210)
def create_news(news_in: NewsCreate, db: Session = Depends(get_db)):
    slug = news_in.title_uz.lower().replace(" ", "-")
    item = News(**news_in.dict(), slug=slug)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
