import { countries } from '../LanguageMenu';
import { Page } from '../Page';
import { Nav, Footer } from '../Layout';

export default function RoutePage() {
  return <Page page="institutions" title="Hamkor muassasalar — RCGA" description="" bodyClass="" dark={false}>
<div>
  <div className="scroll-progress" />
  <Nav active="institutions" dark={false} />
  <section className="page-hero">
    <div className="container-wide">
      <div className="crumbs">
        <a href="index.html" data-uz="Bosh sahifa" data-en="Home" data-ru="Главная">Bosh sahifa</a>
        <span className="sep">/</span>
        <span data-uz="Hamkor muassasalar" data-en="Partner Institutions" data-ru="Партнерские институты">Hamkor muassasalar</span>
      </div>
      <div className="eyebrow" data-uz="86 muassasa · 11 mamlakat · 1 tarmoq" data-en="86 Institutions · 11 Countries · 1 Network" data-ru="86 институтов · 11 стран · 1 сеть">86 muassasa · 11 mamlakat · 1 tarmoq</div>
      <h1><span data-uz="CAREC" data-en="CAREC" data-ru="Сеть институтов">CAREC</span> <em data-uz="tarmog'i" data-en="network" data-ru="ЦАРИЭС">tarmog'i</em>.</h1>
      <p className="lead" data-uz="RCGA platformasi mintaqaning eng yetakchi agrar tadqiqot institutlari, universitetlari va xalqaro tashkilotlarini birlashtiradi." data-en="The RCGA platform brings together leading agricultural research institutes, universities, and international bodies across the region." data-ru="Платформа RCGA объединяет ведущие аграрные научно-исследовательские институты, университеты и международные организации региона.">RCGA platformasi mintaqaning eng yetakchi agrar tadqiqot institutlari, universitetlari va xalqaro tashkilotlarini birlashtiradi.</p>
    </div>
  </section>
  {/* COUNTRY FILTER GRID */}
  <section className="section-tight">
    <div className="container-wide">
      <div className="reveal countries-rail" style={{marginBottom: 16}}>
        {countries.map(([code,,uz,en,ru]) => <a key={code} href="institutions.html" className="country-chip"><span className="country-code">{code}</span><span className="country-name" data-uz={uz} data-en={en} data-ru={ru}>{uz}</span></a>)}
      </div>
    </div>
  </section>
  {/* INSTITUTIONS GRID */}
  <section style={{padding: '60px 0 120px'}}>
    <div className="container-wide">
      <div className="section-head-single reveal" style={{marginBottom: 48}}>
        <div className="eyebrow" style={{marginBottom: 20}} data-uz="O'zbekiston · 14 muassasa" data-en="Uzbekistan · 14 Institutions" data-ru="Узбекистан · 14 институтов">O'zbekiston · 14 muassasa</div>
        <h2 style={{fontSize: 48}}><span data-uz="Yetakchi" data-en="Leading" data-ru="Ведущие">Yetakchi</span> <em data-uz="institutlar" data-en="institutions" data-ru="институты">institutlar</em>.</h2>
      </div>
      <div className="card-grid-2 reveal-stagger">
        <a href="#" className="pub-card" style={{flexDirection: 'row'}}>
          <div style={{width: 180, flexShrink: 0, background: 'var(--green-900)', display: 'grid', placeItems: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 64, color: '#fff'}}>TIIAME</div>
          </div>
          <div className="pub-card-body" style={{padding: 32}}>
            <div className="pub-card-meta"><span data-uz="Universitet" data-en="University" data-ru="Университет">Universitet</span><span className="dot" /><span data-uz="Toshkent" data-en="Tashkent" data-ru="Ташкент">Toshkent</span></div>
            <h4 data-uz="Toshkent irrigatsiya va qishloq xo'jaligini mexanizatsiyalash instituti" data-en="Tashkent Institute of Irrigation and Agricultural Mechanization Engineers" data-ru="Ташкентский институт инженеров ирригации и механизации сельского хозяйства">Toshkent irrigatsiya va qishloq xo'jaligini mexanizatsiyalash instituti</h4>
            <p className="pub-card-excerpt" data-uz="Suv resurslari, sug'orish tizimlari va qishloq xo'jaligi mexanizatsiyasi bo'yicha mintaqada yetakchi ilmiy markaz." data-en="Premier regional center for water resources, irrigation infrastructure, and farm mechanization." data-ru="Ведущий научный центр региона в сфере водных ресурсов, орошения и механизации.">Suv resurslari, sug'orish tizimlari va qishloq xo'jaligi mexanizatsiyasi bo'yicha mintaqada yetakchi ilmiy markaz.</p>
            <div className="pub-card-foot"><span data-uz="1934 yildan beri" data-en="Since 1934" data-ru="С 1934 года">1934 yildan beri</span><span className="arrow">→</span></div>
          </div>
        </a>
        <a href="#" className="pub-card" style={{flexDirection: 'row'}}>
          <div style={{width: 180, flexShrink: 0, background: 'var(--green-700)', display: 'grid', placeItems: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 64, color: '#fff'}}>TDAU</div>
          </div>
          <div className="pub-card-body" style={{padding: 32}}>
            <div className="pub-card-meta"><span data-uz="Universitet" data-en="University" data-ru="Университет">Universitet</span><span className="dot" /><span data-uz="Toshkent" data-en="Tashkent" data-ru="Ташкент">Toshkent</span></div>
            <h4 data-uz="Toshkent davlat agrar universiteti" data-en="Tashkent State Agrarian University" data-ru="Ташкентский государственный аграрный университет">Toshkent davlat agrar universiteti</h4>
            <p className="pub-card-excerpt" data-uz="Agronomiya, chorvachilik, oziq-ovqat texnologiyalari va veterinariya yo'nalishidagi yetakchi ta'lim muassasasi." data-en="Leading academic hub for agronomy, animal science, food processing, and veterinary medicine." data-ru="Крупнейший вуз по агрономии, животноводству, пищевым технологиям и ветеринарии.">Toshkent davlat agrar universiteti</p>
            <div className="pub-card-foot"><span data-uz="12 000 talaba" data-en="12,000 students" data-ru="12 000 студентов">12 000 talaba</span><span className="arrow">→</span></div>
          </div>
        </a>
        <a href="#" className="pub-card" style={{flexDirection: 'row'}}>
          <div style={{width: 180, flexShrink: 0, background: 'var(--ink-800)', display: 'grid', placeItems: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 56, color: '#fff'}}>SAMQXI</div>
          </div>
          <div className="pub-card-body" style={{padding: 32}}>
            <div className="pub-card-meta"><span data-uz="Institut" data-en="Institute" data-ru="Институт">Institut</span><span className="dot" /><span data-uz="Samarqand" data-en="Samarkand" data-ru="Самарканд">Samarqand</span></div>
            <h4 data-uz="Samarqand qishloq xo'jaligi instituti" data-en="Samarkand Agricultural Institute" data-ru="Самаркандский сельскохозяйственный институт">Samarqand qishloq xo'jaligi instituti</h4>
            <p className="pub-card-excerpt" data-uz="Bog'dorchilik, uzumchilik va sabzavotchilik yo'nalishidagi mahsuldorlik tadqiqotlari." data-en="Field productivity research in horticulture, viticulture, and vegetable farming." data-ru="Исследования продуктивности садоводства, виноградарства и овощеводства.">Bog'dorchilik, uzumchilik va sabzavotchilik yo'nalishidagi mahsuldorlik tadqiqotlari.</p>
            <div className="pub-card-foot"><span data-uz="Asoschi: 1929" data-en="Founded: 1929" data-ru="Основан: 1929">Asoschi: 1929</span><span className="arrow">→</span></div>
          </div>
        </a>
        <a href="#" className="pub-card" style={{flexDirection: 'row'}}>
          <div style={{width: 180, flexShrink: 0, background: 'var(--green-800)', display: 'grid', placeItems: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 64, color: '#fff'}}>PSCQI</div>
          </div>
          <div className="pub-card-body" style={{padding: 32}}>
            <div className="pub-card-meta"><span data-uz="Tadqiqot instituti" data-en="Research Institute" data-ru="НИИ">Tadqiqot instituti</span><span className="dot" /><span data-uz="Toshkent" data-en="Tashkent" data-ru="Ташкент">Toshkent</span></div>
            <h4 data-uz="Paxta seleksiyasi va chigit tadqiqot instituti" data-en="Cotton Breeding & Seed Research Institute" data-ru="НИИ селекции и семеноводства хлопчатника">Paxta seleksiyasi va chigit tadqiqot instituti</h4>
            <p className="pub-card-excerpt" data-uz="100+ paxta navlari yaratuvchisi. Mintaqaning eng yirik paxtachilik tadqiqot markazi." data-en="Breeder of 100+ cotton varieties; Central Asia's foremost cotton research laboratory." data-ru="Создатель 100+ сортов хлопка. Крупнейший исследовательский центр хлопководства в регионе.">Paxta seleksiyasi va chigit tadqiqot instituti</p>
            <div className="pub-card-foot"><span data-uz="140+ nav" data-en="140+ varieties" data-ru="140+ сортов">140+ nav</span><span className="arrow">→</span></div>
          </div>
        </a>
        <a href="#" className="pub-card" style={{flexDirection: 'row'}}>
          <div style={{width: 180, flexShrink: 0, background: '#2a5f3a', display: 'grid', placeItems: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 56, color: '#fff'}}>TUTI</div>
          </div>
          <div className="pub-card-body" style={{padding: 32}}>
            <div className="pub-card-meta"><span data-uz="Universitet" data-en="University" data-ru="Университет">Universitet</span><span className="dot" /><span data-uz="Toshkent" data-en="Tashkent" data-ru="Ташкент">Toshkent</span></div>
            <h4 data-uz="Toshkent davlat texnika universiteti — Agrar bo'limi" data-en="Tashkent State Technical University — Agrarian Division" data-ru="Ташкентский государственный технический университет — Аграрный факультет">Toshkent davlat texnika universiteti — Agrar bo'limi</h4>
            <p className="pub-card-excerpt" data-uz="Agro-muhandislik, qishloq xo'jaligi robotlari va smart farming texnologiyalari." data-en="Agri-engineering, agricultural robotics, and precision smart farming systems." data-ru="Агроинженерия, робототехника для сельского хозяйства и технологии точного земледелия.">Agro-muhandislik, qishloq xo'jaligi robotlari va smart farming texnologiyalari.</p>
            <div className="pub-card-foot"><span>AgriTech</span><span className="arrow">→</span></div>
          </div>
        </a>
        <a href="#" className="pub-card" style={{flexDirection: 'row'}}>
          <div style={{width: 180, flexShrink: 0, background: 'var(--gold)', display: 'grid', placeItems: 'center'}}>
            <div style={{fontFamily: 'var(--serif)', fontSize: 56, color: '#fff'}}>UzGIM</div>
          </div>
          <div className="pub-card-body" style={{padding: 32}}>
            <div className="pub-card-meta"><span data-uz="Davlat instituti" data-en="State Agency" data-ru="Госагентство">Davlat instituti</span><span className="dot" /><span data-uz="Toshkent" data-en="Tashkent" data-ru="Ташкент">Toshkent</span></div>
            <h4 data-uz="O'zbekiston Gidrometeorologiya xizmati" data-en="Uzbekistan Hydrometeorological Service" data-ru="Центр гидрометеорологической службы Узбекистана">O'zbekiston Gidrometeorologiya xizmati</h4>
            <p className="pub-card-excerpt" data-uz="Iqlim ma'lumotlari, agro-meteorologik bashoratlar va dala kuzatuv stansiyalari tarmog'i." data-en="Meteorological data, agro-climatic forecasting, and network of ground telemetry stations." data-ru="Климатические данные, агрометеорологические прогнозы и сеть станций мониторинга.">Iqlim ma'lumotlari, agro-meteorologik bashoratlar va dala kuzatuv stansiyalari tarmog'i.</p>
            <div className="pub-card-foot"><span data-uz="340+ stansiya" data-en="340+ stations" data-ru="340+ станций">340+ stansiya</span><span className="arrow">→</span></div>
          </div>
        </a>
      </div>
      <div className="reveal" style={{marginTop: 80, textAlign: 'center'}}>
        <button className="btn btn-outline" data-uz="Yana 8 ta O'zbekiston muassasasi" data-en="8 more institutions from Uzbekistan" data-ru="Еще 8 институтов из Узбекистана">Yana 8 ta O'zbekiston muassasasi</button>
      </div>
    </div>
  </section>
  {/* INTL PARTNERS */}
  <section className="section bg-dark">
    <div className="container-wide">
      <div className="section-head-single reveal">
        <div className="eyebrow" style={{marginBottom: 20, color: 'var(--green-400)'}} data-uz="Xalqaro hamkorlar" data-en="International Partners" data-ru="Международные партнеры">Xalqaro hamkorlar</div>
        <h2 style={{color: '#fff'}}><span data-uz="Global" data-en="Global" data-ru="Глобальная">Global</span> <em data-uz="tarmoq" data-en="network" data-ru="сеть">tarmoq</em>.</h2>
        <p className="lead" style={{marginTop: 20}} data-uz="RCGA xalqaro tashkilotlar va donor agentliklar bilan strategik sheriklikni qo'llab-quvvatlaydi." data-en="RCGA upholds strategic partnerships with international donor agencies and multilateral institutes." data-ru="RCGA поддерживает стратегическое партнерство с международными организациями и агентствами развития.">RCGA xalqaro tashkilotlar va donor agentliklar bilan strategik sheriklikni qo'llab-quvvatlaydi.</p>
      </div>
      <div className="reveal-stagger" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24}}>
        <div style={{padding: '40px 24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 32, color: '#fff'}}>FAO</div>
          <div style={{fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase'}} data-uz="BMT · Oziq-ovqat" data-en="UN · Food & Agri" data-ru="ООН · Продовольствие">BMT · Oziq-ovqat</div>
        </div>
        <div style={{padding: '40px 24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 32, color: '#fff'}}>ICARDA</div>
          <div style={{fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase'}}>CGIAR</div>
        </div>
        <div style={{padding: '40px 24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 32, color: '#fff'}}>GIZ</div>
          <div style={{fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase'}} data-uz="Germaniya" data-en="Germany" data-ru="Германия">Germaniya</div>
        </div>
        <div style={{padding: '40px 24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 32, color: '#fff'}}>CIMMYT</div>
          <div style={{fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase'}} data-uz="Bug'doy markazi" data-en="Wheat Center" data-ru="Центр пшеницы">Bug'doy markazi</div>
        </div>
        <div style={{padding: '40px 24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 32, color: '#fff'}}>USAID</div>
          <div style={{fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase'}}>AQSh donor</div>
        </div>
        <div style={{padding: '40px 24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 32, color: '#fff'}}>ADB</div>
          <div style={{fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase'}}>Osiyo banki</div>
        </div>
        <div style={{padding: '40px 24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 32, color: '#fff'}}>World Bank</div>
          <div style={{fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase'}}>Jahon banki</div>
        </div>
        <div style={{padding: '40px 24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 32, color: '#fff'}}>IFPRI</div>
          <div style={{fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase'}}>Siyosat tahlili</div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</div>
  </Page>;
}
