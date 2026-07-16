export const inputClass =
  "w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-900 text-ink dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lapis focus:border-transparent transition-shadow duration-200";

export const cardClass =
  "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300";

export const sectionClass = "max-w-6xl mx-auto px-4 py-20";

export const labelClass =
  "block text-sm font-medium text-ink dark:text-gray-200 mb-1.5";

export const selectClass = inputClass + " appearance-none cursor-pointer";

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};
