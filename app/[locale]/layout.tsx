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
  title: "KaarYab Afghanistan",
  description:
    "Find jobs, internships, scholarships, and training opportunities for Afghan youth.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // show 404 if locale does not valuable
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SavedProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SavedProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
