'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogOut, Menu, ShieldCheck, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Button from '@/components/atoms/Button'
import Logo from '@/components/atoms/Logo'
import { navItems } from '@/data/road2work'

export default function SiteNavbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return Boolean(window.localStorage.getItem('token'))
  })
  const [userRole] = useState<'user' | 'admin'>(() => {
    if (typeof window === 'undefined') return 'user'
    const stored = window.localStorage.getItem('user')
    if (!stored) return 'user'

    try {
      const parsed = JSON.parse(stored) as { role?: 'user' | 'admin' }
      return parsed.role ?? 'user'
    } catch {
      return 'user'
    }
  })
  const isAdmin = userRole === 'admin'

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    document.cookie = 'token=; path=/; max-age=0; SameSite=Lax'
    document.cookie = 'userRole=; path=/; max-age=0; SameSite=Lax'
    setIsAuthenticated(false)
    setOpen(false)
    toast.success('Berhasil keluar')
    router.push('/login')
    router.refresh()
  }

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
        {isAuthenticated ? (
          <div className="hidden items-center gap-3 md:flex">
            <Button href={isAdmin ? '/admin' : '/hub'} variant="ghost" size="sm">
              {isAdmin ? (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Admin Panel
                </>
              ) : 'Dashboard'}
            </Button>
            {isAdmin && (
              <Button href="/hub" variant="ghost" size="sm">
                Dashboard
              </Button>
            )}
            <Button type="button" variant="secondary" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </div>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <Button href="/login" variant="ghost" size="sm">
              Masuk
            </Button>
            <Button href="/signup" size="sm">
              Mulai Bangun Profil
            </Button>
          </div>
        )}
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
            {isAuthenticated ? (
              <>
                <Button href={isAdmin ? '/admin' : '/hub'} variant="secondary" className="w-full">
                  {isAdmin ? (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Admin Panel
                    </>
                  ) : 'Dashboard'}
                </Button>
                {isAdmin && (
                  <Button href="/hub" variant="ghost" className="w-full">
                    Dashboard
                  </Button>
                )}
                <Button type="button" variant="ghost" className="w-full" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Keluar
                </Button>
              </>
            ) : (
              <>
                <Button href="/login" variant="secondary" className="w-full">
                  Masuk
                </Button>
                <Button href="/signup" className="w-full">
                  Mulai Bangun Profil
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
