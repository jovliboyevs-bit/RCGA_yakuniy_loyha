from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.db.database import Base
from backend.app.core.i18n import I18nJSON

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    # Multilingual i18n JSONB fields ({"uz": "...", "ru": "...", "en": "...", "kk": "..."})
    title = Column(I18nJSON, nullable=False, default=dict)
    description = Column(I18nJSON, nullable=True, default=dict)

    location = Column(String, nullable=False)
    event_date = Column(DateTime, nullable=False)
    category = Column(String, default="Forum") # Forum, Seminar, Vebinar, O'quv kursi
    status = Column(String, default="upcoming") # upcoming, ongoing, completed
    image_url = Column(String, nullable=True)
    is_featured = Column(Boolean, default=False)
    organizer = Column(String, default="RCGA & CAREC")

    registrations = relationship("EventRegistration", back_populates="event", cascade="all, delete-orphan")

    def __init__(self, **kwargs):
        title_dict = kwargs.pop("title", None)
        if title_dict is None:
            title_dict = {}
        elif not isinstance(title_dict, dict):
            title_dict = {"uz": str(title_dict)}
        for lang in ["uz", "ru", "en", "kk", "ky", "tg", "tk", "az", "ge", "mn", "zh"]:
            if f"title_{lang}" in kwargs:
                title_dict[lang] = kwargs.pop(f"title_{lang}")
        kwargs["title"] = title_dict

        desc_dict = kwargs.pop("description", None)
        if desc_dict is None:
            desc_dict = {}
        elif not isinstance(desc_dict, dict):
            desc_dict = {"uz": str(desc_dict)}
        for lang in ["uz", "ru", "en", "kk", "ky", "tg", "tk", "az", "ge", "mn", "zh"]:
            if f"description_{lang}" in kwargs:
                desc_dict[lang] = kwargs.pop(f"description_{lang}")
        kwargs["description"] = desc_dict

        super().__init__(**kwargs)

    @property
    def title_uz(self):
        return (self.title or {}).get("uz") or (self.title or {}).get("en", "")

    @property
    def title_ru(self):
        return (self.title or {}).get("ru") or (self.title or {}).get("en", "")

    @property
    def title_en(self):
        return (self.title or {}).get("en") or (self.title or {}).get("uz", "")

    @property
    def description_uz(self):
        return (self.description or {}).get("uz") or (self.description or {}).get("en", "")

class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    organization = Column(String, nullable=True)
    registered_at = Column(DateTime, default=datetime.utcnow)

    event = relationship("Event", back_populates="registrations")
