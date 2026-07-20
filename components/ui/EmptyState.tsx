import { LucideIcon, Inbox } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  message: string;
  icon?: LucideIcon;
  action?: ReactNode;
}

export default function EmptyState({
  message,
  icon: Icon = Inbox,
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-lapis/5 dark:bg-lapis/10 flex items-center justify-center mb-4">
        <Icon size={26} className="text-lapis/50" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-5">{message}</p>
      {action}
    </div>
  );
}
