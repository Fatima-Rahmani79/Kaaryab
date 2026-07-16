"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTranslations } from "next-intl";
import { Opportunity } from "@/types";
import { categoryBreakdown } from "@/lib/utils";

export default function CategoryChart({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const t = useTranslations("categories");
  const data = categoryBreakdown(opportunities).map((d) => ({
    name: t(d.category),
    count: d.count,
  }));

  return (
    <div className="w-full h-72 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className="stroke-gray-100 dark:stroke-gray-800"
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "currentColor" }}
            className="text-gray-400"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              fontSize: 13,
            }}
          />
          <Bar dataKey="count" fill="#2E5AAC" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
