from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import cast, String
from typing import List, Optional

from backend.app.db.database import get_db
from backend.app.models.event import Event, EventRegistration
from backend.app.models.user import User, UserRole
from backend.app.schemas.event import (
    EventResponse,
    EventCreate,
    EventUpdate,
    PaginatedEventResponse,
    EventRegistrationCreate,
    EventRegistrationResponse
)
from backend.app.core.i18n import get_language, serialize_localized
from backend.app.core.pagination import apply_date_filter, apply_sorting, paginate_query
from backend.app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

I18N_EVENT_FIELDS = ["title", "description"]

ALLOWED_SORT_FIELDS = {
    "event_date": Event.event_date,
    "date": Event.event_date,
    "id": Event.id,
    "category": Event.category,
    "status": Event.status,
    "location": Event.location,
}

def require_event_editor(current_user: User = Depends(get_current_user)) -> User:
    role = str(current_user.role).upper().replace(" ", "").replace("_", "")
    allowed = {UserRole.SUPERADMIN.value, UserRole.MODERATOR.value, "SUPERADMIN", "MODERATOR", "CONTENTEDITOR"}
    if role not in allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Tadbirlarni boshqarish uchun ruxsat yetarli emas."
        )
    return current_user

@router.get("", response_model=PaginatedEventResponse, summary="List events with pagination, sorting and filtering")
def read_events(
    page: int = Query(1, ge=1, description="Sahifa raqami"),
    size: int = Query(20, ge=1, le=100, description="Har sahifadagi tadbirlar soni"),
    category: Optional[str] = Query(None, description="Kategoriya: Forum, Seminar, Vebinar, O'quv kursi"),
    country: Optional[str] = Query(None, description="CAREC davlati (manzili bo'yicha)"),
    status: Optional[str] = Query(None, description="Holati: upcoming, ongoing, completed"),
    featured: Optional[bool] = Query(None, description="Asosiy (featured) tadbirlar"),
    date_from: Optional[str] = Query(None, description="Boshlanish sanasi (YYYY-MM-DD)"),
    date_to: Optional[str] = Query(None, description="Tugash sanasi (YYYY-MM-DD)"),
    sort_by: Optional[str] = Query("event_date", description="Saralash ustuni: event_date, -event_date, id"),
    q: Optional[str] = Query(None, description="Qidiruv so'zi"),
    skip: Optional[int] = Query(None, ge=0, description="Legacy pagination: skip"),
    limit: Optional[int] = Query(None, ge=1, le=100, description="Legacy pagination: limit"),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    query = db.query(Event)

    # Filtering by category
    if category and category.lower() not in ["barchasi", "all"]:
        query = query.filter(Event.category.ilike(f"%{category}%"))

    # Filtering by status
    if status and status.lower() not in ["barchasi", "all"]:
        query = query.filter(Event.status == status)

    # Filtering by featured
    if featured is not None:
        query = query.filter(Event.is_featured == featured)

    # Filtering by country / location
    if country and country.lower() not in ["barchasi", "all"]:
        query = query.filter(
            (Event.location.ilike(f"%{country}%")) |
            (cast(Event.title, String).ilike(f"%{country}%"))
        )

    # Filtering by date range
    query = apply_date_filter(query, Event.event_date, date_from, date_to)

    # Text search
    if q:
        q_pat = f"%{q}%"
        query = query.filter(
            (cast(Event.title, String).ilike(q_pat)) |
            (Event.location.ilike(q_pat)) |
            (cast(Event.description, String).ilike(q_pat)) |
            (Event.organizer.ilike(q_pat))
        )

    # Sorting
    query = apply_sorting(query, sort_by, ALLOWED_SORT_FIELDS, Event.event_date, default_order="asc")

    # Pagination
    paged_query, meta = paginate_query(query, page=page, size=size, skip=skip, limit=limit)
    items = paged_query.all()

    return {
        "items": [serialize_localized(item, lang, I18N_EVENT_FIELDS) for item in items],
        "total": meta["total"],
        "page": meta["page"],
        "size": meta["size"],
        "pages": meta["pages"]
    }

@router.get("/{event_id}", response_model=EventResponse, summary="Get event detail")
def read_event_detail(
    event_id: int,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Tadbir topilmadi")
    return serialize_localized(event, lang, I18N_EVENT_FIELDS)

@router.post("", response_model=EventResponse, status_code=201, summary="Create event")
def create_event(
    event_in: EventCreate,
    current_user: User = Depends(require_event_editor),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    event = Event(
        title=event_in.title if isinstance(event_in.title, dict) else {"uz": str(event_in.title)},
        description=event_in.description if isinstance(event_in.description, dict) else ({"uz": str(event_in.description)} if event_in.description else {}),
        location=event_in.location,
        event_date=event_in.event_date,
        category=event_in.category or "Forum",
        status=event_in.status or "upcoming",
        image_url=event_in.image_url,
        is_featured=event_in.is_featured or False,
        organizer=event_in.organizer or "RCGA & CAREC"
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return serialize_localized(event, lang, I18N_EVENT_FIELDS)

@router.put("/{event_id}", response_model=EventResponse, summary="Update event")
def update_event(
    event_id: int,
    event_in: EventUpdate,
    current_user: User = Depends(require_event_editor),
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Tadbir topilmadi")

    if event_in.location is not None:
        event.location = event_in.location
    if event_in.event_date is not None:
        event.event_date = event_in.event_date
    if event_in.category is not None:
        event.category = event_in.category
    if event_in.status is not None:
        event.status = event_in.status
    if event_in.image_url is not None:
        event.image_url = event_in.image_url
    if event_in.is_featured is not None:
        event.is_featured = event_in.is_featured
    if event_in.organizer is not None:
        event.organizer = event_in.organizer

    if event_in.title is not None:
        if isinstance(event_in.title, dict):
            new_title = dict(event.title or {})
            new_title.update(event_in.title)
            event.title = new_title
        else:
            new_title = dict(event.title or {})
            new_title["uz"] = str(event_in.title)
            event.title = new_title

    if event_in.description is not None:
        if isinstance(event_in.description, dict):
            new_desc = dict(event.description or {})
            new_desc.update(event_in.description)
            event.description = new_desc
        else:
            new_desc = dict(event.description or {})
            new_desc["uz"] = str(event_in.description)
            event.description = new_desc

    db.commit()
    db.refresh(event)
    return serialize_localized(event, lang, I18N_EVENT_FIELDS)

@router.delete("/{event_id}", summary="Delete event")
def delete_event(
    event_id: int,
    current_user: User = Depends(require_event_editor),
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Tadbir topilmadi")
    db.delete(event)
    db.commit()
    return {"message": "Tadbir muvaffaqiyatli o'chirildi", "id": event_id}

@router.post("/{event_id}/register", response_model=EventRegistrationResponse, summary="Register for an event")
def register_for_event(
    event_id: int,
    reg_in: EventRegistrationCreate,
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Tadbir topilmadi")

    registration = EventRegistration(
        event_id=event_id,
        full_name=reg_in.full_name,
        email=reg_in.email,
        organization=reg_in.organization
    )
    db.add(registration)
    db.commit()
    db.refresh(registration)
    return registration
