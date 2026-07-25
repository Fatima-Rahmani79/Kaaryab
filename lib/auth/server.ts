import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// برای استفاده در Server Component ها — نشست کاربر را از کوکی‌های
// درخواست می‌خواند (چیزی که middleware.ts تازه نگه‌اش می‌دارد).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[],
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // اگر این تابع از داخل یک Server Component (نه Route Handler یا
            // Server Action) صدا زده شود، نوشتن کوکی مجاز نیست — بی‌خطر است
            // چون middleware.ts مسئول تازه‌نگه‌داشتن نشست است، نه اینجا.
          }
        },
      },
    },
  );
}
