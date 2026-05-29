import { FiCheckCircle, FiMessageSquare, FiPlayCircle } from 'react-icons/fi'
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
import { features, proofPoints } from '@/data/road2work'

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
              Your Roadmap to Interview Readiness
            </div>

            <h1 className="mx-auto mt-7 max-w-4xl text-balance font-display text-[clamp(2.05rem,4.6vw,3.75rem)] font-black leading-[1.12] tracking-normal text-ink">
              <span className="block">Buktikan Pengalamanmu</span>
              <span className="block">
                <span className="text-brand-red">dengan Jawaban Interview</span>
              </span>
              <span className="block">yang Lebih Terarah.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-sm font-semibold leading-7 text-muted sm:text-base">
              Mulai dari CV atau profil singkat. Road2Work membaca pengalaman, skill, dan bukti yang kamu punya,
              lalu menyiapkan role fit, latihan interview berbasis suara, dan feedback yang bisa langsung ditindaklanjuti.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/signup" size="lg" className="min-w-56">
                <FiPlayCircle className="h-4 w-4" />
                Mulai Bangun Profil
              </Button>
              <Button href="/how-it-works" variant="secondary" size="lg" className="min-w-52">
                Lihat Cara Kerjanya
              </Button>
            </div>

            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
              {['Profile', 'Role', 'Practice', 'Feedback', 'Improve'].map(item => (
                <span key={item} className="rounded-full border border-ink/10 bg-white/75 px-3 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-wide text-ink/70 shadow-soft">
                  {item}
                </span>
              ))}
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
                  title="Banyak pengalaman bagus terdengar biasa saja saat interview."
                  description="Project kuliah, organisasi, bootcamp, freelance, dan magang sering belum tersusun menjadi cerita yang jelas. Akhirnya kontribusi, tools, dan dampak yang sebenarnya kuat tidak ikut terbaca."
                />
              </ScrollReveal>
              <StaggerReveal className="grid gap-4 sm:grid-cols-3">
              {[
                'Kontribusi pribadi tenggelam di cerita tim.',
                'Pengalaman belum terlihat relevan dengan role tujuan.',
                'Latihan selesai, tapi tidak jelas apa yang harus diperbaiki.',
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

        <section id="product" className="px-5 py-24">
          <ScrollReveal className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Solusi"
              title="Road2Work mengubah pengalaman mentah menjadi konteks latihan."
              description="Alurnya dibuat runtut: bangun profil, pilih role, latihan bicara, baca feedback, lalu ulangi dengan fokus yang lebih tepat."
            />
            <WorkflowTimeline />
          </ScrollReveal>
        </section>

        <section id="features" className="bg-white px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <SectionHeader
                eyebrow="Pilar Fitur"
                title="Kamu tidak hanya dapat sesi latihan. Kamu dapat peta perbaikannya."
                description="Setiap pilar punya tugas yang jelas: membaca profil, mencocokkan role, menjalankan interview, mengevaluasi jawaban, dan merangkum langkah berikutnya."
              />
            </ScrollReveal>
            <StaggerReveal className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {features.map(feature => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <ScrollReveal>
                <SectionHeader
                  eyebrow="Latihan Adaptif"
                  title="Latihan berikutnya langsung masuk ke bagian yang paling perlu diperkuat."
                  description="Road2Work menyimpan fokus perbaikan dari sesi sebelumnya, lalu memakainya untuk memilih pertanyaan dan klarifikasi yang lebih relevan."
                />
                <div className="mt-8 rounded-[28px] border border-brand-red/15 bg-brand-red/5 p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
                      <FiCheckCircle className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold leading-7 text-ink/75">
                      Saat kamu latihan ulang, sistem melihat kelemahan terakhir, menghindari pertanyaan yang sama persis,
                      dan memberi ruang lebih besar untuk bagian yang perlu kamu perkuat.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <StaggerReveal className="grid gap-4 sm:grid-cols-3">
                {proofPoints.map(point => (
                  <FeatureCard key={point.title} {...point} />
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>

        <section className="px-5 py-20">
          <ScrollReveal className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionHeader
                eyebrow="Role Tersedia"
                title="Role awal dipilih agar latihannya tetap tajam."
                description="Daftar role dibuat fokus supaya rekomendasi, pertanyaan interview, rubrik penilaian, dan dashboard tetap relevan."
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
              Mulai dari profilmu. Lihat kesiapanmu setelah latihan.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/55">
              Buat profil latihan, pilih role yang masuk akal, jawab pertanyaan dengan suara, lalu lihat bagian mana yang paling perlu diperkuat sebelum interview sungguhan.
            </p>
            <div className="mt-9 flex justify-center">
              <Button href="/signup" size="lg" withArrow>
                Mulai Bangun Profil
              </Button>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </AppShell>
  )
}
