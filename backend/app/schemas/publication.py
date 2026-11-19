from pydantic import BaseModel, model_validator
from typing import Optional, Dict, Union, Any, List
from datetime import datetime
from backend.app.schemas.pagination import PaginatedResponse

class PublicationBase(BaseModel):
    category: str
    authors: str
    doi: Optional[str] = None
    file_url: Optional[str] = None
    cover_image: Optional[str] = None
    published_year: Optional[int] = 2026
    is_featured: Optional[bool] = False

    # Multilingual i18n JSONB fields
    title: Optional[Union[Dict[str, str], str]] = None
    abstract: Optional[Union[Dict[str, str], str]] = None

    # Legacy fields
    title_uz: Optional[str] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    abstract_uz: Optional[str] = None
    abstract_ru: Optional[str] = None
    abstract_en: Optional[str] = None

class PublicationCreate(PublicationBase):
    @model_validator(mode="before")
    @classmethod
    def assemble_multilingual_fields(cls, values: Any) -> Any:
        if isinstance(values, dict):
            title = values.get("title")
            if isinstance(title, str):
                values["title"] = {"uz": title, "en": title}
            elif not title:
                values["title"] = {
                    k: values[f"title_{k}"] for k in ["uz", "ru", "en"] if values.get(f"title_{k}")
                } or {"uz": ""}

            abstract = values.get("abstract")
            if isinstance(abstract, str):
                values["abstract"] = {"uz": abstract, "en": abstract}
            elif not abstract:
                values["abstract"] = {
                    k: values[f"abstract_{k}"] for k in ["uz", "ru", "en"] if values.get(f"abstract_{k}")
                }
        return values

class PublicationUpdate(BaseModel):
    category: Optional[str] = None
    authors: Optional[str] = None
    doi: Optional[str] = None
    file_url: Optional[str] = None
    cover_image: Optional[str] = None
    published_year: Optional[int] = None
    is_featured: Optional[bool] = None

    title: Optional[Union[Dict[str, str], str]] = None
    abstract: Optional[Union[Dict[str, str], str]] = None

    title_uz: Optional[str] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    abstract_uz: Optional[str] = None

class PublicationResponse(PublicationBase):
    id: int
    downloads_count: int
    views_count: int
    citations_count: int
    created_at: datetime

    title_i18n: Optional[Dict[str, str]] = None
    abstract_i18n: Optional[Dict[str, str]] = None

    class Config:
        from_attributes = True

class PaginatedPublicationResponse(PaginatedResponse[PublicationResponse]):
    pass
