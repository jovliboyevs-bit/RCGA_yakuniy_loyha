import { RCGA_API, signOut } from '../../assets/api-client.js';
import { setHTML, escapeHTML } from '../security';
import { navigateTo } from '../navigation';
import { getSession } from '../browser-session';

export function initPage(scope) {

  const { token, user } = getSession() ?? {};

  function normRole(r) {
    return String(r || '').toUpperCase().replace(/\s+/g, '').replace(/_/g, '');
  }

  const roleClean = user ? normRole(user.role) : '';
  const isSuperAdmin = roleClean === 'SUPERADMIN';
  const isEditor = isSuperAdmin || roleClean === 'MODERATOR' || roleClean === 'CONTENTEDITOR';

  if (!user || !isEditor) {
    alert('Ushbu sahifaga kirish uchun Super Admin yoki Content Editor (Moderator) huquqi talab qilinadi.');
    navigateTo('login.html'); return;
  }
  const roleDisplay = document.getElementById('user-display');
  if (roleDisplay && user) {
    roleDisplay.textContent = `${user.full_name || user.email} (${user.role})`;
  }
  const dashName = document.getElementById('dash-user-name');
  if (dashName && user) {
    dashName.textContent = user.full_name || user.email;
  }

  // Setup banner and access indicators
  const roleBanner = document.getElementById('role-banner');
  if (roleBanner) {
    if (isSuperAdmin) {
      roleBanner.className = 'role-notice super';
      setHTML(roleBanner, `<strong>👑 Super Admin Huquqlari:</strong> Tizimning to'liq boshqaruvi, barcha foydalanuvchilarning rollarini o'zgartirish, admin tayinlash hamda hisoblarni o'chirish huquqiga egasiz.`);
    } else {
      roleBanner.className = 'role-notice editor';
      setHTML(roleBanner, `<strong>📝 Content Editor (Admin):</strong> Materiallar, ilmiy nashrlar, yangiliklar va tadbirlarni qo'shish va tahrirlash huquqiga egasiz. Foydalanuvchilar rollarini boshqarish faqat Super Admin uchun ochiq.`);
      const dashUsersBtn = document.getElementById('dash-users-btn');
      if (dashUsersBtn) dashUsersBtn.style.display = 'none';
    }
  }

  function showTab(name) {
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.admin-menu button').forEach(b => b.classList.remove('active'));
    
    const target = document.getElementById(`tab-${name}`);
    if (target) target.style.display = 'block';
    
    const btn = Array.from(document.querySelectorAll('.admin-menu button')).find(b => b.dataset.tab === name);
    if (btn) btn.classList.add('active');

    if (name === 'publications') loadPublications();
    if (name === 'news') loadNews();
    if (name === 'events') loadEvents();
    if (name === 'users') loadUsers();
  }

  function toggleForm(id) {
    const f = document.getElementById(id);
    f.style.display = f.style.display === 'none' ? 'block' : 'none';
  }

  async function loadAdminStats() {
    try {
      const res = await fetch('/api/v1/admin/stats', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!scope.active) return;
      if (res.ok) {
        const data = await res.json();
    if (!scope.active) return;
        document.getElementById('stat-users').textContent = data.users_count;
        document.getElementById('stat-pubs').textContent = data.publications_count;
        document.getElementById('stat-news').textContent = data.news_count;
        document.getElementById('stat-events').textContent = data.events_count;
      }
    } catch(e){}
  }

  // ============ PUBLICATIONS ============
  async function loadPublications() {
    const tbody = document.getElementById('pub-list-tbody');
    const list = await RCGA_API.getPublications('', '', 50);
    if (!scope.active) return;
    setHTML(tbody, list.map(p => `
      <tr>
        <td>${escapeHTML(p.id)}</td>
        <td><strong>${escapeHTML(p.title_uz)}</strong></td>
        <td><span class="badge-role">${escapeHTML(p.category)}</span></td>
        <td>${escapeHTML(p.authors)}</td>
        <td>${escapeHTML(p.downloads_count)}</td>
        <td><button class="btn-danger" data-admin-action="deletePub" data-id="${escapeHTML(p.id)}">O'chirish</button></td>
      </tr>
    `).join('') || '<tr><td colspan="6">Nashrlar yo\'q</td></tr>');
  }

  async function deletePub(id) {
    if (!confirm('Ushbu nashrni o\'chirmoqchimisiz?')) return;
    const res = await fetch(`/api/v1/admin/publications/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    if (!scope.active) return;
    if (res.ok) { alert('Nashr o\'chirildi'); loadPublications(); loadAdminStats(); }
  }

  async function handleCreatePub(e) {
    e.preventDefault();
    const data = {
      title_uz: document.getElementById('pub-title').value,
      authors: document.getElementById('pub-authors').value,
      category: document.getElementById('pub-cat').value,
      doi: document.getElementById('pub-doi').value,
      file_url: document.getElementById('pub-file').value,
      abstract_uz: document.getElementById('pub-abstract').value
    };
    const res = await fetch('/api/v1/publications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    if (!scope.active) return;
    if (res.ok) {
      alert('Yangi nashr muvaffaqiyatli saqlandi!');
      toggleForm('pub-form');
      loadPublications();
      loadAdminStats();
    }
  }

  // ============ NEWS ============
  async function loadNews() {
    const tbody = document.getElementById('news-list-tbody');
    const list = await RCGA_API.getNews('', 50);
    if (!scope.active) return;
    setHTML(tbody, list.map(n => `
      <tr>
        <td>${escapeHTML(n.id)}</td>
        <td><strong>${escapeHTML(n.title_uz)}</strong></td>
        <td><span class="badge-role">${escapeHTML(n.category)}</span></td>
        <td>${escapeHTML(n.author)}</td>
        <td><button class="btn-danger" data-admin-action="deleteNews" data-id="${escapeHTML(n.id)}">O'chirish</button></td>
      </tr>
    `).join('') || '<tr><td colspan="5">Yangiliklar yo\'q</td></tr>');
  }

  async function deleteNews(id) {
    if (!confirm('Yangilikni o\'chirmoqchimisiz?')) return;
    const res = await fetch(`/api/v1/admin/news/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    if (!scope.active) return;
    if (res.ok) { alert('Yangilik o\'chirildi'); loadNews(); loadAdminStats(); }
  }

  async function handleCreateNews(e) {
    e.preventDefault();
    const data = {
      title_uz: document.getElementById('news-title').value,
      category: document.getElementById('news-cat').value,
      image_url: document.getElementById('news-img').value,
      excerpt_uz: document.getElementById('news-excerpt').value,
      content_uz: document.getElementById('news-content').value
    };
    const res = await fetch('/api/v1/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    if (!scope.active) return;
    if (res.ok) {
      alert('Yangilik chop etildi!');
      toggleForm('news-form');
      loadNews();
      loadAdminStats();
    }
  }

  // ============ EVENTS ============
  async function loadEvents() {
    const tbody = document.getElementById('events-list-tbody');
    const list = await RCGA_API.getEvents('', 50);
    if (!scope.active) return;
    setHTML(tbody, list.map(ev => `
      <tr>
        <td>${escapeHTML(ev.id)}</td>
        <td><strong>${escapeHTML(ev.title_uz)}</strong></td>
        <td>${escapeHTML(ev.start_date || '—')}</td>
        <td>${escapeHTML(ev.location_uz || '—')}</td>
        <td><span class="badge-role">${escapeHTML(ev.format || 'Offline')}</span></td>
        <td><button class="btn-danger" data-admin-action="deleteEvent" data-id="${escapeHTML(ev.id)}">O'chirish</button></td>
      </tr>
    `).join('') || '<tr><td colspan="6">Tadbirlar yo\'q</td></tr>');
  }

  async function deleteEvent(id) {
    if (!confirm('Tadbirni o\'chirmoqchimisiz?')) return;
    const res = await fetch(`/api/v1/admin/events/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    if (!scope.active) return;
    if (res.ok) { alert('Tadbir o\'chirildi'); loadEvents(); loadAdminStats(); }
  }

  async function handleCreateEvent(e) {
    e.preventDefault();
    const data = {
      title_uz: document.getElementById('ev-title').value,
      start_date: document.getElementById('ev-start').value,
      end_date: document.getElementById('ev-end').value || document.getElementById('ev-start').value,
      location_uz: document.getElementById('ev-loc').value,
      format: document.getElementById('ev-format').value,
      description_uz: document.getElementById('ev-desc').value
    };
    const res = await fetch('/api/v1/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    if (!scope.active) return;
    if (res.ok) {
      alert('Tadbir muvaffaqiyatli saqlandi!');
      toggleForm('event-form');
      loadEvents();
      loadAdminStats();
    }
  }

  // ============ USER MANAGEMENT (SUPER ADMIN) ============
  const ROLES_LIST = [
    'SUPERADMIN',
    'MODERATOR',
    'RESEARCHER',
    'FARMER',
    'USER',
    'Super Admin',
    'Content Editor'
  ];

  async function loadUsers() {
    const tbody = document.getElementById('users-list-tbody');
    const warning = document.getElementById('users-permission-warning');
    if (!isSuperAdmin) {
      warning.style.display = 'block';
    } else {
      warning.style.display = 'none';
    }

    try {
      const res = await fetch('/api/v1/admin/users', { headers: { 'Authorization': `Bearer ${token}` } });
    if (!scope.active) return;
      if (!res.ok) {
        setHTML(tbody, `<tr><td colspan="6" style="color: var(--rust);">Foydalanuvchilarni yuklashda xatolik yuz berdi.</td></tr>`);
        return;
      }
      const rawUsers = await res.json();
    if (!scope.active) return;
      const users = Array.isArray(rawUsers) ? rawUsers : (rawUsers.items || []);
      setHTML(tbody, users.map(u => {
        const isSelf = user && user.id === u.id;
        let roleControl = '';
        let actionControl = '';

        if (isSuperAdmin) {
          const options = ROLES_LIST.map(r => `<option value="${r}" ${normRole(u.role) === normRole(r) ? 'selected' : ''}>${r}</option>`).join('');
          roleControl = `
            <select class="role-select" data-admin-action="changeUserRole" data-id="${escapeHTML(u.id)}" data-email="${escapeHTML(u.email)}">
              ${options}
            </select>
          `;
          if (isSelf) {
            actionControl = `<span style="font-size: 11px; color: var(--ink-400);">(Sizning hisobingiz)</span>`;
          } else {
            actionControl = `<button class="btn-danger" data-admin-action="deleteUser" data-id="${escapeHTML(u.id)}" data-email="${escapeHTML(u.email)}">O'chirish</button>`;
          }
        } else {
          roleControl = `<span class="badge-role">${escapeHTML(u.role)}</span>`;
          actionControl = `<span style="font-size: 11px; color: var(--ink-400);">Faqat Super Admin</span>`;
        }

        return `
          <tr>
            <td>${escapeHTML(u.id)}</td>
            <td><strong>${escapeHTML(u.full_name || 'Ismsiz')}</strong></td>
            <td>${escapeHTML(u.email)}</td>
            <td>${roleControl}</td>
            <td>${escapeHTML(u.country || 'UZ')}</td>
            <td>${actionControl}</td>
          </tr>
        `;
      }).join(''));
    } catch(err) {
      setHTML(tbody, `<tr><td colspan="6">Yuklashda xatolik: ${escapeHTML(err.message)}</td></tr>`);
    }
  }

  async function changeUserRole(userId, newRole, email) {
    if (!confirm(`${email} foydalanuvchisining rolini "${newRole}" ga o'zgartirmoqchimisiz?`)) {
      loadUsers();
      return;
    }
    try {
      const res = await fetch(`/api/v1/admin/users/${userId}/role?role=${encodeURIComponent(newRole)}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    if (!scope.active) return;
      if (res.ok) {
        alert(`Foydalanuvchi (${email}) roli "${newRole}" ga muvaffaqiyatli o'zgartirildi!`);
        loadUsers();
      } else {
        const err = await res.json();
    if (!scope.active) return;
        alert(`Xatolik: ${err.detail || 'Rolni o\'zgartirish amalga oshmadi'}`);
        loadUsers();
      }
    } catch(err) {
      alert(`Xatolik: ${escapeHTML(err.message)}`);
      loadUsers();
    }
  }

  async function deleteUser(userId, email) {
    if (!confirm(`Haqiqatan ham ${email} foydalanuvchisini butunlay o'chirib tashlamoqchimisiz?`)) return;
    try {
      const res = await fetch(`/api/v1/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    if (!scope.active) return;
      if (res.ok) {
        alert(`Foydalanuvchi (${email}) muvaffaqiyatli o'chirildi!`);
        loadUsers();
        loadAdminStats();
      } else {
        const err = await res.json();
    if (!scope.active) return;
        alert(`Xatolik: ${err.detail || 'O\'chirishda xatolik'}`);
      }
    } catch(err) {
      alert(`Xatolik: ${escapeHTML(err.message)}`);
    }
  }

  // ============ FILE UPLOAD ============
  async function handleFileUpload(input) {
    if (!input.files || !input.files[0]) return;
    const formData = new FormData();
    formData.append('file', input.files[0]);

    const res = await fetch('/api/v1/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    if (!scope.active) return;
    if (res.ok) {
      const data = await res.json();
    if (!scope.active) return;
      document.getElementById('upload-result').style.display = 'block';
      document.getElementById('uploaded-url').textContent = window.location.origin + data.file_url;
      const pubFileInput = document.getElementById('pub-file');
      if (pubFileInput) pubFileInput.value = data.file_url;
    } else {
      const err = await res.json();
    if (!scope.active) return;
      alert(`Yuklashda xatolik: ${err.detail || 'Fayl yuklanmadi'}`);
    }
  }

  loadAdminStats();

  scope.listen(document, 'change', event => {
    const target = event.target.closest('[data-change]');
    if (!target) return;
    const handlers = {
      h0: () => { window.applyLanguage ? window.applyLanguage(target.value) : null },
      h18: () => { handleFileUpload(target) },
    };
    if (handlers[target.dataset.change]?.() === false) event.preventDefault();
  });

  scope.listen(document, 'click', event => {
    const target = event.target.closest('[data-click]');
    if (!target) return;
    const handlers = {
      h1: signOut,
      h2: () => { showTab('dashboard') },
      h3: () => { showTab('publications') },
      h4: () => { showTab('news') },
      h5: () => { showTab('events') },
      h6: () => { showTab('users') },
      h7: () => { showTab('upload') },
      h8: () => { showTab('upload') },
      h9: () => { showTab('publications') },
      h10: () => { showTab('users') },
      h11: () => { toggleForm('pub-form') },
      h13: () => { toggleForm('news-form') },
      h15: () => { toggleForm('event-form') },
      h17: () => { document.getElementById('file-input').click() },
    };
    if (handlers[target.dataset.click]?.() === false) event.preventDefault();
  });

  scope.listen(document, 'submit', event => {
    const target = event.target.closest('[data-submit]');
    if (!target) return;
    const handlers = {
      h12: () => { handleCreatePub(event) },
      h14: () => { handleCreateNews(event) },
      h16: () => { handleCreateEvent(event) },
    };
    if (handlers[target.dataset.submit]?.() === false) event.preventDefault();
  });

  for (const type of ['click', 'change']) scope.listen(document, type, event => {
    const target = event.target.closest('[data-admin-action]');
    if (!target) return;
    const id = Number(target.dataset.id);
    if (!Number.isSafeInteger(id) || id < 1) return;
    const action = target.dataset.adminAction;
    if (type === 'change' && action === 'changeUserRole' && isSuperAdmin &&
        target.closest('#users-list-tbody') && ROLES_LIST.includes(target.value)) {
      changeUserRole(id, target.value, target.dataset.email);
    }
    if (type !== 'click') return;
    if (action === 'deletePub' && target.closest('#pub-list-tbody')) deletePub(id);
    if (action === 'deleteNews' && target.closest('#news-list-tbody')) deleteNews(id);
    if (action === 'deleteEvent' && target.closest('#events-list-tbody')) deleteEvent(id);
    if (action === 'deleteUser' && isSuperAdmin && id !== user.id && target.closest('#users-list-tbody')) {
      deleteUser(id, target.dataset.email);
    }
  });

}
