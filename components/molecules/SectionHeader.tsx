import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const centered = align === 'center'

  return (
    <div className={cn(centered && 'mx-auto text-center', className)}>
      <div className={cn('mb-4 flex items-center gap-3 text-xs font-bold uppercase text-brand-red', centered && 'justify-center')}>
        <span className="h-px w-8 bg-brand-red" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-brand-red" />}
      </div>
      <h2 className="max-w-3xl text-balance font-display text-3xl font-black leading-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn('mt-5 max-w-2xl text-base leading-8 text-muted', centered && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}
