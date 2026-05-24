'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { toast } from 'sonner'
import AppHeader from '@/components/organisms/AppHeader'
import { getRoleIdByName } from '@/services/role.service'
import { profileService } from '@/services/profile.service'

const card = {
  backgroundColor: '#FDFDFD',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: 20,
  boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)',
}

const domains = [
  { id: 'it', label: 'Information Technology', desc: 'Data, AI, Software, Cloud & Infrastructure', icon: 'IT', tag: 'Paling populer' },
  { id: 'business', label: 'Business & Management', desc: 'Marketing, Operations, Product, Strategy', icon: 'BM', soon: true },
  { id: 'design', label: 'Design & Creative', desc: 'UI/UX, Brand, Motion, Visual Design', icon: 'DC', soon: true },
]

const roleFamilies: Record<string, { id: string; label: string; desc: string; icon: string }[]> = {
  it: [
    { id: 'data-ai', label: 'Data & AI', desc: 'Data analysis, machine learning, AI engineering', icon: 'DA' },
    { id: 'software', label: 'Software Engineering', desc: 'Backend, frontend, full-stack development', icon: 'SE' },
    { id: 'cloud', label: 'Cloud & DevOps', desc: 'Infrastructure, CI/CD, cloud platforms', icon: 'CD' },
  ],
}

const roles: Record<string, string[]> = {
  'data-ai': ['Data Analyst', 'Data Scientist', 'AI Engineer', 'ML Engineer'],
  software: ['Backend Developer', 'Frontend Developer', 'Full-Stack Developer'],
  cloud: ['DevOps Engineer', 'Cloud Engineer', 'SRE'],
}

const stepLabels = ['Domain', 'Family', 'Role']

export default function RoleSelectionTemplate() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState({ domain: '', family: '', role: '' })
  const [isCreatingProfile, setIsCreatingProfile] = useState(false)
  const currentFamilies = roleFamilies[selected.domain] || []
  const currentRoles = roles[selected.family] || []

  const handleContinue = async () => {
    if (!selected.role || isCreatingProfile) return

    const roleId = getRoleIdByName(selected.role)
    setIsCreatingProfile(true)
    try {
      const response = await profileService.createProfile({ targetRoleId: roleId })
      window.sessionStorage.setItem('road2work:selected-role-id', roleId)
      window.sessionStorage.setItem('road2work:selected-role-name', selected.role)
      window.sessionStorage.setItem('road2work:profile-id', response.data.profile.id)

      toast.success('Profil latihan dibuat', {
        description: `Context interview akan disiapkan untuk ${selected.role}.`,
      })
      router.push('/setup')
    } catch (error) {
      toast.error('Gagal membuat profil latihan', {
        description: error instanceof Error ? error.message : 'Coba pilih role lagi.',
      })
    } finally {
      setIsCreatingProfile(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo="/hub" backLabel="Kembali ke Hub" />

      <main className="mx-auto max-w-2xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-12 flex items-center">
          {stepLabels.map((label, index) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm transition"
                  style={{
                    backgroundColor: step > index + 1 ? '#22C55E' : step === index + 1 ? '#E63946' : 'transparent',
                    color: step >= index + 1 ? 'white' : '#A0A0A0',
                    border: step <= index ? '2px solid #D9DDE6' : 'none',
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 700,
                    boxShadow: step === index + 1 ? '0 4px 12px rgba(230,57,70,0.35)' : 'none',
                  }}
                >
                  {step > index + 1 ? <Check size={15} /> : index + 1}
                </div>
                <div
                  className="mt-2 hidden whitespace-nowrap text-center font-mono text-[0.62rem] font-semibold uppercase tracking-wide sm:block"
                  style={{ color: step === index + 1 ? '#E63946' : step > index + 1 ? '#22C55E' : '#A0A0A0' }}
                >
                  {label}
                </div>
              </div>
              {index < stepLabels.length - 1 && (
                <div className="relative mx-3 h-0.5 flex-1">
                  <div className="absolute inset-0 rounded-full bg-[#E8E8E8]" />
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: step > index + 1 ? '#22C55E' : '#E63946' }}
                    initial={{ width: 0 }}
                    animate={{ width: step > index + 1 ? '100%' : step === index + 1 ? '50%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }}>
            <div className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-brand-red">
              <span className="h-px w-8 bg-brand-red" />
              Langkah {step} dari 3
            </div>

            <h1 className="mb-2 font-display text-[clamp(1.6rem,3vw,2rem)] font-extrabold leading-tight text-ink">
              {step === 1 ? 'Pilih domain kamu' : step === 2 ? 'Pilih role family' : 'Pilih target role'}
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-muted">
              {step === 1
                ? 'Bidang apa yang kamu targetkan untuk role berikutnya?'
                : step === 2
                  ? 'Area mana yang paling sesuai dengan background dan tujuan kamu?'
                  : 'Role spesifik apa yang ingin kamu latih?'}
            </p>

            <div className="space-y-3">
              {step === 1 &&
                domains.map((domain, index) => (
                  <motion.button
                    key={domain.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                    disabled={domain.soon}
                    onClick={() => {
                      setSelected(value => ({ ...value, domain: domain.id }))
                      setStep(2)
                    }}
                    className="group flex w-full items-center justify-between rounded-2xl p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
                    style={card}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/8 font-display text-sm font-bold text-brand-red">
                        {domain.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 font-display font-bold text-ink">
                          {domain.label}
                          {domain.tag && !domain.soon && <span className="rounded-full bg-brand-red/10 px-2 py-0.5 font-mono text-[0.6rem] tracking-wide text-brand-red">{domain.tag}</span>}
                          {domain.soon && <span className="rounded-full bg-ink/5 px-2 py-0.5 font-mono text-[0.6rem] text-muted">Segera</span>}
                        </div>
                        <div className="mt-0.5 text-sm text-[#A0A0A0]">{domain.desc}</div>
                      </div>
                    </div>
                    {!domain.soon && <ChevronRight size={18} className="shrink-0 text-[#D0D0D0]" />}
                  </motion.button>
                ))}

              {step === 2 &&
                currentFamilies.map((family, index) => (
                  <motion.button
                    key={family.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.07 }}
                    onClick={() => {
                      setSelected(value => ({ ...value, family: family.id }))
                      setStep(3)
                    }}
                    className="flex w-full items-center justify-between rounded-2xl p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.06)]"
                    style={card}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/8 font-display text-sm font-bold text-brand-red">{family.icon}</div>
                      <div>
                        <div className="font-display font-bold text-ink">{family.label}</div>
                        <div className="mt-0.5 text-sm text-[#A0A0A0]">{family.desc}</div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="shrink-0 text-[#D0D0D0]" />
                  </motion.button>
                ))}

              {step === 3 &&
                currentRoles.map((role, index) => (
                  <motion.button
                    key={role}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.07 }}
                    onClick={() => {
                      setSelected(value => ({ ...value, role }))
                      toast.success('Target role dipilih', {
                        description: `Kamu akan latihan untuk ${role}.`,
                      })
                    }}
                    className="flex w-full items-center justify-between rounded-2xl p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.06)]"
                    style={{
                      ...card,
                      backgroundColor: selected.role === role ? 'rgba(230,57,70,0.03)' : '#FDFDFD',
                      border: selected.role === role ? '2px solid #E63946' : '1px solid rgba(0,0,0,0.07)',
                    }}
                  >
                    <span className="font-display font-bold text-ink">{role}</span>
                    {selected.role === role ? (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_2px_8px_rgba(230,57,70,0.35)]">
                        <Check size={13} />
                      </div>
                    ) : (
                      <div className="h-7 w-7 shrink-0 rounded-full border-2 border-[#E8E8E8]" />
                    )}
                  </motion.button>
                ))}
            </div>

            {step > 1 && (
              <button onClick={() => setStep(value => value - 1)} className="mt-6 flex items-center gap-1.5 text-sm font-medium text-[#A0A0A0] transition hover:text-ink">
                <ArrowLeft size={14} /> Kembali
              </button>
            )}

            {step === 3 && selected.role && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8">
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-brand-red/15 bg-brand-red/5 px-5 py-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                    <Check size={15} />
                  </div>
                  <div className="text-sm">
                    <span className="text-[#A0A0A0]">Latihan untuk: </span>
                    <strong className="font-display text-ink">{selected.role}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isCreatingProfile}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-red py-4 font-display font-bold text-white shadow-[0_4px_20px_rgba(230,57,70,0.32),0_1px_3px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:bg-brand-red-dark disabled:cursor-wait disabled:opacity-70"
                >
                  {isCreatingProfile ? 'Membuat profil...' : 'Lanjut ke Interview Setup'} <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
