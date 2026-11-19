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
                        "kk": "Арал өңірінде тұзданған топырақты қалпына келтіру бойынша жаңа халықаралық жоба басталды",
                        "ky": "Арал деңизи аймагында шор топуракты калыбына келтирүү боюнча жаңы эл аралык долбоор башталды",
                        "tg": "Дар минтақаи Баҳри Арал лоиҳаи нави байналмилалӣ оид ба барқарорсозии заминҳои шӯр оғоз шуд",
                        "tk": "Aral sebitinde şorlanan topragy dikeltmek boýunça täze halkara taslama başlandy",
                        "az": "Aral dənizi bölgəsində şoran torpaqların bərpası üzrə yeni beynəlxalq layihəyə start verildi"
                    },
                    category="Mintaqaviy",
                    excerpt={
                        "uz": "RCGA va CAREC hamkorligida Aral dengizi basseynida iqlimga chidamli bio-amaliyotlarni joriy etishga qaratilgan 4 yillik dastur tajriba maydonlarida ish boshladi.",
                        "ru": "При сотрудничестве RCGA и CAREC стартовала 4-летняя программа по внедрению климатически устойчивых биопрактик в бассейне Аральского моря.",
                        "en": "In cooperation with RCGA and CAREC, a 4-year initiative introducing climate-resilient practices has started in Aral Sea basin pilot fields.",
                        "kk": "RCGA мен CAREC серіктестігінде Арал теңізі бассейнінде климатқа бейімделген био-тәжірибелерді енгізу бойынша 4 жылдық бағдарлама басталды.",
                        "ky": "RCGA жана CAREC кызматташтыгында Арал деңизинин бассейнинде климатка туруктуу практикаларды киргизүү боюнча 4 жылдык программа башталды.",
                        "tg": "Дар ҳамкорӣ бо RCGA ва CAREC дар ҳавзаи Баҳри Арал барномаи 4-солаи татбиқи таҷрибаҳои ба иқлим устувор ба кор шурӯъ кард.",
                        "tk": "RCGA we CAREC hyzmatdaşlygynda Aral deňziniň sebitinde howa şertlerine durnukly bio-amallary ornaşdyrmak boýunça 4 ýyllyk maksatnama başlandy.",
                        "az": "RCGA və CAREC əməkdaşlığı ilə Aral dənizi hövzəsində iqlimə dözümlü təcrübələrin tətbiqi üzrə 4 illik proqram başladı."
                    },
                    content={
                        "uz": "RCGA va CAREC hamkorligida Aral dengizi basseynida iqlimga chidamli bio-amaliyotlarni joriy etishga qaratilgan 4 yillik dastur tajriba maydonlarida ish boshladi. Ushbu dastur doirasida 500 dan ortiq fermer xo'jaliklari sho'rlangan yerlarda halofit o'simliklarini yetishtirish bo'yicha amaliy ko'nikmalarga ega bo'ladi.",
                        "ru": "При сотрудничестве RCGA и CAREC стартовала 4-летняя программа по внедрению климатически устойчивых биопрактик в бассейне Аральского моря. Более 500 фермерских хозяйств освоят методы выращивания галофитов.",
                        "en": "In cooperation with RCGA and CAREC, a 4-year initiative introducing climate-resilient practices has started in Aral Sea basin pilot fields. Over 500 farms will gain skills in growing halophyte crops.",
                        "kk": "RCGA мен CAREC серіктестігінде Арал теңізі бассейнінде 500-ден астам шаруа қожалығы галофит өсімдіктерін өсіру бойынша тәжірибе жинақтайды.",
                        "ky": "RCGA жана CAREC өнөктөштүгүндө Арал бассейнинде 500дөн ашуун фермердик чарба галофит өсүмдүктөрүн өстүрүү боюнча тажрыйба алат.",
                        "tg": "Дар доираи барнома беш аз 500 хоҷагии деҳқонӣ таҷрибаи парвариши растаниҳои галофитро дар заминҳои шӯр меомӯзанд.",
                        "tk": "Maksatnamanyň çäginde 500-den gowrak daýhan hojalygy şor ýerlerde galofit ösümliklerini ösdürip ýetişdirmek boýunça amaly tejribe alar.",
                        "az": "Proqram çərçivəsində 500-dən çox fermer təsərrüfatı şoran torpaqlarda halofit bitkilərinin becərilməsi təcrübəsinə yiyələnəcək."
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
                        "kk": "Ферғана аңғарында тамшылатып суару тиімділігі 40%-ға өсті",
                        "ky": "Фергана өрөөнүндө тамчылатып сугаруу технологиясынын натыйжалуулугу 40%га өстү",
                        "tg": "Дар водии Фарғона самаранокии обёрии қатрагӣ 40% афзоиш ёфт",
                        "tk": "Fergana jülgesinde damjalaýyn suwaryş tehnologiýasynyň netijeliligi 40% ýokarlandy",
                        "az": "Fərqanə vadisində damcılı suvarma texnologiyasının səmərəliliyi 40% artdı"
                    },
                    category="Texnologiya",
                    excerpt={
                        "uz": "Aqlli datchiklar va avtomatlashtirilgan gidro-monitoring tizimlari suv sarfini keskin kamaytirish bilan birga hosildorlikni oshirmoqda.",
                        "ru": "Умные датчики и автоматизированный гидромониторинг существенно экономят воду при росте урожайности.",
                        "en": "Smart IoT sensors and automated hydro-monitoring systems dramatically reduce water waste while boosting yield.",
                        "kk": "Ақылды датчиктер мен автоматтандырылған гидро-мониторинг су үнемдеумен бірге өнімділікті арттыруда.",
                        "ky": "Акылдуу датчиктер жана автоматташтырылган гидро-мониторинг сууну үнөмдөө менен түшүмдүүлүктү жогорулатат.",
                        "tg": "Сенсорҳои ҳушманд ва мониторинги автоматӣ хароҷоти обро коҳиш дода, ҳосилро зиёд мекунанд.",
                        "tk": "Akylly datçikler we awtomatlaşdyrylan gidromonitoring suw sarp edilişini azaldyp, hasyllylygy ýokarlandyrýar.",
                        "az": "Ağıllı sensorlar və avtomatlaşdırılmış hidro-monitorinq su itkisini azaldaraq məhsuldarlığı artırır."
                    },
                    content={
                        "uz": "Aqlli datchiklar va avtomatlashtirilgan gidro-monitoring tizimlari suv sarfini keskin kamaytirish bilan birga hosildorlikni oshirmoqda. TDAU va RCGA mutaxassislari tomonidan o'tkazilgan tahlillar shuni ko'rsatdiki...",
                        "ru": "Умные датчики и автоматизированный гидромониторинг существенно экономят воду при росте урожайности. Анализ ученых ТГАУ и RCGA подтвердил эффективность инноваций...",
                        "en": "Smart IoT sensors and automated hydro-monitoring systems dramatically reduce water waste while boosting yield. Joint field trials by Tashkent State Agrarian University and RCGA confirm major efficiency gains...",
                        "kk": "Ақылды датчиктер мен автоматтандырылған гидро-мониторинг су үнемдеумен бірге өнімділікті арттыруда. ТДАУ мен RCGA ғалымдарының талдаулары осыны дәлелдеді...",
                        "ky": "Акылдуу датчиктер жана мониторинг сууну үнөмдөп, түшүмдүүлүктү арттырууда...",
                        "tg": "Санҷишҳои муштараки олимони соҳа нишон доданд, ки обёрии қатрагӣ сарфакориро беҳтар мекунад...",
                        "tk": "Tölegli tejäp suwaryş ulgamlary suw tygşytlylygyny ýokarlandyrdy...",
                        "az": "Ağıllı suvarma sistemləri su resurslarından səmərəli istifadəni təmin edir..."
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
                        "kk": "Орталық Азия ауыл шаруашылығындағы су ресурстарын басқару және климаттық қатерлер",
                        "ky": "Борбордук Азиянын айыл чарбасында суу ресурстарын башкаруу жана климаттык тобокелдиктер",
                        "tg": "Идоракунии захираҳои об ва хатарҳои иқлимӣ дар кишоварзии Осиёи Марказӣ",
                        "tk": "Merkezi Aziýanyň oba hojalygynda suw serişdelerini dolandyrmak we howa töwekgelçilikleri",
                        "az": "Mərkəzi Asiya kənd təsərrüfatında su ehtiyatlarının idarə olunması və iqlim riskləri"
                    },
                    category="Iqlim",
                    authors="Prof. D. Ergashev, Dr. K. Alimova, M. Saparov",
                    doi="10.1016/j.agwat.2026.10824",
                    abstract={
                        "uz": "Ushbu tadqiqotda CAREC mintaqasining 8 ta mamlakatida so'nggi 20 yildagi gidrologik o'zgarishlar va iqlim ssenariylari tahlil qilingan.",
                        "ru": "В данном исследовании анализируются гидрологические изменения и климатические сценарии в 8 странах региона ЦАРЭС за последние 20 лет.",
                        "en": "This research evaluates hydrological transformations and climate risk models across 8 CAREC member countries over the last two decades.",
                        "kk": "Бұл зерттеуде соңғы 20 жылдағы ЦАРЭС өңіріндегі гидрологиялық өзгерістер мен климаттық сценарийлер талданған.",
                        "ky": "Бул изилдөөдө акыркы 20 жыл ичиндеги ЦАРЭС өлкөлөрүндөгү гидрологиялык өзгөрүүлөр талданган.",
                        "tg": "Дар ин пажӯҳиш тағйироти гидрологӣ ва хатарҳои иқлимӣ дар 8 кишвари минтақа баррасӣ шудаанд.",
                        "tk": "Bu barlagda soňky 20 ýylda CAREC ýurtlaryndaky gidrologik üýtgeşmeler seljerilýär.",
                        "az": "Bu araşdırmada son 20 ildə CAREC ölkələrində baş verən hidroloji dəyişikliklər təhlil edilmişdir."
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
                        "kk": "Орталық Азия жасыл ауыл шаруашылығы халықаралық форумы 2026",
                        "ky": "Борбордук Азия жашыл айыл чарбасы эл аралык форуму 2026",
                        "tg": "Форуми байналмилалии кишоварзии сабзи Осиёи Марказӣ 2026",
                        "tk": "Merkezi Aziýa ýaşyl oba hojalygy halkara forumy 2026",
                        "az": "Mərkəzi Asiya Yaşıl Kənd Təsərrüfatı Beynəlxalq Forumu 2026"
                    },
                    location="Toshkent, O'zbekiston (Gibrid / Onlayn)",
                    event_date=datetime.now() + timedelta(days=20),
                    category="Forum",
                    status="upcoming",
                    description={
                        "uz": "Mintaqaviy olimlar, hukumat vakillari va xalqaro tashkilotlarning yillik iqlim va agrosanoat sammiti.",
                        "ru": "Ежегодный саммит региональных ученых, представителей правительств и международных институтов по вопросам климата и агробизнеса.",
                        "en": "Annual international summit connecting regional scientists, policymakers, and green agriculture stakeholders.",
                        "kk": "Аймақтық ғалымдар, үкімет өкілдері және халықаралық ұйымдардың жыл сайынғы климат және агробизнес саммиті.",
                        "ky": "Аймактык илимпоздор, өкмөт өкүлдөрү жана эл аралык уюмдардын жылдык климаттык саммити.",
                        "tg": "Ҳамоиши солонаи олимони минтақавӣ ва ташкилотҳои байналмилалӣ дар бораи иқлим ва агробизнес.",
                        "tk": "Sebit alymlarynyň, hökümet wekilleriniň we halkara guramalaryň howa we agrosenagat sammiti.",
                        "az": "Regional alimlərin, hökumət nümayəndələrinin və beynəlxalq təşkilatların iqlim və aqrar sammiti."
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
                        "ru": "ТИИИМСХ — Ташкентский институт инженеров ирригации и механизации сельского хозяйства",
                        "kk": "ТИИИМСХ — Ташкент суландыру және ауыл шаруашылығын механикаландыру инженерлері институты",
                        "ky": "ТИИИМСХ — Ташкент ирригация жана айыл чарбасын механизациялаштыруу инженерлери институту",
                        "tg": "ТИИИМСХ — Донишкадаи муҳандисони ирригатсия ва механизатсияи кишоварзии Тошканд"
                    },
                    country="UZ",
                    country_name={
                        "uz": "O'zbekiston",
                        "en": "Uzbekistan",
                        "ru": "Узбекистан",
                        "kk": "Өзбекстан",
                        "ky": "Өзбекстан",
                        "tg": "Ӯзбекистон",
                        "tk": "Özbegistan",
                        "az": "Özbəkistan"
                    },
                    type="University",
                    website="https://tiiame.uz"
                ),
                Institution(
                    name={
                        "uz": "QazNAU — Qazaq Milliy Agrar Tadqiqot Universiteti",
                        "en": "KazNAU — Kazakh National Agrarian Research University",
                        "ru": "КазНАУ — Казахский национальный аграрный исследовательский университет",
                        "kk": "ҚазҰАУ — Қазақ ұлттық аграрлық зерттеу университеті",
                        "ky": "КазУАУ — Казак улуттук агрардык изилдөө университети",
                        "tg": "ҚазНАУ — Донишгоҳи миллии тадқиқотии аграрии Қазоқистон"
                    },
                    country="KZ",
                    country_name={
                        "uz": "Qozog'iston",
                        "en": "Kazakhstan",
                        "ru": "Казахстан",
                        "kk": "Қазақстан",
                        "ky": "Казакстан",
                        "tg": "Қазоқистон",
                        "tk": "Gazagystan",
                        "az": "Qazaxıstan"
                    },
                    type="University",
                    website="https://kaznau.kz"
                ),
                Institution(
                    name={
                        "uz": "QNAU — Skryabin nomidagi Qirg'iz Milliy Agrar Universiteti",
                        "en": "KNAU — Kyrgyz National Agrarian University named after K.I. Skryabin",
                        "ru": "КНАУ — Кыргызский национальный аграрный университет им. К.И. Скрябина",
                        "ky": "К.И. Скрябин атындагы Кыргыз улуттук агрардык университети",
                        "kk": "Қ.И. Скрябин атындағы Қырғыз ұлттық аграрлық университеті"
                    },
                    country="KG",
                    country_name={
                        "uz": "Qirg'iziston",
                        "en": "Kyrgyzstan",
                        "ru": "Кыргызстан",
                        "kk": "Қырғызстан",
                        "ky": "Кыргызстан",
                        "tg": "Қирғизистон",
                        "tk": "Gyrgyzystan",
                        "az": "Qırğızıstan"
                    },
                    type="University",
                    website="https://knau.kg"
                ),
                Institution(
                    name={
                        "uz": "TAAU — Shirinshoh Shohtemur nomidagi Tojikiston Agrar Universiteti",
                        "en": "TAAU — Tajik Agrarian University named after Shirinsho Shotemur",
                        "ru": "ТАУ — Таджикский аграрный университет имени Шириншо Шотемур",
                        "tg": "Донишгоҳи аграрии Тоҷикистон ба номи Шириншоҳ Шоҳтемур"
                    },
                    country="TJ",
                    country_name={
                        "uz": "Tojikiston",
                        "en": "Tajikistan",
                        "ru": "Таджикистан",
                        "kk": "Тәжікстан",
                        "ky": "Тажикстан",
                        "tg": "Тоҷикистон",
                        "tk": "Täjigistan",
                        "az": "Tacikistan"
                    },
                    type="University",
                    website="https://tau.tj"
                ),
                Institution(
                    name={
                        "uz": "TNUA — S.A. Niyozov nomidagi Turkmaniston Milliy Qishloq Xo'jaligi Universiteti",
                        "en": "TNUA — Turkmen Agricultural University named after S.A. Niyazov",
                        "ru": "ТГУ — Туркменский сельскохозяйственный университет имени С.А. Ниязова",
                        "tk": "S.A.Nyýazow adyndaky Türkmen oba hojalyk uniwersiteti"
                    },
                    country="TM",
                    country_name={
                        "uz": "Turkmaniston",
                        "en": "Turkmenistan",
                        "ru": "Туркменистан",
                        "kk": "Түрікменстан",
                        "ky": "Түркмөнстан",
                        "tg": "Туркманистон",
                        "tk": "Türkmenistan",
                        "az": "Türkmənistan"
                    },
                    type="University",
                    website="https://tau.edu.tm"
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
