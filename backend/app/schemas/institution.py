from pydantic import BaseModel, model_validator
from typing import Optional, Dict, Union, Any, List
from backend.app.schemas.pagination import PaginatedResponse

class InstitutionBase(BaseModel):
    country: str # UZ, KZ, KG, TJ, TM, AF, AZ, GE, PK, MN, CN
    type: Optional[str] = "University"
    website: Optional[str] = None
    logo_url: Optional[str] = None
    is_partner: Optional[bool] = True

    # Multilingual i18n JSONB fields
    name: Optional[Union[Dict[str, str], str]] = None
    country_name: Optional[Union[Dict[str, str], str]] = None
    description: Optional[Union[Dict[str, str], str]] = None

    # Legacy fields
    country_name_uz: Optional[str] = None
    description_uz: Optional[str] = None
    description_ru: Optional[str] = None
    description_en: Optional[str] = None

class InstitutionCreate(InstitutionBase):
    @model_validator(mode="before")
    @classmethod
    def assemble_multilingual_fields(cls, values: Any) -> Any:
        if isinstance(values, dict):
            name = values.get("name")
            if isinstance(name, str):
                values["name"] = {"uz": name, "en": name}

            c_name = values.get("country_name")
            if isinstance(c_name, str):
                values["country_name"] = {"uz": c_name, "en": c_name}
            elif not c_name and values.get("country_name_uz"):
                values["country_name"] = {"uz": values["country_name_uz"]}

            desc = values.get("description")
            if isinstance(desc, str):
                values["description"] = {"uz": desc, "en": desc}
            elif not desc:
                values["description"] = {
                    k: values[f"description_{k}"] for k in ["uz", "ru", "en"] if values.get(f"description_{k}")
                }
        return values

class InstitutionUpdate(BaseModel):
    country: Optional[str] = None
    type: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None
    is_partner: Optional[bool] = None

    name: Optional[Union[Dict[str, str], str]] = None
    country_name: Optional[Union[Dict[str, str], str]] = None
    description: Optional[Union[Dict[str, str], str]] = None

    country_name_uz: Optional[str] = None
    description_uz: Optional[str] = None

class InstitutionResponse(InstitutionBase):
    id: int
    name_i18n: Optional[Dict[str, str]] = None
    country_name_i18n: Optional[Dict[str, str]] = None
    description_i18n: Optional[Dict[str, str]] = None

    class Config:
        from_attributes = True

class PaginatedInstitutionResponse(PaginatedResponse[InstitutionResponse]):
    pass
