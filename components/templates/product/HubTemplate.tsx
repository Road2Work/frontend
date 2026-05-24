'use client'

import Link from 'next/link'
import { ArrowRight, BarChart2, ChevronRight, Flame, Lightbulb, Target } from 'lucide-react'
import { motion } from 'motion/react'
import AppHeader from '@/components/organisms/AppHeader'

const card = {
  backgroundColor: '#FDFDFD',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: 20,
  boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)',
}

function MiniScoreRing({ score, size = 48 }: { score: number; size?: number }) {
  const sw = 4
  const r = (size - sw * 2) / 2
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F0F0F0" strokeWidth={sw} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#E63946"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        strokeWidth={sw}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize={size / 4.2} fontWeight="700" fill="#1F2937">
        {score}%
      </text>
    </svg>
  )
}

const statCards = [
  { icon: BarChart2, label: 'Skor Terakhir', value: '72%', sub: 'Hampir Siap', color: '#E63946', bg: 'rgba(230,57,70,0.08)' },
  { icon: Target, label: 'Target Role', value: 'Data Analyst', sub: 'Information Technology', color: '#1F2937', bg: 'rgba(31,41,55,0.07)' },
  { icon: Flame, label: 'Runtutan Latihan', value: '3 hari', sub: 'Jaga momentum', color: '#F97316', bg: 'rgba(249,115,22,0.08)' },
  { icon: Lightbulb, label: 'Fokus Berikutnya', value: 'Evidence', sub: 'Kurang spesifik', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)' },
]

export default function HubTemplate() {
  return (
    <div className="min-h-screen bg-paper">
      <AppHeader
        backTo="/"
        backLabel="Kembali ke Beranda"
        right={
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:block">Sari Dewi</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-red-deep font-display text-sm font-bold text-white shadow-[0_2px_8px_rgba(230,57,70,0.25)]">
              S
            </div>
          </div>
        }
      />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="mb-2 font-mono text-xs font-medium uppercase text-brand-red">Kamis, 21 Mei</div>
          <h1 className="font-display text-[clamp(1.7rem,3vw,2.2rem)] font-extrabold leading-tight text-ink">
            Hai Sari, siap latihan?
          </h1>
          <p className="mt-2 text-muted">Sesi terakhir kamu 2 hari lalu. Jaga momentumnya.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }}>
          <Link href="/start" className="mb-5 block">
            <div className="flex items-center justify-between rounded-3xl bg-gradient-to-br from-brand-red to-brand-red-deep p-8 text-white shadow-[0_8px_32px_rgba(230,57,70,0.25),0_2px_8px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(230,57,70,0.35),0_4px_12px_rgba(0,0,0,0.12)]">
              <div>
                <div className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest opacity-70">Lanjut Latihan</div>
                <h2 className="font-display text-2xl font-extrabold">Mulai Interview Baru</h2>
                <p className="mt-1 text-sm opacity-60">Data Analyst - 5 pertanyaan - ~15 menit</p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                <ArrowRight size={20} />
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {statCards.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              className="rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.06)]"
              style={card}
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: item.bg }}>
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <div className="mb-1 font-mono text-[0.62rem] uppercase tracking-wide text-[#A0A0A0]">{item.label}</div>
              <div className="font-display text-sm font-bold leading-tight text-ink">{item.value}</div>
              <div className="mt-0.5 text-xs text-[#A0A0A0]">{item.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="mb-5 overflow-hidden rounded-2xl" style={card}>
          <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-4">
            <h3 className="font-display font-bold text-ink">Sesi Terbaru</h3>
            <Link href="/results" className="flex items-center gap-1 text-xs font-medium text-brand-red">
              Lihat semua <ChevronRight size={12} />
            </Link>
          </div>
          {[
            { role: 'Data Analyst', date: '2 hari lalu', score: 72, status: 'Hampir Siap', color: '#B45309', bg: 'rgba(234,179,8,0.1)' },
            { role: 'Data Scientist', date: '5 hari lalu', score: 58, status: 'Perlu Latihan', color: '#DC2626', bg: 'rgba(239,68,68,0.08)' },
          ].map(session => (
            <Link key={session.role} href="/results" className="flex items-center justify-between border-b border-black/[0.05] px-6 py-4 transition last:border-b-0 hover:bg-paper">
              <div className="flex items-center gap-4">
                <MiniScoreRing score={session.score} />
                <div>
                  <div className="text-sm font-semibold text-ink">{session.role}</div>
                  <div className="mt-0.5 text-xs text-[#A0A0A0]">{session.date}</div>
                </div>
              </div>
              <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: session.bg, color: session.color }}>
                {session.status}
              </div>
            </Link>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="rounded-2xl border border-brand-red/15 bg-brand-red/5 p-6">
          <div className="mb-3 flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-widest text-brand-red">
            <span className="h-px w-4 bg-brand-red" />
            Latihan Berikutnya
          </div>
          <p className="text-sm leading-relaxed text-ink">
            Fokus pada <strong>spesifisitas evidence</strong>. Gunakan metode STAR dan sertakan angka atau hasil terukur di sesi berikutnya.
          </p>
          <Link href="/start" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red">
            Latihan sekarang <ArrowRight size={14} />
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
