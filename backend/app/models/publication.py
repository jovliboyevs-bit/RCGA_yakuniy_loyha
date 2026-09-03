from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from datetime import datetime
from backend.app.db.database import Base

class Publication(Base):
    __tablename__ = "publications"

    id = Column(Integer, primary_key=True, index=True)
    title_uz = Column(String, index=True, nullable=False)
    title_ru = Column(String, nullable=True)
    title_en = Column(String, nullable=True)
    category = Column(String, index=True) # Iqlim, Tuproq, Suv, Agro-biotexnologiya, Siyosat, Raqamli agrotex
    abstract_uz = Column(Text, nullable=True)
    abstract_ru = Column(Text, nullable=True)
    abstract_en = Column(Text, nullable=True)
    authors = Column(String, nullable=False)
    doi = Column(String, nullable=True)
    file_url = Column(String, nullable=True)
    cover_image = Column(String, nullable=True)
    published_year = Column(Integer, default=2026)
    downloads_count = Column(Integer, default=0)
    views_count = Column(Integer, default=0)
    citations_count = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
