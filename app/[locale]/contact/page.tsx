"use client";

import { ContactFormData } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setform] = useState<ContactFormData>({
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

  return;
}
