import { useLayoutEffect, type ReactNode } from 'react';
import { rcgaInit } from '../assets/app.js';
import { bindAuthForms } from '../assets/api-client.js';
import { initWidget } from '../assets/chatbot-widget.js';
import { PageScope } from './lifecycle';

interface Props {
  page: string;
  title: string;
  description: string;
  bodyClass: string;
  dark: boolean;
  initialize?: (scope: PageScope) => void;
  children: ReactNode;
}

export function Page({ page, title, description, bodyClass, dark, initialize, children }: Props) {
  useLayoutEffect(() => {
    const scope = new PageScope();
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.body.className = bodyClass;
    document.body.dataset.page = page;
    document.body.dataset.darkNav = String(dark);
    rcgaInit(scope);
    bindAuthForms(scope);
    initialize?.(scope);
    if (page !== 'chat' && page !== 'admin' && page !== 'login') initWidget(scope);
    return () => scope.dispose();
  }, [page, title, description, bodyClass, dark, initialize]);

  return <div className="route-page">{children}</div>;
}
