import { notFound } from "next/navigation";
import { getOpportunityById } from "@/lib/mockDb";
import EditOpportunityClient from "./EditOpportunityClient";

export default async function EditOpportunityPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const opportunity = getOpportunityById(id);
  if (!opportunity) notFound();

  return <EditOpportunityClient opportunity={opportunity} />;
}
