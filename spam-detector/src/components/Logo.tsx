export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="shield-grad" x1="50" y1="5" x2="50" y2="95">
          <stop offset="0%" stopColor="#262626" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="inner-grad" x1="50" y1="15" x2="50" y2="85">
          <stop offset="0%" stopColor="#404040" />
          <stop offset="100%" stopColor="#262626" />
        </linearGradient>
      </defs>
      
      <path d="M50 5L85 20V45C85 65 75 80 50 95C25 80 15 65 15 45V20L50 5Z" fill="url(#shield-grad)"/>
      <path d="M50 15L78 27V45C78 62 70 73 50 85C30 73 22 62 22 45V27L50 15Z" fill="url(#inner-grad)" opacity="0.7"/>
      <path d="M50 5L85 20V45C85 65 75 80 50 95C25 80 15 65 15 45V20L50 5Z" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.3"/>
      
      <g transform="translate(50, 50)">
        <circle cx="0" cy="0" r="18" stroke="#10b981" strokeWidth="3" fill="none" opacity="0.5"/>
        <path d="M-10 0L-3 7L10 -8" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
    </svg>
  )
}
