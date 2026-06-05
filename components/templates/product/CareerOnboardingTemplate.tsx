'use client'

import { CheckCircle2, FileText, Shield, UserRoundPen } from 'lucide-react'
import { motion } from 'motion/react'
import AppHeader from '@/components/organisms/AppHeader'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

export default function CareerOnboardingTemplate() {
  const choosePath = (path: 'cv' | 'manual') => {
    window.sessionStorage.setItem('road2work:onboarding-path', path)
  }

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader tagline="Your Roadmap to a Better Career" />

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mx-auto max-w-2xl text-center">
          <Badge tone="red">Career Readiness Onboarding</Badge>
          <h1 className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.08] text-ink">
            Mulai dari CV atau profil singkat.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted">
            Pilih jalur yang paling sesuai dengan kondisimu sekarang. Road2Work akan bantu menyiapkan konteks latihan interview dari pilihan itu.
          </p>
        </motion.div>

        <Card className="mx-auto mt-8 flex max-w-3xl items-start gap-3 border-brand-red/15 bg-brand-red/5 p-5 text-left text-sm leading-7 text-muted">
          <Shield className="mt-1 h-5 w-5 shrink-0 text-brand-red" />
          <p>
            <span className="font-bold text-ink">Catatan MVP:</span> untuk saat ini Road2Work fokus pada domain Information Technology. Domain lain sedang masuk roadmap pengembangan berikutnya.
          </p>
        </Card>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <PathCard
            icon={FileText}
            title="Upload CV"
            badge="Direkomendasikan"
            description="Pilih ini kalau kamu sudah punya CV dan ingin melihat role yang paling relevan dari pengalaman, project, skill, dan tools yang sudah kamu tulis."
            points={['Cocok untuk eksplor rekomendasi role', 'Bisa review hasil ekstraksi CV', 'Pilih fokus latihan dari ranking role']}
            href="/setup"
            onClick={() => choosePath('cv')}
          />
          <PathCard
            icon={UserRoundPen}
            title="Isi Profil Manual"
            description="Pilih ini kalau kamu sudah tahu target role, CV belum rapi, atau ingin menjelaskan pengalaman transisi karier dengan versi yang lebih terarah."
            points={['Cocok untuk target role yang sudah jelas', 'Tulis konteks pengalaman sendiri', 'Langsung fokus ke latihan interview']}
            href="/start"
            onClick={() => choosePath('manual')}
            secondary
          />
        </div>

        <Card className="mt-6 flex items-start gap-3 p-5 text-sm leading-7 text-muted">
          <Shield className="mt-1 h-5 w-5 shrink-0 text-brand-red" />
          <p>
            Belum yakin mau role apa? Mulai dari Upload CV. Sudah punya target role? Isi Profil Manual akan lebih cepat.
          </p>
        </Card>
      </main>
    </div>
  )
}

function PathCard({
  icon: Icon,
  title,
  badge,
  description,
  points,
  href,
  onClick,
  secondary,
}: {
  icon: typeof FileText
  title: string
  badge?: string
  description: string
  points: string[]
  href: string
  onClick: () => void
  secondary?: boolean
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} whileHover={{ y: -4 }}>
      <Card className="flex h-full flex-col p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${secondary ? 'bg-ink/5 text-ink' : 'bg-brand-red/10 text-brand-red'}`}>
            <Icon className="h-6 w-6" />
          </div>
          {badge && (
            <span className="rounded-full border border-brand-red/20 bg-brand-red/10 px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-brand-red">
              {badge}
            </span>
          )}
        </div>
        <h2 className="font-display text-2xl font-black text-ink">{title}</h2>
        <p className="mt-3 flex-1 text-sm leading-7 text-muted">{description}</p>
        <div className="mt-6 space-y-2">
          {points.map(point => (
            <div key={point} className="flex items-center gap-2 text-sm text-ink">
              <CheckCircle2 className="h-4 w-4 text-brand-red" />
              {point}
            </div>
          ))}
        </div>
        <Button href={href} size="lg" variant={secondary ? 'secondary' : 'primary'} className="mt-7 w-full" withArrow onClick={onClick}>
          {secondary ? 'Isi Profil Manual' : 'Upload CV'}
        </Button>
      </Card>
    </motion.div>
  )
}
