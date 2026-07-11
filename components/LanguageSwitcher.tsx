"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const labels: Record<string, string> = {
  en: "EN",
  fa: "دری",
  ps: "پښتو",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: string) {
    // We need to replace the current locale in the pathname with the next locale
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  }
}
