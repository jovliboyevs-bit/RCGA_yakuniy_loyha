import os
import io
import uuid
import zipfile
from typing import Tuple, Dict, Any, Optional
import filetype
from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends

from backend.app.core.config import settings
from backend.app.core.storage import storage_manager, format_file_size
from backend.app.api.v1.endpoints.auth import get_current_user
from backend.app.models.user import User, UserRole

router = APIRouter()

# MIME types and corresponding allowed extensions
IMAGE_MIME_TYPES = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
}

DOC_MIME_TYPES = {
    "application/pdf": [".pdf"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    "application/msword": [".doc"],
}

ALL_ALLOWED_EXTENSIONS = sorted(
    {ext for exts in list(IMAGE_MIME_TYPES.values()) + list(DOC_MIME_TYPES.values()) for ext in exts}
)

def check_upload_permission(current_user: User) -> User:
    """Verifies that the user has permission to upload files."""
    user_role = str(current_user.role).upper().replace(" ", "").replace("_", "")
    allowed = {
        UserRole.SUPERADMIN.value,
        UserRole.MODERATOR.value,
        UserRole.RESEARCHER.value,
        "SUPERADMIN",
        "CONTENTEDITOR",
        "MODERATOR",
        "RESEARCHER"
    }
    if user_role not in allowed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Fayl yuklash uchun ruxsatingiz yetarli emas (Superadmin, Moderator yoki Tadqiqotchi roli talab qilinadi)."
        )
    return current_user

async def read_and_validate_upload(
    file: UploadFile,
    expected_category: Optional[str] = None
) -> Tuple[bytes, str, str, str, str, str]:
    """
    Validates uploaded file:
    1. Checks file extension and category (image vs publication)
    2. Enforces maximum size limits (5 MB for images, 25 MB for documents)
    3. Validates actual MIME type using magic bytes (filetype + zip inspection)
    4. Generates a secure UUID4 filename
    Returns: (content_bytes, original_filename, safe_filename, detected_mime, category, subfolder)
    """
    original_filename = file.filename or "unknown"
    ext = os.path.splitext(original_filename)[1].lower()

    if not ext:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Fayl kengaytmasi (extension) ko'rsatilmagan."
        )

    # Determine or verify category
    if expected_category == "image":
        if not any(ext in exts for exts in IMAGE_MIME_TYPES.values()):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Faqat rasm fayllari qabul qilinadi (.jpg, .jpeg, .png, .webp)."
            )
        category = "image"
        subfolder = "images"
        max_size = settings.MAX_IMAGE_SIZE_BYTES
        max_mb = settings.MAX_IMAGE_SIZE_MB
        allowed_mimes = IMAGE_MIME_TYPES
    elif expected_category == "publication":
        if not any(ext in exts for exts in DOC_MIME_TYPES.values()):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Faqat ilmiy maqola va hujjat fayllari qabul qilinadi (.pdf, .docx, .doc)."
            )
        category = "publication"
        subfolder = "publications"
        max_size = settings.MAX_DOCUMENT_SIZE_BYTES
        max_mb = settings.MAX_DOCUMENT_SIZE_MB
        allowed_mimes = DOC_MIME_TYPES
    else:
        # Auto-detect category from extension
        if any(ext in exts for exts in IMAGE_MIME_TYPES.values()):
            category = "image"
            subfolder = "images"
            max_size = settings.MAX_IMAGE_SIZE_BYTES
            max_mb = settings.MAX_IMAGE_SIZE_MB
            allowed_mimes = IMAGE_MIME_TYPES
        elif any(ext in exts for exts in DOC_MIME_TYPES.values()):
            category = "publication"
            subfolder = "publications"
            max_size = settings.MAX_DOCUMENT_SIZE_BYTES
            max_mb = settings.MAX_DOCUMENT_SIZE_MB
            allowed_mimes = DOC_MIME_TYPES
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Ruxsat berilmagan fayl formati: '{ext}'. Faqat {', '.join(ALL_ALLOWED_EXTENSIONS)} qabul qilinadi."
            )

    # Stream file and enforce maximum size limit
    CHUNK_SIZE = 64 * 1024
    chunks = []
    total_bytes = 0

    while True:
        chunk = await file.read(CHUNK_SIZE)
        if not chunk:
            break
        total_bytes += len(chunk)
        if total_bytes > max_size:
            raise HTTPException(
                status_code=413,
                detail=f"Fayl hajmi ruxsat etilgan {max_mb} MB dan oshib ketdi."
            )
        chunks.append(chunk)

    if total_bytes == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Yuklangan fayl bo'sh bo'lishi mumkin emas."
        )

    content = b"".join(chunks)

    # Magic bytes MIME type validation
    kind = filetype.guess(content)
    detected_mime = kind.mime if kind else None

    # Specific OpenXML (.docx) fallback check
    if ext == ".docx" and not detected_mime and content.startswith(b"PK\x03\x04"):
        try:
            with zipfile.ZipFile(io.BytesIO(content)) as zf:
                names = zf.namelist()
                if any(n.startswith("word/") or n == "[Content_Types].xml" for n in names):
                    detected_mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        except Exception:
            pass

    # Validate detected MIME against allowed dictionary for this category
    if not detected_mime or detected_mime not in allowed_mimes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Xavfsizlik tekshiruvi: faylning haqiqiy MIME turi ({detected_mime or 'aniqlanmadi'}) "
                   f"qabul qilinmaydi yoki kengaytmasiga mos kelmaydi."
        )

    # Check that extension matches detected MIME
    allowed_exts_for_mime = allowed_mimes[detected_mime]
    if ext not in allowed_exts_for_mime:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Fayl kengaytmasi ({ext}) uning haqiqiy MIME turiga ({detected_mime}) mos kelmaydi."
        )

    # Generate secure UUID4 filename
    safe_filename = f"{uuid.uuid4().hex}{ext}"

    return content, original_filename, safe_filename, detected_mime, category, subfolder

@router.post("", summary="General secure file upload (Images up to 5MB, Publications up to 25MB)")
async def upload_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """
    Xavfsiz fayl ombori endpointi:
    - Haqiqiy MIME-turini magic bytes orqali tekshiradi (jpg, png, webp, pdf, docx).
    - Hajmini tekshiradi (Rasmlar 5 MB, Hujjatlar 25 MB).
    - Fayl nomini UUID4 formatiga o'giradi.
    - uploads/images/ yoki uploads/publications/ papkasiga (yoki S3/MinIO ga) saqlaydi.
    """
    check_upload_permission(current_user)

    content, original_name, safe_name, mime_type, category, subfolder = await read_and_validate_upload(
        file=file,
        expected_category=None
    )

    result = storage_manager.save_file(
        content=content,
        filename=safe_name,
        subfolder=subfolder,
        mime_type=mime_type
    )

    return {
        "filename": original_name,
        "saved_filename": safe_name,
        "file_url": result["file_url"],
        "category": category,
        "mime_type": mime_type,
        "size_bytes": len(content),
        "size_human": format_file_size(len(content)),
        "storage": result["storage"]
    }

@router.post("/image", summary="Upload image only (JPG, PNG, WEBP, max 5MB)")
async def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Faqat rasmlar uchun maxsus endpoint (max 5 MB, uploads/images/)."""
    check_upload_permission(current_user)

    content, original_name, safe_name, mime_type, category, subfolder = await read_and_validate_upload(
        file=file,
        expected_category="image"
    )

    result = storage_manager.save_file(
        content=content,
        filename=safe_name,
        subfolder=subfolder,
        mime_type=mime_type
    )

    return {
        "filename": original_name,
        "saved_filename": safe_name,
        "file_url": result["file_url"],
        "category": category,
        "mime_type": mime_type,
        "size_bytes": len(content),
        "size_human": format_file_size(len(content)),
        "storage": result["storage"]
    }

@router.post("/publication", summary="Upload scientific publication or document only (PDF, DOCX, max 25MB)")
async def upload_publication(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Faqat ilmiy maqolalar va hisobotlar uchun maxsus endpoint (max 25 MB, uploads/publications/)."""
    check_upload_permission(current_user)

    content, original_name, safe_name, mime_type, category, subfolder = await read_and_validate_upload(
        file=file,
        expected_category="publication"
    )

    result = storage_manager.save_file(
        content=content,
        filename=safe_name,
        subfolder=subfolder,
        mime_type=mime_type
    )

    return {
        "filename": original_name,
        "saved_filename": safe_name,
        "file_url": result["file_url"],
        "category": category,
        "mime_type": mime_type,
        "size_bytes": len(content),
        "size_human": format_file_size(len(content)),
        "storage": result["storage"]
    }
