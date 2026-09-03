from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PublicationBase(BaseModel):
    title_uz: str
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    category: str
    abstract_uz: Optional[str] = None
    abstract_ru: Optional[str] = None
    abstract_en: Optional[str] = None
    authors: str
    doi: Optional[str] = None
    file_url: Optional[str] = None
    cover_image: Optional[str] = None
    published_year: Optional[int] = 2026
    is_featured: Optional[bool] = False

class PublicationCreate(PublicationBase):
    pass

class PublicationResponse(PublicationBase):
    id: int
    downloads_count: int
    views_count: int
    citations_count: int
    created_at: datetime

    class Config:
        from_attributes = True
