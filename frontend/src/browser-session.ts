interface User {
  id: number;
  full_name?: string;
  email?: string;
  role: string;
}

interface Session {
  generation: string;
  token: string;
  user: User;
  expiresAt: number;
}

let session: Session | null = null;
let aiKey = '';
const makeChatState = () => ({ sessions: [], activeId: '', draft: '' });
let chat = makeChatState();

const AUTH = 'rcga.tab.auth';
const OWNER = 'rcga.session.id';
const CHAT = 'rcga.tab.chat';
const KEY = 'rcga.tab.ai';

function readTab(key: string) {
  try { return sessionStorage.getItem(key); } catch { return null; }
}

function writeTab(key: string, value: string | null) {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch { /* In-memory state still works if storage is full or unavailable. */ }
}

function newSessionId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');
}

function generation() {
  try { return localStorage.getItem(OWNER); } catch { return undefined; }
}

function valid(value: Session | null): value is Session {
  const owner = generation();
  return !!value && typeof value.token === 'string' && !!value.token &&
    typeof value.generation === 'string' && Number.isSafeInteger(value.user?.id) &&
    typeof value.user.role === 'string' && Number.isFinite(value.expiresAt) &&
    value.expiresAt > Date.now() && (owner === undefined || owner === value.generation);
}

export async function restoreTab() {
  try {
    const saved = JSON.parse(readTab(AUTH) || 'null');
    if (saved && !valid(saved)) resetTab();
    else session = saved;
    aiKey = readTab(KEY) || '';
    const history = JSON.parse(readTab(CHAT) || 'null');
    if (history && typeof history.activeId === 'string' && typeof history.draft === 'string' &&
        Array.isArray(history.sessions) && history.sessions.every((s: { id: string; title: string; messages: { content?: unknown; sources?: unknown }[] }) =>
          s && typeof s.id === 'string' && typeof s.title === 'string' && Array.isArray(s.messages) &&
          s.messages.every(m => m && typeof m.content === 'string' && (!m.sources || Array.isArray(m.sources))))) chat = history;
  } catch { resetTab(); }

  window.addEventListener('storage', event => {
    if ((event.key === OWNER || event.key === null) && (session?.generation ?? null) !== generation()) {
      resetTab();
      window.location.reload();
    }
  });
  let peer: BroadcastChannel;
  try { peer = new BroadcastChannel('rcga.open-tabs'); } catch { return; }
  peer.onmessage = ({ data }) => {
    if (data?.type === 'request' && getSession()) peer.postMessage({ type: 'reply', id: data.id, session });
  };
  if (session || !generation()) return;
  const id = newSessionId();
  await new Promise<void>(resolve => {
    const finish = () => {
      peer.removeEventListener('message', receive);
      clearTimeout(timer);
      resolve();
    };
    const receive = ({ data }: MessageEvent) => {
      if (data?.type !== 'reply' || data.id !== id || !valid(data.session)) return;
      resetTab();
      session = data.session;
      writeTab(AUTH, JSON.stringify(session));
      finish();
    };
    const timer = window.setTimeout(finish, 500);
    peer.addEventListener('message', receive);
    peer.postMessage({ type: 'request', id });
  });
}

export function getSession() {
  if (session && !valid(session)) resetTab();
  return session;
}

export function startSession(token: string, user: User, expiresIn = 1800) {
  if (typeof token !== 'string' || !token || !Number.isSafeInteger(user?.id) || typeof user.role !== 'string') {
    throw new Error('Kirish ma’lumotlari yaroqsiz.');
  }
  resetTab();
  const id = newSessionId();
  session = { generation: id, token, user, expiresAt: Date.now() + (Number.isFinite(expiresIn) && expiresIn > 0 ? expiresIn : 1800) * 1000 };
  writeTab(AUTH, JSON.stringify(session));
  try { localStorage.setItem(OWNER, id); } catch { /* Tab-only mode. */ }
}

export function clearSession() {
  if (session && session.generation === generation()) {
    try { localStorage.removeItem(OWNER); } catch { /* Storage unavailable. */ }
  }
  resetTab();
}

function resetTab() {
  for (const key of [AUTH, CHAT, KEY]) writeTab(key, null);
  session = null;
  aiKey = '';
  chat = makeChatState();
}

export function getAIKey() { getSession(); return aiKey; }
export function setAIKey(value: string) { aiKey = value; writeTab(KEY, value || null); }
export function getChatState() { getSession(); return chat; }
export function saveChatState() { writeTab(CHAT, JSON.stringify(getChatState())); }

// Discard persisted credentials left by older frontend builds.
export function removeLegacyCredentials() {
  try {
    const token = localStorage.getItem('rcga_token');
    for (const key of ['rcga_token', 'rcga_user', 'rcga_ai_key']) localStorage.removeItem(key);
    return token;
  } catch { return null; }
}
