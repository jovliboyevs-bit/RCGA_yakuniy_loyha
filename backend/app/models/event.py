from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.db.database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title_uz = Column(String, index=True, nullable=False)
    title_ru = Column(String, nullable=True)
    title_en = Column(String, nullable=True)
    location = Column(String, nullable=False)
    event_date = Column(DateTime, nullable=False)
    category = Column(String, default="Forum") # Forum, Seminar, Vebinar, O'quv kursi
    status = Column(String, default="upcoming") # upcoming, ongoing, completed
    description_uz = Column(Text, nullable=True)
    description_ru = Column(Text, nullable=True)
    description_en = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    is_featured = Column(Boolean, default=False)
    organizer = Column(String, default="RCGA & CAREC")

    registrations = relationship("EventRegistration", back_populates="event", cascade="all, delete-orphan")

class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    organization = Column(String, nullable=True)
    registered_at = Column(DateTime, default=datetime.utcnow)

    event = relationship("Event", back_populates="registrations")
