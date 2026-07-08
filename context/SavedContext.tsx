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
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);
const STORAGE_KEY = "kaaryab_saved_opportunities";


export function SavedProvider( { children }: { children: ReactNode }) {
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        if (hydrated) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
        }
    }, [savedIds, hydrated]);

    function toggleSaved(id: string) {
        setSavedIds(prev) =>
            prev.includes(id) ? prev.filter((x) => x != id) : [...PreviousMap_, id]
    );
    }

    function isSaved(id: string) {
        return savedIds.includes(id);
    }

    return (
        <SavedContext.Provider value={{ savedIds, toggleSaved, isSaved }}>
            {children}
        </SavedContext.Provider>
    );
}
 
export function useSaved(){
    const ctx = useContext(SavedContext);
    if (!ctx) throw new Error("useSaved must be used within a SavedProvider");
    return ctx;
}