from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class EventBase(BaseModel):
    title_uz: str
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    location: str
    event_date: datetime
    category: Optional[str] = "Forum"
    status: Optional[str] = "upcoming"
    description_uz: Optional[str] = None
    description_ru: Optional[str] = None
    description_en: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = False
    organizer: Optional[str] = "RCGA & CAREC"

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int

    class Config:
        from_attributes = True

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
