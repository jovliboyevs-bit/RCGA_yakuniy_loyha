import { useEffect, useRef, useState } from 'react';

export const countries = [
  ['UZ','uz',"O‘zbekiston",'Uzbekistan','Узбекистан',"O‘zbekcha"],
  ['KZ','kk',"Qozog‘iston",'Kazakhstan','Казахстан','Қазақша'],
  ['KG','ky',"Qirg‘iziston",'Kyrgyzstan','Кыргызстан','Кыргызча'],
  ['TJ','tg','Tojikiston','Tajikistan','Таджикистан','Тоҷикӣ'],
  ['TM','tk','Turkmaniston','Turkmenistan','Туркменистан','Türkmençe'],
  ['AZ','az','Ozarbayjon','Azerbaijan','Азербайджан','Azərbaycanca'],
  ['GE','ge','Gruziya','Georgia','Грузия','ქართული'],
  ['MN','mn',"Mo‘g‘uliston",'Mongolia','Монголия','Монгол'],
  ['CN','zh','Xitoy','China','Китай','中文'],
  ['RU','ru','Rossiya','Russia','Россия','Русский'],
  ['GB','en','Buyuk Britaniya','United Kingdom','Великобритания','English'],
] as const;

export function LanguageMenu() {
  const [lang, setLang] = useState(() => localStorage.getItem('rcga_lang') || 'uz');
  const root = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const update = () => setLang(localStorage.getItem('rcga_lang') || 'uz');
    const close = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) root.current.open = false;
    };
    window.addEventListener('languageChanged', update);
    document.addEventListener('pointerdown', close);
    return () => {
      window.removeEventListener('languageChanged', update);
      document.removeEventListener('pointerdown', close);
    };
  }, []);
  function dismiss() {
    if (root.current) {
      root.current.open = false;
      root.current.querySelector('summary')?.focus();
    }
  }
  return <details className="locale-menu" ref={root} onKeyDown={e => { if (e.key === 'Escape') dismiss(); }}>
    <summary>{countries.find(c => c[1] === lang)?.[5] || 'O‘zbekcha'}</summary>
    <div className="locale-options">{countries.map(([code, key,,, , label]) =>
      <button type="button" key={key} aria-pressed={lang === key} onClick={() => { window.applyLanguage?.(key); dismiss(); }}>
        <small>{code}</small>{label}
      </button>)}</div>
  </details>;
}
