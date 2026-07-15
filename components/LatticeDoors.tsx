"use client";

import { motion, useReducedMotion } from "framer-motion";

function DoorPanel({ side }: { side: "left" | "right" }) {
  const reduceMotion = useReducedMotion();
  const exitX = side === "left" ? "-100%" : "100%";

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: reduceMotion ? 0 : exitX }}
      transition={{
        duration: reduceMotion ? 0 : 1.2,
        ease: [0.65, 0, 0.35, 1],
        delay: 0.3,
      }}
      className={`absolute inset-y-0 ${
        side === "left" ? "left-0" : "right-0"
      } w-1/2 bg-lapis-deep`}
    >
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <pattern
            id={`lattice-${side}`}
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M13 0 L26 13 L13 26 L0 13 Z M13 7 L19 13 L13 19 L7 13 Z"
              fill="none"
              stroke="#E8A33D"
              strokeWidth="1"
              opacity="0.45"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#lattice-${side})`} />
      </svg>
    </motion.div>
  );
}

export default function LatticeDoors() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <DoorPanel side="left" />
      <DoorPanel side="right" />
    </div>
  );
}
