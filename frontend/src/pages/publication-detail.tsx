import { Page } from '../Page';
import { Nav, Footer } from '../Layout';

export default function RoutePage() {
  return <Page page="publications" title="Orol dengizi havzasida barqaror sug'orish — RCGA" description="" bodyClass="" dark={false}>
<div>
  <div className="scroll-progress" />
  <Nav active="publications" dark={false} />
  <section className="page-hero page-hero-article" style={{paddingBottom: 0, background: '#fff'}}>
    <div className="container-wide">
      <div className="crumbs">
        <a href="index.html" data-uz="Bosh sahifa" data-en="Home" data-ru="Главная">Bosh sahifa</a>
        <span className="sep">/</span>
        <a href="publications.html" data-uz="Ilmiy nashrlar" data-en="Publications" data-ru="Научные публикации">Ilmiy nashrlar</a>
        <span className="sep">/</span>
        <span data-uz="Orol dengizi havzasida..." data-en="Aral Sea basin..." data-ru="Бассейн Аральского моря...">Orol dengizi havzasida...</span>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(24px, 4vw, 56px)', alignItems: 'start', paddingBottom: 'clamp(24px, 3vw, 36px)'}}>
        <div>
          <div style={{display: 'flex', gap: 8, marginBottom: 24}}>
            <span className="tag" data-uz="Tadqiqot" data-en="Research" data-ru="Исследование">Tadqiqot</span>
            <span className="tag ink" data-uz="Iqlim va Suv" data-en="Climate & Water" data-ru="Климат и вода">Iqlim va Suv</span>
            <span className="tag gold">Open Access</span>
          </div>
          <h1 data-uz="Orol dengizi havzasida barqaror sug'orish tizimlari uchun ma'lumotlarga asoslangan qaror qabul qilish." data-en="Data-driven decision making for sustainable irrigation systems in the Aral Sea basin." data-ru="Принятие решений на основе данных для устойчивых оросительных систем в бассейне Аральского моря.">Orol dengizi havzasida barqaror sug'orish tizimlari uchun <em>ma'lumotlarga asoslangan</em> qaror qabul qilish.</h1>
          <div style={{display: 'flex', gap: 24, marginTop: 20, flexWrap: 'wrap'}}>
            <div>
              <div style={{fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-500)', marginBottom: 6}} data-uz="Mualliflar" data-en="Authors" data-ru="Авторы">Mualliflar</div>
              <div style={{fontWeight: 600}}>Prof. D. Egamberdiyeva, Dr. K. Akramov, S. Yusupova</div>
            </div>
            <div>
              <div style={{fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-500)', marginBottom: 6}} data-uz="Nashr sanasi" data-en="Publication Date" data-ru="Дата публикации">Nashr sanasi</div>
              <div style={{fontWeight: 600}} data-uz="12 Mart 2026" data-en="March 12, 2026" data-ru="12 марта 2026">12 Mart 2026</div>
            </div>
            <div>
              <div style={{fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-500)', marginBottom: 6}}>DOI</div>
              <div style={{fontWeight: 600}}>10.1234/rcga.2026.0421</div>
            </div>
          </div>
        </div>
        <div>
          <img loading="lazy" decoding="async" className="editorial-photo" src="assets/aral-sea-conservation.jpg" alt="" style={{width: '100%', aspectRatio: '4/3', maxHeight: 320, objectFit: 'cover'}} />
        </div>
      </div>
    </div>
  </section>
  {/* ARTICLE BODY */}
  <section className="section">
    <div className="container-wide" style={{display: 'grid', gridTemplateColumns: '1fr 280px', gap: 80, alignItems: 'start'}}>
      <article style={{maxWidth: 760}}>
        <div className="eyebrow" style={{marginBottom: 20}} data-uz="Qisqacha" data-en="Abstract" data-ru="Аннотация">Qisqacha</div>
        <p className="lead" style={{marginBottom: 48}} data-uz="Ushbu tadqiqotda Orol dengizi havzasidagi sug'orish tizimlarining samaradorligini oshirish bo'yicha 2021–2026 yillar oralig'idagi dala kuzatuvlari va sun'iy yo'ldosh ma'lumotlari tahlil qilindi. Natijalar shuni ko'rsatadiki, ma'lumotlarga asoslangan qaror qabul qilish modeli suv yo'qotishlarini 27% gacha kamaytirishi mumkin." data-en="This research analyzes field observations and satellite data between 2021–2026 to enhance irrigation efficiency across the Aral Sea basin. Results indicate data-driven decision-making can reduce water losses by up to 27%." data-ru="В исследовании проанализированы полевые наблюдения и спутниковые данные за 2021–2026 годы для повышения эффективности систем орошения бассейна Аральского моря. Модель позволяет снизить потери воды до 27%.">Ushbu tadqiqotda Orol dengizi havzasidagi sug'orish tizimlarining samaradorligini oshirish bo'yicha 2021–2026 yillar oralig'idagi dala kuzatuvlari va sun'iy yo'ldosh ma'lumotlari tahlil qilindi. Natijalar shuni ko'rsatadiki, ma'lumotlarga asoslangan qaror qabul qilish modeli suv yo'qotishlarini 27% gacha kamaytirishi mumkin.</p>
        <h3 style={{marginBottom: 16}} data-uz="Kirish" data-en="Introduction" data-ru="Введение">Kirish</h3>
        <p style={{marginBottom: 24, color: 'var(--ink-700)', lineHeight: '1.75'}} data-uz="Orol dengizi falokati o'tgan asrning eng katta ekologik fojialaridan biri bo'lib, mintaqaning suv resurslari boshqaruviga jiddiy ta'sir ko'rsatdi. Bugungi kunda Qoraqalpog'iston va Xorazm viloyatlarida 1.2 million gektardan ortiq sug'oriladigan yer mavjud bo'lib, ularning aksariyati eskirgan kanal tizimlari orqali suvga ta'minlanadi." data-en="The Aral Sea disaster is among the last century's most critical ecological catastrophes, heavily influencing regional water governance. Today, Karakalpakstan and Khorezm contain over 1.2 million hectares of irrigated lands served by aging canals." data-ru="Аральская катастрофа — одна из крупнейших экологических трагедий прошлого века, оказавшая глубокое влияние на управление водными ресурсами региона. Сегодня в Каракалпакстане и Хорезме более 1,2 млн га орошаемых земель питаются устаревшими каналами.">Orol dengizi falokati o'tgan asrning eng katta ekologik fojialaridan biri bo'lib, mintaqaning suv resurslari boshqaruviga jiddiy ta'sir ko'rsatdi. Bugungi kunda Qoraqalpog'iston va Xorazm viloyatlarida 1.2 million gektardan ortiq sug'oriladigan yer mavjud bo'lib, ularning aksariyati eskirgan kanal tizimlari orqali suvga ta'minlanadi.</p>
        <p style={{marginBottom: 32, color: 'var(--ink-700)', lineHeight: '1.75'}} data-uz="Mintaqa fermerlari ko'p hollarda suv miqdorini ko'z bilan baholashga to'g'ri keladi, bu esa o'rtacha 35–42% suv yo'qotishlariga olib keladi. Bizning tadqiqotimiz — bu vaziyatni IoT sensorlar va sun'iy yo'ldosh tasvirlari yordamida o'zgartirish mumkinligini ko'rsatadi." data-en="Local farmers often gauge water volumes visually, causing 35–42% average losses. Our study proves IoT sensors and satellite imagery can revolutionize this reality." data-ru="Фермеры часто оценивают объем воды на глаз, что приводит к потерям 35–42%. Наше исследование доказывает эффективность датчиков IoT и спутниковых снимков.">Mintaqa fermerlari ko'p hollarda suv miqdorini ko'z bilan baholashga to'g'ri keladi, bu esa o'rtacha 35–42% suv yo'qotishlariga olib keladi. Bizning tadqiqotimiz — bu vaziyatni IoT sensorlar va sun'iy yo'ldosh tasvirlari yordamida o'zgartirish mumkinligini ko'rsatadi.</p>
        <div className="pull-quote" data-uz="&quot;Pilot loyiha hududida birgina mavsumda suv tejovi 27% ga yetdi va paxta hosildorligi 11% ga ko'tarildi — fermerlar uchun yiliga 1.4 mln so'm qo'shimcha daromad.&quot;" data-en="&quot;Within the pilot site in a single season, water savings hit 27% and cotton yield rose 11% — yielding $120+ additional income per farmer.&quot;" data-ru="&quot;На пилотном участке за один сезон экономия воды достигла 27%, а урожайность хлопка выросла на 11%, принеся дополнительный доход фермерам.&quot;">
          "Pilot loyiha hududida birgina mavsumda suv tejovi 27% ga yetdi va paxta hosildorligi 11% ga ko'tarildi — fermerlar uchun yiliga 1.4 mln so'm qo'shimcha daromad."
        </div>
        <h3 style={{marginBottom: 16}} data-uz="Usul" data-en="Methodology" data-ru="Методология">Usul</h3>
        <p style={{marginBottom: 24, color: 'var(--ink-700)', lineHeight: '1.75'}} data-uz="Tadqiqotda uchta asosiy yondashuv qo'llandi: (1) MODIS va Sentinel-2 sun'iy yo'ldosh tasvirlari asosida ekin namligini real vaqtda kuzatish; (2) 240 ta fermer xo'jaligida o'rnatilgan tuproq namligi va harorat sensorlari; (3) NDVI va evapotranspiratsiya ma'lumotlarini birlashtiruvchi modellashtirish algoritmi." data-en="Three core approaches were utilized: (1) Real-time crop moisture tracking via MODIS & Sentinel-2; (2) Soil moisture and temperature sensors in 240 farms; (3) Algorithmic modeling uniting NDVI and evapotranspiration data." data-ru="Применены три подхода: (1) Мониторинг влажности культур через MODIS и Sentinel-2; (2) Датчики влажности и температуры в 240 хозяйствах; (3) Алгоритмическая модель на основе NDVI и эвапотранспирации.">Tadqiqotda uchta asosiy yondashuv qo'llandi: (1) MODIS va Sentinel-2 sun'iy yo'ldosh tasvirlari asosida ekin namligini real vaqtda kuzatish; (2) 240 ta fermer xo'jaligida o'rnatilgan tuproq namligi va harorat sensorlari; (3) NDVI va evapotranspiratsiya ma'lumotlarini birlashtiruvchi modellashtirish algoritmi.</p>
        <h3 style={{marginBottom: 16}} data-uz="Natijalar" data-en="Results" data-ru="Результаты">Natijalar</h3>
        <p style={{marginBottom: 24, color: 'var(--ink-700)', lineHeight: '1.75'}} data-uz="2024–2025 dala mavsumlarida pilot loyiha 3 200 gektar maydonda olib borildi. O'rtacha suv iste'moli mavjud usulga nisbatan 27.4% ga kamaydi, paxta hosildorligi esa 10.8% ga oshdi. Modelni 12 ta tuproq tipi va 4 ta ekin turi uchun moslashtirish mumkinligi tasdiqlandi." data-en="During the 2024–2025 seasons across 3,200 hectares, water consumption dropped by 27.4% while cotton yield rose 10.8%. Adaptability across 12 soil categories was verified." data-ru="В сезонах 2024–2025 годов на площади 3 200 га водопотребление сократилось на 27,4%, урожайность выросла на 10,8%. Подтверждена адаптивность к 12 типам почв.">2024–2025 dala mavsumlarida pilot loyiha 3 200 gektar maydonda olib borildi. O'rtacha suv iste'moli mavjud usulga nisbatan 27.4% ga kamaydi, paxta hosildorligi esa 10.8% ga oshdi. Modelni 12 ta tuproq tipi va 4 ta ekin turi uchun moslashtirish mumkinligi tasdiqlandi.</p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, margin: '48px 0'}}>
          <div style={{padding: 32, background: 'var(--green-50)', textAlign: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 56, color: 'var(--green-700)', fontWeight: 500}}>27%</div>
            <div style={{fontSize: 13, letterSpacing: '0.06em', color: 'var(--ink-600)', marginTop: 8}} data-uz="Suv tejovi" data-en="Water Savings" data-ru="Экономия воды">Suv tejovi</div>
          </div>
          <div style={{padding: 32, background: 'var(--green-50)', textAlign: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 56, color: 'var(--green-700)', fontWeight: 500}}>+11%</div>
            <div style={{fontSize: 13, letterSpacing: '0.06em', color: 'var(--ink-600)', marginTop: 8}} data-uz="Hosildorlik" data-en="Yield Increase" data-ru="Рост урожая">Hosildorlik</div>
          </div>
          <div style={{padding: 32, background: 'var(--green-50)', textAlign: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 56, color: 'var(--green-700)', fontWeight: 500}}>3 200</div>
            <div style={{fontSize: 13, letterSpacing: '0.06em', color: 'var(--ink-600)', marginTop: 8}} data-uz="Gektar (pilot)" data-en="Hectares (pilot)" data-ru="Гектаров (пилот)">Gektar (pilot)</div>
          </div>
        </div>
        <h3 style={{marginBottom: 16}} data-uz="Xulosa va tavsiyalar" data-en="Conclusion & Recommendations" data-ru="Заключение и рекомендации">Xulosa va tavsiyalar</h3>
        <p style={{marginBottom: 24, color: 'var(--ink-700)', lineHeight: '1.75'}} data-uz="Tadqiqot natijalari shuni ko'rsatadiki, mintaqa miqyosida joriy etiladigan ma'lumotlarga asoslangan sug'orish boshqaruvi tizimi o'rtacha 18–30% suv tejovini ta'minlay oladi. Davlat dasturlari doirasida birinchi navbatda Qoraqalpog'iston shimoliy tumanlari va Buxoro viloyatining sho'rlangan yerlariga e'tibor qaratish tavsiya etiladi." data-en="Results demonstrate that regional smart irrigation systems yield 18–30% water conservation. Prioritizing northern Karakalpakstan and saline lands of Bukhara is strongly urged." data-ru="Результаты доказывают, что региональная система умного орошения способна экономить 18–30% воды. В рамках госпрограмм рекомендовано уделить первостепенное внимание северным районам Каракалпакстана и Бухары.">Tadqiqot natijalari shuni ko'rsatadiki, mintaqa miqyosida joriy etiladigan ma'lumotlarga asoslangan sug'orish boshqaruvi tizimi o'rtacha 18–30% suv tejovini ta'minlay oladi. Davlat dasturlari doirasida birinchi navbatda Qoraqalpog'iston shimoliy tumanlari va Buxoro viloyatining sho'rlangan yerlariga e'tibor qaratish tavsiya etiladi.</p>
        <div style={{marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--ink-200)', display: 'flex', gap: 16, flexWrap: 'wrap'}}>
          <button className="btn btn-primary" data-uz="PDF yuklab olish · 4.2 MB" data-en="Download PDF · 4.2 MB" data-ru="Скачать PDF · 4.2 МБ">PDF yuklab olish · 4.2 MB</button>
          <button className="btn btn-outline" data-uz="BibTeX iqtibos" data-en="BibTeX Citation" data-ru="Цитирование BibTeX">BibTeX iqtibos</button>
          <button className="btn btn-outline" data-uz="Ma'lumotlar to'plami" data-en="Dataset" data-ru="Набор данных">Ma'lumotlar to'plami</button>
        </div>
      </article>
      <aside style={{position: 'sticky', top: 100}}>
        <div style={{padding: 28, background: 'var(--ink-50)', marginBottom: 24}}>
          <div className="eyebrow" style={{marginBottom: 20}} data-uz="Statistika" data-en="Metrics" data-ru="Статистика">Statistika</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18, fontSize: 14}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{color: 'var(--ink-500)'}} data-uz="Iqtiboslar" data-en="Citations" data-ru="Цитирования">Iqtiboslar</span><strong>147</strong></div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{color: 'var(--ink-500)'}} data-uz="Yuklab olishlar" data-en="Downloads" data-ru="Загрузки">Yuklab olishlar</span><strong>2 348</strong></div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{color: 'var(--ink-500)'}} data-uz="Ko'rishlar" data-en="Views" data-ru="Просмотры">Ko'rishlar</span><strong>11 240</strong></div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{color: 'var(--ink-500)'}}>Altmetric</span><strong>32</strong></div>
          </div>
        </div>
        <div style={{padding: 28, background: 'var(--ink-50)'}}>
          <div className="eyebrow" style={{marginBottom: 20}} data-uz="Teglar" data-en="Tags" data-ru="Теги">Teglar</div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
            <span className="tag ink" data-uz="Sug'orish" data-en="Irrigation" data-ru="Орошение">Sug'orish</span>
            <span className="tag ink" data-uz="Suv tejovi" data-en="Water Saving" data-ru="Экономия воды">Suv tejovi</span>
            <span className="tag ink">Sentinel-2</span>
            <span className="tag ink">IoT</span>
            <span className="tag ink" data-uz="Qoraqalpog'iston" data-en="Karakalpakstan" data-ru="Каракалпакстан">Qoraqalpog'iston</span>
            <span className="tag ink" data-uz="Paxta" data-en="Cotton" data-ru="Хлопок">Paxta</span>
            <span className="tag ink" data-uz="Sun'iy yo'ldosh" data-en="Satellite" data-ru="Спутник">Sun'iy yo'ldosh</span>
          </div>
        </div>
      </aside>
    </div>
  </section>
  {/* RELATED */}
  <section className="section bg-ink50">
    <div className="container-wide">
      <div className="section-head-single reveal">
        <div className="eyebrow" style={{marginBottom: 20}} data-uz="Bog'liq nashrlar" data-en="Related Publications" data-ru="Похожие публикации">Bog'liq nashrlar</div>
        <h2><span data-uz="Shu mavzudagi" data-en="Other studies" data-ru="Другие исследования">Shu mavzudagi</span> <em data-uz="boshqa" data-en="on this" data-ru="по этой">boshqa</em> <span data-uz="tadqiqotlar." data-en="topic." data-ru="теме.">tadqiqotlar.</span></h2>
      </div>
      <div className="card-grid reveal-stagger">
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img"><img loading="lazy" decoding="async" src="assets/farm-restructuring.jpg" alt="" /><div className="pub-card-badge" data-uz="Tahlil" data-en="Analysis" data-ru="Анализ">Tahlil</div></div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Suv siyosati" data-en="Water Policy" data-ru="Водная политика">Suv siyosati</span><span className="dot" /><span>2025</span></div>
            <h4 data-uz="Amudaryo havzasida transchegaraviy suv boshqaruvi: 30 yillik tahlil" data-en="Transboundary water governance in the Amu Darya basin: 30-year review" data-ru="Трансграничное управление водными ресурсами в бассейне Амударьи: 30-летний обзор">Amudaryo havzasida transchegaraviy suv boshqaruvi: 30 yillik tahlil</h4>
            <p className="pub-card-excerpt" data-uz="Markaziy Osiyodagi suv resurslarini boshqarish bo'yicha hamkorlik mexanizmlari." data-en="Cooperative frameworks for water resource management in Central Asia." data-ru="Механизмы сотрудничества по управлению водными ресурсами в Центральной Азии.">Markaziy Osiyodagi suv resurslarini boshqarish bo'yicha hamkorlik mexanizmlari.</p>
            <div className="pub-card-foot"><span>K. Akramov</span><span className="arrow">→</span></div>
          </div>
        </a>
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img"><img loading="lazy" decoding="async" src="assets/uzbek-china-lab.jpg" alt="" /><div className="pub-card-badge" data-uz="Texnik" data-en="Technical" data-ru="Технический">Texnik</div></div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Tuproq" data-en="Soil" data-ru="Почва">Tuproq</span><span className="dot" /><span>2025</span></div>
            <h4 data-uz="Sho'rlangan yerlarni qayta tiklash: mikrobiologik yondashuvlar" data-en="Restoring saline soils: microbiological approaches" data-ru="Восстановление засоленных почв: микробиологические подходы">Sho'rlangan yerlarni qayta tiklash: mikrobiologik yondashuvlar</h4>
            <p className="pub-card-excerpt" data-uz="Buxoro va Xorazmda sinovdan o'tkazilgan biofertilizer texnologiyalari." data-en="Biofertilizer technologies tested in Bukhara and Khorezm." data-ru="Технологии биоудобрений, протестированные в Бухаре и Хорезме.">Buxoro va Xorazmda sinovdan o'tkazilgan biofertilizer texnologiyalari.</p>
            <div className="pub-card-foot"><span>S. Yusupova</span><span className="arrow">→</span></div>
          </div>
        </a>
        <a href="publication-detail.html" className="pub-card">
          <div className="pub-card-img"><img loading="lazy" decoding="async" src="assets/central-asia-climate.jpg" alt="" /><div className="pub-card-badge" data-uz="Tadqiqot" data-en="Research" data-ru="Исследование">Tadqiqot</div></div>
          <div className="pub-card-body">
            <div className="pub-card-meta"><span data-uz="Iqlim" data-en="Climate" data-ru="Климат">Iqlim</span><span className="dot" /><span>2024</span></div>
            <h4 data-uz="2050 yilgacha Markaziy Osiyo iqlim stsenariylari va agrar moslashuv" data-en="Central Asia climate scenarios up to 2050 and agricultural adaptation" data-ru="Климатические сценарии Центральной Азии до 2050 года и аграрная адаптация">2050 yilgacha Markaziy Osiyo iqlim stsenariylari va agrar moslashuv</h4>
            <p className="pub-card-excerpt" data-uz="11 davlat uchun mintaqaviy iqlim modellari va agro-meteorologik prognozlar." data-en="Regional climate models and agrometeorological projections across 11 countries." data-ru="Региональные климатические модели и агрометеорологические прогнозы для 11 стран.">11 davlat uchun mintaqaviy iqlim modellari va agro-meteorologik prognozlar.</p>
            <div className="pub-card-foot"><span>R. Boboqulov</span><span className="arrow">→</span></div>
          </div>
        </a>
      </div>
    </div>
  </section>
  <Footer />
</div>
  </Page>;
}
