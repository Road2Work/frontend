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
            description="Road2Work.id membantu mahasiswa, fresh graduate, dan career switcher berlatih interview dengan konteks yang lebih personal dan terukur."
          />

          <section className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              ['Visi', 'Menjadi platform latihan interview berbasis AI yang membantu talenta muda membangun kepercayaan diri.'],
              ['Misi', 'Membantu user memahami ekspektasi interview, melatih jawaban lisan, dan mendapat feedback yang mudah ditindaklanjuti.'],
              ['Positioning', 'Bukan job portal, tetapi platform latihan interview berbasis role, suara, dan bukti pengalaman.'],
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
              description="Tim lintas disiplin yang membangun pengalaman latihan interview dari sisi produk, data, AI, dan engineering."
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
