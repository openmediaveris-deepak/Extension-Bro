export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield background */}
      <path
        d="M50 5L85 20V45C85 65 75 80 50 95C25 80 15 65 15 45V20L50 5Z"
        fill="url(#gradient1)"
      />
      
      {/* Inner shield glow */}
      <path
        d="M50 12L78 24V45C78 62 70 75 50 87C30 75 22 62 22 45V24L50 12Z"
        fill="url(#gradient2)"
        opacity="0.8"
      />
      
      {/* Checkmark/X symbol */}
      <g transform="translate(50, 50)">
        {/* X for spam */}
        <path
          d="M-12 -12L12 12M12 -12L-12 12"
          stroke="#fbbf24"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Circle around X */}
        <circle
          cx="0"
          cy="0"
          r="20"
          stroke="#10b981"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
      </g>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#28282e" />
          <stop offset="100%" stopColor="#0a0a0d" />
        </linearGradient>
        <linearGradient id="gradient2" x1="50" y1="12" x2="50" y2="87" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4d4d57" />
          <stop offset="100%" stopColor="#28282e" />
        </linearGradient>
      </defs>
    </svg>
  );
}
