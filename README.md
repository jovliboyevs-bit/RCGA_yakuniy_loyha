# Handoff: RCGA Digital Platform

## Overview

RCGA (Regional Center for Green Agriculture) — CAREC mintaqasi (8 davlat) bo'ylab yashil qishloq xo'jaligi, iqlimga moslashgan dehqonchilik va raqamli agrosanoat sohasidagi bilim va innovatsiyalar platformasi. Bu handoff paketida asosiy sahifa (home) va uning bilan bog'liq 8 ta ichki sahifa (About, Publications, Publication Detail, News, Events, Institutions, Search, Login/Register) uchun to'liq dizayn ma'lumotlari beriladi.

## About the Design Files

**Bu bundle'dagi fayllar HTML da yaratilgan dizayn ma'lumotnomalari (design references)** — mo'ljallangan ko'rinish va xatti-harakatni ko'rsatuvchi prototiplar, to'g'ridan-to'g'ri ishlab chiqarishga tayyor kod emas.

Vazifa — ushbu HTML dizaynlarini **maqsadli kod bazasining mavjud muhitida qayta yaratish** (React, Next.js, Vue, Nuxt yoki boshqa), o'rnatilgan naqshlar va kutubxonalardan foydalanib. Agar hozircha muhit tanlanmagan bo'lsa, loyihaga eng mos framework tanlab, dizaynlarni shu yerda amalga oshirish tavsiya etiladi.

Tavsiya etilgan stack (yangi loyiha uchun):
- **Next.js 14+** (App Router) + TypeScript
- **Tailwind CSS** (design tokens'lar quyida keltirilgan)
- **Framer Motion** (murakkab animatsiyalar uchun) yoki oddiy CSS animations
- **next/font** (Fraunces, Inter Tight, JetBrains Mono lokalizatsiyasi uchun)
- **next/image** (rasm optimallashuvi)

## Fidelity

**High-fidelity (hifi)** — pixel-perfect maketlar:
- Yakuniy ranglar (aniq hex qiymatlari quyida)
- Yakuniy tipografika (Fraunces + Inter Tight + JetBrains Mono, aniq o'lchamlar)
- Aniq spacing, border-radius, shadow qiymatlari
- Barcha hover / active / focus holatlari
- Reveal animatsiyalari (blur + slide + scale)

Ishlab chuvchi UI ni piksel-mukammal ravishda qayta yaratishi kerak, ammo kod bazasining mavjud kutubxonalari va naqshlaridan foydalanib.

## Screens / Views

### 1. Bosh sahifa (Home) — `index.html`

**Maqsad:** Foydalanuvchini platformaga qiziqtirish, asosiy bo'limlarga navigatsiya berish, statistika va oxirgi kontent bilan tanishtirish.

**Layout:** Vertikal scroll, `max-width: 1520px` (--container-wide-max), gutter 32px.

**Bo'limlar (yuqoridan pastga):**

1. **Sticky Nav** (fixed, top: 0, z: 100)
   - Chap: Logo (44x44 yashil kvadrat, ichida serif "R") + "RCGA / DIGITAL PLATFORM"
   - Markaz: Nav links (Bosh sahifa, RCGA Haqida, Nashrlar, Yangiliklar, Tadbirlar, Muassasalar, Qidiruv)
   - O'ng: Til o'tkazgich (UZ/RU/EN pill) + "Kirish" tugmasi
   - `.nav.dark` (hero ustida): oq matn; scroll paytida oq fon + backdrop-blur

2. **Hero** (min-height: 100vh)
   - Full-screen fon rasmi (`assets/hero-wheat-field.jpg`) + dark gradient overlay
   - `hero-serial` ("01" — 220px serif italic, opacity 0.08, top-right)
   - `hero-map` SVG (Markaziy Osiyo xaritasi, 8 davlat nuqtalari pulsatsiyasi, ulanish chiziqlari)
   - `hero-meta-row`: mono uppercase — brand + coordinates
   - H1 (120px serif, split-words animation): "Yashil qishloq xo'jaligi uchun mintaqaning *ilmiy ovozi.*"
   - Hero lead (19px, oq, max-width 580px)
   - CTA: Primary "Ilmiy bazani o'rganish" + Ghost "Yaqinlashayotgan tadbirlar"
   - Scroll cue (bottom-center, pulsatsiya chizig'i)

3. **Marquee** (`--ink-950` fonda, 40px vertical padding)
   - Cheksiz aylanuvchi lenta (40s linear), 7 ta keyword ✦ ajratgichlar bilan

4. **Stats** (`.bg-dark`)
   - Section label (mono uppercase) + h2 "Bir platforma. *Sakkiz davlat.* Cheksiz imkoniyatlar."
   - 4 ustunli grid, har biri: mono label + katta serif raqam (count-up animation) + tavsif
   - Raqamlar: 8, 1,240+, 86+, 5,400+

5. **Why RCGA — Numbered List**
   - Section head: 1.2fr / 1fr grid
   - `numbered-list` — 2 ustunli grid, 4 ta band
   - Har biri: 72px serif italic "i. / ii. / iii. / iv." + h4 + p
   - Ornament ("✦ ✦ ✦") pastda

6. **Big Type Quote** (`.bg-cream`)
   - `quote-mark` (160px yashil italic ")
   - 92px serif quote: "Iqlim o'zgarishi *chegara bilmaydi.* Demak..."
   - Avatar (64px yashil circle) + author name + role

7. **Platforma bo'limlari — Index List**
   - `index-list` — 6 ta band, har biri 80px/1fr/auto grid
   - Har bir band: yashil serif italik raqam (28px) + nom (28px Fraunces) + tavsif (14px Inter Tight) + count (11px mono uppercase)
   - Hover: 24px padding kengayadi, fon `--ink-50` bo'ladi, count yashilga o'zgaradi

8. **Latest Publications** (`.bg-cream`)
   - Card-grid — 3 ta pub-card
   - Har biri: 16/10 img + badge + meta + h4 + excerpt + author + arrow
   - Hover: `translateY(-6px)`, yashil radial glow cursor bilan yuradi

9. **Image + Missiya Story**
   - 1.05fr / 1fr grid, 100px gap
   - Chap: `reveal-image` clip-path animation bilan rasm + rotating badge (CAREC circular text) + caption (glassmorphic)
   - O'ng: section-label + h2 + lead + hairline divider + btn-link

10. **Feature Cards — Ta'sir ko'lami** (`.bg-cream`)
    - 3 ustunli grid: "27%", "3.2k", "+11%"
    - Katta 88px serif italic raqam + h4 + p
    - Hover: yashil border, translateY(-6px), shadow, raqam scale(1.05)

11. **Upcoming Events**
    - Section head + event-row (200px/1fr/auto grid)
    - Sana (serif 32px) / event-title + tags / arrow (56px circle)
    - Hover: cream fon o'ngdan kirib keladi, chapga/o'ngga 24px padding

12. **Countries — Sakkiz davlat** (`.bg-green-900`)
    - 8 ustunli grid, `country-chip` aspect-ratio: 1
    - Har biri: `country-code` (40px serif) + `country-name` (10px mono)
    - Hover: yashil to'lqin pastdan yuqoriga

13. **CTA blok** (`.cta-block`)
    - Quyuq yashil fon + radial gradients + dot pattern
    - h2 (96px) "Hamjamiyatga *qo'shiling.*"
    - Oq button "Ro'yxatdan o'tish — Bepul"

14. **Metric strip** (footer oldida)
    - Dark bar, mono uppercase, live indicator (yashil dot pulse)

15. **Big Footer Display**
    - 240px serif "RCGA *2026.*" (yashil accent)
    - Pastda 3 kichik mono uppercase meta

16. **Footer** (`#060807` fon)
    - 4 ustun: Brand + Platform + Hamjamiyat + Hisob
    - Copyright + till switcher

### 2. RCGA Haqida — `about.html`

- Page hero (cream fon, halftone dots, breadcrumbs)
- Intro: 1fr/1fr grid + katta rasm + pull-quote
- Qadriyatlar: numbered-list (4 ta)
- Yetakchilik jamoasi: 3 ta pub-card (avatar bo'lib serif harflar)
- Tarix: event-row shaklidagi timeline
- CTA

### 3. Publications — `publications.html`

- Page hero + search-bar + filter-chip lentasi (8 kategoriya)
- 3 ustunli card-grid (9 ta pub-card)
- "Yana yuklash" pastda

### 4. Publication Detail — `publication-detail.html`

- Metadata hero (tags, h1, mualliflar, DOI, sana)
- 1fr/280px grid: article body + sticky aside (statistika, tegli)
- Katta serif quote
- 3 ta metrika kartochka (27%, +11%, 3200)
- Bog'liq nashrlar grid

### 5. News — `news.html`

- Page hero + featured post (1.2fr/1fr split kart, katta rasm + katta h2)
- Filter chips
- 3 ustunli grid (9 ta yangilik pub-card)

### 6. Events — `events.html`

- Page hero + featured event (yashil quyuq bloк, 1/1 grid)
- Filter chips ("Yaqinlashayotgan", "Bu oy" va h.k.)
- 8 ta event-row timeline

### 7. Institutions — `institutions.html`

- Page hero + 8 ta country-chip (UZ active bilan)
- 6 ta muassasa: pub-card horizontal layoutda (180px logo blok + body)
- Xalqaro hamkorlar: 4x2 grid, bordered (FAO, ICARDA, GIZ va h.k.)

### 8. Search — `search.html`

- Page hero + katta search-bar + mashhur so'rovlar
- 260px sidebar (filter checkboxes, ranges) + main results
- Result har biri 200px img / 1fr grid + highlighted match

### 9. Login / Register — `login.html`

- 1fr / 1.1fr split-screen
- Chap: hero rasm + dark green overlay + brend + katta italik quote
- O'ng: pill tabs (Kirish / Ro'yxat) + OAuth (Google, LinkedIn) + form

## Interactions & Behavior

### Sticky Nav
- `scroll > 40px` — `.scrolled` classi qo'shiladi, oq fon + `backdrop-filter: blur(20px)` + border-bottom
- Dark hero'larda nav `.dark` classi bilan boshlanadi, scroll paytida yorug' fonga qaytadi

### Scroll Progress Bar
- Top 2px yashil chiziq (`--green-700`)
- `transform: scaleX()` orqali sahifadagi scroll foizini ko'rsatadi

### Reveal Animations (scroll-triggered)
Barcha ochilib keladigan elementlarda:
- **`.reveal`**: `opacity: 0 → 1`, `translateY(60px) → 0`, `scale(0.98) → 1`, `blur(10px) → 0`, 1.2s cubic-bezier(0.22, 1, 0.36, 1)
- **`.reveal-stagger > *`**: yuqoridagi effekt + har bir child 70-110ms delay bilan (nth-child selectors)
- **`.reveal-fade`**: faqat opacity + blur, 1.6s
- **`.reveal-image`**: `clip-path: inset(0 0 100%) → inset(0)`, 1.6s cubic-bezier(0.77, 0, 0.175, 1) + ichidagi img `scale(1.15) → 1`
- **`.split-reveal`** (h1 uchun): har bir so'z `.split-word > .split-word-inner`, `translateY(100%) + rotate(3deg) + blur(12px) → 0`

### Count-up
- Stats raqamlari `0 → target` gacha 2200ms, `1 - (1-t)^4` easing
- **Muhim**: DOM text manager framework matnni bloklashi mumkin. Yechim — `::before content: var(--counter-val)` orqali CSS variable ishlatiladi. Yoki tabiiy holda `textContent` yangilanadi (target framework nima kutayotganiga qarab).

### Stat Number Pulse
- Reveal paytida `scale(0.85) → 1.05 → 1`, opacity 0 → 1, blur 15 → 0 (1.4s)

### Hero Parallax
- Scroll paytida `hero-media` `translateY(scrollY * 0.4)`, `hero-inner` `translateY(scrollY * -0.15)`
- Fon opacity scroll bilan pasayadi

### Hover Effects

**Pub-card, section-card, feature-card**:
- Mouse move — `--mx`, `--my` CSS variables set qilinadi
- `::before` — `radial-gradient(400-500px at var(--mx) var(--my), rgba(46,157,92,0.10-0.14))`
- Card: `translateY(-4 → -6px)` + border yashil + `shadow 24-32px`

**Country chip**:
- Hover: yashil fon pastdan yuqoriga (0 → 100% height, 0.4s)
- Text oq bo'ladi

**Event row**:
- Hover: fon chapdan (0 → 100% width), padding-left/right `0 → 24px`
- Arrow icon `rotate(-45deg) + scale(1.08)`, oq matn

**Section card**:
- Cream fon + yashil radial glow, arrow rotate(-45deg)

**Buttons**:
- `.btn::before` — pastdan yuqoriga oq overlay (translateY 101% → 0)
- Primary: `translateY(-2px) + shadow`

**Magnetic buttons** (`[data-magnetic]`):
- Mouse move — button `translate(x * 0.18, y * 0.18)`

### Custom Cursor (desktop only)
- 6px dot + 32px ring, `mix-blend-mode: difference`, lerp animation
- `.hover` da: dot 0px, ring 56px

### Marquee
- 40s linear infinite, `translateX(0 → -50%)`
- JS orqali bolalar clone qilinadi (seamless loop)
- Mask: 90deg linear-gradient (chetdan qattiq matn ko'rinmaydi)

### Rotating Badges
- SVG `<textPath>` orqali aylana bo'ylab matn
- `animation: rotateSlow 20-30s linear infinite`
- Sticky "Yuqoriga" tugma — 100px circle, bottom-right, hover'da scale(1.05)

### Filter Chips
- Bir vaqtda bittasi active
- Active: qora fon, oq matn
- Hover: qora border, ink-50 fon

### Language Switch
- 3 til (UZ/RU/EN pill), tanlangan yashil fon
- `localStorage.setItem('rcga_lang', lang)`

## State Management

- `scrollY` — nav va progress bar
- `IntersectionObserver` + scroll fallback — reveal elementlari
- Filter chip active state — DOM class
- Language selection — `localStorage.rcga_lang`

Real ilovada qo'shimcha state:
- Auth (Kirish holati)
- Til (kontent locale)
- Publications, News, Events ma'lumotlar (API dan)
- Search query + filterlar
- Pagination

## Design Tokens

### Colors

**Green (asosiy brend)**:
```
--green-950: #061d10
--green-900: #0c321c
--green-800: #134529
--green-700: #1a6b3a  ← asosiy accent
--green-600: #228048
--green-500: #2e9d5c
--green-400: #4ab574
--green-300: #82d4a3
--green-100: #d6eedd
--green-50:  #ecf6ef
```

**Neutrals (warm)**:
```
--ink-950: #08090a
--ink-900: #101413  ← asosiy matn
--ink-800: #1c211f
--ink-700: #2a302d
--ink-600: #4a514d  ← body copy
--ink-500: #6e756f
--ink-400: #9aa19c
--ink-300: #c5cac3
--ink-200: #e5e7e0  ← borderlar
--ink-100: #f0f1ea
--ink-50:  #f7f7f1
```

**Aksentlar**:
```
--cream:  #f3efe3  ← issiq fon
--cream-2:#ebe5d3
--gold:   #b08648  ← tag rangi
--rust:   #a14b2c  ← tag rangi
```

### Typography

**Shriftlar**:
- **Fraunces** (variable, opsz 9..144, wght 300..700, SOFT 0..100, WONK 0..1, italic support) — h1-h4, quote, katta raqamlar, big display
  - Standart axes: `font-variation-settings: "SOFT" 100, "WONK" 0, "opsz" 144`
  - Italik (em) axes: `"SOFT" 100, "WONK" 1, "opsz" 144`
- **Inter Tight** (300/400/500/600/700) — body, lead, buttons
- **JetBrains Mono** (400/500) — labels, metadata, tags

**Fluid scale** (`clamp(min, preferred, max)`):
```
h1: clamp(48px, 7vw, 120px)   line-height 0.95   letter-spacing -0.035em   weight 300
h2: clamp(36px, 5vw, 76px)    line-height 0.98   letter-spacing -0.030em   weight 300
h3: clamp(26px, 2.8vw, 42px)  line-height 1.05   letter-spacing -0.025em   weight 400
h4: clamp(20px, 2vw, 28px)    line-height 1.12   letter-spacing -0.020em   weight 400

body: 16px    line-height 1.55
lead: clamp(17px, 1.25vw, 21px)  line-height 1.55

eyebrow / mono label: 11px    letter-spacing 0.18em    uppercase    weight 500
tag:                 10-11px  letter-spacing 0.12-0.14em uppercase  weight 500

hero-serial:  clamp(80px, 14vw, 220px) italic
big footer:   clamp(72px, 15vw, 240px)

stat-num:     clamp(64px, 9vw, 124px)
event-title:  32px
event-date:   32px
feature-card-big: 88px italic
```

### Spacing Scale

- Container gutter: **32px**
- Section vertical padding: **140px** (default), **80px** (sm), **60px** (tight)
- Card padding: **48px 40px** (feature), **28px** (pub-card body), **56px 44px** (section-card)
- Grid gaps: **32px** (card-grid), **40px** (card-grid-2), **80-100px** (section-head), **48px** (index-item)

### Border Radius

- `--radius-sm: 4px` (default btn, filters shishalar)
- `--radius-md: 12px` (cards, images)
- `--radius-lg: 20px`
- `--radius-xl: 28px`
- Buttons: **999px** (pill)
- Country chip: **0** (square)

### Shadows

- Card hover: `0 24-32px 48-64px -24-32px rgba(0,0,0, 0.12-0.18)`
- Btn primary: `0 10px 24px -12px rgba(26, 107, 58, 0.5)`
- Btn primary hover: `0 16px 32px -14px rgba(26, 107, 58, 0.6)`
- Sticky badge: `0 20px 40px -20px rgba(0,0,0, 0.4)`

### Easing

- Default: `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-out`)
- Clip-path reveal: `cubic-bezier(0.77, 0, 0.175, 1)`
- Magnetic pullback: `cubic-bezier(0.22, 1.36, 0.5, 1)`

## Assets

Bundle ichida `assets/` papkasi:

**Rasmlar (13 ta)** — barchasi litsenziyalangan CC / public domain:
- `hero-wheat-field.jpg` — asosiy hero fon (bug'doy dalasi)
- `hand-soil-planting.jpg` — missiya bo'limi (tuproqda daraxt)
- `farmer-healthy-soil.jpg` — publication cards
- `central-asia-climate.jpg` — climate policy
- `aral-sea-conservation.jpg` — featured research
- `farm-restructuring.jpg` — policy analysis
- `smallholder-farmers.jpg` — FAO research
- `fao-uzbekistan.jpg` — livestock
- `agri-service-center.jpg` — innovation
- `uzbek-china-lab.jpg` — soil microbiome
- `young-scientist-school.jpg` — training
- `conference-people.jpg` — CAREC forum
- Boshqa

Ishlab chiquvchi bu rasmlarni haqiqiy content bilan almashtirishi kerak. Har bir sahifadagi rasmlar `<img src="assets/...">` orqali ishlatiladi.

**Icons**: Inline SVG (arrow, chevron, search, social icons) — Lucide yoki heroicons ga aylantirilishi mumkin.

**Placeholders**:
- Logo: yashil kvadrat + serif "R" (44x44px) — brand mark. Haqiqiy logo bilan almashtiring.
- Team avatars: yashil circle + serif italik ikki harf (DE, KA, SY)
- University logos: rangli div + serif nomlar (TIIAME, TDAU va h.k.)

## Files

Bundle'dagi asosiy fayllar:

- `index.html` — Bosh sahifa
- `about.html` — RCGA Haqida
- `publications.html` — Ilmiy nashrlar ro'yxati
- `publication-detail.html` — Bitta nashr batafsili
- `news.html` — Yangiliklar
- `events.html` — Tadbirlar
- `institutions.html` — Hamkor muassasalar
- `search.html` — Global qidiruv
- `login.html` — Kirish / Ro'yxatdan o'tish
- `assets/styles.css` — Barcha CSS (design tokens, komponentlar, animatsiyalar)
- `assets/app.js` — JavaScript (reveal animatsiyalari, nav scroll, count-up, cursor spotlight, magnetic buttons, kinetic split-text)
- `assets/partials.js` — Nav va Footer partial'lari (mount qilingan HTML)

**Muhim tafsilotlar ishlab chiqaruvchi uchun:**

1. **Reveal system** bulletproof qilingan — `IntersectionObserver` + scroll listener + 3s last-resort timer + `document.readyState` check. Iframe muhitida (Storybook, Figma preview va h.k.) bug'siz ishlashi kerak.

2. **Fraunces** variable font *SOFT* va *WONK* axeslari bilan — bu Fraunces'ning yumshoq va o'zgaruvchan xarakteristikasini beradi. Italik em elementlarda WONK 1 (asymmetric letterforms) bilan farqlanadi.

3. **Count-up muammosi**: agar target framework matnni boshqarayotgan bo'lsa (CMS, i18n runtime), `::before content: var(--counter-val)` yondashuvidan foydalaning. Aks holda oddiy `element.textContent = value` yetarli.

4. **Til o'tkazgichi** hozircha localStorage'ga saqlaydi lekin kontent tarjima qilinmagan. Real ilovada `next-intl` yoki `react-i18next` bilan integratsiya kerak.

5. **Cursor spotlight** faqat `(hover: hover) and (pointer: fine)` da faollashadi — mobil qurilmalarda avtomatik o'chadi.

6. **Responsivelik**: 1024px va 640px breakpointlar. Nav-links 1024px dan pastda yashiriladi (hamburger qo'shish kerak); grid columns kamayadi; hero-serial va hero-map ham yashirilishi mumkin.

7. **Chiroyli hover'lar** faqat desktopda — pointer: coarse (mobile) da default oddiy hover.

8. **Accessibility**: barcha interaktiv elementlarga `aria-label`, focus-ring lar (btn'lar uchun `box-shadow` bilan), skip-to-content link qo'shish tavsiya etiladi. Barcha semantik teglar to'g'ri: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
