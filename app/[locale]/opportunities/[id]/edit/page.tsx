import { notFound, redirect } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ShieldOff } from "lucide-react";
import { getOpportunityById } from "@/lib/mockDb";
import { getCurrentProfile } from "@/lib/auth/server";
import EditOpportunityClient from "./EditOpportunityClient";

export default async function EditOpportunityPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const { user, profile } = await getCurrentProfile();
  if (!user) {
    redirect(`/${locale}/login`);
  }

  if (!profile?.is_admin) {
    const tAuth = await getTranslations("auth");
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-pomegranate/10 flex items-center justify-center mx-auto mb-5">
          <ShieldOff size={26} className="text-pomegranate" />
        </div>
        <h1 className="text-xl font-display font-bold mb-2">
          {tAuth("accessDeniedTitle")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {tAuth("accessDeniedMessage")}
        </p>
      </div>
    );
  }

  const opportunity = await getOpportunityById(id);
  if (!opportunity) notFound();

  return <EditOpportunityClient opportunity={opportunity} />;
}
