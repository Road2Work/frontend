import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import AppShell from '@/components/organisms/AppShell'
import SectionHeader from '@/components/molecules/SectionHeader'
import StepCard from '@/components/molecules/StepCard'
import { workflowSteps } from '@/data/road2work'

const systemSteps = [
  'Ekstraksi konteks CV/Profile',
  'Pembuatan pertanyaan role-specific',
  'Pemrosesan jawaban voice dan STT',
  'Evaluasi jawaban Hybrid AI',
  'Keputusan pertanyaan clarifying',
  'Hasil dashboard berbasis evidence',
]

export default function HowItWorksPage() {
  return (
    <AppShell>
      <main className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="How It Works"
            title="Dari pengalaman mentah menjadi komunikasi yang siap interview."
            description="Flow Road2Work.id mengikuti PRD/SRS: role selection, context setup, live voice AI HRD interview, evaluation, clarification, dan result dashboard."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <StepCard key={step.title} index={index + 1} {...step} />
            ))}
          </div>

          <section className="mt-16">
            <Badge tone="red">System Pipeline</Badge>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {systemSteps.map((step, index) => (
                <Card key={step} className="p-6">
                  <span className="font-mono text-xs font-black text-brand-red">0{index + 1}</span>
                  <h2 className="mt-4 font-display text-xl font-black text-ink">{step}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Tahap ini menjaga pengalaman interview tetap personal, voice-first, dan berbasis evidence sesuai requirement MVP.
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
