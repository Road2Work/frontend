import {
  FiActivity,
  FiBarChart2,
  FiBriefcase,
  FiCheckCircle,
  FiFileText,
  FiFlag,
  FiMic,
  FiMessageCircle,
  FiTarget,
  FiTrendingUp,
  FiUploadCloud,
  FiUserCheck,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'

export type IconItem = {
  title: string
  description: string
  icon: IconType
}

export const navItems = [
  { label: 'Produk', href: '/#product' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Demo', href: '/interview' },
]

export const valuePillars = ['Role-specific', 'Voice-based', 'Evidence-focused', 'Adaptive feedback']

export const features: IconItem[] = [
  {
    title: 'Adaptive HRD Interview',
    description: 'Pertanyaan mengikuti target role, konteks pengalaman, dan kualitas jawaban user.',
    icon: FiUserCheck,
  },
  {
    title: 'Voice-Only Practice',
    description: 'Latihan terasa seperti interview asli dengan state asking, listening, thinking, dan clarifying.',
    icon: FiMic,
  },
  {
    title: 'Evidence Ladder Scoring',
    description: 'Jawaban dinilai dari bukti, kontribusi pribadi, dampak, dan relevansi terhadap role.',
    icon: FiTrendingUp,
  },
  {
    title: 'Clarifying Follow-Up',
    description: 'AI HRD menggali detail jika jawaban masih umum, impact belum jelas, atau tools tidak disebutkan.',
    icon: FiMessageCircle,
  },
  {
    title: 'Before-After Answer',
    description: 'Dashboard memperlihatkan contoh perbaikan jawaban tanpa mengarang fakta baru.',
    icon: FiFileText,
  },
  {
    title: 'Readiness Dashboard',
    description: 'Skor akhir, strengths, improvement areas, breakdown, dan latihan berikutnya dalam satu halaman.',
    icon: FiBarChart2,
  },
]

export const workflowSteps: IconItem[] = [
  {
    title: 'Pilih Role Tujuan',
    description: 'Tentukan role yang ingin kamu latih, seperti Data Analyst, AI Engineer, ML Engineer, atau Backend Developer.',
    icon: FiTarget,
  },
  {
    title: 'Upload CV / Profil',
    description: 'Upload CV atau isi profil singkat agar AI memahami skill, tools, pengalaman, dan evidence yang kamu miliki.',
    icon: FiUploadCloud,
  },
  {
    title: 'Live Voice Interview',
    description: 'Masuk ke sesi interview dengan AI HRD dan jawab pertanyaan menggunakan suara seperti interview sungguhan.',
    icon: FiMic,
  },
  {
    title: 'Dapatkan Dashboard',
    description: 'Lihat kekuatan, area perbaikan, contoh jawaban yang lebih baik, dan rekomendasi latihan berikutnya.',
    icon: FiActivity,
  },
]

export const roleFamilies = [
  {
    family: 'Data & AI',
    description: 'Untuk role analitik, machine learning, dan AI product implementation.',
    roles: ['Data Analyst', 'Data Scientist', 'AI Engineer', 'ML Engineer'],
  },
  {
    family: 'Software Engineering',
    description: 'Untuk role backend, API, database, dan sistem produksi.',
    roles: ['Backend Developer'],
  },
]

export const allRoles = roleFamilies.flatMap(item => item.roles)

export const dashboardBreakdown = [
  { label: 'Role Relevance', score: 82 },
  { label: 'STAR Structure', score: 74 },
  { label: 'Evidence Specificity', score: 58 },
  { label: 'Technical Accuracy', score: 69 },
  { label: 'Communication Clarity', score: 86 },
  { label: 'Self-Awareness', score: 71 },
]

export const strengths = [
  'Jawaban relevan dengan tanggung jawab Data Analyst.',
  'Komunikasi cukup jelas dan mudah diikuti.',
  'Sudah menyebut project dashboard sebagai evidence utama.',
]

export const improvements = [
  'Tambahkan angka impact agar bukti lebih kuat.',
  'Pisahkan situasi, aksi, dan hasil dengan struktur STAR.',
  'Jelaskan tools dan kontribusi pribadi secara lebih spesifik.',
]

export const teamMembers = [
  {
    name: 'Muhammad Adil Imamul Haq Mubarak',
    id: 'CACC149D6Y0561',
    role: 'AI Engineer',
  },
  {
    name: 'Alvano Hastagina',
    id: 'CFCC560D6Y0640',
    role: 'Backend Lead / Full-Stack Web Developer',
  },
  {
    name: 'Diva Syabina Putri',
    id: 'CACC307D6X0932',
    role: 'AI Engineer',
  },
  {
    name: 'Nurul Ainil Fitri',
    id: 'CDCC295D6X1246',
    role: 'Data Scientist',
  },
  {
    name: 'Yosua Immanuel Hizkya Kristiawan',
    id: 'CFCC676D6Y1544',
    role: 'Project Manager & Frontend Lead / Full-Stack Web Developer',
  },
  {
    name: 'Addya Virna Amany',
    id: 'CDCC290D6X1902',
    role: 'Data Scientist',
  },
]

export const onboardingChecklist = [
  'Mikrofon siap',
  'Ruangan tenang',
  'Jawab secara natural',
  'Gunakan contoh dan bukti',
]

export const hubStats = [
  { label: 'Skor terbaru', value: '72%', note: 'Hampir Siap', icon: FiBarChart2 },
  { label: 'Target role', value: 'Data Analyst', note: 'Sesi terakhir', icon: FiBriefcase },
  { label: 'Runtutan latihan', value: '3 hari', note: 'Jaga momentum', icon: FiFlag },
  { label: 'Fokus berikutnya', value: 'Evidence', note: 'Tambahkan metrik impact', icon: FiCheckCircle },
]
