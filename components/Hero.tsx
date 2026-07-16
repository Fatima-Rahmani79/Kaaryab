"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";

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
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative overflow-hidden py-28 px-4 text-center bg-lapis-deep">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-2xl mx-auto"
      >
        <motion.h1
          variants={item}
          className={`text-4xl md:text-6xl font-bold mb-5 text-white ${
            isRtl ? "font-rtl" : "font-display"
          }`}
        >
          {title}
        </motion.h1>
        <motion.p variants={item} className="text-lg text-blue-100 mb-10">
          {subtitle}
        </motion.p>
        <motion.div
          variants={item}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            href={`/${locale}/opportunities`}
            className="px-7 py-3 rounded-lg font-medium text-lapis-deep bg-saffron hover:brightness-95 transition"
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
    </section>
  );
}
