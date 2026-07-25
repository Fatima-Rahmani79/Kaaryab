// اسکریپت یک‌باره برای انتقال دیتای seed از data/opportunities.json به جدول Supabase
//
// اجرا:
//   node --env-file=.env.local scripts/migrate-to-supabase.mjs
//
// اگه نسخهٔ Node ات از --env-file پشتیبانی نکرد (نسخه‌های قدیمی‌تر از ۲۰.۶)،
// می‌تونی به‌جاش متغیرها رو دستی export کنی یا از پکیج dotenv استفاده کنی.

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌ NEXT_PUBLIC_SUPABASE_URL یا NEXT_PUBLIC_SUPABASE_ANON_KEY تنظیم نشده.\n" +
      "با این دستور اجرا کن: node --env-file=.env.local scripts/migrate-to-supabase.mjs",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const raw = await readFile(
    new URL("../data/opportunities.json", import.meta.url),
    "utf-8",
  );
  const opportunities = JSON.parse(raw);

  console.log(`در حال انتقال ${opportunities.length} فرصت به Supabase...`);

  // چک می‌کنیم جدول از قبل خالی نیست تا دوباره دیتا رو تکراری اضافه نکنیم
  const { count, error: countError } = await supabase
    .from("opportunities")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.error("❌ خطا در اتصال به جدول:", countError.message);
    process.exit(1);
  }

  if (count && count > 0) {
    console.log(
      `⚠️  جدول از قبل ${count} ردیف دارد. برای جلوگیری از داده تکراری، اسکریپت متوقف شد.\n` +
        "اگر می‌خواهی دوباره از صفر انتقال بدهی، اول جدول را از پنل Supabase خالی کن.",
    );
    return;
  }

  const rows = opportunities.map((o) => ({
    title: o.title,
    organization: o.organization,
    category: o.category,
    location: o.location,
    type: o.type,
    deadline: o.deadline,
    description: o.description,
    requirements: o.requirements,
    apply_link: o.applyLink,
    tags: o.tags,
    featured: o.featured ?? false,
    // نکته: id و created_at را عمداً نمی‌فرستیم — Supabase خودش
    // یک uuid و timestamp تازه برایشان می‌سازد.
  }));

  const { data, error } = await supabase.from("opportunities").insert(rows).select();

  if (error) {
    console.error("❌ خطا در انتقال دیتا:", error.message);
    process.exit(1);
  }

  console.log(`✅ ${data.length} فرصت با موفقیت منتقل شد.`);
}

main();
