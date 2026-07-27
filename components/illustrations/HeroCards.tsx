import { motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  LucideIcon,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const cards: {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  {
    label: "Trusted teams",
    value: "50+",
    icon: Users,
    accent: "bg-saffron/15 text-saffron",
  },
  {
    label: "Fast approvals",
    value: "24h avg",
    icon: Sparkles,
    accent: "bg-pomegranate/10 text-pomegranate",
  },
  {
    label: "Local reach",
    value: "34 provinces",
    icon: Compass,
    accent: "bg-lapis/20 text-lapis",
  },
  {
    label: "Secure access",
    value: "End-to-end",
    icon: ShieldCheck,
    accent: "bg-white/10 text-white",
  },
];

const containerVariants = {
  hidden: {},
  show: (reduceMotion: boolean) => ({
    transition: {
      staggerChildren: reduceMotion ? 0 : 0.14,
      delayChildren: reduceMotion ? 0 : 0.15,
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function HeroCards() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-saffron/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 -bottom-8 h-40 w-40 rounded-full bg-pomegranate/20 blur-3xl" />

      <motion.div
        className="relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        custom={reduceMotion}
      >
        <div className="relative p-5 grid gap-4 sm:grid-cols-2">
          {cards.map(({ label, value, icon: Icon, accent }) => (
            <motion.div
              key={label}
              variants={cardVariants}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
              className="rounded-3xl border border-white/10 bg-lapis-deep dark:bg-slate-900/80 backdrop-blur-xl p-4 shadow-sm shadow-slate-950/5 transition-colors hover:border-white/20"
            >
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl ${accent}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
              <p className="mt-2 text-sm text-slate-300">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
