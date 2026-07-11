import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Opportunity } from "@/types";
import { isExpiringSoon } from "@/lib/utils";
import SaveButton from "./SaveButton";

interface Props {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const soon = isExpiringSoon(opportunity.deadline);
}
