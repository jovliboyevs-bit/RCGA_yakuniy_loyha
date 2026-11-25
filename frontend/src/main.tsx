import { Component, Suspense, lazy, useEffect, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles.css';
import './shell.css';
import { discardLegacySession } from '../assets/api-client.js';

import { restoreTab } from './browser-session';

const pages = {
  index: lazy(() => import('./pages/index')),
  about: lazy(() => import('./pages/about')),
  publications: lazy(() => import('./pages/publications')),
  'publication-detail': lazy(() => import('./pages/publication-detail')),
  news: lazy(() => import('./pages/news')),
  events: lazy(() => import('./pages/events')),
  institutions: lazy(() => import('./pages/institutions')),
  search: lazy(() => import('./pages/search')),
  login: lazy(() => import('./pages/login')),
  admin: lazy(() => import('./pages/admin')),
  chat: lazy(() => import('./pages/chat')),
};

class PageError extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <main className="container"><h1>Sahifa yuklanmadi</h1><a href="/index.html" onClick={() => window.location.reload()}>Qayta yuklash</a></main>
      : this.props.children;
  }
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.pathname === '/' ? 'index' : location.pathname.slice(1).replace(/\.html$/, '');
  const RoutePage = Object.hasOwn(pages, name) ? pages[name as keyof typeof pages] : undefined;

  useEffect(() => {
    function followLink(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href);
      const route = url.pathname === '/' ? 'index' : url.pathname.slice(1).replace(/\.html$/, '');
      if (url.origin !== window.location.origin || !Object.hasOwn(pages, route)) return;
      if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
      event.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    }
    function followAction(event: Event) {
      const url = new URL((event as CustomEvent<string>).detail, window.location.href);
      if (url.origin === window.location.origin) navigate(url.pathname + url.search + url.hash);
    }
    document.addEventListener('click', followLink);
    window.addEventListener('rcga:navigate', followAction);
    return () => {
      document.removeEventListener('click', followLink);
      window.removeEventListener('rcga:navigate', followAction);
    };
  }, [navigate, location.pathname, location.search]);

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return <PageError key={location.key}>
    <Suspense fallback={<p role="status">Yuklanmoqda…</p>}>
      {RoutePage ? <RoutePage /> : <main className="container"><h1>Sahifa topilmadi</h1><a href="/index.html">Bosh sahifa</a></main>}
    </Suspense>
  </PageError>;
}

discardLegacySession();
void restoreTab().then(() => {
  createRoot(document.getElementById('root')!).render(<BrowserRouter><App /></BrowserRouter>);
});
