"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Moon, Sun } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/opportunities`, label: t("opportunities") },
    { href: `/${locale}/saved`, label: t("saved") },
    { href: `/${locale}/dashboard`, label: t("dashboard") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        <Link href={`/${locale}`} className="font-bold text-lg shrink-0">
          KaarYab
        </Link>

        <div className="hidden md:flex gap-6 flex-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-primary-600">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
