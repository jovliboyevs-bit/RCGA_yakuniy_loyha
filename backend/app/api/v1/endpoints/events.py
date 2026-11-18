from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.db.database import get_db
from backend.app.models.event import Event, EventRegistration
from backend.app.schemas.event import EventResponse, EventCreate, EventRegistrationCreate, EventRegistrationResponse
from backend.app.core.i18n import get_language, serialize_localized

router = APIRouter()

I18N_EVENT_FIELDS = ["title", "description"]

@router.get("", response_model=List[EventResponse])
def read_events(
    category: Optional[str] = None,
    status: Optional[str] = None,
    featured: Optional[bool] = None,
    skip: int = 0,
    limit: int = 20,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    query = db.query(Event)
    if category and category.lower() != "barchasi":
        query = query.filter(Event.category.ilike(f"%{category}%"))
    if status:
        query = query.filter(Event.status == status)
    if featured is not None:
        query = query.filter(Event.is_featured == featured)
    items = query.order_by(Event.event_date.asc()).offset(skip).limit(limit).all()
    return [serialize_localized(item, lang, I18N_EVENT_FIELDS) for item in items]

@router.get("/{event_id}", response_model=EventResponse)
def read_event_detail(
    event_id: int,
    lang: str = Depends(get_language),
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Tadbir topilmadi")
    return serialize_localized(event, lang, I18N_EVENT_FIELDS)

@router.post("", response_model=EventResponse, status_code=201)
def create_event(
    event_in: EventCreate,
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

@router.post("/{event_id}/register", response_model=EventRegistrationResponse)
def register_for_event(event_id: int, reg_in: EventRegistrationCreate, db: Session = Depends(get_db)):
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
