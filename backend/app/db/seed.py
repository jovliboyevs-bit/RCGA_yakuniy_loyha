import sys
from datetime import datetime, timedelta
from backend.app.db.database import SessionLocal, engine, Base
from backend.app.models.user import User
from backend.app.models.news import News
from backend.app.models.event import Event
from backend.app.models.publication import Publication
from backend.app.models.institution import Institution
from backend.app.core.security import get_password_hash

def seed_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Super Admin User
        if not db.query(User).filter(User.email == "admin@rcga.org").first():
            admin = User(
                email="admin@rcga.org",
                full_name="RCGA Administrator",
                hashed_password=get_password_hash("admin123"),
                role="Super Admin",
                organization="Regional Center for Green Agriculture",
                country="UZ"
            )
            db.add(admin)
            print("Added admin user (admin@rcga.org / admin123)")

        # 2. Seed News
        if db.query(News).count() == 0:
            news_items = [
                News(
                    title_uz="Orolbo'yi Mintaqasida Sho'rlangan Tuproqlarni Tiklash Bo'yicha Yangi Xalqaro Loyiha Boshlandi",
                    title_en="New International Project Launched to Restore Saline Soils in Aral Sea Region",
                    category="Mintaqaviy",
                    excerpt_uz="RCGA va CAREC hamkorligida Aral dengizi basseynida iqlimga chidamli bio-amaliyotlarni joriy etishga qaratilgan 4 yillik dastur tajriba maydonlarida ish boshladi.",
                    content_uz="RCGA va CAREC hamkorligida Aral dengizi basseynida iqlimga chidamli bio-amaliyotlarni joriy etishga qaratilgan 4 yillik dastur tajriba maydonlarida ish boshladi. Ushbu dastur doirasida 500 dan ortiq fermer xo'jaliklari sho'rlangan yerlarda halofit o'simliklarini yetishtirish bo'yicha amaliy ko'nikmalarga ega bo'ladi.",
                    image_url="assets/aral-sea-conservation.jpg",
                    author="RCGA Press Office",
                    is_featured=True
                ),
                News(
                    title_uz="Farg'ona Vodiysida Tomchilatib Sug'orish Texnologiyalari Samadorligi 40% Ga Oshdi",
                    title_en="Drip Irrigation Efficiency Increases by 40% in Fergana Valley",
                    category="Texnologiya",
                    excerpt_uz="Aqlli datchiklar va avtomatlashtirilgan gidro-monitoring tizimlari suv sarfini keskin kamaytirish bilan birga hosildorlikni oshirmoqda.",
                    content_uz="Aqlli datchiklar va avtomatlashtirilgan gidro-monitoring tizimlari suv sarfini keskin kamaytirish bilan birga hosildorlikni oshirmoqda. TDAU va RCGA mutaxassislari tomonidan o'tkazilgan tahlillar shuni ko'rsatdiki...",
                    image_url="assets/farmer-healthy-soil.jpg",
                    author="Dr. Kamola Alimova",
                    is_featured=False
                ),
                News(
                    title_uz="Markaziy Osiyo Agrar Universitetlari Konsorsiumi Yangi Tadqiqot Tarmog'ini Yo'lga Qo'ydi",
                    title_en="Central Asian Agrarian Universities Consortium Launches New Research Network",
                    category="Innovatsiya",
                    excerpt_uz="TIIAME, Qazaq Milliy Agrar Universiteti va Qirg'iziston Agrar Universiteti o'rtasida uch tomonlama kelishuv imzolandi.",
                    content_uz="TIIAME, Qazaq Milliy Agrar Universiteti va Qirg'iziston Agrar Universiteti o'rtasida uch tomonlama kelishuv imzolandi.",
                    image_url="assets/uzbek-china-lab.jpg",
                    author="RCGA Academic Board",
                    is_featured=False
                )
            ]
            db.add_all(news_items)
            print("Added news seed items.")

        # 3. Seed Publications
        if db.query(Publication).count() == 0:
            pubs = [
                Publication(
                    title_uz="Markaziy Osiyo Qishloq Xo'jaligida Suv Resurslarini Boshqarish va Iqlim Risklari",
                    title_en="Water Resources Management and Climate Risks in Central Asian Agriculture",
                    category="Iqlim",
                    authors="Prof. D. Ergashev, Dr. K. Alimova, M. Saparov",
                    doi="10.1016/j.agwat.2026.10824",
                    abstract_uz="Ushbu tadqiqotda CAREC mintaqasining 8 ta mamlakatida so'nggi 20 yildagi gidrologik o'zgarishlar va iqlim ssenariylari tahlil qilingan.",
                    cover_image="assets/central-asia-climate.jpg",
                    published_year=2026,
                    downloads_count=342,
                    views_count=1280,
                    citations_count=18,
                    is_featured=True
                ),
                Publication(
                    title_uz="Sho'rlangan Tuproqlarda Halofit Ekinlarini Yetishtirish Bo'yicha Metodik Qo'llanma",
                    title_en="Methodological Guide for Growing Halophyte Crops on Saline Soils",
                    category="Tuproq",
                    authors="Dr. Kamola Alimova, FAO Expert Group",
                    doi="10.1080/09064710.2025.21098",
                    abstract_uz="Halofitlar va tuzi yuqori bo'lgan hududlarda agro-biotexnologiyalardan foydalanish metodologiyasi.",
                    cover_image="assets/hand-soil-planting.jpg",
                    published_year=2025,
                    downloads_count=512,
                    views_count=2100,
                    citations_count=42,
                    is_featured=True
                ),
                Publication(
                    title_uz="Raqamli Agrosanoat: Sensorlar va Sun'iy Intelekt Yordamida Ekin Monitoringi",
                    title_en="Digital Agro-industry: Crop Monitoring via Sensors and AI",
                    category="Raqamli agrotex",
                    authors="Sirojiddin Yusupov, RCGA Tech Lab",
                    doi="10.1109/AGRI-AI.2026.90112",
                    abstract_uz="Dronlar va sun'iy yo'ldosh tasvirlari yordamida ekinlar kasalliklarini barvaqt aniqlash modeli.",
                    cover_image="assets/agri-service-center.jpg",
                    published_year=2026,
                    downloads_count=890,
                    views_count=3400,
                    citations_count=29,
                    is_featured=False
                )
            ]
            db.add_all(pubs)
            print("Added publication seed items.")

        # 4. Seed Events
        if db.query(Event).count() == 0:
            events = [
                Event(
                    title_uz="Markaziy Osiyo Yashil Qishloq Xo'jaligi Xalqaro Forum 2026",
                    title_en="Central Asia Green Agriculture International Forum 2026",
                    location="Toshkent, O'zbekiston (Gidrid / Onlayn)",
                    event_date=datetime.now() + timedelta(days=20),
                    category="Forum",
                    status="upcoming",
                    description_uz="Mintaqaviy olimlar, hukumat vakillari va xalqaro tashkilotlarning yillik iqlim va agrosanoat sammiti.",
                    image_url="assets/conference-people.jpg",
                    is_featured=True
                ),
                Event(
                    title_uz="Agro-biotexnologiya va Tuproq Mikrobiomasi Bo'yicha Master-Klass",
                    title_en="Masterclass on Agro-biotechnology and Soil Microbiome",
                    location="Ostona, Qozog'iston (QazNAU)",
                    event_date=datetime.now() + timedelta(days=45),
                    category="O'quv kursi",
                    status="upcoming",
                    description_uz="Yosh olimlar va fermerlar uchun tuproq unumdorligini bio-o'g'itlar orqali oshirish bo'yicha amaliy o'quv kursi.",
                    image_url="assets/young-scientist-school.jpg",
                    is_featured=False
                )
            ]
            db.add_all(events)
            print("Added event seed items.")

        # 5. Seed Institutions
        if db.query(Institution).count() == 0:
            insts = [
                Institution(name="TIIAME — Toshkent Irrigatsiya va Qishloq Xo'jaligini Mechanizatsiyalash Muhandislari Instituti", country="UZ", country_name_uz="O'zbekiston", type="University", website="https://tiiame.uz"),
                Institution(name="TDAU — Toshkent Davlat Agrar Universiteti", country="UZ", country_name_uz="O'zbekiston", type="University", website="https://tdau.uz"),
                Institution(name="QazNAU — Qazaq Milliy Agrar Tadqiqot Universiteti", country="KZ", country_name_uz="Qozog'iston", type="University", website="https://kaznau.kz"),
                Institution(name="KNAU — Qirg'iziston Milliy Agrar Universiteti", country="KG", country_name_uz="Qirg'iziston", type="University", website="https://knau.kg"),
                Institution(name="TAU — Tojikiston Agrar Universiteti", country="TJ", country_name_uz="Tojikiston", type="University", website="https://tau.tj"),
                Institution(name="FAO Uzbekistan — BMT Qishloq Xo'jaligi Tashkiloti", country="UZ", country_name_uz="O'zbekiston", type="International Org", website="https://fao.org")
            ]
            db.add_all(insts)
            print("Added institution seed items.")

        db.commit()
        print("Database seeding completed successfully.")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
