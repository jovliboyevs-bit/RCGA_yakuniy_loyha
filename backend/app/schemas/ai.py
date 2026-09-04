from pydantic import BaseModel
from typing import Optional, List, Any

class AIChatMessage(BaseModel):
    role: str # "user" or "assistant"
    content: str

class AIChatRequest(BaseModel):
    message: str
    language: Optional[str] = "uz" # uz, ru, en
    category: Optional[str] = "general" # climate, soil, irrigation, policy
    history: Optional[List[dict]] = None # [{"role": "user", "content": "..."}, ...]
    session_id: Optional[str] = None
    api_key: Optional[str] = None

class AIChatSource(BaseModel):
    title: str
    doi: Optional[str] = None
    url: Optional[str] = None
    year: Optional[int] = None
    authors: Optional[str] = None

class AIChatResponse(BaseModel):
    response: str
    confidence: float = 0.98
    relevant_sources: List[Any] = []
    model_used: Optional[str] = "RCGA-AgroAI-Engine"

