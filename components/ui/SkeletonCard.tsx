"use client";

export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 animate-pulse">
      <div className="flex justify-between items-start gap-2 mb-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-3/5" />
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-2/5 mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
      </div>
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-24" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
      </div>
    </div>
  );
}
