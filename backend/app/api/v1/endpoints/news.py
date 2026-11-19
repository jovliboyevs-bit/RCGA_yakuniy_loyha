from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import cast, String
from typing import List, Optional
from datetime import datetime

from backend.app.db.database import get_db
from backend.app.models.news import News
from backend.app.models.user import User, UserRole
from backend.app.schemas.news import (
    NewsResponse,
    NewsCreate,
    NewsUpdate,
    PaginatedNewsResponse
)
from backend.app.core.i18n import get_language, serialize_localized, get_localized_text
from backend.app.core.pagination import apply_date_filter, apply_sorting, paginate_query
from backend.app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

I18N_NEWS_FIELDS = ["title", "excerpt", "content"]

ALLOWED_SORT_FIELDS = {
    "published_at": News.published_at,
    "date": News.published_at,
    "created_at": News.published_at,
    "views_count": News.views_count,
    "views": News.views_count,
    "id": News.id,
    "category": News.category
}

def require_news_editor(current_user: User = Depends(get_current_user)) -> User:
    role = str(current_user.role).upper().replace(" ", "").replace("_", "")
    allowed = {UserRole.SUPERADMIN.value, UserRole.MODERATOR.value, "SUPERADMIN", "MODERATOR", "CONTENTEDITOR"}
    if role not in allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Yangiliklarni boshqarish uchun ruxsat yetarli emas."
        )
    return current_user

@router.get("", response_model=PaginatedNewsResponse, summary="List news with pagination, sorting and filtering")
def read_news(
    page: int = Query(1, ge=1, description="Sahifa raqami"),
    size: int = Query(20, ge=1, le=100, description="Har sahifadagi yangiliklar soni"),
    category: Optional[str] = Query(None, description="Kategoriya (masalan, Iqlim, Texnologiya)"),
    country: Optional[str] = Query(None, description="CAREC davlati kodi yoki nomi"),
    date_from: Optional[str] = Query(None, description="Boshlanish sanasi (YYYY-MM-DD)"),
    date_to: Optional[str] = Query(None, description="Tugash sanasi (YYYY-MM-DD)"),
    sort_by: Optional[str] = Query("-published_at", description="Saralash ustuni: -published_at, views_count, id"),
    featured: Optional[bool] = Query(None, description="Asosiy (featured) yangiliklar"),
    q: Optional[str] = Query(None, description="Kalit so'z bo'yicha qidirish"),
    skip: Optional[int] = Query(None, ge=0, description="Legacy pagination: skip"),
    limit: Optional[int] = Query(None, ge=1, le=100, description="Legacy pagination: limit"),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    query = db.query(News)

    # Filtering by category
    if category and category.lower() not in ["barchasi", "all"]:
        query = query.filter(News.category.ilike(f"%{category}%"))

    # Filtering by featured
    if featured is not None:
        query = query.filter(News.is_featured == featured)

    # Filtering by country in title or content
    if country and country.lower() not in ["barchasi", "all"]:
        pat = f"%{country}%"
        query = query.filter(
            (cast(News.title, String).ilike(pat)) |
            (cast(News.content, String).ilike(pat)) |
            (cast(News.excerpt, String).ilike(pat))
        )

    # Filtering by date range
    query = apply_date_filter(query, News.published_at, date_from, date_to)

    # Text search
    if q:
        q_pat = f"%{q}%"
        query = query.filter(
            (cast(News.title, String).ilike(q_pat)) |
            (cast(News.excerpt, String).ilike(q_pat)) |
            (cast(News.content, String).ilike(q_pat)) |
            (News.author.ilike(q_pat))
        )

    # Sorting
    query = apply_sorting(query, sort_by, ALLOWED_SORT_FIELDS, News.published_at, default_order="desc")

    # Pagination
    paged_query, meta = paginate_query(query, page=page, size=size, skip=skip, limit=limit)
    items = paged_query.all()

    return {
        "items": [serialize_localized(item, lang, I18N_NEWS_FIELDS) for item in items],
        "total": meta["total"],
        "page": meta["page"],
        "size": meta["size"],
        "pages": meta["pages"]
    }

@router.get("/{news_id}", response_model=NewsResponse, summary="Get news detail")
def read_news_detail(
    news_id: int,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    item = db.query(News).filter(News.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Yangilik topilmadi")
    item.views_count = (item.views_count or 0) + 1
    db.commit()
    db.refresh(item)
    return serialize_localized(item, lang, I18N_NEWS_FIELDS)

@router.post("", response_model=NewsResponse, status_code=201, summary="Create news")
def create_news(
    news_in: NewsCreate,
    current_user: User = Depends(require_news_editor),
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
        author=news_in.author or current_user.full_name or "RCGA Press Office",
        is_featured=news_in.is_featured or False,
        slug=slug
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return serialize_localized(item, lang, I18N_NEWS_FIELDS)

@router.put("/{news_id}", response_model=NewsResponse, summary="Update news")
def update_news(
    news_id: int,
    news_in: NewsUpdate,
    current_user: User = Depends(require_news_editor),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    item = db.query(News).filter(News.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Yangilik topilmadi")

    if news_in.category is not None:
        item.category = news_in.category
    if news_in.image_url is not None:
        item.image_url = news_in.image_url
    if news_in.author is not None:
        item.author = news_in.author
    if news_in.is_featured is not None:
        item.is_featured = news_in.is_featured

    # Update multilingual title
    if news_in.title is not None:
        if isinstance(news_in.title, dict):
            new_title = dict(item.title or {})
            new_title.update(news_in.title)
            item.title = new_title
        else:
            new_title = dict(item.title or {})
            new_title["uz"] = str(news_in.title)
            item.title = new_title

    # Update multilingual excerpt
    if news_in.excerpt is not None:
        if isinstance(news_in.excerpt, dict):
            new_exc = dict(item.excerpt or {})
            new_exc.update(news_in.excerpt)
            item.excerpt = new_exc
        else:
            new_exc = dict(item.excerpt or {})
            new_exc["uz"] = str(news_in.excerpt)
            item.excerpt = new_exc

    # Update multilingual content
    if news_in.content is not None:
        if isinstance(news_in.content, dict):
            new_cnt = dict(item.content or {})
            new_cnt.update(news_in.content)
            item.content = new_cnt
        else:
            new_cnt = dict(item.content or {})
            new_cnt["uz"] = str(news_in.content)
            item.content = new_cnt

    db.commit()
    db.refresh(item)
    return serialize_localized(item, lang, I18N_NEWS_FIELDS)

@router.delete("/{news_id}", summary="Delete news")
def delete_news(
    news_id: int,
    current_user: User = Depends(require_news_editor),
    db: Session = Depends(get_db)
):
    item = db.query(News).filter(News.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Yangilik topilmadi")
    db.delete(item)
    db.commit()
    return {"message": "Yangilik muvaffaqiyatli o'chirildi", "id": news_id}
