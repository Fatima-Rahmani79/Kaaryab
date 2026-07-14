"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Pencil, Trash2 } from "lucide-react";
import { Opportunity } from "@/types";
import Modal from "./Modal";

export default function OpportunityManageTable({
  initialOpportunities,
}: {
  initialOpportunities: Opportunity[];
}) {
  const t = useTranslations("common");
  const locale = useLocale();
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [toDelete, setToDelete] = useState<Opportunity | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await fetch(`/api/opportunities/${toDelete.id}`, { method: "DELETE" });
      setOpportunities((prev) => prev.filter((o) => o.id !== toDelete.id));
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 mt-10">{t("manage")}</h2>
      <div className="space-y-2">
        {opportunities.map((o) => (
          <div
            key={o.id}
            className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 py-2"
          >
            <span>{o.title}</span>
            <div className="flex gap-1">
              <Link
                href={`/${locale}/opportunities/${o.id}/edit`}
                aria-label={t("edit")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Pencil size={16} />
              </Link>
              <button
                onClick={() => setToDelete(o)}
                aria-label={t("delete")}
                className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title={t("confirmDeleteTitle")}
      >
        <p className="text-gray-500 text-sm mb-6">
          {t("confirmDeleteMessage")}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setToDelete(null)}
            className="px-4 py-2 rounded-lg border dark:border-gray-700"
          >
            {t("cancel")}
          </button>
          <button
            onClick={confirmDelete}
            disabled={deleting}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            {t("confirm")}
          </button>
        </div>
      </Modal>
    </div>
  );
}
