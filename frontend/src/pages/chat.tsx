import { Page } from '../Page';
import { Nav, Footer } from '../Layout';
import { initPage } from '../behaviors/chat.js';
import './chat.css';

export default function RoutePage() {
  return <Page page="chat" title="RCGA Assistant — Sun'iy Intellekt Maslahatchisi" description="RCGA sun'iy intellekt agromaslahatchisi: Markaziy Osiyo qishloq xo'jaligi, suv resurslari, tuproq unumdorligi va ilmiy nashrlar bo'yicha interaktiv yordamchi." bodyClass="chat-page" dark={false} initialize={initPage}>
<div>
  {/* Shared RCGA Navigation Mount */}
  <Nav active="chat" dark={false} />
  {/* Main Chat Application Container */}
  <div className="chat-layout">
    {/* Sidebar */}
    <aside className="chat-sidebar" id="chat-sidebar">
      <div className="chat-sidebar-header">
        <button type="button" id="close-chat-sidebar" className="chat-icon-btn" aria-label="Panelni yopish">×</button>
        <button className="chat-new-btn" id="new-chat-btn">
          <span id="txt-new-chat">+ Yangi suhbat</span>
        </button>
      </div>
      <div className="chat-history-container" id="chat-history-container">
        <div className="chat-group-title" id="lbl-group-today">BUGUN</div>
        <div id="sessions-today" />
        <div className="chat-group-title" id="older-title" style={{display: 'none', marginTop: 14}}>OLDIN</div>
        <div id="sessions-older" />
      </div>
      <div className="chat-user-footer">
        <div className="chat-user-profile">
          <div className="chat-user-avatar" id="user-avatar-text">M</div>
          <div>
            <div className="chat-user-name" id="user-display-name">Mehmon foydalanuvchi</div>
          </div>
        </div>
        <button className="chat-config-btn" id="open-settings-btn" title="AI Model & API Sozlamalari">
          <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={3} /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        </button>
      </div>
    </aside>
    {/* Main Chat Container */}
    <main className="chat-main">
      <div className="chat-topbar">
        <div className="chat-top-title">
          <button className="chat-icon-btn" id="toggle-sidebar-btn" title="Yon panelni yopish/ochish">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <span className="chat-status-dot" />
          <span id="chat-session-title">Suv resurslari haqida ayting</span>
        </div>
        <div className="chat-top-actions">
          <button className="chat-icon-btn" id="export-chat-btn" title="Suhbatni nusxalash">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
          </button>
        </div>
      </div>
      {/* Messages Stream */}
      <div className="chat-thread" id="chat-thread">
        <div className="chat-thread-inner" id="messages-container">
          {/* Populated by JavaScript */}
        </div>
      </div>
      {/* Input Area */}
      <div className="chat-input-area">
        <div className="chat-input-container">
          {/* Suggestion pills for quick exploration */}
          <div className="chat-suggestions" id="chat-suggestions" />
          <div className="chat-prompt-box">
            <textarea className="chat-textarea" id="chat-textarea" placeholder="RCGA Assistant'ga savol bering..." rows={1} defaultValue={""} />
            <div className="chat-prompt-actions">
              <button className="chat-send-btn" id="chat-send-btn" title="Yuborish" disabled>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
              </button>
            </div>
          </div>
          <div className="chat-disclaimer" id="lbl-disclaimer">RCGA ASSISTANT XATO QILISHI MUMKIN. MUHIM MA'LUMOTLARNI TEKSHIRING.</div>
        </div>
      </div>
    </main>
  </div>
  {/* Settings Modal (API Key configuration) */}
  <div className="modal-backdrop" id="settings-modal">
    <div className="modal-card">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
        <h3 id="lbl-modal-title" style={{fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--ink-950)'}}>AI Dvigateli Sozlamalari</h3>
        <button id="close-settings-btn" style={{background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--ink-400)'}}>×</button>
      </div>
      <p id="lbl-modal-desc" style={{fontSize: '13.5px', color: 'var(--ink-600)', marginBottom: 16, lineHeight: '1.5'}}>
        Tizim avtomatik ravishda <strong>RCGA Agro-Expert RAG Dvigateli</strong> orqali platforma ilmiy bazasi asosida ishlaydi. Istasangiz, to'g'ridan-to'g'ri tashqi Google Gemini yoki OpenAI API kalitingizni ham ulashingiz mumkin:
      </p>
      <div style={{marginBottom: 14}}>
        <label id="lbl-modal-key" style={{display: 'block', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--ink-500)', marginBottom: 6}}>Google Gemini API Kaliti</label>
        <input type="password" id="gemini-key-input" autoComplete="off" placeholder="AIzaSy..." style={{width: '100%', padding: '10px 12px', border: '1.5px solid var(--ink-200)', borderRadius: 8, fontFamily: 'var(--mono)', fontSize: 13}} />
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20}}>
        <button id="clear-key-btn" className="btn btn-outline btn-sm" style={{padding: '8px 14px', fontSize: '12.5px'}}>Tozalash</button>
        <button id="save-key-btn" className="btn btn-primary btn-sm" style={{padding: '8px 18px', fontSize: '12.5px'}}>Saqlash</button>
      </div>
    </div>
  </div>
  {/* Dedicated Multilingual Chat Application Logic */}
</div>
  </Page>;
}
