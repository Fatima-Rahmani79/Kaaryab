"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Pencil, Trash2 } from "lucide-react";
import { Opportunity } from "@/types";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

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
    <div className="mt-10">
      <h2 className="text-xl font-display font-bold mb-4">{t("manage")}</h2>
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
        {opportunities.map((o) => (
          <motion.div
            key={o.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-between items-center px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <span className="text-sm">{o.title}</span>
            <div className="flex gap-1">
              <Link
                href={`/${locale}/opportunities/${o.id}/edit`}
                aria-label={t("edit")}
                className="p-2 rounded-full text-gray-400 hover:text-lapis hover:bg-lapis/5 transition-colors"
              >
                <Pencil size={15} />
              </Link>
              <button
                onClick={() => setToDelete(o)}
                aria-label={t("delete")}
                className="p-2 rounded-full text-gray-400 hover:text-pomegranate hover:bg-pomegranate/5 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title={t("confirmDeleteTitle")}
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          {t("confirmDeleteMessage")}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setToDelete(null)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
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
