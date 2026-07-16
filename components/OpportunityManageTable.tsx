"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Pencil, Trash2, ClipboardList } from "lucide-react";
import { Opportunity } from "@/types";
import Modal from "./Modal";
import Button from "./ui/Button";
import EmptyState from "./EmptyState";

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
    <div className="mt-14">
      <h2 className="text-xl font-display font-bold mb-4">{t("manage")}</h2>

      {opportunities.length === 0 ? (
        <EmptyState message="No opportunities yet." icon={ClipboardList} />
      ) : (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900">
          {opportunities.map((o, i) => (
            <div
              key={o.id}
              className={`flex justify-between items-center px-5 py-3.5 ${
                i !== 0 ? "border-t border-gray-100 dark:border-gray-800" : ""
              }`}
            >
              <span className="text-sm font-medium truncate pe-4">
                {o.title}
              </span>
              <div className="flex gap-1 shrink-0">
                <Link
                  href={`/${locale}/opportunities/${o.id}/edit`}
                  aria-label={t("edit")}
                  className="p-2 rounded-lg hover:bg-lapis/10 text-gray-400 hover:text-lapis transition-colors"
                >
                  <Pencil size={15} />
                </Link>
                <button
                  onClick={() => setToDelete(o)}
                  aria-label={t("delete")}
                  className="p-2 rounded-lg hover:bg-pomegranate/10 text-gray-400 hover:text-pomegranate transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium"
          >
            {t("cancel")}
          </button>
          <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
            {t("confirm")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
