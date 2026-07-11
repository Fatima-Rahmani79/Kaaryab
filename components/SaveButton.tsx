"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSaved } from "@/context/SavedContext";

export default function SaveButton({ id }: { id: string }) {
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved(id);

  return (
    <button
      onClick={() => toggleSave(id)}
      aria-label={saved ? "Remove from saved" : "Save"}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {saved ? (
        <BookmarkCheck size={18} className="text-primary-600" />
      ) : (
        <Bookmark size={18} />
      )}
    </button>
  );
}
