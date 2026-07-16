import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

export default function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-lapis/5 dark:bg-lapis/10 flex items-center justify-center mb-4">
        <Inbox size={26} className="text-lapis/60 dark:text-blue-200/60" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 max-w-xs">{message}</p>
    </motion.div>
  );
}
