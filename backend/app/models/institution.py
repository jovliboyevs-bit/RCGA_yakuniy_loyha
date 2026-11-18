from sqlalchemy import Column, Integer, String, Boolean
from backend.app.db.database import Base
from backend.app.core.i18n import I18nJSON

class Institution(Base):
    __tablename__ = "institutions"

    id = Column(Integer, primary_key=True, index=True)

    # Multilingual i18n JSONB fields ({"uz": "...", "ru": "...", "en": "...", "kk": "..."})
    name = Column(I18nJSON, nullable=False, default=dict)
    country_name = Column(I18nJSON, nullable=True, default=dict)
    description = Column(I18nJSON, nullable=True, default=dict)

    country = Column(String, index=True, nullable=False) # UZ, KZ, KG, TJ, TM, AF, AZ, GE, PK, MN, CN
    type = Column(String, default="University") # University, Research Institute, International Org
    website = Column(String, nullable=True)
    logo_url = Column(String, nullable=True)
    is_partner = Column(Boolean, default=True)

    def __init__(self, **kwargs):
        name_val = kwargs.pop("name", None)
        if name_val is None:
            name_val = {}
        elif not isinstance(name_val, dict):
            name_val = {"uz": str(name_val), "en": str(name_val)}
        for lang in ["uz", "ru", "en", "kk", "ky", "tg", "tk", "az", "ge", "mn", "zh"]:
            if f"name_{lang}" in kwargs:
                name_val[lang] = kwargs.pop(f"name_{lang}")
        kwargs["name"] = name_val

        c_name = kwargs.pop("country_name", None)
        if c_name is None:
            c_name = {}
        elif not isinstance(c_name, dict):
            c_name = {"uz": str(c_name)}
        if "country_name_uz" in kwargs:
            c_name["uz"] = kwargs.pop("country_name_uz")
        for lang in ["uz", "ru", "en", "kk", "ky", "tg", "tk", "az", "ge", "mn", "zh"]:
            if f"country_name_{lang}" in kwargs:
                c_name[lang] = kwargs.pop(f"country_name_{lang}")
        kwargs["country_name"] = c_name

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
    def country_name_uz(self):
        return (self.country_name or {}).get("uz") or (self.country_name or {}).get("en", "")

    @property
    def description_uz(self):
        return (self.description or {}).get("uz") or (self.description or {}).get("en", "")
