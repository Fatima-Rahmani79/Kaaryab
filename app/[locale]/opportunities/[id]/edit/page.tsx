import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getOpportunityById } from "@/lib/mockDb";
import EditOpportunityClient from "./EditOpportunityClient";

export default async function EditOpportunityPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const opportunity = await getOpportunityById(id);
  if (!opportunity) notFound();

  return <EditOpportunityClient opportunity={opportunity} />;
}
