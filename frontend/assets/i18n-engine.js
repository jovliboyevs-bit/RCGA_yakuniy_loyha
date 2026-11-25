import { setHTML } from '../src/security';
// RCGA Digital Platform — Universal Multilingual (i18n) Engine for CAREC Languages
// Supports: UZ, KK, KY, TG, TK, AZ, GE (KA), MN, ZH, RU, EN

(function () {
  const CAREC_DICT = {
    // Navigation & Auth
    "Bosh sahifa": {
      uz: "Bosh sahifa", en: "Home", ru: "Главная", kk: "Басты бет", ky: "Башкы бет",
      tg: "Саҳифаи асосӣ", tk: "Baş sahypa", az: "Ana səhifə", ge: "მთავარი", mn: "Нүүр хуудас", zh: "首页"
    },
    "RCGA Haqida": {
      uz: "RCGA Haqida", en: "About", ru: "О нас", kk: "RCGA туралы", ky: "RCGA жөнүндө",
      tg: "Дар бораи RCGA", tk: "RCGA barada", az: "RCGA Haqqında", ge: "RCGA-ის შესახებ", mn: "RCGA-ийн тухай", zh: "关于RCGA"
    },
    "Nashrlar": {
      uz: "Nashrlar", en: "Publications", ru: "Публикации", kk: "Басылымдар", ky: "Басылмалар",
      tg: "Нашрияҳо", tk: "Neşirler", az: "Nəşrlər", ge: "პუბლიკაციები", mn: "Нийтлэлүүд", zh: "出版物"
    },
    "Yangiliklar": {
      uz: "Yangiliklar", en: "News", ru: "Новости", kk: "Жаңалықтар", ky: "Жаңылыктар",
      tg: "Хабарҳо", tk: "Täzelikler", az: "Xəbərlər", ge: "სიახლეები", mn: "Мэдээ", zh: "新闻"
    },
    "Tadbirlar": {
      uz: "Tadbirlar", en: "Events", ru: "События", kk: "Іс-шаралар", ky: "Иш-чаралар",
      tg: "Чорабиниҳо", tk: "Çäreler", az: "Tədbirlər", ge: "ღონისძიებები", mn: "Үйл явдал", zh: "活动"
    },
    "Muassasalar": {
      uz: "Muassasalar", en: "Institutions", ru: "Учреждения", kk: "Мекемелер", ky: "Мекемелер",
      tg: "Муассисаҳо", tk: "Edaralar", az: "Qurumlar", ge: "ინსტიტუტები", mn: "Байгууллагууд", zh: "机构"
    },
    "Qidiruv": {
      uz: "Qidiruv", en: "Search", ru: "Поиск", kk: "Іздеу", ky: "Издөө",
      tg: "Ҷустуҷӯ", tk: "Gözleg", az: "Axtarış", ge: "ძიება", mn: "Хайлт", zh: "搜索"
    },
    "Chat": {
      uz: "Chat", en: "Chat", ru: "Чат", kk: "Чат", ky: "Чат",
      tg: "Чат", tk: "Çat", az: "Çat", ge: "ჩატი", mn: "Чат", zh: "聊天"
    },
    "👑 Admin Panel": {
      uz: "👑 Admin Panel", en: "👑 Admin Panel", ru: "👑 Панель админа", kk: "👑 Админ панелі", ky: "👑 Админ панели",
      tg: "👑 Панели админ", tk: "👑 Admin paneli", az: "👑 İdarə paneli", ge: "👑 ადმინ პანელი", mn: "👑 Админ самбар", zh: "👑 管理后台"
    },
    "Kirish": {
      uz: "Kirish", en: "Login", ru: "Войти", kk: "Кіру", ky: "Кирүү",
      tg: "Воридшавӣ", tk: "Giriş", az: "Giriş", ge: "შესვლა", mn: "Нэвтрэх", zh: "登录"
    },
    "Chiqish": {
      uz: "Chiqish", en: "Logout", ru: "Выход", kk: "Шығу", ky: "Чыгуу",
      tg: "Баромад", tk: "Çykyş", az: "Çıxış", ge: "გამოსვლა", mn: "Гарах", zh: "退出"
    },

    // Hero Section
    "Yashil qishloq xo'jaligi uchun mintaqaning ilmiy ovozi.": {
      uz: "Yashil qishloq xo'jaligi uchun mintaqaning ilmiy ovozi.",
      en: "The region's scientific voice for green agriculture.",
      ru: "Научный голос региона в области зеленого сельского хозяйства.",
      kk: "Жасыл ауыл шаруашылығы үшін өңірдің ғылыми дауысы.",
      ky: "Жашыл айыл чарбасы үчүн аймактын илимий үнү.",
      tg: "Овози илмии минтақа барои кишоварзии сабз.",
      tk: "Ýaşyl oba hojalygy üçin sebitiň ylmy sesi.",
      az: "Yaşıl kənd təsərrüfatı üçün regionun elmi səsi.",
      ge: "რეგიონის სამეცნიერო ხმა მწვანე სოფლის მეურნეობისთვის.",
      mn: "Ногоон хөдөө аж ахуйн бүс нутгийн эрдэм шинжилгээний дуу хоолой.",
      zh: "区域绿色农业发展的权威科学平台。"
    },
    "RCGA — iqlimga moslashgan dehqonchilik, raqamli agrosanoat va Markaziy Osiyo bo'ylab ilmiy hamkorlikning yagona platformasi. Sakkiz davlat, bir tarmoq, ochiq bilim.": {
      uz: "RCGA — iqlimga moslashgan dehqonchilik, raqamli agrosanoat va Markaziy Osiyo bo'ylab ilmiy hamkorlikning yagona platformasi. Sakkiz davlat, bir tarmoq, ochiq bilim.",
      en: "RCGA is a unified platform for climate-adaptive farming, digital agro-industry, and scientific collaboration across Central Asia. Eight countries, one network, open knowledge.",
      ru: "RCGA — единая платформа для климатически адаптированного земледелия, цифровой агропромышленности и научного сотрудничества в Центральной Азии. Восемь стран, одна сеть, открытые знания.",
      kk: "RCGA — климатқа бейімделген егіншілік, сандық агроөнеркәсіп және Орталық Азиядағы ғылыми ынтымақтастықтың бірыңғай платформасы. Сегіз ел, бір желі, ашық білім.",
      ky: "RCGA — климатка ыңгайлашкан дыйканчылык, санариптик агроөнөр жай жана Борбордук Азиядагы илимий кызматташтыктын бирдиктүү платформасы. Сегиз өлкө, бир тармак, ачык билим.",
      tg: "RCGA платформаи ягона барои кишоварзии ба иқлим мутобиқшуда, агросаноати рақамӣ ва ҳамкории илмӣ дар Осиёи Марказӣ мебошад. Ҳашт кишвар, як шабака, дониши озод.",
      tk: "RCGA — howa şertlerine uýgunlaşan ekerançylyk, sanly agrosenagat we Merkezi Aziýada ylmy hyzmatdaşlygyň bitewi platformasydyr. Sekiz ýurt, bir tor, açyk bilim.",
      az: "RCGA — iqlimə uyğunlaşmış əkinçilik, rəqəmsal aqrosənaye və Mərkəzi Asiyada elmi əməkdaşlıq üzrə vahid platformadır. Səkkiz ölkə, bir şəbəkə, açıq bilik.",
      ge: "RCGA — ერთიანი პლატფორმა კლიმატთან ადაპტირებული მიწათმოქმედებისთვის, ციფრული აგროინდუსტრიისთვის და რეგიონული სამეცნიერო თანამშრომლობისთვის.",
      mn: "RCGA бол Төв Ази даяар уур амьсгалд дасан зохицсон газар тариалан, дижитал хөдөө аж ахуй, шинжлэх ухааны хамтын ажиллагааны нэгдсэн платформ юм.",
      zh: "RCGA 是中亚及高加索地区气候适应型农业、数字农工业创新与科学合作的统一数字平台。八国互联，共享知识。"
    },
    "Ilmiy bazani o'rganish": {
      uz: "Ilmiy bazani o'rganish", en: "Explore knowledge base", ru: "Изучить базу знаний",
      kk: "Ғылыми базаны зерттеу", ky: "Илимий базаны изилдөө", tg: "Омӯзиши пойгоҳи илмӣ",
      tk: "Ylmy binýady öwrenmek", az: "Elmi bazanı kəşf edin", ge: "სამეცნიერო ბაზის გამოკვლევა", mn: "Мэдлэгийн санг судлах", zh: "探索科学知识库"
    },
    "Yaqinlashayotgan tadbirlar": {
      uz: "Yaqinlashayotgan tadbirlar", en: "Upcoming events", ru: "Предстоящие события",
      kk: "Алдағы іс-шаралар", ky: "Алда боло турган иш-чаралар", tg: "Чорабиниҳои оянда",
      tk: "Golaýlaşýan çäreler", az: "Yaxınlaşan tədbirlər", ge: "მომავალი ღონისძიებები", mn: "Удахгүй болох арга хэмжээ", zh: "近期会议与活动"
    },
    "Pastga": {
      uz: "Pastga", en: "Scroll down", ru: "Вниз", kk: "Төмен", ky: "Төмөн",
      tg: "Поён", tk: "Aşak", az: "Aşağı", ge: "ქვემოთ", mn: "Доош", zh: "向下滚动"
    },

    // 4 Core Pillars (Shown in user screenshot!)
    "Iqlimga moslashgan dehqonchilik": {
      uz: "Iqlimga moslashgan dehqonchilik",
      en: "Climate-adaptive farming",
      ru: "Климатически адаптированное земледелие",
      kk: "Климатқа бейімделген егіншілік",
      ky: "Климатка ыңгайлашкан дыйканчылык",
      tg: "Кишоварзии ба иқлим мутобиқшуда",
      tk: "Howa şertlerine uýgunlaşan ekerançylyk",
      az: "İqlimə uyğunlaşmış əkinçilik",
      ge: "კლიმატთან ადაპტირებული სოფლის მეურნეობა",
      mn: "Уур амьсгалд дасан зохицсон газар тариалан",
      zh: "气候适应型生态农业"
    },
    "Suv tanqisligi, tuproq degradatsiyasi va iqlim o'zgarishi sharoitida hosil barqarorligini ta'minlovchi yondashuvlar bo'yicha tadqiqotlar va amaliy yo'riqnomalar.": {
      uz: "Suv tanqisligi, tuproq degradatsiyasi va iqlim o'zgarishi sharoitida hosil barqarorligini ta'minlovchi yondashuvlar bo'yicha tadqiqotlar va amaliy yo'riqnomalar.",
      en: "Research and practical guidelines on approaches ensuring yield stability under conditions of water scarcity, soil degradation, and climate change.",
      ru: "Исследования и практические руководства по подходам, обеспечивающим стабильность урожая в условиях нехватке воды, деградации почв и изменения климата.",
      kk: "Су тапшылығы, топырақтың деградациясы және климаттың өзгеруі жағдайында өнім тұрақтылығын қамтамасыз ететін зерттеулер мен нұсқаулықтар.",
      ky: "Суу тартыштыгы, кыртыштын деградациясы жана климаттын өзгөрүшү шартында түшүмдүүлүктү камсыз кылуу боюнча изилдөөлөр жана сунуштар.",
      tg: "Тадқиқотҳо ва дастурҳои амалӣ оид ба устувории ҳосил дар шароити норасоии об, таназзули хок ва тағйирёбии иқлим.",
      tk: "Suw ýetmezçiligi, topragyň ýaramazlaşmagy we howanyň üýtgemegi şertlerinde hasylyň durnuklylygyny üpjün edýän barlaglar we amaly gollanmalar.",
      az: "Su qıtlığı, torpağın deqradasiyası və iqlim dəyişikliyi şəraitində məhsul sabitliyini təmin edən elmi tədqiqatlar və təlimatlar.",
      ge: "კვლევები და პრაქტიკული გაიდლაინები წყლის დეფიციტის, ნიადაგის დეგრადაციისა და კლიმატის ცვლილების პირობებში მოსავლიანობის სტაბილურობის უზრუნველსაყოფად.",
      mn: "Усны хомсдол, хөрсний доройтол, уур амьсгалын өөрчлөлтийн нөхцөлд ургацын тогтвортой байдлыг хангах судалгаа ба зөвлөмжүүд.",
      zh: "针对水资源短缺、土壤盐碱退化及极端气候变化，提供保障作物高产稳产的前沿科研成果与实地应用指南。"
    },
    "Raqamli agrosanoat": {
      uz: "Raqamli agrosanoat",
      en: "Digital agro-industry",
      ru: "Цифровая агропромышленность",
      kk: "Сандық агроөнеркәсіп",
      ky: "Санариптик агроөнөр жай",
      tg: "Саноати аграрии рақамӣ",
      tk: "Sanly agrosenagat",
      az: "Rəqəmsal aqrosənaye",
      ge: "ციფრული აგროსამრეწველო",
      mn: "Дижитал хөдөө аж ахуй",
      zh: "数字现代农工业"
    },
    "Sun'iy yo'ldosh monitoringi, dron analitikasi, IoT sensorlari va sun'iy intellekt asosida zamonaviy fermerlik vositalari.": {
      uz: "Sun'iy yo'ldosh monitoringi, dron analitikasi, IoT sensorlari va sun'iy intellekt asosida zamonaviy fermerlik vositalari.",
      en: "Modern farming tools based on satellite monitoring, drone analytics, IoT sensors, and artificial intelligence.",
      ru: "Современные инструменты фермерства на основе спутникового мониторинга, аналитики дронов, датчиков IoT и искусственного интеллекта.",
      kk: "Жерсеріктік мониторинг, дрон аналитикасы, IoT датчиктері және жасанды интеллект негізіндегі заманауи құралдар.",
      ky: "Спутниктик мониторинг, дрон аналитикасы, IoT сенсорлору жана жасалма интеллектке негизделген заманбап куралдар.",
      tg: "Абзорҳои муосири кишоварзӣ дар асоси мониторинги моҳвораӣ, таҳлили дронҳо, сенсорҳои IoT ва зеҳни сунъӣ.",
      tk: "Hemra monitoringi, dron seljermesi, IoT datçikleri we emeli aň esasyndaky döwrebap oba hojalyk gurallary.",
      az: "Peyk monitorinqi, pilotsuz uçuş aparatlarının analitikası, IoT sensorları və süni intellektə əsaslanan müasir fermerlik alətləri.",
      ge: "სატელიტური მონიტორინგი, დრონის ანალიტიკა, IoT სენსორები და ხელოვნური ინტელექტის თანამედროვე ფერმერული ინსტრუმენტები.",
      mn: "Хиймэл дагуулын хяналт, дрон шинжилгээ, IoT мэдрэгч ба хиймэл оюун ухаанд суурилсан орчин үеийн хэрэгслүүд.",
      zh: "依托高精度遥感卫星监测、无人机多光谱分析、物联网传感器及人工智能驱动的现代智慧农业装备与系统。"
    },
    "Mintaqaviy hamkorlik": {
      uz: "Mintaqaviy hamkorlik",
      en: "Regional cooperation",
      ru: "Региональное сотрудничество",
      kk: "Өңірлік ынтымақтастық",
      ky: "Аймактык кызматташтык",
      tg: "Ҳамкории минтақавӣ",
      tk: "Sebitara hyzmatdaşlyk",
      az: "Regional əməkdaşlıq",
      ge: "რეგიონული თანამშრომლობა",
      mn: "Бүс нутгийн хамтын ажиллагаа",
      zh: "区域跨国多边合作"
    },
    "8 ta CAREC davlati o'rtasida tadqiqot natijalari, talabalar almashinuvi va siyosiy muloqotni rivojlantiruvchi tarmoq.": {
      uz: "8 ta CAREC davlati o'rtasida tadqiqot natijalari, talabalar almashinuvi va siyosiy muloqotni rivojlantiruvchi tarmoq.",
      en: "A network fostering research results, student exchange, and policy dialogue among 8 CAREC countries.",
      ru: "Сеть, способствующая обмену результатами исследований, студентами и политическому диалогу между 8 странами ЦАРИЭС.",
      kk: "8 CAREC елі арасындағы зерттеу нәтижелерін, студенттер алмасуын және саяси диалогты дамытатын желі.",
      ky: "8 CAREC өлкөсүнүн ортосунда изилдөө натыйжаларын, студенттерди алмашууну жана саясий диалогду өнүктүрүүчү тармак.",
      tg: "Шабакае, ки ба мубодилаи натиҷаҳои тадқиқот, донишҷӯён ва муколамаи сиёсӣ байни 8 кишвари CAREC мусоидат мекунад.",
      tk: "8 CAREC ýurdunyň arasynda barlag netijelerini, talyp alyş-çalşygyny we syýasy gepleşikleri ösdürýän tor.",
      az: "8 CAREC ölkəsi arasında tədqiqat nəticələri, tələbə mübadiləsi və siyasi dialoqu inkişaf etdirən beynəlxalq şəbəkə.",
      ge: "ქსელი, რომელიც ხელს უწყობს კვლევის შედეგების, სტუდენტთა გაცვლისა და პოლიტიკური დიალოგის განვითარებას 8 CAREC ქვეყანას შორის.",
      mn: "CAREC-ийн 8 орны хооронд судалгааны үр дүн, оюутан солилцоо, бодлогын яриа хэлэлцээг дэмжих сүлжээ.",
      zh: "连接中亚与高加索多国的科研成果共享、学者与留学生学术互访及区域绿色政策协同对话机制。"
    },
    "Bilim ochiq, manba erkin": {
      uz: "Bilim ochiq, manba erkin",
      en: "Open knowledge, free source",
      ru: "Открытые знания, свободный источник",
      kk: "Ашық білім, еркін дереккөз",
      ky: "Ачык билим, эркин булак",
      tg: "Дониши кушода ва манбаи озод",
      tk: "Açyk bilim, erkin çeşme",
      az: "Açıq bilik və sərbəst mənbə",
      ge: "ღია ცოდნა და თავისუფალი წყარო",
      mn: "Нээлттэй мэдлэг, чөлөөт эх сурвалж",
      zh: "知识普惠与开源生态"
    },
    "Open Access nashrlar, ochiq ma'lumotlar bazasi va uchta tilda — o'zbek, rus, ingliz tillarida yetkaziladigan tahlillar.": {
      uz: "Open Access nashrlar, ochiq ma'lumotlar bazasi va mintaqaviy tillarda yetkaziladigan tahlillar.",
      en: "Open Access publications, open database, and analytics delivered in regional languages.",
      ru: "Публикации Open Access, открытая база данных и аналитика на региональных языках.",
      kk: "Open Access басылымдары, ашық деректер базасы және өңірлік тілдерде ұсынылатын талдаулар.",
      ky: "Open Access басылмалары, ачык маалыматтар базасы жана аймактык тилдердеги талдоолор.",
      tg: "Нашрияҳои Open Access, махзани маълумоти кушода ва таҳлилҳо бо забонҳои минтақавӣ.",
      tk: "Open Access neşirleri, açyk maglumatlar binýady we sebit dillerindäki seljermeler.",
      az: "Open Access nəşrləri, açıq məlumat bazası və regional dillərdə təqdim olunan analitika.",
      ge: "Open Access პუბლიკაციები, ღია მონაცემთა ბაზა და ანალიტიკა რეგიონულ ენებზე.",
      mn: "Нээлттэй хандалтын нийтлэлүүд, нээлттэй мэдээллийн сан, бүс нутгийн хэлээр хүргэгдэх шинжилгээ.",
      zh: "完全开放获取（Open Access）的同行评议文献、共享科研数据库以及多语种全方位农业大数据分析报告。"
    },

    // Big Quote (Shown on user screen!)
    "Iqlim o'zgarishi chegara bilmaydi. Shuning uchun uning ta'siriga qarshi kurashimiz ham mintaqaviy darajada bo'lishi shart.": {
      uz: "Iqlim o'zgarishi chegara bilmaydi. Shuning uchun uning ta'siriga qarshi kurashimiz ham mintaqaviy darajada bo'lishi shart.",
      en: "Climate change knows no borders. Therefore, our response to its impact must also be at a regional level.",
      ru: "Изменение климата не знает границ. Поэтому наша реакция на его последствия также должна быть на региональном уровне.",
      kk: "Климаттың өзгеруі шекараны білмейді. Сондықтан оның әсеріне қарсы күрес аймақтық деңгейде болуы шарт.",
      ky: "Климаттын өзгөрүшү чек араны тааныбайт. Ошондуктан анын кесепеттерине каршы күрөшүү да аймактык деңгээлде болушу керек.",
      tg: "Тағйирёбии иқлим сарҳадро намешиносад. Бинобар ин, мубориза бо оқибатҳои он низ бояд дар сатҳи минтақавӣ бошад.",
      tk: "Howanyň üýtgemegi serhet bilmeýär. Şonuň üçin onuň täsirine garşy göreşimiz hem sebit derejesinde bolmalydyr.",
      az: "İqlim dəyişikliyi sərhəd tanımır. Buna görə də onun təsirinə qarşı mübarizəmiz regional səviyyədə olmalıdır.",
      ge: "კლიმატის ცვლილებამ საზღვრები არ იცის. ამიტომ, მის შედეგებთან ბრძოლა რეგიონულ დონეზე უნდა განხორციელდეს.",
      mn: "Уур амьсгалын өөрчлөлт хил хязгаарыг мэддэггүй. Тиймээс түүний нөлөөллийн эсрэг бидний хариу арга хэмжээ бүс нутгийн түвшинд байх ёстой.",
      zh: "气候变化不分国界。因此，我们应对其挑战与影响的行动也必须跨越边界，在整个区域层面紧密协同展开。"
    },
    "Iqlim o'zgarishi": {
      uz: "Iqlim o'zgarishi", en: "Climate change", ru: "Изменение климата",
      kk: "Климаттың өзгеруі", ky: "Климаттын өзгөрүшү", tg: "Тағйирёбии иқлим",
      tk: "Howanyň üýtgemegi", az: "İqlim dəyişikliyi", ge: "კლიმატის ცვლილება", mn: "Уур амьсгалын өөрчлөлт", zh: "气候变化"
    },
    "chegara bilmaydi.": {
      uz: "chegara bilmaydi.", en: "knows no borders.", ru: "не знает границ.",
      kk: "шекараны білмейді.", ky: "чек араны тааныбайт.", tg: "сарҳадро намешиносад.",
      tk: "serhet bilmeýär.", az: "sərhəd tanımır.", ge: "საზღვრები არ იცის.", mn: "хил хязгаарыг мэддэггүй.", zh: "不分国界。"
    },
    "Demak, biz uning ta'siriga qarshi javobimiz ham mintaqaviy darajada bo'lishi kerak.": {
      uz: "Demak, biz uning ta'siriga qarshi javobimiz ham mintaqaviy darajada bo'lishi kerak.",
      en: "Therefore, our response to its impact must also be at a regional level.",
      ru: "Значит, и наш ответ на его воздействие должен быть на региональном уровне.",
      kk: "Сондықтан оның әсеріне қарсы біздің де жауабымыз өңірлік деңгейде болуы қажет.",
      ky: "Демек, биздин анын кесепеттерине каршы аракетибиз да аймактык деңгээлде болушу керек.",
      tg: "Пас, вокуниши мо ба таъсири он низ бояд дар сатҳи минтақавӣ бошад.",
      tk: "Diýmek, onuň täsirine garşy jogabymyz hem sebit derejesinde bolmalydyr.",
      az: "Deməli, onun təsirinə qarşı cavabımız da regional səviyyədə olmalıdır.",
      ge: "ამიტომ, ჩვენი რეაგირება მის შედეგებზე ასევე რეგიონულ დონეზე უნდა იყოს.",
      mn: "Тиймээс түүний нөлөөллийн эсрэг бидний хариу арга хэмжээ бүс нутгийн түвшинд байх ёстой.",
      zh: "因此，我们应对其挑战与影响的行动也必须跨越边界，在整个区域层面紧密协同展开。"
    },
    "Ilmiy ishlar va innovatsiyalar bo'yicha prorektor — Texnika fanlari doktori": {
      uz: "Ilmiy ishlar va innovatsiyalar bo'yicha prorektor — Texnika fanlari doktori",
      en: "Vice-Rector for Research and Innovation — Doctor of Technical Sciences",
      ru: "Проректор по научной работе и инновациям — Доктор технических наук",
      kk: "Ғылыми жұмыс және инновациялар жөніндегі проректор — Техника ғылымдарының докторы",
      ky: "Илимий иштер жана инновациялар боюнча проректор — Техника илимдеринин доктору",
      tg: "Ноиби ректор оид ба корҳои илмӣ ва инноватсия — Доктори илмҳои техникӣ",
      tk: "Ylmy işler we innowasiýalar boýunça prorektor — Tehniki ylymlaryň lukmany",
      az: "Elmi işlər və innovasiyalar üzrə prorektor — Texnika elmləri doktoru",
      ge: "სამეცნიერო მუშაობისა და ინოვაციების პრორექტორი — ტექნიკურ მეცნიერებათა დოქტორი",
      mn: "Эрдэм шинжилгээ, инноваци эрхэлсэн проректор — Техникийн шинжлэх ухааны доктор",
      zh: "科研与创新事务副校长 — 工程技术科学博士"
    },

    // Marquee & Topics
    "Iqlim moslashuvi": {
      uz: "Iqlim moslashuvi", en: "Climate adaptation", ru: "Климатическая адаптация",
      kk: "Климатқа бейімделу", ky: "Климатка көнүгүү", tg: "Мутобиқшавӣ ба иқлим",
      tk: "Howa uýgunlaşmasy", az: "İqlimə uyğunlaşma", ge: "კლიმატის ადაპტაცია", mn: "Уур амьсгалын дасан зохицол", zh: "气候适应策略"
    },
    "Suv resurslari": {
      uz: "Suv resurslari", en: "Water resources", ru: "Водные ресурсы",
      kk: "Су ресурстары", ky: "Суу ресурстары", tg: "Захираҳои об",
      tk: "Suw serişdeleri", az: "Su ehtiyatları", ge: "წყლის რესურსები", mn: "Усны нөөц", zh: "水资源管理"
    },
    "Tuproq sog'ligi": {
      uz: "Tuproq sog'ligi", en: "Soil health", ru: "Здоровье почвы",
      kk: "Топырақ саулығы", ky: "Топурактын саламаттыгы", tg: "Саломатии хок",
      tk: "Topragyň saglygy", az: "Torpaq sağlamlığı", ge: "ნიადაგის ჯანმრთელობა", mn: "Хөрсний эрүүл мэнд", zh: "土壤健康与改良"
    },
    "Seleksiya": {
      uz: "Seleksiya", en: "Breeding", ru: "Селекция",
      kk: "Селекция", ky: "Селекция", tg: "Селексия",
      tk: "Seleksiýa", az: "Seleksiya", ge: "სელექცია", mn: "Сонгон шалгаруулалт", zh: "作物品种选育"
    },
    "AI & raqamli agrosanoat": {
      uz: "AI & raqamli agrosanoat", en: "AI & digital agro-industry", ru: "ИИ и цифровая агропромышленность",
      kk: "ЖИ және сандық агроөнеркәсіп", ky: "ЖИ жана санариптик агроөнөр жай", tg: "ЗС ва агросаноати рақамӣ",
      tk: "Emeli aň we sanly agrosenagat", az: "Sİ və rəqəmsal aqrosənaye", ge: "AI და ციფრული აგროინდუსტრია", mn: "AI ба дижитал хөдөө аж ахуй", zh: "AI与数字智慧农业"
    },
    "CAREC sherikligi": {
      uz: "CAREC sherikligi", en: "CAREC partnership", ru: "Партнерство ЦАРИЭС",
      kk: "CAREC серіктестігі", ky: "CAREC өнөктөштүгү", tg: "Ҳамкории CAREC",
      tk: "CAREC hyzmatdaşlygy", az: "CAREC tərəfdaşlığı", ge: "CAREC პარტნიორობა", mn: "CAREC түншлэл", zh: "CAREC区域伙伴关系"
    },
    "Ochiq ma'lumotlar": {
      uz: "Ochiq ma'lumotlar", en: "Open data", ru: "Открытые данные",
      kk: "Ашық деректер", ky: "Ачык маалыматтар", tg: "Маълумоти кушода",
      tk: "Açyk maglumatlar", az: "Açıq məlumatlar", ge: "ღია მონაცემები", mn: "Нээлттэй өгөгдөл", zh: "开放科学数据"
    },

    // Common Buttons & Labels
    "Barchasi": {
      uz: "Barchasi", en: "All", ru: "Все", kk: "Барлығы", ky: "Баары",
      tg: "Ҳама", tk: "Ählisi", az: "Hamısı", ge: "ყველა", mn: "Бүгд", zh: "全部"
    },
    "Batafsil": {
      uz: "Batafsil", en: "Read more", ru: "Подробнее", kk: "Толығырақ", ky: "Кененирээк",
      tg: "Муфассал", tk: "Giňişleýin", az: "Ətraflı", ge: "დაწვრილებით", mn: "Дэлгэрэнгүй", zh: "了解更多"
    },
    "Yuklab olish": {
      uz: "Yuklab olish", en: "Download", ru: "Скачать", kk: "Жүктеп алу", ky: "Жүктөп алуу",
      tg: "Боргирӣ", tk: "Ýükläp al", az: "Yüklə", ge: "ჩამოტვირთვა", mn: "Татах", zh: "下载文件"
    },
    "Filtrlar": {
      uz: "Filtrlar", en: "Filters", ru: "Фильтры", kk: "Сүзгілер", ky: "Чыпкалар",
      tg: "Филтрҳо", tk: "Filtrler", az: "Filterlər", ge: "ფილტრები", mn: "Шүүлтүүр", zh: "筛选条件"
    },
    "So'nggi yangiliklar": {
      uz: "So'nggi yangiliklar", en: "Latest News", ru: "Последние новости",
      kk: "Соңғы жаңалықтар", ky: "Соңку жаңылыктар", tg: "Хабарҳои охирин",
      tk: "Iň soňky täzelikler", az: "Son xəbərlər", ge: "ბოლო სიახლეები", mn: "Сүүлийн үеийн мэдээ", zh: "最新资讯与动态"
    },
    "Kelgusi tadbirlar": {
      uz: "Kelgusi tadbirlar", en: "Upcoming Events", ru: "Предстоящие события",
      kk: "Алдағы іс-шаралар", ky: "Алда боло турган иш-чаралар", tg: "Чорабиниҳои оянда",
      tk: "Geljekki çäreler", az: "Gələcək tədbirlər", ge: "მომავალი ღონისძიებები", mn: "Удахгүй болох үйл явдал", zh: "近期会议论坛"
    },
    "Ilmiy nashrlar": {
      uz: "Ilmiy nashrlar", en: "Publications", ru: "Научные публикации",
      kk: "Ғылыми басылымдар", ky: "Илимий басылмалар", tg: "Нашрияҳои илмӣ",
      tk: "Ylmy neşirler", az: "Elmi nəşrlər", ge: "სამეცნიერო პუბლიკაციები", mn: "Шинжлэх ухааны нийтлэл", zh: "学术与科学出版物"
    },
    "Hamkor tashkilotlar": {
      uz: "Hamkor tashkilotlar", en: "Partner Institutions", ru: "Партнерские организации",
      kk: "Серіктес ұйымдар", ky: "Өнөктөш уюмдар", tg: "Ташкилотҳои шарик",
      tk: "Hyzmatdaş guramalar", az: "Tərəfdaş təşkilatlar", ge: "პარტნიორი ორგანიზაციები", mn: "Түнш байгууллагууд", zh: "区域主要合作机构"
    }
  };

  // Google Translate ISO Mapping
  const GT_LANG_MAP = {
    uz: 'uz',
    en: 'en',
    ru: 'ru',
    kk: 'kk',
    ky: 'ky',
    tg: 'tg',
    tk: 'tk',
    az: 'az',
    ge: 'ka',
    ka: 'ka',
    mn: 'mn',
    zh: 'zh-CN',
    'zh-CN': 'zh-CN',
    ps: 'ps',
    ur: 'ur'
  };

  // 1. In-Memory Direct Dictionary Translation
  function translateDOMWithDict(lang) {
    if (!lang) return;

    // A) Process all elements with data-uz / data-en attributes
    document.querySelectorAll('[data-uz], [data-en]').forEach(el => {
      // Check if explicit attribute exists for current lang
      const exactAttr = el.getAttribute('data-' + lang);
      if (exactAttr) {
        setElementText(el, exactAttr);
        return;
      }

      // Check dictionary match against data-uz or original text
      const baseUz = el.getAttribute('data-uz') || el.innerText || '';
      const cleanUz = baseUz.trim();

      if (CAREC_DICT[cleanUz] && CAREC_DICT[cleanUz][lang]) {
        setElementText(el, CAREC_DICT[cleanUz][lang]);
        return;
      }

      // Fallback behavior:
      if (lang === 'ru' && el.getAttribute('data-ru')) {
        setElementText(el, el.getAttribute('data-ru'));
      } else if (lang === 'en' && el.getAttribute('data-en')) {
        setElementText(el, el.getAttribute('data-en'));
      } else if (lang === 'uz' && el.getAttribute('data-uz')) {
        setElementText(el, el.getAttribute('data-uz'));
      }
      // CRITICAL: DO NOT overwrite with English for zh, kk, ky, tg, tk, az!
      // Keep baseUz so Google Translate engine translates cleanly from base!
    });

    // B) Translate standard text nodes that match dictionary keys
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const nodesToReplace = [];
    let n;
    while ((n = walker.nextNode())) {
      const txt = n.nodeValue.trim();
      if (CAREC_DICT[txt] && CAREC_DICT[txt][lang]) {
        nodesToReplace.push({ node: n, val: CAREC_DICT[txt][lang] });
      }
    }
    nodesToReplace.forEach(item => {
      item.node.nodeValue = item.val;
    });
  }

  function setElementText(el, text) {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else if (text.includes('<') && text.includes('>')) {
      setHTML(el, text);
    } else {
      el.textContent = text;
    }
  }

  // Translation uses the bundled CAREC dictionary and page data attributes.
  window.RCGA_I18N = { dict: CAREC_DICT, translateDOMWithDict };
})();
