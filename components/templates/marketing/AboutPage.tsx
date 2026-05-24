import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import AppShell from '@/components/organisms/AppShell'
import SectionHeader from '@/components/molecules/SectionHeader'
import { teamMembers } from '@/data/road2work'

export default function AboutPage() {
  return (
    <AppShell>
      <main className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Tentang Road2Work.id"
            title="Membantu talenta muda mengubah pengalaman nyata menjadi komunikasi yang siap karier."
            description="Road2Work.id dikembangkan sebagai capstone product yang menggabungkan frontend, backend, AI service, TensorFlow supporting model, dan data science dashboard."
          />

          <section className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              ['Visi', 'Menjadi platform latihan interview berbasis AI yang membantu talenta muda membangun kepercayaan diri.'],
              ['Misi', 'Membantu user memahami ekspektasi interview, melatih jawaban lisan, dan mendapat feedback yang actionable.'],
              ['Positioning', 'Bukan job portal, tetapi AI interview readiness platform berbasis role, voice, dan evidence.'],
            ].map(([title, text]) => (
              <Card key={title} className="p-7">
                <Badge tone="red">{title}</Badge>
                <p className="mt-5 text-sm leading-7 text-muted">{text}</p>
              </Card>
            ))}
          </section>

          <section className="mt-16">
            <SectionHeader
              eyebrow="Tim"
              title="Tim di Balik Road2Work.id"
              description="Tim capstone lintas role yang berfokus pada AI, data, backend, frontend, dan product experience."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map(member => (
                <Card key={member.id} className="p-6">
                  <p className="font-display text-xl font-black leading-tight text-ink">{member.name}</p>
                  <p className="mt-3 text-sm font-bold text-brand-red">{member.role}</p>
                  <p className="mt-2 font-mono text-xs text-muted">{member.id}</p>
                  <Badge tone="green" className="mt-5">
                    Aktif
                  </Badge>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  )
}
