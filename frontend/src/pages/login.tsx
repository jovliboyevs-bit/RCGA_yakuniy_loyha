import { LanguageMenu, countries } from "../LanguageMenu";
import { Page } from '../Page';
import { Nav, Footer } from '../Layout';
import { initPage } from '../behaviors/login.js';
import './login.css';

export default function RoutePage() {
  return <Page page="login" title="Kirish — RCGA" description="" bodyClass="login-page" dark={false} initialize={initPage}>
<div className="auth-wrap">
  {/* LEFT VISUAL */}
  <aside className="auth-visual">
    <img src="assets/hero-wheat-field-1600.webp" srcSet="assets/hero-wheat-field-800.webp 800w, assets/hero-wheat-field-1600.webp 1600w" sizes="(min-width: 1025px) 48vw, 100vw" fetchPriority="high" alt="" />
    <div className="auth-visual-inner">
      <a href="index.html" className="brand" style={{color: '#fff'}}>
        <span className="brand-mark">R</span>
        <span className="brand-text">
          <strong>RCGA</strong>
          <span style={{color: 'rgba(255,255,255,0.7)'}}>Digital Platform</span>
        </span>
      </a>
      <div className="auth-visual-quote">
        <div className="eyebrow" style={{color: 'var(--green-400)', marginBottom: 24}} data-uz="CAREC hamjamiyat" data-en="CAREC Community" data-ru="Сообщество ЦАРИЭС">CAREC hamjamiyat</div>
        <h2>
          <span data-uz="Bilim —" data-en="Knowledge is" data-ru="Знания —">Bilim —</span>
          <em data-uz="ochiq." data-en="open." data-ru="открыты.">ochiq.</em>
          <span data-uz="Hamjamiyat — birlashgan." data-en="Community is united." data-ru="Сообщество едино.">Hamjamiyat — birlashgan.</span>
        </h2>
        <p data-uz="11 davlatdan 5 000+ olim, fermer va siyosatchi RCGA platformasida bilim almashmoqda. Sizning hissangiz ham muhim." data-en="5,000+ researchers, farmers, and policymakers across 11 countries share knowledge on RCGA. Your contribution matters." data-ru="5 000+ ученых, фермеров и экспертов из 11 стран делятся знаниями на платформе RCGA. Ваш вклад важен.">11 davlatdan 5 000+ olim, fermer va siyosatchi RCGA platformasida bilim almashmoqda. Sizning hissangiz ham muhim.</p>
      </div>
      <div className="auth-footer">
        <span>© 2026 RCGA</span>
        <span>UZ · RU · EN</span>
      </div>
    </div>
  </aside>
  {/* RIGHT FORM */}
  <main className="auth-form-wrap">
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
      <div className="auth-tabs" style={{marginBottom: 0}}>
        <button id="tab-login" className="active" data-uz="Kirish" data-en="Sign in" data-ru="Вход">Kirish</button>
        <button id="tab-register" data-uz="Ro'yxatdan o'tish" data-en="Register" data-ru="Регистрация">Ro'yxatdan o'tish</button>
      </div>
      <div className="lang-selector-group">
        <div className="lang-switch" style={{display: 'flex', gap: 4}}>
          <button className="lang-btn" data-lang="uz" style={{padding: '4px 8px', fontSize: 12, border: '1px solid var(--ink-200)', background: '#fff', borderRadius: 3, cursor: 'pointer'}}>UZ</button>
          <button className="lang-btn" data-lang="ru" style={{padding: '4px 8px', fontSize: 12, border: '1px solid var(--ink-200)', background: '#fff', borderRadius: 3, cursor: 'pointer'}}>RU</button>
          <button className="lang-btn" data-lang="en" style={{padding: '4px 8px', fontSize: 12, border: '1px solid var(--ink-200)', background: '#fff', borderRadius: 3, cursor: 'pointer'}}>EN</button>
        </div>
        <LanguageMenu />
      </div>
    </div>
    {/* LOGIN FORM */}
    <div id="form-login">
      <h2 style={{fontSize: 42, marginBottom: 12}}>
        <span data-uz="Yana" data-en="Welcome" data-ru="С возвращением">Yana</span>
        <em style={{color: 'var(--green-700)', fontStyle: 'italic', fontWeight: 400}} data-uz="qaytdingiz." data-en="back." data-ru="в систему.">qaytdingiz.</em>
      </h2>
      <p style={{color: 'var(--ink-600)', marginBottom: 40}} data-uz="Hisobingizga kirib, nashrlaringizni boshqaring va hamjamiyat bilan aloqada bo'ling." data-en="Sign in to manage your publications and connect with the community." data-ru="Войдите, чтобы управлять публикациями и оставаться на связи с сообществом.">Hisobingizga kirib, nashrlaringizni boshqaring va hamjamiyat bilan aloqada bo'ling.</p>
      <div className="auth-providers">
        <button type="button" className="auth-provider">
          <svg width={18} height={18} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
          Google
        </button>
        <button type="button" className="auth-provider">
          <svg width={18} height={18} viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
          LinkedIn
        </button>
      </div>
      <div className="auth-divider" data-uz="yoki email orqali" data-en="or with email" data-ru="или по эл. почте">yoki email orqali</div>
      <form id="login-form" method="post">
        <div className="field">
          <label data-uz="Email manzil" data-en="Email Address" data-ru="Электронная почта">Email manzil</label>
          <input type="email" autoComplete="username" required data-uz="ism.familiya@universitet.uz" data-en="name.surname@university.org" data-ru="name.surname@university.ru" placeholder="ism.familiya@universitet.uz" />
        </div>
        <div className="field">
          <label data-uz="Parol" data-en="Password" data-ru="Пароль">Parol</label>
          <input type="password" autoComplete="current-password" required placeholder="••••••••" />
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 32, fontSize: 14}}>
          <a href="#" style={{color: 'var(--green-700)', fontWeight: 600}} data-uz="Parolni unutdingizmi?" data-en="Forgot password?" data-ru="Забыли пароль?">Parolni unutdingizmi?</a>
        </div>
        <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center', padding: 16}} data-uz="Kirish" data-en="Sign In" data-ru="Войти">Kirish</button>
      </form>
      <p style={{marginTop: 24, textAlign: 'center', color: 'var(--ink-600)', fontSize: 14}}>
        <span data-uz="Hali hisobingiz yo'qmi?" data-en="Don't have an account yet?" data-ru="Еще нет учетной записи?">Hali hisobingiz yo'qmi?</span>
        <a href="#" data-click="h1" style={{color: 'var(--green-700)', fontWeight: 600}} data-uz="Ro'yxatdan o'ting" data-en="Register now" data-ru="Зарегистрируйтесь">Ro'yxatdan o'ting</a>
      </p>
    </div>
    {/* REGISTER FORM */}
    <div id="form-register" style={{display: 'none'}}>
      <h2 style={{fontSize: 42, marginBottom: 12}}>
        <span data-uz="Hamjamiyatga" data-en="Join our" data-ru="Присоединяйтесь к">Hamjamiyatga</span>
        <em style={{color: 'var(--green-700)', fontStyle: 'italic', fontWeight: 400}} data-uz="qo'shiling." data-en="community." data-ru="сообществу.">qo'shiling.</em>
      </h2>
      <p style={{color: 'var(--ink-600)', marginBottom: 40}} data-uz="Bepul ro'yxatdan o'tib, mintaqaning eng katta agrar bilim bazasiga kirish huquqini qo'lga kiriting." data-en="Register for free to access the region's premier agrarian knowledge repository." data-ru="Зарегистрируйтесь бесплатно, чтобы получить доступ к крупнейшей базе знаний региона.">Bepul ro'yxatdan o'tib, mintaqaning eng katta agrar bilim bazasiga kirish huquqini qo'lga kiriting.</p>
      <form id="register-form" method="post">
        <div className="field-row">
          <div className="field">
            <label data-uz="Ism va Familiya" data-en="Full Name" data-ru="Имя и Фамилия">Ism va Familiya</label>
            <input type="text" name="full_name" required data-uz="Ism Familiyangiz" data-en="Your Full Name" data-ru="Ваше Имя и Фамилия" placeholder="Ism Familiyangiz" />
          </div>
        </div>
        <div className="field">
          <label data-uz="Email manzil" data-en="Email Address" data-ru="Электронная почта">Email manzil</label>
          <input type="email" name="email" required data-uz="ism.familiya@universitet.uz" data-en="name.surname@university.org" data-ru="name.surname@university.ru" placeholder="ism.familiya@universitet.uz" />
        </div>
        <div className="field-row">
          <div className="field">
            <label data-uz="Mamlakat" data-en="Country" data-ru="Страна">Mamlakat</label>
            <select name="country" defaultValue="UZ">
              {countries.map(([code,,uz,en,ru]) => <option key={code} value={code} data-uz={uz} data-en={en} data-ru={ru}>{uz}</option>)}
            </select>
          </div>
          <div className="field">
            <label data-uz="Faoliyat sohasi (Rol)" data-en="Field / Role" data-ru="Роль / Сфера">Faoliyat sohasi (Rol)</label>
            <select name="role" defaultValue="">
              <option value="Researcher" data-uz="Tadqiqotchi / Olim" data-en="Researcher / Scientist" data-ru="Исследователь / Ученый">Tadqiqotchi / Olim</option>
              <option value="Institutional Member" data-uz="Universitet xodimi" data-en="Academic / Faculty" data-ru="Сотрудник университета">Universitet xodimi</option>
              <option value="Farmer" data-uz="Fermer / Agronom" data-en="Farmer / Agronomist" data-ru="Фермер / Агроном">Fermer / Agronom</option>
              <option value="Student" data-uz="Talaba / PhD" data-en="Student / PhD" data-ru="Студент / Аспирант">Talaba / PhD</option>
              <option value="Guest" data-uz="Boshqa" data-en="Other" data-ru="Другое">Boshqa</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label data-uz="Parol" data-en="Password" data-ru="Пароль">Parol</label>
          <input type="password" name="password" required data-uz="Kamida 8 belgi" data-en="At least 8 characters" data-ru="Не менее 8 символов" placeholder="Kamida 8 belgi" />
        </div>
        <label style={{display: 'flex', alignItems: 'flex-start', gap: 10, margin: '12px 0 28px', fontSize: 14, color: 'var(--ink-600)', lineHeight: '1.5', cursor: 'pointer'}}>
          <input type="checkbox" required style={{marginTop: 4, accentColor: 'var(--green-700)'}} />
          <span data-uz="Men foydalanish shartlari va maxfiylik siyosati bilan tanishdim va roziman." data-en="I agree to the Terms of Service and Privacy Policy." data-ru="Я согласен с условиями использования и политикой конфиденциальности.">Men foydalanish shartlari va maxfiylik siyosati bilan tanishdim va roziman.</span>
        </label>
        <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center', padding: 16}} data-uz="Bepul ro'yxatdan o'tish" data-en="Register for Free" data-ru="Бесплатная регистрация">Bepul ro'yxatdan o'tish</button>
      </form>
      <p style={{marginTop: 24, textAlign: 'center', color: 'var(--ink-600)', fontSize: 14}}>
        <span data-uz="Hisobingiz bormi?" data-en="Already have an account?" data-ru="Уже есть аккаунт?">Hisobingiz bormi?</span>
        <a href="#" data-click="h2" style={{color: 'var(--green-700)', fontWeight: 600}} data-uz="Kiring" data-en="Sign in" data-ru="Войти">Kiring</a>
      </p>
    </div>
  </main>
</div>
  </Page>;
}
