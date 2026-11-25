import { useRef, useState } from 'react';
import { LanguageMenu } from "./LanguageMenu";
import { signOut } from '../assets/api-client.js';
import { getSession } from './browser-session';

function isEditor() { return ['SUPERADMIN','MODERATOR','CONTENTEDITOR'].includes((getSession()?.user.role || '').toUpperCase().replace(/[\s_]/g,'')); }
function UserMenu({dark}: {dark: boolean}) {
  const user = getSession()?.user;
  if (!user) return <a href="login.html" className="btn btn-primary btn-sm" data-uz="Kirish" data-ru="Войти" data-en="Login">Kirish</a>;
  return <div className="nav-user" style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:13,fontWeight:600,color:dark?'#fff':'var(--ink-900)'}}>{user.full_name || user.email} ({user.role})</span><button className="btn btn-outline btn-sm" onClick={signOut} data-uz="Chiqish" data-en="Logout" data-ru="Выход">Chiqish</button></div>;
}
export function Nav({active, dark}: {active:string;dark:boolean}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return (<nav onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }} onKeyDown={event => {
    if (open && event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
  }} className={dark ? "nav dark" : "nav"}>
  <div className="container-wide nav-inner">
    <a href="index.html" className="brand" aria-label="RCGA — Digital Platform">
      <span className="brand-mark">R</span>
      <span className="brand-text">
        <strong>RCGA</strong>
        <span>Digital Platform</span>
      </span>
    </a>
    <button ref={trigger} type="button" className="nav-toggle" aria-label="Menyu" aria-controls="site-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? "M5 5l14 14M19 5L5 19" : "M3 6h18M3 12h18M3 18h18"} /></svg>
    </button>
    <ul id="site-navigation" className="nav-links" data-open={open} onClick={() => setOpen(false)}>
      <li><a href="index.html" className={active === 'home' ? 'active' : ''} data-uz="Bosh sahifa" data-en="Home" data-ru="Главная">Bosh sahifa</a></li>
      <li><a href="about.html" className={active === 'about' ? 'active' : ''} data-uz="RCGA Haqida" data-en="About" data-ru="О нас">RCGA Haqida</a></li>
      <li><a href="publications.html" className={active === 'publications' ? 'active' : ''} data-uz="Nashrlar" data-en="Publications" data-ru="Публикации">Nashrlar</a></li>
      <li><a href="news.html" className={active === 'news' ? 'active' : ''} data-uz="Yangiliklar" data-en="News" data-ru="Новости">Yangiliklar</a></li>
      <li><a href="events.html" className={active === 'events' ? 'active' : ''} data-uz="Tadbirlar" data-en="Events" data-ru="События">Tadbirlar</a></li>
      <li><a href="institutions.html" className={active === 'institutions' ? 'active' : ''} data-uz="Muassasalar" data-en="Institutions" data-ru="Учреждения">Muassasalar</a></li>
      <li><a href="search.html" className={active === 'search' ? 'active' : ''} data-uz="Qidiruv" data-en="Search" data-ru="Поиск">Qidiruv</a></li>
      <li><a href="chat.html" className={active === 'chat' ? 'active' : ''} data-uz="Chat" data-en="Chat" data-ru="Чат">Chat</a></li>
    {isEditor() && <li><a href="admin.html" className={active === 'admin' ? 'active' : ''}>👑 Admin Panel</a></li>}</ul>
    <div className="nav-right">
      <div className="lang-selector-group">
        <div className="lang-switch" role="tablist" aria-label="Tezkor til tanlash">
          <button data-lang="uz" title="O'zbekcha">UZ</button>
          <button data-lang="ru" title="Русский">RU</button>
          <button data-lang="en" title="English">EN</button>
        </div>
        <LanguageMenu />
      </div>
      <UserMenu dark={dark} />
    </div>
  </div>
</nav>); }
export function Footer() { return (<footer className="footer">
  <div className="container-wide">
    <div className="footer-top">
      <div className="footer-brand">
        <h4>RCGA</h4>
        <p data-uz="Regional Center for Green Agriculture — CAREC mintaqasi bo'ylab yashil qishloq xo'jaligi, iqlimga moslashgan dehqonchilik va raqamli agrosanoat sohasidagi bilim va innovatsiyalar markazi." data-ru="Региональный центр зеленого сельского хозяйства — центр знаний и инноваций в области климатически устойчивого сельского хозяйства в регионе ЦАРИЭС." data-en="Regional Center for Green Agriculture — regional knowledge hub for climate-adaptive agriculture and digital agrarian tech across CAREC countries.">
          Regional Center for Green Agriculture — CAREC mintaqasi bo'ylab yashil qishloq xo'jaligi, iqlimga moslashgan dehqonchilik va raqamli agrosanoat sohasidagi bilim va innovatsiyalar markazi.
        </p>
        <div className="footer-social">
          <a href="#" aria-label="Telegram"><svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 4.5L2.5 12l5 1.5L17 7l-7 8 7 5 4.5-15.5z" /></svg></a>
          <a href="#" aria-label="LinkedIn"><svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v16H4zm2-3a2 2 0 110 4 2 2 0 010-4zm5 7h4v2c.6-1 2-2.5 4-2.5 4 0 5 2.5 5 6V20h-4v-5c0-1.5-.5-3-2-3s-2.5 1-2.5 3v5H11V8z" /></svg></a>
          <a href="#" aria-label="YouTube"><svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M22 7.5c-.2-1.5-1-2.5-2.5-2.7C17 4.5 12 4.5 12 4.5s-5 0-7.5.3C3 5 2.2 6 2 7.5 1.7 10 1.7 14 2 16.5c.2 1.5 1 2.5 2.5 2.7C7 19.5 12 19.5 12 19.5s5 0 7.5-.3c1.5-.2 2.3-1.2 2.5-2.7.3-2.5.3-6.5 0-9zM10 15V9l5 3-5 3z" /></svg></a>
          <a href="#" aria-label="Facebook"><svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V7c0-1 1-1 1-1h2V2h-3c-3 0-4 2-4 4v3H8v4h2v9h4v-9h3l1-4h-4z" /></svg></a>
        </div>
      </div>
      <div className="footer-col">
        <h5 data-uz="Platforma" data-ru="Платформа" data-en="Platform">Platforma</h5>
        <ul>
          <li><a href="index.html" data-uz="Bosh sahifa" data-ru="Главная" data-en="Home">Bosh sahifa</a></li>
          <li><a href="publications.html" data-uz="Ilmiy nashrlar" data-ru="Публикации" data-en="Publications">Ilmiy nashrlar</a></li>
          <li><a href="events.html" data-uz="Tadbirlar" data-ru="События" data-en="Events">Tadbirlar</a></li>
          <li><a href="news.html" data-uz="Yangiliklar" data-ru="Новости" data-en="News">Yangiliklar</a></li>
          <li><a href="institutions.html" data-uz="Hamkor muassasalar" data-ru="Учреждения" data-en="Institutions">Hamkor muassasalar</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5 data-uz="Hamjamiyat" data-ru="Сообщество" data-en="Community">Hamjamiyat</h5>
        <ul>
          <li><a href="about.html" data-uz="RCGA haqida" data-ru="О RCGA" data-en="About RCGA">RCGA haqida</a></li>
          <li><a href="search.html" data-uz="Global qidiruv" data-ru="Глобальный поиск" data-en="Global Search">Global qidiruv</a></li>
          <li><a href="docs" target="_blank" rel="noopener noreferrer" data-uz="API hujjatlar" data-ru="Документация API" data-en="API Docs">API hujjatlar</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5 data-uz="Hisob" data-ru="Аккаунт" data-en="Account">Hisob</h5>
        <ul>
          <li><a href="login.html" data-uz="Kirish" data-ru="Войти" data-en="Login">Kirish</a></li>
          <li><a href="login.html#register" data-uz="Ro'yxatdan o'tish" data-ru="Регистрация" data-en="Register">Ro'yxatdan o'tish</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <div>© 2026 RCGA Digital Platform. CAREC Regional Initiative.</div>
      <div className="footer-bottom-links">
        <span>CAREC Countries (11)</span>
        <span>UZ · RU · EN</span>
        <span>v1.0</span>
      </div>
    </div>
  </div>
</footer>); }

