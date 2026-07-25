"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { LogIn, UserPlus } from "lucide-react";
import { inputClass } from "@/lib/ui";
import { createClient } from "@/lib/auth/client";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const { toast } = useToast();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;
        toast(t("signupSuccess"), "success");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;
        toast(t("signinSuccess"), "success");
        router.push(`/${locale}/dashboard`);
        router.refresh();
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : t("genericError"), "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-lapis/10 flex items-center justify-center">
            {mode === "signin" ? (
              <LogIn size={20} className="text-lapis" />
            ) : (
              <UserPlus size={20} className="text-lapis" />
            )}
          </div>
          <h1 className="text-2xl font-display font-bold">
            {mode === "signin" ? t("signinTitle") : t("signupTitle")}
          </h1>
        </div>

        <div className="flex gap-1 p-1 mb-8 rounded-xl bg-gray-100 dark:bg-gray-800 w-fit">
          <button
            onClick={() => setMode("signin")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "signin"
                ? "bg-white dark:bg-gray-900 shadow-sm"
                : "text-gray-500"
            }`}
          >
            {t("signin")}
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "signup"
                ? "bg-white dark:bg-gray-900 shadow-sm"
                : "text-gray-500"
            }`}
          >
            {t("signup")}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField label={t("email")} error={errors.email?.message}>
            <input
              type="email"
              {...register("email")}
              className={inputClass}
              autoComplete="email"
            />
          </FormField>

          <FormField label={t("password")} error={errors.password?.message}>
            <input
              type="password"
              {...register("password")}
              className={inputClass}
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
            />
          </FormField>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "..." : mode === "signin" ? t("signin") : t("signup")}
          </Button>
        </form>

        {mode === "signup" && (
          <p className="text-xs text-gray-400 mt-4">{t("signupNote")}</p>
        )}
      </motion.div>
    </div>
  );
}
