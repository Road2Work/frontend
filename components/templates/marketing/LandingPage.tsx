'use client'

import { useSyncExternalStore } from 'react'
import Image from 'next/image'
import {
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiMessageSquare,
  FiMic,
  FiShield,
  FiTrendingUp,
  FiUploadCloud,
} from 'react-icons/fi'
import { Play, TrendingUp } from 'lucide-react'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import AppShell from '@/components/organisms/AppShell'
import ScrollStack, { ScrollStackItem } from '@/components/molecules/marketing/ScrollStack'
import ScrollReveal, { StaggerReveal } from '@/components/molecules/marketing/ScrollReveal'
import WorkflowTimeline from '@/components/molecules/marketing/WorkflowTimeline'
import SectionHeader from '@/components/molecules/SectionHeader'
import { features, teamMembers } from '@/data/road2work'

const userPaths = [
  {
    title: 'Upload CV Path',
    description: 'Cocok untuk kamu yang sudah punya CV dan ingin mengetahui role yang paling relevan.',
    flow: 'Upload CV -> Review Profile -> Role Fit Ranking -> Interview -> Dashboard',
    cta: 'Mulai dari CV',
    icon: FiUploadCloud,
  },
  {
    title: 'Manual Profile Path',
    description: 'Cocok untuk kamu yang belum punya CV siap pakai atau ingin mulai dari profil singkat.',
    flow: 'Pilih Domain -> Pilih Role -> Isi Profil -> Interview -> Dashboard',
    cta: 'Isi Profil Manual',
    icon: FiFileText,
  },
]

const trustPoints = [
  {
    title: 'Explainable Feedback',
    description: 'Setiap skor dan rekomendasi disertai alasan yang mudah dipahami.',
    icon: FiBarChart2,
  },
  {
    title: 'Human-in-the-Loop',
    description: 'User dapat meninjau dan memperbaiki profil sebelum digunakan.',
    icon: FiCheckCircle,
  },
  {
    title: 'Privacy Awareness',
    description: 'Data CV dan jawaban interview digunakan untuk membantu proses readiness, bukan menentukan nasib kandidat.',
    icon: FiShield,
  },
  {
    title: 'Role-Based Context',
    description: 'Pertanyaan dan feedback disesuaikan dengan role target user.',
    icon: FiShield,
  },
]

const adaptiveDetails = [
  {
    title: 'Voice-first Practice',
    description: 'Latihan berbicara langsung seperti interview sungguhan.',
    icon: FiMic,
  },
  {
    title: '90-Second Answer Timer',
    description: 'Biasakan menjawab dengan jelas, padat, dan terarah.',
    icon: FiClock,
  },
  {
    title: 'Clarification Question',
    description: 'AI HRD dapat meminta detail tambahan jika jawabanmu kurang evidence.',
    icon: FiMessageSquare,
  },
  {
    title: 'Practice Memory',
    description: 'Sesi berikutnya dapat memakai evaluasi sebelumnya agar pertanyaan lebih personal.',
    icon: FiTrendingUp,
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


        <section id="product" className="bg-paper px-5 py-24 lg:py-28">
          <ScrollReveal className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Solusi"
              title="Road2Work.id mengubah pengalamanmu menjadi career readiness."
              description="Pengalaman dari CV, project, organisasi, atau magang sering belum terbaca sebagai kompetensi. Road2Work membantu kamu merapikannya menjadi profil, role yang relevan, latihan interview, dan langkah perbaikan yang jelas."
            />
            <WorkflowTimeline />
          </ScrollReveal>
        </section>

        <section id="features" className="bg-white px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <SectionHeader
                eyebrow="Pilar Fitur"
                title="Semua yang kamu butuhkan untuk lebih siap menuju dunia kerja."
                description="Road2Work.id membantumu dari tahap membangun profil, memilih role, latihan interview, sampai memahami langkah perbaikan berikutnya."
              />
            </ScrollReveal>
            <ScrollStack className="mt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon

                return (
                  <ScrollStackItem key={feature.title} index={index}>
                    <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-widest text-brand-red">
                          0{index + 1}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-black text-ink sm:text-3xl">
                          {feature.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-muted">
                          {feature.description}
                        </p>
                      </div>
                      <div className="hidden rounded-full border border-ink/10 bg-paper px-4 py-2 font-mono text-[0.65rem] font-bold uppercase tracking-wide text-ink/55 md:block">
                        Road2Work
                      </div>
                    </div>
                  </ScrollStackItem>
                )
              })}
            </ScrollStack>
          </div>
        </section>

        <section className="px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <ScrollReveal>
                <SectionHeader
                  eyebrow="Latihan Adaptif"
                  title="Bukan interview statis. Pertanyaannya bisa menyesuaikan jawabanmu."
                  description="Saat AI HRD mengajukan pertanyaan, mic akan aktif dan kamu punya waktu 90 detik untuk menjawab. Jika jawabanmu masih kurang jelas, Road2Work dapat meminta klarifikasi agar kamu terbiasa menjawab dengan lebih konkret."
                />
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Asking', 'Listening', 'Thinking', 'Clarifying', 'Completed'].map(state => (
                    <span key={state} className="rounded-full border border-ink/10 bg-white px-3 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-wide text-muted shadow-soft">
                      {state}
                    </span>
                  ))}
                </div>
                <div className="mt-8 rounded-[28px] border border-brand-red/15 bg-brand-red/5 p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
                      <FiCheckCircle className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold leading-7 text-ink/75">
                      Road2Work.id tidak hanya bertanya, tapi membantu kamu memperbaiki cara menjawab.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <StaggerReveal className="grid gap-4 sm:grid-cols-2">
                {adaptiveDetails.map(point => {
                  const Icon = point.icon

                  return (
                    <Card key={point.title} className="p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-lg font-black text-ink">{point.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted">{point.description}</p>
                    </Card>
                  )
                })}
              </StaggerReveal>
            </div>
          </div>
        </section>

        <section className="px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <SectionHeader
                eyebrow="Jalur User"
                title="Mulai dari kondisimu sekarang."
                description="Tidak semua user punya CV yang sudah rapi. Karena itu, Road2Work menyediakan dua jalur untuk memulai."
              />
            </ScrollReveal>
            <StaggerReveal className="mt-12 grid gap-5 lg:grid-cols-2">
              {userPaths.map(path => {
                const Icon = path.icon

                return (
                  <Card key={path.title} className="p-7">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-2xl font-black text-ink">{path.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{path.description}</p>
                    <div className="mt-5 rounded-2xl bg-paper p-4 font-mono text-xs font-semibold leading-6 text-ink/70">
                      {path.flow}
                    </div>
                    <Button href="/signup" variant="secondary" className="mt-6">
                      {path.cta}
                    </Button>
                  </Card>
                )
              })}
            </StaggerReveal>
          </div>
        </section>

        <section className="bg-white px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <SectionHeader
                eyebrow="Trust"
                title="Dibangun dengan pendekatan Human-Centered AI."
                description="AI membantu latihan dan refleksi. Keputusan karier tetap berada pada user dan proses rekrutmen masing-masing perusahaan."
              />
            </ScrollReveal>
            <StaggerReveal className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {trustPoints.map(point => {
                const Icon = point.icon

                return (
                  <Card key={point.title} className="p-6">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-black text-ink">{point.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{point.description}</p>
                  </Card>
                )
              })}
            </StaggerReveal>
          </div>
        </section>

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

function RoadHero() {
  const textureStyle = {
    backgroundImage:
      'radial-gradient(circle at 78% 18%, rgba(255, 255, 255, 0.16), transparent 28%), radial-gradient(circle at 16% 24%, rgba(255, 97, 105, 0.28), transparent 32%), linear-gradient(135deg, #cf172b 0%, #931221 44%, #36080f 100%)',
  }

  const noiseStyle = {
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27180%27 height=%27180%27 viewBox=%270 0 180 180%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.78%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27180%27 height=%27180%27 filter=%27url(%23n)%27 opacity=%270.46%27/%3E%3C/svg%3E")',
  }

  return (
    <section className="relative -mt-20 overflow-hidden px-5 pb-0 pt-28 text-white sm:pt-32 lg:min-h-[790px]" style={textureStyle}>
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-35" style={noiseStyle} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_72%,rgba(255,255,255,0.18),transparent_25%),linear-gradient(90deg,rgba(0,0,0,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/22 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
        <div className="pb-12 pt-16 sm:pb-16 lg:pb-24 lg:pt-24">
          <p className="mb-7 inline-flex rounded-full border border-white/22 bg-white/10 px-5 py-2 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur">
            Your Roadmap to a Better Career
          </p>

          <h1 className="max-w-3xl text-balance font-display text-[clamp(3rem,6.4vw,5.45rem)] font-black leading-[0.98] tracking-normal text-white">
            Buktikan pengalamanmu sebelum interview sungguhan.
          </h1>

          <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-white/78 sm:text-lg">
            Road2Work membantu kamu membaca profil, menemukan role yang relevan, dan melatih jawaban interview dengan feedback berbasis evidence.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/signup" size="lg" className="bg-white text-brand-red hover:bg-white/90">
              Mulai Bangun Profil
            </Button>
            <Button href="/how-it-works" variant="secondary" size="lg" className="border-white/20 bg-white/12 text-white hover:bg-white/20">
              Lihat Cara Kerjanya
            </Button>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3 text-white/78">
            {['Profile', 'Role Fit', 'Voice Practice', 'Feedback', 'Improve'].map(item => (
              <span key={item} className="rounded-full border border-white/14 bg-black/12 px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-wide backdrop-blur">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[560px] lg:min-h-[710px]">
          <div className="absolute bottom-0 right-[-4.5rem] w-[min(120vw,760px)] sm:right-[-5rem] lg:right-[-7.5rem]">
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

          <div className="hero-float-a absolute left-1 top-20 max-w-[15rem] rounded-3xl bg-white p-5 text-ink shadow-[0_28px_80px_rgba(0,0,0,0.26)] sm:left-8 lg:left-8">
            <p className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">Readiness Signal</p>
            <p className="mt-3 font-display text-4xl font-black">82%</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">Profilmu sudah punya arah. Sekarang latih cara membuktikannya.</p>
          </div>

          <div className="hero-float-b absolute bottom-28 right-0 max-w-[14rem] rounded-3xl bg-white p-5 text-ink shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:right-4 lg:right-[-1.5rem]">
            <p className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">Next Step</p>
            <p className="mt-3 font-display text-2xl font-black">Perkuat evidence</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">Tambahkan konteks, kontribusi, dan hasil terukur.</p>
          </div>
        </div>
      </div>
    </section>
  )
}


function PromoVideoSection() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 text-ink lg:py-28">
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
            <div className="font-display text-4xl font-black leading-none">5 Pilar</div>
            <p className="mt-5 text-sm leading-6 text-white/50">
              Profile, Role, Practice, Feedback, dan Improve dalam satu roadmap.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="aspect-[16/9] bg-[radial-gradient(circle_at_28%_24%,rgba(230,57,70,0.28),transparent_28%),linear-gradient(135deg,#25292e_0%,#151719_45%,#0f1113_100%)]">
              <video
                className="h-full w-full object-cover opacity-70"
                src="/videos/hrd/male/Listening State (HRD sedang mendengarkan jawaban user).webm"
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
                <p className="font-display text-base font-black">Road2Work.id Overview</p>
                <p className="mt-1 text-xs leading-5 text-white/55">AI Career Readiness Platform untuk user yang ingin lebih siap menuju dunia kerja.</p>
              </div>
              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-white/60">
                01:30
              </span>
            </div>
          </div>
        </div>

        <PartnerLogoMarquee />
      </div>
    </section>
  )
}

function PartnerLogoMarquee() {
  const logos = [...partnerLogos, ...partnerLogos, ...partnerLogos]

  return (
    <div className="mx-auto mt-12 max-w-5xl border-t border-ink/10 pt-8">
      <p className="text-center font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted">
        Penyelenggara Capstone
      </p>
      <div className="relative mt-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="animate-[partner-marquee_22s_linear_infinite] flex w-max items-center gap-12">
          {logos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex h-16 w-44 shrink-0 items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={180}
                height={72}
                unoptimized
                className="max-h-12 w-auto object-contain opacity-70 grayscale transition hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
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
















