import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { teamMembers } from '@/data/road2work'
import ScrollReveal, { StaggerReveal } from './ScrollReveal'

const cardTones = ['#E93445', '#C81020', '#E93445', '#B50917', '#E93445', '#B50917']

function getInitials(name: string) {
  const parts = name.split(' ').filter(Boolean)
  return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase()
}

function getLeadBadge(role: string) {
  if (role.includes('Backend Lead')) return 'Backend Lead'
  if (role.includes('Frontend Lead')) return 'PM & Frontend Lead'
  return null
}

function getDisplayRole(role: string) {
  return role
    .replace('Backend Lead / ', '')
    .replace('Project Manager & Frontend Lead / ', '')
}

export default function TeamShowcase() {
  return (
    <section className="bg-white px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex rounded-full bg-paper px-4 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-widest text-ink">
            Tim Kami
          </div>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.05] text-ink">
            Tim di Balik
            <br />
            Road2Work<span className="text-brand-red">.id</span>
            <br />
            
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-7 text-muted">
            Road2Work.id dikerjakan oleh tim lintas disiplin yang menyatukan produk, data, AI, backend, frontend, dan UX.
          </p>
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => {
            const badge = getLeadBadge(member.role)

            return (
              <article
                key={member.id}
                className="overflow-hidden rounded-lg border border-black/[0.04] bg-white shadow-[0_18px_55px_rgba(31,41,55,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(31,41,55,0.12)]"
              >
                <div
                  className="relative flex aspect-[1.45] items-center justify-center"
                  style={{ backgroundColor: cardTones[index % cardTones.length] }}
                >
                  {badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 font-mono text-[0.6rem] font-bold text-white backdrop-blur">
                      {badge}
                    </span>
                  )}
                  <span className="font-display text-5xl font-black text-white/55">{getInitials(member.name)}</span>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-sm font-bold leading-tight text-ink">{member.name}</h3>
                  <div className="my-4 h-px bg-border-soft" />
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs leading-6 text-muted">{getDisplayRole(member.role)}</p>
                    <div className="flex shrink-0 items-center gap-2">
                      <a
                        href="#"
                        aria-label={`GitHub ${member.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition hover:bg-brand-red"
                      >
                        <FiGithub className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href="#"
                        aria-label={`LinkedIn ${member.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition hover:bg-brand-red"
                      >
                        <FiLinkedin className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </StaggerReveal>
      </div>
    </section>
  )
}
