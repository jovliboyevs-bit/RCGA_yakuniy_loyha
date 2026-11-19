import os
import json
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Determine base paths
_APP_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # .../backend/app
_BACKEND_DIR = os.path.dirname(_APP_DIR) # .../backend
_PROJECT_DIR = os.path.dirname(_BACKEND_DIR) # .../rcga

_ENV_PROJECT = os.path.join(_PROJECT_DIR, ".env")
_ENV_BACKEND = os.path.join(_BACKEND_DIR, ".env")

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(_ENV_PROJECT, _ENV_BACKEND, ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=True
    )

    # General
    PROJECT_NAME: str = "RCGA Digital Platform"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Security
    SECRET_KEY: str = "rcga-super-secret-key-change-in-production-2026"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # 30 minutes
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7     # 7 days

    # Database (PostgreSQL default)
    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/rcga_db"

    # Redis Cache & Message Broker
    REDIS_URL: str = "redis://localhost:6379/0"

    # AI Keys
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""

    # Storage & File Uploads (Local or MinIO/S3)
    UPLOAD_DIR: str = os.path.join(_BACKEND_DIR, "uploads")
    MAX_IMAGE_SIZE_MB: int = 5
    MAX_DOCUMENT_SIZE_MB: int = 25
    STORAGE_BACKEND: str = "local"  # "local" or "s3"
    S3_ENDPOINT_URL: Union[str, None] = None  # e.g. "http://localhost:9000" for MinIO
    S3_ACCESS_KEY: Union[str, None] = None
    S3_SECRET_KEY: Union[str, None] = None
    S3_BUCKET_NAME: str = "rcga-media"
    S3_REGION_NAME: str = "us-east-1"
    S3_PUBLIC_URL_PREFIX: Union[str, None] = None

    # CORS Origins
    CORS_ORIGINS: Union[str, List[str]] = ["*"]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            v_trimmed = v.strip()
            if v_trimmed.startswith("[") and v_trimmed.endswith("]"):
                try:
                    return json.loads(v_trimmed)
                except Exception:
                    pass
            return [origin.strip() for origin in v_trimmed.split(",") if origin.strip()]
        return v

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def assemble_database_url(cls, v: str) -> str:
        if isinstance(v, str) and v.startswith("postgres://"):
            return v.replace("postgres://", "postgresql://", 1)
        return v

    # Backwards compatibility properties
    @property
    def BACKEND_CORS_ORIGINS(self) -> List[str]:
        return self.CORS_ORIGINS

    @property
    def MAX_IMAGE_SIZE_BYTES(self) -> int:
        return self.MAX_IMAGE_SIZE_MB * 1024 * 1024

    @property
    def MAX_DOCUMENT_SIZE_BYTES(self) -> int:
        return self.MAX_DOCUMENT_SIZE_MB * 1024 * 1024

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return self.DATABASE_URL

settings = Settings()
