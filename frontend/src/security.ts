import DOMPurify from 'dompurify';

// Only legacy rich text uses HTML; React renders page markup and user labels.
export function setHTML(element: Element, markup: string) {
  element.innerHTML = DOMPurify.sanitize(markup, {
    USE_PROFILES: { html: true, svg: true },
    FORBID_TAGS: ['style', 'iframe', 'form'],
    FORBID_ATTR: ['srcdoc'],
  });
}

export function setMessageHTML(element: Element, markup: string) {
  element.innerHTML = DOMPurify.sanitize(markup, {
    ALLOWED_TAGS: ['a', 'br', 'code', 'div', 'em', 'li', 'ol', 'p', 'span', 'strong', 'ul'],
    ALLOWED_ATTR: ['class', 'href', 'title'],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
  });
}

export function publicationSourceURL(value: unknown) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    if (url.pathname === '/publications.html') return url.pathname;
    const id = url.searchParams.get('id');
    if (url.pathname === '/publication-detail.html' && id && /^[1-9][0-9]*$/.test(id)) {
      return `${url.pathname}?id=${id}`;
    }
  } catch { /* Invalid URLs have no clickable target. */ }
  return null;
}

export function escapeHTML(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!);
}
