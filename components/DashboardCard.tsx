import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number;
  icon: LucideIcon;
  highlight?: boolean;
}

export default function DashboardCard({
  label,
  value,
  icon: Icon,
  highlight,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-5 border transition-colors ${
        highlight
          ? "border-pomegranate/20 bg-pomegranate/5 dark:bg-pomegranate/10"
          : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
          highlight
            ? "bg-pomegranate/10 text-pomegranate"
            : "bg-lapis/10 text-lapis"
        }`}
      >
        <Icon size={17} />
      </div>
      <p className="text-2xl font-display font-bold text-ink dark:text-white">
        {value}
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{label}</p>
    </motion.div>
  );
}
