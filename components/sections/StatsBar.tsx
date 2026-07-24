"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Stat {
  label: string;
  value: number;
  icon: ReactNode;
}

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-lapis/10 flex items-center justify-center shrink-0">
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-ink dark:text-white leading-none">
                {s.value}
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                {s.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
