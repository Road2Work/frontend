'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Award,
  BarChart2,
  BookOpen,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Gauge,
  Eye,
  History,
  Lightbulb,
  MessageSquare,
  RotateCcw,
  Target,
  TrendingUp,
  Volume2,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import AppHeader from '@/components/organisms/AppHeader'
import { resultService } from '@/services/result.service'
import type { BeforeAfterImprovement, InterviewResult, NextPracticeRecommendation, PracticeMode, ResultInsight, ScoreBreakdown } from '@/types/api-contract'

const scoreBreakdownLabels = [
  { key: 'roleRelevance', label: 'Relevansi Peran', icon: Target },
  { key: 'starStructure', label: 'Struktur STAR', icon: BookOpen },
  { key: 'evidenceSpecificity', label: 'Spesifisitas Bukti', icon: BarChart2 },
  { key: 'technicalAccuracy', label: 'Akurasi Teknis', icon: Cpu },
  { key: 'communicationClarity', label: 'Kejelasan Komunikasi', icon: Volume2 },
  { key: 'selfAwareness', label: 'Kesadaran Diri', icon: Eye },
] as const

type ScoreBreakdownItem = {
  label: string
  score: number
  icon: LucideIcon
}
export default function ResultsTemplate() {
  const [result, setResult] = useState<InterviewResult | null>(null)
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return Boolean(window.sessionStorage.getItem('road2work:session-id'))
  })
  const [sessionStats] = useState(() => {
    const totalQuestions = typeof window === 'undefined' ? '3' : (window.sessionStorage.getItem('road2work:total-main-questions') ?? '3')
    return [
      { icon: MessageSquare, label: 'Pertanyaan', value: `${totalQuestions} / ${totalQuestions}` },
      { icon: Clock, label: 'Durasi', value: '3-8 menit' },
    ]
  })

  useEffect(() => {
    const sessionId = window.sessionStorage.getItem('road2work:session-id')
    if (!sessionId) {
      return
    }

    resultService
      .getResult(sessionId)
      .then(response => setResult(normalizeInterviewResult(response.data.result)))
      .catch(() => setResult(null))
      .finally(() => setIsLoading(false))
  }, [])

  const breakdown = result ? toScoreBreakdownItems(result) : []
  const strengthItems = result?.strengths?.length
    ? result.strengths.map(item => ({ body: item.description, meta: item.evidence ?? item.title }))
    : []
  const improvementItems =
    result?.improvementAreas?.length
      ? result.improvementAreas.map(item => ({ body: item.description, meta: item.evidence ?? item.title }))
      : []
  const practiceItems = result?.nextPracticeRecommendation?.focusAreas ?? []

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo="/hub" backLabel="Kembali ke Hub" />

      <main className="mx-auto max-w-5xl space-y-4 px-5 py-10">
        <DashboardUpdatedNotice result={result} isLoading={isLoading} />

        <ResultHeroCard result={result} sessionStats={sessionStats} />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InsightCard
            title="Kekuatan"
            icon={Award}
            tone="success"
            items={strengthItems}
            emptyMessage="Kekuatan belum tersedia. Selesaikan evaluasi interview untuk melihat bagian ini."
          />
          <InsightCard
            title="Area Perbaikan"
            icon={TrendingUp}
            tone="danger"
            items={improvementItems}
            emptyMessage="Area perbaikan belum tersedia. Road2Work akan menampilkannya setelah evaluasi selesai."
          />
        </section>

        <BeforeAfterCard result={result} />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <BreakdownCard items={breakdown} />
          <NextPracticeCard result={result} items={practiceItems} />
        </section>

        <AdaptiveSessionSuggestionCard result={result} />

        <ResultActions result={result} />
      </main>
    </div>
  )
}

function DashboardUpdatedNotice({ result, isLoading }: { result: InterviewResult | null; isLoading: boolean }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.08] p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-700">
            <Gauge className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-black text-ink">Career Readiness Dashboard diperbarui</h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              {isLoading
                ? 'Road2Work sedang mengambil hasil latihan terbarumu.'
                : result
                  ? 'Hasil interview ini sudah memperbarui skor kesiapan, prioritas latihan, dan feedback terbaru di dashboard.'
                  : 'Hasil interview belum tersedia. Coba buka lagi setelah proses evaluasi selesai.'}
            </p>
          </div>
        </div>
        <Link
          href="/hub"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-display text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-ink-soft"
        >
          Lihat Dashboard <ArrowRight size={14} />
        </Link>
      </div>
    </motion.section>
  )
}

function ResultHeroCard({ result, sessionStats }: { result: InterviewResult | null; sessionStats: Array<{ icon: LucideIcon; label: string; value: string }> }) {
  const targetRole = result?.targetRole?.roleName ?? result?.selectedRole?.name ?? 'Role target'
  const score = result?.finalScore ?? 0
  const readinessStatus = result ? translateReadiness(result.readinessStatus) : 'Menunggu Evaluasi'
  const lowestScore = result ? getLowestScoreLabel(result) : 'Skor belum tersedia'
  const headline = result ? getResultHeadline(score) : ['Hasil belum tersedia.', 'Cek lagi sebentar.']
  const summary = result?.summary ?? buildResultSummary(result)
  const stats = result?.createdAt
    ? [...sessionStats, { icon: Calendar, label: 'Tanggal', value: formatResultDate(result.createdAt) }]
    : sessionStats

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-3xl border border-black/[0.07] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)] md:p-8"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 bg-[radial-gradient(circle_at_0%_0%,rgba(230,57,70,0.055)_0%,transparent_65%)]" />

      <SectionKicker label="Hasil Wawancara" />

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start xl:gap-12">
        <AnimatedScoreRing score={score} />

        <div className="flex-1 text-center lg:text-left">
          <div className="mb-4 flex flex-wrap justify-center gap-2 lg:justify-start">
            <StatusBadge icon={Target} label={`${targetRole} - Sesi Teknikal`} tone="dark" />
            <StatusBadge icon={Zap} label={readinessStatus} tone="amber" />
            <StatusBadge icon={BarChart2} label={lowestScore} tone="red" />
          </div>

          <h1 className="mb-3 font-display text-[clamp(1.4rem,2.6vw,1.85rem)] font-black leading-[1.18] tracking-[-0.04em] text-ink">
            {headline[0]}
            <br />
            {headline[1]}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            {summary}
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-row justify-center gap-5 border-t border-black/[0.06] pt-5 lg:w-auto lg:flex-col lg:justify-start lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {stats.map(stat => (
            <SessionStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function AnimatedScoreRing({ score }: { score: number }) {
  const size = 184
  const strokeWidth = 10
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const dash = (score / 100) * circumference
  const ringColor = score >= 80 ? '#22C55E' : score >= 65 ? '#F59E0B' : '#E63946'

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${ringColor}18 0%, transparent 65%)`,
          transform: 'scale(1.5)',
        }}
      />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${dash} ${circumference}` }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
        />
        <text x="50%" y="44%" textAnchor="middle" dy="0.35em" fontSize={size / 4} fontWeight="800" fill="#1F2937" className="font-display">
          {score}
        </text>
        <text x="50%" y="63%" textAnchor="middle" fontSize={size / 14} fill="#A0A0A0" className="font-mono tracking-wider">
          KESIAPAN
        </text>
      </svg>
    </div>
  )
}

function StatusBadge({ icon: Icon, label, tone }: { icon: LucideIcon; label: string; tone: 'dark' | 'amber' | 'red' }) {
  const tones = {
    dark: 'border-black/[0.08] bg-ink/5 text-slate-700',
    amber: 'border-amber-500/25 bg-amber-500/10 text-amber-700',
    red: 'border-brand-red/20 bg-brand-red/10 text-brand-red',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${tones[tone]}`}>
      <Icon size={10} />
      {label}
    </span>
  )
}

function SessionStat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/[0.04]">
        <Icon size={14} className="text-slate-400" />
      </div>
      <div>
        <div className="font-mono text-xs tracking-wide text-[#A0A0A0]">{label}</div>
        <div className="font-display text-sm font-semibold tracking-[-0.01em] text-ink">{value}</div>
      </div>
    </div>
  )
}

function InsightCard({
  title,
  icon: Icon,
  tone,
  items,
  emptyMessage,
}: {
  title: string
  icon: LucideIcon
  tone: 'success' | 'danger'
  items: Array<{ body: string; meta: string }>
  emptyMessage: string
}) {
  const isSuccess = tone === 'success'
  const accent = isSuccess ? '#22C55E' : '#E63946'

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isSuccess ? 0.1 : 0.15 }}
      className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)]"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <div className="mb-5 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest" style={{ color: accent }}>
        <Icon size={11} />
        {title}
      </div>
      {items.length ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={`${item.body}-${index}`} className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
                style={{
                  backgroundColor: isSuccess ? 'rgba(34,197,94,0.1)' : 'rgba(230,57,70,0.07)',
                  borderColor: isSuccess ? 'rgba(34,197,94,0.2)' : 'rgba(230,57,70,0.15)',
                }}
              >
                {isSuccess ? <CheckCircle2 size={10} style={{ color: accent }} /> : <ChevronRight size={10} style={{ color: accent }} />}
              </div>
              <div>
                <p className="text-sm leading-snug text-ink">{item.body}</p>
                <span className="mt-1 inline-block font-mono text-xs tracking-wide text-[#A0A0A0]">{item.meta}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyInlineState message={emptyMessage} />
      )}
    </motion.section>
  )
}
function BeforeAfterCard({ result }: { result: InterviewResult | null }) {
  const improvements = (result?.beforeAfterImprovement ?? []).filter(item => item.beforeAnswer || item.afterAnswer)

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-slate-400">
          <div className="h-px w-4 bg-slate-400/60" />
          Perbaikan Jawaban: Sebelum ke Sesudah
        </div>
        <div className="rounded-full bg-black/[0.04] px-2.5 py-1 font-mono text-xs tracking-wide text-slate-400">
          {improvements.length ? `${improvements.length} jawaban dievaluasi` : 'Menunggu hasil evaluasi'}
        </div>
      </div>

      {improvements.length ? (
        <div className="space-y-5">
          {improvements.map((improvement, index) => {
            const note = improvement.improvementNotes?.length
              ? improvement.improvementNotes.join(', ')
              : 'Tambahkan konteks, kontribusi pribadi, tools yang digunakan, dan hasil yang terukur.'

            return (
              <div key={`${improvement.questionText}-${index}`} className="rounded-2xl border border-black/[0.05] bg-black/[0.015] p-4">
                <div className="mb-3 inline-flex max-w-full rounded-full bg-white px-3 py-1 font-mono text-xs tracking-wide text-slate-400 shadow-sm">
                  <span className="truncate">{improvement.questionText || `Jawaban ${index + 1}`}</span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <AnswerPanel
                    tone="danger"
                    label="Jawaban Kamu"
                    body={improvement.beforeAnswer || 'Jawaban awal tidak tersedia dari sesi ini.'}
                    note="Versi awal dari jawaban yang dievaluasi sistem."
                  />
                  <AnswerPanel
                    tone="success"
                    label="Jawaban yang Diperbaiki"
                    body={improvement.afterAnswer || 'Saran perbaikan belum tersedia untuk jawaban ini.'}
                    note={note}
                  />
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/10 bg-black/[0.02] p-5 text-sm leading-6 text-muted">
          Perbandingan jawaban belum tersedia untuk sesi ini. Setelah evaluasi lengkap tersimpan, bagian ini akan menampilkan jawaban asli dan versi yang lebih kuat berdasarkan konteks interview kamu.
        </div>
      )}
    </motion.section>
  )
}
function AnswerPanel({
  tone,
  label,
  body,
  note,
}: {
  tone: 'success' | 'danger'
  label: string
  body: React.ReactNode
  note: string
}) {
  const isSuccess = tone === 'success'
  const accent = isSuccess ? '#16A34A' : '#DC2626'

  return (
    <div>
      <div className="mb-2.5 flex items-center gap-2 font-mono text-xs tracking-wide" style={{ color: accent }}>
        <div
          className="flex h-4 w-4 items-center justify-center rounded-full border text-[9px]"
          style={{
            backgroundColor: isSuccess ? 'rgba(34,197,94,0.1)' : 'rgba(220,38,38,0.1)',
            borderColor: isSuccess ? 'rgba(34,197,94,0.2)' : 'rgba(220,38,38,0.2)',
          }}
        >
          {isSuccess ? '+' : 'x'}
        </div>
        {label}
      </div>
      <div
        className="rounded-xl border p-4 text-sm leading-relaxed"
        style={{
          backgroundColor: isSuccess ? 'rgba(34,197,94,0.03)' : 'rgba(239,68,68,0.03)',
          borderColor: isSuccess ? 'rgba(34,197,94,0.14)' : 'rgba(239,68,68,0.1)',
          color: isSuccess ? '#374151' : '#6B7280',
          fontStyle: isSuccess ? 'normal' : 'italic',
        }}
      >
        &quot;{body}&quot;
      </div>
      <div
        className="mt-2.5 rounded-lg px-3 py-2 text-xs"
        style={{
          backgroundColor: isSuccess ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)',
          color: accent,
        }}
      >
        {note}
      </div>
    </div>
  )
}

function BreakdownCard({ items }: { items: ScoreBreakdownItem[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)] md:col-span-3"
    >
      <SectionKicker label="Rincian Skor" muted />
      {items.length ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <ScoreBar key={item.label} {...item} delay={index * 0.07} />
          ))}
        </div>
      ) : (
        <EmptyInlineState message="Rincian skor belum tersedia. Selesaikan evaluasi interview untuk melihat breakdown jawaban." />
      )}
    </motion.section>
  )
}
function ScoreBar({ label, score, icon: Icon, delay }: { label: string; score: number; icon: LucideIcon; delay: number }) {
  const color = score >= 75 ? '#22C55E' : score >= 60 ? '#F59E0B' : '#E63946'
  const textColor = score >= 75 ? '#16A34A' : score >= 60 ? '#B45309' : '#DC2626'

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}18` }}>
            <Icon size={11} style={{ color }} />
          </div>
          <span className="text-sm text-slate-600">{label}</span>
        </div>
        <span className="font-display text-sm font-bold tracking-[-0.01em]" style={{ color: textColor }}>
          {score}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#F0F0F0]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, delay: delay + 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function NextPracticeCard({ result, items }: { result: InterviewResult | null; items: string[] }) {
  const recommendation = result?.nextPracticeRecommendation
  const hasItems = items.length > 0

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col rounded-2xl bg-ink p-6 md:col-span-2"
    >
      <div className="mb-1 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-white/35">
        <Lightbulb size={11} className="text-brand-red" />
        Latihan Berikutnya
      </div>
      <h3 className="mb-5 font-display text-lg font-bold tracking-[-0.03em] text-white">
        {recommendation?.practiceType ? `Fokus: ${recommendation.practiceType}` : 'Latihan belum tersedia'}
      </h3>

      {hasItems ? (
        <div className="flex-1 space-y-3.5">
          {items.map((step, index) => (
            <div key={`${step}-${index}`} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border border-brand-red/30 bg-brand-red/20 font-mono text-xs font-bold text-brand-red">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed text-white/65">{step}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/60">
          Rekomendasi latihan belum tersedia. Coba cek lagi setelah evaluasi selesai.
        </div>
      )}

      {hasItems && (
        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="mb-1 font-mono text-xs tracking-wide text-white/30">ESTIMASI PENINGKATAN</div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-black tracking-[-0.03em] text-emerald-500">+12-18 pts</span>
            <span className="text-xs text-white/30">di sesi berikutnya</span>
          </div>
        </div>
      )}
    </motion.section>
  )
}
function AdaptiveSessionSuggestionCard({ result }: { result: InterviewResult | null }) {
  const suggestion = result?.adaptiveSessionSuggestion

  if (!suggestion) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32 }}
      className="rounded-2xl border border-brand-red/15 bg-brand-red/[0.05] p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">
            <BrainCircuit className="h-4 w-4" />
            Fokus Latihan Berikutnya
          </div>
          <h3 className="font-display text-xl font-black text-ink">Sesi berikutnya akan fokus pada area terlemah.</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Road2Work akan memakai hasil sesi ini agar pertanyaan berikutnya tidak berulang dan lebih fokus pada bagian yang perlu diperkuat.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
          {suggestion.recommendedFocus.map((item, index) => (
            <span key={`${item}-${index}`} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-red shadow-soft">
              {item.replaceAll('_', ' ')}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function ResultActions({ result }: { result: InterviewResult | null }) {
  const handlePracticeAgain = () => {
    if (!result?.adaptiveSessionSuggestion) return

    window.sessionStorage.setItem('road2work:practice-mode', result.adaptiveSessionSuggestion.suggestedPracticeMode)
    window.sessionStorage.setItem('road2work:adaptive-retry-mode', 'false')
    window.sessionStorage.setItem('road2work:adaptive-avoid-repeated-questions', String(result.adaptiveSessionSuggestion.avoidRepeatedQuestions))
    window.sessionStorage.setItem('road2work:adaptive-improvement-focus', JSON.stringify(result.adaptiveSessionSuggestion.recommendedFocus))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="flex flex-col items-center justify-center gap-3 pb-10 pt-4 sm:flex-row"
    >
      <Link
        href="/hub"
        className="inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3.5 font-display text-sm font-semibold tracking-[-0.01em] text-white shadow-[0_4px_20px_rgba(230,57,70,0.28),0_1px_3px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:bg-brand-red-dark"
      >
        <Gauge size={14} />
        Buka Dashboard
      </Link>
      <Link
        href="/onboarding"
        onClick={handlePracticeAgain}
        className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-display text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-ink"
      >
        <RotateCcw size={14} />
        Latihan Lagi
      </Link>
      <Link
        href="/career-onboarding"
        className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-display text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-ink"
      >
        Coba Path Lain
        <ArrowRight size={14} />
      </Link>
      <Link
        href="/interview-history"
        className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-display text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-ink"
      >
        <History size={14} />
        Riwayat
      </Link>
    </motion.div>
  )
}

function EmptyInlineState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-black/10 bg-black/[0.02] p-4 text-sm leading-6 text-muted">
      {message}
    </div>
  )
}
function SectionKicker({ label, muted }: { label: string; muted?: boolean }) {
  return (
    <div className={`mb-6 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest ${muted ? 'text-slate-400' : 'text-brand-red'}`}>
      <div className={`h-px w-4 ${muted ? 'bg-slate-400/60' : 'bg-brand-red'}`} />
      {label}
    </div>
  )
}

function translateReadiness(status: InterviewResult['readinessStatus']) {
  const labels = {
    Ready: 'Siap',
    'Almost Ready': 'Hampir Siap',
    'Needs Practice': 'Perlu Latihan',
  }

  return labels[status] ?? 'Hampir Siap'
}

function toScoreBreakdownItems(result: InterviewResult): ScoreBreakdownItem[] {
  const breakdown = result.scoreBreakdown
  return scoreBreakdownLabels.map(item => ({
    label: item.label,
    score: breakdown[item.key],
    icon: item.icon,
  }))
}

function getLowestScoreLabel(result: InterviewResult) {
  const lowest = toScoreBreakdownItems(result).reduce((current, item) => (item.score < current.score ? item : current))
  return `${lowest.label}: ${lowest.score}`
}

type RawRecord = Record<string, unknown>

function normalizeInterviewResult(rawResult: unknown): InterviewResult {
  const raw = isRecord(rawResult) ? rawResult : {}
  const scoreBreakdownRaw = getRecord(raw.scoreBreakdown) ?? getRecord(raw.score_breakdown)
  const targetRoleRaw = getRecord(raw.targetRole) ?? getRecord(raw.target_role) ?? getRecord(raw.selectedRole) ?? getRecord(raw.selected_role)
  const nextPracticeRaw = getRecord(raw.nextPracticeRecommendation) ?? getRecord(raw.next_practice_recommendation)

  return {
    id: getString(raw.id, 'result_latest'),
    sessionId: getString(raw.sessionId ?? raw.session_id, ''),
    finalScore: clampScore(getNumber(raw.finalScore ?? raw.final_score, 0)),
    interviewReadinessScore: getOptionalNumber(raw.interviewReadinessScore ?? raw.interview_readiness_score),
    readinessStatus: normalizeReadinessStatus(raw.readinessStatus ?? raw.readiness_status),
    summary: getOptionalString(raw.summary),
    evidenceLevel: clampScore(getNumber(raw.evidenceLevel ?? raw.evidence_level, 0)),
    selectedRole: normalizeSelectedRole(raw.selectedRole ?? raw.selected_role),
    targetRole: {
      id: getString(targetRoleRaw?.id, ''),
      roleName: getString(targetRoleRaw?.roleName ?? targetRoleRaw?.role_name ?? targetRoleRaw?.name, 'Role target'),
      roleFamily: getString(targetRoleRaw?.roleFamily ?? targetRoleRaw?.role_family, ''),
    },
    strengths: normalizeInsightArray(raw.strengths),
    improvementAreas: normalizeInsightArray(raw.improvementAreas ?? raw.improvement_areas),
    beforeAfterImprovement: normalizeBeforeAfterArray(raw.beforeAfterImprovement ?? raw.before_after_improvement),
    nextPracticeRecommendation: normalizePracticeRecommendation(nextPracticeRaw),
    adaptiveSessionSuggestion: normalizeAdaptiveSuggestion(raw.adaptiveSessionSuggestion ?? raw.adaptive_session_suggestion),
    scoreBreakdown: normalizeScoreBreakdown(scoreBreakdownRaw),
    createdAt: getString(raw.createdAt ?? raw.created_at, new Date().toISOString()),
  }
}

function normalizeScoreBreakdown(raw?: RawRecord): ScoreBreakdown {
  return {
    roleRelevance: clampScore(getNumber(raw?.roleRelevance ?? raw?.role_relevance, 0)),
    starStructure: clampScore(getNumber(raw?.starStructure ?? raw?.star_structure, 0)),
    evidenceSpecificity: clampScore(getNumber(raw?.evidenceSpecificity ?? raw?.evidence_specificity, 0)),
    technicalAccuracy: clampScore(getNumber(raw?.technicalAccuracy ?? raw?.technical_accuracy, 0)),
    communicationClarity: clampScore(getNumber(raw?.communicationClarity ?? raw?.communication_clarity, 0)),
    selfAwareness: clampScore(getNumber(raw?.selfAwareness ?? raw?.self_awareness, 0)),
  }
}

function normalizeInsightArray(value: unknown): ResultInsight[] {
  if (!Array.isArray(value)) return []
  return value.map((item, index) => {
    const raw = isRecord(item) ? item : {}
    return {
      title: getString(raw.title, `Insight ${index + 1}`),
      description: getString(raw.description ?? raw.text ?? raw.body ?? raw.reason ?? raw.cause ?? raw.suggestion, String(item)),
      evidence: getOptionalString(raw.evidence ?? raw.meta ?? raw.suggestion ?? raw.cause),
    }
  }).filter(item => item.description.trim().length > 0)
}

function normalizeBeforeAfterArray(value: unknown): BeforeAfterImprovement[] {
  if (!Array.isArray(value)) return []
  return value.map(item => {
    const raw = isRecord(item) ? item : {}
    return {
      questionText: getString(raw.questionText ?? raw.question_text ?? raw.question, 'Jawaban interview'),
      beforeAnswer: getString(raw.beforeAnswer ?? raw.before_answer ?? raw.before, ''),
      afterAnswer: getString(raw.afterAnswer ?? raw.after_answer ?? raw.after, ''),
      improvementNotes: normalizeStringArray(raw.improvementNotes ?? raw.improvement_notes ?? [raw.problem, raw.why_better, raw.evidence_ladder_note].filter(Boolean)),
    }
  }).filter(item => item.beforeAnswer || item.afterAnswer)
}

function normalizePracticeRecommendation(raw?: RawRecord | null): NextPracticeRecommendation {
  return {
    practiceType: getString(raw?.practiceType ?? raw?.practice_type, '') as NextPracticeRecommendation['practiceType'],
    reason: getString(raw?.reason, ''),
    focusAreas: normalizeStringArray(raw?.focusAreas ?? raw?.focus_areas),
  }
}

function normalizeAdaptiveSuggestion(value: unknown): InterviewResult['adaptiveSessionSuggestion'] {
  const raw = getRecord(value)
  if (!raw) return undefined
  return {
    recommendedFocus: normalizeStringArray(raw.recommendedFocus ?? raw.recommended_focus),
    avoidRepeatedQuestions: getBoolean(raw.avoidRepeatedQuestions ?? raw.avoid_repeated_questions, true),
    suggestedPracticeMode: getString(raw.suggestedPracticeMode ?? raw.suggested_practice_mode, 'adaptive_from_history') as PracticeMode,
  }
}

function normalizeSelectedRole(value: unknown): InterviewResult['selectedRole'] {
  const raw = getRecord(value)
  if (!raw) return undefined
  return { id: getString(raw.id, ''), name: getString(raw.name ?? raw.roleName ?? raw.role_name, 'Role target') }
}

function normalizeReadinessStatus(value: unknown): InterviewResult['readinessStatus'] {
  const status = getString(value, 'Almost Ready')
  if (status === 'Ready' || status === 'Almost Ready' || status === 'Needs Practice') return status
  if (status.toLowerCase().includes('ready') && !status.toLowerCase().includes('almost')) return 'Ready'
  if (status.toLowerCase().includes('practice')) return 'Needs Practice'
  return 'Almost Ready'
}

function buildResultSummary(result: InterviewResult | null) {
  if (!result) return 'Hasil belum tersedia. Setelah proses evaluasi selesai, Road2Work akan menampilkan skor, kekuatan, area perbaikan, dan latihan berikutnya di sini.'

  const lowest = getLowestScoreLabel(result)
  const topStrength = result.strengths[0]?.description
  const topImprovement = result.improvementAreas[0]?.description

  if (topStrength && topImprovement) {
    return `${topStrength} Fokus berikutnya: ${topImprovement}`
  }

  return `Skor terendah ada pada ${lowest}. Gunakan rekomendasi latihan berikutnya untuk memperkuat jawaban di sesi selanjutnya.`
}

function getResultHeadline(score: number) {
  if (score >= 85) return ['Sudah kuat.', 'Jaga konsistensi.']
  if (score >= 70) return ['Fondasi kuat.', 'Perkuat bukti nyata.']
  return ['Mulai terbaca.', 'Butuh bukti lebih jelas.']
}

function formatResultDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.map(item => String(item)).filter(Boolean)
}

function getRecord(value: unknown): RawRecord | undefined {
  return isRecord(value) ? value : undefined
}

function isRecord(value: unknown): value is RawRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function getString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function getOptionalString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : undefined
}

function getNumber(value: unknown, fallback: number) {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

function getOptionalNumber(value: unknown) {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : undefined
}

function getBoolean(value: unknown, fallback: boolean) {
  return typeof value === 'boolean' ? value : fallback
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}
