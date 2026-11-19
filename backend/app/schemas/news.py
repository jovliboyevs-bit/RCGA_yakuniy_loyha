from pydantic import BaseModel, model_validator
from typing import Optional, Dict, Union, Any, List
from datetime import datetime
from backend.app.schemas.pagination import PaginatedResponse

class NewsBase(BaseModel):
    category: str
    title: Optional[Union[Dict[str, str], str]] = None
    excerpt: Optional[Union[Dict[str, str], str]] = None
    content: Optional[Union[Dict[str, str], str]] = None
    image_url: Optional[str] = None
    author: Optional[str] = "RCGA Press Office"
    is_featured: Optional[bool] = False

    # Optional legacy fields for input/output compatibility
    title_uz: Optional[str] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    excerpt_uz: Optional[str] = None
    excerpt_ru: Optional[str] = None
    excerpt_en: Optional[str] = None
    content_uz: Optional[str] = None
    content_ru: Optional[str] = None
    content_en: Optional[str] = None

class NewsCreate(NewsBase):
    @model_validator(mode="before")
    @classmethod
    def assemble_multilingual_fields(cls, values: Any) -> Any:
        if isinstance(values, dict):
            # If title is string or legacy fields passed, assemble into dict
            title = values.get("title")
            if isinstance(title, str):
                values["title"] = {"uz": title, "en": title}
            elif not title:
                values["title"] = {
                    k: values[f"title_{k}"] for k in ["uz", "ru", "en"] if values.get(f"title_{k}")
                } or {"uz": ""}

            excerpt = values.get("excerpt")
            if isinstance(excerpt, str):
                values["excerpt"] = {"uz": excerpt, "en": excerpt}
            elif not excerpt:
                values["excerpt"] = {
                    k: values[f"excerpt_{k}"] for k in ["uz", "ru", "en"] if values.get(f"excerpt_{k}")
                }

            content = values.get("content")
            if isinstance(content, str):
                values["content"] = {"uz": content, "en": content}
            elif not content:
                values["content"] = {
                    k: values[f"content_{k}"] for k in ["uz", "ru", "en"] if values.get(f"content_{k}")
                } or {"uz": ""}
        return values

class NewsUpdate(BaseModel):
    category: Optional[str] = None
    title: Optional[Union[Dict[str, str], str]] = None
    excerpt: Optional[Union[Dict[str, str], str]] = None
    content: Optional[Union[Dict[str, str], str]] = None
    image_url: Optional[str] = None
    author: Optional[str] = None
    is_featured: Optional[bool] = None

    # Legacy fields
    title_uz: Optional[str] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    excerpt_uz: Optional[str] = None
    content_uz: Optional[str] = None

class NewsResponse(NewsBase):
    id: int
    slug: Optional[str] = None
    published_at: datetime
    views_count: int

    # Multilingual maps
    title_i18n: Optional[Dict[str, str]] = None
    excerpt_i18n: Optional[Dict[str, str]] = None
    content_i18n: Optional[Dict[str, str]] = None

    class Config:
        from_attributes = True

class PaginatedNewsResponse(PaginatedResponse[NewsResponse]):
    pass
