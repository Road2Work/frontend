'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Logo from '@/components/atoms/Logo'
import { navItems } from '@/data/road2work'

export default function SiteNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky left-0 right-0 top-0 z-50 border-b border-transparent bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            <Link key={item.label} href={item.href} className="text-sm font-semibold text-muted transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button href="/login" variant="ghost" size="sm">
            Masuk
          </Button>
          <Button href="/signup" size="sm">
            Mulai Interview Practice
          </Button>
        </div>
        <button
          type="button"
          aria-label="Buka tutup navigasi"
          onClick={() => setOpen(value => !value)}
          className="rounded-full p-2 text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-ink/10 bg-surface px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map(item => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-2 text-sm font-semibold text-muted hover:bg-ink/5 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/login" variant="secondary" className="w-full">
              Masuk
            </Button>
            <Button href="/signup" className="w-full">
              Mulai Interview Practice
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
