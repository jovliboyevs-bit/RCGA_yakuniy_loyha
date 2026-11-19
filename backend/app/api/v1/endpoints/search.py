from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import cast, String
from typing import Optional
from backend.app.db.database import get_db
from backend.app.models.publication import Publication
from backend.app.models.news import News
from backend.app.models.event import Event
from backend.app.models.institution import Institution
from backend.app.schemas.search import SearchResult
from backend.app.core.i18n import get_language, serialize_localized

router = APIRouter()

@router.get("", response_model=SearchResult, summary="Global search across portal content")
def global_search(
    q: str = Query(..., min_length=1, description="Qidiruv so'zi"),
    type: Optional[str] = Query(None, description="Turi: all, publication, news, event, institution"),
    country: Optional[str] = Query(None, description="CAREC davlati kodi"),
    category: Optional[str] = Query(None, description="Kategoriya"),
    limit: int = Query(10, ge=1, le=50, description="Har bir toifa uchun maksimal natijalar soni"),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    search_pattern = f"%{q}%"
    
    pubs = []
    news_list = []
    events_list = []
    institutions_list = []

    # 1. Publications
    if not type or type in ["all", "publication", "publications"]:
        pub_q = db.query(Publication).filter(
            (cast(Publication.title, String).ilike(search_pattern)) |
            (Publication.authors.ilike(search_pattern)) |
            (cast(Publication.abstract, String).ilike(search_pattern)) |
            (Publication.doi.ilike(search_pattern))
        )
        if category and category.lower() not in ["barchasi", "all"]:
            pub_q = pub_q.filter(Publication.category.ilike(f"%{category}%"))
        if country and country.lower() not in ["barchasi", "all"]:
            pub_q = pub_q.filter(Publication.authors.ilike(f"%{country}%"))
        raw_pubs = pub_q.order_by(Publication.created_at.desc()).limit(limit).all()
        pubs = [serialize_localized(p, lang, ["title", "abstract"]) for p in raw_pubs]

    # 2. News
    if not type or type in ["all", "news"]:
        news_q = db.query(News).filter(
            (cast(News.title, String).ilike(search_pattern)) |
            (cast(News.excerpt, String).ilike(search_pattern)) |
            (cast(News.content, String).ilike(search_pattern)) |
            (News.author.ilike(search_pattern))
        )
        if category and category.lower() not in ["barchasi", "all"]:
            news_q = news_q.filter(News.category.ilike(f"%{category}%"))
        if country and country.lower() not in ["barchasi", "all"]:
            news_q = news_q.filter(
                (cast(News.title, String).ilike(f"%{country}%")) |
                (cast(News.content, String).ilike(f"%{country}%"))
            )
        raw_news = news_q.order_by(News.published_at.desc()).limit(limit).all()
        news_list = [serialize_localized(n, lang, ["title", "excerpt", "content"]) for n in raw_news]

    # 3. Events
    if not type or type in ["all", "event", "events"]:
        event_q = db.query(Event).filter(
            (cast(Event.title, String).ilike(search_pattern)) |
            (Event.location.ilike(search_pattern)) |
            (cast(Event.description, String).ilike(search_pattern)) |
            (Event.organizer.ilike(search_pattern))
        )
        if category and category.lower() not in ["barchasi", "all"]:
            event_q = event_q.filter(Event.category.ilike(f"%{category}%"))
        if country and country.lower() not in ["barchasi", "all"]:
            event_q = event_q.filter(Event.location.ilike(f"%{country}%"))
        raw_events = event_q.order_by(Event.event_date.asc()).limit(limit).all()
        events_list = [serialize_localized(e, lang, ["title", "description"]) for e in raw_events]

    # 4. Institutions
    if not type or type in ["all", "institution", "institutions"]:
        inst_q = db.query(Institution).filter(
            (cast(Institution.name, String).ilike(search_pattern)) |
            (cast(Institution.country_name, String).ilike(search_pattern)) |
            (cast(Institution.description, String).ilike(search_pattern)) |
            (Institution.type.ilike(search_pattern))
        )
        if country and country.lower() not in ["barchasi", "all"]:
            inst_q = inst_q.filter(Institution.country == country.upper())
        raw_institutions = inst_q.limit(limit).all()
        institutions_list = [serialize_localized(i, lang, ["name", "country_name", "description"]) for i in raw_institutions]

    total = len(pubs) + len(news_list) + len(events_list) + len(institutions_list)

    return {
        "query": q,
        "total_matches": total,
        "publications": pubs,
        "news": news_list,
        "events": events_list,
        "institutions": institutions_list
    }
