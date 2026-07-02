# KaarYab Afghanistan

پلتفرم یابنده فرصت (کار، انترنشیپ، بورسیه، دوره آنلاین) برای جوانان افغانستان — سه‌زبانه (English / دری / پښتو).

⚠️ داده‌های این پروژه Demo Data هستند.

## تکنولوژی‌ها
- Next.js 15 (App Router) + TypeScript
- next-intl برای چندزبانگی (English پیش‌فرض، دری و پشتو)
- Tailwind CSS (با پشتیبانی از Dark Mode و RTL/LTR پویا)
- React Hook Form + Zod برای اعتبارسنجی فرم
- Context API + LocalStorage برای ذخیره فرصت‌ها
- Next.js API Routes به‌عنوان Mock API برای CRUD

## ساختار پروژه
```
middleware.ts               → تشخیص و هدایت زبان (en/fa/ps)
i18n.ts                     → کانفیگ next-intl، لود فایل ترجمه مناسب

messages/
  en.json                    → انگلیسی (پیش‌فرض)
  fa.json                    → دری
  ps.json                    → پښتو

app/
  globals.css
  [locale]/                  → لایه زبان، دور همه صفحات
    layout.tsx                → NextIntlClientProvider + dir پویا (rtl/ltr)
    page.tsx                  → خانه
    opportunities/page.tsx     → لیست + جستجو/فیلتر
    opportunities/[id]/        → جزئیات (dynamic route)
    saved/                     → ذخیره‌شده‌ها
    dashboard/                 → آمار
    add-opportunity/           → فرم ثبت
    about/ contact/             → صفحات ثابت
  api/                        → بیرون از [locale]، Mock API
    opportunities/route.ts      → GET, POST
    opportunities/[id]/route.ts → GET, PUT, DELETE
    contact/route.ts

components/                 → کامپوننت‌های قابل استفاده مجدد
  LanguageSwitcher.tsx        → سوییچ EN / دری / پښتو
context/SavedContext.tsx     → مدیریت state ذخیره‌شده‌ها (LocalStorage)
data/opportunities.ts        → داده نمونه (مقادیر category به انگلیسی می‌مانند)
lib/utils.ts                 → توابع کمکی (فیلتر، آمار، تاریخ)
types/index.ts                → همه TypeScript type‌ها
```

## چطور ترجمه اضافه/ویرایش کنم؟
کلیدها در هر سه فایل `messages/*.json` باید دقیقاً یکسان باشند — فقط مقدارشان فرق دارد.
مقادیر داده‌ای (مثل category ها: `"Job"`, `"Scholarship"`) در `data/opportunities.ts` هرگز ترجمه نمی‌شوند، فقط **نمایش**شان با `t(categories.${category})` ترجمه می‌شود.

## اجرای محلی
```bash
npm install
npm run dev
```
سپس به‌طور خودکار به `http://localhost:3000/en` هدایت می‌شوید (زبان پیش‌فرض).
برای دری: `http://localhost:3000/fa`
برای پشتو: `http://localhost:3000/ps`

## بهبودهای آینده
- Authentication
- Countdown برای ضرب‌الاجل
- ساخت‌کننده PDF CV
- نمودار در Dashboard (Recharts)
