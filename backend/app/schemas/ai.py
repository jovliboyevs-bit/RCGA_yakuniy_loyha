from pydantic import BaseModel
from typing import Optional, List

class AIChatRequest(BaseModel):
    message: str
    language: Optional[str] = "uz" # uz, ru, en
    category: Optional[str] = "general" # climate, soil, irrigation, policy

class AIChatResponse(BaseModel):
    response: str
    confidence: float = 0.98
    relevant_sources: List[str] = []
