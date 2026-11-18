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
        admin_user = db.query(User).filter(User.email == "admin@rcga.org").first()
        if not admin_user:
            admin = User(
                email="admin@rcga.org",
                full_name="RCGA Administrator",
                hashed_password=get_password_hash("Admin2026!#"),
                role="SUPERADMIN",
                organization="Regional Center for Green Agriculture",
                country="UZ",
                is_verified=True
            )
            db.add(admin)
            print("Added admin user (admin@rcga.org / Admin2026!#)")
        else:
            admin_user.role = "SUPERADMIN"
            admin_user.is_verified = True
            db.commit()

        # 2. Seed Multilingual News
        if db.query(News).count() == 0:
            news_items = [
                News(
                    title={
                        "uz": "Orolbo'yi Mintaqasida Sho'rlangan Tuproqlarni Tiklash Bo'yicha Yangi Xalqaro Loyiha Boshlandi",
                        "ru": "В Приаралье запущен новый международный проект по восстановлению засоленных почв",
                        "en": "New International Project Launched to Restore Saline Soils in Aral Sea Region",
                        "kk": "Арал өңірінде тұзданған топырақты қалпына келтіру бойынша жаңа халықаралық жоба басталды"
                    },
                    category="Mintaqaviy",
                    excerpt={
                        "uz": "RCGA va CAREC hamkorligida Aral dengizi basseynida iqlimga chidamli bio-amaliyotlarni joriy etishga qaratilgan 4 yillik dastur tajriba maydonlarida ish boshladi.",
                        "ru": "При сотрудничестве RCGA и CAREC стартовала 4-летняя программа по внедрению климатически устойчивых биопрактик в бассейне Аральского моря.",
                        "en": "In cooperation with RCGA and CAREC, a 4-year initiative introducing climate-resilient practices has started in Aral Sea basin pilot fields.",
                        "kk": "RCGA мен CAREC серіктестігінде Арал теңізі бассейнінде климатқа бейімделген био-тәжірибелерді енгізу бойынша 4 жылдық бағдарлама басталды."
                    },
                    content={
                        "uz": "RCGA va CAREC hamkorligida Aral dengizi basseynida iqlimga chidamli bio-amaliyotlarni joriy etishga qaratilgan 4 yillik dastur tajriba maydonlarida ish boshladi. Ushbu dastur doirasida 500 dan ortiq fermer xo'jaliklari sho'rlangan yerlarda halofit o'simliklarini yetishtirish bo'yicha amaliy ko'nikmalarga ega bo'ladi.",
                        "ru": "При сотрудничестве RCGA и CAREC стартовала 4-летняя программа по внедрению климатически устойчивых биопрактик в бассейне Аральского моря. Более 500 фермерских хозяйств освоят методы выращивания галофитов.",
                        "en": "In cooperation with RCGA and CAREC, a 4-year initiative introducing climate-resilient practices has started in Aral Sea basin pilot fields. Over 500 farms will gain skills in growing halophyte crops.",
                        "kk": "RCGA мен CAREC серіктестігінде Арал теңізі бассейнінде 500-ден астам шаруа қожалығы галофит өсімдіктерін өсіру бойынша тәжірибе жинақтайды."
                    },
                    image_url="assets/aral-sea-conservation.jpg",
                    author="RCGA Press Office",
                    is_featured=True,
                    slug="orolboyi-tuproqlarni-tiklash-loyihasi"
                ),
                News(
                    title={
                        "uz": "Farg'ona Vodiysida Tomchilatib Sug'orish Texnologiyalari Samadorligi 40% Ga Oshdi",
                        "ru": "Эффективность капельного орошения в Ферганской долине выросла на 40%",
                        "en": "Drip Irrigation Efficiency Increases by 40% in Fergana Valley",
                        "kk": "Ферғана аңғарында тамшылатып суару тиімділігі 40%-ға өсті"
                    },
                    category="Texnologiya",
                    excerpt={
                        "uz": "Aqlli datchiklar va avtomatlashtirilgan gidro-monitoring tizimlari suv sarfini keskin kamaytirish bilan birga hosildorlikni oshirmoqda.",
                        "ru": "Умные датчики и автоматизированный гидромониторинг существенно экономят воду при росте урожайности.",
                        "en": "Smart IoT sensors and automated hydro-monitoring systems dramatically reduce water waste while boosting yield.",
                        "kk": "Ақылды датчиктер мен автоматтандырылған гидро-мониторинг су үнемдеумен бірге өнімділікті арттыруда."
                    },
                    content={
                        "uz": "Aqlli datchiklar va avtomatlashtirilgan gidro-monitoring tizimlari suv sarfini keskin kamaytirish bilan birga hosildorlikni oshirmoqda. TDAU va RCGA mutaxassislari tomonidan o'tkazilgan tahlillar shuni ko'rsatdiki...",
                        "ru": "Умные датчики и автоматизированный гидромониторинг существенно экономят воду при росте урожайности. Анализ ученых ТГАУ и RCGA подтвердил эффективность инноваций...",
                        "en": "Smart IoT sensors and automated hydro-monitoring systems dramatically reduce water waste while boosting yield. Joint field trials by Tashkent State Agrarian University and RCGA confirm major efficiency gains...",
                        "kk": "Ақылды датчиктер мен автоматтандырылған гидро-мониторинг су үнемдеумен бірге өнімділікті арттыруда. ТДАУ мен RCGA ғалымдарының талдаулары осыны дәлелдеді..."
                    },
                    image_url="assets/farmer-healthy-soil.jpg",
                    author="Dr. Kamola Alimova",
                    is_featured=False,
                    slug="fargona-tomchilatib-sugorish"
                )
            ]
            db.add_all(news_items)
            print("Added multilingual news seed items.")

        # 3. Seed Multilingual Publications
        if db.query(Publication).count() == 0:
            pubs = [
                Publication(
                    title={
                        "uz": "Markaziy Osiyo Qishloq Xo'jaligida Suv Resurslarini Boshqarish va Iqlim Risklari",
                        "ru": "Управление водными ресурсами и климатические риски в сельском хозяйстве Центральной Азии",
                        "en": "Water Resources Management and Climate Risks in Central Asian Agriculture",
                        "kk": "Орталық Азия ауыл шаруашылығындағы су ресурстарын басқару және климаттық қатерлер"
                    },
                    category="Iqlim",
                    authors="Prof. D. Ergashev, Dr. K. Alimova, M. Saparov",
                    doi="10.1016/j.agwat.2026.10824",
                    abstract={
                        "uz": "Ushbu tadqiqotda CAREC mintaqasining 8 ta mamlakatida so'nggi 20 yildagi gidrologik o'zgarishlar va iqlim ssenariylari tahlil qilingan.",
                        "ru": "В данном исследовании анализируются гидрологические изменения и климатические сценарии в 8 странах региона ЦАРЭС за последние 20 лет.",
                        "en": "This research evaluates hydrological transformations and climate risk models across 8 CAREC member countries over the last two decades.",
                        "kk": "Бұл зерттеуде соңғы 20 жылдағы ЦАРЭС өңіріндегі гидрологиялық өзгерістер мен климаттық сценарийлер талданған."
                    },
                    cover_image="assets/central-asia-climate.jpg",
                    published_year=2026,
                    downloads_count=342,
                    views_count=1280,
                    citations_count=18,
                    is_featured=True
                )
            ]
            db.add_all(pubs)
            print("Added multilingual publication seed items.")

        # 4. Seed Multilingual Events
        if db.query(Event).count() == 0:
            events = [
                Event(
                    title={
                        "uz": "Markaziy Osiyo Yashil Qishloq Xo'jaligi Xalqaro Forum 2026",
                        "ru": "Международный форум по зеленому сельскому хозяйству Центральной Азии 2026",
                        "en": "Central Asia Green Agriculture International Forum 2026",
                        "kk": "Орталық Азия жасыл ауыл шаруашылығы халықаралық форумы 2026"
                    },
                    location="Toshkent, O'zbekiston (Gibrid / Onlayn)",
                    event_date=datetime.now() + timedelta(days=20),
                    category="Forum",
                    status="upcoming",
                    description={
                        "uz": "Mintaqaviy olimlar, hukumat vakillari va xalqaro tashkilotlarning yillik iqlim va agrosanoat sammiti.",
                        "ru": "Ежегодный саммит региональных ученых, представителей правительств и международных институтов по вопросам климата и агробизнеса.",
                        "en": "Annual international summit connecting regional scientists, policymakers, and green agriculture stakeholders.",
                        "kk": "Аймақтық ғалымдар, үкімет өкілдері және халықаралық ұйымдардың жыл сайынғы климат және агробизнес саммиті."
                    },
                    image_url="assets/conference-people.jpg",
                    is_featured=True
                )
            ]
            db.add_all(events)
            print("Added multilingual event seed items.")

        # 5. Seed Multilingual Institutions
        if db.query(Institution).count() == 0:
            insts = [
                Institution(
                    name={
                        "uz": "TIIAME — Toshkent Irrigatsiya va Qishloq Xo'jaligini Mechanizatsiyalash Muhandislari Instituti",
                        "en": "TIIAME — Tashkent Institute of Irrigation and Agricultural Mechanization Engineers",
                        "ru": "ТИИИМСХ — Ташкентский институт инженеров ирригации и механизации сельского хозяйства"
                    },
                    country="UZ",
                    country_name={
                        "uz": "O'zbekiston",
                        "en": "Uzbekistan",
                        "ru": "Узбекистан"
                    },
                    type="University",
                    website="https://tiiame.uz"
                ),
                Institution(
                    name={
                        "uz": "QazNAU — Qazaq Milliy Agrar Tadqiqot Universiteti",
                        "en": "KazNAU — Kazakh National Agrarian Research University",
                        "ru": "КазНАУ — Казахский национальный аграрный исследовательский университет",
                        "kk": "ҚазҰАУ — Қазақ ұлттық аграрлық зерттеу университеті"
                    },
                    country="KZ",
                    country_name={
                        "uz": "Qozog'iston",
                        "en": "Kazakhstan",
                        "ru": "Казахстан",
                        "kk": "Қазақстан"
                    },
                    type="University",
                    website="https://kaznau.kz"
                )
            ]
            db.add_all(insts)
            print("Added multilingual institution seed items.")

        db.commit()
        print("Database seeding completed successfully.")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
