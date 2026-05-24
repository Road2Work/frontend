import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeProps = {
  children: ReactNode
  tone?: 'red' | 'dark' | 'green' | 'amber' | 'muted'
  className?: string
}

const tones = {
  red: 'border-brand-red/20 bg-brand-red/10 text-brand-red',
  dark: 'border-ink/10 bg-ink/5 text-ink',
  green: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700',
  amber: 'border-amber-500/25 bg-amber-500/10 text-amber-700',
  muted: 'border-border-soft bg-white text-muted',
}

export default function Badge({ children, tone = 'muted', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-normal',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
