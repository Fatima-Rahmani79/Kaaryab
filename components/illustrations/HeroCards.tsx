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
    accent: "bg-lapis/30 text-lapis",
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
      staggerChildren: reduceMotion ? 0 : 0.1,
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
      <motion.div
        className="relative overflow-hidden "
        variants={containerVariants}
        initial="hidden"
        animate="show"
        custom={reduceMotion}
      >
        <div className="relative p-4 grid gap-4 sm:grid-cols-2">
          {cards.map(({ label, value, icon: Icon, accent }) => (
            <motion.div
              key={label}
              variants={cardVariants}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
              className="rounded-[1.75rem] border border-white/10 bg-lapis/20 dark:bg-slate-900/80 backdrop-blur-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className={`h-1.5 w-14 rounded-full ${accent} mb-4`} />
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-3xl ${accent} ring-1 ring-white/10 shadow-lg shadow-slate-950/20`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="mt-5 text-2xl font-semibold tracking-tight text-white">
                {value}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-400">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
