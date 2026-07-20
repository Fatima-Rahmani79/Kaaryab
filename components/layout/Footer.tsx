import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const links = [
    { href: `/${locale}/opportunities`, label: t("nav.opportunities") },
    { href: `/${locale}/dashboard`, label: t("nav.dashboard") },
    { href: `/${locale}/about`, label: t("nav.about") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  const socials = [
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "mailto:hello@kaaryab.af", icon: Mail, label: "Email" },
  ];

  return (
    <footer className="mt-24 bg-lapis-deep text-blue-100">
      <svg
        width="100%"
        height="10"
        preserveAspectRatio="none"
        className="block"
      >
        <defs>
          <pattern
            id="footer-lattice"
            width="26"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M13 0 L20 5 L13 10 L6 5 Z"
              fill="none"
              stroke="#E8A33D"
              strokeWidth="1"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="10" fill="url(#footer-lattice)" />
      </svg>

      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm text-blue-200 max-w-xs">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-3 mt-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-saffron/20 hover:text-saffron transition-colors"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">
            {t("nav.opportunities")}
          </h3>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-blue-200 hover:text-saffron transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">
            {t("categories.Job")}
          </h3>
          <ul className="space-y-2">
            {(
              [
                "Internship",
                "Scholarship",
                "Online Course",
                "Training Program",
              ] as const
            ).map((c) => (
              <li key={c}>
                <Link
                  href={`/${locale}/opportunities?category=${c}`}
                  className="text-sm text-blue-200 hover:text-saffron transition-colors"
                >
                  {t(`categories.${c}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">KaarYab</h3>
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} KaarYab Afghanistan
          </p>
          <p className="text-xs text-blue-300 mt-3">{t("footer.note")}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="max-w-6xl mx-auto px-4 py-4 text-xs text-blue-300 text-center">
          {t("footer.note")}
        </p>
      </div>
    </footer>
  );
}
