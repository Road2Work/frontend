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
  { label: 'Cara Kerja', href: '/how-it-works' },
  { label: 'Fitur', href: '/#features' },
  { label: 'Demo', href: '/interview' },
]

export const valuePillars = ['Sesuai role', 'Berbasis suara', 'Fokus bukti', 'Feedback adaptif']

export const features: IconItem[] = [
  {
    title: 'Interview Adaptif',
    description: 'Pertanyaan mengikuti target role, konteks pengalaman, dan kualitas jawabanmu.',
    icon: FiUserCheck,
  },
  {
    title: 'Latihan Berbasis Suara',
    description: 'Latihan terasa seperti interview sungguhan karena kamu menjawab langsung dengan suara.',
    icon: FiMic,
  },
  {
    title: 'Penilaian Bukti Jawaban',
    description: 'Jawaban dinilai dari bukti, kontribusi pribadi, dampak, dan relevansi terhadap role.',
    icon: FiTrendingUp,
  },
  {
    title: 'Pertanyaan Lanjutan',
    description: 'AI HRD menggali detail jika jawaban masih umum, dampak belum jelas, atau tools belum disebutkan.',
    icon: FiMessageCircle,
  },
  {
    title: 'Contoh Perbaikan Jawaban',
    description: 'Lihat contoh jawaban yang lebih kuat tanpa mengubah fakta pengalamanmu.',
    icon: FiFileText,
  },
  {
    title: 'Dashboard Kesiapan',
    description: 'Lihat skor akhir, kekuatan, area perbaikan, rincian penilaian, dan latihan berikutnya.',
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
    title: 'Upload CV atau Isi Profil',
    description: 'Upload CV atau isi profil singkat agar Road2Work memahami skill, tools, pengalaman, dan bukti yang kamu miliki.',
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
