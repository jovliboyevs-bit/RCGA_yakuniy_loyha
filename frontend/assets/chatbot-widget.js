import { RCGA_API } from './api-client.js';
import { setHTML, setMessageHTML } from '../src/security';
import { getChatState } from '../src/browser-session';
// RCGA Digital Platform — Floating AI Chatbot Widget (Multilingual UZ/RU/EN)
// Matches screenshots 2 and 3: floating bottom-right launcher + popup card

export function initWidget(scope) {
  // Prevent duplicate initialization or loading on full chat page
  if (document.getElementById('rcga-chatbot-root') || document.body.classList.contains('chat-page')) {
    return;
  }

  const WIDGET_I18N = {
    uz: {
      headline: "Yordam <em>kerakmi?</em>",
      status: "ONLAYN · AI YORDAMCHI",
      empty: "Ilmiy nashrlar, tadbirlar yoki fermerlik bo'yicha savolingizni bering.",
      placeholder: "Savolingizni yozing...",
      fullscreen: "TO'LIQ EKRAN ↗",
      error: "Tarmoqda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
    },
    ru: {
      headline: "Нужна <em>помощь?</em>",
      status: "ОНЛАЙН · AI ПОМОЩНИК",
      empty: "Задайте вопрос о научных публикациях, мероприятиях или фермерстве.",
      placeholder: "Напишите ваш вопрос...",
      fullscreen: "ПОЛНЫЙ ЭКРАН ↗",
      error: "Произошла ошибка сети. Пожалуйста, повторите попытку."
    },
    en: {
      headline: "Need <em>help?</em>",
      status: "ONLINE · AI ASSISTANT",
      empty: "Ask a question about publications, events or farming.",
      placeholder: "Type your question...",
      fullscreen: "FULL SCREEN ↗",
      error: "Network error occurred. Please try again."
    }
  };

  let currentLang = 'uz';
  try { currentLang = localStorage.getItem('rcga_lang') || 'uz'; } catch (_) { }

  // Create widget container
  const root = document.createElement('div');
  root.id = 'rcga-chatbot-root';
  setHTML(root, `
    <!-- Floating Card (Popup) -->
    <div class="rcga-widget-card closed" id="rcga-widget-card" aria-hidden="true">
      <div class="rcga-widget-header">
        <div class="rcga-widget-toprow">
          <div class="rcga-widget-brand-icon">R</div>
          <div>
            <div class="rcga-widget-brand-title">RCGA Assistant</div>
            <div class="rcga-widget-status">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#4ade80;"></span>
              <span id="rcga-widget-status-txt">ONLAYN · AI YORDAMCHI</span>
            </div>
          </div>
        </div>
        <div class="rcga-widget-headline" id="rcga-widget-headline-el">
          Yordam <em>kerakmi?</em>
        </div>
      </div>

      <div class="rcga-widget-body" id="rcga-widget-body">
        <div class="rcga-widget-empty" id="rcga-widget-empty">
          Ilmiy nashrlar, tadbirlar yoki fermerlik bo'yicha savolingizni bering.
        </div>
      </div>

      <div class="rcga-widget-footer">
        <div class="rcga-widget-input-wrap">
          <input type="text" class="rcga-widget-input" id="rcga-widget-input" placeholder="Savolingizni yozing..." />
          <div class="rcga-widget-controls">
            <a href="chat.html" class="rcga-widget-fullscreen-link" id="rcga-fullscreen-btn" title="To'liq ekranga o'tish">
              TO'LIQ EKRAN ↗
            </a>
            <button class="rcga-widget-send-btn" id="rcga-widget-send" title="Yuborish" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Trigger Button -->
    <button class="rcga-widget-toggle" id="rcga-widget-toggle" aria-label="AI Maslahatchi chatini ochish" title="RCGA Assistant">
      <span id="rcga-toggle-icon-chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </span>
      <span id="rcga-toggle-icon-close" style="display:none;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </button>
  `);

  document.body.appendChild(root);
  scope.onCleanup(() => root.remove());

  // Widget Elements
  const toggleBtn = document.getElementById('rcga-widget-toggle');
  const card = document.getElementById('rcga-widget-card');
  const iconChat = document.getElementById('rcga-toggle-icon-chat');
  const iconClose = document.getElementById('rcga-toggle-icon-close');
  const headlineEl = document.getElementById('rcga-widget-headline-el');
  const statusTxt = document.getElementById('rcga-widget-status-txt');
  const body = document.getElementById('rcga-widget-body');
  const emptyPlaceholder = document.getElementById('rcga-widget-empty');
  const input = document.getElementById('rcga-widget-input');
  const sendBtn = document.getElementById('rcga-widget-send');
  const fullscreenBtn = document.getElementById('rcga-fullscreen-btn');

  let isOpen = false;
  let widgetMessages = [];
  card.inert = true;
  toggleBtn.setAttribute('aria-controls', card.id);
  toggleBtn.setAttribute('aria-expanded', 'false');
  const viewport = window.visualViewport;
  function fitKeyboard() {
    const inset = isOpen && viewport && viewport.scale === 1
      ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop) : 0;
    root.style.setProperty('--widget-keyboard', inset + 'px');
  }
  if (viewport) {
    scope.listen(viewport, 'resize', fitKeyboard);
    scope.listen(viewport, 'scroll', fitKeyboard);
  }

  function applyWidgetLanguage(lang) {
    if (!WIDGET_I18N[lang]) lang = 'uz';
    currentLang = lang;
    const t = WIDGET_I18N[lang];
    if (headlineEl) setHTML(headlineEl, t.headline);
    if (statusTxt) statusTxt.textContent = t.status;
    if (emptyPlaceholder && widgetMessages.length === 0) emptyPlaceholder.textContent = t.empty;
    if (input) input.placeholder = t.placeholder;
    if (fullscreenBtn) fullscreenBtn.textContent = t.fullscreen;
  }

  // Listen for language changes globally
  scope.listen(document, 'click', (e) => {
    const langBtn = e.target.closest('[data-lang]');
    if (langBtn && langBtn.dataset.lang) {
      applyWidgetLanguage(langBtn.dataset.lang);
    }
  });

  function setOpen(open) {
    isOpen = open;
    fitKeyboard();
    card.inert = !open;
    toggleBtn.setAttribute('aria-expanded', String(open));
    if (isOpen) {
      card.classList.remove('closed');
      card.classList.add('open');
      card.setAttribute('aria-hidden', 'false');
      toggleBtn.classList.add('open');
      iconChat.style.display = 'none';
      iconClose.style.display = 'block';
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        input.focus({ preventScroll: true });
      }
    } else {
      card.classList.remove('open');
      card.classList.add('closed');
      card.setAttribute('aria-hidden', 'true');
      toggleBtn.classList.remove('open');
      iconChat.style.display = 'block';
      iconClose.style.display = 'none';
    }
  }

  scope.listen(toggleBtn, 'click', () => setOpen(!isOpen));

  // Input events
  scope.listen(input, 'input', () => {
    sendBtn.disabled = !input.value.trim();
  });

  scope.listen(input, 'keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });

  scope.listen(sendBtn, 'click', handleSend);

  // Keep the draft in this tab when opening the full chat.
  scope.listen(fullscreenBtn, 'click', (event) => {
    if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      getChatState().draft = input.value;
    }
  });

  function appendMessage(role, content) {
    if (emptyPlaceholder) {
      emptyPlaceholder.style.display = 'none';
    }

    const msgEl = document.createElement('div');
    msgEl.className = `rcga-widget-msg ${role}`;

    if (role === 'user') {
      msgEl.textContent = content;
    } else {
      // Basic markdown bolding & formatting
      let formatted = escapeHtml(content)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="doi-badge">$1</code>')
        .replace(/\n/g, '<br/>');
      setMessageHTML(msgEl, `<div>${formatted}</div>`);
    }

    body.appendChild(msgEl);
    body.scrollTop = body.scrollHeight;
  }

  async function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    widgetMessages.push({ role: 'user', content: text });

    input.value = '';
    sendBtn.disabled = true;

    // Typing bubble
    const typingEl = document.createElement('div');
    typingEl.className = 'rcga-widget-msg assistant';
    setHTML(typingEl, `
      <div class="chat-typing" style="padding:4px 0;">
        <span class="typing-dot" style="width:5px; height:5px;"></span>
        <span class="typing-dot" style="width:5px; height:5px;"></span>
        <span class="typing-dot" style="width:5px; height:5px;"></span>
      </div>
    `);
    body.appendChild(typingEl);
    body.scrollTop = body.scrollHeight;

    const t = WIDGET_I18N[currentLang] || WIDGET_I18N.uz;

    try {
      const res = await RCGA_API.askAI(text, currentLang, widgetMessages.slice(-4), scope.signal);
      if (!scope.active) return;

      typingEl.remove();
      const reply = res.response || "Javob olindi.";
      appendMessage('assistant', reply);
      widgetMessages.push({ role: 'assistant', content: reply });
    } catch (err) {
      typingEl.remove();
      appendMessage('assistant', t.error);
    }
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Initial language setup
  applyWidgetLanguage(currentLang);
}
