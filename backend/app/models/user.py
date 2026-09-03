from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from backend.app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="Guest") # Super Admin, Content Editor, Researcher, Student, Farmer, Institutional Member, Guest
    organization = Column(String, nullable=True)
    country = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
