from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.db.database import get_db
from backend.app.models.news import News
from backend.app.schemas.news import NewsResponse, NewsCreate
from backend.app.core.i18n import get_language, serialize_localized, get_localized_text

router = APIRouter()

I18N_NEWS_FIELDS = ["title", "excerpt", "content"]

@router.get("", response_model=List[NewsResponse])
def read_news(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    skip: int = 0,
    limit: int = 20,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    query = db.query(News)
    if category and category.lower() != "barchasi":
        query = query.filter(News.category.ilike(f"%{category}%"))
    if featured is not None:
        query = query.filter(News.is_featured == featured)
    items = query.order_by(News.published_at.desc()).offset(skip).limit(limit).all()
    return [serialize_localized(item, lang, I18N_NEWS_FIELDS) for item in items]

@router.get("/{news_id}", response_model=NewsResponse)
def read_news_detail(
    news_id: int,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    item = db.query(News).filter(News.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Yangilik topilmadi")
    item.views_count += 1
    db.commit()
    db.refresh(item)
    return serialize_localized(item, lang, I18N_NEWS_FIELDS)

@router.post("", response_model=NewsResponse, status_code=201)
def create_news(
    news_in: NewsCreate,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    title_text = get_localized_text(news_in.title, "uz") or get_localized_text(news_in.title, "en") or "news"
    slug = title_text.lower().replace(" ", "-")[:80]

    item = News(
        title=news_in.title if isinstance(news_in.title, dict) else {"uz": str(news_in.title)},
        excerpt=news_in.excerpt if isinstance(news_in.excerpt, dict) else ({"uz": str(news_in.excerpt)} if news_in.excerpt else {}),
        content=news_in.content if isinstance(news_in.content, dict) else {"uz": str(news_in.content)},
        category=news_in.category,
        image_url=news_in.image_url,
        author=news_in.author or "RCGA Press Office",
        is_featured=news_in.is_featured or False,
        slug=slug
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return serialize_localized(item, lang, I18N_NEWS_FIELDS)
