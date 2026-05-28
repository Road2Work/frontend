'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, History, Target } from 'lucide-react'
import { motion } from 'motion/react'
import AppHeader from '@/components/organisms/AppHeader'
import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import PageState from '@/components/molecules/PageState'
import { resultService } from '@/services/result.service'
import type { InterviewHistoryItem } from '@/types/api-contract'

export default function InterviewHistoryTemplate() {
  const [history, setHistory] = useState<InterviewHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const profileId = window.sessionStorage.getItem('road2work:profile-id') ?? undefined
    const roleId = window.sessionStorage.getItem('road2work:selected-role-id') ?? undefined

    resultService
      .getHistory({ profileId, roleId })
      .then(response => {
        setHistory(response.data.history)
        setError(null)
      })
      .catch(error => {
        setError(error instanceof Error ? error.message : 'Riwayat interview belum bisa dimuat.')
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo="/hub" backLabel="Kembali ke Dashboard" />

      <main className="mx-auto max-w-5xl px-5 py-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-8">
          <Badge tone="red">Interview History</Badge>
          <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] font-black leading-tight text-ink">
            Riwayat latihan interview.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Lihat perkembangan skor dari sesi sebelumnya dan buka detail hasil terakhir untuk menentukan latihan berikutnya.
          </p>
        </motion.div>

        {isLoading && (
          <PageState
            type="loading"
            title="Memuat riwayat interview"
            description="Road2Work sedang mengambil daftar sesi latihan yang pernah kamu selesaikan."
          />
        )}

        {!isLoading && error && (
          <PageState
            type="error"
            title="Riwayat belum bisa dimuat"
            description={error}
            actionLabel="Coba Lagi"
            onAction={() => window.location.reload()}
          />
        )}

        {!isLoading && !error && history.length === 0 && (
          <PageState
            type="empty"
            title="Belum ada riwayat interview"
            description="Mulai satu sesi latihan untuk melihat perkembangan skor dan feedback di sini."
            actionLabel="Mulai Latihan"
            actionHref="/career-onboarding"
          />
        )}

        {!isLoading && !error && history.length > 0 && (
          <div className="grid gap-4">
            {history.map((item, index) => (
              <HistoryCard key={item.sessionId} item={item} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function HistoryCard({ item, index }: { item: InterviewHistoryItem; index: number }) {
  const color = item.finalScore >= 80 ? '#16A34A' : item.finalScore >= 65 ? '#F59E0B' : '#E63946'

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.05 }}>
      <Card className="p-5">
        <div className="grid gap-5 md:grid-cols-[96px_1fr_auto] md:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-paper">
            <div className="text-center">
              <div className="font-display text-3xl font-black" style={{ color }}>{item.finalScore}</div>
              <div className="font-mono text-[0.6rem] font-bold uppercase text-muted">Score</div>
            </div>
          </div>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-black text-ink">{item.targetRole}</h2>
              <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${color}18`, color }}>
                {translateStatus(item.readinessStatus)}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <History className="h-4 w-4" /> {item.sessionId}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(item.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Target className="h-4 w-4" /> Result {item.resultId}
              </span>
            </div>
          </div>
          <Link
            href="/results"
            onClick={() => {
              window.sessionStorage.setItem('road2work:session-id', item.sessionId)
              window.sessionStorage.setItem('road2work:result-id', item.resultId)
              window.sessionStorage.setItem('road2work:selected-role-name', item.targetRole)
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-3 font-display text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-red-dark"
          >
            Detail <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

function translateStatus(status: string) {
  if (status === 'Ready') return 'Siap'
  if (status === 'Almost Ready') return 'Hampir Siap'
  if (status === 'Needs Practice') return 'Perlu Latihan'
  return status
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}
