interface Props {
  label: string;
  value: number;
  highlight?: boolean;
}

export default function DashboardCard({ label, value, highlight }: Props) {
  return (
    <div
      className={`rounded-xl p-5 border ${
        highlight
          ? "border-red-300 bg-red-50 dark:bg-red-950/30"
          : "border-gray-200 dark:border-gray-800"
      }`}
    >
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  );
}
