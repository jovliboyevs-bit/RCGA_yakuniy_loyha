from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.db.database import get_db
from backend.app.models.event import Event, EventRegistration
from backend.app.schemas.event import EventResponse, EventCreate, EventRegistrationCreate, EventRegistrationResponse

router = APIRouter()

@router.get("", response_model=List[EventResponse])
def read_events(
    category: Optional[str] = None,
    status: Optional[str] = None,
    featured: Optional[bool] = None,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    query = db.query(Event)
    if category and category.lower() != "barchasi":
        query = query.filter(Event.category.ilike(f"%{category}%"))
    if status:
        query = query.filter(Event.status == status)
    if featured is not None:
        query = query.filter(Event.is_featured == featured)
    return query.order_by(Event.event_date.asc()).offset(skip).limit(limit).all()

@router.get("/{event_id}", response_model=EventResponse)
def read_event_detail(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Tadbir topilmadi")
    return event

@router.post("", response_model=EventResponse)
def create_event(event_in: EventCreate, db: Session = Depends(get_db)):
    event = Event(**event_in.dict())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

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
