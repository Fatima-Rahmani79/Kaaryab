"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSaved } from "@/context/SavedContext";

export default function SaveButton({ id }: { id: string }) {
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved(id);

  return (
    
  );
}
