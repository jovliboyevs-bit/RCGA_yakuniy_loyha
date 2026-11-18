from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import cast, String
from typing import Optional
from backend.app.db.database import get_db
from backend.app.models.publication import Publication
from backend.app.models.news import News
from backend.app.models.event import Event
from backend.app.schemas.search import SearchResult
from backend.app.core.i18n import get_language, serialize_localized

router = APIRouter()

@router.get("", response_model=SearchResult)
def global_search(
    q: str = Query(..., min_length=1, description="Search term"),
    type: Optional[str] = None, # all, publication, news, event
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    search_pattern = f"%{q}%"
    
    pubs = []
    news_list = []
    events_list = []

    if not type or type == "all" or type == "publication":
        raw_pubs = db.query(Publication).filter(
            (cast(Publication.title, String).ilike(search_pattern)) |
            (Publication.authors.ilike(search_pattern)) |
            (cast(Publication.abstract, String).ilike(search_pattern))
        ).limit(10).all()
        pubs = [serialize_localized(p, lang, ["title", "abstract"]) for p in raw_pubs]

    if not type or type == "all" or type == "news":
        raw_news = db.query(News).filter(
            (cast(News.title, String).ilike(search_pattern)) |
            (cast(News.excerpt, String).ilike(search_pattern)) |
            (cast(News.content, String).ilike(search_pattern))
        ).limit(10).all()
        news_list = [serialize_localized(n, lang, ["title", "excerpt", "content"]) for n in raw_news]

    if not type or type == "all" or type == "event":
        raw_events = db.query(Event).filter(
            (cast(Event.title, String).ilike(search_pattern)) |
            (Event.location.ilike(search_pattern)) |
            (cast(Event.description, String).ilike(search_pattern))
        ).limit(10).all()
        events_list = [serialize_localized(e, lang, ["title", "description"]) for e in raw_events]

    total = len(pubs) + len(news_list) + len(events_list)

    return {
        "query": q,
        "total_matches": total,
        "publications": pubs,
        "news": news_list,
        "events": events_list
    }
