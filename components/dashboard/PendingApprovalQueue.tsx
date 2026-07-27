"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Check, X as XIcon } from "lucide-react";
import { Opportunity } from "@/types";
import { useToast } from "../ui/Toast";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

export default function PendingApprovalQueue({
  initialPending,
}: {
  initialPending: Opportunity[];
}) {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const tCat = useTranslations("categories");
  const locale = useLocale();
  const { toast } = useToast();

  const [pending, setPending] = useState(initialPending);
  const [toReject, setToReject] = useState<Opportunity | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function approve(item: Opportunity) {
    setBusyId(item.id);
    try {
      const res = await fetch(`/api/opportunities/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      if (!res.ok) {
        toast(
          res.status === 403 ? tCommon("forbiddenError") : t("approveError"),
          "error",
        );
        return;
      }
      setPending((prev) => prev.filter((o) => o.id !== item.id));
      toast(t("approveSuccess"), "success");
    } catch {
      toast(t("approveError"), "error");
    } finally {
      setBusyId(null);
    }
  }

  async function confirmReject() {
    if (!toReject) return;
    setBusyId(toReject.id);
    try {
      const res = await fetch(`/api/opportunities/${toReject.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        toast(
          res.status === 403 ? tCommon("forbiddenError") : t("rejectError"),
          "error",
        );
        return;
      }
      setPending((prev) => prev.filter((o) => o.id !== toReject.id));
      toast(t("rejectSuccess"), "success");
      setToReject(null);
    } catch {
      toast(t("rejectError"), "error");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-display font-bold">{t("pendingTitle")}</h2>
        {pending.length > 0 && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-saffron/15 text-saffron">
            {pending.length}
          </span>
        )}
      </div>

      {pending.length === 0 ? (
        <EmptyState message={t("pendingEmpty")} />
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
          {pending.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4"
            >
              <div className="min-w-0">
                <a
                  href={`/${locale}/opportunities/${item.id}`}
                  target="_blank"
                  className="font-medium hover:text-lapis dark:hover:text-saffron transition-colors"
                >
                  {item.title}
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.organization} · {tCat(item.category)}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <Button
                  variant="secondary"
                  disabled={busyId === item.id}
                  onClick={() => approve(item)}
                  className="!px-3 !py-2 text-sm"
                >
                  <Check size={15} /> {t("approve")}
                </Button>
                <Button
                  variant="danger"
                  disabled={busyId === item.id}
                  onClick={() => setToReject(item)}
                  className="!px-3 !py-2 text-sm"
                >
                  <XIcon size={15} /> {t("reject")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!toReject}
        onClose={() => setToReject(null)}
        title={t("confirmRejectTitle")}
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          {t("confirmRejectMessage")}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setToReject(null)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {tCommon("cancel")}
          </button>
          <Button
            variant="danger"
            onClick={confirmReject}
            disabled={busyId === toReject?.id}
          >
            {tCommon("confirm")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
