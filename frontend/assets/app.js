// RCGA — interactions, animations, scroll effects

function rcgaInit() {
  const nav = document.querySelector('.nav');

  // ============ NAV SCROLL ============
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ============ REVEAL ANIMATIONS (bulletproof scroll-based) ============
  const revealSelector = '.reveal, .reveal-stagger, .reveal-up, .reveal-fade, .split-reveal, .reveal-image, .reveal-image-left, .reveal-line, .reveal-right, .reveal-zoom, .mask-reveal';

  function checkReveals() {
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    // Trigger BEFORE element enters visible range (generous) — bulletproof for iframes
    const trigger = vh * 1.1;
    document.querySelectorAll(revealSelector).forEach(el => {
      if (el.classList.contains('in')) return;
      const r = el.getBoundingClientRect();
      if (r.top < trigger && r.bottom > -200) {
        el.classList.add('in');
      }
    });
  }

  // Try IntersectionObserver first (better perf), fallback to scroll if unsupported
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll(revealSelector).forEach(el => io.observe(el));
  }

  // Always also run scroll fallback — bulletproof against iframe quirks
  window.addEventListener('scroll', checkReveals, { passive: true });
  window.addEventListener('resize', checkReveals, { passive: true });
  document.addEventListener('scroll', checkReveals, { passive: true, capture: true });

  // Run repeatedly after load to catch layout shifts from fonts/images
  checkReveals();
  requestAnimationFrame(checkReveals);
  setTimeout(checkReveals, 50);
  setTimeout(checkReveals, 200);
  setTimeout(checkReveals, 600);
  setTimeout(checkReveals, 1500);
  // Absolute last-resort: reveal EVERYTHING after 3s (in case iframe scroll events never fire)
  setTimeout(() => {
    document.querySelectorAll(revealSelector).forEach(el => el.classList.add('in'));
    document.querySelectorAll('[data-count]').forEach(el => { if (el.dataset.counted !== '1') animateCount(el); });
  }, 3000);

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
    // Use CSS ::before content via CSS variable (bypasses any DOM text manager)
    el.classList.add('has-counter');
    const dur = 2200;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      const val = Math.floor(eased * target).toLocaleString();
      el.style.setProperty('--counter-val', `"${val}"`);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function checkCounters() {
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    document.querySelectorAll('[data-count]').forEach(el => {
      if (el.dataset.counted === '1') return;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 1.1 && r.bottom > -200) {
        animateCount(el);
      }
    });
  }
  window.addEventListener('scroll', checkCounters, { passive: true });
  checkCounters();
  setTimeout(checkCounters, 300);
  setTimeout(checkCounters, 1000);

  // ============ LANGUAGE SWITCH & I18N TRANSLATION ENGINE ============
  function applyLanguage(lang) {
    if (!lang) return;
    try { localStorage.setItem('rcga_lang', lang); } catch(_){}
    
    // Update button active state
    document.querySelectorAll('.lang-switch').forEach(group => {
      group.querySelectorAll('button').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
      });
    });

    // Update CAREC select dropdown if present
    document.querySelectorAll('#carec-lang-select, .carec-select').forEach(sel => {
      sel.value = lang;
    });

    // Translate DOM elements with data-[lang] attributes (with fallback to en or uz)
    document.querySelectorAll('[data-uz], [data-en], [data-ru], [data-kk], [data-ky], [data-tg], [data-tk]').forEach(el => {
      const val = el.getAttribute(`data-${lang}`) || el.getAttribute('data-en') || el.getAttribute('data-uz');
      if (val) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else if (val.includes('<') && val.includes('>')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Dispatch custom event for dynamic components (chatbot, charts, etc.)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

    // Re-fetch dynamic lists on pages if functions exist
    if (typeof loadNews === 'function') { try { loadNews(); } catch(_) {} }
    if (typeof loadPublications === 'function') { try { loadPublications(); } catch(_) {} }
    if (typeof loadEvents === 'function') { try { loadEvents(); } catch(_) {} }
    if (typeof loadInstitutions === 'function') { try { loadInstitutions(); } catch(_) {} }
  }

  window.applyLanguage = applyLanguage;

  document.querySelectorAll('.lang-switch').forEach(group => {
    group.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
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
      chip.addEventListener('click', () => {
        bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  });

  // ============ HERO PARALLAX + KEN BURNS ============
  const heroMedia = document.querySelector('.hero-media');
  const heroInner = document.querySelector('.hero-inner');
  if (heroMedia) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroMedia.style.transform = `translate3d(0, ${y * 0.4}px, 0)`;
        if (heroInner) heroInner.style.transform = `translate3d(0, ${y * -0.15}px, 0)`;
        heroMedia.style.opacity = String(Math.max(0, 1 - y / window.innerHeight * 0.6));
      }
    }, { passive: true });
  }

  // ============ MARQUEE: clone children for seamless scroll ============
  document.querySelectorAll('.marquee-track').forEach(track => {
    const children = Array.from(track.children);
    children.forEach(c => track.appendChild(c.cloneNode(true)));
  });

  // ============ MAGNETIC BUTTONS ============
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ============ CARD MOUSE TILT ============
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    });
  });

  // ============ GLOW HOVER — track cursor for radial gradient ============
  document.querySelectorAll('.glow-hover, .pub-card, .section-card, .feature-card, .country-chip').forEach(el => {
    el.addEventListener('mousemove', (e) => {
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
    cursor.innerHTML = '<span class="rcga-cursor-dot"></span><span class="rcga-cursor-ring"></span>';
    document.body.appendChild(cursor);
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    const animate = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(animate);
    };
    animate();
    document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ============ CURSOR SPOTLIGHT ============
  document.querySelectorAll('.spotlight').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty('--sx', `${x}%`);
      el.style.setProperty('--sy', `${y}%`);
    });
  });

  // ============ 3D TILT CARDS ============
  document.querySelectorAll('.tilt-card').forEach(el => {
    let rafId = null;
    el.style.perspective = '1000px';
    el.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg)`;
      });
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // ============ KINETIC LETTER SPLITTER ============
  document.querySelectorAll('[data-kinetic]').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
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
    const lio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('drawn');
          lio.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    lio.observe(line);
  });

  // ============ SCROLL PROGRESS BAR ============
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      progress.style.transform = `scaleX(${pct / 100})`;
    }, { passive: true });
  }
}

// Run immediately if DOM is already parsed, else wait for it.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', rcgaInit);
} else {
  rcgaInit();
}
