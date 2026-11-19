import os
import sys
import io
import zipfile
from fastapi.testclient import TestClient

# Add project root to sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from backend.app.main import app
from backend.app.api.v1.endpoints.auth import get_current_user

client = TestClient(app)

class MockUser:
    def __init__(self, role: str):
        self.id = 1
        self.email = "admin@rcga.org"
        self.full_name = "System Admin"
        self.role = role
        self.is_active = True

current_mock_role = "SUPERADMIN"

def mock_get_current_user():
    return MockUser(role=current_mock_role)

app.dependency_overrides[get_current_user] = mock_get_current_user

def test_upload_security():
    global current_mock_role

    # 1. Test Valid PNG Upload
    current_mock_role = "SUPERADMIN"
    png_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\nIDATx\x9cc`\x00\x00\x00\x02\x00\x01H\xaf\xa4q\x00\x00\x00\x00IEND\xaeB`\x82'
    resp = client.post(
        "/api/v1/upload",
        files={"file": ("test_logo.png", png_content, "image/png")}
    )
    assert resp.status_code == 200, f"PNG upload failed: {resp.text}"
    data = resp.json()
    assert data["category"] == "image"
    assert data["mime_type"] == "image/png"
    assert data["file_url"].startswith("/uploads/images/")
    assert data["saved_filename"].endswith(".png")

    # Verify static file serving
    static_resp = client.get(data["file_url"])
    assert static_resp.status_code == 200
    assert static_resp.content == png_content

    # 2. Test Valid PDF Upload
    pdf_content = b'%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF'
    resp = client.post(
        "/api/v1/upload",
        files={"file": ("scientific_paper.pdf", pdf_content, "application/pdf")}
    )
    assert resp.status_code == 200, f"PDF upload failed: {resp.text}"
    data = resp.json()
    assert data["category"] == "publication"
    assert data["mime_type"] == "application/pdf"
    assert data["file_url"].startswith("/uploads/publications/")
    assert data["saved_filename"].endswith(".pdf")

    # Verify static file serving
    static_resp = client.get(data["file_url"])
    assert static_resp.status_code == 200
    assert static_resp.content == pdf_content

    # 3. Test Valid DOCX Upload
    bio = io.BytesIO()
    with zipfile.ZipFile(bio, 'w') as zf:
        zf.writestr('[Content_Types].xml', '<Types></Types>')
        zf.writestr('word/document.xml', '<w:document></w:document>')
    docx_content = bio.getvalue()
    resp = client.post(
        "/api/v1/upload/publication",
        files={"file": ("carec_report.docx", docx_content, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")}
    )
    assert resp.status_code == 200, f"DOCX upload failed: {resp.text}"
    data = resp.json()
    assert data["category"] == "publication"
    assert "wordprocessingml" in data["mime_type"]
    assert data["file_url"].startswith("/uploads/publications/")

    # 4. Test Spoofed Extension (Fake PDF with plain text)
    fake_pdf = b"Hello, this is just plain text masquerading as a PDF file."
    resp = client.post(
        "/api/v1/upload",
        files={"file": ("spoofed.pdf", fake_pdf, "application/pdf")}
    )
    assert resp.status_code == 400

    # 5. Test Spoofed Extension (Fake JPG with Windows PE Executable)
    fake_jpg = b"MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xff\xff\x00\x00"
    resp = client.post(
        "/api/v1/upload",
        files={"file": ("trojan.jpg", fake_jpg, "image/jpeg")}
    )
    assert resp.status_code == 400

    # 6. Test Disallowed Extension (.exe / .sh)
    resp = client.post(
        "/api/v1/upload",
        files={"file": ("script.sh", b"#!/bin/bash\necho hack", "text/x-sh")}
    )
    assert resp.status_code == 400

    # 7. Test Image Size Limit (> 5 MB)
    large_image = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR' + (b'\x00' * (5 * 1024 * 1024 + 1024))
    resp = client.post(
        "/api/v1/upload/image",
        files={"file": ("huge_photo.png", large_image, "image/png")}
    )
    assert resp.status_code == 413

    # 8. Test Document Size Limit (> 25 MB)
    large_doc = b'%PDF-1.4\n' + (b'0' * (25 * 1024 * 1024 + 1024))
    resp = client.post(
        "/api/v1/upload/publication",
        files={"file": ("huge_doc.pdf", large_doc, "application/pdf")}
    )
    assert resp.status_code == 413

    # 9. Test Type Mismatch on dedicated endpoints
    resp = client.post(
        "/api/v1/upload/image",
        files={"file": ("document.pdf", pdf_content, "application/pdf")}
    )
    assert resp.status_code == 400

    resp = client.post(
        "/api/v1/upload/publication",
        files={"file": ("photo.png", png_content, "image/png")}
    )
    assert resp.status_code == 400

    # 10. Test Unauthorized User (Role FARMER without upload privilege)
    current_mock_role = "FARMER"
    resp = client.post(
        "/api/v1/upload",
        files={"file": ("test.png", png_content, "image/png")}
    )
    assert resp.status_code == 403

    # 11. Test Researcher role can upload
    current_mock_role = "RESEARCHER"
    resp = client.post(
        "/api/v1/upload",
        files={"file": ("researcher_paper.pdf", pdf_content, "application/pdf")}
    )
    assert resp.status_code == 200

    # Clean up test files
    for sub in ["images", "publications"]:
        sub_dir = os.path.join(BASE_DIR, "backend", "uploads", sub)
        if os.path.exists(sub_dir):
            for fname in os.listdir(sub_dir):
                if fname != ".gitkeep":
                    try:
                        os.remove(os.path.join(sub_dir, fname))
                    except OSError:
                        pass

    print("ALL UPLOAD SECURITY TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_upload_security()
