import os
import sys
from datetime import datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from backend.app.main import app
from backend.app.db.database import Base, get_db
from backend.app.api.v1.endpoints.auth import get_current_user
from backend.app.models.user import User, UserRole
from backend.app.models.news import News
from backend.app.models.event import Event
from backend.app.models.publication import Publication
from backend.app.models.institution import Institution

from sqlalchemy.pool import StaticPool

# Setup in-memory SQLite database for testing with StaticPool
test_engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
Base.metadata.create_all(bind=test_engine)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

class MockAdmin:
    def __init__(self):
        self.id = 1
        self.email = "admin@rcga.org"
        self.full_name = "Super Admin"
        self.role = UserRole.SUPERADMIN.value
        self.is_active = True

app.dependency_overrides[get_db] = override_get_db
app.dependency_overrides[get_current_user] = lambda: MockAdmin()

client = TestClient(app)

def run_all_tests():
    print("=== STARTING CRUD, PAGINATION, SORTING & FILTERING TESTS ===")

    # -------------------------------------------------------------
    # 1. NEWS CRUD & PAGINATION
    # -------------------------------------------------------------
    print("\n--- 1. Testing News CRUD & Pagination ---")
    # Create 5 news items
    news_ids = []
    for i in range(1, 6):
        cat = "Iqlim" if i % 2 == 1 else "Texnologiya"
        resp = client.post("/api/v1/news", json={
            "title": {"uz": f"Yangilik {i}", "en": f"News {i}"},
            "excerpt": {"uz": f"Qisqacha mazmun {i}"},
            "content": {"uz": f"Batafsil matn {i}"},
            "category": cat,
            "is_featured": (i == 1)
        })
        assert resp.status_code == 201, f"Failed to create news {i}: {resp.text}"
        news_ids.append(resp.json()["id"])
    print(f" [PASS] Created 5 news items: {news_ids}")

    # Test Pagination (page=1, size=2)
    resp = client.get("/api/v1/news?page=1&size=2")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] == 5
    assert data["page"] == 1
    assert data["size"] == 2
    assert data["pages"] == 3
    assert len(data["items"]) == 2
    print(f" [PASS] News pagination verified: total={data['total']}, pages={data['pages']}")

    # Test Category Filter (category=Iqlim)
    resp = client.get("/api/v1/news?category=Iqlim")
    assert resp.status_code == 200
    data = resp.json()
    assert all("iqlim" in item["category"].lower() for item in data["items"])
    assert data["total"] == 3
    print(f" [PASS] News category filter verified (found {data['total']} items)")

    # Test News Detail & Views increment
    first_id = news_ids[0]
    resp = client.get(f"/api/v1/news/{first_id}")
    assert resp.status_code == 200
    assert resp.json()["views_count"] >= 1
    print(f" [PASS] News detail & views increment verified (id={first_id})")

    # Test News Update
    resp = client.put(f"/api/v1/news/{first_id}", json={
        "category": "Innovatsiya",
        "title": {"uz": "Yangilangan Yangilik 1"}
    })
    assert resp.status_code == 200
    assert resp.json()["category"] == "Innovatsiya"
    print(f" [PASS] News update verified (category changed to Innovatsiya)")

    # Test News Delete
    last_id = news_ids[-1]
    resp = client.delete(f"/api/v1/news/{last_id}")
    assert resp.status_code == 200
    resp_check = client.get(f"/api/v1/news/{last_id}")
    assert resp_check.status_code == 404
    print(f" [PASS] News delete verified (id={last_id})")

    # -------------------------------------------------------------
    # 2. EVENTS CRUD & PAGINATION
    # -------------------------------------------------------------
    print("\n--- 2. Testing Events CRUD & Pagination ---")
    event_ids = []
    base_date = datetime(2026, 6, 1, 10, 0, 0)
    for i in range(1, 5):
        cat = "Forum" if i <= 2 else "Seminar"
        loc = "Toshkent, O'zbekiston" if i % 2 == 1 else "Olmaota, Qozog'iston"
        ev_date = (base_date + timedelta(days=i * 10)).isoformat()
        resp = client.post("/api/v1/events", json={
            "title": {"uz": f"Tadbir {i}", "en": f"Event {i}"},
            "description": {"uz": f"Tadbir tavsifi {i}"},
            "location": loc,
            "event_date": ev_date,
            "category": cat,
            "status": "upcoming"
        })
        assert resp.status_code == 201, f"Failed to create event {i}: {resp.text}"
        event_ids.append(resp.json()["id"])
    print(f" [PASS] Created 4 event items: {event_ids}")

    # Test Event Pagination & Sorting (sort_by=-event_date)
    resp = client.get("/api/v1/events?page=1&size=2&sort_by=-event_date")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] == 4
    assert len(data["items"]) == 2
    # Verify desc date sorting
    d1 = data["items"][0]["event_date"]
    d2 = data["items"][1]["event_date"]
    assert d1 >= d2, "Expected descending sort on event_date"
    print(" [PASS] Event pagination and descending date sorting verified")

    # Test Event Date Range Filter
    resp = client.get("/api/v1/events?date_from=2026-06-15&date_to=2026-06-30")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] >= 1
    print(f" [PASS] Event date range filter verified (found {data['total']} in date range)")

    # Test Event Location / Country Filter
    resp = client.get("/api/v1/events?country=Qozog'iston")
    assert resp.status_code == 200
    data = resp.json()
    assert all("qozog'iston" in item["location"].lower() for item in data["items"])
    print(" [PASS] Event location/country filter verified")

    # Test Event Registration
    resp = client.post(f"/api/v1/events/{event_ids[0]}/register", json={
        "full_name": "Aziz Olimov",
        "email": "aziz@example.com",
        "organization": "TIIAME"
    })
    assert resp.status_code == 200
    assert resp.json()["full_name"] == "Aziz Olimov"
    print(" [PASS] Event registration verified")

    # -------------------------------------------------------------
    # 3. PUBLICATIONS CRUD & PAGINATION
    # -------------------------------------------------------------
    print("\n--- 3. Testing Publications CRUD & Pagination ---")
    pub_ids = []
    for i in range(1, 5):
        cat = "Tuproq" if i % 2 == 1 else "Iqlim"
        resp = client.post("/api/v1/publications", json={
            "title": {"uz": f"Ilmiy maqola {i}", "en": f"Paper {i}"},
            "abstract": {"uz": f"Qisqacha bayon {i}"},
            "category": cat,
            "authors": f"Olimov A. {i}, Karimov B.",
            "doi": f"10.1000/rcga.2026.{i}",
            "published_year": 2026
        })
        assert resp.status_code == 201, f"Failed to create publication {i}: {resp.text}"
        pub_ids.append(resp.json()["id"])
    print(f" [PASS] Created 4 publication items: {pub_ids}")

    # Test Publication Pagination & Search
    resp = client.get("/api/v1/publications?page=1&size=2&search=Tuproq")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] == 2
    assert len(data["items"]) == 2
    print(" [PASS] Publication pagination & search filter verified")

    # Test Download count logger
    resp = client.post(f"/api/v1/publications/{pub_ids[0]}/download")
    assert resp.status_code == 200
    assert resp.json()["downloads_count"] == 1
    print(" [PASS] Publication download counter verified")

    # -------------------------------------------------------------
    # 4. INSTITUTIONS CRUD & PAGINATION
    # -------------------------------------------------------------
    print("\n--- 4. Testing Institutions CRUD & Pagination ---")
    inst_data = [
        {"name": {"uz": "O'zbekiston Milliy Universiteti"}, "country": "UZ", "type": "University"},
        {"name": {"uz": "Qozog'iston Milliy Agrar Universiteti"}, "country": "KZ", "type": "University"},
        {"name": {"uz": "Tojikiston Fanlar Akademiyasi"}, "country": "TJ", "type": "Research Institute"}
    ]
    inst_ids = []
    for item in inst_data:
        resp = client.post("/api/v1/institutions", json=item)
        assert resp.status_code == 201, f"Failed to create institution: {resp.text}"
        inst_ids.append(resp.json()["id"])
    print(f" [PASS] Created {len(inst_ids)} institutions: {inst_ids}")

    # Test Institution Country Filter
    resp = client.get("/api/v1/institutions?country=UZ")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] == 1
    assert data["items"][0]["country"] == "UZ"
    print(" [PASS] Institution country filter verified (country=UZ)")

    # -------------------------------------------------------------
    # 5. GLOBAL SEARCH
    # -------------------------------------------------------------
    print("\n--- 5. Testing Global Portal Search ---")
    resp = client.get("/api/v1/search?q=Yangilik")
    assert resp.status_code == 200
    s_data = resp.json()
    assert len(s_data["news"]) > 0
    assert s_data["total_matches"] > 0
    print(f" [PASS] Global search verified (found {s_data['total_matches']} matches)")

    print("\n=== ALL CRUD, PAGINATION, SORTING AND FILTERING TESTS PASSED SUCCESSFULLY! ===")

if __name__ == "__main__":
    run_all_tests()
