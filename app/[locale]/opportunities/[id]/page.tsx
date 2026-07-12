import { opportunities } from "@/data/opportunities";
import { isExpired } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return opportunities.map((o) => ({ id: o.id }));
}

export default async function OpportunityDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const opportunity = opportunities.find((o) => o.id === id);
  if (!opportunity) notFound();

  const t = await getTranslations();
  const expired = isExpired(opportunity.deadline);

  return;
}
