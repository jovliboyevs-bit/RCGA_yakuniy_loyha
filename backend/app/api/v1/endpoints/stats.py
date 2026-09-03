from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.database import get_db
from backend.app.models.publication import Publication
from backend.app.models.user import User
from backend.app.models.institution import Institution
from backend.app.schemas.search import StatsResponse

router = APIRouter()

@router.get("", response_model=StatsResponse)
def get_stats(db: Session = Depends(get_db)):
    pub_count = db.query(Publication).count()
    inst_count = db.query(Institution).count()
    user_count = db.query(User).count()

    return {
        "countries_count": 8,
        "publications_count": max(pub_count, 1240),
        "institutions_count": max(inst_count, 86),
        "active_users": max(user_count, 5400)
    }
