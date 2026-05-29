'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BarChart2, BrainCircuit, BriefcaseBusiness, CheckCircle2, Download, FileText, History, Lock, Target, TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import AppHeader from '@/components/organisms/AppHeader'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import AuthUserMenu from '@/components/molecules/AuthUserMenu'
import PageState from '@/components/molecules/PageState'
import { AppError } from '@/lib/api'
import { dashboardService } from '@/services/dashboard.service'
import type { CareerReadinessDashboard } from '@/types/api-contract'

const scoreWeights = [
  { label: 'Bukti Pengalaman', weight: '30%', hint: 'Seberapa kuat skill didukung pengalaman nyata' },
  { label: 'Role Fit Score', weight: '30%', hint: 'Seberapa cocok profilmu dengan target role' },
  { label: 'Interview Readiness', weight: '25%', hint: 'Kualitas jawaban dari sesi latihan' },
  { label: 'Kelengkapan Profil', weight: '15%', hint: 'Berapa banyak bagian profil yang sudah diisi' },
]

export default function HubTemplate() {
  const [dashboard, setDashboard] = useState<CareerReadinessDashboard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsProfile, setNeedsProfile] = useState(false)

  useEffect(() => {
    dashboardService
      .getDashboard()
      .then(response => {
        setDashboard(response.data.dashboard)
        setError(null)
        setNeedsProfile(false)
      })
      .catch(error => {
        const isMissingProfile =
          error instanceof AppError &&
          error.status === 404 &&
          /profile/i.test(error.message)

        if (isMissingProfile) {
          setNeedsProfile(true)
          setError(null)
          return
        }

        setError(error instanceof Error ? error.message : 'Dashboard belum bisa dimuat.')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const userName = dashboard?.user.name ?? getStoredUserName()
  const selectedRole = dashboard?.selectedRole.name ?? 'Data Analyst'
  const score = dashboard?.careerReadinessScore ?? 0
  const nextActions = dashboard?.nextBestActions ?? []
  const profileSummaryText = typeof dashboard?.profileSummary === 'object'
    ? dashboard.profileSummary.text
    : dashboard?.profileSummary
  const profileTags = typeof dashboard?.profileSummary === 'object' ? dashboard.profileSummary.tags : []
  const stats = useMemo(
    () => [
      { icon: BarChart2, label: 'Bukti', sublabel: 'Pengalaman nyata', value: dashboard?.evidenceScore ?? 0, tone: '#E63946' },
      { icon: Target, label: 'Role Fit', sublabel: 'Kecocokan target role', value: dashboard?.roleFitScore ?? 0, tone: '#16A34A' },
      { icon: TrendingUp, label: 'Interview', sublabel: 'Kualitas jawaban', value: dashboard?.interviewReadinessScore ?? 0, tone: '#F59E0B' },
      { icon: FileText, label: 'Profil', sublabel: 'Kelengkapan isian', value: dashboard?.profileCompletenessScore ?? 0, tone: '#6366F1' },
    ],
    [dashboard],
  )

  const handleDownloadSummary = async () => {
    if (!dashboard?.canDownloadSummary) {
      toast.info('Career Summary masih terkunci', {
        description: 'Capai skor 90+ untuk membuka ringkasan karier yang bisa diunduh.',
      })
      return
    }

    const response = await dashboardService.downloadSummary()
    toast.success('Career Summary siap diunduh', {
      description: response.data.downloadUrl || 'Ringkasan karier akan tersedia saat fitur unduhan aktif.',
    })
  }

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader
        backTo="/"
        backLabel="Kembali ke Beranda"
        right={<AuthUserMenu fallbackName={userName} />}
      />

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10">
        {isLoading && (
          <PageState
            type="loading"
            title="Memuat Career Readiness Dashboard"
            description="Road2Work sedang menyiapkan skor, prioritas latihan, feedback terbaru, dan riwayat aktivitasmu."
          />
        )}

        {!isLoading && needsProfile && (
          <PageState
            type="empty"
            title="Profil latihan belum dibuat"
            description="Akunmu sudah aktif. Mulai dengan upload CV atau isi profil singkat agar Road2Work bisa menyiapkan role fit, interview context, dan dashboard kesiapanmu."
            actionLabel="Bangun Profil"
            actionHref="/career-onboarding"
          />
        )}

        {!isLoading && !needsProfile && error && (
          <PageState
            type="error"
            title="Dashboard belum bisa dimuat"
            description={error}
            actionLabel="Coba Lagi"
            onAction={() => window.location.reload()}
          />
        )}

        {!isLoading && !needsProfile && !error && (
          <>
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_360px]">
              <div className="relative overflow-hidden bg-ink p-7 text-white sm:p-8">
                <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-red/20 blur-3xl" />
                <Badge tone="red" className="relative border-white/15 bg-white/10 text-white">Career Readiness Dashboard</Badge>
                <h1 className="relative mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.8rem)] font-black leading-[1.04]">
                  Hai {userName.split(' ')[0]}, {dashboard?.scoreMessage ?? `kamu ${score}% siap untuk melamar ${selectedRole}.`}
                </h1>
                <p className="relative mt-5 max-w-xl text-sm leading-7 text-white/62">
                  {dashboard?.readinessStatus ?? 'Hampir siap'}. Selesaikan prioritas berikutnya untuk mencapai skor 90+ dan membuka ringkasan karier.
                </p>
                <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button href="/career-onboarding" size="lg" withArrow>
                    Latihan Sekarang
                  </Button>
                  <Button href="/profile-review" variant="secondary" size="lg">
                    Perbarui Profil
                  </Button>
                  <Button href="/interview-history" variant="secondary" size="lg">
                    <History className="h-4 w-4" />
                    Riwayat Sesi
                  </Button>
                </div>
              </div>

              <div className="flex flex-col justify-between p-7 sm:p-8">
                <div>
                  <div className="mb-4 flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Target Role
                  </div>
                  <h2 className="font-display text-2xl font-black text-ink">{selectedRole}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {dashboard?.roleRecommendation?.reason ?? 'Role dipilih berdasarkan profil dan hasil latihan terbaru.'}
                  </p>
                </div>
                <div className="mt-6 rounded-2xl border border-black/[0.06] bg-paper p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted">Career Summary</span>
                    {dashboard?.canDownloadSummary ? <Download className="h-4 w-4 text-brand-red" /> : <Lock className="h-4 w-4 text-muted" />}
                  </div>
                  <p className="text-xs leading-5 text-muted">
                    {dashboard?.canDownloadSummary
                      ? 'Profil kariermu sudah cukup kuat. Unduh ringkasannya untuk melampirkan ke lamaran.'
                      : 'Capai skor 90+ untuk membuka ringkasan kariermu yang bisa dilampirkan ke lamaran kerja.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadSummary}
                    className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 font-display text-sm font-bold transition ${
                      dashboard?.canDownloadSummary
                        ? 'bg-brand-red text-white hover:-translate-y-0.5 hover:bg-brand-red-dark'
                        : 'border border-ink/10 bg-white text-muted hover:border-ink/20'
                    }`}
                  >
                    {dashboard?.canDownloadSummary ? <Download className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    {dashboard?.canDownloadSummary ? 'Unduh Ringkasan' : 'Terkunci'}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        <section className="mt-5 grid gap-4 md:grid-cols-4">
          {stats.map((item, index) => (
            <ScoreCard key={item.label} {...item} delay={index * 0.05} />
          ))}
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <Card className="p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
              <h2 className="font-display text-xl font-black text-ink">Yang Perlu Dilakukan</h2>
                  <p className="mt-1 text-sm text-muted">Langkah-langkah berikut paling berdampak untuk menaikkan skormu.</p>
                </div>
                <Badge tone="amber">Prioritas</Badge>
              </div>
              <div className="grid gap-3">
                {nextActions.map((action, index) => (
                  <Link key={action.id} href={getNextActionHref(action.actionType)} className="group rounded-2xl border border-black/[0.06] p-4 transition hover:border-brand-red/25 hover:bg-brand-red/5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">{index + 1}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display font-bold text-ink">{action.title}</h3>
                          <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs font-bold text-muted">{action.impactLabel}</span>
                          {action.impactScoreText && <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-xs font-bold text-brand-red">{action.impactScoreText}</span>}
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted">{action.description}</p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-red" />
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-display text-xl font-black text-ink">Bagaimana skor ini dihitung?</h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                Skor kesiapan kariermu berasal dari empat hal. Fokus pada yang bobotnya paling besar untuk hasil tercepat.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {scoreWeights.map(item => (
                  <div key={item.label} className="rounded-2xl bg-paper p-4">
                    <div className="font-display text-2xl font-black text-brand-red">{item.weight}</div>
                    <div className="mt-1 text-xs font-semibold leading-4 text-ink">{item.label}</div>
                    <div className="mt-1 text-[0.65rem] leading-4 text-muted">{item.hint}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <aside className="space-y-5">
            <Card className="p-6">
              <h2 className="font-display text-xl font-black text-ink">Profil Latihanmu</h2>
              <p className="mt-1 text-xs text-muted">Ringkasan yang digunakan sistem untuk menyesuaikan pertanyaan interview.</p>
              <p className="mt-3 text-sm leading-7 text-muted">{profileSummaryText ?? 'Profil belum lengkap. Isi profil agar latihan lebih relevan dengan pengalamanmu.'}</p>
              {profileTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {profileTags.map(tag => (
                    <span key={tag} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-bold text-muted">{tag}</span>
                  ))}
                </div>
              )}
              <Button href="/profile-review" variant="secondary" className="mt-5 w-full">
                Perbarui Profil
              </Button>
            </Card>

            {dashboard?.adaptiveInterviewInsight && (
              <Card className="p-6">
                <div className="mb-3 flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">
                  <BrainCircuit className="h-4 w-4" />
                  Sesi Adaptif
                </div>
                <h2 className="font-display text-xl font-black text-ink">Fokus sesi berikutnya</h2>
                <p className="mt-2 text-xs leading-5 text-muted">Berdasarkan riwayat latihanmu, sistem sudah menyiapkan fokus yang lebih terarah untuk sesi berikutnya.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dashboard.adaptiveInterviewInsight.recommendedFocus.map(item => (
                    <span key={item} className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-bold text-brand-red">
                      {item.replaceAll('_', ' ')}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-5 text-muted">
                  Area yang masih perlu diperkuat: <span className="font-semibold text-ink">{dashboard.adaptiveInterviewInsight.lastWeaknesses.map(item => item.replaceAll('_', ' ')).join(', ')}</span>.
                </p>
              </Card>
            )}

            <Card className="p-6">
              <h2 className="font-display text-xl font-black text-ink">Feedback Terbaru</h2>
              <p className="mt-1 text-xs text-muted">Hasil dari sesi latihan terakhirmu.</p>
              <div className="mt-4 rounded-2xl bg-paper p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">Skor Interview</span>
                  <span className="font-display font-black text-brand-red">{dashboard?.latestInterviewFeedback?.score ?? 0}</span>
                </div>
                <p className="text-sm leading-6 text-muted">{dashboard?.latestInterviewFeedback?.summary ?? 'Belum ada sesi latihan. Mulai sesi pertamamu untuk mendapat feedback.'}</p>
              </div>
              <Button href="/results" variant="ghost" className="mt-4 w-full">
                Lihat Detail Feedback
              </Button>
              <Button href="/interview-history" variant="secondary" className="mt-3 w-full">
                Semua Riwayat Sesi
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="font-display text-xl font-black text-ink">Aktivitas Terbaru</h2>
              <p className="mt-1 text-xs text-muted">Hal-hal yang sudah kamu selesaikan di Road2Work.</p>
              <div className="mt-4 space-y-4">
                {(dashboard?.activityTimeline ?? []).map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{item.title}</p>
                      <p className="mt-0.5 text-xs leading-5 text-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </section>
          </>
        )}
      </main>
    </div>
  )
}

function getStoredUserName() {
  if (typeof window === 'undefined') return 'Road2Work User'

  const stored = window.localStorage.getItem('user')
  if (!stored) return 'Road2Work User'

  try {
    const user = JSON.parse(stored) as { name?: string; email?: string }
    return user.name || user.email || 'Road2Work User'
  } catch {
    return 'Road2Work User'
  }
}

function getNextActionHref(actionType: string) {
  if (actionType === 'practice_interview') return '/onboarding'
  if (actionType === 'review_role' || actionType === 'review_role_fit') return '/role-fit/detail'
  if (actionType === 'download_summary') return '/hub'
  return '/profile-review'
}

function ScoreCard({
  icon: Icon,
  label,
  sublabel,
  value,
  tone,
  delay,
}: {
  icon: typeof BarChart2
  label: string
  sublabel: string
  value: number
  tone: string
  delay: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ backgroundColor: `${tone}14`, color: tone }}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-display text-2xl font-black text-ink">{value}</span>
        </div>
        <div className="mb-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-muted">{label}</div>
        <div className="mb-2 text-[0.65rem] leading-4 text-muted/70">{sublabel}</div>
        <div className="h-2 overflow-hidden rounded-full bg-ink/5">
          <motion.div className="h-full rounded-full" style={{ backgroundColor: tone }} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, delay: delay + 0.2 }} />
        </div>
      </Card>
    </motion.div>
  )
}
