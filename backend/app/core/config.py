import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "RCGA Digital Platform"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "rcga-super-secret-key-change-in-production-2026")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Database
    SQLALCHEMY_DATABASE_URI: str = os.getenv("DATABASE_URL", "sqlite:///./rcga.db")
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["*"]

    # AI Keys (Optional - if provided via env, will use Gemini/OpenAI)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

    class Config:
        case_sensitive = True

settings = Settings()
