from typing import Any, Dict, List, Optional, Union
from fastapi import Request, Query
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy import JSON
from sqlalchemy.dialects.postgresql import JSONB

# Cross-database JSONB definition (PostgreSQL JSONB in production, SQLite JSON in dev/test)
I18nJSON = JSONB().with_variant(JSON, "sqlite")

# CAREC member countries and official/regional languages
CAREC_LANGUAGES = {
    "uz": "O'zbek",
    "en": "English",
    "ru": "Русский",
    "kk": "Қазақша",
    "ky": "Кыргызча",
    "tg": "Тоҷикӣ",
    "tk": "Türkmençe",
    "az": "Azərbaycan",
    "ge": "ქართული",
    "mn": "Монгол",
    "zh": "中文",
    "ps": "پښتو",
    "ur": "اردو"
}

SUPPORTED_LANGUAGES = list(CAREC_LANGUAGES.keys())
DEFAULT_LANGUAGE = "uz"
FALLBACK_LANGUAGE = "en"

def resolve_request_language(
    request: Request,
    default: str = DEFAULT_LANGUAGE,
    fallback: str = FALLBACK_LANGUAGE
) -> str:
    """
    Extracts preferred language from:
    1. Query param: ?lang=... or ?locale=...
    2. Header: Accept-Language: uz-UZ,uz;q=0.9,ru;q=0.8,en;q=0.7
    3. Default language
    """
    # 1. Query parameter
    lang_param = request.query_params.get("lang") or request.query_params.get("locale")
    if lang_param:
        code = lang_param.strip().lower().split("-")[0]
        if code in CAREC_LANGUAGES:
            return code
        return code

    # 2. Accept-Language header
    accept_lang = request.headers.get("Accept-Language")
    if accept_lang:
        for item in accept_lang.split(","):
            raw_code = item.split(";")[0].strip().lower().split("-")[0]
            if raw_code in CAREC_LANGUAGES:
                return raw_code

    return default

def get_localized_text(
    field_data: Union[Dict[str, Any], str, None],
    lang: str = DEFAULT_LANGUAGE,
    fallback: str = FALLBACK_LANGUAGE
) -> str:
    """
    Returns localized text with automated fallback:
    Target lang -> Fallback lang (en) -> Default lang (uz) -> Any non-empty -> empty string.
    """
    if field_data is None:
        return ""
    if isinstance(field_data, str):
        return field_data
    if not isinstance(field_data, dict):
        return str(field_data)

    target_lang = lang.lower().split("-")[0] if lang else DEFAULT_LANGUAGE

    # 1. Requested language
    if target_lang in field_data and field_data[target_lang]:
        return str(field_data[target_lang])

    # 2. Fallback language (en)
    if fallback in field_data and field_data[fallback]:
        return str(field_data[fallback])

    # 3. Default language (uz)
    if DEFAULT_LANGUAGE in field_data and field_data[DEFAULT_LANGUAGE]:
        return str(field_data[DEFAULT_LANGUAGE])

    # 4. Any available language
    for val in field_data.values():
        if val:
            return str(val)

    return ""

def get_language(
    request: Request,
    lang: Optional[str] = Query(None, description="Preferred language code (e.g. uz, ru, en, kk)")
) -> str:
    """FastAPI dependency that returns the resolved request language."""
    if lang:
        return lang.strip().lower().split("-")[0]
    return getattr(request.state, "lang", DEFAULT_LANGUAGE)

def serialize_localized(obj: Any, lang: str, i18n_fields: List[str]) -> Dict[str, Any]:
    """
    Serializes a SQLAlchemy model instance, localizing designated i18n JSONB fields
    while also exposing raw *_i18n and backward-compatible *_uz, *_ru, *_en fields.
    """
    if obj is None:
        return {}
    res = {}
    for col in obj.__table__.columns.keys():
        val = getattr(obj, col, None)
        if col in i18n_fields:
            # Localized text in requested language
            res[col] = get_localized_text(val, lang)
            # Full translations dictionary
            res[f"{col}_i18n"] = val if isinstance(val, dict) else ({"uz": val} if val else {})
            # Backward-compatibility fields
            res[f"{col}_uz"] = get_localized_text(val, "uz")
            res[f"{col}_ru"] = get_localized_text(val, "ru")
            res[f"{col}_en"] = get_localized_text(val, "en")
        else:
            res[col] = val
    return res

class I18nMiddleware(BaseHTTPMiddleware):
    """Middleware that resolves language per request and adds Content-Language response header."""
    async def dispatch(self, request: Request, call_next):
        lang = resolve_request_language(request)
        request.state.lang = lang
        response = await call_next(request)
        response.headers["Content-Language"] = lang
        return response

