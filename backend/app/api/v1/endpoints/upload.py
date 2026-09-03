import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from backend.app.api.v1.endpoints.auth import get_current_user
from backend.app.models.user import User

router = APIRouter()

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".webp", ".doc", ".docx"}

@router.post("", summary="Upload document or image file")
async def upload_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ["Super Admin", "Content Editor", "Researcher"]:
        raise HTTPException(status_code=403, detail="Fayl yuklash uchun ruxsatingiz yetarli emas.")

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"Faqat ruxsat berilgan fayl formatlari: {', '.join(ALLOWED_EXTENSIONS)}")

    unique_filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    return {
        "filename": file.filename,
        "saved_filename": unique_filename,
        "file_url": f"/uploads/{unique_filename}",
        "size_bytes": len(content)
    }
