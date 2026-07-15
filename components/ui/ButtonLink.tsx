import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-saffron text-lapis-deep hover:brightness-95",
  secondary:
    "border border-lapis text-lapis dark:border-white/40 dark:text-white hover:bg-lapis/5 dark:hover:bg-white/10",
  ghost: "text-lapis dark:text-white hover:bg-lapis/5 dark:hover:bg-white/10",
};

export default function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
