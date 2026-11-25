import { navigateTo } from '../src/navigation';
import { clearSession, getAIKey, getSession, removeLegacyCredentials, startSession } from '../src/browser-session';
// RCGA API Client — Connects high-fidelity UI to FastAPI Backend
const API_BASE = '/api/v1';

async function revokeToken(token) {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(6000),
    keepalive: true,
  });
  if (!res.ok && res.status !== 401) throw new Error('Tokenni bekor qilishda xatolik.');
}

export function discardLegacySession() {
  const token = removeLegacyCredentials();
  if (token) void revokeToken(token).catch(() => {});
}

export async function signOut() {
  const token = getSession()?.token;
  clearSession();
  navigateTo('/index.html');
  if (!token) return;
  try {
    await revokeToken(token);
  } catch {
    alert('Brauzerda chiqdingiz. Server token bekor qilinganini tasdiqlamadi.');
  }
}

export const RCGA_API = {
  // Auth
  async login(email, password, signal) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
      signal,
      cache: 'no-store',
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Kirishda xatolik yuz berdi');
    }
    const data = await res.json();
    signal?.throwIfAborted();
    startSession(data.access_token, data.user, data.expires_in);
    return data.user;
  },

  async register(full_name, email, password, role = 'Farmer', organization = '', country = 'UZ') {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, password, role, organization, country })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
    }
    return await res.json();
  },

  // News (Pagination, Sorting, Filtering, i18n)
  async getNews(category = '', limit = 10, page = 1, sortBy = '-published_at', dateFrom = '', dateTo = '', country = '', lang = '') {
    const activeLang = lang || localStorage.getItem('rcga_lang') || 'uz';
    const url = new URL(`${window.location.origin}${API_BASE}/news`);
    url.searchParams.append('lang', activeLang);
    if (category && category !== 'barchasi') url.searchParams.append('category', category);
    if (country) url.searchParams.append('country', country);
    if (dateFrom) url.searchParams.append('date_from', dateFrom);
    if (dateTo) url.searchParams.append('date_to', dateTo);
    if (sortBy) url.searchParams.append('sort_by', sortBy);
    url.searchParams.append('page', page);
    url.searchParams.append('size', limit);
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    const items = data.items || [];
    items.total = data.total;
    items.page = data.page;
    items.size = data.size;
    items.pages = data.pages;
    return items;
  },

  // Publications (Pagination, Sorting, Filtering, i18n)
  async getPublications(category = '', search = '', limit = 10, page = 1, sortBy = '-created_at', dateFrom = '', dateTo = '', country = '', lang = '') {
    const activeLang = lang || localStorage.getItem('rcga_lang') || 'uz';
    const url = new URL(`${window.location.origin}${API_BASE}/publications`);
    url.searchParams.append('lang', activeLang);
    if (category && category !== 'barchasi') url.searchParams.append('category', category);
    if (search) url.searchParams.append('search', search);
    if (country) url.searchParams.append('country', country);
    if (dateFrom) url.searchParams.append('date_from', dateFrom);
    if (dateTo) url.searchParams.append('date_to', dateTo);
    if (sortBy) url.searchParams.append('sort_by', sortBy);
    url.searchParams.append('page', page);
    url.searchParams.append('size', limit);
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    const items = data.items || [];
    items.total = data.total;
    items.page = data.page;
    items.size = data.size;
    items.pages = data.pages;
    return items;
  },

  // Events (Pagination, Sorting, Filtering, i18n)
  async getEvents(category = '', limit = 10, page = 1, sortBy = 'event_date', dateFrom = '', dateTo = '', country = '', status = '', lang = '') {
    const activeLang = lang || localStorage.getItem('rcga_lang') || 'uz';
    const url = new URL(`${window.location.origin}${API_BASE}/events`);
    url.searchParams.append('lang', activeLang);
    if (category && category !== 'barchasi') url.searchParams.append('category', category);
    if (country) url.searchParams.append('country', country);
    if (status) url.searchParams.append('status', status);
    if (dateFrom) url.searchParams.append('date_from', dateFrom);
    if (dateTo) url.searchParams.append('date_to', dateTo);
    if (sortBy) url.searchParams.append('sort_by', sortBy);
    url.searchParams.append('page', page);
    url.searchParams.append('size', limit);
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    const items = data.items || [];
    items.total = data.total;
    items.page = data.page;
    items.size = data.size;
    items.pages = data.pages;
    return items;
  },

  async registerForEvent(eventId, fullName, email, organization) {
    const res = await fetch(`${API_BASE}/events/${eventId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullName, email, organization })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Ro\'yxatdan o\'tishda xatolik');
    }
    return await res.json();
  },

  // Institutions (Pagination, Sorting, Filtering, i18n)
  async getInstitutions(country = '', category = '', limit = 50, page = 1, sortBy = 'id', lang = '') {
    const activeLang = lang || localStorage.getItem('rcga_lang') || 'uz';
    const url = new URL(`${window.location.origin}${API_BASE}/institutions`);
    url.searchParams.append('lang', activeLang);
    if (country) url.searchParams.append('country', country);
    if (category && category !== 'barchasi') url.searchParams.append('category', category);
    if (sortBy) url.searchParams.append('sort_by', sortBy);
    url.searchParams.append('page', page);
    url.searchParams.append('size', limit);
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    const items = data.items || [];
    items.total = data.total;
    items.page = data.page;
    items.size = data.size;
    items.pages = data.pages;
    return items;
  },

  // Search (i18n)
  async search(query, type = 'all', lang = '') {
    const activeLang = lang || localStorage.getItem('rcga_lang') || 'uz';
    const url = new URL(`${window.location.origin}${API_BASE}/search`);
    url.searchParams.append('lang', activeLang);
    url.searchParams.append('q', query);
    if (type) url.searchParams.append('type', type);
    const res = await fetch(url);
    return res.ok ? await res.json() : { publications: [], news: [], events: [], total_matches: 0 };
  },

  // AI Advisory Chat
  async askAI(message, language = 'uz', history = [], signal) {
    try {
      const storedKey = getAIKey();
      const payload = { message, language, history };
      if (storedKey) payload.api_key = storedKey;
      
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal,
      });
      if (res.ok) {
        return await res.json();
      }
      return { response: 'Kechirasiz, javob olishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.' };
    } catch (err) {
      return { response: 'Server bilan bog\'lanishda uzilish bo\'ldi. Tarmoqni tekshiring.' };
    }
  },

  async getAIStatus() {
    try {
      const res = await fetch(`${API_BASE}/ai/status`);
      return res.ok ? await res.json() : { status: 'online', engine: 'RCGA Agro-Expert' };
    } catch (_) {
      return { status: 'offline', engine: 'Offline' };
    }
  }
};

// Auto-bind form event handlers if elements exist on DOM
export function bindAuthForms(scope) {
  // Login form handler
  const loginForm = document.querySelector('form#login-form') || document.querySelector('.login-card form');
  if (loginForm) {
    let pending = false;
    scope.listen(loginForm, 'submit', async (e) => {
      e.preventDefault();
      if (pending) return;
      const emailInput = loginForm.querySelector('input[type="email"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');
      if (emailInput && passwordInput) {
        const submitButton = loginForm.querySelector('button[type="submit"]');
        pending = true;
        if (submitButton) submitButton.disabled = true;
        try {
          const user = await RCGA_API.login(emailInput.value, passwordInput.value, scope.signal);
          const r = user.role.toUpperCase().replace(/[\s_]/g, '');
          const isAdmin = r === 'SUPERADMIN' || r === 'MODERATOR' || r === 'CONTENTEDITOR';
          if (isAdmin) {
            navigateTo('admin.html');
          } else {
            navigateTo('index.html');
          }
        } catch (err) {
          if (!scope.active) return;
          alert(`Xatolik: ${err.message}`);
        } finally {
          pending = false;
          if (submitButton) submitButton.disabled = false;
        }
      }
    });
  }

  // Register form handler
  const registerForm = document.querySelector('form#register-form');
  if (registerForm) {
    scope.listen(registerForm, 'submit', async (e) => {
      e.preventDefault();
      const nameInput = registerForm.querySelector('input[name="full_name"]');
      const emailInput = registerForm.querySelector('input[name="email"]');
      const pwdInput = registerForm.querySelector('input[name="password"]');
      const roleInput = registerForm.querySelector('select[name="role"]');
      if (emailInput && pwdInput) {
        try {
          const user = await RCGA_API.register(
            nameInput ? nameInput.value : '',
            emailInput.value,
            pwdInput.value,
            roleInput ? roleInput.value : 'Farmer'
          );
          alert(`Muvaffaqiyatli ro'yxatdan o'tdingiz! Tizimga kirishingiz mumkin.`);
          navigateTo('login.html');
        } catch (err) {
          alert(`Xatolik: ${err.message}`);
        }
      }
    });
  }
}
