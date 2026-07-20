export default function LatticePattern({
  className = "",
  opacity = 0.06,
  patternId = "lattice-Pattern",
}: {
  className?: string;
  opacity?: number;
  patternId?: string;
}) {
  return (
    <svg
      className={`absolute inset-0 pointer-events-none ${className}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M15 0 L30 15 L15 30 L0 15 Z M15 8 L22 15 L15 22 L8 15 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
        opacity={opacity}
      />
    </svg>
  );
}
