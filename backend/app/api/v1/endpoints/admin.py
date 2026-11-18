from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.app.db.database import get_db
from backend.app.models.user import User
from backend.app.models.news import News
from backend.app.models.publication import Publication
from backend.app.models.event import Event, EventRegistration
from backend.app.schemas.user import UserResponse
from backend.app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

def check_admin(user: User):
    r = str(user.role).upper().replace(" ", "")
    if r not in ["SUPERADMIN", "MODERATOR", "CONTENTEDITOR"]:
        raise HTTPException(status_code=403, detail="Ushbu amal faqat Admin yoki Moderator uchun ruxsat etilgan.")

def check_super_admin(user: User):
    r = str(user.role).upper().replace(" ", "")
    if r != "SUPERADMIN":
        raise HTTPException(status_code=403, detail="Ushbu amal faqat Super Admin uchun ruxsat etilgan (Foydalanuvchilarni boshqarish huquqi).")

VALID_ROLES = [
    "SUPERADMIN",
    "MODERATOR",
    "RESEARCHER",
    "FARMER",
    "USER",
    "Super Admin",
    "Content Editor",
    "Student",
    "Institutional Member"
]

@router.get("/stats")
def get_admin_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    check_admin(current_user)
    return {
        "users_count": db.query(User).count(),
        "news_count": db.query(News).count(),
        "publications_count": db.query(Publication).count(),
        "events_count": db.query(Event).count(),
        "registrations_count": db.query(EventRegistration).count()
    }

@router.get("/users", response_model=List[UserResponse])
def get_all_users(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    check_admin(current_user)
    return db.query(User).order_by(User.created_at.desc()).all()

@router.put("/users/{user_id}/role")
def update_user_role(user_id: int, role: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    check_super_admin(current_user)
    if role not in VALID_ROLES:
        raise HTTPException(status_code=400, detail=f"Noto'g'ri rol. Mavjud rollar: {', '.join(VALID_ROLES)}")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Foydalanuvchi topilmadi")
    user.role = role
    db.commit()
    return {"message": "Foydalanuvchi roli muvaffaqiyatli yangilandi", "user_id": user_id, "new_role": role}

@router.delete("/users/{user_id}")
def delete_user(user_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    check_super_admin(current_user)
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="O'zingizning shaxsiy hisobingizni o'chira olmaysiz.")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Foydalanuvchi topilmadi")
    db.delete(user)
    db.commit()
    return {"message": "Foydalanuvchi muvaffaqiyatli o'chirildi", "id": user_id}

@router.delete("/news/{news_id}")
def delete_news(news_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    check_admin(current_user)
    item = db.query(News).filter(News.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Yangilik topilmadi")
    db.delete(item)
    db.commit()
    return {"message": "Yangilik o'chirildi", "id": news_id}

@router.delete("/publications/{pub_id}")
def delete_publication(pub_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    check_admin(current_user)
    pub = db.query(Publication).filter(Publication.id == pub_id).first()
    if not pub:
        raise HTTPException(status_code=404, detail="Nashr topilmadi")
    db.delete(pub)
    db.commit()
    return {"message": "Nashr o'chirildi", "id": pub_id}

@router.delete("/events/{event_id}")
def delete_event(event_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    check_admin(current_user)
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Tadbir topilmadi")
    db.delete(event)
    db.commit()
    return {"message": "Tadbir o'chirildi", "id": event_id}
