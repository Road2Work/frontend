'use client'

import type { FormEvent, ReactNode } from 'react'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { BarChart3, Database, Plus, Save, Search, ShieldCheck, SlidersHorizontal, Trash2, UsersRound } from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import AppHeader from '@/components/organisms/AppHeader'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import Textarea from '@/components/atoms/Textarea'
import AuthUserMenu from '@/components/molecules/AuthUserMenu'
import { adminService } from '@/services/admin.service'
import { domainService, roleFamilyService, roleService } from '@/services/role.service'
import type { AdminAnalytics, AdminUser, Domain, InterviewCompetency, Role, RoleFamily } from '@/types/api-contract'

type AdminTab = 'analytics' | 'users' | 'taxonomy'

const competencyOptions: Array<{ value: InterviewCompetency; label: string }> = [
  { value: 'self_introduction', label: 'Self Introduction' },
  { value: 'interest_need_of_learning', label: 'Interest & Learning' },
  { value: 'self_confidence', label: 'Self Confidence' },
  { value: 'skill', label: 'Skill' },
  { value: 'solution_skill', label: 'Solution Skill' },
  { value: 'agile_culture', label: 'Agile Culture' },
  { value: 'role_relevance_and_evidence', label: 'Role & Bukti' },
  { value: 'communication_clarity', label: 'Communication' },
  { value: 'technical_accuracy', label: 'Technical Accuracy' },
]

export default function AdminTemplate() {
  const [tab, setTab] = useState<AdminTab>('analytics')
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [domains, setDomains] = useState<Domain[]>([])
  const [roleFamilies, setRoleFamilies] = useState<RoleFamily[]>([])
  const [roles, setRoles] = useState<Role[]>([])

  const refreshTaxonomy = async () => {
    const [domainResponse, familyResponse, roleResponse] = await Promise.all([
      domainService.getDomains(),
      roleFamilyService.getRoleFamilies(),
      roleService.getRolesByFamily(),
    ])
    setDomains(domainResponse.data.domains)
    setRoleFamilies(familyResponse.data.roleFamilies)
    setRoles(roleResponse.data.roles)
  }

  useEffect(() => {
    Promise.all([
      adminService.getAnalytics(),
      adminService.getUsers(),
      domainService.getDomains(),
      roleFamilyService.getRoleFamilies(),
      roleService.getRolesByFamily(),
    ]).then(([analyticsResponse, usersResponse, domainResponse, familyResponse, roleResponse]) => {
      setAnalytics(analyticsResponse.data.analytics)
      setUsers(usersResponse.data.users)
      setDomains(domainResponse.data.domains)
      setRoleFamilies(familyResponse.data.roleFamilies)
      setRoles(roleResponse.data.roles)
    })
  }, [])

  return (
    <div className="min-h-screen bg-paper">
      <AppHeader backTo="/hub" backLabel="Kembali ke Dashboard" right={<AuthUserMenu fallbackName="Road2Work Admin" />} />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-8">
          <Badge tone="red">Admin Panel</Badge>
          <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] font-black leading-tight text-ink">
            Kelola data inti Road2Work.id.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Pantau aktivitas user, kelola taxonomy role, dan cek sinyal latihan dari satu tempat.
          </p>
        </motion.div>

        <div className="mb-6 flex flex-wrap gap-2">
          <TabButton active={tab === 'analytics'} onClick={() => setTab('analytics')} icon={BarChart3} label="Analitik" />
          <TabButton active={tab === 'users'} onClick={() => setTab('users')} icon={UsersRound} label="Users" />
          <TabButton active={tab === 'taxonomy'} onClick={() => setTab('taxonomy')} icon={Database} label="Taxonomy" />
        </div>

        {tab === 'analytics' && <AnalyticsPanel analytics={analytics} />}
        {tab === 'users' && <UsersPanel users={users} />}
        {tab === 'taxonomy' && (
          <TaxonomyPanel
            domains={domains}
            roleFamilies={roleFamilies}
            roles={roles}
            refresh={refreshTaxonomy}
          />
        )}
      </main>
    </div>
  )
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof BarChart3; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
        active ? 'border-brand-red bg-brand-red text-white shadow-[0_8px_24px_rgba(230,57,70,0.24)]' : 'border-ink/10 bg-white text-ink hover:border-ink/25'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}

function AnalyticsPanel({ analytics }: { analytics: AdminAnalytics | null }) {
  const cards = [
    { label: 'Total User', value: analytics?.totalUsers ?? 0 },
    { label: 'User Aktif', value: analytics?.activeUsers ?? 0 },
    { label: 'Interview Selesai', value: analytics?.totalCompletedInterviews ?? 0 },
    { label: 'Rata-rata Kesiapan', value: `${analytics?.averageCareerReadinessScore ?? 0}%` },
    { label: 'CV Diunggah', value: analytics?.totalCvUploaded ?? 0 },
    { label: 'Profil Manual', value: analytics?.totalManualProfiles ?? 0 },
  ]

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.04 }}>
            <Card className="p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-muted">{card.label}</div>
              <div className="mt-2 font-display text-3xl font-black text-ink">{card.value}</div>
            </Card>
          </motion.div>
        ))}
      </section>

      <aside className="space-y-5">
        <Card className="p-6">
          <h2 className="font-display text-xl font-black text-ink">Role Paling Dipilih</h2>
          <div className="mt-4 space-y-3">
            {(analytics?.mostSelectedRoles ?? []).map(item => (
              <MetricRow key={item.roleName} label={item.roleName} value={item.count} max={50} />
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-xl font-black text-ink">Area yang Sering Lemah</h2>
          <div className="mt-4 space-y-3">
            {(analytics?.mostCommonWeaknesses ?? []).map(item => (
              <MetricRow key={item.weakness} label={item.weakness.replaceAll('_', ' ')} value={item.count} max={70} danger />
            ))}
          </div>
        </Card>
      </aside>
    </div>
  )
}

function MetricRow({ label, value, max, danger }: { label: string; value: number; max: number; danger?: boolean }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="capitalize text-muted">{label}</span>
        <span className="font-display font-black text-ink">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-ink/5">
        <div className={`h-full rounded-full ${danger ? 'bg-brand-red' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
      </div>
    </div>
  )
}

function UsersPanel({ users }: { users: AdminUser[] }) {
  const [query, setQuery] = useState('')
  const filteredUsers = useMemo(
    () => users.filter(user => `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase())),
    [query, users],
  )

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-black/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-black text-ink">User Management</h2>
          <p className="mt-1 text-sm text-muted">Lihat status, quota, dan jumlah interview user.</p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input value={query} onChange={event => setQuery(event.currentTarget.value)} placeholder="Cari user..." className="pl-11" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-paper text-xs uppercase text-muted">
            <tr>
              <th className="px-5 py-3">Nama</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Quota</th>
              <th className="px-5 py-3">Interview</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-t border-black/[0.05]">
                <td className="px-5 py-4">
                  <div className="font-bold text-ink">{user.name}</div>
                  <div className="text-xs text-muted">{user.email}</div>
                </td>
                <td className="px-5 py-4 capitalize">{user.role}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">{user.status}</span>
                </td>
                <td className="px-5 py-4">{user.freeInterviewQuota}</td>
                <td className="px-5 py-4">{user.usedInterviewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

type TaxonomySection = 'domains' | 'families' | 'roles'

const taxonomySections: Array<{ key: TaxonomySection; title: string; subtitle: string; addLabel: string }> = [
  { key: 'domains', title: 'Domain', subtitle: 'Kategori besar bidang karier', addLabel: 'Tambah Domain' },
  { key: 'families', title: 'Role Family', subtitle: 'Kelompok role di dalam domain', addLabel: 'Tambah Family' },
  { key: 'roles', title: 'Role', subtitle: 'Target pekerjaan yang dipakai user flow', addLabel: 'Tambah Role' },
]

function TaxonomyPanel({
  domains,
  roleFamilies,
  roles,
  refresh,
}: {
  domains: Domain[]
  roleFamilies: RoleFamily[]
  roles: Role[]
  refresh: () => Promise<void>
}) {
  const [section, setSection] = useState<TaxonomySection>('domains')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const activeSection = taxonomySections.find(item => item.key === section) ?? taxonomySections[0]

  const taxonomyItems = {
    domains: domains.map(item => ({ id: item.id, title: item.name, subtitle: item.description, active: item.isActive })),
    families: roleFamilies.map(item => ({
      id: item.id,
      title: item.name,
      subtitle: `${getDomainName(domains, item.domainId)} - ${item.description}`,
      active: item.isActive,
    })),
    roles: roles.map(item => ({
      id: item.id,
      title: item.roleName,
      subtitle: `${getDomainName(domains, item.domainId)} - ${getFamilyName(roleFamilies, item.roleFamilyId)} - ${item.description}${item.competencyMap?.length ? ` - ${item.competencyMap.length} competency` : ''}`,
      active: item.isActive ?? true,
    })),
  }

  const deleteItem = async (id: string) => {
    if (section === 'domains') {
      await adminService.deleteDomain(id)
      toast.success('Domain dinonaktifkan')
    }

    if (section === 'families') {
      await adminService.deleteRoleFamily(id)
      toast.success('Role family dinonaktifkan')
    }

    if (section === 'roles') {
      await adminService.deleteRole(id)
      toast.success('Role dinonaktifkan')
    }

    await refresh()
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {taxonomySections.map(item => (
          <button
            key={item.key}
            type="button"
            onClick={() => setSection(item.key)}
            className={`rounded-full border px-5 py-2.5 font-display text-sm font-bold transition ${
              section === item.key
                ? 'border-brand-red bg-brand-red text-white shadow-[0_10px_28px_rgba(230,57,70,0.24)]'
                : 'border-ink/10 bg-white text-ink hover:border-brand-red/30 hover:text-brand-red'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-black text-ink">{activeSection.title}</h2>
              <p className="mt-1 text-sm text-muted">{activeSection.subtitle}</p>
            </div>
          </div>
          <Button type="button" onClick={() => setDrawerOpen(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4" /> {activeSection.addLabel}
          </Button>
        </div>

        <TaxonomyList items={taxonomyItems[section]} onDelete={deleteItem} />
        {section === 'roles' && <RoleCompetencyEditor roles={roles} refresh={refresh} />}
      </Card>

      <TaxonomyDrawer open={drawerOpen} title={activeSection.addLabel} subtitle={activeSection.subtitle} onClose={() => setDrawerOpen(false)}>
        {section === 'domains' && <DomainForm refresh={refresh} onDone={() => setDrawerOpen(false)} />}
        {section === 'families' && <RoleFamilyForm domains={domains} refresh={refresh} onDone={() => setDrawerOpen(false)} />}
        {section === 'roles' && <RoleForm domains={domains} roleFamilies={roleFamilies} refresh={refresh} onDone={() => setDrawerOpen(false)} />}
      </TaxonomyDrawer>
    </div>
  )
}

function DomainForm({ refresh, onDone }: { refresh: () => Promise<void>; onDone: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    await adminService.createDomain({ name, description })
    setName('')
    setDescription('')
    await refresh()
    onDone()
    toast.success('Domain dibuat')
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <Label htmlFor="domain-name">Nama Domain</Label>
        <Input id="domain-name" value={name} onChange={event => setName(event.currentTarget.value)} placeholder="Design & Creative" required />
      </div>
      <div>
        <Label htmlFor="domain-desc">Deskripsi</Label>
        <Textarea id="domain-desc" value={description} onChange={event => setDescription(event.currentTarget.value)} placeholder="Deskripsi singkat domain" />
      </div>
      <Button type="submit" className="w-full">
        <Plus className="h-4 w-4" /> Tambah Domain
      </Button>
    </form>
  )
}

function RoleFamilyForm({ domains, refresh, onDone }: { domains: Domain[]; refresh: () => Promise<void>; onDone: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [domainId, setDomainId] = useState(domains[0]?.id ?? '')
  const selectedDomainId = domainId || domains[0]?.id || ''

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    await adminService.createRoleFamily({ domainId: selectedDomainId, name, description })
    setName('')
    setDescription('')
    await refresh()
    onDone()
    toast.success('Role family dibuat')
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <Label htmlFor="family-domain">Domain</Label>
        <select id="family-domain" value={selectedDomainId} onChange={event => setDomainId(event.currentTarget.value)} className="h-12 w-full rounded-2xl border border-ink/10 bg-white px-4 text-sm outline-none focus:border-brand-red" required>
          {domains.map(domain => <option key={domain.id} value={domain.id}>{domain.name}</option>)}
        </select>
      </div>
      <div>
        <Label htmlFor="family-name">Nama Role Family</Label>
        <Input id="family-name" value={name} onChange={event => setName(event.currentTarget.value)} placeholder="Product & Growth" required />
      </div>
      <div>
        <Label htmlFor="family-desc">Deskripsi</Label>
        <Textarea id="family-desc" value={description} onChange={event => setDescription(event.currentTarget.value)} placeholder="Deskripsi singkat role family" />
      </div>
      <Button type="submit" className="w-full" disabled={!selectedDomainId}>
        <Plus className="h-4 w-4" /> Tambah Family
      </Button>
    </form>
  )
}

function RoleForm({ domains, roleFamilies, refresh, onDone }: { domains: Domain[]; roleFamilies: RoleFamily[]; refresh: () => Promise<void>; onDone: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [domainId, setDomainId] = useState(domains[0]?.id ?? '')
  const selectedDomainId = domainId || domains[0]?.id || ''
  const filteredFamilies = roleFamilies.filter(family => !selectedDomainId || family.domainId === selectedDomainId)
  const [roleFamilyId, setRoleFamilyId] = useState('')
  const selectedRoleFamilyId = filteredFamilies.some(family => family.id === roleFamilyId)
    ? roleFamilyId
    : filteredFamilies[0]?.id ?? ''
  const [coreSkills, setCoreSkills] = useState('')
  const [tools, setTools] = useState('')
  const [competencyMap, setCompetencyMap] = useState<InterviewCompetency[]>(['self_introduction', 'skill', 'solution_skill'])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    await adminService.createRole({
      domainId: selectedDomainId,
      roleFamilyId: selectedRoleFamilyId,
      name,
      description,
      coreSkills: coreSkills.split(',').map(item => item.trim()).filter(Boolean),
      tools: tools.split(',').map(item => item.trim()).filter(Boolean),
      competencyMap,
    })
    setName('')
    setDescription('')
    setCoreSkills('')
    setTools('')
    setCompetencyMap(['self_introduction', 'skill', 'solution_skill'])
    await refresh()
    onDone()
    toast.success('Role dibuat')
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <Label htmlFor="role-domain">Domain</Label>
        <select
          id="role-domain"
          value={selectedDomainId}
          onChange={event => {
            setDomainId(event.currentTarget.value)
            setRoleFamilyId('')
          }}
          className="h-12 w-full rounded-2xl border border-ink/10 bg-white px-4 text-sm outline-none focus:border-brand-red"
          required
        >
          {domains.map(domain => <option key={domain.id} value={domain.id}>{domain.name}</option>)}
        </select>
      </div>
      <div>
        <Label htmlFor="role-family">Role Family</Label>
        <select id="role-family" value={selectedRoleFamilyId} onChange={event => setRoleFamilyId(event.currentTarget.value)} className="h-12 w-full rounded-2xl border border-ink/10 bg-white px-4 text-sm outline-none focus:border-brand-red" required>
          {filteredFamilies.map(family => <option key={family.id} value={family.id}>{family.name}</option>)}
        </select>
      </div>
      <div>
        <Label htmlFor="role-name">Nama Role</Label>
        <Input id="role-name" value={name} onChange={event => setName(event.currentTarget.value)} placeholder="Product Analyst" required />
      </div>
      <div>
        <Label htmlFor="role-desc">Deskripsi</Label>
        <Textarea id="role-desc" value={description} onChange={event => setDescription(event.currentTarget.value)} placeholder="Deskripsi singkat role" required />
      </div>
      <div>
        <Label htmlFor="role-skills">Core Skills</Label>
        <Input id="role-skills" value={coreSkills} onChange={event => setCoreSkills(event.currentTarget.value)} placeholder="SQL, A/B Testing, Storytelling" />
      </div>
      <div>
        <Label htmlFor="role-tools">Tools</Label>
        <Input id="role-tools" value={tools} onChange={event => setTools(event.currentTarget.value)} placeholder="SQL, Excel, Mixpanel" />
      </div>
      <div>
        <Label htmlFor="role-competency">Competency Map</Label>
        <div id="role-competency" className="mt-2 flex flex-wrap gap-2">
          {competencyOptions.map(option => {
            const active = competencyMap.includes(option.value)
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setCompetencyMap(current => active ? current.filter(item => item !== option.value) : [...current, option.value])}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  active ? 'border-brand-red bg-brand-red text-white' : 'border-ink/10 bg-white text-muted hover:border-brand-red/30 hover:text-brand-red'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={!selectedDomainId || !selectedRoleFamilyId}>
        <Plus className="h-4 w-4" /> Tambah Role
      </Button>
    </form>
  )
}

function TaxonomyDrawer({ open, title, subtitle, onClose, children }: { open: boolean; title: string; subtitle: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Tutup panel" className="absolute inset-0 bg-ink/35 backdrop-blur-sm" onClick={onClose} />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] p-6">
          <div>
            <p className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-brand-red">Admin Taxonomy</p>
            <h3 className="mt-2 font-display text-2xl font-black text-ink">{title}</h3>
            <p className="mt-1 text-sm text-muted">{subtitle}</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-xl leading-none text-muted hover:border-brand-red/30 hover:text-brand-red" aria-label="Tutup panel">
            x
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </motion.aside>
    </div>
  )
}

function getDomainName(domains: Domain[], domainId?: string) {
  return domains.find(domain => domain.id === domainId)?.name ?? 'Domain tidak ditemukan'
}

function getFamilyName(roleFamilies: RoleFamily[], familyId?: string) {
  return roleFamilies.find(family => family.id === familyId)?.name ?? 'Family tidak ditemukan'
}
function RoleCompetencyEditor({ roles, refresh }: { roles: Role[]; refresh: () => Promise<void> }) {
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null)
  const [draftCompetencyMap, setDraftCompetencyMap] = useState<InterviewCompetency[]>([])

  const startEdit = (role: Role) => {
    setEditingRoleId(role.id)
    setDraftCompetencyMap(role.competencyMap ?? [])
  }

  const saveCompetencyMap = async (roleId: string) => {
    await adminService.updateRoleCompetencyMap(roleId, { competencyMap: draftCompetencyMap })
    await refresh()
    setEditingRoleId(null)
    toast.success('Competency map diperbarui')
  }

  return (
    <div className="mt-5 border-t border-black/[0.06] pt-4">
      <div className="mb-3 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-brand-red">Role Competency Map</div>
      <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-paper text-[0.62rem] uppercase tracking-widest text-muted">
              <tr>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Competencies</th>
                <th className="w-20 px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(role => {
                const isEditing = editingRoleId === role.id
                const competencies = role.competencyMap ?? []

                return (
                  <Fragment key={role.id}>
                    <tr className="border-t border-black/[0.05]">
                      <td className="px-4 py-3">
                        <div className="font-bold text-ink">{role.roleName}</div>
                        <div className="mt-0.5 text-xs text-muted">{competencies.length} competency aktif</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex max-w-md flex-wrap gap-1.5">
                          {competencies.length > 0 ? competencies.slice(0, 4).map(item => (
                            <span key={item} className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[0.65rem] font-bold text-brand-red">
                              {formatCompetency(item)}
                            </span>
                          )) : <span className="text-xs text-muted">Belum ada competency</span>}
                          {competencies.length > 4 && <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[0.65rem] font-bold text-muted">+{competencies.length - 4}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button type="button" onClick={() => startEdit(role)} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-brand-red/10 hover:text-brand-red" aria-label="Edit competency map">
                          <SlidersHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                    {isEditing && (
                      <tr className="border-t border-black/[0.05] bg-paper">
                        <td colSpan={3} className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {competencyOptions.map(option => {
                              const active = draftCompetencyMap.includes(option.value)
                              return (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => setDraftCompetencyMap(current => active ? current.filter(item => item !== option.value) : [...current, option.value])}
                                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                                    active ? 'border-brand-red bg-brand-red text-white' : 'border-ink/10 bg-white text-muted hover:border-brand-red/30 hover:text-brand-red'
                                  }`}
                                >
                                  {option.label}
                                </button>
                              )
                            })}
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button type="button" size="sm" onClick={() => void saveCompetencyMap(role.id)}>
                              <Save className="h-4 w-4" />
                              Simpan
                            </Button>
                            <Button type="button" variant="secondary" size="sm" onClick={() => setEditingRoleId(null)}>
                              Batal
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TaxonomyList({ items, onDelete }: { items: Array<{ id: string; title: string; subtitle?: string; active: boolean }>; onDelete: (id: string) => Promise<void> }) {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-paper text-[0.62rem] uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Deskripsi</th>
              <th className="px-4 py-3">Status</th>
              <th className="w-16 px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t border-black/[0.05]">
                <td className="max-w-[180px] px-4 py-3">
                  <div className="truncate font-bold text-ink">{item.title}</div>
                  <div className="mt-0.5 truncate font-mono text-[0.62rem] text-muted">{item.id}</div>
                </td>
                <td className="max-w-[260px] px-4 py-3">
                  <p className="line-clamp-2 text-xs leading-5 text-muted">
                    {item.subtitle ? sanitizeAdminText(item.subtitle) : '-'}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold ${item.active ? 'bg-emerald-500/10 text-emerald-700' : 'bg-ink/5 text-muted'}`}>
                    {item.active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => void onDelete(item.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-brand-red/10 hover:text-brand-red"
                    aria-label={`Nonaktifkan ${item.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function sanitizeAdminText(value: string) {
  return value.replace(/\s*(?:\u00e2\u20ac\u00a2|\u2022)\s*/g, ' - ')
}

function formatCompetency(value: InterviewCompetency) {
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
