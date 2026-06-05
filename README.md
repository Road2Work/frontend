# Road2Work.id Frontend

Road2Work.id adalah AI Career Readiness Platform yang membantu user membangun profil profesional, menemukan role yang relevan, latihan interview berbasis suara dengan AI HRD, menerima feedback berbasis evidence, dan memantau perkembangan melalui Career Readiness Dashboard.

Frontend ini dibangun menggunakan Next.js App Router dengan pendekatan component-based dan struktur Atomic Design.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion / Motion
- Lenis Smooth Scroll
- Axios
- TanStack Query
- React Hook Form
- Zod
- Sonner Toast
- Lucide React
- Fontsource:
  - Space Grotesk
  - Plus Jakarta Sans
  - DM Mono

## Struktur Folder

```txt
frontend/
├── app/                  # Routing Next.js App Router
├── components/
│   ├── atoms/            # Komponen dasar: Button, Input, Badge, Card
│   ├── molecules/        # Gabungan atom: form group, cards, checklist item
│   ├── organisms/        # Section besar: Navbar, Header, Footer
│   └── templates/        # Page-level UI untuk marketing dan product flow
├── constants/            # Konstanta UI dan state interview
├── data/                 # Data statis pendukung UI
├── hooks/                # Custom React hooks
├── lib/                  # Utility/helper
├── public/               # Asset publik: logo, image, video
├── services/             # API client dan service layer
└── types/                # TypeScript API contract types
Fitur Frontend
Landing page Road2Work.id
Auth page: login dan signup
Career onboarding:
Upload CV path
Manual profile path
Profile review
Role fit recommendation
Interview preparation checklist
Adaptive voice interview UI
HRD video state:
IDLE
ASKING
LISTENING
THINKING
CLARIFYING
COMPLETED
Live caption preview
Interview result
Career Readiness Dashboard
Admin panel
Toast notification
Responsive layout untuk desktop dan mobile
Prasyarat
Pastikan sudah terinstall:

Node.js versi 20 atau lebih baru
npm
Backend Road2Work.id sudah berjalan
Machine Learning service sudah berjalan jika ingin mencoba flow interview penuh
Setup Local
Clone repository, lalu masuk ke folder frontend:

cd frontend
Install dependency:

npm install
Buat file .env.local berdasarkan .env.example:

cp .env.example .env.local
Contoh konfigurasi local:

NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_USE_MOCK_API=false
Jalankan development server:

npm run dev
Buka browser:

http://localhost:3000
Environment Variables
Variable	Keterangan
NEXT_PUBLIC_API_URL	Base URL backend API
NEXT_PUBLIC_USE_MOCK_API	Gunakan mock API lokal jika true
Contoh production:

NEXT_PUBLIC_API_URL=https://api.road2work.id/api/v1
NEXT_PUBLIC_USE_MOCK_API=false
Script
npm run dev
Menjalankan development server.

npm run build
Membuat production build.

npm run start
Menjalankan hasil production build.

npm run lint
Menjalankan ESLint.

Alur Utama User
1. User Baru
Landing Page
→ Signup/Login
→ Career Onboarding
→ Pilih Upload CV atau Isi Profil Manual
2. Upload CV Path
Upload CV
→ Profile Review
→ Role Fit Recommendation
→ Interview Onboarding
→ Interview Session
→ Result
→ Career Readiness Dashboard
3. Manual Profile Path
Isi Profil Manual
→ Pilih Domain, Role Family, dan Target Role
→ Profile Review
→ Interview Onboarding
→ Interview Session
→ Result
→ Career Readiness Dashboard
4. User yang Sudah Punya Dashboard
Dashboard
→ Perbarui Profile
→ Profile Review mode edit
→ Kembali ke Dashboard
Pada mode edit, user tidak diarahkan ulang ke role ranking. Role aktif tetap menjadi konteks latihan.

Interview State
Frontend mengikuti state interview berikut:

IDLE
→ ASKING
→ LISTENING
→ THINKING
→ CLARIFYING / ASKING
→ COMPLETED
Mapping asset video:

IDLE       -> /videos/hrd/male/IDLE.mp4
ASKING     -> /videos/hrd/male/ASKING.mp4
LISTENING  -> /videos/hrd/male/LISTENING.mp4
THINKING   -> /videos/hrd/male/THINKING.mp4
CLARIFYING -> /videos/hrd/male/CLARIFYING.mp4
COMPLETED  -> /videos/hrd/male/COMPLETED.mp4
Catatan Deployment
Sebelum deploy, pastikan:

npm run build
berhasil tanpa error.

Pastikan environment production:

NEXT_PUBLIC_API_URL=https://api.road2work.id/api/v1
NEXT_PUBLIC_USE_MOCK_API=false
Jangan commit file berikut:

.env
.env.local
.env.production
.next/
node_modules/
Troubleshooting
Font tidak berubah di browser
Coba hard refresh:

Ctrl + Shift + R
Jika masih belum berubah, hapus cache browser atau restart dev server.

Hydration warning bis_skin_checked
Biasanya berasal dari browser extension. Coba buka di Incognito atau disable extension yang menyisipkan atribut ke DOM.

API tidak terhubung
Pastikan backend berjalan dan NEXT_PUBLIC_API_URL sudah benar.

Local:

NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
Production:

NEXT_PUBLIC_API_URL=https://api.road2work.id/api/v1
CORS Error
Cek konfigurasi CORS di backend. Origin frontend production harus masuk allowlist backend.

Contoh:

CORS_ORIGINS=https://www.road2work.id,https://road2work.id
Status MVP
MVP Road2Work.id saat ini berfokus pada domain Information Technology. Ekspansi domain lain direncanakan pada fase berikutnya.

Author
Road2Work.id
Capstone Project CC26-PSU050
