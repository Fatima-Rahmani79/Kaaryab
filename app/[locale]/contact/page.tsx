"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { inputClass } from "@/lib/ui";
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField label={t("name")} error={errors.name?.message}>
            <input {...register("name")} className={inputClass} />
          </FormField>

          <FormField label={t("email")} error={errors.email?.message}>
            <input type="email" {...register("email")} className={inputClass} />
          </FormField>

          <FormField label={t("message")} error={errors.message?.message}>
            <textarea rows={5} {...register("message")} className={inputClass} />
          </FormField>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "..." : t("send")}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
