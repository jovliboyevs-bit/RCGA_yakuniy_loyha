from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NewsBase(BaseModel):
    title_uz: str
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    category: str
    excerpt_uz: Optional[str] = None
    excerpt_ru: Optional[str] = None
    excerpt_en: Optional[str] = None
    content_uz: str
    content_ru: Optional[str] = None
    content_en: Optional[str] = None
    image_url: Optional[str] = None
    author: Optional[str] = "RCGA Press Office"
    is_featured: Optional[bool] = False

class NewsCreate(NewsBase):
    pass

class NewsResponse(NewsBase):
    id: int
    slug: Optional[str] = None
    published_at: datetime
    views_count: int

    class Config:
        from_attributes = True
