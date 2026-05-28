import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import AppShell from '@/components/organisms/AppShell'
import SectionHeader from '@/components/molecules/SectionHeader'
import StepCard from '@/components/molecules/StepCard'
import { workflowSteps } from '@/data/road2work'

const systemSteps = [
  'Baca CV atau profil singkat',
  'Susun pertanyaan sesuai role',
  'Rekam jawaban berbasis suara',
  'Evaluasi kualitas jawaban',
  'Ajukan pertanyaan lanjutan',
  'Tampilkan dashboard latihan',
]

export default function HowItWorksPage() {
  return (
    <AppShell>
      <main className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="How It Works"
            title="Dari pengalaman mentah menjadi komunikasi yang siap interview."
            description="Road2Work memandu kamu dari memilih role, menyiapkan konteks, menjawab dengan suara, sampai melihat feedback yang bisa langsung dilatih."
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
                    Setiap tahap dirancang agar latihan terasa personal, fokus, dan mudah dipahami.
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
