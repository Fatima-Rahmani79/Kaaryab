"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextType {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  let nextId = 0;

  const addToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = Date.now() + nextId++;
      setItems((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    [],
  );

  const removeToast = (id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-5 end-5 z-[999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-lg border backdrop-blur-md ${
                item.variant === "success"
                  ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
                  : item.variant === "error"
                    ? "bg-pomegranate/10 dark:bg-pomegranate/20 border-pomegranate/20 dark:border-pomegranate/30 text-pomegranate"
                    : "bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200"
              }`}
            >
              {item.variant === "success" ? (
                <CheckCircle size={18} className="shrink-0 mt-0.5" />
              ) : item.variant === "error" ? (
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
              ) : (
                <Info size={18} className="shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium flex-1">{item.message}</p>
              <button
                onClick={() => removeToast(item.id)}
                className="shrink-0 p-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <X size={15} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
