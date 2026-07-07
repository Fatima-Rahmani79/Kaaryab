import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} KaarYab Afghanistan — {t("note")}
      </div>
    </footer>
  );
}
