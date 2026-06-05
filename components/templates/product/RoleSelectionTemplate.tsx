'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { toast } from 'sonner'
import AppHeader from '@/components/organisms/AppHeader'
import { profileService } from '@/services/profile.service'
import { domainService, roleFamilyService, roleService } from '@/services/role.service'
import type { Domain, Role, RoleFamily } from '@/types/api-contract'

const card = {
  backgroundColor: '#FDFDFD',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: 20,
  boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.05)',
}

const stepLabels = ['Domain', 'Family', 'Role']

export default function RoleSelectionTemplate() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [domains, setDomains] = useState<Domain[]>([])
  const [roleFamilies, setRoleFamilies] = useState<RoleFamily[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [selected, setSelected] = useState({ domainId: '', familyId: '', roleId: '', roleName: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingProfile, setIsCreatingProfile] = useState(false)

  useEffect(() => {
    domainService
      .getDomains()
      .then(response => setDomains(response.data.domains.filter(domain => domain.isActive)))
      .finally(() => setIsLoading(false))
  }, [])

  const loadRoleFamilies = async (domainId: string) => {
    setIsLoading(true)
    try {
      const response = await roleFamilyService.getRoleFamilies(domainId)
      setRoleFamilies(response.data.roleFamilies.filter(family => family.isActive))
      setRoles([])
      setSelected(value => ({ ...value, domainId, familyId: '', roleId: '', roleName: '' }))
      setStep(2)
    } finally {
      setIsLoading(false)
    }
  }

  const loadRoles = async (familyId: string) => {
    setIsLoading(true)
    try {
      const response = await roleService.getRolesByFamily(familyId)
      setRoles(response.data.roles.filter(role => role.isActive ?? true))
      setSelected(value => ({ ...value, familyId, roleId: '', roleName: '' }))
      setStep(3)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectRole = (role: Role) => {
    setSelected(value => ({ ...value, roleId: role.id, roleName: role.roleName }))
    toast.success('Target role dipilih', {
      description: `Kamu akan latihan untuk ${role.roleName}.`,
    })
  }

  const handleContinue = async () => {
    if (!selected.roleId || isCreatingProfile) return

    setIsCreatingProfile(true)
    try {
      const response = await profileService.createProfile({ targetRoleId: selected.roleId })
      window.sessionStorage.setItem('road2work:onboarding-path', 'manual')
      window.sessionStorage.setItem('road2work:selected-domain-id', selected.domainId)
      window.sessionStorage.setItem('road2work:selected-role-family-id', selected.familyId)
      window.sessionStorage.setItem('road2work:selected-role-id', selected.roleId)
      window.sessionStorage.setItem('road2work:selected-role-name', selected.roleName)
      window.sessionStorage.setItem('road2work:profile-id', response.data.profile.id)

      toast.success('Profil latihan dibuat', {
        description: `Context interview akan disiapkan untuk ${selected.roleName}.`,
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

  const handleBack = () => {
    if (step === 3) {
      setSelected(value => ({ ...value, familyId: '', roleId: '', roleName: '' }))
      setRoles([])
      setStep(2)
      return
    }

    if (step === 2) {
      setSelected({ domainId: '', familyId: '', roleId: '', roleName: '' })
      setRoleFamilies([])
      setRoles([])
      setStep(1)
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo="/career-onboarding" backLabel="Ganti Jalur Mulai" />

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
              {step === 1 ? 'Pilih bidang karier' : step === 2 ? 'Pilih area role' : 'Pilih target role'}
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-muted">
              {step === 1
                ? 'Mulai dari bidang yang paling dekat dengan tujuan kariermu.'
                : step === 2
                  ? 'Pilih area yang paling sesuai dengan pengalaman dan minatmu.'
                  : 'Pilih role yang ingin kamu jadikan fokus latihan interview.'}
            </p>

            {isLoading ? (
              <LoadingCard />
            ) : (
              <div className="space-y-3">
                {step === 1 &&
                  domains.map((domain, index) => (
                    <SelectionButton
                      key={domain.id}
                      delay={index * 0.06}
                      icon={getInitials(domain.name)}
                      title={domain.name}
                      description={domain.description ?? 'Bidang karier tersedia'}
                      badge={index === 0 ? 'Paling populer' : undefined}
                      onClick={() => void loadRoleFamilies(domain.id)}
                    />
                  ))}

                {step === 2 &&
                  roleFamilies.map((family, index) => (
                    <SelectionButton
                      key={family.id}
                      delay={index * 0.07}
                      icon={getInitials(family.name)}
                      title={family.name}
                      description={family.description ?? 'Area role tersedia'}
                      onClick={() => void loadRoles(family.id)}
                    />
                  ))}

                {step === 3 &&
                  roles.map((role, index) => (
                    <RoleButton
                      key={role.id}
                      role={role}
                      delay={index * 0.07}
                      selected={selected.roleId === role.id}
                      onClick={() => handleSelectRole(role)}
                    />
                  ))}
              </div>
            )}

            {step > 1 && (
              <button onClick={handleBack} className="mt-6 flex items-center gap-1.5 text-sm font-medium text-[#A0A0A0] transition hover:text-ink">
                <ArrowLeft size={14} /> Kembali
              </button>
            )}

            {step === 3 && selected.roleId && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8">
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-brand-red/15 bg-brand-red/5 px-5 py-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                    <Check size={15} />
                  </div>
                  <div className="text-sm">
                    <span className="text-[#A0A0A0]">Latihan untuk: </span>
                    <strong className="font-display text-ink">{selected.roleName}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isCreatingProfile}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-red py-4 font-display font-bold text-white shadow-[0_4px_20px_rgba(230,57,70,0.32),0_1px_3px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:bg-brand-red-dark disabled:cursor-wait disabled:opacity-70"
                >
                  {isCreatingProfile ? 'Menyiapkan profil...' : 'Lanjut ke Setup Interview'} <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

function SelectionButton({
  delay,
  icon,
  title,
  description,
  badge,
  onClick,
}: {
  delay: number
  icon: string
  title: string
  description: string
  badge?: string
  onClick: () => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-2xl p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.06)]"
      style={card}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/8 font-display text-sm font-bold text-brand-red">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-ink">
            {title}
            {badge && <span className="rounded-full bg-brand-red/10 px-2 py-0.5 font-mono text-[0.6rem] tracking-wide text-brand-red">{badge}</span>}
          </div>
          <div className="mt-0.5 text-sm text-[#A0A0A0]">{description}</div>
        </div>
      </div>
      <ChevronRight size={18} className="shrink-0 text-[#D0D0D0]" />
    </motion.button>
  )
}

function RoleButton({ role, delay, selected, onClick }: { role: Role; delay: number; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.06)]"
      style={{
        ...card,
        backgroundColor: selected ? 'rgba(230,57,70,0.03)' : '#FDFDFD',
        border: selected ? '2px solid #E63946' : '1px solid rgba(0,0,0,0.07)',
      }}
    >
      <div>
        <span className="font-display font-bold text-ink">{role.roleName}</span>
        <p className="mt-1 text-sm leading-6 text-muted">{role.description}</p>
      </div>
      {selected ? (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_2px_8px_rgba(230,57,70,0.35)]">
          <Check size={13} />
        </div>
      ) : (
        <div className="h-7 w-7 shrink-0 rounded-full border-2 border-[#E8E8E8]" />
      )}
    </motion.button>
  )
}

function LoadingCard() {
  return (
    <div className="rounded-2xl p-5" style={card}>
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-red/20 border-t-brand-red" />
        <p className="text-sm text-muted">Memuat taxonomy role...</p>
      </div>
    </div>
  )
}

function getInitials(value: string) {
  return value
    .split(/\s|&/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}
