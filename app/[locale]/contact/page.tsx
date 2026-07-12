"use client";

import { ContactFormData } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">{t("sent")}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder={t("name")}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <input
          required
          type="email"
          placeholder={t("email")}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <textarea
          required
          rows={5}
          placeholder={t("message")}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-900 dark:border-gray-700"
        />
        <button className="bg-primary-600 text-white px-6 py-3 rounded-lg w-full">
          {t("send")}
        </button>
      </form>
    </div>
  );
}
