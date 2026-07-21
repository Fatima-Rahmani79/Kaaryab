import { useLocale } from "next-intl";
import Link from "next/link";

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-2 shrink-0 group"
    >
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#E8A33D" />
        <path
          d="M16 6 L24 16 L16 26 L8 16 Z M16 12 L20 16 L16 20 L12 16 Z"
          fill="none"
          stroke="#16305C"
          strokeWidth="1.6"
          className="transition-transform duration-500 origin-center group-hover:rotate-45"
        />
      </svg>
      <span
        className={`font-display text-xl font-bold ${
          inverted ? "text-white" : "text-lapis-deep dark:text-white"
        }`}
      >
        KaarYab
      </span>
    </Link>
  );
}
