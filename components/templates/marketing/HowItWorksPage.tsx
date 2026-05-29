import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import AppShell from '@/components/organisms/AppShell'
import SectionHeader from '@/components/molecules/SectionHeader'
import StepCard from '@/components/molecules/StepCard'
import { workflowSteps } from '@/data/road2work'

const systemSteps = [
  'Baca CV atau profil singkat',
  'Tentukan role yang relevan',
  'Siapkan konteks interview',
  'Dengarkan jawaban berbasis suara',
  'Berikan klarifikasi saat perlu',
  'Tampilkan dashboard kesiapan',
]

export default function HowItWorksPage() {
  return (
    <AppShell>
      <main className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Cara Kerja"
            title="Dari profil mentah menjadi latihan interview yang punya arah."
            description="Road2Work memulai dari profilmu, membaca role yang relevan, menyiapkan sesi interview, lalu merangkum feedback ke dashboard kesiapan karier."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <StepCard key={step.title} index={index + 1} {...step} />
            ))}
          </div>

          <section className="mt-16">
            <Badge tone="red">Alur Latihan</Badge>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {systemSteps.map((step, index) => (
                <Card key={step} className="p-6">
                  <span className="font-mono text-xs font-black text-brand-red">0{index + 1}</span>
                  <h2 className="mt-4 font-display text-xl font-black text-ink">{step}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Setiap tahap punya fungsi jelas agar latihan tidak berhenti di skor, tetapi berlanjut ke langkah perbaikan.
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  )
}
