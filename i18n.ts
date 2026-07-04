import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fa", "ps"] as const;
export type locale = (typeof locales)[number];

export const defaultLocale: locale = "en";

export const rtlLocales: locale[] = ["fa", "ps"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
