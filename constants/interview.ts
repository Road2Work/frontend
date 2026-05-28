import type { ComponentType, CSSProperties } from 'react'
import { MessageSquare, Mic, Star, Volume2 } from 'lucide-react'

export type InterviewState = 'idle' | 'asking' | 'listening' | 'thinking' | 'clarifying' | 'completed'

export type InterviewStateConfig = {
  label: string
  videoSrc: string
  color: string
  badgeBg: string
  badgeBorder: string
  ringColor: string
  glowColor: string
  hint: string
  orbGradient: string
  micBg: string
  micShadow: string
}

export const interviewQuestions = [
  'Bisakah kamu ceritakan project saat kamu memakai SQL untuk menyelesaikan masalah bisnis nyata, dan apa hasil terukurnya?',
  'Bagaimana kamu menyampaikan temuan kepada stakeholder non-teknis? Jelaskan satu contoh yang spesifik.',
  'Ceritakan saat kamu menemukan insight tidak terduga dari data. Apa impact-nya, dan bagaimana kamu menindaklanjutinya?',
  'Tools apa yang kamu gunakan untuk visualisasi data, dan pernahkah kamu mengganti tools di tengah project? Mengapa?',
  'Bagaimana kamu memastikan kualitas data sebelum analisis dimulai? Berikan proses konkret yang pernah kamu ikuti.',
]

export const clarifyingQuestion =
  'Kamu menyebut dashboard itu membantu. Bisa lebih spesifik tentang skala data dan impact terukur terhadap workflow tim?'

export const interviewStateConfig: Record<InterviewState, InterviewStateConfig> = {
  idle: {
    label: 'Siap Mulai',
    videoSrc: '/videos/hrd/male/Idle%20State%20(HRD%20siap%20memulai%20interview).webm',
    color: 'rgba(255,255,255,0.55)',
    badgeBg: 'rgba(255,255,255,0.094)',
    badgeBorder: 'rgba(255,255,255,0.188)',
    ringColor: 'rgba(255,255,255,0.12)',
    glowColor: 'rgba(100,120,200,0.12)',
    hint: 'HRD siap memulai interview',
    orbGradient: 'linear-gradient(135deg, #E63946 0%, #A50F17 100%)',
    micBg: 'rgba(255,255,255,0.05)',
    micShadow: '0 4px 24px rgba(0,0,0,0.3)',
  },
  asking: {
    label: 'Bertanya',
    videoSrc: '/videos/hrd/male/Asking%20State%20(HRD%20sedang%20mengajukan%20pertanyaan).webm',
    color: 'rgba(255,255,255,0.55)',
    badgeBg: 'rgba(255,255,255,0.094)',
    badgeBorder: 'rgba(255,255,255,0.188)',
    ringColor: 'rgba(255,255,255,0.12)',
    glowColor: 'rgba(100,120,200,0.12)',
    hint: 'Mic akan otomatis aktif setelah AI HRD selesai bertanya',
    orbGradient: 'linear-gradient(135deg, #E63946 0%, #A50F17 100%)',
    micBg: '#E63946',
    micShadow: '0 8px 40px rgba(230,57,70,0.45), 0 2px 8px rgba(0,0,0,0.3)',
  },
  listening: {
    label: 'Mendengarkan',
    videoSrc: '/videos/hrd/male/Listening%20State%20(HRD%20sedang%20mendengarkan%20jawaban%20user).webm',
    color: '#22C55E',
    badgeBg: 'rgba(34,197,94,0.094)',
    badgeBorder: 'rgba(34,197,94,0.188)',
    ringColor: '#22C55E',
    glowColor: 'rgba(34,197,94,0.14)',
    hint: 'Mic aktif. Tekan lagi saat jawaban selesai, atau tunggu batas waktu habis',
    orbGradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
    micBg: '#16A34A',
    micShadow: '0 8px 40px rgba(22,163,74,0.4), 0 2px 8px rgba(0,0,0,0.3)',
  },
  thinking: {
    label: 'Memproses',
    videoSrc: '/videos/hrd/male/Thinking%20State%20(AI%20sedang%20memproses%20jawaban).webm',
    color: '#F59E0B',
    badgeBg: 'rgba(245,158,11,0.094)',
    badgeBorder: 'rgba(245,158,11,0.188)',
    ringColor: '#F59E0B',
    glowColor: 'rgba(245,158,11,0.12)',
    hint: 'Road2Work sedang memahami jawabanmu...',
    orbGradient: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
    micBg: 'rgba(255,255,255,0.05)',
    micShadow: '0 4px 24px rgba(0,0,0,0.3)',
  },
  clarifying: {
    label: 'Klarifikasi',
    videoSrc: '/videos/hrd/male/Clarifying%20State%20(HRD%20meminta%20klarifikasi_detail%20tambahan).webm',
    color: '#E63946',
    badgeBg: 'rgba(230,57,70,0.094)',
    badgeBorder: 'rgba(230,57,70,0.188)',
    ringColor: '#E63946',
    glowColor: 'rgba(230,57,70,0.14)',
    hint: 'HRD meminta detail tambahan. Mic akan aktif setelah pertanyaan selesai',
    orbGradient: 'linear-gradient(135deg, #E63946 0%, #A50F17 100%)',
    micBg: '#E63946',
    micShadow: '0 8px 40px rgba(230,57,70,0.45), 0 2px 8px rgba(0,0,0,0.3)',
  },
  completed: {
    label: 'Selesai',
    videoSrc: '/videos/hrd/male/Completed%20State%20(Sesi%20interview%20selesai).webm',
    color: '#22C55E',
    badgeBg: 'rgba(34,197,94,0.094)',
    badgeBorder: 'rgba(34,197,94,0.188)',
    ringColor: '#22C55E',
    glowColor: 'rgba(34,197,94,0.14)',
    hint: 'Sesi selesai. Hasil latihan sedang disiapkan',
    orbGradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
    micBg: 'rgba(255,255,255,0.05)',
    micShadow: '0 4px 24px rgba(0,0,0,0.3)',
  },
}

export type OnboardingChecklistItem = {
  icon: ComponentType<{ size?: number; className?: string; style?: CSSProperties }>
  label: string
  desc: string
}

export const onboardingChecklistItems: OnboardingChecklistItem[] = [
  {
    icon: Mic,
    label: 'Mikrofon siap',
    desc: 'Pastikan mikrofon terhubung dan berfungsi.',
  },
  {
    icon: Volume2,
    label: 'Ruangan tenang',
    desc: 'Pilih tempat dengan noise latar yang minim.',
  },
  {
    icon: MessageSquare,
    label: 'Jawab secara natural',
    desc: 'Bicaralah seperti interview sungguhan. Tidak perlu sempurna.',
  },
  {
    icon: Star,
    label: 'Gunakan contoh dan bukti',
    desc: 'AI HRD mencari detail yang spesifik dan konkret dalam jawaban kamu.',
  },
]

export const interviewFrameStyles = {
  container: {
    borderRadius: 28,
    background: '#080A10',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow:
      '0 40px 100px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
    minHeight: 'clamp(260px, 46vh, 420px)',
  },
  videoOverlay: {
    background:
      'linear-gradient(to bottom, rgba(8,10,16,0.18) 0%, transparent 34%, rgba(8,10,16,0.28) 100%)',
  },
  vignette: {
    background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)',
  },
  avatarShell: {
    background: 'linear-gradient(145deg, #1C2034 0%, #242845 100%)',
  },
  bottomOverlay: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
  },
} as const

export const figmaCardClass =
  'rounded-[20px] border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.05)]'
