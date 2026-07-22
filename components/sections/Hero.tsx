"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import HeroIllustration from "../illustrations/HeroIllustration";
import LatticePattern from "../illustrations/LatticePattern";

interface Props {
  title: string;
  subtitle: string;
  ctaBrowseLabel: string;
  ctaAddLabel: string;
}

export default function Hero({
  title,
  subtitle,
  ctaBrowseLabel,
  ctaAddLabel,
}: Props) {
  const locale = useLocale();
  const isRtl = locale !== "en";
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-28 px-4 bg-lapis-deep text-white">
      <LatticePattern className="text-saffron" opacity={0.06} patternId="hero-lattice" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center md:text-start"
        >
          <motion.h1
            variants={item}
            className={`text-4xl md:text-6xl font-bold mb-5 leading-tight ${
              isRtl ? "font-rtl" : "font-display"
            }`}
          >
            {title}
          </motion.h1>
          <motion.p variants={item} className="text-lg text-blue-100 mb-10 max-w-md mx-auto md:mx-0">
            {subtitle}
          </motion.p>
          <motion.div
            variants={item}
            className="flex gap-4 justify-center md:justify-start flex-wrap"
          >
            <Link
              href={`/${locale}/opportunities`}
              className="px-7 py-3 rounded-lg font-medium text-lapis-deep bg-saffron hover:brightness-95 transition hover:scale-[1.03] active:scale-[0.97]"
            >
              {ctaBrowseLabel}
            </Link>
            <Link
              href={`/${locale}/add-opportunity`}
              className="px-7 py-3 rounded-lg font-medium border border-white/40 text-white hover:bg-white/10 transition-colors"
            >
              {ctaAddLabel}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:flex justify-center"
        >
          <HeroIllustration />
        </motion.div>
      </div>
    </section>
  );
}
