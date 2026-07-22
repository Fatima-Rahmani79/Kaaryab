"use client";

import { motion, useReducedMotion } from "framer-motion";

// یک ایلوستریشن انتزاعی: مسیری که از میان نقاط پراکنده (فرصت‌های پنهان)
// به یک نقطهٔ روشن (فرصت پیدا شده) می‌رسد — استعارهٔ بصری خودِ KaarYab.
export default function HeroIllustration() {
  const reduceMotion = useReducedMotion();

  const dots = [
    { cx: 60, cy: 260, r: 5 },
    { cx: 140, cy: 90, r: 4 },
    { cx: 210, cy: 300, r: 6 },
    { cx: 290, cy: 130, r: 4 },
    { cx: 330, cy: 250, r: 5 },
  ];

  return (
    <svg
      viewBox="0 0 420 380"
      className="w-full h-auto max-w-md"
      role="img"
      aria-label="Illustration of scattered opportunities converging into one clear path"
    >
      <circle cx="360" cy="60" r="90" fill="#E8A33D" opacity="0.12" />
      <circle cx="40" cy="330" r="70" fill="#2E5AAC" opacity="0.12" />

      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="#E8A33D"
          opacity={0.5}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: reduceMotion ? 0 : 0.15 * i, duration: 0.6 }}
        />
      ))}

      <motion.path
        d="M60 260 C 120 220, 130 130, 140 90 C 180 160, 230 190, 210 300 C 250 220, 260 160, 290 130 C 300 190, 320 220, 330 250"
        fill="none"
        stroke="#2E5AAC"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.6, delay: reduceMotion ? 0 : 0.8, ease: "easeInOut" }}
      />

      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: reduceMotion ? 0 : 2.2,
          duration: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
        style={{ transformOrigin: "330px 250px" }}
      >
        <circle cx="330" cy="250" r="14" fill="#E8A33D" />
        <path
          d="M324 250 L329 255 L338 244"
          stroke="#16305C"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>

      <g opacity="0.5">
        <rect x="90" y="40" width="26" height="26" rx="7" fill="none" stroke="#F5F6FA" strokeWidth="1.4" />
        <rect x="250" y="300" width="22" height="22" rx="6" fill="none" stroke="#F5F6FA" strokeWidth="1.4" />
      </g>
    </svg>
  );
}
