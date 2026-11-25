import { RCGA_API } from '../../assets/api-client.js';
import { setHTML, setMessageHTML, escapeHTML, publicationSourceURL } from '../security';
import { getAIKey, getChatState, getSession, saveChatState, setAIKey } from '../browser-session';

export function initPage(scope) {

    (function () {
      // 1. Language Dictionary
      const I18N = {
        uz: {
          newChat: "+ Yangi suhbat",
          today: "BUGUN",
          older: "OLDIN",
          guestUser: "Mehmon foydalanuvchi",
          defaultTitle: "Yangi suhbat",
          placeholder: "RCGA Assistant'ga savol bering...",
          disclaimer: "RCGA ASSISTANT XATO QILISHI MUMKIN. MUHIM MA'LUMOTLARNI TEKSHIRING.",
          senderYou: "Siz",
          sourcesTitle: "Foydalanilgan RCGA manbalari",
          error: "Kechirasiz, javob olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
          modalTitle: "AI Dvigateli Sozlamalari",
          modalDesc: "Tizim avtomatik ravishda <strong>RCGA Agro-Expert RAG Dvigateli</strong> orqali platforma ilmiy bazasi asosida ishlaydi. Istasangiz, to'g'ridan-to'g'ri tashqi Google Gemini yoki OpenAI API kalitingizni ham ulashingiz mumkin:",
          modalKey: "Google Gemini API Kaliti",
          modalClear: "Tozalash",
          modalSave: "Saqlash",
          chips: [
            { label: "💧 Suv resurslari", query: "Suv resurslari haqida ayting" },
            { label: "🌱 Tuproq sho'rlanishi", query: "Sho'rlangan tuproqlarni tiklash bo'yicha tavsiyalar" },
            { label: "🌾 Halofitlar", query: "Halofit ekinlarini yetishtirish metodikasi" },
            { label: "📡 Raqamli agrotex", query: "Raqamli agrotexnologiyalar va ekin monitoringi" },
            { label: "📚 Nashrlar", query: "RCGA bazasidagi eng dolzarb ilmiy nashrlar" }
          ]
        },
        ru: {
          newChat: "+ Новый диалог",
          today: "СЕГОДНЯ",
          older: "РАНЕЕ",
          guestUser: "Гостевой пользователь",
          defaultTitle: "Новый диалог",
          placeholder: "Задайте вопрос RCGA Assistant...",
          disclaimer: "RCGA ASSISTANT МОЖЕТ ОШИБАТЬСЯ. ПРОВЕРЯЙТЕ ВАЖНУЮ ИНФОРМАЦИЮ.",
          senderYou: "Вы",
          sourcesTitle: "Использованные источники RCGA",
          error: "К сожалению, произошла ошибка. Пожалуйста, повторите попытку.",
          modalTitle: "Настройки ИИ-движка",
          modalDesc: "Система автоматически работает на базе <strong>RCGA Agro-Expert RAG</strong> с опорой на научную базу. При желании вы можете подключить собственный ключ Google Gemini или OpenAI API:",
          modalKey: "Ключ Google Gemini API",
          modalClear: "Очистить",
          modalSave: "Сохранить",
          chips: [
            { label: "💧 Водные ресурсы", query: "Расскажите о водных ресурсах и орошении" },
            { label: "🌱 Засоление почв", query: "Рекомендации по восстановлению засоленных почв" },
            { label: "🌾 Галофиты", query: "Методика выращивания галофитных культур" },
            { label: "📡 Цифровой агротех", query: "Цифровые агротехнологии и спутниковый мониторинг" },
            { label: "📚 Публикации", query: "Актуальные научные публикации в базе знаний RCGA" }
          ]
        },
        en: {
          newChat: "+ New Chat",
          today: "TODAY",
          older: "PREVIOUS",
          guestUser: "Guest User",
          defaultTitle: "New chat",
          placeholder: "Ask RCGA Assistant a question...",
          disclaimer: "RCGA ASSISTANT MAY MAKE MISTAKES. VERIFY IMPORTANT INFORMATION.",
          senderYou: "You",
          sourcesTitle: "RCGA Sources Referenced",
          error: "Sorry, an error occurred while fetching the response. Please try again.",
          modalTitle: "AI Engine Settings",
          modalDesc: "The system runs automatically using the <strong>RCGA Agro-Expert RAG Engine</strong> grounded in the knowledge repository. Optionally, you can supply your own Google Gemini or OpenAI API key:",
          modalKey: "Google Gemini API Key",
          modalClear: "Clear",
          modalSave: "Save",
          chips: [
            { label: "💧 Water Resources", query: "Tell me about water resources and irrigation" },
            { label: "🌱 Soil Salinity", query: "Recommendations for restoring saline soils" },
            { label: "🌾 Halophytes", query: "Methods for cultivating halophyte crops" },
            { label: "📡 Digital Agritech", query: "Digital agrarian technology and crop monitoring" },
            { label: "📚 Publications", query: "Latest research publications in RCGA repository" }
          ]
        }
      };

      let currentLang = 'uz';
      try {
        currentLang = localStorage.getItem('rcga_lang') || 'uz';
      } catch (_) { }

      // 2. Chat State Management
      getSession();
      const chat = getChatState();
      let sessions = chat.sessions;
      let currentSessionId = chat.activeId;

      function saveSessions(sessions) {
        chat.sessions = sessions;
        saveChatState();
      }

      // Seed initial sample session matching screenshot 1 if completely empty
      if (sessions.length === 0) {
        const initialSession = {
          id: 'session-' + Date.now(),
          title: "Suv resurslari haqida ayting",
          createdAt: new Date().toISOString(),
          messages: [
            {
              role: "user",
              content: "Suv resurslari haqida ayting",
              timestamp: new Date().toISOString()
            },
            {
              role: "assistant",
              content: "Suv resurslari bo'yicha RCGA platformasida bir necha muhim tadqiqotlar mavjud. Eng dolzarblari:\n\n1. **Orol dengizi havzasida barqaror sug'orish** — sun'iy yo'ldosh va IoT sensorlari asosida 27% suv tejash imkonini beruvchi model (D. Egamberdiyeva, 2026).\n2. **Amudaryo transchegaraviy suv boshqaruvi** — 30 yillik mintaqaviy tahlil (K. Akramov, 2025).\n3. **Damcha sug'orish samaradorligi** — Farg'ona vodiysida olib borilgan tajribalar.\n\nBirinchi maqolani o'qish uchun *Publications* bo'limiga o'ting yoki DOI: `10.1234/rcga.2026.0421` orqali toping. Yordam berishimni davom ettirmoqchimisiz?",
              timestamp: new Date().toISOString(),
              sources: [
                { title: "Markaziy Osiyo Qishloq Xo'jaligida Suv Resurslarini Boshqarish", doi: "10.1234/rcga.2026.0421", url: "publications.html" }
              ]
            }
          ]
        };
        sessions.push(initialSession);
        saveSessions(sessions);
        currentSessionId = initialSession.id;
      }

      if (!currentSessionId || !sessions.find(s => s.id === currentSessionId)) {
        currentSessionId = sessions[0].id;
      }
      chat.activeId = currentSessionId;

      // DOM Elements
      const sidebar = document.getElementById('chat-sidebar');
      const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
      const newChatBtn = document.getElementById('new-chat-btn');
      const txtNewChat = document.getElementById('txt-new-chat');
      const lblGroupToday = document.getElementById('lbl-group-today');
      const sessionsTodayEl = document.getElementById('sessions-today');
      const sessionsOlderEl = document.getElementById('sessions-older');
      const olderTitleEl = document.getElementById('older-title');
      const sessionTitleEl = document.getElementById('chat-session-title');
      const messagesContainer = document.getElementById('messages-container');
      const chatThread = document.getElementById('chat-thread');
      const textarea = document.getElementById('chat-textarea');
      const sendBtn = document.getElementById('chat-send-btn');
      const exportBtn = document.getElementById('export-chat-btn');
      const suggestionsBox = document.getElementById('chat-suggestions');
      const userDisplayName = document.getElementById('user-display-name');
      const userAvatarText = document.getElementById('user-avatar-text');
      const lblDisclaimer = document.getElementById('lbl-disclaimer');

      // Update User Card info
      function updateUserInfo() {
        try {
          const u = getSession()?.user;
          if (u) {
            userDisplayName.textContent = u.full_name || u.email;
            userAvatarText.textContent = (u.full_name || u.email || 'M').charAt(0).toUpperCase();
          } else {
            userDisplayName.textContent = (I18N[currentLang] || I18N.uz).guestUser;
            userAvatarText.textContent = 'M';
          }
        } catch (_) { }
      }

      // 3. Apply Language to Chat UI
      function updateLanguage(lang) {
        if (!I18N[lang]) lang = 'uz';
        currentLang = lang;
        try { localStorage.setItem('rcga_lang', lang); } catch(_) {}

        const t = I18N[lang];
        if (txtNewChat) txtNewChat.textContent = t.newChat;
        if (lblGroupToday) lblGroupToday.textContent = t.today;
        if (olderTitleEl) olderTitleEl.textContent = t.older;
        if (textarea) textarea.placeholder = t.placeholder;
        if (lblDisclaimer) lblDisclaimer.textContent = t.disclaimer;

        // Modal elements
        const lblModalTitle = document.getElementById('lbl-modal-title');
        const lblModalDesc = document.getElementById('lbl-modal-desc');
        const lblModalKey = document.getElementById('lbl-modal-key');
        const clearKeyBtn = document.getElementById('clear-key-btn');
        const saveKeyBtn = document.getElementById('save-key-btn');
        if (lblModalTitle) lblModalTitle.textContent = t.modalTitle;
        if (lblModalDesc) setHTML(lblModalDesc, t.modalDesc);
        if (lblModalKey) lblModalKey.textContent = t.modalKey;
        if (clearKeyBtn) clearKeyBtn.textContent = t.modalClear;
        if (saveKeyBtn) saveKeyBtn.textContent = t.modalSave;

        // Re-render suggestion chips
        if (suggestionsBox) {
          setHTML(suggestionsBox, t.chips.map(c => `
            <button class="chat-suggestion-chip" data-query="${escapeHtml(c.query)}">
              ${escapeHtml(c.label)}
            </button>
          `).join(''));
        }

        updateUserInfo();
        renderMessages();
      }

      // Listen for navbar language switcher clicks
      scope.listen(document, 'click', (e) => {
        const langBtn = e.target.closest('[data-lang]');
        if (langBtn) {
          const lang = langBtn.dataset.lang;
          if (lang && lang !== currentLang) {
            updateLanguage(lang);
          }
        }
      });

      // 4. Render Functions
      function renderSidebar() {
        setHTML(sessionsTodayEl, '');
        setHTML(sessionsOlderEl, '');

        const now = new Date();
        const todayStr = now.toDateString();

        let olderCount = 0;

        sessions.forEach(sess => {
          const sessDate = new Date(sess.createdAt);
          const isToday = sessDate.toDateString() === todayStr;

          const item = document.createElement('div');
          item.className = 'chat-session-link' + (sess.id === currentSessionId ? ' active' : '');
          setHTML(item, `
            <span class="chat-session-text" title="${escapeHtml(sess.title)}">${escapeHtml(sess.title)}</span>
            <button class="chat-session-del" title="O'chirish" data-id="${escapeHtml(sess.id)}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          `);

          scope.listen(item, 'click', (e) => {
            if (e.target.closest('.chat-session-del')) return;
            switchSession(sess.id);
          });

          const delBtn = item.querySelector('.chat-session-del');
          scope.listen(delBtn, 'click', (e) => {
            e.stopPropagation();
            deleteSession(sess.id);
          });

          if (isToday) {
            sessionsTodayEl.appendChild(item);
          } else {
            olderCount++;
            sessionsOlderEl.appendChild(item);
          }
        });

        olderTitleEl.style.display = olderCount > 0 ? 'block' : 'none';
      }

      function getCurrentSession() {
        return sessions.find(s => s.id === currentSessionId) || sessions[0];
      }

      function formatMarkdown(text) {
        if (!text) return '';
        let html = escapeHtml(text);

        // Bold: **text**
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Italic: *text*
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // DOI badge: `10.xxxx/xxxx` or `code`
        html = html.replace(/`([^`]+)`/g, function (match, p1) {
          if (p1.startsWith('10.') || p1.includes('/rcga.')) {
            return `<a href="publications.html" class="doi-badge" title="Nashrni ko'rish">DOI: ${p1} ↗</a>`;
          }
          return `<code class="doi-badge">${p1}</code>`;
        });

        // Convert lists and paragraphs
        const lines = html.split('\n');
        let inList = false;
        let listType = 'ul';
        let res = [];

        for (let line of lines) {
          const trimmed = line.trim();
          const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          const ulMatch = trimmed.match(/^[-•*]\s+(.*)$/);

          if (olMatch) {
            if (!inList || listType !== 'ol') {
              if (inList) res.push(`</${listType}>`);
              res.push('<ol>');
              inList = true;
              listType = 'ol';
            }
            res.push(`<li>${olMatch[2]}</li>`);
          } else if (ulMatch) {
            if (!inList || listType !== 'ul') {
              if (inList) res.push(`</${listType}>`);
              res.push('<ul>');
              inList = true;
              listType = 'ul';
            }
            res.push(`<li>${ulMatch[1]}</li>`);
          } else {
            if (inList) {
              res.push(`</${listType}>`);
              inList = false;
            }
            if (trimmed.length > 0) {
              res.push(`<p>${trimmed}</p>`);
            }
          }
        }
        if (inList) res.push(`</${listType}>`);

        return res.join('');
      }

      function escapeHtml(str) {
        return (str || '').replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      }

      function renderMessages() {
        const session = getCurrentSession();
        const t = I18N[currentLang] || I18N.uz;

        sessionTitleEl.textContent = session.title || t.defaultTitle;
        setHTML(messagesContainer, '');

        session.messages.forEach(msg => {
          const msgEl = document.createElement('div');
          msgEl.className = 'chat-msg ' + msg.role;

          if (msg.role === 'user') {
            setMessageHTML(msgEl, `
              <div class="chat-msg-avatar">S</div>
              <div class="chat-msg-content">
                <div class="chat-msg-header">
                  <span class="chat-msg-sender">${t.senderYou}</span>
                </div>
                <div class="chat-msg-text">
                  <p>${escapeHtml(msg.content)}</p>
                </div>
              </div>
            `);
          } else {
            let sourcesHTML = '';
            if (msg.sources && msg.sources.length > 0) {
              sourcesHTML = `
                <div class="chat-sources-block">
                  <div class="chat-sources-title">${t.sourcesTitle}</div>
                  <div class="chat-sources-list">
                    ${msg.sources.map(source => {
                      const href = publicationSourceURL(source?.url);
                      const doi = source?.doi ? ` (DOI: ${escapeHTML(source.doi)})` : '';
                      const label = `📄 ${escapeHTML(source?.title)}${doi}`;
                      return href ? `<a href="${escapeHTML(href)}" class="chat-source-item">${label} ↗</a>`
                        : `<span class="chat-source-item">${label}</span>`;
                    }).join('')}
                  </div>
                </div>
              `;
            }

            setMessageHTML(msgEl, `
              <div class="chat-msg-avatar">R</div>
              <div class="chat-msg-content">
                <div class="chat-msg-header">
                  <span class="chat-msg-sender">RCGA Assistant</span>
                  <span class="chat-badge-ai">AI</span>
                </div>
                <div class="chat-msg-text">
                  ${formatMarkdown(msg.content)}
                  ${sourcesHTML}
                </div>
              </div>
            `);
          }

          messagesContainer.appendChild(msgEl);
        });

        chatThread.scrollTop = chatThread.scrollHeight;
      }

      function switchSession(id) {
        sidebar.classList.remove('open');
        currentSessionId = id;
        chat.activeId = id;
        saveChatState();
        renderSidebar();
        renderMessages();
      }

      function deleteSession(id) {
        sessions = sessions.filter(s => s.id !== id);
        if (!sessions.length) {
          createNewSession();
          return;
        }
        if (currentSessionId === id) {
          currentSessionId = sessions[0].id;
          chat.activeId = currentSessionId;
        }
        saveSessions(sessions);
        renderSidebar();
        renderMessages();
      }

      function createNewSession() {
        const t = I18N[currentLang] || I18N.uz;
        const newSess = {
          id: 'session-' + Date.now(),
          title: t.defaultTitle,
          createdAt: new Date().toISOString(),
          messages: []
        };
        sessions.unshift(newSess);
        currentSessionId = newSess.id;
        chat.activeId = currentSessionId;
        saveSessions(sessions);
        renderSidebar();
        renderMessages();
        sidebar.classList.remove('open');
        textarea.focus();
      }

      // 5. Send Message Logic
      async function handleSend() {
        const text = textarea.value.trim();
        if (!text) return;

        const session = getCurrentSession();
        const t = I18N[currentLang] || I18N.uz;

        // Rename session if default title
        if (session.messages.length === 0 || session.title === "Yangi suhbat" || session.title === "Новый диалог" || session.title === "New chat") {
          session.title = text.length > 38 ? text.substring(0, 38) + '...' : text;
          sessionTitleEl.textContent = session.title;
        }

        // Add user message
        const userMsg = {
          role: "user",
          content: text,
          timestamp: new Date().toISOString()
        };
        session.messages.push(userMsg);
        saveSessions(sessions);
        renderSidebar();
        renderMessages();

        textarea.value = '';
        chat.draft = '';
        saveChatState();
        textarea.style.height = 'auto';
        sendBtn.disabled = true;

        // Add typing indicator
        const typingEl = document.createElement('div');
        typingEl.className = 'chat-msg assistant typing-msg';
        setHTML(typingEl, `
          <div class="chat-msg-avatar">R</div>
          <div class="chat-msg-content">
            <div class="chat-msg-header">
              <span class="chat-msg-sender">RCGA Assistant</span>
              <span class="chat-badge-ai">AI</span>
            </div>
            <div class="chat-typing">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        `);
        messagesContainer.appendChild(typingEl);
        chatThread.scrollTop = chatThread.scrollHeight;

        try {
          // Prepare history
          const historyPayload = session.messages.slice(-6).map(m => ({
            role: m.role,
            content: m.content
          }));

          // Pass currentLang so AI answers in selected language
          const responseData = await RCGA_API.askAI(text, currentLang, historyPayload, scope.signal);
          if (!scope.active || chat !== getChatState()) return;
          typingEl.remove();

          const assistantMsg = {
            role: "assistant",
            content: responseData.response,
            timestamp: new Date().toISOString(),
            sources: Array.isArray(responseData.relevant_sources) ? responseData.relevant_sources : []
          };
          session.messages.push(assistantMsg);
          saveSessions(sessions);
          renderMessages();
        } catch (err) {
          if (!scope.active || chat !== getChatState()) return;
          typingEl.remove();
          const errorMsg = {
            role: "assistant",
            content: t.error,
            timestamp: new Date().toISOString()
          };
          session.messages.push(errorMsg);
          saveSessions(sessions);
          renderMessages();
        }
      }

      // Auto-resize textarea and enable button
      scope.listen(textarea, 'input', () => {
        chat.draft = textarea.value;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
        sendBtn.disabled = !textarea.value.trim();
      });

      // Keypress shortcuts: Enter sends, Shift+Enter new line
      scope.listen(textarea, 'keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      });

      // Shortcut: Cmd/Ctrl + N for new chat
      scope.listen(window, 'keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
          e.preventDefault();
          createNewSession();
        }
      });

      scope.listen(sendBtn, 'click', handleSend);
      scope.listen(newChatBtn, 'click', createNewSession);

      // Suggestions chips delegation
      if (suggestionsBox) {
        scope.listen(suggestionsBox, 'click', (e) => {
          const chip = e.target.closest('.chat-suggestion-chip');
          if (chip) {
            textarea.value = chip.dataset.query;
            textarea.dispatchEvent(new Event('input'));
            handleSend();
          }
        });
      }

      // Toggle Sidebar (mobile / responsive)
      if (toggleSidebarBtn) {
        scope.listen(toggleSidebarBtn, 'click', () => {
          sidebar.classList.toggle('open');
          if (sidebar.classList.contains('open') && window.matchMedia('(max-width: 768px)').matches) {
            document.getElementById('close-chat-sidebar')?.focus();
          }
        });
      }

      scope.listen(document.getElementById('close-chat-sidebar'), 'click', () => {
        sidebar.classList.remove('open');
        toggleSidebarBtn.focus();
      });

      // Export chat to clipboard
      if (exportBtn) {
        scope.listen(exportBtn, 'click', () => {
          const session = getCurrentSession();
          const t = I18N[currentLang] || I18N.uz;
          let transcript = `RCGA ASSISTANT CHAT TRANSCRIPT\n${session.title}\n${new Date().toLocaleString()}\n----------------------------------------\n\n`;
          session.messages.forEach(m => {
            const role = m.role === 'user' ? t.senderYou : 'RCGA Assistant';
            transcript += `[${role}]:\n${m.content}\n\n`;
          });
          if (!navigator.clipboard?.writeText) {
            window.prompt(currentLang === 'en' ? 'Copy the conversation' : currentLang === 'ru' ? 'Скопируйте диалог' : 'Suhbat matnini nusxalang', transcript);
            return;
          }
          navigator.clipboard.writeText(transcript).then(() => {
            alert(currentLang === 'ru' ? "Диалог скопирован в буфер обмена!" : (currentLang === 'en' ? "Chat copied to clipboard!" : "Suhbat to'liq nusxalandi!"));
          }).catch(() => {
            alert("Nusxalashda xatolik.");
          });
        });
      }

      // AI Settings Modal
      const settingsModal = document.getElementById('settings-modal');
      const openSettingsBtn = document.getElementById('open-settings-btn');
      const closeSettingsBtn = document.getElementById('close-settings-btn');
      const geminiInput = document.getElementById('gemini-key-input');
      const saveKeyBtn = document.getElementById('save-key-btn');
      const clearKeyBtn = document.getElementById('clear-key-btn');

      if (openSettingsBtn) {
        scope.listen(openSettingsBtn, 'click', () => {
          geminiInput.value = '';
          clearKeyBtn.disabled = !getAIKey();
          settingsModal.classList.add('open');
        });
      }
      if (closeSettingsBtn) {
        scope.listen(closeSettingsBtn, 'click', () => settingsModal.classList.remove('open'));
      }
      if (settingsModal) {
        scope.listen(settingsModal, 'click', (e) => {
          if (e.target === settingsModal) settingsModal.classList.remove('open');
        });
      }
      if (saveKeyBtn) {
        scope.listen(saveKeyBtn, 'click', () => {
          const val = geminiInput.value.trim();
          if (val) {
            setAIKey(val);
            geminiInput.value = '';
            alert(currentLang === 'ru' ? "Ключ Gemini API сохранен!" : (currentLang === 'en' ? "Gemini API key saved!" : "Gemini API kaliti saqlandi!"));
          }
          settingsModal.classList.remove('open');
        });
      }
      if (clearKeyBtn) {
        scope.listen(clearKeyBtn, 'click', () => {
          setAIKey('');
          geminiInput.value = '';
          alert(currentLang === 'ru' ? "Ключ удален. Используется движок RCGA Agro-Expert RAG." : (currentLang === 'en' ? "Key cleared. Using RCGA Agro-Expert RAG engine." : "Kalit tozalandi. Tizim RCGA Agro-Expert RAG tizimidan foydalanadi."));
          settingsModal.classList.remove('open');
        });
      }

      scope.listen(window, 'pagehide', saveChatState);
      scope.onCleanup(saveChatState);

      // Initial Render & Setup Language
      renderSidebar();
      updateLanguage(currentLang);

      // A draft from the widget stays in this tab and requires a manual send.
      if (chat.draft) {
        textarea.value = chat.draft;
        textarea.dispatchEvent(new Event('input'));
      }

    })();
  
}
