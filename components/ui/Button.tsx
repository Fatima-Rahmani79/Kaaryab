"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const styles: Record<Variant, string> = {
  primary: "bg-saffron text-lapis-deep hover:brightness-95 active:scale-[0.97]",
  secondary:
    "border border-lapis text-lapis dark:border-white/40 dark:text-white hover:bg-lapis/5 dark:hover:bg-white/10 active:scale-[0.97]",
  ghost:
    "text-lapis dark:text-white hover:bg-lapis/5 dark:hover:bg-white/10 active:scale-[0.97]",
  danger: "bg-pomegranate text-white hover:brightness-95 active:scale-[0.97]",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none hover:-translate-y-0.5 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
