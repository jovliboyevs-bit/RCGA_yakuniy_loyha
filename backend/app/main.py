import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.app.core.config import settings
from backend.app.api.v1.api import api_router
from backend.app.db.database import engine, Base
from backend.app.db.seed import seed_db

# Create database tables automatically
Base.metadata.create_all(bind=engine)
# Seed initial data
try:
    seed_db()
except Exception as e:
    print(f"Seed info: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Regional Center for Green Agriculture (RCGA) Digital Platform Backend API"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health")
def health_check():
    return {"status": "ok", "project": settings.PROJECT_NAME, "version": settings.VERSION}

# Mount uploads directory
import os
ROOT_DIR = os.getcwd()
UPLOADS_DIR = os.path.join(ROOT_DIR, "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

# Mount root directory for static HTML, CSS, JS and assets serving
app.mount("/", StaticFiles(directory=ROOT_DIR, html=True), name="static")
