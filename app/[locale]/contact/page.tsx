"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Clock } from "lucide-react";
import { inputClass, cardClass, sectionClass } from "@/lib/ui";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useToast } from "@/components/ui/Toast";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const t = useTranslations("contact");
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast(t("sent"), "success");
      reset();
    } catch {
      toast(t("error") ?? "Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`${sectionClass} md:py-28`}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-3 bg-lapis/5 dark:bg-white/5 px-4 py-2 rounded-full">
              <Mail size={18} className="text-lapis" />
              <h1 className="text-2xl font-display font-bold">{t("title")}</h1>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("subtitle") ??
                "Have a question or feedback? Send us a message and we'll reply within 2 business days."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`${cardClass} p-6`}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField label={t("name")} error={errors.name?.message}>
                  <input {...register("name")} className={inputClass} />
                </FormField>

                <FormField label={t("email")} error={errors.email?.message}>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputClass}
                  />
                </FormField>

                <FormField label={t("message")} error={errors.message?.message}>
                  <textarea
                    rows={6}
                    {...register("message")}
                    className={inputClass}
                  />
                </FormField>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "..." : t("send")}
                </Button>
              </form>
            </div>

            <aside
              className={`${cardClass} p-6 flex flex-col gap-6`}
              aria-labelledby="contact-info"
            >
              <div>
                <h2
                  id="contact-info"
                  className="font-display font-bold text-lg mb-2"
                >
                  {t("otherWays") ?? "Other ways to reach us"}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("responseTime") ?? "We typically respond within 48 hours."}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lapis/10 flex items-center justify-center text-lapis">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {t("emailAddress") ?? "hello@kaaryab.org"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t("emailDesc") ??
                      "Send us an email for partnership or media inquiries."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lapis/10 flex items-center justify-center text-lapis">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {t("hours") ?? "Mon - Fri: 09:00 - 17:00"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t("timezone") ?? "(local business hours)"}
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-sm text-gray-500 mb-3">
                  {t("needHelp") ?? "Prefer direct support?"}
                </p>
                <Link href={`/${"en"}/contact`} className="inline-block">
                  <Button variant="secondary">
                    {t("contactSupport") ?? "Contact support"}
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
