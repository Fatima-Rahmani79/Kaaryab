"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LatticePattern from "../illustrations/LatticePattern";

export default function CtaBanner({
  title,
  subTitle,
  ctaLabel,
}: {
  title: string;
  subTitle: string;
  ctaLabel: string;
}) {
  const locale = useLocale();

  return (
    <section className="max-w-6xl mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-lapis-deep px-8 py-16 text-center text-white"
      >
        <LatticePattern
          className="text-saffron"
          opacity={0.07}
          patternId="cta-lattice"
        />
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
            {title}
          </h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">{subtitle}</p>
          <Link
            href={`/${locale}/add-opportunity`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-medium text-lapis-deep bg-saffron hover:brightness-95 transition hover:scale-[1.03] active:scale-[0.97]"
          >
            {ctaLabel}
            <ArrowRight size={17} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
