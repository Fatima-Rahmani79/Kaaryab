import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
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

      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-blue-200 max-w-xs">
            {t("footer.tagline")}
          </p>
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
          <h3 className="text-sm font-semibold text-white mb-4">KaarYab</h3>
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} KaarYab Afghanistan
          </p>
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

// import Link from "next/link";
// import { useTranslations, useLocale } from "next-intl";
// import Logo from "./Logo";

// export default function Footer() {
//   const t = useTranslations();
//   const locale = useLocale();

//   const quickLinks = [
//     { href: `/${locale}/opportunities`, label: t("nav.opportunities") },
//     { href: `/${locale}/dashboard`, label: t("nav.dashboard") },
//     { href: `/${locale}/about`, label: t("nav.about") },
//     { href: `/${locale}/contact`, label: t("nav.contact") },
//   ];

//   return (
//     <footer className="relative overflow-hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 mt-24">
//       <svg
//         className="absolute -bottom-10 -left-10 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
//         width="260"
//         height="260"
//         aria-hidden="true"
//       >
//         <defs>
//           <pattern id="footer-lattice" width="26" height="26" patternUnits="userSpaceOnUse">
//             <path
//               d="M13 0 L26 13 L13 26 L0 13 Z M13 7 L19 13 L13 19 L7 13 Z"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1"
//               className="text-lapis-deep dark:text-white"
//             />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#footer-lattice)" />
//       </svg>

//       <div className="relative max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
//         <div>
//           <Logo />
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 max-w-xs leading-relaxed">
//             {t("footer.tagline")}
//           </p>
//         </div>

//         <div>
//           <h4 className="text-sm font-semibold text-ink dark:text-white mb-4">
//             {t("nav.opportunities")}
//           </h4>
//           <ul className="space-y-2.5">
//             {quickLinks.map((l) => (
//               <li key={l.href}>
//                 <Link
//                   href={l.href}
//                   className="text-sm text-gray-500 dark:text-gray-400 hover:text-lapis dark:hover:text-saffron transition-colors"
//                 >
//                   {l.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex items-end md:justify-end">
//           <p className="text-xs text-gray-400 dark:text-gray-500">
//             © {new Date().getFullYear()} KaarYab Afghanistan — {t("footer.note")}
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }
