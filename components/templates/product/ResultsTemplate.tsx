'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Award,
  BarChart2,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Eye,
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
import type { InterviewResult } from '@/types/api-contract'

const scoreBreakdown = [
  { label: 'Relevansi Peran', score: 70, icon: Target },
  { label: 'Struktur STAR', score: 78, icon: BookOpen },
  { label: 'Spesifisitas Bukti', score: 55, icon: BarChart2 },
  { label: 'Akurasi Teknis', score: 62, icon: Cpu },
  { label: 'Kejelasan Komunikasi', score: 82, icon: Volume2 },
  { label: 'Kesadaran Diri', score: 68, icon: Eye },
]

const strengths = [
  { text: 'Kejelasan komunikasi konsisten di semua jawaban', tag: 'P2, P3, P5' },
  { text: 'Struktur STAR diterapkan dengan baik di pertanyaan kunci', tag: 'P2, P4' },
  { text: 'Pemahaman industri dan peran yang baik', tag: 'P1, P3' },
]

const improvements = [
  { text: 'Spesifisitas bukti - tambahkan angka, skala, dan hasil nyata', priority: 'Tinggi' },
  { text: 'Kedalaman teknis - jelaskan lebih detail tools dan metodologi yang digunakan', priority: 'Sedang' },
  { text: 'Kesadaran diri - refleksikan pelajaran yang dipetik secara eksplisit', priority: 'Sedang' },
]

const practiceSteps = [
  'Untuk setiap jawaban, sertakan minimal satu metrik spesifik: persen, rupiah, durasi, atau skala.',
  'Tulis ulang jawaban P1 menggunakan template S-T-A-R-R dan tambahkan kalimat hasil kedua.',
  'Rekam respons 90 detik untuk P3, lalu dengarkan kembali dan tandai bagian yang masih samar.',
]

const sessionStats = [
  { icon: MessageSquare, label: 'Pertanyaan', value: '5 / 5' },
  { icon: Clock, label: 'Durasi', value: '14 menit' },
  { icon: Calendar, label: 'Tanggal', value: '21 Mei 2026' },
]

export default function ResultsTemplate() {
  const [result, setResult] = useState<InterviewResult | null>(null)

  useEffect(() => {
    const sessionId = window.sessionStorage.getItem('road2work:session-id') ?? 'session_001'
    resultService
      .getResult(sessionId)
      .then(response => setResult(response.data.result))
      .catch(() => setResult(null))
  }, [])

  const breakdown = result ? toScoreBreakdownItems(result) : scoreBreakdown
  const strengthItems = result?.strengths.map(item => ({ body: item.description, meta: item.evidence ?? item.title })) ?? strengths.map(item => ({ body: item.text, meta: item.tag }))
  const improvementItems =
    result?.improvementAreas.map(item => ({ body: item.description, meta: item.evidence ?? item.title })) ?? improvements.map(item => ({ body: item.text, meta: `Prioritas ${item.priority}` }))
  const practiceItems = result?.nextPracticeRecommendation.focusAreas ?? practiceSteps

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo="/hub" backLabel="Kembali ke Hub" />

      <main className="mx-auto max-w-5xl space-y-4 px-5 py-10">
        <ResultHeroCard result={result} />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InsightCard
            title="Kekuatan"
            icon={Award}
            tone="success"
            items={strengthItems}
          />
          <InsightCard
            title="Area Perbaikan"
            icon={TrendingUp}
            tone="danger"
            items={improvementItems}
          />
        </section>

        <BeforeAfterCard result={result} />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <BreakdownCard items={breakdown} />
          <NextPracticeCard result={result} items={practiceItems} />
        </section>

        <ResultActions />
      </main>
    </div>
  )
}

function ResultHeroCard({ result }: { result: InterviewResult | null }) {
  const targetRole = result?.targetRole.roleName ?? 'Analis Data'
  const score = result?.finalScore ?? 72
  const readinessStatus = translateReadiness(result?.readinessStatus ?? 'Almost Ready')
  const lowestScore = result ? getLowestScoreLabel(result) : 'Bukti: Lemah'

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
            Fondasi kuat.
            <br />
            Perkuat bukti nyata.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Struktur dan komunikasi kamu sudah bagus. Celah utama: tambahkan angka nyata dan hasil terukur di setiap jawaban.
            Itu yang membawamu dari Hampir Siap ke Siap Kerja.
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-row justify-center gap-5 border-t border-black/[0.06] pt-5 lg:w-auto lg:flex-col lg:justify-start lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {sessionStats.map(stat => (
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
}: {
  title: string
  icon: LucideIcon
  tone: 'success' | 'danger'
  items: Array<{ body: string; meta: string }>
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
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.body} className="flex items-start gap-3">
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
    </motion.section>
  )
}

function BeforeAfterCard({ result }: { result: InterviewResult | null }) {
  const improvement = result?.beforeAfterImprovement[0]
  const beforeAnswer = improvement?.beforeAnswer ?? 'Saya banyak pakai SQL waktu magang dan membantu meningkatkan database kami. Saya menjalankan beberapa query dan memperbaiki masalah performa.'
  const afterAnswer =
    improvement?.afterAnswer ??
    'Saat magang di PT XYZ, saya mengoptimalkan 3 query SQL pada database PostgreSQL yang menangani 2 juta transaksi per hari, sehingga waktu query berkurang dari 4 detik ke 0,3 detik dan tim analis hemat sekitar 2 jam per hari.'
  const note = improvement?.improvementNotes.join(', ') ?? 'Ditambahkan: nama perusahaan, skala, angka spesifik, waktu yang dihemat'

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-slate-400">
          <div className="h-px w-4 bg-slate-400/60" />
          Perbaikan Jawaban: Sebelum ke Sesudah
        </div>
        <div className="rounded-full bg-black/[0.04] px-2.5 py-1 font-mono text-xs tracking-wide text-slate-400">P1 - Proyek SQL</div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnswerPanel
          tone="danger"
          label="Jawaban Kamu"
          body={beforeAnswer}
          note="Kurang: nama perusahaan, skala, angka spesifik, hasil terukur"
        />
        <AnswerPanel
          tone="success"
          label="Jawaban yang Diperbaiki"
          body={afterAnswer}
          note={note}
        />
      </div>
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

function BreakdownCard({ items }: { items: typeof scoreBreakdown }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)] md:col-span-3"
    >
      <SectionKicker label="Rincian Skor" muted />
      <div className="space-y-4">
        {items.map((item, index) => (
          <ScoreBar key={item.label} {...item} delay={index * 0.07} />
        ))}
      </div>
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
        Fokus: {result?.nextPracticeRecommendation.practiceType ?? 'Bukti & Dampak'}
      </h3>

      <div className="flex-1 space-y-3.5">
        {items.map((step, index) => (
          <div key={step} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border border-brand-red/30 bg-brand-red/20 font-mono text-xs font-bold text-brand-red">
              {index + 1}
            </div>
            <p className="text-sm leading-relaxed text-white/65">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="mb-1 font-mono text-xs tracking-wide text-white/30">ESTIMASI PENINGKATAN</div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-black tracking-[-0.03em] text-emerald-500">+12-18 pts</span>
          <span className="text-xs text-white/30">di sesi berikutnya</span>
        </div>
      </div>
    </motion.section>
  )
}

function ResultActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="flex flex-col items-center justify-center gap-3 pb-10 pt-4 sm:flex-row"
    >
      <Link
        href="/start"
        className="inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3.5 font-display text-sm font-semibold tracking-[-0.01em] text-white shadow-[0_4px_20px_rgba(230,57,70,0.28),0_1px_3px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:bg-brand-red-dark"
      >
        <RotateCcw size={14} />
        Latihan Lagi
      </Link>
      <Link
        href="/start"
        className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-7 py-3.5 font-display text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-ink"
      >
        Coba Peran Lain
        <ArrowRight size={14} />
      </Link>
    </motion.div>
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

  return labels[status]
}

function toScoreBreakdownItems(result: InterviewResult): typeof scoreBreakdown {
  return [
    { label: 'Relevansi Peran', score: result.scoreBreakdown.roleRelevance, icon: Target },
    { label: 'Struktur STAR', score: result.scoreBreakdown.starStructure, icon: BookOpen },
    { label: 'Spesifisitas Bukti', score: result.scoreBreakdown.evidenceSpecificity, icon: BarChart2 },
    { label: 'Akurasi Teknis', score: result.scoreBreakdown.technicalAccuracy, icon: Cpu },
    { label: 'Kejelasan Komunikasi', score: result.scoreBreakdown.communicationClarity, icon: Volume2 },
    { label: 'Kesadaran Diri', score: result.scoreBreakdown.selfAwareness, icon: Eye },
  ]
}

function getLowestScoreLabel(result: InterviewResult) {
  const lowest = toScoreBreakdownItems(result).reduce((current, item) => (item.score < current.score ? item : current))
  return `${lowest.label}: ${lowest.score}`
}
