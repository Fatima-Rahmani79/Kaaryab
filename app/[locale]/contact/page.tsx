"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { ContactFormData } from "@/types";
import { inputClass, labelClass } from "@/lib/ui";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function ContactPage() {
  const t = useTranslations("contact");
  const { toast } = useToast();
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toast(t("sent"), "success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-lapis/10 flex items-center justify-center">
            <Mail size={20} className="text-lapis" />
          </div>
          <h1 className="text-2xl font-display font-bold">{t("title")}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>{t("name")}</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t("email")}</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t("message")}</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass}
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "..." : t("send")}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
