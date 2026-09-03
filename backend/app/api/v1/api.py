from fastapi import APIRouter
from backend.app.api.v1.endpoints import auth, news, events, publications, institutions, search, stats, ai_advisor, upload, admin

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication & RBAC"])
api_router.include_router(news.router, prefix="/news", tags=["News & Portal"])
api_router.include_router(events.router, prefix="/events", tags=["Events & Registration"])
api_router.include_router(publications.router, prefix="/publications", tags=["Publications & Knowledge Repository"])
api_router.include_router(institutions.router, prefix="/institutions", tags=["Institutions & Partners"])
api_router.include_router(search.router, prefix="/search", tags=["Global Search"])
api_router.include_router(stats.router, prefix="/stats", tags=["Statistics & Metrics"])
api_router.include_router(ai_advisor.router, prefix="/ai", tags=["AI Advisor"])
api_router.include_router(upload.router, prefix="/upload", tags=["File Uploads"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin Panel & RBAC Management"])
