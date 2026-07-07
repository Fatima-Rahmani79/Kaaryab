import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, rtlLocales, Locale } from "@/i18n";
import { SavedProvider } from "@/context/SavedContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "KaarYab",
  description:
    "Find jobs, internships, scholarships, and training opportunities for Afghan youth.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  const message = await getMessages();
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SaveProviders>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SaveProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
