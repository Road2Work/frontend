'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, ChevronRight, Target } from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import AppHeader from '@/components/organisms/AppHeader'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import PageState from '@/components/molecules/PageState'
import { roleFitService } from '@/services/role-fit.service'
import type { RoleFitResult } from '@/types/api-contract'

export default function RoleFitRecommendationTemplate() {
  const router = useRouter()
  const [items, setItems] = useState<RoleFitResult[]>([])
  const [selectedRoleId, setSelectedRoleId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedRoleFit = items.find(item => item.roleId === selectedRoleId)

  useEffect(() => {
    const profileId = window.sessionStorage.getItem('road2work:profile-id') ?? 'profile_cv_001'
    roleFitService
      .generateRanking({ profileId })
      .then(response => {
        setItems(response.data.recommendations)
        setSelectedRoleId(response.data.recommendations[0]?.roleId ?? '')
        setError(null)
      })
      .catch(error => {
        setError(error instanceof Error ? error.message : 'Role Fit Ranking belum bisa dibuat.')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleConfirm = async () => {
    const profileId = window.sessionStorage.getItem('road2work:profile-id') ?? 'profile_cv_001'
    if (!selectedRoleId || isConfirming) return

    setIsConfirming(true)
    try {
      const response = await roleFitService.confirmRole({ profileId, roleId: selectedRoleId })
      window.sessionStorage.setItem('road2work:selected-role-id', response.data.selectedRoleId)
      window.sessionStorage.setItem('road2work:selected-role-name', response.data.roleFit.roleName)
      window.sessionStorage.setItem('road2work:selected-role-fit', JSON.stringify(response.data.roleFit))
      toast.success('Target role dikonfirmasi', {
        description: `${response.data.roleFit.roleName} siap dipakai untuk latihan interview.`,
      })
      router.push('/onboarding')
    } catch (error) {
      toast.error('Gagal konfirmasi role', {
        description: error instanceof Error ? error.message : 'Coba pilih role lagi.',
      })
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo="/profile-review" backLabel="Kembali ke Profil" />

      <main className="mx-auto max-w-5xl px-5 py-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-8">
          <Badge tone="red">Role Fit Ranking</Badge>
          <h1 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,3rem)] font-black leading-tight text-ink">
            Pilih role yang paling relevan.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Rekomendasi ini dibuat dari isi CV dan profil yang sudah kamu review. Kamu tetap bisa memilih role lain secara manual.
          </p>
        </motion.div>

        {isLoading ? (
          <PageState
            type="loading"
            title="Membuat Role Fit Ranking"
            description="Road2Work sedang mencocokkan skill, tools, dan pengalamanmu dengan role yang tersedia."
          />
        ) : error ? (
          <PageState
            type="error"
            title="Ranking role belum bisa dibuat"
            description={error}
            actionLabel="Kembali ke Profil"
            actionHref="/profile-review"
          />
        ) : items.length === 0 ? (
          <PageState
            type="empty"
            title="Belum ada role yang cocok"
            description="Tambahkan skill, tools, atau bukti pengalaman agar rekomendasi role lebih akurat."
            actionLabel="Lengkapi Profil"
            actionHref="/profile-review"
          />
        ) : (
          <div className="grid gap-4">
            {items.map(item => (
              <RoleFitCard key={item.roleId} item={item} selected={selectedRoleId === item.roleId} onSelect={() => setSelectedRoleId(item.roleId)} />
            ))}
          </div>
        )}

        {!isLoading && !error && items.length > 0 && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button href="/start" variant="secondary" size="lg">
            Pilih Role Sendiri
          </Button>
          <Button
            href="/role-fit/detail"
            variant="secondary"
            size="lg"
            onClick={() => {
              if (selectedRoleFit) {
                window.sessionStorage.setItem('road2work:selected-role-fit', JSON.stringify(selectedRoleFit))
                window.sessionStorage.setItem('road2work:selected-role-id', selectedRoleFit.roleId)
                window.sessionStorage.setItem('road2work:selected-role-name', selectedRoleFit.roleName)
              }
            }}
          >
            Lihat Detail
          </Button>
          <Button type="button" size="lg" withArrow={!isConfirming} loading={isConfirming} onClick={handleConfirm}>
            Gunakan Role Ini
          </Button>
        </div>}
      </main>
    </div>
  )
}

function RoleFitCard({ item, selected, onSelect }: { item: RoleFitResult; selected: boolean; onSelect: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="w-full text-left"
    >
      <Card className={`p-5 transition ${selected ? 'border-brand-red/50 bg-brand-red/5 ring-4 ring-brand-red/10' : 'hover:border-ink/15'}`}>
        <button type="button" onClick={onSelect} className="grid w-full gap-5 text-left md:grid-cols-[96px_1fr_auto] md:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-soft">
            <div className="text-center">
              <div className="font-mono text-[0.62rem] font-bold uppercase text-brand-red">Rank</div>
              <div className="font-display text-3xl font-black text-ink">{item.rank}</div>
            </div>
          </div>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h2 className="font-display text-2xl font-black text-ink">{item.roleName}</h2>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">{item.fitScore}% cocok</span>
            </div>
            <p className="text-sm leading-7 text-muted">{item.reason}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniList title="Kekuatan" items={item.strengths} />
              <MiniList title="Yang Perlu Dikuatkan" items={item.gaps} danger />
            </div>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${selected ? 'bg-brand-red text-white' : 'border border-ink/10 text-muted'}`}>
            {selected ? <Check className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </div>
        </button>
        <div className="mt-4 flex justify-end">
          <Link
            href="/role-fit/detail"
            onClick={() => {
              window.sessionStorage.setItem('road2work:selected-role-fit', JSON.stringify(item))
              window.sessionStorage.setItem('road2work:selected-role-id', item.roleId)
              window.sessionStorage.setItem('road2work:selected-role-name', item.roleName)
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold text-ink transition hover:border-brand-red/25 hover:text-brand-red"
          >
            Detail kecocokan <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

function MiniList({ title, items, danger }: { title: string; items: string[]; danger?: boolean }) {
  return (
    <div>
      <div className={`mb-2 flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest ${danger ? 'text-brand-red' : 'text-emerald-700'}`}>
        <Target className="h-3.5 w-3.5" />
        {title}
      </div>
      <div className="space-y-1.5">
        {items.slice(0, 3).map(item => (
          <p key={item} className="text-xs leading-5 text-muted">
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}
