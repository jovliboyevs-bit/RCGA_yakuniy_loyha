from sqlalchemy import Column, Integer, String, Text, Boolean
from backend.app.db.database import Base

class Institution(Base):
    __tablename__ = "institutions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    country = Column(String, index=True, nullable=False) # UZ, KZ, KG, TJ, TM, AF, AZ, GE
    country_name_uz = Column(String, nullable=True)
    type = Column(String, default="University") # University, Research Institute, International Org
    description_uz = Column(Text, nullable=True)
    description_ru = Column(Text, nullable=True)
    description_en = Column(Text, nullable=True)
    website = Column(String, nullable=True)
    logo_url = Column(String, nullable=True)
    is_partner = Column(Boolean, default=True)
