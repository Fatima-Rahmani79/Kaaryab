"use client";
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import {
  Briefcase,
  Rocket,
  GraduationCap,
  Monitor,
  Globe2,
  Wrench,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";
import { OpportunityCategory } from "@/types";

const categoryIcons: Record<OpportunityCategory, LucideIcon> = {
  Job: Briefcase,
  Internship: Rocket,
  Scholarship: GraduationCap,
  "Online Course": Monitor,
  "Remote Work": Globe2,
  "Training Program": Wrench,
  "Volunteer Work": HeartHandshake,
};

const categories: OpportunityCategory[] = [
  "Job",
  "Internship",
  "Scholarship",
  "Online Course",
  "Remote Work",
  "Training Program",
  "Volunteer Work",
];

export default function PopularCategories({
  heading,
  labels,
  counts,
}: {
  heading: string;
  labels: Record<OpportunityCategory, string>;
  counts: Record<string, number>;
}) {
  const locale = useLocale();

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-12">
        {heading}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => {
          const Icon = categoryIcons[cat];
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                href={`/${locale}/opportunities?category=${encodeURIComponent(cat)}`}
                className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-lapis/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-lapis/10 flex items-center justify-center group-hover:bg-saffron/15 transition-colors">
                  <Icon
                    size={22}
                    className="text-lapis group-hover:text-saffron transition-colors"
                  />
                </div>
                <span className="text-sm font-medium">{labels[cat]}</span>
                <span className="text-xs text-gray-400">
                  {counts[cat] ?? 0}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
