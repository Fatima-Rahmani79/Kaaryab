"use client";

import { motion } from "framer-motion";
import { Opportunity } from "@/types";
import OpportunityCard from "../cards/OpportunityCard";

export default function FeaturedSection({
  title,
  opportunities,
}: {
  title: string;
  opportunities: Opportunity[];
}) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {opportunities.map((opp) => (
          <motion.div key={opp.id} variants={item} className="h-full">
            <OpportunityCard opportunity={opp} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
