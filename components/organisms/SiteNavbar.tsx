'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LogOut, Menu, ShieldCheck, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Button from '@/components/atoms/Button'
import Logo from '@/components/atoms/Logo'
import { navItems } from '@/data/road2work'

export default function SiteNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const isLanding = pathname === '/'
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user')

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsAuthenticated(Boolean(window.localStorage.getItem('token')))

      const stored = window.localStorage.getItem('user')
      if (!stored) {
        setUserRole('user')
        return
      }

      try {
        const parsed = JSON.parse(stored) as { role?: 'user' | 'admin' }
        setUserRole(parsed.role ?? 'user')
      } catch {
        setUserRole('user')
      }
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  useEffect(() => {
    if (!isLanding) return

    const updateScrolled = () => setIsScrolled(window.scrollY > 24)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })

    return () => window.removeEventListener('scroll', updateScrolled)
  }, [isLanding])
  const isAdmin = userRole === 'admin'
  const landingElevated = isLanding && (isScrolled || open)

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
    <header
      className={
        isLanding
          ? `sticky left-0 right-0 top-0 z-50 px-4 transition duration-300 ${landingElevated ? 'bg-[#8f1020]/92 shadow-[0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-xl' : 'bg-transparent'}`
          : 'sticky left-0 right-0 top-3 z-50 px-3'
      }
    >
      <div
        className={
          isLanding
            ? 'mx-auto flex h-20 max-w-6xl items-center justify-between px-1 transition duration-300 sm:px-0'
            : 'mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/80 bg-white/[0.82] px-4 shadow-soft backdrop-blur-xl transition-shadow supports-[backdrop-filter]:bg-white/[0.72] sm:px-5'
        }
      >
        <Logo dark={isLanding} />
        <nav className={isLanding ? 'hidden items-center gap-3 md:flex' : 'hidden items-center gap-2 rounded-full bg-ink/[0.03] p-1 md:flex'}>
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={
                isLanding
                  ? 'rounded-full px-4 py-2 text-xs font-bold text-white/78 transition hover:bg-white/10 hover:text-white'
                  : 'rounded-full px-4 py-2 text-xs font-bold text-muted transition hover:bg-white hover:text-ink hover:shadow-soft'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {isAuthenticated ? (
          <div className="hidden items-center gap-3 md:flex">
            <Button href={isAdmin ? '/admin' : '/hub'} variant="ghost" size="sm" className={isLanding ? 'text-white/82 hover:bg-white/10 hover:text-white' : undefined}>
              {isAdmin ? (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Admin Panel
                </>
              ) : 'Dashboard'}
            </Button>
            {isAdmin && (
              <Button href="/hub" variant="ghost" size="sm" className={isLanding ? 'text-white/82 hover:bg-white/10 hover:text-white' : undefined}>
                Dashboard
              </Button>
            )}
            <Button type="button" variant="secondary" size="sm" onClick={handleLogout} className={isLanding ? 'border-white/20 bg-white/12 text-white hover:bg-white/18' : undefined}>
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </div>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <Button href="/login" variant="ghost" size="sm" className={isLanding ? 'text-white/82 hover:bg-white/10 hover:text-white' : undefined}>
              Masuk
            </Button>
            <Button href="/signup" size="sm" className={isLanding ? 'bg-white text-brand-red hover:bg-white/92' : undefined}>
              Mulai Bangun Profil
            </Button>
          </div>
        )}
        <button
          type="button"
          aria-label="Buka tutup navigasi"
          onClick={() => setOpen(value => !value)}
          className={isLanding ? 'rounded-full bg-white/10 p-2 text-white md:hidden' : 'rounded-full bg-ink/[0.04] p-2 text-ink md:hidden'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-[1.75rem] border border-white/80 bg-white/95 px-5 py-4 shadow-strong backdrop-blur-xl md:hidden">
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



