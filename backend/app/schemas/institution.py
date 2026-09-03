from pydantic import BaseModel
from typing import Optional

class InstitutionBase(BaseModel):
    name: str
    country: str
    country_name_uz: Optional[str] = None
    type: Optional[str] = "University"
    description_uz: Optional[str] = None
    description_ru: Optional[str] = None
    description_en: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None
    is_partner: Optional[bool] = True

class InstitutionResponse(InstitutionBase):
    id: int

    class Config:
        from_attributes = True
