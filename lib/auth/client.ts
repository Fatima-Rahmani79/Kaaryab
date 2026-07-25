import { createBrowserClient } from "@supabase/ssr";

// این کلاینت جدا از lib/supabase.ts است: آن یکی برای خواندن/نوشتن جدول
// opportunities استفاده می‌شود (بدون آگاهی از نشست کاربر)، این یکی مخصوص
// احراز هویت است و نشست (session) کاربر را در کوکی‌های مرورگر نگه می‌دارد.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
