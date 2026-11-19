import os
import io
import logging
from typing import Tuple, Optional, Dict, Any
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

def format_file_size(size_bytes: int) -> str:
    """Formats bytes into human-readable string (KB, MB, GB)."""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.2f} KB"
    elif size_bytes < 1024 * 1024 * 1024:
        return f"{size_bytes / (1024 * 1024):.2f} MB"
    else:
        return f"{size_bytes / (1024 * 1024 * 1024):.2f} GB"

class BaseStorage:
    def save(self, content: bytes, filename: str, subfolder: str, mime_type: str) -> Dict[str, Any]:
        raise NotImplementedError

    def delete(self, filename: str, subfolder: str) -> bool:
        raise NotImplementedError

class LocalStorage(BaseStorage):
    def __init__(self, upload_dir: str = settings.UPLOAD_DIR):
        self.upload_dir = upload_dir
        # Ensure base upload directories exist
        os.makedirs(os.path.join(self.upload_dir, "images"), exist_ok=True)
        os.makedirs(os.path.join(self.upload_dir, "publications"), exist_ok=True)

    def save(self, content: bytes, filename: str, subfolder: str, mime_type: str) -> Dict[str, Any]:
        target_dir = os.path.join(self.upload_dir, subfolder)
        os.makedirs(target_dir, exist_ok=True)
        file_path = os.path.join(target_dir, filename)

        with open(file_path, "wb") as f:
            f.write(content)

        file_url = f"/uploads/{subfolder}/{filename}"
        return {
            "storage": "local",
            "file_url": file_url,
            "saved_filename": filename,
            "path": file_path,
            "size_bytes": len(content)
        }

    def delete(self, filename: str, subfolder: str) -> bool:
        file_path = os.path.join(self.upload_dir, subfolder, filename)
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                return True
            except OSError as e:
                logger.error(f"Error deleting file {file_path}: {e}")
        return False

class S3Storage(BaseStorage):
    def __init__(self):
        self.bucket = settings.S3_BUCKET_NAME
        self.endpoint_url = settings.S3_ENDPOINT_URL
        self.public_prefix = settings.S3_PUBLIC_URL_PREFIX
        self._client = None

    def _get_client(self):
        if self._client is None:
            try:
                import boto3
                from botocore.client import Config
                kwargs = {
                    "aws_access_key_id": settings.S3_ACCESS_KEY,
                    "aws_secret_access_key": settings.S3_SECRET_KEY,
                    "region_name": settings.S3_REGION_NAME or "us-east-1",
                    "config": Config(signature_version="s3v4")
                }
                if self.endpoint_url:
                    kwargs["endpoint_url"] = self.endpoint_url
                self._client = boto3.client("s3", **kwargs)
            except Exception as e:
                logger.error(f"Failed to initialize S3 client: {e}")
                raise
        return self._client

    def save(self, content: bytes, filename: str, subfolder: str, mime_type: str) -> Dict[str, Any]:
        client = self._get_client()
        key = f"{subfolder}/{filename}"

        client.put_object(
            Bucket=self.bucket,
            Key=key,
            Body=content,
            ContentType=mime_type
        )

        if self.public_prefix:
            prefix = self.public_prefix.rstrip("/")
            file_url = f"{prefix}/{key}"
        elif self.endpoint_url:
            file_url = f"{self.endpoint_url.rstrip('/')}/{self.bucket}/{key}"
        else:
            file_url = f"https://{self.bucket}.s3.{settings.S3_REGION_NAME}.amazonaws.com/{key}"

        return {
            "storage": "s3",
            "file_url": file_url,
            "saved_filename": filename,
            "path": key,
            "size_bytes": len(content)
        }

    def delete(self, filename: str, subfolder: str) -> bool:
        try:
            client = self._get_client()
            key = f"{subfolder}/{filename}"
            client.delete_object(Bucket=self.bucket, Key=key)
            return True
        except Exception as e:
            logger.error(f"Error deleting S3 object {subfolder}/{filename}: {e}")
            return False

class StorageManager:
    """Unified storage manager delegating to local disk or MinIO/S3."""
    def __init__(self):
        self.local_storage = LocalStorage()
        self._s3_storage: Optional[S3Storage] = None

    @property
    def is_s3_enabled(self) -> bool:
        return (
            getattr(settings, "STORAGE_BACKEND", "local").lower() == "s3"
            and bool(getattr(settings, "S3_ACCESS_KEY", None))
            and bool(getattr(settings, "S3_SECRET_KEY", None))
        )

    def get_backend(self) -> BaseStorage:
        if self.is_s3_enabled:
            if self._s3_storage is None:
                self._s3_storage = S3Storage()
            return self._s3_storage
        return self.local_storage

    def save_file(self, content: bytes, filename: str, subfolder: str, mime_type: str) -> Dict[str, Any]:
        backend = self.get_backend()
        try:
            return backend.save(content, filename, subfolder, mime_type)
        except Exception as e:
            if isinstance(backend, S3Storage):
                logger.warning(f"S3 upload failed ({e}), falling back to local storage.")
                return self.local_storage.save(content, filename, subfolder, mime_type)
            raise

    def delete_file(self, filename: str, subfolder: str) -> bool:
        backend = self.get_backend()
        return backend.delete(filename, subfolder)

storage_manager = StorageManager()
