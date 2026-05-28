'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, CircleDashed, Target, TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'
import AppHeader from '@/components/organisms/AppHeader'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import PageState from '@/components/molecules/PageState'
import { roleFitService } from '@/services/role-fit.service'
import type { RoleFitResult } from '@/types/api-contract'

export default function RoleFitDetailTemplate() {
  const [roleFit, setRoleFit] = useState<RoleFitResult | null>(() => {
    if (typeof window === 'undefined') return null
    const cached = window.sessionStorage.getItem('road2work:selected-role-fit')
    return cached ? (JSON.parse(cached) as RoleFitResult) : null
  })
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.sessionStorage.getItem('road2work:selected-role-fit')
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = window.sessionStorage.getItem('road2work:selected-role-fit')
    if (cached) return

    const profileId = window.sessionStorage.getItem('road2work:profile-id') ?? 'profile_001'
    const roleId = window.sessionStorage.getItem('road2work:selected-role-id') ?? 'role_data_analyst'
    roleFitService
      .calculateScore({ profileId, roleId })
      .then(response => {
        setRoleFit(response.data.roleFit)
        setError(null)
      })
      .catch(error => {
        setError(error instanceof Error ? error.message : 'Detail role fit belum bisa dimuat.')
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo="/hub" backLabel="Kembali ke Dashboard" />

      <main className="mx-auto max-w-5xl px-5 py-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-8">
          <Badge tone="red">Role Fit Detail</Badge>
          <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] font-black leading-tight text-ink">
            Kenapa role ini cocok untukmu?
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Lihat alasan kecocokan, skill yang sudah mendukung, dan bagian yang masih perlu kamu kuatkan.
          </p>
        </motion.div>

        {isLoading ? (
          <PageState
            type="loading"
            title="Memuat detail role fit"
            description="Road2Work sedang membaca kecocokan profilmu dengan target role."
          />
        ) : error ? (
          <PageState
            type="error"
            title="Detail role fit belum bisa dimuat"
            description={error}
            actionLabel="Kembali ke Dashboard"
            actionHref="/hub"
          />
        ) : !roleFit ? (
          <PageState
            type="empty"
            title="Role fit belum tersedia"
            description="Pilih target role terlebih dahulu agar sistem bisa menampilkan detail kecocokan."
            actionLabel="Pilih Role"
            actionHref="/start"
          />
        ) : (
          <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
            <Card className="p-6">
              <div className="mb-5 flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">
                <Target className="h-4 w-4" />
                Role Terpilih
              </div>
              <h2 className="font-display text-3xl font-black text-ink">{roleFit.roleName}</h2>
              <div className="mt-6 flex items-end gap-3">
                <div className="font-display text-6xl font-black text-brand-red">{roleFit.fitScore}</div>
                <div className="pb-2 text-sm font-bold text-muted">/100 cocok</div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/5">
                <motion.div
                  className="h-full rounded-full bg-brand-red"
                  initial={{ width: 0 }}
                  animate={{ width: `${roleFit.fitScore}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <p className="mt-5 text-sm leading-7 text-muted">{roleFit.reason}</p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/onboarding" size="lg" withArrow>
                  Lanjut Interview
                </Button>
                <Button href="/role-fit" variant="secondary" size="lg">
                  Lihat Ranking
                </Button>
              </div>
            </Card>

            <div className="space-y-5">
              <Card className="p-6">
                <div className="mb-5 flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">
                  <TrendingUp className="h-4 w-4" />
                  Kecocokan Skill
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <SkillList title="Sudah Mendukung" items={roleFit.skillOverlap.matchedSkills} />
                  <SkillList title="Perlu Dikuatkan" items={roleFit.skillOverlap.missingSkills} danger />
                </div>
              </Card>

              <div className="grid gap-5 md:grid-cols-2">
                <InsightList title="Kekuatan" items={roleFit.strengths} />
                <InsightList title="Perlu Dikuatkan" items={roleFit.gaps} danger />
              </div>

              <Card className="p-6">
                <h2 className="font-display text-xl font-black text-ink">Langkah Berikutnya</h2>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Tambahkan bukti pengalaman untuk skill yang belum kuat, lalu mulai satu sesi interview dengan target role ini.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link href="/profile-review" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-5 py-3 font-display text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-ink">
                    Lengkapi Profil <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/hub" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-5 py-3 font-display text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-ink">
                    Kembali ke Dashboard
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function SkillList({ title, items, danger }: { title: string; items: string[]; danger?: boolean }) {
  return (
    <div className="rounded-2xl bg-paper p-4">
      <h3 className={`font-mono text-[0.62rem] font-bold uppercase tracking-widest ${danger ? 'text-brand-red' : 'text-emerald-700'}`}>
        {title}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item} className={`rounded-full px-3 py-1 text-xs font-bold ${danger ? 'bg-brand-red/10 text-brand-red' : 'bg-emerald-500/10 text-emerald-700'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function InsightList({ title, items, danger }: { title: string; items: string[]; danger?: boolean }) {
  return (
    <Card className="p-6">
      <h2 className={`mb-4 font-mono text-[0.62rem] font-bold uppercase tracking-widest ${danger ? 'text-brand-red' : 'text-emerald-700'}`}>
        {title}
      </h2>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item} className="flex items-start gap-3">
            <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${danger ? 'bg-brand-red/10 text-brand-red' : 'bg-emerald-500/10 text-emerald-700'}`}>
              {danger ? <CircleDashed className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
            </div>
            <p className="text-sm leading-6 text-muted">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
