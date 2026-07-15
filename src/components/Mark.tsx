import { useId } from 'react'

// The "Woven Coin" brand mark — a bronze disc with a kente-weave texture and
// the knocked-out "EC" monogram. Reusable at any size (header, footer, etc.).
export function Mark({ size = 32, className }: { size?: number; className?: string }) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '')
  const g = `bo-g-${raw}`
  const w = `bo-w-${raw}`
  const c = `bo-c-${raw}`
  return (
    <svg className={className} viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9b190" />
          <stop offset="1" stopColor="#8a6f4c" />
        </linearGradient>
        <pattern id={w} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#3a2c1c" strokeWidth="1.1" opacity="0.5" />
          <line x1="0" y1="0" x2="8" y2="0" stroke="#e6d3af" strokeWidth="0.9" opacity="0.5" />
        </pattern>
        <clipPath id={c}>
          <circle cx="50" cy="50" r="47" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="47" fill={`url(#${g})`} />
      <g clipPath={`url(#${c})`}>
        <rect x="0" y="0" width="100" height="100" fill={`url(#${w})`} />
      </g>
      <circle cx="50" cy="50" r="47" fill="none" stroke="#2a2016" strokeWidth="1.5" opacity="0.5" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#231a12" strokeWidth="1" opacity="0.22" />
      <text
        x="50"
        y="53"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Space Grotesk',Arial,sans-serif"
        fontWeight="700"
        fontSize="46"
        fill="#231a12"
        letterSpacing="-3"
      >
        EC
      </text>
    </svg>
  )
}
