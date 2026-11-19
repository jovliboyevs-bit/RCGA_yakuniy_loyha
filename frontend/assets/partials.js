// Renders shared <nav> and <footer> for all pages by reading
// data-page (active link) attribute from <body>.

(function() {
  function getStoredUser() {
    try {
      const user = localStorage.getItem('rcga_user');
      return user ? JSON.parse(user) : null;
    } catch (_) { return null; }
  }

  function navHTML(active, darkHero) {
    const user = getStoredUser();
    const roleNorm = user && user.role ? String(user.role).toUpperCase().replace(/\s+/g, '').replace(/_/g, '') : '';
    const isAdmin = roleNorm === 'SUPERADMIN' || roleNorm === 'MODERATOR' || roleNorm === 'CONTENTEDITOR';

    const links = [
      { id: 'home', label_uz: 'Bosh sahifa', label_en: 'Home', label_ru: 'Главная', href: 'index.html' },
      { id: 'about', label_uz: 'RCGA Haqida', label_en: 'About', label_ru: 'О нас', href: 'about.html' },
      { id: 'publications', label_uz: 'Nashrlar', label_en: 'Publications', label_ru: 'Публикации', href: 'publications.html' },
      { id: 'news', label_uz: 'Yangiliklar', label_en: 'News', label_ru: 'Новости', href: 'news.html' },
      { id: 'events', label_uz: 'Tadbirlar', label_en: 'Events', label_ru: 'События', href: 'events.html' },
      { id: 'institutions', label_uz: 'Muassasalar', label_en: 'Institutions', label_ru: 'Учреждения', href: 'institutions.html' },
      { id: 'search', label_uz: 'Qidiruv', label_en: 'Search', label_ru: 'Поиск', href: 'search.html' },
      { id: 'chat', label_uz: 'Chat', label_en: 'Chat', label_ru: 'Чат', href: 'chat.html' },
    ];

    if (isAdmin) {
      links.push({ id: 'admin', label_uz: '👑 Admin Panel', label_en: '👑 Admin Panel', label_ru: '👑 Панель админа', href: 'admin.html' });
    }

    let authBtnHTML = `<a href="login.html" class="btn btn-primary btn-sm" data-uz="Kirish" data-ru="Войти" data-en="Login">Kirish</a>`;
    if (user) {
      authBtnHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 13px; font-weight: 600; color: ${darkHero ? '#fff' : 'var(--ink-900)'};">${user.full_name || user.email} (${user.role})</span>
          <button onclick="localStorage.removeItem('rcga_token'); localStorage.removeItem('rcga_user'); window.location.reload();" class="btn btn-outline btn-sm" style="padding: 6px 12px; font-size: 12px;" data-uz="Chiqish" data-ru="Выход" data-en="Logout">Chiqish</button>
        </div>
      `;
    }

    return `
      <nav class="nav ${darkHero ? 'dark' : ''}">
        <div class="container-wide nav-inner">
          <a href="index.html" class="brand" aria-label="RCGA — Digital Platform">
            <span class="brand-mark">R</span>
            <span class="brand-text">
              <strong>RCGA</strong>
              <span>Digital Platform</span>
            </span>
          </a>
          <ul class="nav-links">
            ${links.map(l => `
              <li><a href="${l.href}" class="${active === l.id ? 'active' : ''}" data-uz="${l.label_uz}" data-en="${l.label_en}" data-ru="${l.label_ru}">${l.label_uz}</a></li>
            `).join('')}
          </ul>
          <div class="nav-right">
            <div class="lang-switch" role="tablist" aria-label="Language">
              <button data-lang="uz" class="active">UZ</button>
              <button data-lang="ru">RU</button>
              <button data-lang="en">EN</button>
            </div>
            ${authBtnHTML}
          </div>
        </div>
      </nav>
    `;
  }

  function footerHTML() {
    return `
      <footer class="footer">
        <div class="container-wide">
          <div class="footer-top">
            <div class="footer-brand">
              <h4>RCGA</h4>
              <p data-uz="Regional Center for Green Agriculture — CAREC mintaqasi bo'ylab yashil qishloq xo'jaligi, iqlimga moslashgan dehqonchilik va raqamli agrosanoat sohasidagi bilim va innovatsiyalar markazi."
                 data-ru="Региональный центр зеленого сельского хозяйства — центр знаний и инноваций в области климатически устойчивого сельского хозяйства в регионе ЦАРИЭС."
                 data-en="Regional Center for Green Agriculture — regional knowledge hub for climate-adaptive agriculture and digital agrarian tech across CAREC countries.">
                Regional Center for Green Agriculture — CAREC mintaqasi bo'ylab yashil qishloq xo'jaligi, iqlimga moslashgan dehqonchilik va raqamli agrosanoat sohasidagi bilim va innovatsiyalar markazi.
              </p>
              <div class="footer-social">
                <a href="#" aria-label="Telegram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 4.5L2.5 12l5 1.5L17 7l-7 8 7 5 4.5-15.5z"/></svg></a>
                <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v16H4zm2-3a2 2 0 110 4 2 2 0 010-4zm5 7h4v2c.6-1 2-2.5 4-2.5 4 0 5 2.5 5 6V20h-4v-5c0-1.5-.5-3-2-3s-2.5 1-2.5 3v5H11V8z"/></svg></a>
                <a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7.5c-.2-1.5-1-2.5-2.5-2.7C17 4.5 12 4.5 12 4.5s-5 0-7.5.3C3 5 2.2 6 2 7.5 1.7 10 1.7 14 2 16.5c.2 1.5 1 2.5 2.5 2.7C7 19.5 12 19.5 12 19.5s5 0 7.5-.3c1.5-.2 2.3-1.2 2.5-2.7.3-2.5.3-6.5 0-9zM10 15V9l5 3-5 3z"/></svg></a>
                <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V7c0-1 1-1 1-1h2V2h-3c-3 0-4 2-4 4v3H8v4h2v9h4v-9h3l1-4h-4z"/></svg></a>
              </div>
            </div>
            <div class="footer-col">
              <h5 data-uz="Platforma" data-ru="Платформа" data-en="Platform">Platforma</h5>
              <ul>
                <li><a href="index.html" data-uz="Bosh sahifa" data-ru="Главная" data-en="Home">Bosh sahifa</a></li>
                <li><a href="publications.html" data-uz="Ilmiy nashrlar" data-ru="Публикации" data-en="Publications">Ilmiy nashrlar</a></li>
                <li><a href="events.html" data-uz="Tadbirlar" data-ru="События" data-en="Events">Tadbirlar</a></li>
                <li><a href="news.html" data-uz="Yangiliklar" data-ru="Новости" data-en="News">Yangiliklar</a></li>
                <li><a href="institutions.html" data-uz="Hamkor muassasalar" data-ru="Учреждения" data-en="Institutions">Hamkor muassasalar</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h5 data-uz="Hamjamiyat" data-ru="Сообщество" data-en="Community">Hamjamiyat</h5>
              <ul>
                <li><a href="about.html" data-uz="RCGA haqida" data-ru="О RCGA" data-en="About RCGA">RCGA haqida</a></li>
                <li><a href="search.html" data-uz="Global qidiruv" data-ru="Глобальный поиск" data-en="Global Search">Global qidiruv</a></li>
                <li><a href="docs" target="_blank" data-uz="API hujjatlar" data-ru="Документация API" data-en="API Docs">API hujjatlar</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h5 data-uz="Hisob" data-ru="Аккаунт" data-en="Account">Hisob</h5>
              <ul>
                <li><a href="login.html" data-uz="Kirish" data-ru="Войти" data-en="Login">Kirish</a></li>
                <li><a href="login.html#register" data-uz="Ro'yxatdan o'tish" data-ru="Регистрация" data-en="Register">Ro'yxatdan o'tish</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <div>© 2026 RCGA Digital Platform. CAREC Regional Initiative.</div>
            <div class="footer-bottom-links">
              <span>CAREC Countries (8)</span>
              <span>UZ · RU · EN</span>
              <span>v1.0</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // Render
  const body = document.body;
  const active = body.dataset.page || '';
  const dark = body.dataset.darkNav === 'true';

  const navMount = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');
  if (navMount) navMount.outerHTML = navHTML(active, dark);
  if (footerMount) footerMount.outerHTML = footerHTML();

  // Load floating chatbot widget on all pages except full-screen chat.html
  if (active !== 'chat') {
    const existingWidget = document.getElementById('rcga-chatbot-script');
    if (!existingWidget) {
      const widgetScript = document.createElement('script');
      widgetScript.id = 'rcga-chatbot-script';
      widgetScript.src = 'assets/chatbot-widget.js';
      document.body.appendChild(widgetScript);
    }
  }
})();
