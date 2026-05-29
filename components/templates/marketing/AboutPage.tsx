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
            title="Road2Work.id mengubah pengalaman nyata menjadi latihan interview yang lebih terarah."
            description="Kami membangun platform kesiapan karier untuk membaca profil, menemukan role yang relevan, melatih jawaban berbasis suara, dan memberi feedback yang bisa ditindaklanjuti."
          />

          <section className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              ['Visi', 'Menjadi roadmap kesiapan karier untuk talenta muda yang ingin menjelaskan pengalaman dengan lebih terarah.'],
              ['Misi', 'Membantu user membangun profil, memilih role yang masuk akal, melatih jawaban lisan, dan tahu bagian yang perlu diperbaiki.'],
              ['Positioning', 'Bukan job portal dan bukan CV builder penuh. Road2Work fokus pada profile intelligence, role fit, interview practice, dan readiness dashboard.'],
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
              description="Tim lintas disiplin yang membangun pengalaman Road2Work dari sisi produk, data, AI, backend, frontend, dan UX."
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
