from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime
from backend.app.db.database import Base
from backend.app.core.i18n import I18nJSON

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True)
    category = Column(String, index=True) # Mintaqaviy, Texnologiya, Iqlim, Siyosat, Innovatsiya

    # Multilingual i18n JSONB fields ({"uz": "...", "ru": "...", "en": "...", "kk": "..."})
    title = Column(I18nJSON, nullable=False, default=dict)
    excerpt = Column(I18nJSON, nullable=True, default=dict)
    content = Column(I18nJSON, nullable=False, default=dict)

    image_url = Column(String, nullable=True)
    author = Column(String, default="RCGA Press Office")
    is_featured = Column(Boolean, default=False)
    published_at = Column(DateTime, default=datetime.utcnow)
    views_count = Column(Integer, default=0)

    def __init__(self, **kwargs):
        # Support both new JSONB dict format and legacy title_uz/title_en kwargs
        title_dict = kwargs.pop("title", None)
        if title_dict is None:
            title_dict = {}
        elif not isinstance(title_dict, dict):
            title_dict = {"uz": str(title_dict)}
        for lang in ["uz", "ru", "en", "kk", "ky", "tg", "tk", "az", "ge", "mn", "zh"]:
            if f"title_{lang}" in kwargs:
                title_dict[lang] = kwargs.pop(f"title_{lang}")
        kwargs["title"] = title_dict

        excerpt_dict = kwargs.pop("excerpt", None)
        if excerpt_dict is None:
            excerpt_dict = {}
        elif not isinstance(excerpt_dict, dict):
            excerpt_dict = {"uz": str(excerpt_dict)}
        for lang in ["uz", "ru", "en", "kk", "ky", "tg", "tk", "az", "ge", "mn", "zh"]:
            if f"excerpt_{lang}" in kwargs:
                excerpt_dict[lang] = kwargs.pop(f"excerpt_{lang}")
        kwargs["excerpt"] = excerpt_dict

        content_dict = kwargs.pop("content", None)
        if content_dict is None:
            content_dict = {}
        elif not isinstance(content_dict, dict):
            content_dict = {"uz": str(content_dict)}
        for lang in ["uz", "ru", "en", "kk", "ky", "tg", "tk", "az", "ge", "mn", "zh"]:
            if f"content_{lang}" in kwargs:
                content_dict[lang] = kwargs.pop(f"content_{lang}")
        kwargs["content"] = content_dict

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
    def excerpt_uz(self):
        return (self.excerpt or {}).get("uz") or (self.excerpt or {}).get("en", "")

    @property
    def content_uz(self):
        return (self.content or {}).get("uz") or (self.content or {}).get("en", "")
