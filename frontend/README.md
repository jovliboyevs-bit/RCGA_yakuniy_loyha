# RCGA frontend

React + TypeScript + Vite SPA. Server komponentlari yo‘q. Mavjud dizayn, rasmlar,
API kontraktlari va `.html` manzillari saqlangan. Sahifa markup’i `src/pages/*.tsx`
komponentlariga ko‘chirildi; mavjud JavaScript yordamchilari ES modullar sifatida
qayta ishlatiladi. Route almashganda listener, timer va observer’lar tozalanadi.

## Ishga tushirish

Node.js 22.12+ yoki 24 LTS va npm kerak. Shu papkada:

```sh
npm ci
npm run dev
```

Backend’ni avvalgidek `127.0.0.1:8000` da ishga tushiring. Brauzerda Vite bergan
manzilni oching. Vite `/api`, `/uploads` va API hujjatlari so‘rovlarini backend’ga
uzatadi. Backend’ning eski statik HTML manzili development uchun ishlatilmaydi.

## Build va test

```sh
npm run build
npm test
npm run preview
```

Build TypeScript tekshiruvini ham bajaradi. Brauzer testlari o‘rnatilgan Google
Chrome’dan foydalanadi, production build’ni ochadi va API javoblarini mock qiladi.
Ular haqiqiy bazaga ma’lumot yozmaydi. Backend integratsiya testlari alohida.

Production’da faqat `dist/` ichini statik hosting orqali tarqating. `/api`,
`/uploads`, `/docs` va `/openapi.json` yo‘llarini mavjud backend’ga reverse proxy
qiling. Backend kodi va uning statik mount sozlamasi o‘zgartirilmagan;
`run.py`ning o‘zi Vite build’ini tarqatmaydi. `dist/` ichidagi `.html` entry’lar
eski havolalar va to‘g‘ridan-to‘g‘ri ochishni saqlaydi. Toza URL’lar uchun hosting
fallback’ini `/index.html`ga sozlash mumkin.

## Xavfsizlik chegaralari

- Production CSP inline script, inline event handler, `eval`, plugin va tashqi
  JavaScript’ni bloklaydi. Mavjud dizayn uchun inline CSS va Google Fonts ruxsatli.
  Development’da Vite HMR uchun meta CSP olib tashlanadi.
- Eski rich-text chiqarish joylari DOMPurify orqali tozalanadi. Sahifalar React
  elementlari sifatida render qilinadi; HTML ichidagi script’lar qayta bajarilmaydi.
- Google Translate’ning tashqi executable skripti olib tashlandi. Mavjud mahalliy
  CAREC lug‘ati va sahifalardagi tarjimalar saqlangan; lug‘atda yo‘q matn avtomatik
  tarjima qilinmaydi.
- Sessiya va chat shu tabda sahifa yangilanganda tiklanadi. Saqlash muddati,
  tablararo kirish va xavfsizlik chegaralari [umumiy hisobotda](OZGARISHLAR.md) yozilgan.
- Build `dist/_headers` faylini chiqaradi. Cloudflare Pages va Netlify uni
  statik javoblarga qo‘llaydi. Boshqa hostingda shu HTTP header’larni
  serverda sozlang. Meta CSP `frame-ancestors`ni qo‘llamaydi.

Asos: [Vite hujjatlari](https://vite.dev/guide/),
[React createRoot](https://react.dev/reference/react-dom/client/createRoot).
