'use client'

import type { ReactNode } from 'react'
import { AlertCircle, Inbox, Loader2 } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import { cn } from '@/lib/utils'

type PageStateType = 'loading' | 'empty' | 'error'

type PageStateProps = {
  type: PageStateType
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  children?: ReactNode
  className?: string
}

const stateIcons = {
  loading: Loader2,
  empty: Inbox,
  error: AlertCircle,
}

export default function PageState({
  type,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  children,
  className,
}: PageStateProps) {
  const Icon = stateIcons[type]
  const iconClass = type === 'loading' ? 'animate-spin text-brand-red' : type === 'error' ? 'text-brand-red' : 'text-muted'

  return (
    <Card className={cn('p-8', className)}>
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10">
          <Icon className={cn('h-5 w-5', iconClass)} />
        </div>
        <h2 className="font-display text-xl font-black text-ink">{title}</h2>
        {description && <p className="mt-2 text-sm leading-7 text-muted">{description}</p>}
        {children && <div className="mt-5 w-full">{children}</div>}
        {actionLabel && actionHref && (
          <Button href={actionHref} className="mt-6">
            {actionLabel}
          </Button>
        )}
        {actionLabel && onAction && (
          <Button type="button" onClick={onAction} className="mt-6">
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  )
}
