type ScoreRingProps = {
  score: number
  label?: string
  size?: number
}

export default function ScoreRing({ score, label = 'Readiness', size = 132 }: ScoreRingProps) {
  const stroke = size > 110 ? 10 : 7
  const radius = (size - stroke * 2) / 2
  const circumference = 2 * Math.PI * radius
  const dash = (score / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#ECE7E1" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E63946"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          strokeWidth={stroke}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-3xl font-black text-ink">{score}%</div>
        <div className="text-xs font-bold uppercase text-muted">{label}</div>
      </div>
    </div>
  )
}
