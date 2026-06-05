'use client'

import { useMemo, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import Button from '@/components/atoms/Button'
import type { User } from '@/types/api-contract'

type AuthUserMenuProps = {
  fallbackName?: string
  compact?: boolean
}

export default function AuthUserMenu({ fallbackName = 'User', compact = false }: AuthUserMenuProps) {
  const router = useRouter()
  const storedUser = useSyncExternalStore(subscribeUserStorage, getStoredUserSnapshot, getServerUserSnapshot)
  const user = useMemo(() => parseStoredUser(storedUser), [storedUser])

  const displayName = user?.name ?? fallbackName
  const initial = displayName.slice(0, 1).toUpperCase()
  const userMeta = user?.role === 'admin' ? 'Admin' : user?.email ?? 'Road2Work User'

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    document.cookie = 'token=; path=/; max-age=0; SameSite=Lax'
    document.cookie = 'userRole=; path=/; max-age=0; SameSite=Lax'
    toast.success('Berhasil keluar', {
      description: 'Sesi mock kamu sudah dihapus dari browser.',
    })
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="flex items-center gap-3">
      {!compact && (
        <div className="hidden text-right sm:block">
          <div className="text-sm font-bold text-ink">{displayName}</div>
          <div className="flex items-center justify-end gap-1 text-xs text-muted">
            {user?.role === 'admin' && <ShieldCheck className="h-3 w-3 text-brand-red" />}
            {userMeta}
          </div>
        </div>
      )}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-red-deep font-display text-sm font-bold text-white shadow-[0_2px_8px_rgba(230,57,70,0.25)]">
        {initial}
      </div>
      {user?.role === 'admin' && (
        <Button href="/admin" variant="secondary" size="sm">
          <ShieldCheck className="h-4 w-4" />
          <span className="hidden sm:inline">Admin</span>
        </Button>
      )}
      <Button type="button" variant="ghost" size="sm" onClick={handleLogout} aria-label="Keluar dari akun">
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Keluar</span>
      </Button>
    </div>
  )
}

function subscribeUserStorage(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  return () => window.removeEventListener('storage', onStoreChange)
}

function getStoredUserSnapshot() {
  return window.localStorage.getItem('user')
}

function getServerUserSnapshot() {
  return null
}

function parseStoredUser(storedUser: string | null) {
  if (!storedUser) return null

  try {
    return JSON.parse(storedUser) as Pick<User, 'name' | 'email' | 'role'>
  } catch {
    return null
  }
}