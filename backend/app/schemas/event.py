from pydantic import BaseModel, EmailStr, model_validator
from typing import Optional, Dict, Union, Any, List
from datetime import datetime
from backend.app.schemas.pagination import PaginatedResponse

class EventBase(BaseModel):
    location: str
    event_date: datetime
    category: Optional[str] = "Forum"
    status: Optional[str] = "upcoming"
    image_url: Optional[str] = None
    is_featured: Optional[bool] = False
    organizer: Optional[str] = "RCGA & CAREC"

    # Multilingual i18n JSONB fields
    title: Optional[Union[Dict[str, str], str]] = None
    description: Optional[Union[Dict[str, str], str]] = None

    # Legacy fields
    title_uz: Optional[str] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    description_uz: Optional[str] = None
    description_ru: Optional[str] = None
    description_en: Optional[str] = None

class EventCreate(EventBase):
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

            desc = values.get("description")
            if isinstance(desc, str):
                values["description"] = {"uz": desc, "en": desc}
            elif not desc:
                values["description"] = {
                    k: values[f"description_{k}"] for k in ["uz", "ru", "en"] if values.get(f"description_{k}")
                }
        return values

class EventUpdate(BaseModel):
    location: Optional[str] = None
    event_date: Optional[datetime] = None
    category: Optional[str] = None
    status: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = None
    organizer: Optional[str] = None

    title: Optional[Union[Dict[str, str], str]] = None
    description: Optional[Union[Dict[str, str], str]] = None

    title_uz: Optional[str] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    description_uz: Optional[str] = None

class EventResponse(EventBase):
    id: int
    title_i18n: Optional[Dict[str, str]] = None
    description_i18n: Optional[Dict[str, str]] = None

    class Config:
        from_attributes = True

class PaginatedEventResponse(PaginatedResponse[EventResponse]):
    pass

class EventRegistrationCreate(BaseModel):
    full_name: str
    email: EmailStr
    organization: Optional[str] = None

class EventRegistrationResponse(EventRegistrationCreate):
    id: int
    event_id: int
    registered_at: datetime

    class Config:
        from_attributes = True
