import { Page } from '../Page';
import { Nav, Footer } from '../Layout';

export default function RoutePage() {
  return <Page page="about" title="RCGA Haqida — Regional Center for Green Agriculture" description="" bodyClass="" dark={false}>
<div>
  <div className="scroll-progress" />
  <Nav active="about" dark={false} />
  <section className="page-hero">
    <div className="container-wide">
      <div className="crumbs">
        <a href="index.html" data-uz="Bosh sahifa" data-en="Home" data-ru="Главная">Bosh sahifa</a>
        <span className="sep">/</span>
        <span data-uz="RCGA Haqida" data-en="About RCGA" data-ru="О центре RCGA">RCGA Haqida</span>
      </div>
      <div className="eyebrow" data-uz="CAREC mintaqaviy markaz · 2018 yildan" data-en="CAREC Regional Center · Since 2018" data-ru="Региональный центр ЦАРИЭС · С 2018 года">CAREC mintaqaviy markaz · 2018 yildan</div>
      <h1>
        <span data-uz="Yashil agrar" data-en="Green agrarian" data-ru="Зеленое аграрное">Yashil agrar</span>{' '}
        <em data-uz="kelajak" data-en="future" data-ru="будущее">kelajak</em>{' '}
        <span data-uz="— ilm va hamkorlik orqali." data-en="— through science & partnership." data-ru="— через науку и партнерство.">— ilm va hamkorlik orqali.</span>
      </h1>
      <p className="lead" data-uz="Regional Center for Green Agriculture — Markaziy Osiyo va Janubiy Kavkazda iqlimga moslashgan dehqonchilik va raqamli agrosanoat sohasidagi bilim, tadqiqot va innovatsiyalar markazi." data-en="Regional Center for Green Agriculture — the knowledge, research, and innovation hub for climate-resilient agriculture and digital agri-industry across Central Asia and South Caucasus." data-ru="Региональный центр зеленого сельского хозяйства (RCGA) — центр знаний, исследований и инноваций в области климатически устойчивого земледелия и цифрового агробизнеса в Центральной Азии и на Южном Кавказе.">Regional Center for Green Agriculture — Markaziy Osiyo va Janubiy Kavkazda iqlimga moslashgan dehqonchilik va raqamli agrosanoat sohasidagi bilim, tadqiqot va innovatsiyalar markazi.</p>
    </div>
  </section>
  {/* INTRO IMAGE + TEXT */}
  <section className="section">
    <div className="container-wide">
      <div className="reveal" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start'}}>
        <div>
          <img loading="lazy" decoding="async" className="editorial-photo" src="assets/central-asia-climate.jpg" alt="" style={{width: '100%', aspectRatio: '4/5', objectFit: 'cover'}} />
        </div>
        <div>
          <div className="eyebrow" style={{marginBottom: 24}} data-uz="Bizning hikoyamiz" data-en="Our Story" data-ru="Наша история">Bizning hikoyamiz</div>
          <h2 style={{marginBottom: 32}}>
            <span data-uz="Mintaqa" data-en="Joint answer to" data-ru="Совместный ответ на">Mintaqa</span>
            <em data-uz="chaqirig'iga" data-en="regional" data-ru="вызовы">chaqirig'iga</em>
            <span data-uz="hamkor javob." data-en="challenges." data-ru="региона.">hamkor javob.</span>
          </h2>
          <p className="lead" style={{marginBottom: 24}} data-uz="RCGA 2018 yilda CAREC Davlatlari Ittifoqi qarori bilan tashkil etilgan bo'lib, mintaqaning eng katta agroekologik muammolari — suv tanqisligi, tuproq degradatsiyasi va iqlim o'zgarishi sharoitida hosildorlik tushishi bilan kurashishga qaratilgan." data-en="Established in 2018 under the CAREC initiative, RCGA is dedicated to addressing the region's core agroecological trials: water scarcity, soil degradation, and yield loss from climate volatility." data-ru="Созданный в 2018 году по инициативе ЦАРИЭС, RCGA призван бороться с острейшими агроэкологическими проблемами региона: нехваткой воды, деградацией почв и снижением урожайности.">RCGA 2018 yilda CAREC Davlatlari Ittifoqi qarori bilan tashkil etilgan bo'lib, mintaqaning eng katta agroekologik muammolari — suv tanqisligi, tuproq degradatsiyasi va iqlim o'zgarishi sharoitida hosildorlik tushishi bilan kurashishga qaratilgan.</p>
          <p style={{color: 'var(--ink-600)', lineHeight: '1.7', marginBottom: 24}} data-uz="Bizning vazifamiz — har bir CAREC davlatida olib borilayotgan ilmiy tadqiqotlarning natijalarini umumiy resursga aylantirish va ulardan mintaqaviy darajada foydalanishni ta'minlash. Bu — fermerdan tortib siyosatchigacha barchaga foydali bo'lgan ochiq, ko'p tilli va ishonchli bilim platformasi." data-en="Our mission is to translate national scientific outputs across CAREC nations into a shared collective asset, delivering an open, multilingual, reliable intelligence portal serving farmers through policymakers." data-ru="Наша миссия — превратить результаты исследований каждой страны ЦАРИЭС в общее достояние и обеспечить их применение: от фермера до лица, принимающего решения.">Bizning vazifamiz — har bir CAREC davlatida olib borilayotgan ilmiy tadqiqotlarning natijalarini umumiy resursga aylantirish va ulardan mintaqaviy darajada foydalanishni ta'minlash. Bu — fermerdan tortib siyosatchigacha barchaga foydali bo'lgan ochiq, ko'p tilli va ishonchli bilim platformasi.</p>
          <div className="pull-quote" data-uz="&quot;Iqlim o'zgarishi chegara bilmaydi. Demak, biz uning ta'siriga qarshi javobimiz ham mintaqaviy darajada bo'lishi kerak.&quot;" data-en="&quot;Climate change knows no borders. Hence, our collective response must be regional.&quot;" data-ru="&quot;Изменение климата не знает границ. Значит, и наш ответ должен быть общерегиональным.&quot;">"Iqlim o'zgarishi chegara bilmaydi. Demak, biz uning ta'siriga qarshi javobimiz ham mintaqaviy darajada bo'lishi kerak."</div>
        </div>
      </div>
    </div>
  </section>
  {/* VALUES */}
  <section className="section bg-cream">
    <div className="container-wide">
      <div className="section-head reveal">
        <div>
          <div className="eyebrow" style={{marginBottom: 24}} data-uz="Qadriyatlar" data-en="Values" data-ru="Ценности">Qadriyatlar</div>
          <h2>
            <span data-uz="To'rtta tamoyil" data-en="Guided by four" data-ru="Четыре основополагающих">To'rtta tamoyil</span>
            <em data-uz="asosida" data-en="core" data-ru="принципа">asosida</em>
            <span data-uz="ishlaymiz." data-en="principles." data-ru="в нашей работе.">ishlaymiz.</span>
          </h2>
        </div>
        <p className="lead" data-uz="RCGA faoliyatining har bir bo'g'ini ushbu to'rtta qadriyatga asoslanadi." data-en="Every branch of RCGA endeavors is rooted firmly in these four tenets." data-ru="Каждое направление деятельности RCGA опирается на эти четыре ценности.">RCGA faoliyatining har bir bo'g'ini ushbu to'rtta qadriyatga asoslanadi.</p>
      </div>
      <div className="numbered-list reveal-stagger">
        <div className="numbered-item">
          <div className="numbered-item-num">01</div>
          <div>
            <h4 data-uz="Ochiq ilm-fan" data-en="Open Science" data-ru="Открытая наука">Ochiq ilm-fan</h4>
            <p data-uz="Barcha tadqiqotlarimiz Open Access tamoyiliga muvofiq nashr etiladi. Bilim — universal huquq." data-en="All scientific works are published Open Access. Knowledge is a universal entitlement." data-ru="Все наши исследования публикуются по принципу Open Access. Знания — универсальное право.">Barcha tadqiqotlarimiz Open Access tamoyiliga muvofiq nashr etiladi. Bilim — universal huquq.</p>
          </div>
        </div>
        <div className="numbered-item">
          <div className="numbered-item-num">02</div>
          <div>
            <h4 data-uz="Mintaqaviy hamkorlik" data-en="Regional Cooperation" data-ru="Региональное сотрудничество">Mintaqaviy hamkorlik</h4>
            <p data-uz="11 davlat olimlari va muassasalarini birlashtirgan tarmoq — yagona davlat hal qila olmaydigan muammolarni yechishga qodir." data-en="A network uniting researchers across 11 countries capable of resolving transnational challenges." data-ru="Сеть ученых 11 стран способна решать вызовы, непосильные одному государству в одиночку.">11 davlat olimlari va muassasalarini birlashtirgan tarmoq — yagona davlat hal qila olmaydigan muammolarni yechishga qodir.</p>
          </div>
        </div>
        <div className="numbered-item">
          <div className="numbered-item-num">03</div>
          <div>
            <h4 data-uz="Dalillarga asoslangan qarorlar" data-en="Evidence-Based Policies" data-ru="Решения на основе данных">Dalillarga asoslangan qarorlar</h4>
            <p data-uz="Har bir tavsiya va siyosat hujjati — sifatli ma'lumotlar va sinovdan o'tgan modellar asosida qabul qilinadi." data-en="Every recommendation and brief is anchored in validated empirical models." data-ru="Каждая рекомендация вырабатывается на основе проверенных аналитических моделей.">Har bir tavsiya va siyosat hujjati — sifatli ma'lumotlar va sinovdan o'tgan modellar asosida qabul qilinadi.</p>
          </div>
        </div>
        <div className="numbered-item">
          <div className="numbered-item-num">04</div>
          <div>
            <h4 data-uz="Yashil va etik" data-en="Green & Ethical" data-ru="Экологично и этично">Yashil va etik</h4>
            <p data-uz="Tabiat barqarorligi, agro-ekologik xilma-xillik va mahalliy fermerlarning huquqlari — har bir loyiha uchun rad etilmas tamoyillar." data-en="Ecological sustainability, biodiversity, and smallholder rights remain non-negotiable." data-ru="Устойчивость экосистем, биоразнообразие и права фермеров — незыблемые принципы.">Tabiat barqarorligi, agro-ekologik xilma-xillik va mahalliy fermerlarning huquqlari — har bir loyiha uchun rad etilmas tamoyillar.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* STATS */}
  <section className="bg-dark">
    <div className="container-wide">
      <div style={{padding: '100px 0 60px'}} className="reveal">
        <div className="eyebrow" style={{color: 'var(--green-400)', marginBottom: 24}} data-uz="Raqamlarda RCGA" data-en="RCGA in Numbers" data-ru="RCGA в цифрах">Raqamlarda RCGA</div>
        <h2 style={{color: '#fff', maxWidth: 800}}>
          <span data-uz="2018 yildan beri —" data-en="Since 2018 —" data-ru="С 2018 года —">2018 yildan beri —</span>
          <em data-uz="raqamlarda" data-en="our narrative" data-ru="в ключевых">raqamlarda</em>
          <span data-uz="hikoyamiz." data-en="in figures." data-ru="показателях.">hikoyamiz.</span>
        </h2>
      </div>
      <div className="stats dark reveal-stagger" style={{marginBottom: 40}}>
        <div className="stat">
          <div className="stat-num"><span data-count={11}>0</span></div>
          <div className="stat-label" data-uz="CAREC davlatlari" data-en="CAREC Countries" data-ru="Страны ЦАРИЭС">CAREC davlatlari</div>
        </div>
        <div className="stat">
          <div className="stat-num"><span data-count={86}>0</span></div>
          <div className="stat-label" data-uz="Hamkor muassasalar" data-en="Partner Institutions" data-ru="Партнерские институты">Hamkor muassasalar</div>
        </div>
        <div className="stat">
          <div className="stat-num"><span data-count={240}>0</span><span className="plus">+</span></div>
          <div className="stat-label" data-uz="Faol tadqiqotchilar" data-en="Active Researchers" data-ru="Активные исследователи">Faol tadqiqotchilar</div>
        </div>
        <div className="stat">
          <div className="stat-num"><span data-count={42}>0</span></div>
          <div className="stat-label" data-uz="Davlat tashabbuslari" data-en="Policy Initiatives" data-ru="Государственные инициативы">Davlat tashabbuslari</div>
        </div>
      </div>
    </div>
  </section>
  {/* TEAM / LEADERSHIP */}
  <section className="section">
    <div className="container-wide">
      <div className="section-head reveal">
        <div>
          <div className="eyebrow" style={{marginBottom: 24}} data-uz="Yetakchilik" data-en="Leadership" data-ru="Руководство">Yetakchilik</div>
          <h2>
            <span data-uz="Boshqaruv" data-en="Board of" data-ru="Совет">Boshqaruv</span>
            <em data-uz="kengashi" data-en="Directors" data-ru="директоров">kengashi</em>.
          </h2>
        </div>
        <p className="lead" data-uz="RCGA faoliyati mintaqa yetakchi olimlari, siyosatchilari va xalqaro mutaxassislaridan iborat Boshqaruv kengashi tomonidan nazorat qilinadi." data-en="Operations are overseen by the Governing Council composed of prominent scholars and policymakers." data-ru="Деятельность центра курируется Советом, состоящим из авторитетных ученых и экспертов региона.">RCGA faoliyati mintaqa yetakchi olimlari, siyosatchilari va xalqaro mutaxassislaridan iborat Boshqaruv kengashi tomonidan nazorat qilinadi.</p>
      </div>
      <div className="card-grid reveal-stagger">
        <div className="pub-card" style={{cursor: 'default'}}>
          <div className="pub-card-img" style={{aspectRatio: 1, background: 'linear-gradient(135deg, var(--green-50), var(--ink-100))', display: 'grid', placeItems: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 96, color: 'var(--green-700)'}}>DE</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Direktor" data-en="Director" data-ru="Директор">Direktor</span><span className="dot" /><span data-uz="Toshkent" data-en="Tashkent" data-ru="Ташкент">Toshkent</span></div>
            <h4>Prof. Dilfuza Egamberdiyeva</h4>
            <p className="pub-card-excerpt" data-uz="Mikrobiologiya bo'yicha xalqaro mutaxassis, 200+ ilmiy maqola muallifi. Tuproq sog'ligi va biofermentlar yo'nalishida o'ttiz yildan ortiq tajriba." data-en="International microbiologist, author of 200+ publications with 30+ years in soil biology & biofermentation." data-ru="Международный эксперт по микробиологии, автор 200+ публикаций. Свыше 30 лет опыта в сфере плодородия почв.">Mikrobiologiya bo'yicha xalqaro mutaxassis, 200+ ilmiy maqola muallifi. Tuproq sog'ligi va biofermentlar yo'nalishida o'ttiz yildan ortiq tajriba.</p>
          </div>
        </div>
        <div className="pub-card" style={{cursor: 'default'}}>
          <div className="pub-card-img" style={{aspectRatio: 1, background: 'linear-gradient(135deg, var(--green-50), var(--ink-100))', display: 'grid', placeItems: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 96, color: 'var(--green-700)'}}>KA</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Ilmiy kotib" data-en="Scientific Secretary" data-ru="Ученый секретарь">Ilmiy kotib</span><span className="dot" /><span data-uz="Olmaota" data-en="Almaty" data-ru="Алматы">Olmaota</span></div>
            <h4>Dr. Kanat Akramov</h4>
            <p className="pub-card-excerpt" data-uz="Agro-iqtisod bo'yicha tadqiqotchi. CAREC mintaqasidagi yer foydalanish siyosati va islohotlar bo'yicha 80+ tahlil va siyosat hujjati muallifi." data-en="Agri-economist, author of 80+ policy studies addressing land rights and tenure across Central Asia." data-ru="Агроэкономист, автор более 80 аналитических записок по реформам землепользования в регионе.">Dr. Kanat Akramov</p>
          </div>
        </div>
        <div className="pub-card" style={{cursor: 'default'}}>
          <div className="pub-card-img" style={{aspectRatio: 1, background: 'linear-gradient(135deg, var(--green-50), var(--ink-100))', display: 'grid', placeItems: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 96, color: 'var(--green-700)'}}>SY</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Texnologiyalar direktori" data-en="CTO" data-ru="Технический директор">Texnologiyalar direktori</span><span className="dot" /><span data-uz="Toshkent" data-en="Tashkent" data-ru="Ташкент">Toshkent</span></div>
            <h4>Saodat Yusupova, PhD</h4>
            <p className="pub-card-excerpt" data-uz="Raqamli agrosanoat, sun'iy yo'ldosh monitoringi va AI/ML asosidagi qishloq xo'jaligi tahlili yo'nalishida yetakchi mutaxassis." data-en="Head of digital agritech, satellite telemetry, and machine learning analytics." data-ru="Руководитель направления цифрового агробизнеса, спутникового мониторинга и моделей машинного обучения.">Saodat Yusupova, PhD</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* TIMELINE */}
  <section className="section bg-ink50">
    <div className="container-wide">
      <div className="section-head-single reveal">
        <div className="eyebrow" style={{marginBottom: 20}} data-uz="Tarix" data-en="Milestones" data-ru="История">Tarix</div>
        <h2>
          <span data-uz="RCGA" data-en="RCGA" data-ru="Хронология">RCGA</span>
          <em data-uz="yo'li" data-en="journey" data-ru="развития">yo'li</em>
          <span data-uz="— qisqacha xronologiya." data-en="— brief timeline." data-ru="центра.">— qisqacha xronologiya.</span>
        </h2>
      </div>
      <div className="reveal">
        <div className="event-row" style={{cursor: 'default'}}>
          <div className="event-date">2018<span data-uz="Asos solinishi" data-en="Foundation" data-ru="Основание">Asos solinishi</span></div>
          <div>
            <div className="event-title" data-uz="CAREC Davlatlari Ittifoqi tomonidan tashkil etilgan" data-en="Inaugurated by CAREC Intergovernmental Accord" data-ru="Основан межправительственным решением стран ЦАРИЭС">CAREC Davlatlari Ittifoqi tomonidan tashkil etilgan</div>
            <p style={{color: 'var(--ink-600)', fontSize: 15, marginTop: 4}} data-uz="Toshkentda bosh ofis va mintaqaviy hamkorlik tarmog'ining asoslanishi." data-en="HQ established in Tashkent and regional collaborative network chartered." data-ru="Открытие штаб-квартиры в Ташкенте и формирование региональной сети институтов.">Toshkentda bosh ofis va mintaqaviy hamkorlik tarmog'ining asoslanishi.</p>
          </div>
          <div />
        </div>
        <div className="event-row" style={{cursor: 'default'}}>
          <div className="event-date">2020<span data-uz="Birinchi platforma" data-en="First Platform" data-ru="Первая платформа">Birinchi platforma</span></div>
          <div>
            <div className="event-title" data-uz="RCGA Digital v1.0 — birinchi ochiq nashrlar bazasi" data-en="RCGA Digital v1.0 — open publication repository launched" data-ru="RCGA Digital v1.0 — запуск первой открытой базы публикаций">RCGA Digital v1.0 — birinchi ochiq nashrlar bazasi</div>
            <p style={{color: 'var(--ink-600)', fontSize: 15, marginTop: 4}} data-uz="350+ tadqiqot, 32 muassasa, 3 til qo'llab-quvvatlash." data-en="350+ research papers, 32 institutions, trilingual interface." data-ru="350+ исследований, 32 института, трехъязычный интерфейс.">350+ tadqiqot, 32 muassasa, 3 til qo'llab-quvvatlash.</p>
          </div>
          <div />
        </div>
        <div className="event-row" style={{cursor: 'default'}}>
          <div className="event-date">2022<span data-uz="Texnologik kengayish" data-en="Tech Expansion" data-ru="Техно-экспансия">Texnologik kengayish</span></div>
          <div>
            <div className="event-title" data-uz="Sun'iy yo'ldosh va dron monitoringi integratsiyasi" data-en="Satellite and drone telemetry integrated" data-ru="Интеграция спутникового и беспилотного мониторинга">Sun'iy yo'ldosh va dron monitoringi integratsiyasi</div>
            <p style={{color: 'var(--ink-600)', fontSize: 15, marginTop: 4}} data-uz="NASA, ESA va xalqaro hamkorlar bilan ochiq ma'lumotlar almashish kelishuvi." data-en="Open data agreements signed with NASA, ESA, and global scientific partners." data-ru="Соглашения об открытых данных с NASA, ESA и международными центрами.">NASA, ESA va xalqaro hamkorlar bilan ochiq ma'lumotlar almashish kelishuvi.</p>
          </div>
          <div />
        </div>
        <div className="event-row" style={{cursor: 'default'}}>
          <div className="event-date">2026<span data-uz="Hozir" data-en="Present" data-ru="Настоящее">Hozir</span></div>
          <div>
            <div className="event-title" data-uz="RCGA Digital v2.0 — yangi avlod platforma" data-en="RCGA Digital v2.0 — next generation ecosystem" data-ru="RCGA Digital v2.0 — платформа нового поколения">RCGA Digital v2.0 — yangi avlod platforma</div>
            <p style={{color: 'var(--ink-600)', fontSize: 15, marginTop: 4}} data-uz="AI asosidagi tahlillar, hamjamiyat funksiyalari va kengaytirilgan ma'lumotlar bazasi." data-en="AI-driven analytical tools, community services, and comprehensive regional datasets." data-ru="Аналитика на базе ИИ, сообщество ученых и расширенное хранилище знаний.">AI asosidagi tahlillar, hamjamiyat funksiyalari va kengaytirilgan ma'lumotlar bazasi.</p>
          </div>
          <div />
        </div>
      </div>
    </div>
  </section>
  {/* CTA */}
  <section className="section">
    <div className="container-wide">
      <div className="cta-block reveal">
        <div className="eyebrow" style={{justifyContent: 'center'}} data-uz="Aloqaga chiqing" data-en="Get in Touch" data-ru="Свяжитесь с нами">Aloqaga chiqing</div>
        <h2>
          <span data-uz="Hamkorlik" data-en="Partnership" data-ru="Сотрудничество">Hamkorlik</span>
          <em data-uz="boshlanadi" data-en="begins" data-ru="начинается">boshlanadi</em>.
        </h2>
        <p data-uz="RCGA bilan ilmiy hamkorlik, ma'lumot almashish yoki birgalikdagi loyiha — biz bilan bog'laning." data-en="Whether for research partnerships, data sharing, or joint initiatives — connect with us." data-ru="Для научного партнерства, обмена данными или реализации совместных проектов свяжитесь с нами.">RCGA bilan ilmiy hamkorlik, ma'lumot almashish yoki birgalikdagi loyiha — biz bilan bog'laning.</p>
        <a href="login.html" className="btn btn-primary" style={{background: '#fff', color: 'var(--green-900)'}}>
          <span data-uz="Biz bilan bog'laning" data-en="Connect With Us" data-ru="Связаться с нами">Biz bilan bog'laning</span>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </a>
      </div>
    </div>
  </section>
  <Footer />
</div>
  </Page>;
}
