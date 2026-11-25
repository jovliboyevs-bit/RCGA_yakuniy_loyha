import './i18n-engine.js';
import { setHTML } from '../src/security';
// RCGA — interactions, animations, scroll effects

export function rcgaInit(scope) {
  const nav = document.querySelector('.nav');
  const progress = document.querySelector('.scroll-progress');
  const heroMedia = document.querySelector('.hero-media');
  const heroInner = document.querySelector('.hero-inner');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealSelector = '.reveal, .reveal-stagger, .reveal-up, .reveal-fade, .split-reveal, .reveal-image, .reveal-image-left, .reveal-line, .reveal-right, .reveal-zoom, .mask-reveal';

  // ============ SPLIT TEXT REVEAL ============
  document.querySelectorAll('[data-split="words"]').forEach(el => {
    // Preserve HTML — wrap each text node's words in span.split-word > span.split-word-inner
    const walk = (node) => {
      const children = Array.from(node.childNodes);
      children.forEach(child => {
        if (child.nodeType === 3) {
          // text node — split into words
          const text = child.textContent;
          if (!text.trim()) return;
          const frag = document.createDocumentFragment();
          text.split(/(\s+)/).forEach(word => {
            if (/\s+/.test(word)) {
              frag.appendChild(document.createTextNode(word));
            } else if (word) {
              const wrap = document.createElement('span');
              wrap.className = 'split-word';
              const inner = document.createElement('span');
              inner.className = 'split-word-inner';
              inner.textContent = word;
              wrap.appendChild(inner);
              frag.appendChild(wrap);
            }
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          // element — recurse (preserves <em>, <span> etc.)
          walk(child);
        }
      });
    };
    walk(el);
    el.classList.add('split-reveal');
  });

  // ============ COUNT-UP (bulletproof) ============
  function animateCount(el) {
    if (el.dataset.counted === '1') return;
    el.dataset.counted = '1';
    const target = parseInt(el.dataset.count, 10);
    if (reducedMotion.matches) {
      el.textContent = target.toLocaleString();
      return;
    }
    const dur = 1250;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      const val = Math.floor(eased * target).toLocaleString();
      el.textContent = val;
      if (t < 1) scope.requestAnimationFrame(step);
    };
    scope.requestAnimationFrame(step);
  }
  // ============ LANGUAGE SWITCH & I18N TRANSLATION ENGINE ============
  function applyLanguage(lang) {
    if (!lang) return;
    try { localStorage.setItem('rcga_lang', lang); } catch(_){}
    
    // Update button active state (UZ, RU, EN)
    document.querySelectorAll('.lang-switch').forEach(group => {
      group.querySelectorAll('button').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
      });
    });

    // Update CAREC select dropdown if present
    document.querySelectorAll('#carec-lang-select, .carec-select').forEach(sel => {
      sel.value = lang;
    });

    // 1. In-memory dictionary & native attribute translation
    if (window.RCGA_I18N && typeof window.RCGA_I18N.translateDOMWithDict === 'function') {
      window.RCGA_I18N.translateDOMWithDict(lang);
    } else {
      document.querySelectorAll('[data-uz], [data-en], [data-ru]').forEach(el => {
        let val = el.getAttribute(`data-${lang}`);
        if (!val) {
          if (lang === 'ru') val = el.getAttribute('data-ru');
          else if (lang === 'en') val = el.getAttribute('data-en');
          else if (lang === 'uz') val = el.getAttribute('data-uz');
        }
        if (val) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
          else if (val.includes('<') && val.includes('>')) setHTML(el, val);
          else el.textContent = val;
        }
      });
    }

    // 2. Google Translate Automation for full page translation
    if (window.RCGA_I18N && typeof window.RCGA_I18N.triggerGoogleTranslate === 'function') {
      window.RCGA_I18N.triggerGoogleTranslate(lang);
    }

    // 3. Dispatch custom event for dynamic components (chatbot, charts, etc.)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

    // 4. Re-fetch dynamic lists on pages with ?lang query param
    if (typeof loadNews === 'function') { try { loadNews(); } catch(_) {} }
    if (typeof loadPublications === 'function') { try { loadPublications(); } catch(_) {} }
    if (typeof loadEvents === 'function') { try { loadEvents(); } catch(_) {} }
    if (typeof loadInstitutions === 'function') { try { loadInstitutions(); } catch(_) {} }
  }

  window.applyLanguage = applyLanguage;
  scope.onCleanup(() => { delete window.applyLanguage; });
  scope.listen(document, 'change', event => {
    if (event.target.matches('#carec-lang-select')) applyLanguage(event.target.value);
  });

  document.querySelectorAll('.lang-switch').forEach(group => {
    group.querySelectorAll('button').forEach(b => {
      scope.listen(b, 'click', () => {
        applyLanguage(b.dataset.lang);
      });
    });
  });

  try {
    const lang = localStorage.getItem('rcga_lang') || 'uz';
    applyLanguage(lang);
  } catch(_) {}

  // ============ FILTER CHIPS ============
  document.querySelectorAll('.filter-bar').forEach(bar => {
    bar.querySelectorAll('.filter-chip').forEach(chip => {
      scope.listen(chip, 'click', () => {
        bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  });

  // ============ MARQUEE: clone children for seamless scroll ============
  document.querySelectorAll('.marquee-track').forEach(track => {
    const children = Array.from(track.children);
    children.forEach(c => track.appendChild(c.cloneNode(true)));
  });

  const mouseEffects = window.matchMedia('(hover: hover) and (pointer: fine)');
  // ============ MAGNETIC BUTTONS ============
  if (mouseEffects.matches) document.querySelectorAll('[data-magnetic]').forEach(el => {
    scope.listen(el, 'mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    scope.listen(el, 'mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ============ CARD MOUSE TILT ============
  document.querySelectorAll('[data-tilt]').forEach(el => {
    scope.listen(el, 'mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    });
  });

  // ============ GLOW HOVER — track cursor for radial gradient ============
  document.querySelectorAll('.glow-hover, .pub-card, .section-card, .feature-card, .country-chip').forEach(el => {
    scope.listen(el, 'mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty('--mx', `${x}%`);
      el.style.setProperty('--my', `${y}%`);
    });
  });

  // ============ CUSTOM CURSOR (desktop only) ============
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !document.querySelector('.rcga-cursor')) {
    const cursor = document.createElement('div');
    cursor.className = 'rcga-cursor';
    setHTML(cursor, '<span class="rcga-cursor-dot"></span><span class="rcga-cursor-ring"></span>');
    document.body.appendChild(cursor);
    scope.onCleanup(() => cursor.remove());
    let tx = 0, ty = 0, cx = 0, cy = 0;
    scope.listen(window, 'mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    const animate = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      scope.requestAnimationFrame(animate);
    };
    animate();
    document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
      scope.listen(el, 'mouseenter', () => cursor.classList.add('hover'));
      scope.listen(el, 'mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ============ CURSOR SPOTLIGHT ============
  document.querySelectorAll('.spotlight').forEach(el => {
    scope.listen(el, 'mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty('--sx', `${x}%`);
      el.style.setProperty('--sy', `${y}%`);
    });
  });

  // ============ 3D TILT CARDS ============
  if (mouseEffects.matches) document.querySelectorAll('.tilt-card').forEach(el => {
    let rafId = null;
    el.style.perspective = '1000px';
    scope.listen(el, 'mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = scope.requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg)`;
      });
    });
    scope.listen(el, 'mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // ============ KINETIC LETTER SPLITTER ============
  document.querySelectorAll('[data-kinetic]').forEach(el => {
    const text = el.textContent;
    setHTML(el, '');
    el.classList.add('kinetic');
    const inner = document.createElement('span');
    inner.className = 'kinetic-inner';
    text.split('').forEach(ch => {
      const c = document.createElement('span');
      c.className = 'kinetic-char';
      c.textContent = ch === ' ' ? '\u00A0' : ch;
      inner.appendChild(c);
    });
    el.appendChild(inner);
  });

  // ============ DECORATIVE LINE DRAW ============
  document.querySelectorAll('.draw-line').forEach(line => {
    const lio = scope.observe(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('drawn');
          lio.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    lio.observe(line);
  });

  // Read geometry once per frame and drop targets after their first reveal.
  const pending = new Set(document.querySelectorAll(revealSelector + ', [data-count]'));
  let queued = false;
  function updateScroll() {
    queued = false;
    const y = window.scrollY;
    const height = window.innerHeight;
    const max = document.documentElement.scrollHeight - height;
    const reduced = reducedMotion.matches;
    const visible = [...pending].filter(el => {
      if (reduced || el.contains(document.activeElement)) return true;
      const rect = el.getBoundingClientRect();
      return rect.top < height + 48 && rect.bottom > -48;
    });

    nav?.classList.toggle('scrolled', y > 40);
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, y / max)) : 0})`;
    if (heroMedia && heroInner && mouseEffects.matches) {
      const offset = Math.min(height, Math.max(0, y));
      heroMedia.style.transform = reduced ? '' : `translate3d(0, ${offset * 0.18}px, 0)`;
      heroInner.style.transform = reduced ? '' : `translate3d(0, ${offset * -0.06}px, 0)`;
      heroMedia.style.opacity = reduced ? '' : String(1 - offset / height * 0.22);
    }
    visible.forEach(el => {
      pending.delete(el);
      if (el.matches(revealSelector)) el.classList.add('in');
      if (el.hasAttribute('data-count')) animateCount(el);
    });
  }
  function queueScroll() {
    if (queued) return;
    queued = true;
    scope.requestAnimationFrame(updateScroll);
  }
  scope.listen(window, 'scroll', queueScroll, { passive: true });
  scope.listen(window, 'resize', queueScroll, { passive: true });
  scope.listen(document, 'focusin', queueScroll);
  scope.listen(document, 'load', queueScroll, true);
  scope.listen(reducedMotion, 'change', queueScroll);
  if (document.fonts) document.fonts.ready.then(queueScroll);
  updateScroll();
}
