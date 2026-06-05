'use client'

import { useSyncExternalStore, useRef } from 'react'
import { motion, useScroll, useInView } from 'motion/react'
import Image from 'next/image'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { Play, TrendingUp } from 'lucide-react'
import Button from '@/components/atoms/Button'
import AppShell from '@/components/organisms/AppShell'
import ScrollStack, { ScrollStackItem } from '@/components/molecules/marketing/ScrollStack'
import ScrollReveal from '@/components/molecules/marketing/ScrollReveal'
import SectionHeader from '@/components/molecules/SectionHeader'
import { features, teamMembers, workflowSteps } from '@/data/road2work'

const serviceOfferings = [
  {
    title: 'Rapikan Cerita Profesionalmu',
    description: 'Ubah CV, project, organisasi, atau pengalaman magang menjadi cerita singkat yang jelas, relevan, dan siap dibawa ke interview.',
    visual: 'profile',
  },
  {
    title: 'Tentukan Arah Role yang Masuk Akal',
    description: 'Pahami role mana yang paling realistis untuk dilatih berdasarkan pengalamanmu, bukan sekadar memilih role yang terdengar populer.',
    visual: 'role',
  },
  {
    title: 'Latih Jawaban sampai Lebih Terukur',
    description: 'Biasakan menjawab dengan konteks, kontribusi, dan hasil yang jelas agar latihan berikutnya punya fokus perbaikan yang konkret.',
    visual: 'practice',
  },
]

const partnerLogos = [
  { name: 'Coding Camp', src: '/logo/partner/codingcamp.png' },
  { name: 'DBS Foundation', src: '/logo/partner/dbs.png' },
  { name: 'Dicoding', src: '/logo/partner/dicoding.png' },
]

const subscribeToClient = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export default function LandingPage() {
  const mounted = useSyncExternalStore(subscribeToClient, getClientSnapshot, getServerSnapshot)

  if (!mounted) return null

  return (
    <AppShell>
      <main>
        <RoadHero />

        <PromoVideoSection />




        <ServicesSection />

        <section id="features" className="bg-white px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <SectionHeader
                eyebrow="Fitur Utama"
                title="Fitur Road2Work yang menjaga latihanmu tetap terarah."
                description="Setiap fitur dirancang untuk membantu kamu memahami profil, memilih role, berlatih, mendapat feedback, lalu memperbaiki gap yang paling berdampak."
              />
            </ScrollReveal>
            <ScrollStack className="mt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon

                return (
                  <ScrollStackItem key={feature.title} index={index} className="border-brand-red/20 bg-[linear-gradient(135deg,#e63946_0%,#b5162a_48%,#5b0b16_100%)] text-white shadow-[0_26px_70px_rgba(185,22,42,0.25)]">
                    <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/14 text-white ring-1 ring-white/18">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-widest text-white/72">
                          0{index + 1}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">
                          {feature.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/76">
                          {feature.description}
                        </p>
                      </div>
                      <div className="hidden rounded-full border border-white/18 bg-white/10 px-4 py-2 font-mono text-[0.65rem] font-bold uppercase tracking-wide text-white/70 md:block">
                        Road2Work
                      </div>
                    </div>
                  </ScrollStackItem>
                )
              })}
            </ScrollStack>
          </div>
        </section>

        <RoadWorkflowShowcase />

        <TeamSection />

        <section className="relative overflow-hidden bg-ink px-5 py-18 text-white sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(230,57,70,0.22)_0%,transparent_32%),radial-gradient(circle_at_86%_18%,rgba(230,57,70,0.16)_0%,transparent_28%)]" />
          <div className="road-line absolute left-0 right-0 top-0 opacity-15" />
          <ScrollReveal className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 flex items-center justify-center gap-4 font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-red">
              <span className="h-px w-14 bg-brand-red/60" />
              Mulai dari satu profil yang jujur
              <span className="h-px w-14 bg-brand-red/60" />
            </div>
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight">
              Ubah latihan berikutnya jadi langkah yang jelas.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/62">
              Bangun profil latihanmu, pilih role yang paling relevan, lalu pakai feedback interview untuk tahu bagian mana yang perlu diperkuat dulu.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/signup" size="lg" withArrow>
                Mulai dari Profil
              </Button>
              <Button href="/interview" variant="secondary" size="lg">
                Lihat Demo Interview
              </Button>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </AppShell>
  )
}

function ServicesSection() {
  return (
    <section id="product" className="bg-white px-5 py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <div className="inline-flex rounded-full bg-brand-red/8 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wide text-brand-red">
            Services
          </div>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.1rem,4.6vw,3.7rem)] font-black leading-[1.05] text-ink">
            Layanan Road2Work untuk menyiapkan langkah kariermu.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {serviceOfferings.map((service, index) => (
            <article key={service.title} className="group overflow-hidden rounded-[28px] bg-[#f7f8fb] p-7 text-center shadow-[0_20px_60px_rgba(31,41,55,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(230,57,70,0.14)]">
              <h3 className="font-display text-2xl font-black leading-tight text-ink">{service.title}</h3>
              <p className="mx-auto mt-5 max-w-sm text-sm font-semibold leading-7 text-muted">{service.description}</p>
              <ServiceVisual type={service.visual} index={index} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceVisual({ type, index }: { type: string; index: number }) {
  if (type === 'profile') {
    return (
      <div className="mt-9 rounded-3xl bg-white p-5 text-left shadow-soft">
        <div className="mb-5 flex items-center justify-between border-b border-ink/8 pb-3 font-mono text-[0.62rem] font-bold uppercase tracking-wide text-muted">
          <span>Cerita Profil</span>
          <span className="text-brand-red">0{index + 1}</span>
        </div>
        {['Fokus karier jelas', 'Pengalaman relevan', 'Bukti siap diceritakan'].map((item, itemIndex) => (
          <div key={item} className="mb-3 flex items-center justify-between rounded-2xl bg-paper px-4 py-3 last:mb-0">
            <span className="text-sm font-bold text-ink">{item}</span>
            <span className="font-mono text-xs font-bold text-emerald-600">{[8, 7, 6][itemIndex]}/10</span>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'role') {
    return (
      <div className="mt-9 space-y-3 rounded-3xl bg-white p-5 text-left shadow-soft">
        {[
          ['Role paling relevan', '86% siap'],
          ['Gap utama terlihat', '3 fokus'],
          ['Arah latihan jelas', 'Next step'],
        ].map(([role, score], itemIndex) => (
          <div key={role} className="rounded-2xl border border-ink/8 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-black text-ink">{role}</span>
              <span className={itemIndex === 0 ? 'rounded-full bg-emerald-50 px-3 py-1 font-mono text-[0.62rem] font-bold text-emerald-600' : 'rounded-full bg-paper px-3 py-1 font-mono text-[0.62rem] font-bold text-muted'}>{score}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-paper">
              <div className="h-full rounded-full bg-brand-red" style={{ width: itemIndex === 0 ? '86%' : itemIndex === 1 ? '61%' : '54%' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-9 overflow-hidden rounded-3xl bg-ink text-left text-white shadow-[0_22px_60px_rgba(31,41,55,0.18)]">
      <div className="bg-[linear-gradient(135deg,#e63946,#6b0d18)] p-5">
        <div className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-white/70">Jawaban Lebih Terukur</div>
        <div className="mt-4 font-display text-5xl font-black">72%</div>
      </div>
      <div className="space-y-4 p-5">
        {['Konteks pengalaman', 'Kontribusi pribadi', 'Hasil terukur'].map((item, itemIndex) => (
          <div key={item}>
            <div className="mb-2 flex justify-between text-xs font-bold text-white/70">
              <span>{item}</span>
              <span>{[58, 64, 78][itemIndex]}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-brand-red" style={{ width: `${[58, 64, 78][itemIndex]}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnimatedWorkflowStep({ step, index }: { step: typeof workflowSteps[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  // Active state triggers when the step enters the middle 40% of the screen
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px' })
  const Icon = step.icon

  return (
    <div ref={ref} className="relative grid grid-cols-[auto_1fr] gap-6">
      <div 
        className={
          inView 
            ? 'relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-red shadow-[0_18px_40px_rgba(0,0,0,0.24)] transition-all duration-500 scale-100' 
            : 'relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white/50 shadow-none ring-1 ring-white/10 backdrop-blur transition-all duration-500 scale-90'
        }
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className={`pt-1 transition-all duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4'}`}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-2xl font-black leading-tight text-white">{step.title}</h3>
          <span className={`rounded-full border px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-widest transition-colors duration-500 ${inView ? 'border-brand-red/30 bg-brand-red/10 text-brand-red' : 'border-white/10 bg-white/5 text-white/40'}`}>
            0{index + 1}
          </span>
        </div>
        <p className="mt-3 max-w-xl text-sm font-semibold leading-7 sm:text-base">
          {step.description}
        </p>
      </div>
    </div>
  )
}

function RoadWorkflowShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const textureStyle = {
    backgroundImage:
      'radial-gradient(circle at 78% 18%, rgba(255, 255, 255, 0.16), transparent 28%), radial-gradient(circle at 16% 24%, rgba(255, 97, 105, 0.28), transparent 32%), linear-gradient(135deg, #cf172b 0%, #931221 44%, #36080f 100%)',
  }

  const noiseStyle = {
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
  }

  return (
    <section id="workflow" ref={containerRef} className="relative overflow-hidden px-5 py-24 text-white lg:py-28" style={textureStyle}>
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50" style={noiseStyle} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_72%,rgba(255,255,255,0.18),transparent_25%),linear-gradient(90deg,rgba(0,0,0,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/22 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <ScrollReveal>
          <div className="inline-flex rounded-full bg-white px-5 py-2 font-mono text-xs font-bold uppercase tracking-wide text-brand-red shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
            Workflow
          </div>
          <h2 className="mt-7 max-w-2xl font-display text-[clamp(2.35rem,5vw,4.4rem)] font-black leading-[1.02] tracking-normal text-white">
            Dari profil mentah ke latihan yang punya arah.
          </h2>
          <p className="mt-7 max-w-xl text-base font-semibold leading-8 text-white/78 sm:text-lg">
            Road2Work membantu pengalamanmu dibaca, dipetakan ke role yang relevan, lalu dilatih lewat interview berbasis suara sampai kamu tahu gap yang perlu diperbaiki.
          </p>
        </ScrollReveal>

        <div className="relative pl-10 sm:pl-12 lg:pl-16">
          {/* Static Background Line */}
          <div className="absolute bottom-10 left-[1.9rem] top-8 w-[2px] rounded-full bg-white/10 sm:left-[2.35rem] lg:left-[2.85rem]" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute bottom-10 left-[1.9rem] top-8 w-[2px] origin-top rounded-full bg-gradient-to-b from-white via-white to-white/10 sm:left-[2.35rem] lg:left-[2.85rem]"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-10">
            {workflowSteps.map((step, index) => (
              <AnimatedWorkflowStep key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
function RoadHero() {
  const textureStyle = {
    backgroundImage:
      'radial-gradient(circle at 78% 18%, rgba(255, 255, 255, 0.16), transparent 28%), radial-gradient(circle at 16% 24%, rgba(255, 97, 105, 0.28), transparent 32%), linear-gradient(135deg, #cf172b 0%, #931221 44%, #36080f 100%)',
  }

  const noiseStyle = {
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
  }

  return (
    <section className="relative -mt-20 overflow-hidden px-5 pb-0 pt-28 text-white sm:pt-32 lg:min-h-[790px]" style={textureStyle}>
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50" style={noiseStyle} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_72%,rgba(255,255,255,0.18),transparent_25%),linear-gradient(90deg,rgba(0,0,0,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/22 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div className="pb-12 sm:pb-16 lg:pb-24">

          <p className="mb-7 inline-flex rounded-full border border-white/22 bg-white/10 px-5 py-2 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur">
            Your Roadmap to a Better Career
          </p>

          <h1 className="max-w-3xl text-balance font-display text-[clamp(3rem,6.4vw,5.45rem)] font-black leading-[0.98] tracking-normal text-white">
            Buktikan Kamu Siap Kerja.
          </h1>

          <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-white/78 sm:text-lg">
            Road2Work membantu kamu membaca profil, menemukan role yang relevan, dan melatih jawaban interview dengan feedback berbasis evidence.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/signup" size="lg" variant="white">
              Mulai Bangun Profil
            </Button>
            <Button href="/how-it-works" variant="secondary" size="lg" className="border-white/20 bg-white/12 text-white hover:bg-white/20">
              Lihat Cara Kerjanya
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-5 sm:gap-7">
            {partnerLogos.map((logo, index) => (
              <div key={`${logo.name}-${index}`} className="flex h-14 shrink-0 items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={180}
                  height={72}
                  unoptimized
                  className="max-h-11 w-auto object-contain opacity-60 grayscale brightness-0 invert transition hover:opacity-100 sm:max-h-12"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[560px] lg:min-h-[710px]">
          <div className="absolute bottom-0 right-[-4.5rem] w-[min(120vw,860px)] sm:right-[-5rem] lg:right-[-14rem]">
            <Image
              src="/landing/hero-woman.png"
              alt="Pengguna Road2Work.id siap membangun profil karier"
              width={1400}
              height={1400}
              priority
              sizes="(max-width: 1024px) 96vw, 720px"
              className="h-auto w-full object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
            />
          </div>

          <div className="hero-float-a absolute left-1 top-20 max-w-[12rem] rounded-2xl bg-white p-4 text-ink shadow-[0_28px_80px_rgba(0,0,0,0.26)] sm:max-w-[15rem] sm:left-8 sm:rounded-3xl sm:p-5 lg:left-8">
            <p className="font-mono text-[0.55rem] font-bold uppercase tracking-widest text-brand-red sm:text-[0.62rem]">Readiness Signal</p>
            <p className="mt-2 font-display text-3xl font-black sm:mt-3 sm:text-4xl">82%</p>
            <p className="mt-1 text-xs font-semibold leading-5 text-muted sm:mt-2 sm:text-sm sm:leading-6">Profilmu sudah punya arah. Sekarang latih cara membuktikannya.</p>
          </div>

          <div className="hero-float-b absolute bottom-28 right-0 max-w-[11.5rem] rounded-2xl bg-white p-4 text-ink shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:max-w-[14rem] sm:right-4 sm:rounded-3xl sm:p-5 lg:right-[-1.5rem]">
            <p className="font-mono text-[0.55rem] font-bold uppercase tracking-widest text-brand-red sm:text-[0.62rem]">Next Step</p>
            <p className="mt-2 font-display text-xl font-black sm:mt-3 sm:text-2xl">Perkuat evidence</p>
            <p className="mt-1 text-xs font-semibold leading-5 text-muted sm:mt-2 sm:text-sm sm:leading-6">Tambahkan konteks, kontribusi, dan hasil terukur.</p>
          </div>
        </div>
      </div>
    </section>
  )
}


function PromoVideoSection() {
  return (
    <section id="demo" className="relative overflow-hidden bg-white px-5 py-20 text-ink lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-ink/8" />
      <div className="absolute left-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_20%_30%,rgba(230,57,70,0.08),transparent_44%)]" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_80%_20%,rgba(230,57,70,0.06),transparent_44%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 border-b border-ink/10 pb-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="max-w-4xl font-display text-[clamp(2.15rem,4.8vw,4.4rem)] font-black leading-[1.02] tracking-normal">
              Dari pengalaman nyata menuju kesiapan karier.
            </h2>
          </div>
          <p className="max-w-lg text-sm font-semibold leading-7 text-muted lg:ml-auto">
            Lihat bagaimana Road2Work.id membantu pengalaman, skill, dan evidence kamu berubah menjadi latihan interview yang lebih terarah dan bisa ditindaklanjuti.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -left-5 top-10 z-20 hidden w-56 rounded-[36px] bg-[#0d0f10] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.42)] md:block lg:-left-12">
            <div className="mb-8 flex items-center gap-2">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/10">
                <Image src="/logo/Logor2w-light.png" alt="" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b7ff4a] text-ink">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="font-display text-4xl font-black leading-none text-white">5 Pilar</div>
            <p className="mt-5 text-sm leading-6 text-white/60">
              Profile, Role, Practice, Feedback, dan Improve dalam satu roadmap.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="aspect-[16/9] bg-[radial-gradient(circle_at_28%_24%,rgba(230,57,70,0.28),transparent_28%),linear-gradient(135deg,#25292e_0%,#151719_45%,#0f1113_100%)]">
              <video
                className="h-full w-full object-cover opacity-70"
                src={process.env.NEXT_PUBLIC_PROMO_VIDEO_URL || "/videos/hrd/male/LISTENING.mp4"}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
            <button
              type="button"
              aria-label="Putar video promosi"
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur transition hover:scale-105 hover:bg-white/18"
            >
              <Play className="ml-1 h-9 w-9 fill-white" />
            </button>
            <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-display text-base font-black text-white">Road2Work.id Overview</p>
                <p className="mt-1 text-xs leading-5 text-white/60">AI Career Readiness Platform untuk user yang ingin lebih siap menuju dunia kerja.</p>
              </div>
              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-white/60">
                01:30
              </span>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

function getInitials(name: string) {
  const parts = name.split(' ').filter(Boolean)
  return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase()
}

function TeamSection() {
  return (
    <section className="relative overflow-hidden bg-[#111315] px-5 py-24 text-white lg:py-28">
      <div className="pointer-events-none absolute left-[-12rem] top-20 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] bottom-0 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <h2 className="font-display text-[clamp(3rem,7vw,6.25rem)] font-black leading-[0.95] tracking-normal text-white">
            Team di Balik
            <br />
            Road2Work<span className="text-brand-red">.id</span>
          </h2>
          <p className="max-w-xl text-base font-semibold leading-8 text-white/70 lg:ml-auto">
            Setiap fitur Road2Work.id dibangun oleh tim yang menggabungkan product thinking, AI, data, backend, frontend, dan user experience.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {teamMembers.map((member, index) => (
            <article
              key={member.id}
              className="group grid overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.06] transition duration-300 hover:bg-white hover:text-ink md:grid-cols-[15rem_1fr_auto]"
            >
              <div className="relative min-h-48 overflow-hidden bg-gradient-to-br from-brand-red to-brand-red-deep md:min-h-40">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={`Foto ${member.name}`}
                    width={480}
                    height={360}
                    sizes="(max-width: 768px) 100vw, 240px"
                    className="h-full min-h-48 w-full object-cover object-[center_18%] grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0 md:min-h-40"
                  />
                ) : (
                  <span className="flex h-full min-h-48 items-center justify-center font-display text-5xl font-black text-white/70 md:min-h-40">
                    {getInitials(member.name)}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 transition group-hover:bg-white/0" />
              </div>

              <div className="flex flex-col justify-center px-6 py-7 md:px-10">
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-brand-red">
                  0{index + 1}
                </p>
                <h3 className="mt-2 font-display text-3xl font-black leading-tight text-white transition group-hover:text-ink md:text-4xl">
                  {member.name}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/58 transition group-hover:text-ink/60">
                  {member.role}
                </p>
              </div>

              <div className="flex items-center gap-3 px-6 pb-7 md:px-8 md:pb-0">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub ${member.name}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-white transition hover:bg-brand-red hover:text-white group-hover:border-ink/15 group-hover:text-ink"
                  >
                    <FiGithub className="h-4 w-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`LinkedIn ${member.name}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-white transition hover:bg-brand-red hover:text-white group-hover:border-ink/15 group-hover:text-ink"
                  >
                    <FiLinkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}























