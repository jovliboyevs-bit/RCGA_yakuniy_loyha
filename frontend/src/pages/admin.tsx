import { LanguageMenu } from "../LanguageMenu";
import { Page } from '../Page';
import { Nav, Footer } from '../Layout';
import { initPage } from '../behaviors/admin.js';
import './admin.css';

export default function RoutePage() {
  return <Page page="admin" title="RCGA" description="" bodyClass="" dark={false} initialize={initPage}>
<div>
  <header className="admin-header">
    <div className="container-wide admin-header-inner">
      <a href="index.html" className="brand" style={{color: '#fff'}}>
        <span className="brand-mark">R</span>
        <span className="brand-text">
          <strong>RCGA ADMIN</strong>
          <span style={{color: 'rgba(255,255,255,0.7)'}} data-uz="Boshqaruv Markazi" data-en="Control Center" data-ru="Центр управления">Boshqaruv Markazi</span>
        </span>
      </a>
      <div style={{display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap'}}>
        {/* LANGUAGE SWITCHER */}
        <div className="lang-selector-group">
          <div className="lang-switch" role="tablist" aria-label="Language">
            <button data-lang="uz" className="active">UZ</button>
            <button data-lang="ru">RU</button>
            <button data-lang="en">EN</button>
          </div>
          <LanguageMenu />
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <span id="user-display" style={{fontSize: 13, fontWeight: 600, background: 'rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: 999}}>Admin</span>
          <a href="index.html" className="btn btn-outline btn-sm" style={{color: '#fff', borderColor: 'rgba(255,255,255,0.3)'}} data-uz="Saytga qaytish" data-en="Return to site" data-ru="На сайт">Saytga qaytish</a>
          <button data-click="h1" className="btn btn-outline btn-sm" style={{color: '#fca5a5', borderColor: 'rgba(252,165,165,0.4)'}} data-uz="Chiqish" data-en="Logout" data-ru="Выйти">Chiqish</button>
        </div>
      </div>
    </div>
  </header>
  <main className="container-wide">
    <div className="admin-grid">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <ul className="admin-menu">
          <li><button className="active" data-click="h2" data-tab="dashboard"><span>📊 <span data-uz="Boshqaruv Paneli" data-en="Dashboard" data-ru="Панель управления">Boshqaruv Paneli</span></span></button></li>
          <li><button data-click="h3" data-tab="publications"><span>📚 <span data-uz="Ilmiy Nashrlar" data-en="Publications" data-ru="Публикации">Ilmiy Nashrlar</span></span></button></li>
          <li><button data-click="h4" data-tab="news"><span>📰 <span data-uz="Yangiliklar" data-en="News" data-ru="Новости">Yangiliklar</span></span></button></li>
          <li><button data-click="h5" data-tab="events"><span>📅 <span data-uz="Tadbirlar" data-en="Events" data-ru="События">Tadbirlar</span></span></button></li>
          <li><button data-click="h6" data-tab="users" id="menu-users"><span>👥 <span data-uz="Foydalanuvchilar" data-en="Users & Roles" data-ru="Пользователи и роли">Foydalanuvchilar</span></span> <span className="role-tag">Super Admin</span></button></li>
          <li><button data-click="h7" data-tab="upload"><span>📁 <span data-uz="Fayl Yuklash (PDF)" data-en="File Upload (PDF)" data-ru="Загрузка файлов (PDF)">Fayl Yuklash (PDF)</span></span></button></li>
        </ul>
      </aside>
      {/* MAIN CONTENT AREA */}
      <section>
        {/* STATS OVERVIEW */}
        <div className="stats-row">
          <div className="stat-card">
            <h4 data-uz="Foydalanuvchilar" data-en="Users" data-ru="Пользователи">Foydalanuvchilar</h4>
            <div className="num" id="stat-users">...</div>
          </div>
          <div className="stat-card">
            <h4 data-uz="Ilmiy Nashrlar" data-en="Publications" data-ru="Публикации">Ilmiy Nashrlar</h4>
            <div className="num" id="stat-pubs">...</div>
          </div>
          <div className="stat-card">
            <h4 data-uz="Yangiliklar" data-en="News" data-ru="Новости">Yangiliklar</h4>
            <div className="num" id="stat-news">...</div>
          </div>
          <div className="stat-card">
            <h4 data-uz="Tadbirlar" data-en="Events" data-ru="События">Tadbirlar</h4>
            <div className="num" id="stat-events">...</div>
          </div>
        </div>
        {/* TAB: DASHBOARD */}
        <div id="tab-dashboard" className="tab-content admin-card">
          <div id="role-banner" className="role-notice super" />
          <h2 style={{fontSize: 28, marginBottom: 12}}><span data-uz="Xush kelibsiz," data-en="Welcome," data-ru="Добро пожаловать,">Xush kelibsiz,</span> <span id="dash-user-name">Admin</span>!</h2>
          <p style={{color: 'var(--ink-600)', marginBottom: 24}} data-uz="RCGA Digital Platform ma'lumotlar bazasi va kontentlarini boshqarish markazi. Texnik topshiriq (TZ V bob) asosida Super Admin to'liq tizim va foydalanuvchilar rollarini boshqarish huquqiga ega, Content Editor esa materiallarni chop etadi va tahrirlaydi." data-en="RCGA Digital Platform content and database control center. According to Technical Assignment (TZ Chapter V), Super Admin has full system and user management access, while Content Editor manages and publishes materials." data-ru="Центр управления контентом и базой данных платформы RCGA. Согласно техзаданию (ТЗ Глава V), Супер Админ обладает полным доступом и правами управления пользователями, а Редактор контента публикует и редактирует материалы.">RCGA Digital Platform ma'lumotlar bazasi va kontentlarini boshqarish markazi. Texnik topshiriq (TZ V bob) asosida Super Admin to'liq tizim va foydalanuvchilar rollarini boshqarish huquqiga ega, Content Editor esa materiallarni chop etadi va tahrirlaydi.</p>
          <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
            <button className="btn btn-primary" data-click="h8" data-tab="upload" data-uz="Yangi Fayl (PDF) Yuklash" data-en="Upload New File (PDF)" data-ru="Загрузить новый файл (PDF)">Yangi Fayl (PDF) Yuklash</button>
            <button className="btn btn-outline" data-click="h9" data-tab="publications" data-uz="Nashrlarni Boshqarish" data-en="Manage Publications" data-ru="Управление публикациями">Nashrlarni Boshqarish</button>
            <button className="btn btn-outline" id="dash-users-btn" data-click="h10" data-tab="users" data-uz="Foydalanuvchilarni Boshqarish" data-en="Manage Users" data-ru="Управление пользователями">Foydalanuvchilarni Boshqarish</button>
          </div>
        </div>
        {/* TAB: PUBLICATIONS MANAGEMENT */}
        <div id="tab-publications" className="tab-content admin-card" style={{display: 'none'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12}}>
            <h3 style={{fontSize: 24}} data-uz="Ilmiy Nashrlar Boshqaruvi" data-en="Publications Management" data-ru="Управление публикациями">Ilmiy Nashrlar Boshqaruvi</h3>
            <button className="btn btn-primary btn-sm" data-click="h11" data-uz="+ Yangi Nashr Qo'shish" data-en="+ Add New Publication" data-ru="+ Добавить публикацию">+ Yangi Nashr Qo'shish</button>
          </div>
          {/* NEW PUB FORM */}
          <form id="pub-form" style={{display: 'none', background: 'var(--ink-50)', padding: 24, borderRadius: 8, marginBottom: 24}} data-submit="h12">
            <h4 style={{marginBottom: 16}} data-uz="Yangi Ilmiy Nashr Ma'lumotlari" data-en="New Publication Details" data-ru="Данные новой публикации">Yangi Ilmiy Nashr Ma'lumotlari</h4>
            <div className="field"><label data-uz="Sarlavha (UZ)" data-en="Title (UZ)" data-ru="Заголовок (UZ)">Sarlavha (UZ)</label><input type="text" id="pub-title" required placeholder="Sho'rlangan tuproqlarni tiklash" /></div>
            <div className="field-row">
              <div className="field"><label data-uz="Mualliflar" data-en="Authors" data-ru="Авторы">Mualliflar</label><input type="text" id="pub-authors" required placeholder="Prof. D. Egamberdiyeva" /></div>
              <div className="field"><label data-uz="Kategoriya" data-en="Category" data-ru="Категория">Kategoriya</label><select id="pub-cat" defaultValue=""><option>Iqlim</option><option>Tuproq</option><option>Suv</option><option>Agro-biotexnologiya</option><option>Siyosat</option><option>Raqamli agrotex</option></select></div>
            </div>
            <div className="field-row">
              <div className="field"><label data-uz="DOI Kodu" data-en="DOI Code" data-ru="Код DOI">DOI Kodu</label><input type="text" id="pub-doi" placeholder="10.1016/j.agwat.2026..." /></div>
              <div className="field"><label data-uz="Fayl URL (PDF)" data-en="File URL (PDF)" data-ru="URL файла (PDF)">Fayl URL (PDF)</label><input type="text" id="pub-file" placeholder="/uploads/document.pdf" /></div>
            </div>
            <div className="field"><label data-uz="Qisqacha Annotatsiya" data-en="Abstract" data-ru="Аннотация">Qisqacha Annotatsiya</label><textarea id="pub-abstract" rows={3} placeholder="Tadqiqot mazmuni..." defaultValue={""} /></div>
            <button type="submit" className="btn btn-primary" style={{marginTop: 12}} data-uz="Saqlash va Chop Etish" data-en="Save and Publish" data-ru="Сохранить и опубликовать">Saqlash va Chop Etish</button>
          </form>
          <div className="table-scroll"><table className="data-table">
            <thead><tr><th>ID</th><th data-uz="Sarlavha" data-en="Title" data-ru="Заголовок">Sarlavha</th><th data-uz="Kategoriya" data-en="Category" data-ru="Категория">Kategoriya</th><th data-uz="Mualliflar" data-en="Authors" data-ru="Авторы">Mualliflar</th><th data-uz="Yuklanmalar" data-en="Downloads" data-ru="Загрузок">Yuklanmalar</th><th data-uz="Amallar" data-en="Actions" data-ru="Действия">Amallar</th></tr></thead>
            <tbody id="pub-list-tbody"><tr><td colSpan={6}>Yuklanmoqda...</td></tr></tbody>
          </table></div>
        </div>
        {/* TAB: NEWS MANAGEMENT */}
        <div id="tab-news" className="tab-content admin-card" style={{display: 'none'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12}}>
            <h3 style={{fontSize: 24}} data-uz="Yangiliklar Boshqaruvi" data-en="News Management" data-ru="Управление новостями">Yangiliklar Boshqaruvi</h3>
            <button className="btn btn-primary btn-sm" data-click="h13" data-uz="+ Yangi Yangilik Qo'shish" data-en="+ Add News" data-ru="+ Добавить новость">+ Yangi Yangilik Qo'shish</button>
          </div>
          <form id="news-form" style={{display: 'none', background: 'var(--ink-50)', padding: 24, borderRadius: 8, marginBottom: 24}} data-submit="h14">
            <h4 style={{marginBottom: 16}} data-uz="Yangi Yangilik" data-en="New Announcement" data-ru="Новая новость">Yangi Yangilik</h4>
            <div className="field"><label data-uz="Sarlavha" data-en="Title" data-ru="Заголовок">Sarlavha</label><input type="text" id="news-title" required placeholder="Yangilik sarlavhasi" /></div>
            <div className="field-row">
              <div className="field"><label data-uz="Kategoriya" data-en="Category" data-ru="Категория">Kategoriya</label><select id="news-cat" defaultValue=""><option>Mintaqaviy</option><option>Texnologiya</option><option>Iqlim</option><option>Innovatsiya</option></select></div>
              <div className="field"><label data-uz="Rasm URL" data-en="Image URL" data-ru="URL изображения">Rasm URL</label><input type="text" id="news-img" placeholder="assets/aral-sea-conservation.jpg" /></div>
            </div>
            <div className="field"><label data-uz="Qisqacha mazmuni" data-en="Excerpt" data-ru="Краткий анонс">Qisqacha mazmuni</label><textarea id="news-excerpt" rows={2} placeholder="Qisqacha anons..." defaultValue={""} /></div>
            <div className="field"><label data-uz="To'liq Matn" data-en="Full Content" data-ru="Полный текст">To'liq Matn</label><textarea id="news-content" rows={4} required placeholder="Yangilik matni..." defaultValue={""} /></div>
            <button type="submit" className="btn btn-primary" style={{marginTop: 12}} data-uz="Chop etish" data-en="Publish" data-ru="Опубликовать">Chop etish</button>
          </form>
          <div className="table-scroll"><table className="data-table">
            <thead><tr><th>ID</th><th data-uz="Sarlavha" data-en="Title" data-ru="Заголовок">Sarlavha</th><th data-uz="Kategoriya" data-en="Category" data-ru="Категория">Kategoriya</th><th data-uz="Muallif" data-en="Author" data-ru="Автор">Muallif</th><th data-uz="Amallar" data-en="Actions" data-ru="Действия">Amallar</th></tr></thead>
            <tbody id="news-list-tbody"><tr><td colSpan={5}>Yuklanmoqda...</td></tr></tbody>
          </table></div>
        </div>
        {/* TAB: EVENTS MANAGEMENT */}
        <div id="tab-events" className="tab-content admin-card" style={{display: 'none'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12}}>
            <h3 style={{fontSize: 24}} data-uz="Tadbirlar Boshqaruvi" data-en="Events Management" data-ru="Управление событиями">Tadbirlar Boshqaruvi</h3>
            <button className="btn btn-primary btn-sm" data-click="h15" data-uz="+ Yangi Tadbir Qo'shish" data-en="+ Add Event" data-ru="+ Добавить мероприятие">+ Yangi Tadbir Qo'shish</button>
          </div>
          <form id="event-form" style={{display: 'none', background: 'var(--ink-50)', padding: 24, borderRadius: 8, marginBottom: 24}} data-submit="h16">
            <h4 style={{marginBottom: 16}} data-uz="Yangi Tadbir Qo'shish" data-en="Add New Event" data-ru="Добавить мероприятие">Yangi Tadbir Qo'shish</h4>
            <div className="field"><label data-uz="Tadbir Nomi" data-en="Event Title" data-ru="Название события">Tadbir Nomi</label><input type="text" id="ev-title" required placeholder="CAREC Yashil Agrar Forumi 2026" /></div>
            <div className="field-row">
              <div className="field"><label data-uz="Boshlanish Sanasi" data-en="Start Date" data-ru="Дата начала">Boshlanish Sanasi</label><input type="date" id="ev-start" required /></div>
              <div className="field"><label data-uz="Tugash Sanasi" data-en="End Date" data-ru="Дата окончания">Tugash Sanasi</label><input type="date" id="ev-end" /></div>
            </div>
            <div className="field-row">
              <div className="field"><label data-uz="Joy / Manzil" data-en="Location" data-ru="Место проведения">Joy / Manzil</label><input type="text" id="ev-loc" placeholder="Toshkent, O'zbekiston" /></div>
              <div className="field"><label data-uz="Format" data-en="Format" data-ru="Формат">Format</label><select id="ev-format" defaultValue=""><option>Offline</option><option>Online</option><option>Hybrid</option></select></div>
            </div>
            <div className="field"><label data-uz="Tadbir tavsifi" data-en="Description" data-ru="Описание события">Tadbir tavsifi</label><textarea id="ev-desc" rows={3} placeholder="Tadbir haqida ma'lumot..." defaultValue={""} /></div>
            <button type="submit" className="btn btn-primary" style={{marginTop: 12}} data-uz="Tadbirni Saqlash" data-en="Save Event" data-ru="Сохранить мероприятие">Tadbirni Saqlash</button>
          </form>
          <div className="table-scroll"><table className="data-table">
            <thead><tr><th>ID</th><th data-uz="Tadbir Nomi" data-en="Event Name" data-ru="Название события">Tadbir Nomi</th><th data-uz="Sana" data-en="Date" data-ru="Дата">Sana</th><th data-uz="Joy" data-en="Location" data-ru="Место">Joy</th><th data-uz="Format" data-en="Format" data-ru="Формат">Format</th><th data-uz="Amallar" data-en="Actions" data-ru="Действия">Amallar</th></tr></thead>
            <tbody id="events-list-tbody"><tr><td colSpan={6}>Yuklanmoqda...</td></tr></tbody>
          </table></div>
        </div>
        {/* TAB: USERS MANAGEMENT (SUPER ADMIN EXCLUSIVE) */}
        <div id="tab-users" className="tab-content admin-card" style={{display: 'none'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12}}>
            <div>
              <h3 style={{fontSize: 24, marginBottom: 6}} data-uz="Foydalanuvchilar va Rollar Boshqaruvi" data-en="Users & Role Management" data-ru="Управление пользователями и ролями">Foydalanuvchilar va Rollar Boshqaruvi</h3>
              <p style={{color: 'var(--ink-500)', fontSize: 13}} data-uz="Texnik topshiriq (TZ V bob): Super Admin foydalanuvchilarning rollarini o'zgartirish va ularni o'chirish huquqiga ega." data-en="Technical Assignment (TZ Chapter V): Super Admin has full authority to manage user roles and remove users." data-ru="Техническое задание (ТЗ Глава V): Супер-админ имеет исключительное право изменять роли пользователей и удалять их.">Texnik topshiriq (TZ V bob): Super Admin foydalanuvchilarning rollarini o'zgartirish va ularni o'chirish huquqiga ega.</p>
            </div>
            <span className="badge-role badge-super">👑 Super Admin Only</span>
          </div>
          <div id="users-permission-warning" style={{display: 'none'}} className="role-notice editor">
            <strong data-uz="Diqqat:" data-en="Notice:" data-ru="Внимание:">Diqqat:</strong> <span data-uz="Siz 'Content Editor' sifatida tizimdasiz. Texnik topshiriq (TZ V bob) talablariga ko'ra, foydalanuvchilar rollarini faqat Super Admin o'zgartira oladi." data-en="You are logged in as a 'Content Editor'. Per TZ Chapter V requirements, only Super Admin can modify user roles or delete users." data-ru="Вы авторизованы как Редактор контента. Согласно ТЗ (Глава V), только Супер Админ может изменять роли пользователей и удалять их.">Siz 'Content Editor' sifatida tizimdasiz. Texnik topshiriq (TZ V bob) talablariga ko'ra, foydalanuvchilar rollarini faqat Super Admin o'zgartira oladi.</span>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th data-uz="Foydalanuvchi" data-en="Full Name" data-ru="Имя пользователя">Foydalanuvchi</th>
                  <th>Email</th>
                  <th data-uz="Rolni O'zgartirish" data-en="Role Assignment" data-ru="Назначение роли">Rolni O'zgartirish</th>
                  <th data-uz="Mamlakat" data-en="Country" data-ru="Страна">Mamlakat</th>
                  <th data-uz="Amallar" data-en="Actions" data-ru="Действия">Amallar</th>
                </tr>
              </thead>
              <tbody id="users-list-tbody"><tr><td colSpan={6}>Yuklanmoqda...</td></tr></tbody>
            </table>
          </div>
        </div>
        {/* TAB: UPLOAD */}
        <div id="tab-upload" className="tab-content admin-card" style={{display: 'none'}}>
          <h3 style={{fontSize: 24, marginBottom: 16}} data-uz="Fayllarni Serverga Yuklash" data-en="Upload Files to Server" data-ru="Загрузка файлов на сервер">Fayllarni Serverga Yuklash</h3>
          <p style={{color: 'var(--ink-600)', marginBottom: 24}} data-uz="Ilmiy maqolalar (PDF), hisobotlar yoki rasmlarni yuklang. Yuklangan fayl URL avtomatik hosil bo'ladi." data-en="Upload scientific papers (PDF), reports, or images. The file URL will be generated automatically." data-ru="Загружайте научные статьи (PDF), отчеты или изображения. URL файла формируется автоматически.">Ilmiy maqolalar (PDF), hisobotlar yoki rasmlarni yuklang. Yuklangan fayl URL avtomatik hosil bo'ladi.</p>
          <div className="upload-box" data-click="h17">
            <div style={{fontSize: 40, marginBottom: 12}}>📁</div>
            <div style={{fontWeight: 600, fontSize: 16, marginBottom: 4}} data-uz="Faylni tanlash uchun bosing" data-en="Click to select file" data-ru="Нажмите для выбора файла">Faylni tanlash uchun bosing</div>
            <div style={{fontSize: 13, color: 'var(--ink-500)'}}>PDF, PNG, JPG, WEBP, DOCX</div>
            <input type="file" id="file-input" style={{display: 'none'}} data-change="h18" />
          </div>
          <div id="upload-result" style={{display: 'none', background: 'var(--green-50)', border: '1px solid var(--green-300)', padding: 16, borderRadius: 8, color: 'var(--green-900)'}}>
            <strong data-uz="✅ Fayl muvaffaqiyatli yuklandi!" data-en="✅ File uploaded successfully!" data-ru="✅ Файл успешно загружен!">✅ Fayl muvaffaqiyatli yuklandi!</strong>
            <div style={{marginTop: 8, fontFamily: '"JetBrains Mono", monospace', fontSize: 13}}>URL: <span id="uploaded-url">...</span></div>
          </div>
        </div>
      </section>
    </div>
  </main>
</div>
  </Page>;
}
