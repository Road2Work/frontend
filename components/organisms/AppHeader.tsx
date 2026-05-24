import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/components/atoms/Logo'

type AppHeaderProps = {
  backTo?: string
  backLabel?: string
  right?: ReactNode
}

export default function AppHeader({ backTo, backLabel = 'Kembali', right }: AppHeaderProps) {
  return (
    <header className="h-16 border-b border-black/[0.06] bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-5">
          <Logo />
          {backTo && (
            <Link href={backTo} className="hidden items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink sm:flex">
              <ArrowLeft size={14} />
              {backLabel}
            </Link>
          )}
        </div>
        {right}
      </div>
    </header>
  )
}
