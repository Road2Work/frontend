import {
  FiActivity,
  FiBarChart2,
  FiBriefcase,
  FiCheckCircle,
  FiFlag,
  FiMap,
  FiMic,
  FiMessageCircle,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiUploadCloud,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'

export type IconItem = {
  title: string
  description: string
  icon: IconType
}

export const navItems = [
  { label: 'Produk', href: '/#product' },
  { label: 'Cara Kerja', href: '/how-it-works' },
  { label: 'Fitur', href: '/#features' },
  { label: 'Demo', href: '/interview' },
]

export const valuePillars = ['Sesuai role', 'Berbasis suara', 'Fokus bukti', 'Feedback adaptif']

export const features: IconItem[] = [
  {
    title: 'Professional Profile Intelligence',
    description: 'CV atau profil singkat dirapikan menjadi ringkasan profesional, daftar skill, tools, dan bukti pengalaman.',
    icon: FiSearch,
  },
  {
    title: 'Role Fit Recommendation',
    description: 'Lihat role yang paling masuk akal untuk dilatih berdasarkan profil, skill, tools, dan bukti yang sudah terbaca.',
    icon: FiTarget,
  },
  {
    title: 'Adaptive Voice Interview',
    description: 'Jawab pertanyaan dengan suara. Jika jawaban belum jelas, AI HRD akan meminta detail yang lebih spesifik.',
    icon: FiMic,
  },
  {
    title: 'Evidence-Based Feedback',
    description: 'Setiap jawaban dinilai dari bukti, relevansi role, struktur, kejelasan, dan bagian yang masih perlu diperkuat.',
    icon: FiCheckCircle,
  },
  {
    title: 'Career Readiness Dashboard',
    description: 'Lihat skor kesiapan, kekuatan, gap, feedback terbaru, riwayat aktivitas, dan prioritas latihan berikutnya.',
    icon: FiMap,
  },
]

export const proofPoints: IconItem[] = [
  {
    title: 'Clarifying Question Engine',
    description: 'Pertanyaan lanjutan muncul saat jawaban terlalu umum, impact belum terlihat, atau kontribusi pribadi belum jelas.',
    icon: FiMessageCircle,
  },
  {
    title: 'Evidence Ladder Scoring',
    description: 'Jawaban dipetakan dari bukti paling lemah sampai paling kuat, bukan hanya dinilai benar atau salah.',
    icon: FiTrendingUp,
  },
  {
    title: 'Adaptive Practice Memory',
    description: 'Riwayat latihan dipakai untuk menentukan fokus sesi berikutnya dan mengurangi pertanyaan yang berulang.',
    icon: FiBarChart2,
  },
]

export const workflowSteps: IconItem[] = [
  {
    title: 'Profile',
    description: 'Upload CV atau isi profil singkat. Sistem membaca pengalaman, skill, tools, dan bukti yang bisa dipakai saat interview.',
    icon: FiUploadCloud,
  },
  {
    title: 'Role',
    description: 'Gunakan rekomendasi role dari CV atau pilih target role sendiri jika kamu sudah punya tujuan yang jelas.',
    icon: FiTarget,
  },
  {
    title: 'Practice',
    description: 'Masuk ke interview berbasis suara. Jawab natural, lalu biarkan sistem membaca kualitas jawabanmu.',
    icon: FiMic,
  },
  {
    title: 'Improve',
    description: 'Baca feedback, cek dashboard kesiapan, lalu lanjutkan latihan pada gap yang paling berdampak.',
    icon: FiActivity,
  },
]

export const roleFamilies = [
  {
    family: 'Data & AI',
    description: 'Untuk role analitik, machine learning, dan implementasi produk AI.',
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
  { label: 'Relevansi Role', score: 82 },
  { label: 'Struktur STAR', score: 74 },
  { label: 'Kekuatan Bukti', score: 58 },
  { label: 'Akurasi Teknis', score: 69 },
  { label: 'Kejelasan Komunikasi', score: 86 },
  { label: 'Kesadaran Diri', score: 71 },
]

export const strengths = [
  'Jawaban relevan dengan tanggung jawab Data Analyst.',
  'Komunikasi cukup jelas dan mudah diikuti.',
  'Sudah menyebut project dashboard sebagai bukti utama.',
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
  { label: 'Fokus berikutnya', value: 'Bukti', note: 'Tambahkan metrik dampak', icon: FiCheckCircle },
]
