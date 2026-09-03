// RCGA API Client — Connects high-fidelity UI to FastAPI Backend
const API_BASE = '/api/v1';

const RCGA_API = {
  // Auth
  async login(email, password) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Kirishda xatolik yuz berdi');
    }
    const data = await res.json();
    localStorage.setItem('rcga_token', data.access_token);
    localStorage.setItem('rcga_user', JSON.stringify(data.user));
    return data;
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

  // News
  async getNews(category = '', limit = 10) {
    const url = new URL(`${window.location.origin}${API_BASE}/news`);
    if (category && category !== 'barchasi') url.searchParams.append('category', category);
    url.searchParams.append('limit', limit);
    const res = await fetch(url);
    return res.ok ? await res.json() : [];
  },

  // Publications
  async getPublications(category = '', search = '', limit = 10) {
    const url = new URL(`${window.location.origin}${API_BASE}/publications`);
    if (category && category !== 'barchasi') url.searchParams.append('category', category);
    if (search) url.searchParams.append('search', search);
    url.searchParams.append('limit', limit);
    const res = await fetch(url);
    return res.ok ? await res.json() : [];
  },

  // Events
  async getEvents(category = '', limit = 10) {
    const url = new URL(`${window.location.origin}${API_BASE}/events`);
    if (category && category !== 'barchasi') url.searchParams.append('category', category);
    url.searchParams.append('limit', limit);
    const res = await fetch(url);
    return res.ok ? await res.json() : [];
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

  // Institutions
  async getInstitutions(country = '') {
    const url = new URL(`${window.location.origin}${API_BASE}/institutions`);
    if (country) url.searchParams.append('country', country);
    const res = await fetch(url);
    return res.ok ? await res.json() : [];
  },

  // Search
  async search(query, type = 'all') {
    const url = new URL(`${window.location.origin}${API_BASE}/search`);
    url.searchParams.append('q', query);
    if (type) url.searchParams.append('type', type);
    const res = await fetch(url);
    return res.ok ? await res.json() : { publications: [], news: [], events: [], total_matches: 0 };
  },

  // AI Advisory Chat
  async askAI(message, language = 'uz') {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language })
    });
    return res.ok ? await res.json() : { response: 'Kechirasiz, javob olishda xatolik yuz berdi.' };
  }
};

// Auto-bind form event handlers if elements exist on DOM
document.addEventListener('DOMContentLoaded', () => {
  // Login form handler
  const loginForm = document.querySelector('form#login-form') || document.querySelector('.login-card form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = loginForm.querySelector('input[type="email"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');
      if (emailInput && passwordInput) {
        try {
          const res = await RCGA_API.login(emailInput.value, passwordInput.value);
          alert(`Xush kelibsiz, ${res.user.full_name || res.user.email}! (Rol: ${res.user.role})`);
          window.location.href = 'index.html';
        } catch (err) {
          alert(`Xatolik: ${err.message}`);
        }
      }
    });
  }

  // Register form handler
  const registerForm = document.querySelector('form#register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
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
          window.location.href = 'login.html';
        } catch (err) {
          alert(`Xatolik: ${err.message}`);
        }
      }
    });
  }
});
