"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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

  return;
}
