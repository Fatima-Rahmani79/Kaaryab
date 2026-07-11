import { Inbox } from "lucide-react";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <Inbox size={40} className="mb-3" />
      <p>{message}</p>
    </div>
  );
}
