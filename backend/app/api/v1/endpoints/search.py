from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from backend.app.db.database import get_db
from backend.app.models.publication import Publication
from backend.app.models.news import News
from backend.app.models.event import Event
from backend.app.schemas.search import SearchResult

router = APIRouter()

@router.get("", response_model=SearchResult)
def global_search(
    q: str = Query(..., min_length=1, description="Search term"),
    type: Optional[str] = None, # all, publication, news, event
    db: Session = Depends(get_db)
):
    search_pattern = f"%{q}%"
    
    pubs = []
    news_list = []
    events_list = []

    if not type or type == "all" or type == "publication":
        pubs = db.query(Publication).filter(
            (Publication.title_uz.ilike(search_pattern)) |
            (Publication.authors.ilike(search_pattern)) |
            (Publication.abstract_uz.ilike(search_pattern))
        ).limit(10).all()

    if not type or type == "all" or type == "news":
        news_list = db.query(News).filter(
            (News.title_uz.ilike(search_pattern)) |
            (News.excerpt_uz.ilike(search_pattern)) |
            (News.content_uz.ilike(search_pattern))
        ).limit(10).all()

    if not type or type == "all" or type == "event":
        events_list = db.query(Event).filter(
            (Event.title_uz.ilike(search_pattern)) |
            (Event.location.ilike(search_pattern)) |
            (Event.description_uz.ilike(search_pattern))
        ).limit(10).all()

    total = len(pubs) + len(news_list) + len(events_list)

    return {
        "query": q,
        "total_matches": total,
        "publications": pubs,
        "news": news_list,
        "events": events_list
    }
