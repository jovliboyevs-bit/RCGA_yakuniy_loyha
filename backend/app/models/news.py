from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from datetime import datetime
from backend.app.db.database import Base

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title_uz = Column(String, index=True, nullable=False)
    title_ru = Column(String, nullable=True)
    title_en = Column(String, nullable=True)
    slug = Column(String, unique=True, index=True)
    category = Column(String, index=True) # Mintaqaviy, Texnologiya, Iqlim, Siyosat, Innovatsiya
    excerpt_uz = Column(Text, nullable=True)
    excerpt_ru = Column(Text, nullable=True)
    excerpt_en = Column(Text, nullable=True)
    content_uz = Column(Text, nullable=False)
    content_ru = Column(Text, nullable=True)
    content_en = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    author = Column(String, default="RCGA Press Office")
    is_featured = Column(Boolean, default=False)
    published_at = Column(DateTime, default=datetime.utcnow)
    views_count = Column(Integer, default=0)
