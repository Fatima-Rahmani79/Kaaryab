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
    <div
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
      <p className="text-3xl font-display font-bold text-ink dark:text-white">
        {value}
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{label}</p>
    </div>
  );
}
