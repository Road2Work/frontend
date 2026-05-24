import { cn } from '@/lib/utils'

type ProgressBarProps = {
  label: string
  value: number
  tone?: 'red' | 'green' | 'amber'
  inverse?: boolean
}

const tones = {
  red: 'bg-brand-red',
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
}

export default function ProgressBar({ label, value, tone = 'red', inverse }: ProgressBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className={cn('font-semibold', inverse ? 'text-white/70' : 'text-ink')}>{label}</span>
        <span className={cn('font-mono text-xs font-bold', inverse ? 'text-white/45' : 'text-muted')}>{value}%</span>
      </div>
      <div className={cn('h-2 overflow-hidden rounded-full', inverse ? 'bg-white/10' : 'bg-ink/8')}>
        <div className={cn('h-full rounded-full', tones[tone])} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
