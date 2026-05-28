import { FiMessageSquare, FiPlayCircle } from 'react-icons/fi'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import AppShell from '@/components/organisms/AppShell'
import FeatureCard from '@/components/molecules/FeatureCard'
import InterviewCanvasShowcase from '@/components/molecules/marketing/InterviewCanvasShowcase'
import RoleCapsulePlayground from '@/components/molecules/marketing/RoleCapsulePlayground'
import ScrollReveal, { StaggerReveal } from '@/components/molecules/marketing/ScrollReveal'
import TeamShowcase from '@/components/molecules/marketing/TeamShowcase'
import WorkflowTimeline from '@/components/molecules/marketing/WorkflowTimeline'
import SectionHeader from '@/components/molecules/SectionHeader'
import { features } from '@/data/road2work'

export default function LandingPage() {
  return (
    <AppShell>
      <main>
        <section className="relative overflow-hidden border-t border-ink/5 px-5 pb-20 pt-12 sm:pt-16 lg:pb-28">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-red/8 to-transparent" />
          <div className="road-line absolute left-0 right-0 top-0 opacity-25" />

          <div className="relative mx-auto max-w-6xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold text-ink shadow-soft backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              Your Roadmap to a Better Career
            </div>

            <h1 className="mx-auto mt-7 max-w-4xl text-balance font-display text-[clamp(2.05rem,4.6vw,3.75rem)] font-black leading-[1.12] tracking-normal text-ink">
              <span className="block">Ubah Pengalamanmu Jadi</span>
              <span className="block">
                <span className="text-brand-red">Jawaban Interview</span> yang Lebih
              </span>
              <span className="block">Meyakinkan.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-sm font-semibold leading-7 text-muted sm:text-base">
              Road2Work.id membantu kamu berlatih interview sesuai role tujuan melalui AI HRD berbasis suara,
              pertanyaan adaptif, dan feedback yang langsung bisa kamu perbaiki.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/signup" size="lg" className="min-w-56">
                <FiPlayCircle className="h-4 w-4" />
                Mulai Latihan Interview
              </Button>
              <Button href="/how-it-works" variant="secondary" size="lg" className="min-w-52">
                Lihat Cara Kerjanya
              </Button>
            </div>

            <InterviewCanvasShowcase />
          </div>
        </section>

        <section className="bg-white px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <ScrollReveal>
                <SectionHeader
                  eyebrow="Masalah"
                  title="Kamu punya pengalaman. Tantangannya adalah membuktikannya."
                  description="Mahasiswa dan fresh graduate sering punya project, organisasi, bootcamp, atau magang, tetapi jawaban interview masih terlalu umum dan belum menunjukkan bukti yang kuat."
                />
              </ScrollReveal>
              <StaggerReveal className="grid gap-4 sm:grid-cols-3">
              {[
                'Bingung menjelaskan kontribusi pribadi.',
                'Jawaban belum terhubung ke target role.',
                'Tidak tahu bagian mana yang perlu diperbaiki.',
              ].map(item => (
                <Card key={item} className="p-6">
                  <FiMessageSquare className="mb-5 h-6 w-6 text-brand-red" />
                  <p className="text-sm leading-7 text-muted">{item}</p>
                </Card>
              ))}
              </StaggerReveal>
            </div>
          </div>
        </section>

        <section className="px-5 py-24">
          <ScrollReveal className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Solusi"
              title="Dari pengalaman mentah menjadi jawaban interview yang lebih siap."
              description="Pilih role, beri konteks, jawab dengan suara, lalu lihat feedback yang jelas untuk latihan berikutnya."
            />
            <WorkflowTimeline />
          </ScrollReveal>
        </section>

        <section id="features" className="bg-white px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <SectionHeader eyebrow="Features" title="Latihan interview yang lebih terarah dari awal sampai akhir." />
            </ScrollReveal>
            <StaggerReveal className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map(feature => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="px-5 py-20">
          <ScrollReveal className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionHeader
                eyebrow="Role Coverage"
                title="Latihan untuk role awal yang paling relevan."
                description="Setiap role dipilih agar pertanyaan, rubrik, dan dashboard tetap fokus pada kebutuhan user awal."
              />
              <RoleCapsulePlayground />
            </div>
          </ScrollReveal>
        </section>

        <TeamShowcase />

        <section className="bg-ink px-5 py-24 text-white">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-px max-w-xs bg-brand-red/50" />
            <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">
              Siap latihan seperti interview sungguhan?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/55">
              Bangun kepercayaan diri sebelum momen penting. Mulai dari role selection dan latihan memakai pengalaman kamu sendiri.
            </p>
            <div className="mt-9 flex justify-center">
              <Button href="/signup" size="lg" withArrow>
                Mulai Latihan Interview
              </Button>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </AppShell>
  )
}
