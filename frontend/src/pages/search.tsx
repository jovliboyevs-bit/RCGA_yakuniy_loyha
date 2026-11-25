import { Page } from '../Page';
import { Nav, Footer } from '../Layout';
import { initPage } from '../behaviors/search.js';

export default function RoutePage() {
  return <Page page="search" title="Qidiruv — RCGA" description="" bodyClass="" dark={false} initialize={initPage}>
<div>
  <div className="scroll-progress" />
  <Nav active="search" dark={false} />
  <section className="page-hero">
    <div className="container-wide">
      <div className="crumbs">
        <a href="index.html" data-uz="Bosh sahifa" data-en="Home" data-ru="Главная">Bosh sahifa</a>
        <span className="sep">/</span>
        <span data-uz="Qidiruv" data-en="Search" data-ru="Поиск">Qidiruv</span>
      </div>
      <div className="eyebrow" data-uz="Global qidiruv · 1 240+ nashr · 200+ tadbir" data-en="Global Search · 1,240+ Publications · 200+ Events" data-ru="Глобальный поиск · 1 240+ публикаций · 200+ событий">Global qidiruv · 1 240+ nashr · 200+ tadbir</div>
      <h1>
        <span data-uz="Mintaqa bo'ylab" data-en="What are you" data-ru="Что вы">Mintaqa bo'ylab</span>{' '}
        <em data-uz="nima" data-en="looking for" data-ru="ищете">nima</em>{' '}
        <span data-uz="qidiryapsiz?" data-en="in the region?" data-ru="в регионе?">qidiryapsiz?</span>
      </h1>
      <p className="lead" data-uz="Nashrlar, tadbirlar, yangiliklar, muassasalar va mualliflar bo'yicha bir vaqtning o'zida qidiring." data-en="Search simultaneously across publications, events, news, institutions, and research authors." data-ru="Ищите одновременно среди публикаций, событий, новостей, институтов и авторов.">Nashrlar, tadbirlar, yangiliklar, muassasalar va mualliflar bo'yicha bir vaqtning o'zida qidiring.</p>
      <div className="search-bar reveal" style={{marginTop: 20, padding: '12px 16px'}}>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={11} cy={11} r={8} /><path d="M21 21l-4.3-4.3" /></svg>
        <input type="search" enterKeyHint="search" data-uz="Masalan: 'paxta hosildorligi', 'tuproq sho'rlanishi', 'Sentinel-2'..." data-en="E.g., 'cotton yield', 'soil salinity', 'Sentinel-2'..." data-ru="Например: 'урожайность хлопка', 'засоление почв', 'Sentinel-2'..." placeholder="Masalan: 'paxta hosildorligi', 'tuproq sho'rlanishi', 'Sentinel-2'..." style={{fontSize: 18}} defaultValue="suv resurslari boshqaruvi" />
        <button className="btn btn-primary" data-uz="Qidirish" data-en="Search" data-ru="Поиск">Qidirish</button>
      </div>
      <div style={{marginTop: 24, fontSize: 13, color: 'var(--ink-500)'}}>
        <span data-uz="Mashhur qidiruvlar:" data-en="Trending searches:" data-ru="Популярные запросы:">Mashhur qidiruvlar:</span>
        <a href="#" style={{color: 'var(--green-700)', margin: '0 6px'}} data-uz="iqlim moslashuvi" data-en="climate adaptation" data-ru="климатическая адаптация">iqlim moslashuvi</a> ·
        <a href="#" style={{color: 'var(--green-700)', margin: '0 6px'}} data-uz="organik o'g'it" data-en="organic fertilizer" data-ru="органические удобрения">organik o'g'it</a> ·
        <a href="#" style={{color: 'var(--green-700)', margin: '0 6px'}} data-uz="bug'doy seleksiyasi" data-en="wheat breeding" data-ru="селекция пшеницы">bug'doy seleksiyasi</a> ·
        <a href="#" style={{color: 'var(--green-700)', margin: '0 6px'}} data-uz="sun'iy yo'ldosh monitoringi" data-en="satellite telemetry" data-ru="спутниковый мониторинг">sun'iy yo'ldosh monitoringi</a>
      </div>
    </div>
  </section>
  {/* RESULTS */}
  <section className="section-sm">
    <div className="container-wide" style={{display: 'grid', gridTemplateColumns: '260px 1fr', gap: 64, alignItems: 'start'}}>
      {/* SIDEBAR FILTERS */}
      <aside style={{position: 'sticky', top: 100}}>
        <div className="eyebrow" style={{marginBottom: 20}} data-uz="Filtrlar" data-en="Filters" data-ru="Фильтры">Filtrlar</div>
        <div style={{padding: '20px 0', borderBottom: '1px solid var(--ink-200)'}}>
          <h5 style={{fontFamily: 'var(--sans)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-700)', marginBottom: 14, fontWeight: 700}} data-uz="Kontent turi" data-en="Content Type" data-ru="Тип контента">Kontent turi</h5>
          <div style={{display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14}}>
            <label style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}}><input type="checkbox" defaultChecked style={{accentColor: 'var(--green-700)'}} /> <span data-uz="Nashrlar" data-en="Publications" data-ru="Публикации">Nashrlar</span> <span style={{color: 'var(--ink-400)', marginLeft: 'auto'}}>147</span></label>
            <label style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}}><input type="checkbox" defaultChecked style={{accentColor: 'var(--green-700)'}} /> <span data-uz="Tadbirlar" data-en="Events" data-ru="События">Tadbirlar</span> <span style={{color: 'var(--ink-400)', marginLeft: 'auto'}}>28</span></label>
            <label style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}}><input type="checkbox" defaultChecked style={{accentColor: 'var(--green-700)'}} /> <span data-uz="Yangiliklar" data-en="News" data-ru="Новости">Yangiliklar</span> <span style={{color: 'var(--ink-400)', marginLeft: 'auto'}}>42</span></label>
            <label style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}}><input type="checkbox" style={{accentColor: 'var(--green-700)'}} /> <span data-uz="Muassasalar" data-en="Institutions" data-ru="Институты">Muassasalar</span> <span style={{color: 'var(--ink-400)', marginLeft: 'auto'}}>12</span></label>
            <label style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}}><input type="checkbox" style={{accentColor: 'var(--green-700)'}} /> <span data-uz="Mualliflar" data-en="Authors" data-ru="Авторы">Mualliflar</span> <span style={{color: 'var(--ink-400)', marginLeft: 'auto'}}>31</span></label>
          </div>
        </div>
        <div style={{padding: '20px 0', borderBottom: '1px solid var(--ink-200)'}}>
          <h5 style={{fontFamily: 'var(--sans)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-700)', marginBottom: 14, fontWeight: 700}} data-uz="Mavzu" data-en="Topic" data-ru="Тема">Mavzu</h5>
          <div style={{display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14}}>
            <label style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}}><input type="checkbox" defaultChecked style={{accentColor: 'var(--green-700)'}} /> <span data-uz="Iqlim va suv" data-en="Climate & Water" data-ru="Климат и вода">Iqlim va suv</span></label>
            <label style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}}><input type="checkbox" style={{accentColor: 'var(--green-700)'}} /> <span data-uz="Tuproq va o'g'it" data-en="Soil & Fertilizer" data-ru="Почва и удобрения">Tuproq va o'g'it</span></label>
            <label style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}}><input type="checkbox" style={{accentColor: 'var(--green-700)'}} /> <span data-uz="Seleksiya" data-en="Plant Breeding" data-ru="Селекция">Seleksiya</span></label>
            <label style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}}><input type="checkbox" style={{accentColor: 'var(--green-700)'}} /> <span data-uz="Raqamli agrosanoat" data-en="Digital Agri" data-ru="Цифровой агробизнес">Raqamli agrosanoat</span></label>
            <label style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}}><input type="checkbox" style={{accentColor: 'var(--green-700)'}} /> <span data-uz="Siyosat tahlili" data-en="Policy Analysis" data-ru="Анализ политики">Siyosat tahlili</span></label>
          </div>
        </div>
        <div style={{padding: '20px 0', borderBottom: '1px solid var(--ink-200)'}}>
          <h5 style={{fontFamily: 'var(--sans)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-700)', marginBottom: 14, fontWeight: 700}} data-uz="Mamlakat" data-en="Country" data-ru="Страна">Mamlakat</h5>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
            <button className="filter-chip" style={{padding: '6px 12px', fontSize: 12}}>UZ</button>
            <button className="filter-chip" style={{padding: '6px 12px', fontSize: 12}}>KZ</button>
            <button className="filter-chip" style={{padding: '6px 12px', fontSize: 12}}>KG</button>
            <button className="filter-chip" style={{padding: '6px 12px', fontSize: 12}}>TJ</button>
            <button className="filter-chip" style={{padding: '6px 12px', fontSize: 12}}>TM</button>
            <button className="filter-chip" style={{padding: '6px 12px', fontSize: 12}}>AF</button>
            <button className="filter-chip" style={{padding: '6px 12px', fontSize: 12}}>AZ</button>
            <button className="filter-chip" style={{padding: '6px 12px', fontSize: 12}}>MN</button>
          </div>
        </div>
        <div style={{padding: '20px 0'}}>
          <h5 style={{fontFamily: 'var(--sans)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-700)', marginBottom: 14, fontWeight: 700}} data-uz="Yil" data-en="Year" data-ru="Год">Yil</h5>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 14}}>
            <input type="number" defaultValue={2020} style={{width: 80, padding: '8px 10px', border: '1px solid var(--ink-200)', fontFamily: 'inherit'}} />
            <span style={{color: 'var(--ink-500)'}}>—</span>
            <input type="number" defaultValue={2026} style={{width: 80, padding: '8px 10px', border: '1px solid var(--ink-200)', fontFamily: 'inherit'}} />
          </div>
        </div>
        <button className="btn btn-outline btn-sm" style={{width: '100%', marginTop: 12}} data-uz="Tozalash" data-en="Clear filters" data-ru="Очистить">Tozalash</button>
      </aside>
      {/* RESULTS LIST */}
      <main>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingBottom: 24, borderBottom: '1px solid var(--ink-200)', marginBottom: 32}}>
          <div>
            <strong style={{fontSize: 17}} data-uz="217 natija" data-en="217 results" data-ru="217 результатов">217 natija</strong>
            <span style={{color: 'var(--ink-500)', fontSize: 14, marginLeft: 12}}>
              <span data-uz="&quot;suv resurslari boshqaruvi&quot; uchun" data-en="for &quot;water resources management&quot;" data-ru="по запросу &quot;управление водными ресурсами&quot;">"suv resurslari boshqaruvi" uchun</span>
            </span>
          </div>
          <select style={{padding: '10px 16px', border: '1px solid var(--ink-200)', fontFamily: 'inherit', fontSize: 14}} defaultValue="">
            <option data-uz="Eng dolzarb" data-en="Most relevant" data-ru="По актуальности">Eng dolzarb</option>
            <option data-uz="Yangi → eski" data-en="Newest first" data-ru="Сначала новые">Yangi → eski</option>
            <option data-uz="Eski → yangi" data-en="Oldest first" data-ru="Сначала старые">Eski → yangi</option>
            <option data-uz="Eng ko'p iqtibos qilingan" data-en="Most cited" data-ru="По цитируемости">Eng ko'p iqtibos qilingan</option>
          </select>
        </div>
        <div className="reveal-stagger" style={{display: 'flex', flexDirection: 'column', gap: 24}}>
          <a href="publication-detail.html" style={{display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, padding: 24, border: '1px solid var(--ink-200)', transition: 'all 0.3s', alignItems: 'center'}} data-mouseover="h0" data-mouseout="h1">
            <img loading="lazy" decoding="async" className="editorial-photo" src="assets/aral-sea-conservation.jpg" alt="" style={{aspectRatio: '4/3', objectFit: 'cover', width: '100%'}} />
            <div>
              <div className="pub-card-meta" style={{marginBottom: 10}}><span style={{color: 'var(--green-700)', fontWeight: 700}} data-uz="NASHR" data-en="PUBLICATION" data-ru="ПУБЛИКАЦИЯ">NASHR</span><span className="dot" /><span>2026</span><span className="dot" /><span>UZ</span></div>
              <h4 data-uz="Orol dengizi havzasida barqaror sug'orish tizimlari uchun ma'lumotlarga asoslangan qaror qabul qilish" data-en="Data-driven decisions for sustainable irrigation systems in the Aral Sea basin" data-ru="Принятие решений на основе данных для устойчивых систем орошения в бассейне Аральского моря">Orol dengizi havzasida barqaror sug'orish tizimlari uchun ma'lumotlarga asoslangan qaror qabul qilish</h4>
              <p style={{color: 'var(--ink-600)', fontSize: 14, lineHeight: '1.6', marginTop: 10}}>...mintaqa <strong style={{background: 'var(--green-50)', padding: '0 4px'}}>suv resurslari boshqaruvi</strong> uchun yangi modelni taklif etadi. Sun'iy yo'ldosh ma'lumotlari va IoT...</p>
              <div style={{display: 'flex', gap: 12, marginTop: 14, fontSize: 12, color: 'var(--ink-500)'}}>
                <span>D. Egamberdiyeva</span><span>·</span><span data-uz="147 iqtibos" data-en="147 citations" data-ru="147 цитирований">147 iqtibos</span><span>·</span><span data-uz="2 348 yuklab olish" data-en="2,348 downloads" data-ru="2 348 скачиваний">2 348 yuklab olish</span>
              </div>
            </div>
          </a>
          <a href="#" style={{display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, padding: 24, border: '1px solid var(--ink-200)', transition: 'all 0.3s', alignItems: 'center'}} data-mouseover="h2" data-mouseout="h3">
            <img loading="lazy" decoding="async" className="editorial-photo" src="assets/farm-restructuring.jpg" alt="" style={{aspectRatio: '4/3', objectFit: 'cover', width: '100%'}} />
            <div>
              <div className="pub-card-meta" style={{marginBottom: 10}}><span style={{color: 'var(--green-700)', fontWeight: 700}} data-uz="NASHR" data-en="PUBLICATION" data-ru="ПУБЛИКАЦИЯ">NASHR</span><span className="dot" /><span>2025</span><span className="dot" /><span>KZ · UZ</span></div>
              <h4 data-uz="Amudaryo havzasida transchegaraviy suv boshqaruvi: 30 yillik tahlil" data-en="Transboundary water governance in the Amu Darya basin: a 30-year assessment" data-ru="Трансграничное управление водными ресурсами в бассейне Амударьи: 30-летний обзор">Amudaryo havzasida transchegaraviy suv boshqaruvi: 30 yillik tahlil</h4>
              <p style={{color: 'var(--ink-600)', fontSize: 14, lineHeight: '1.6', marginTop: 10}}>...mintaqaviy <strong style={{background: 'var(--green-50)', padding: '0 4px'}}>suv resurslari boshqaruvi</strong> bo'yicha 1995–2025 yillar oralig'idagi siyosat...</p>
              <div style={{display: 'flex', gap: 12, marginTop: 14, fontSize: 12, color: 'var(--ink-500)'}}>
                <span>K. Akramov</span><span>·</span><span data-uz="89 iqtibos" data-en="89 citations" data-ru="89 цитирований">89 iqtibos</span>
              </div>
            </div>
          </a>
          <a href="#" style={{display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, padding: 24, border: '1px solid var(--ink-200)', transition: 'all 0.3s', alignItems: 'center'}} data-mouseover="h4" data-mouseout="h5">
            <img loading="lazy" decoding="async" className="editorial-photo" src="assets/young-scientist-school.jpg" alt="" style={{aspectRatio: '4/3', objectFit: 'cover', width: '100%'}} />
            <div>
              <div className="pub-card-meta" style={{marginBottom: 10}}><span style={{color: 'var(--gold)', fontWeight: 700}} data-uz="TADBIR" data-en="EVENT" data-ru="СОБЫТИЕ">TADBIR</span><span className="dot" /><span>14 Avg 2026</span><span className="dot" /><span>Bishkek</span></div>
              <h4 data-uz="Yosh tadqiqotchilar maktabi — iqlim moslashuvi va suv resurslari boshqaruvi" data-en="Young Researchers School — climate adaptation and water management" data-ru="Школа молодых исследователей — климатическая адаптация и водные ресурсы">Yosh tadqiqotchilar maktabi — iqlim moslashuvi va suv resurslari boshqaruvi</h4>
              <p style={{color: 'var(--ink-600)', fontSize: 14, lineHeight: '1.6', marginTop: 10}}>PhD darajasidagi 64 nafar tadqiqotchi uchun 5 kunlik intensiv ilmiy maktab. <strong style={{background: 'var(--green-50)', padding: '0 4px'}}>Suv resurslari</strong>...</p>
              <div style={{display: 'flex', gap: 12, marginTop: 14, fontSize: 12, color: 'var(--ink-500)'}}>
                <span>RCGA · CAWa Project</span><span>·</span><span data-uz="Trening" data-en="Training" data-ru="Тренинг">Trening</span>
              </div>
            </div>
          </a>
          <a href="#" style={{display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, padding: 24, border: '1px solid var(--ink-200)', transition: 'all 0.3s', alignItems: 'center'}} data-mouseover="h6" data-mouseout="h7">
            <img loading="lazy" decoding="async" className="editorial-photo" src="assets/uzbek-china-lab.jpg" alt="" style={{aspectRatio: '4/3', objectFit: 'cover', width: '100%'}} />
            <div>
              <div className="pub-card-meta" style={{marginBottom: 10}}><span style={{color: 'var(--green-700)', fontWeight: 700}} data-uz="YANGILIK" data-en="NEWS" data-ru="НОВОСТЬ">YANGILIK</span><span className="dot" /><span>5 Iyun 2026</span></div>
              <h4 data-uz="Toshkentda yangi O'zbek-Xitoy qo'shma laboratoriyasi ochildi" data-en="New Uzbek-Chinese Joint Laboratory launched in Tashkent" data-ru="В Ташкенте открылась новая узбекско-китайская совместная лаборатория">Toshkentda yangi O'zbek-Xitoy qo'shma laboratoriyasi ochildi</h4>
              <p style={{color: 'var(--ink-600)', fontSize: 14, lineHeight: '1.6', marginTop: 10}}>Yangi markaz tuproq, o'g'it va <strong style={{background: 'var(--green-50)', padding: '0 4px'}}>suv resurslari</strong> bo'yicha integratsiyalashgan tadqiqotlar olib boradi...</p>
              <div style={{display: 'flex', gap: 12, marginTop: 14, fontSize: 12, color: 'var(--ink-500)'}}>
                <span>Yuz.uz</span><span>·</span><span data-uz="3 min o'qish" data-en="3 min read" data-ru="3 мин чтения">3 min o'qish</span>
              </div>
            </div>
          </a>
          <a href="#" style={{display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, padding: 24, border: '1px solid var(--ink-200)', transition: 'all 0.3s', alignItems: 'center'}} data-mouseover="h8" data-mouseout="h9">
            <img loading="lazy" decoding="async" className="editorial-photo" src="assets/central-asia-climate.jpg" alt="" style={{aspectRatio: '4/3', objectFit: 'cover', width: '100%'}} />
            <div>
              <div className="pub-card-meta" style={{marginBottom: 10}}><span style={{color: 'var(--green-700)', fontWeight: 700}} data-uz="NASHR" data-en="PUBLICATION" data-ru="ПУБЛИКАЦИЯ">NASHR</span><span className="dot" /><span>2024</span><span className="dot" /><span data-uz="11 davlat" data-en="11 countries" data-ru="11 стран">11 davlat</span></div>
              <h4 data-uz="2050 yilgacha Markaziy Osiyo iqlim stsenariylari va agrar moslashuv" data-en="Central Asia climate scenarios through 2050 and agrarian adaptation" data-ru="Климатические сценарии Центральной Азии до 2050 года и аграрная адаптация">2050 yilgacha Markaziy Osiyo iqlim stsenariylari va agrar moslashuv</h4>
              <p style={{color: 'var(--ink-600)', fontSize: 14, lineHeight: '1.6', marginTop: 10}}>Mintaqaviy iqlim modellari, suv balansi va <strong style={{background: 'var(--green-50)', padding: '0 4px'}}>resurslar boshqaruvi</strong> bo'yicha to'liq tahlil...</p>
              <div style={{display: 'flex', gap: 12, marginTop: 14, fontSize: 12, color: 'var(--ink-500)'}}>
                <span>R. Boboqulov, A. Nazarov</span><span>·</span><span data-uz="203 iqtibos" data-en="203 citations" data-ru="203 цитирования">203 iqtibos</span>
              </div>
            </div>
          </a>
        </div>
        <div style={{marginTop: 48, display: 'flex', justifyContent: 'center', gap: 8}}>
          <button className="filter-chip" style={{background: 'var(--green-700)', color: '#fff', borderColor: 'var(--green-700)'}}>1</button>
          <button className="filter-chip">2</button>
          <button className="filter-chip">3</button>
          <button className="filter-chip">4</button>
          <span style={{padding: 10}}>...</span>
          <button className="filter-chip">22</button>
        </div>
      </main>
    </div>
  </section>
  <Footer />
</div>
  </Page>;
}
