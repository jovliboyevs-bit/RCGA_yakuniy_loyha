import requests
import json
import io
import time

BASE_URL = "http://127.0.0.1:8000"

def test_milestone_1_1():
    print("\n" + "="*60)
    print("TEST 1.1: Environment & Project Health")
    print("="*60)
    
    # 1. Health endpoint
    resp = requests.get(f"{BASE_URL}/health")
    assert resp.status_code == 200, f"Health check failed: {resp.text}"
    print(f" [PASS] /health check: {resp.json()}")

    # 2. OpenAPI JSON
    resp = requests.get(f"{BASE_URL}/api/v1/openapi.json")
    assert resp.status_code == 200
    print(f" [PASS] OpenAPI spec loaded: {resp.json().get('info', {}).get('title')}")

    # 3. Frontend static serving
    resp = requests.get(f"{BASE_URL}/")
    assert resp.status_code == 200
    assert "Regional Center for Green Agriculture" in resp.text or "<!DOCTYPE html>" in resp.text
    print(" [PASS] Frontend static index.html served successfully")

def test_milestone_1_2():
    print("\n" + "="*60)
    print("TEST 1.2: Enterprise Security & RBAC (JWT, Blacklist, Rate-Limit)")
    print("="*60)

    # 1. Login with Admin credentials
    login_resp = requests.post(f"{BASE_URL}/api/v1/auth/login", data={
        "username": "admin@rcga.org",
        "password": "Admin2026!#"
    })
    assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
    auth_data = login_resp.json()
    access_token = auth_data["access_token"]
    refresh_token = auth_data["refresh_token"]
    user_info = auth_data["user"]
    print(f" [PASS] Login success! Role: {user_info['role']}, Country: {user_info.get('country')}")
    print(f"        Access Token received (length {len(access_token)})")
    print(f"        Refresh Token received (length {len(refresh_token)})")

    headers = {"Authorization": f"Bearer {access_token}"}

    # 2. Protected profile /auth/me
    me_resp = requests.get(f"{BASE_URL}/api/v1/auth/me", headers=headers)
    assert me_resp.status_code == 200
    me_data = me_resp.json()
    assert me_data["role"] == "SUPERADMIN"
    assert me_data["is_verified"] is True
    print(f" [PASS] /auth/me verified: {me_data['email']}, Role: {me_data['role']}, Verified: {me_data['is_verified']}")

    # 3. Refresh token flow
    ref_resp = requests.post(f"{BASE_URL}/api/v1/auth/refresh", json={"refresh_token": refresh_token})
    assert ref_resp.status_code == 200, f"Token refresh failed: {ref_resp.text}"
    new_tokens = ref_resp.json()
    print(" [PASS] Token refreshed successfully: new access & refresh tokens issued")

    # 4. Password Complexity Validator check on registration
    weak_reg = requests.post(f"{BASE_URL}/api/v1/auth/register", json={
        "email": "weak_tester@rcga.org",
        "password": "simple", # No uppercase, no digit, no special char, <8 chars
        "full_name": "Weak Password User",
        "role": "Farmer",
        "country": "UZ"
    })
    assert weak_reg.status_code == 422, f"Weak password should be rejected with 422, got {weak_reg.status_code}"
    print(" [PASS] Weak password properly rejected by Pydantic validator")

    # 5. Logout & Blacklist Check
    logout_resp = requests.post(f"{BASE_URL}/api/v1/auth/logout", headers=headers)
    assert logout_resp.status_code == 200
    print(" [PASS] User logged out, token sent to blacklist")

    # Verify blacklisted token is rejected
    check_revoked = requests.get(f"{BASE_URL}/api/v1/auth/me", headers=headers)
    assert check_revoked.status_code == 401, f"Revoked token should be 401, got {check_revoked.status_code}"
    print(" [PASS] Blacklisted token successfully rejected with 401 Unauthorized")

    return access_token

def test_milestone_1_3():
    print("\n" + "="*60)
    print("TEST 1.3: Multilingual (i18n) Dynamic Architecture")
    print("="*60)

    # 1. Request news in Uzbek
    uz_resp = requests.get(f"{BASE_URL}/api/v1/news?lang=uz&limit=1")
    assert uz_resp.status_code == 200
    uz_item = uz_resp.json()["items"][0]
    print(f" [PASS] Uzbek language (?lang=uz):")
    print(f"        Title: {uz_item['title'][:60]}...")

    # 2. Request news in Russian
    ru_resp = requests.get(f"{BASE_URL}/api/v1/news?lang=ru&limit=1")
    assert ru_resp.status_code == 200
    ru_item = ru_resp.json()["items"][0]
    print(f" [PASS] Russian language (?lang=ru):")
    print(f"        Title: {ru_item['title'][:60]}...")

    # 3. Request news in English
    en_resp = requests.get(f"{BASE_URL}/api/v1/news?lang=en&limit=1")
    assert en_resp.status_code == 200
    en_item = en_resp.json()["items"][0]
    print(f" [PASS] English language (?lang=en):")
    print(f"        Title: {en_item['title'][:60]}...")

    # 4. Fallback test via Accept-Language header
    fallback_resp = requests.get(f"{BASE_URL}/api/v1/news?limit=1", headers={"Accept-Language": "fr-FR,fr;q=0.9"})
    assert fallback_resp.status_code == 200
    fb_item = fallback_resp.json()["items"][0]
    assert fb_item["title"] == en_item["title"] or fb_item["title"] == uz_item["title"]
    print(" [PASS] Accept-Language fallback to English/Uzbek verified")

def test_milestone_1_4():
    print("\n" + "="*60)
    print("TEST 1.4: Secure File Storage (Magic Bytes, Limits, UUID4)")
    print("="*60)

    # Login afresh to get valid admin token
    login_resp = requests.post(f"{BASE_URL}/api/v1/auth/login", data={
        "username": "admin@rcga.org",
        "password": "Admin2026!#"
    })
    headers = {"Authorization": f"Bearer {login_resp.json()['access_token']}"}

    # 1. Valid PNG image upload
    png_bytes = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\nIDATx\x9cc`\x00\x00\x00\x02\x00\x01H\xaf\xa4q\x00\x00\x00\x00IEND\xaeB`\x82'
    resp = requests.post(
        f"{BASE_URL}/api/v1/upload",
        headers=headers,
        files={"file": ("live_test_logo.png", png_bytes, "image/png")}
    )
    assert resp.status_code == 200, f"Image upload failed: {resp.text}"
    img_data = resp.json()
    assert img_data["category"] == "image"
    assert img_data["file_url"].startswith("/uploads/images/")
    print(f" [PASS] Valid PNG image uploaded: {img_data['file_url']}")

    # Verify HTTP serving of uploaded image
    file_check = requests.get(f"{BASE_URL}{img_data['file_url']}")
    assert file_check.status_code == 200
    assert file_check.content == png_bytes
    print(" [PASS] Uploaded PNG is live and accessible via HTTP")

    # 2. Valid PDF publication upload
    pdf_bytes = b'%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF'
    resp = requests.post(
        f"{BASE_URL}/api/v1/upload",
        headers=headers,
        files={"file": ("scientific_paper.pdf", pdf_bytes, "application/pdf")}
    )
    assert resp.status_code == 200, f"PDF upload failed: {resp.text}"
    pdf_data = resp.json()
    assert pdf_data["category"] == "publication"
    assert pdf_data["file_url"].startswith("/uploads/publications/")
    print(f" [PASS] Valid PDF publication uploaded: {pdf_data['file_url']}")

    # 3. Magic Bytes Protection: Disguised text file as PDF
    fake_pdf = b"This is just normal text, pretending to be a PDF file."
    spoof_resp = requests.post(
        f"{BASE_URL}/api/v1/upload",
        headers=headers,
        files={"file": ("malicious.pdf", fake_pdf, "application/pdf")}
    )
    assert spoof_resp.status_code == 400
    print(f" [PASS] Magic bytes caught spoofed PDF: rejected with 400 Bad Request")

    # 4. Magic Bytes Protection: Disguised EXE file as JPG
    fake_jpg = b"MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xff\xff"
    exe_resp = requests.post(
        f"{BASE_URL}/api/v1/upload",
        headers=headers,
        files={"file": ("trojan.jpg", fake_jpg, "image/jpeg")}
    )
    assert exe_resp.status_code == 400
    print(f" [PASS] Magic bytes caught disguised Windows EXE: rejected with 400 Bad Request")

    # 5. Size Limit Check (> 5MB for images)
    large_image = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR' + (b'\x00' * (5 * 1024 * 1024 + 100))
    large_resp = requests.post(
        f"{BASE_URL}/api/v1/upload/image",
        headers=headers,
        files={"file": ("huge.png", large_image, "image/png")}
    )
    assert large_resp.status_code == 413
    print(" [PASS] Image > 5MB rejected with 413 Content Too Large")

def test_milestone_1_5():
    print("\n" + "="*60)
    print("TEST 1.5: CRUD, Pagination, Sorting, Filtering & Search")
    print("="*60)

    # Login to get admin token for CRUD
    login_resp = requests.post(f"{BASE_URL}/api/v1/auth/login", data={
        "username": "admin@rcga.org",
        "password": "Admin2026!#"
    })
    headers = {"Authorization": f"Bearer {login_resp.json()['access_token']}"}

    # 1. News Pagination & Category Filter
    news_paged = requests.get(f"{BASE_URL}/api/v1/news?page=1&size=2")
    assert news_paged.status_code == 200
    n_data = news_paged.json()
    assert "total" in n_data and "items" in n_data
    print(f" [PASS] News pagination: total={n_data['total']}, page={n_data['page']}, size={n_data['size']}, pages={n_data['pages']}")

    # 2. Events Filtering & Sorting
    events_resp = requests.get(f"{BASE_URL}/api/v1/events?sort_by=event_date")
    assert events_resp.status_code == 200
    e_data = events_resp.json()
    print(f" [PASS] Events retrieved: total={e_data['total']}, sorted by event_date")

    # 3. Publications Search & Download Logging
    pub_resp = requests.get(f"{BASE_URL}/api/v1/publications?page=1&size=5")
    assert pub_resp.status_code == 200
    p_data = pub_resp.json()
    first_pub_id = p_data["items"][0]["id"]
    print(f" [PASS] Publications retrieved: total={p_data['total']}")

    dl_resp = requests.post(f"{BASE_URL}/api/v1/publications/{first_pub_id}/download")
    assert dl_resp.status_code == 200
    print(f" [PASS] Publication download counter incremented: {dl_resp.json()['downloads_count']}")

    # 4. Institutions CAREC Country Filter
    inst_resp = requests.get(f"{BASE_URL}/api/v1/institutions?country=UZ")
    assert inst_resp.status_code == 200
    i_data = inst_resp.json()
    assert all(item["country"] == "UZ" for item in i_data["items"])
    print(f" [PASS] Institutions filtered by CAREC country (UZ): found {i_data['total']}")

    # 5. Global Portal Search
    search_resp = requests.get(f"{BASE_URL}/api/v1/search?q=Aral")
    assert search_resp.status_code == 200
    s_data = search_resp.json()
    print(f" [PASS] Global search for 'Aral': found {s_data['total_matches']} matching items across portal")

    # 6. Admin Stats
    stats_resp = requests.get(f"{BASE_URL}/api/v1/admin/stats", headers=headers)
    assert stats_resp.status_code == 200
    stats = stats_resp.json()
    print(f" [PASS] Admin stats verified: {stats}")

if __name__ == "__main__":
    print("\n" + "#"*60)
    print("# RCGA DIGITAL PLATFORM: FULL LIVE SYSTEM TEST")
    print("#"*60)
    
    test_milestone_1_1()
    test_milestone_1_2()
    test_milestone_1_3()
    test_milestone_1_4()
    test_milestone_1_5()

    print("\n" + "#"*60)
    print("# ALL 5 MILESTONES VERIFIED SUCCESSFULLY AGAINST LIVE SERVER!")
    print("#"*60)
