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
