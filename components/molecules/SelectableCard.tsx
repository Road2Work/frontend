'use client'

import type { ReactNode } from 'react'
import { FiCheck } from 'react-icons/fi'
import Card from '@/components/atoms/Card'
import { cn } from '@/lib/utils'

type SelectableCardProps = {
  title: string
  description?: string
  selected?: boolean
  children?: ReactNode
  onClick?: () => void
}

export default function SelectableCard({
  title,
  description,
  selected,
  children,
  onClick,
}: SelectableCardProps) {
  return (
    <button type="button" onClick={onClick} className="block h-full w-full text-left">
      <Card
        className={cn(
          'relative h-full p-5 transition hover:-translate-y-0.5 hover:shadow-strong',
          selected && 'border-brand-red bg-brand-red/5 ring-4 ring-brand-red/10',
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-black text-ink">{title}</h3>
            {description && <p className="mt-2 text-sm leading-6 text-muted">{description}</p>}
          </div>
          <span
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border',
              selected ? 'border-brand-red bg-brand-red text-white' : 'border-ink/10 bg-white text-transparent',
            )}
          >
            <FiCheck className="h-4 w-4" />
          </span>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </Card>
    </button>
  )
}
