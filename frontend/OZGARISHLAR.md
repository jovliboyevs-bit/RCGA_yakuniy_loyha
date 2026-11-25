# RCGA frontendida bajarilgan ishlar

## Arxitektura va interfeys

11 sahifa React komponentlari bilan ishlaydi. TypeScript va Vite brauzerda ishlaydigan SPA yig‘adi. React Router sahifalarni talab bo‘yicha yuklaydi. Eski `.html` havolalari ishlaydi. API, tarjima, chat va ayrim DOM amallari uchun mavjud JavaScript modullari ishlatiladi.

Bo‘limlar orasidagi bo‘sh joylar qisqartirilgan, kartalar va rasmlar burchaklari bir xil uslubga keltirilgan. Yuqoriga qaytish tugmasi chapda, chat o‘ngda turadi. Til menyusi sayt uslubiga moslangan. Birinchi ko‘rinishdagi animatsiya foydalanuvchining harakatni kamaytirish sozlamasini hisobga oladi. Chatda klaviatura eslatmalari va “Bepul” belgisi olib tashlangan.

## Sessiya va chat

- Sahifa yangilanganda amal qilayotgan sessiya tiklanadi. Yangi tab mavjud sessiyani shu saytdagi ochiq tabdan olishi mumkin. Bir tabdan chiqish boshqa tablarni ham chiqaradi va mavjud logout API orqali tokenni bekor qilishni so‘raydi.
- Chat tarixi, tanlangan suhbat, yuborilmagan matn va ixtiyoriy Gemini kaliti shu tabning `sessionStorage` saqlovida turadi. Chiqish va hisobni almashtirish ularni tozalaydi. Server belgilagan sessiya muddati amal qiladi. Brauzer tabni qayta tiklasa, uning saqlovini ham tiklashi mumkin.
- Avvalgi versiyaning egasi aniqlanmagan mahalliy suhbatlari yangi hisobga avtomatik biriktirilmaydi. Chat tarixi boshqa qurilmaga sinxronlanmaydi.

## Xavfsizlik va tozalash

Qisqa muddatli Bearer token va ixtiyoriy AI kalitini shu saytning JavaScript kodi o‘qiy oladi. Frontend o‘zi HttpOnly himoyasini bera olmaydi. Backend o‘zgarishisiz sahifani yangilash qulayligi uchun tab saqlovi tanlandi. Doimiy saqlovga maxfiy kalit yoki token yozilmaydi.

Production build CSP va hosting uchun xavfsizlik sarlavhalarini chiqaradi. Dinamik HTML tozalanadi, chat manbalarining havolalari tekshiriladi. Sayt joylashtirilganda HTTP sarlavhalari hostingda qo‘llanishi kerak.

Kodda ishlatilmagan `assets/shokirov.jpg` va `assets/Nurturing a Young Seedling.png` olib tashlandi. Bosh sahifa va kirish sahifasi `hero-wheat-field.png` asosida tayyorlangan WebP variantlarini ekran kengligiga qarab yuklaydi.

## Telefon va planshet

Kichik ekranda asosiy menyu tugma orqali ochiladi. Qidiruv, muassasa kartalari, kirish formasi va nashr tafsilotlari ekran kengligiga moslashadi. Admin jadvallari alohida suriladi. Chat balandligi mobil brauzerning ko‘rinadigan maydoniga moslanadi. Sahifaning pastidagi rasmlar kechiktirib yuklanadi.

## Tekshirish

`npm run build` TypeScript va production buildni tekshiradi. `npm test` Chrome orqali marshrutlar, autentifikatsiya, chat, til va maketni tekshiradi. Testlarda API javoblari simulyatsiya qilinadi.
