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
  { label: 'Cara Kerja', href: '/#workflow' },
  { label: 'Fitur', href: '/#features' },
  { label: 'Demo', href: '/#demo' },
]

export const valuePillars = ['Sesuai role', 'Berbasis suara', 'Fokus bukti', 'Feedback adaptif']

export const features: IconItem[] = [
  {
    title: 'Professional Profile Intelligence',
    description: 'Upload CV atau isi profil singkat. Road2Work membaca pengalaman menjadi skill, tools, achievement, dan evidence yang lebih terstruktur.',
    icon: FiSearch,
  },
  {
    title: 'Role Fit Recommendation',
    description: 'Pahami role yang paling relevan dengan profilmu, lengkap dengan role fit score, gap utama, dan alasan rekomendasi.',
    icon: FiTarget,
  },
  {
    title: 'Adaptive Voice Interview',
    description: 'Latihan interview dengan AI HRD berbasis suara. Pertanyaan menyesuaikan role, profil, dan kualitas jawabanmu.',
    icon: FiMic,
  },
  {
    title: 'Evidence-Based Feedback',
    description: 'Jawaban dievaluasi berdasarkan relevansi role, struktur, clarity, evidence, kontribusi pribadi, dan impact.',
    icon: FiCheckCircle,
  },
  {
    title: 'Career Readiness Dashboard',
    description: 'Pantau readiness score, strengths, gaps, latest feedback, timeline, dan langkah perbaikan berikutnya.',
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
    photo: '/photo/adil.png',
    github: 'https://github.com/AisTattoo',
    linkedin: 'https://www.linkedin.com/in/muhammad-adil-imamul-haq-mubarak-5522bb2a8/',
  },
  {
    name: 'Alvano Hastagina',
    id: 'CFCC560D6Y0640',
    role: 'Backend Lead / Full-Stack Web Developer',
    photo: '/photo/alvano.png',
    github: 'https://github.com/alvanochi',
    linkedin: 'https://www.linkedin.com/in/alvanoh/',
  },
  {
    name: 'Diva Syabina Putri',
    id: 'CACC307D6X0932',
    role: 'AI Engineer',
    photo: '/photo/diva.png',
    github: 'https://github.com/VaSy365',
    linkedin: 'https://www.linkedin.com/in/diva-syabina-putri-a339692b1/',
  },
  {
    name: 'Nurul Ainil Fitri',
    id: 'CDCC295D6X1246',
    role: 'Data Scientist',
    photo: '/photo/nurul.png',
    github: 'https://github.com/nurulainilf',
    linkedin: 'https://www.linkedin.com/in/nurulainilf/',
  },
  {
    name: 'Yosua Immanuel Hizkya Kristiawan',
    id: 'CFCC676D6Y1544',
    role: 'Project Manager & Frontend Lead / Full-Stack Web Developer',
    photo: '/photo/yosua.png',
    github: 'https://github.com/YosKyaa',
    linkedin: 'https://www.linkedin.com/in/yosuaimmanuelhk/',
  },
  {
    name: 'Addya Virna Amany',
    id: 'CDCC290D6X1902',
    role: 'Data Scientist',
    photo: '/photo/addya.png',
    github: 'https://github.com/addyavirna-art',
    linkedin: 'https://www.linkedin.com/in/addya-virna-amany-35878a359/',
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



