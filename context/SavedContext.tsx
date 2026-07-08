"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SavedContextType {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);
const STORAGE_KEY = "kaaryab_saved_opportunities";

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // in the first render, we need to load the saved IDs from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSavedIds(JSON.parse(stored));
    setHydrated(true);
  }, []);

  // whenever savedIds changes, we need to save it to LocalStorage — but only after the first render
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    }
  }, [savedIds, hydrated]);

  function toggleSave(id: string) {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function isSaved(id: string) {
    return savedIds.includes(id);
  }

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used within SavedProvider");
  return ctx;
}
