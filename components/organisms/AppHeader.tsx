import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/components/atoms/Logo'

type AppHeaderProps = {
  backTo?: string
  backLabel?: string
  right?: ReactNode
  tagline?: string
}

export default function AppHeader({ backTo, backLabel = 'Kembali', right, tagline }: AppHeaderProps) {
  return (
    <header className="h-16 border-b border-black/[0.06] bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-5">
          <Logo />
          {backTo && (
            <Link
              href={backTo}
              aria-label={backLabel}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:bg-ink/5 hover:text-ink sm:h-auto sm:w-auto sm:justify-start sm:gap-1.5 sm:rounded-none sm:hover:bg-transparent"
            >
              <ArrowLeft size={16} />
              <span className="hidden text-sm font-medium sm:inline">{backLabel}</span>
            </Link>
          )}
        </div>
        {right ?? (tagline ? (
          <span className="hidden font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-red sm:block">
            {tagline}
          </span>
        ) : null)}
      </div>
    </header>
  )
}
