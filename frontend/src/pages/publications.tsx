import { Page } from '../Page';
import { Nav, Footer } from '../Layout';

export default function RoutePage() {
  return <Page page="publications" title="Ilmiy nashrlar — RCGA" description="" bodyClass="" dark={false}>
<div>
  <div className="scroll-progress" />
  <Nav active="publications" dark={false} />
  <section className="page-hero">
    <div className="container-wide">
      <div className="crumbs">
        <a href="index.html" data-uz="Bosh sahifa" data-en="Home" data-ru="Главная">Bosh sahifa</a>
        <span className="sep">/</span>
        <span data-uz="Ilmiy nashrlar" data-en="Publications" data-ru="Научные публикации">Ilmiy nashrlar</span>
      </div>
      <div className="eyebrow" data-uz="1 240+ tadqiqot · 11 davlat · 3 til" data-en="1,240+ Studies · 11 Countries · 3 Languages" data-ru="1 240+ исследований · 11 стран · 3 языка">1 240+ tadqiqot · 11 davlat · 3 til</div>
      <h1>
        <span data-uz="Mintaqaning" data-en="The region's" data-ru="Открытая научная">Mintaqaning</span>{' '}
        <em data-uz="ochiq" data-en="open" data-ru="база данных">ochiq</em>{' '}
        <span data-uz="ilmiy bazasi." data-en="scientific repository." data-ru="региона.">ilmiy bazasi.</span>
      </h1>
      <p className="lead" data-uz="Tadqiqot maqolalari, texnik yo'riqnomalar, siyosat tahlillari va ma'lumotlar to'plamlari — barchasi ochiq foydalanish uchun." data-en="Research papers, technical guidelines, policy briefs, and datasets — all openly accessible." data-ru="Научные статьи, технические руководства, аналитические записки и наборы данных — в открытом доступе.">Tadqiqot maqolalari, texnik yo'riqnomalar, siyosat tahlillari va ma'lumotlar to'plamlari — barchasi ochiq foydalanish uchun.</p>
    </div>
  </section>
  {/* SEARCH + FILTERS */}
  <section className="section-tight">
    <div className="container-wide">
      <div className="search-bar reveal" style={{marginBottom: 24}}>
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={11} cy={11} r={8} /><path d="M21 21l-4.3-4.3" /></svg>
        <input type="search" enterKeyHint="search" placeholder="Nashr nomi, muallif yoki kalit so'z bo'yicha qidiring..." data-uz="Nashr nomi, muallif yoki kalit so'z bo'yicha qidiring..." data-en="Search by title, author, or keyword..." data-ru="Поиск по названию, автору или ключевому слову..." />
        <button className="btn btn-primary btn-sm" data-uz="Qidirish" data-en="Search" data-ru="Поиск">Qidirish</button>
      </div>
      <div className="filter-bar reveal">
        <button className="filter-chip active" data-uz="Barchasi · 1 240" data-en="All · 1,240" data-ru="Все · 1 240">Barchasi · 1 240</button>
        <button className="filter-chip" data-uz="Iqlim va suv" data-en="Climate & Water" data-ru="Климат и вода">Iqlim va suv</button>
        <button className="filter-chip" data-uz="Tuproq va o'g'it" data-en="Soil & Fertilizer" data-ru="Почва и удобрения">Tuproq va o'g'it</button>
        <button className="filter-chip" data-uz="Seleksiya" data-en="Breeding" data-ru="Селекция">Seleksiya</button>
        <button className="filter-chip" data-uz="Raqamli agrosanoat" data-en="Digital Agri-tech" data-ru="Цифровой агробизнес">Raqamli agrosanoat</button>
        <button className="filter-chip" data-uz="Siyosat tahlili" data-en="Policy Analysis" data-ru="Анализ политики">Siyosat tahlili</button>
        <button className="filter-chip" data-uz="Chorvachilik" data-en="Livestock" data-ru="Животноводство">Chorvachilik</button>
        <button className="filter-chip" data-uz="Oziq-ovqat xavfsizligi" data-en="Food Security" data-ru="Продовольственная безопасность">Oziq-ovqat xavfsizligi</button>
      </div>
    </div>
  </section>
  {/* PUBLICATIONS GRID */}
  <section style={{paddingBottom: 120}}>
    <div className="container-wide">
      <div className="card-grid reveal-stagger">
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img">
            <img loading="lazy" decoding="async" src="assets/aral-sea-conservation.jpg" alt="" />
            <div className="pub-card-badge" data-uz="Tadqiqot" data-en="Research" data-ru="Исследование">Tadqiqot</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Iqlim · Suv" data-en="Climate · Water" data-ru="Климат · Вода">Iqlim · Suv</span><span className="dot" /><span>2026</span></div>
            <h4 data-uz="Orol dengizi havzasida barqaror sug'orish tizimlari uchun ma'lumotlarga asoslangan qaror qabul qilish" data-en="Data-driven decision making for sustainable irrigation in the Aral Sea basin" data-ru="Принятие решений на основе данных для устойчивого орошения в бассейне Аральского моря">Orol dengizi havzasida barqaror sug'orish tizimlari uchun ma'lumotlarga asoslangan qaror qabul qilish</h4>
            <p className="pub-card-excerpt" data-uz="Sun'iy yo'ldosh ma'lumotlari va dala monitoringi asosida Qoraqalpog'iston va Xorazm viloyatlarida suv samaradorligini oshirish." data-en="Improving water efficiency in Karakalpakstan and Khorezm based on satellite data and field monitoring." data-ru="Повышение эффективности водопользования в Каракалпакстане и Хорезме на основе спутниковых данных и полевого мониторинга.">Sun'iy yo'ldosh ma'lumotlari va dala monitoringi asosida Qoraqalpog'iston va Xorazm viloyatlarida suv samaradorligini oshirish.</p>
            <div className="pub-card-foot"><span>D. Egamberdiyeva</span><span className="arrow"><svg width={18} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg></span></div>
          </div>
        </a>
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img">
            <img loading="lazy" decoding="async" src="assets/farm-restructuring.jpg" alt="" />
            <div className="pub-card-badge" data-uz="Tahlil" data-en="Analysis" data-ru="Анализ">Tahlil</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Siyosat" data-en="Policy" data-ru="Политика">Siyosat</span><span className="dot" /><span>2026</span></div>
            <h4 data-uz="CAREC mintaqasida fermer xo'jaligini qayta tashkil etishning 30 yillik tajribasi" data-en="30 years of experience in farm restructuring in the CAREC region" data-ru="30-летний опыт реструктуризации фермерских хозяйств в регионе ЦАРИЭС">CAREC mintaqasida fermer xo'jaligini qayta tashkil etishning 30 yillik tajribasi</h4>
            <p className="pub-card-excerpt" data-uz="8 ta davlat misolida agrar islohotlar, yer foydalanish huquqlari va suv resurslarini boshqarish bo'yicha qiyosiy tahlil." data-en="Comparative analysis of agricultural reforms, land use rights, and water management across 11 countries." data-ru="Сравнительный анализ аграрных реформ, прав землепользования и управления водными ресурсами на примере 11 стран.">8 ta davlat misolida agrar islohotlar, yer foydalanish huquqlari va suv resurslarini boshqarish bo'yicha qiyosiy tahlil.</p>
            <div className="pub-card-foot"><span>K. Akramov</span><span className="arrow"><svg width={18} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg></span></div>
          </div>
        </a>
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img">
            <img loading="lazy" decoding="async" src="assets/uzbek-china-lab.jpg" alt="" />
            <div className="pub-card-badge" data-uz="Texnik" data-en="Technical" data-ru="Технический">Texnik</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Tuproq" data-en="Soil" data-ru="Почва">Tuproq</span><span className="dot" /><span>2025</span></div>
            <h4 data-uz="Cho'l zonasidagi tuproq mikrobiomasi: O'zbek-Xitoy qo'shma laboratoriyasi natijalari" data-en="Soil microbiome in arid zones: findings of the Uzbek-Chinese Joint Laboratory" data-ru="Микробиом почв в аридных зонах: результаты узбекско-китайской совместной лаборатории">Cho'l zonasidagi tuproq mikrobiomasi: O'zbek-Xitoy qo'shma laboratoriyasi natijalari</h4>
            <p className="pub-card-excerpt" data-uz="Toshkent va Kashqar yaqinida olib borilgan 5 yillik tajribalar asosida tuproq sog'ligi va o'g'it samaradorligi." data-en="Soil health and fertilizer efficiency based on 5 years of experiments conducted near Tashkent and Kashgar." data-ru="Здоровье почвы и эффективность удобрений на основе 5-летних экспериментов вблизи Ташкента и Кашгара.">Toshkent va Kashqar yaqinida olib borilgan 5 yillik tajribalar asosida tuproq sog'ligi va o'g'it samaradorligi.</p>
            <div className="pub-card-foot"><span>S. Yusupova</span><span className="arrow"><svg width={18} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg></span></div>
          </div>
        </a>
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img">
            <img loading="lazy" decoding="async" src="assets/smallholder-farmers.jpg" alt="" />
            <div className="pub-card-badge" data-uz="Tadqiqot" data-en="Research" data-ru="Исследование">Tadqiqot</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Oziq-ovqat" data-en="Food" data-ru="Питание">Oziq-ovqat</span><span className="dot" /><span>2025</span></div>
            <h4 data-uz="Markaziy Osiyoda mayda fermerlarning xavfsizlik tizimlari va xavf-xatarlarni boshqarish" data-en="Safety networks and risk management for smallholders in Central Asia" data-ru="Системы безопасности и управление рисками мелких фермеров Центральной Азии">Markaziy Osiyoda mayda fermerlarning xavfsizlik tizimlari va xavf-xatarlarni boshqarish</h4>
            <p className="pub-card-excerpt" data-uz="200 mingdan ortiq xo'jalik ma'lumotlari asosida iqlim xatarlariga moslashuv stsenariylari." data-en="Climate risk adaptation scenarios based on data from more than 200,000 households." data-ru="Сценарии адаптации к климатическим рискам на основе данных более чем 200 тысяч хозяйств.">200 mingdan ortiq xo'jalik ma'lumotlari asosida iqlim xatarlariga moslashuv stsenariylari.</p>
            <div className="pub-card-foot"><span data-uz="FAO · RCGA hamkorlikda" data-en="Joint FAO · RCGA" data-ru="Совместно ФАО · RCGA">FAO · RCGA hamkorlikda</span><span className="arrow"><svg width={18} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg></span></div>
          </div>
        </a>
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img">
            <img loading="lazy" decoding="async" src="assets/central-asia-climate.jpg" alt="" />
            <div className="pub-card-badge" data-uz="Siyosat hujjati" data-en="Policy Brief" data-ru="Политическая записка">Siyosat hujjati</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Iqlim" data-en="Climate" data-ru="Климат">Iqlim</span><span className="dot" /><span>2025</span></div>
            <h4 data-uz="Markaziy Osiyoda iqlim o'zgarishi sababli qishloq xo'jaligi yo'qotishlarini kamaytirish" data-en="Mitigating agricultural losses caused by climate change in Central Asia" data-ru="Снижение потерь сельского хозяйства от изменения климата в Центральной Азии">Markaziy Osiyoda iqlim o'zgarishi sababli qishloq xo'jaligi yo'qotishlarini kamaytirish</h4>
            <p className="pub-card-excerpt" data-uz="Mintaqaviy strategiya va davlat investitsiyalari uchun amaliy tavsiyalar." data-en="Practical recommendations for regional strategies and public investment." data-ru="Практические рекомендации для региональной стратегии и государственных инвестиций.">Mintaqaviy strategiya va davlat investitsiyalari uchun amaliy tavsiyalar.</p>
            <div className="pub-card-foot"><span>R. Boboqulov, A. Nazarov</span><span className="arrow"><svg width={18} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg></span></div>
          </div>
        </a>
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img">
            <img loading="lazy" decoding="async" src="assets/agri-service-center.jpg" alt="" />
            <div className="pub-card-badge" data-uz="Tadqiqot" data-en="Research" data-ru="Исследование">Tadqiqot</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Innovatsiya" data-en="Innovation" data-ru="Инновации">Innovatsiya</span><span className="dot" /><span>2025</span></div>
            <h4 data-uz="O'zbekistondagi agro-xizmat markazlari modeli: hosil va daromad ta'siri" data-en="Agri-service centers model in Uzbekistan: impact on yield and income" data-ru="Модель агросервисных центров в Узбекистане: влияние на урожай и доход">O'zbekistondagi agro-xizmat markazlari modeli: hosil va daromad ta'siri</h4>
            <p className="pub-card-excerpt" data-uz="12 ta viloyatda 2 yillik dala-tajribasi natijasida mexanizatsiya xizmatlarining ta'siri." data-en="Impact of mechanization services following a 2-year field experiment across 12 regions." data-ru="Влияние услуг механизации по итогам 2-летнего полевого эксперимента в 12 областях.">12 ta viloyatda 2 yillik dala-tajribasi natijasida mexanizatsiya xizmatlarining ta'siri.</p>
            <div className="pub-card-foot"><span>U. Tursunov</span><span className="arrow"><svg width={18} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg></span></div>
          </div>
        </a>
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img">
            <img loading="lazy" decoding="async" src="assets/young-scientist-school.jpg" alt="" />
            <div className="pub-card-badge" data-uz="Yo'riqnoma" data-en="Manual" data-ru="Руководство">Yo'riqnoma</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Suv boshqaruvi" data-en="Water Management" data-ru="Водные ресурсы">Suv boshqaruvi</span><span className="dot" /><span>2025</span></div>
            <h4 data-uz="Yosh tadqiqotchilar maktabi: Markaziy Osiyo suv resurslari bo'yicha qo'llanma" data-en="Young Scientists School: Central Asian Water Resources Guide" data-ru="Школа молодых ученых: руководство по водным ресурсам Центральной Азии">Yosh tadqiqotchilar maktabi: Markaziy Osiyo suv resurslari bo'yicha qo'llanma</h4>
            <p className="pub-card-excerpt" data-uz="PhD darajasidagi tadqiqotchilar uchun zamonaviy gidrologik modellashtirish vositalari." data-en="Modern hydrological modeling tools for doctoral researchers." data-ru="Современные инструменты гидрологического моделирования для исследователей PhD.">PhD darajasidagi tadqiqotchilar uchun zamonaviy gidrologik modellashtirish vositalari.</p>
            <div className="pub-card-foot"><span>CAWa Project</span><span className="arrow"><svg width={18} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg></span></div>
          </div>
        </a>
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img">
            <img loading="lazy" decoding="async" src="assets/fao-uzbekistan.jpg" alt="" />
            <div className="pub-card-badge" data-uz="Texnik" data-en="Technical" data-ru="Технический">Texnik</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Chorvachilik" data-en="Livestock" data-ru="Животноводство">Chorvachilik</span><span className="dot" /><span>2024</span></div>
            <h4 data-uz="PPR (kichik kavshovchi mol vabosi) yo'q qilish dasturi: O'zbekistondagi seromonitoring natijalari" data-en="PPR eradication program: seromonitoring results in Uzbekistan" data-ru="Программа искоренения чумы мелких жвачных: результаты серомониторинга в Узбекистане">PPR (kichik kavshovchi mol vabosi) yo'q qilish dasturi: O'zbekistondagi seromonitoring natijalari</h4>
            <p className="pub-card-excerpt" data-uz="FAO bilan hamkorlikda mintaqaviy chorvachilik xavfsizligi bo'yicha katta hajmli tahlil." data-en="Comprehensive analysis on regional livestock biosecurity in collaboration with FAO." data-ru="Масштабный анализ региональной биобезопасности животноводства в партнерстве с ФАО.">FAO bilan hamkorlikda mintaqaviy chorvachilik xavfsizligi bo'yicha katta hajmli tahlil.</p>
            <div className="pub-card-foot"><span>FAO Country Office</span><span className="arrow"><svg width={18} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg></span></div>
          </div>
        </a>
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img">
            <img loading="lazy" decoding="async" src="assets/farmer-healthy-soil.jpg" alt="" />
            <div className="pub-card-badge" data-uz="Tadqiqot" data-en="Research" data-ru="Исследование">Tadqiqot</div>
          </div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Tuproq" data-en="Soil" data-ru="Почва">Tuproq</span><span className="dot" /><span>2024</span></div>
            <h4 data-uz="Sog'lom tuproq — sog'lom hosil: organik o'g'itlardan foydalanishning mintaqaviy ko'rsatkichlari" data-en="Healthy soil — healthy yield: regional indicators of organic fertilizer application" data-ru="Здоровая почва — здоровый урожай: региональные показатели применения органических удобрений">Sog'lom tuproq — sog'lom hosil: organik o'g'itlardan foydalanishning mintaqaviy ko'rsatkichlari</h4>
            <p className="pub-card-excerpt" data-uz="100+ fermer xo'jaligi natijalari asosida amaliy tavsiyalar va xarajat-foyda tahlili." data-en="Practical recommendations and cost-benefit analysis based on results from 100+ farms." data-ru="Практические рекомендации и анализ затрат и выгод по результатам более 100 фермерских хозяйств.">100+ fermer xo'jaligi natijalari asosida amaliy tavsiyalar va xarajat-foyda tahlili.</p>
            <div className="pub-card-foot"><span>M. Rasulova</span><span className="arrow"><svg width={18} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7" /></svg></span></div>
          </div>
        </a>
      </div>
      <div className="reveal" style={{marginTop: 64, textAlign: 'center'}}>
        <button className="btn btn-outline" data-uz="Yana yuklash · 1 231 ta nashrdan 9 tasi ko'rsatildi" data-en="Load more · Showing 9 of 1,231 publications" data-ru="Загрузить еще · Показано 9 из 1 231 публикаций">Yana yuklash · 1 231 ta nashrdan 9 tasi ko'rsatildi</button>
      </div>
    </div>
  </section>
  <Footer />
</div>
  </Page>;
}
