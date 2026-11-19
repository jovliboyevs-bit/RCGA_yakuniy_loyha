from pydantic import BaseModel
from typing import List, Optional, Any
from backend.app.schemas.publication import PublicationResponse
from backend.app.schemas.news import NewsResponse
from backend.app.schemas.event import EventResponse
from backend.app.schemas.institution import InstitutionResponse

class SearchResult(BaseModel):
    query: str
    total_matches: int
    publications: List[PublicationResponse] = []
    news: List[NewsResponse] = []
    events: List[EventResponse] = []
    institutions: Optional[List[InstitutionResponse]] = []

class StatsResponse(BaseModel):
    countries_count: int = 8
    publications_count: int = 1240
    institutions_count: int = 86
    active_users: int = 5400
