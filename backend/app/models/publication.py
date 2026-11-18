from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime
from backend.app.db.database import Base
from backend.app.core.i18n import I18nJSON

class Publication(Base):
    __tablename__ = "publications"

    id = Column(Integer, primary_key=True, index=True)

    # Multilingual i18n JSONB fields ({"uz": "...", "ru": "...", "en": "...", "kk": "..."})
    title = Column(I18nJSON, nullable=False, default=dict)
    abstract = Column(I18nJSON, nullable=True, default=dict)

    category = Column(String, index=True) # Iqlim, Tuproq, Suv, Agro-biotexnologiya, Siyosat, Raqamli agrotex
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

        abstract_dict = kwargs.pop("abstract", None)
        if abstract_dict is None:
            abstract_dict = {}
        elif not isinstance(abstract_dict, dict):
            abstract_dict = {"uz": str(abstract_dict)}
        for lang in ["uz", "ru", "en", "kk", "ky", "tg", "tk", "az", "ge", "mn", "zh"]:
            if f"abstract_{lang}" in kwargs:
                abstract_dict[lang] = kwargs.pop(f"abstract_{lang}")
        kwargs["abstract"] = abstract_dict

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
    def abstract_uz(self):
        return (self.abstract or {}).get("uz") or (self.abstract or {}).get("en", "")
