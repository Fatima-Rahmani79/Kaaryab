import type { Metadata } from "next";
import { Space_Grotesk, Inter, Vazirmatn } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, rtlLocales, Locale } from "@/i18n";
import { SavedProvider } from "@/context/SavedContext";
import { ToastProvider } from "@/components/ui/Toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-rtl",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KaarYab Afghanistan",
  description:
    "Find jobs, internships, scholarships, and training opportunities for Afghan youth.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${spaceGrotesk.variable} ${inter.variable} ${vazirmatn.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <SavedProvider>
            <ToastProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </ToastProvider>
          </SavedProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
