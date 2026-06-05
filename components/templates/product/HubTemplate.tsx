'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BarChart2, BrainCircuit, CalendarDays, CheckCircle2, FileText, HelpCircle, Sparkles, Target, TrendingUp, Upload } from 'lucide-react'
import { motion } from 'motion/react'
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
        const dashboardData = response.data.dashboard
        if (dashboardData.profileId) {
          window.sessionStorage.setItem('road2work:profile-id', dashboardData.profileId)
          window.sessionStorage.setItem('road2work:profile-status', 'confirmed')
          window.sessionStorage.setItem('road2work:selected-role-id', dashboardData.selectedRole.id)
          window.sessionStorage.setItem('road2work:selected-role-name', dashboardData.selectedRole.name)
        }
        setDashboard(dashboardData)
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

  const userName = dashboard?.user?.name ?? 'Road2Work User'
  const selectedRole = dashboard?.selectedRole?.name ?? 'Data Analyst'
  const score = dashboard?.careerReadinessScore ?? 0
  const nextActions = dashboard?.nextBestActions ?? []
  const profileSummaryText = typeof dashboard?.profileSummary === 'object'
    ? dashboard.profileSummary.text
    : dashboard?.profileSummary
  const profileTags = uniqueStrings(typeof dashboard?.profileSummary === 'object' ? (dashboard.profileSummary.tags ?? []) : [])
  const adaptiveFocus = uniqueStrings(dashboard?.adaptiveInterviewInsight?.recommendedFocus ?? [])
  const adaptiveWeaknesses = dashboard?.adaptiveInterviewInsight?.lastWeaknesses ?? []
  const stats = useMemo(
    () => [
      { icon: BarChart2, label: 'Bukti Pengalaman', weight: '30% bobot', sublabel: 'Pengalaman nyata', value: dashboard?.evidenceScore ?? 0, tone: '#E63946' },
      { icon: Target, label: 'Role Fit', weight: '30% bobot', sublabel: 'Kecocokan target role', value: dashboard?.roleFitScore ?? 0, tone: '#1F2937' },
      { icon: TrendingUp, label: 'Kualitas Jawaban', weight: '25% bobot', sublabel: 'Hasil interview terbaru', value: dashboard?.interviewReadinessScore ?? 0, tone: '#B91C1C' },
      { icon: FileText, label: 'Kelengkapan Profil', weight: '15% bobot', sublabel: 'Konteks profil', value: dashboard?.profileCompletenessScore ?? 0, tone: '#6B7280' },
    ],
    [dashboard],
  )

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
            <DashboardWelcomeBanner
              userName={userName}
              selectedRole={selectedRole}
              score={score}
              nextActionsCount={nextActions.length}
            />

            <section className="mt-5 grid gap-5 lg:grid-cols-[390px_minmax(0,1fr)]">
              <OverallReadinessCard score={score} status={dashboard?.readinessStatus ?? 'Belum siap'} selectedRole={selectedRole} />
              <CategoryScoresCard items={stats} />
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-5">
                <NextActionCard items={nextActions} />

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
                  {profileTags.map((tag, index) => (
                    <span key={`${tag}-${index}`} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-bold text-muted">{tag}</span>
                  ))}
                </div>
              )}
              <Button href="/profile-review?mode=edit" variant="secondary" className="mt-5 w-full">
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
                  {adaptiveFocus.map((item, index) => (
                    <span key={`${item}-${index}`} className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-bold text-brand-red">
                      {item.replaceAll('_', ' ')}
                    </span>
                  ))}
                </div>
                {adaptiveWeaknesses.length > 0 && (
                  <p className="mt-3 text-xs leading-5 text-muted">
                    Area yang masih perlu diperkuat: <span className="font-semibold text-ink">{adaptiveWeaknesses.map(item => item.replaceAll('_', ' ')).join(', ')}</span>.
                  </p>
                )}
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

function DashboardWelcomeBanner({
  userName,
  selectedRole,
  score,
  nextActionsCount,
}: {
  userName: string
  selectedRole: string
  score: number
  nextActionsCount: number
}) {
  const firstName = userName.split(' ')[0]
  const dateText = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-7 text-white shadow-soft sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute -right-8 -top-10 h-64 w-64 rounded-full bg-brand-red/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-36 w-72 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-medium text-white/45">
              <CalendarDays className="h-4 w-4" />
              {dateText}
            </div>
            <h1 className="font-display text-[clamp(1.8rem,3vw,2.35rem)] font-black leading-tight tracking-[-0.03em]">
              Selamat datang kembali, {firstName}.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
              Kamu sedang berlatih untuk <span className="font-semibold text-white">{selectedRole}</span>. Ada <span className="font-semibold text-brand-red">{nextActionsCount || 1} langkah perbaikan</span> yang bisa menaikkan skor kesiapanmu dari {score} poin.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Link href="/profile-review?mode=edit" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-display text-sm font-bold text-ink shadow-soft transition hover:-translate-y-0.5">
              <Upload className="h-4 w-4" />
              Perbarui Profil
            </Link>
            <Link href="/onboarding" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-3 font-display text-sm font-bold text-white shadow-[0_4px_20px_rgba(230,57,70,0.28)] transition hover:-translate-y-0.5 hover:bg-brand-red-dark">
              <Sparkles className="h-4 w-4" />
              Latihan Adaptif
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function OverallReadinessCard({ score, status, selectedRole }: { score: number; status: string; selectedRole: string }) {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
      <Card className="flex h-full flex-col items-center p-6 text-center">
        <div className="mb-5 self-start font-mono text-[0.62rem] font-bold uppercase tracking-[0.24em] text-muted">
          Skor Kesiapan Keseluruhan
        </div>
        <ReadinessRing score={score} />
        <div className="mt-5 rounded-full bg-amber-500/12 px-4 py-1.5 text-xs font-semibold text-amber-700">
          {status}
        </div>
        <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
          Skor ini merangkum profil, kecocokan role, bukti pengalaman, dan kualitas jawaban interview untuk {selectedRole}.
        </p>
        <Link href="/results" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/10 px-4 py-2.5 font-display text-sm font-bold text-brand-red transition hover:border-brand-red/25 hover:bg-brand-red/5">
          Lihat Detail Skor <ArrowRight className="h-4 w-4" />
        </Link>
      </Card>
    </motion.section>
  )
}

function ReadinessRing({ score }: { score: number }) {
  const size = 168
  const stroke = 12
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dash = (score / 100) * circumference
  const color = score >= 75 ? '#1F2937' : score >= 55 ? '#B91C1C' : '#E63946'

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#EEF2F7" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={stroke}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${dash} ${circumference}` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-black text-ink">{score}</span>
        <span className="text-xs font-medium text-muted">dari 100</span>
      </div>
    </div>
  )
}

function CategoryScoresCard({
  items,
}: {
  items: Array<{ icon: typeof BarChart2; label: string; weight: string; sublabel: string; value: number; tone: string }>
}) {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
      <Card className="h-full p-6">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.24em] text-muted">Skor per kategori</div>
            <p className="mt-1 text-sm text-muted">Setiap kategori punya bobot berbeda terhadap skor akhir.</p>
          </div>
          <div className="hidden items-center gap-1 text-xs text-muted/70 sm:flex">
            <HelpCircle className="h-3.5 w-3.5" />
            Bobot berbeda tiap kategori
          </div>
        </div>
        <div className="space-y-7">
          {items.map((item, index) => (
            <CategoryScoreRow key={item.label} {...item} delay={index * 0.05} />
          ))}
        </div>
      </Card>
    </motion.section>
  )
}

function CategoryScoreRow({
  icon: Icon,
  label,
  weight,
  value,
  tone,
  delay,
}: {
  icon: typeof BarChart2
  label: string
  weight: string
  value: number
  tone: string
  delay: number
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${tone}14`, color: tone }}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-display text-sm font-bold text-ink">{label}</span>
              <span className="text-xs text-muted/70">{weight}</span>
            </div>
          </div>
        </div>
        <div className="shrink-0 text-sm text-ink">
          <span className="font-display font-bold">{value}</span><span className="text-muted/60">/100</span>
        </div>
      </div>
      <div className="ml-12 h-2 overflow-hidden rounded-full bg-[#EEF2F7]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: tone }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function NextActionCard({ items }: { items: CareerReadinessDashboard['nextBestActions'] }) {
  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-black text-ink">Perbaikan Berikutnya</h2>
          <p className="mt-1 text-sm text-muted">Langkah-langkah berikut paling berdampak untuk menaikkan skormu.</p>
        </div>
        <Badge tone="amber">Prioritas</Badge>
      </div>
      <div className="grid gap-3">
        {items.map((action, index) => (
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
  )
}


function getNextActionHref(actionType: string) {
  if (actionType === 'practice_interview') return '/onboarding'
  if (actionType === 'review_role' || actionType === 'review_role_fit') return '/profile-review'
  if (actionType === 'download_summary') return '/hub'
  return '/profile-review'
}

function uniqueStrings(items: string[]) {
  return Array.from(new Set(items.map(item => item.trim()).filter(Boolean)))
}
