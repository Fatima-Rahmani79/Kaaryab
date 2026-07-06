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
