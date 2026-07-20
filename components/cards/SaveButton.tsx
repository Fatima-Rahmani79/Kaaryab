"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSaved } from "@/context/SavedContext";

export default function SaveButton({ id }: { id: string }) {
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved(id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSave(id);
      }}
      aria-label={saved ? "Remove from saved" : "Save"}
      aria-pressed={saved}
      className="relative shrink-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={saved ? "saved" : "unsaved"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="block"
        >
          {saved ? (
            <BookmarkCheck size={18} className="text-saffron" />
          ) : (
            <Bookmark size={18} className="text-gray-400" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
