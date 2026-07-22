"use client";

import { motion } from "framer-motion";
import { Search, FileEdit, Send } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

export default function HowItWorks({
  heading,
  steps,
}: {
  heading: string;
  steps: [Step, Step, Step];
}) {
  const icons = [Search, FileEdit, Send];

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-14">
        {heading}
      </h2>

      <div className="grid md:grid-cols-3 gap-10 relative">
        <div
          className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gray-200 dark:bg-gray-800"
          aria-hidden="true"
        />

        {steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-lapis-deep flex items-center justify-center mb-5 relative z-10">
                <Icon size={26} className="text-saffron" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
