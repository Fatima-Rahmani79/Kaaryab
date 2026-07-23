import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌ NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured.\n" +
      "Run the script using: node --env-file=.env.local scripts/migrate-to-supabase.mjs",
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

  console.log(`Migrating ${opportunities.length} opportunities to Supabase...`);

  const { count, error: countError } = await supabase
    .from("opportunities")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.error("❌ Error connecting to the table:", countError.message);
    process.exit(1);
  }

  if (count && count > 0) {
    console.log(
      `⚠️ The table already contains ${count} rows. The migration has been stopped to prevent duplicate data.\n` +
        "If you want to migrate from scratch, first clear the table from the Supabase dashboard.",
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
  }));

  const { data, error } = await supabase
    .from("opportunities")
    .insert(rows)
    .select();

  if (error) {
    console.error("❌ Error migrating data:", error.message);
    process.exit(1);
  }

  console.log(`✅ Successfully migrated ${data.length} opportunities.`);
}

main();
