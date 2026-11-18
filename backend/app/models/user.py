import enum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.db.database import Base
from backend.app.models.institution import Institution

class UserRole(str, enum.Enum):
    SUPERADMIN = "SUPERADMIN"
    MODERATOR = "MODERATOR"
    RESEARCHER = "RESEARCHER"
    FARMER = "FARMER"
    USER = "USER"

# CAREC member and observer countries (standard 2-letter codes)
CAREC_COUNTRIES = [
    "UZ",  # Uzbekistan
    "KZ",  # Kazakhstan
    "KG",  # Kyrgyz Republic
    "TJ",  # Tajikistan
    "TM",  # Turkmenistan
    "AZ",  # Azerbaijan
    "GE",  # Georgia
    "AF",  # Afghanistan
    "PK",  # Pakistan
    "MN",  # Mongolia
    "CN",  # China (Xinjiang / Inner Mongolia)
]

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default=UserRole.USER.value, nullable=False) # SUPERADMIN, MODERATOR, RESEARCHER, FARMER, USER
    institution_id = Column(Integer, ForeignKey("institutions.id", ondelete="SET NULL"), nullable=True)
    organization = Column(String, nullable=True)
    country = Column(String, nullable=True) # CAREC 2-letter code e.g. UZ, KZ
    orcid_id = Column(String, nullable=True) # e.g. 0000-0002-1825-0097
    is_verified = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    institution = relationship("Institution", backref="affiliated_users")
