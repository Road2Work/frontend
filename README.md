# 🌐 Road2Work.id Frontend

Frontend Road2Work.id adalah aplikasi web berbasis **Next.js** yang digunakan sebagai interface utama user untuk melakukan onboarding, upload CV/manual profile, role fit, adaptive interview, melihat result, dan mengakses Career Readiness Dashboard.

---

## 🚀 Tech Stack

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **Axios / Fetch API**
* **TanStack Query**
* **Responsive Web Design**
* **REST API Integration**

---

## ⚙️ Prerequisites

Pastikan sudah menginstall:

* **Node.js** versi 18 atau lebih baru
* **npm** / **yarn** / **pnpm**
* Git

Cek versi Node.js:

```bash
node -v
```

Cek versi npm:

```bash
npm -v
```

---

## 📦 Installation

Clone repository:

```bash
git clone https://github.com/your-username/road2work.git
cd road2work/frontend
```

Install dependencies:

```bash
npm install
```

Atau jika menggunakan yarn:

```bash
yarn install
```

Atau jika menggunakan pnpm:

```bash
pnpm install
```

---

## 🔐 Environment Variables

Buat file `.env.local` di dalam folder `frontend`.

```bash
cp .env.example .env.local
```

Jika belum ada `.env.example`, buat manual file `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=Road2Work.id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Keterangan:

| Variable                   | Description          |
| -------------------------- | -------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL backend API |
| `NEXT_PUBLIC_APP_NAME`     | Nama aplikasi        |
| `NEXT_PUBLIC_APP_URL`      | URL frontend lokal   |

Jika backend sudah dideploy, ganti `NEXT_PUBLIC_API_BASE_URL` dengan URL backend production.

Contoh:

```env
NEXT_PUBLIC_API_BASE_URL=https://road2work-api.example.com/api/v1
```

---

## ▶️ Run Development Server

Jalankan frontend secara lokal:

```bash
npm run dev
```

Atau:

```bash
yarn dev
```

Atau:

```bash
pnpm dev
```

Frontend akan berjalan di:

```bash
http://localhost:3000
```

Buka URL tersebut di browser.

---

## 🧪 Available Scripts

Beberapa script yang umum digunakan:

```bash
npm run dev
```

Menjalankan aplikasi dalam mode development.

```bash
npm run build
```

Melakukan build aplikasi untuk production.

```bash
npm run start
```

Menjalankan hasil build production.

```bash
npm run lint
```

Menjalankan pengecekan linting.

---

## 🏗️ Build for Production

Untuk membuat build production:

```bash
npm run build
```

Jika build berhasil, jalankan:

```bash
npm run start
```

Aplikasi production akan berjalan di:

```bash
http://localhost:3000
```

---

## 🔌 Backend Integration

Frontend Road2Work.id berkomunikasi dengan backend menggunakan REST API.

Alur integrasi:

```text
Next.js Frontend
      ↓
Express.js Backend API
      ↓
FastAPI AI Service
      ↓
PostgreSQL
```

Frontend tidak memanggil AI service secara langsung. Semua proses seperti auth, profile, role fit, interview session, result, dan dashboard dikelola melalui backend API.

---

## 🧭 Main Frontend Flow

Alur utama frontend:

```text
Landing Page
    ↓
Login / Sign Up
    ↓
Career Onboarding
    ↓
Upload CV Path / Manual Profile Path
    ↓
Profile Review
    ↓
Role Fit
    ↓
Interview Onboarding
    ↓
Adaptive Interview Canvas
    ↓
Result
    ↓
Career Readiness Dashboard
```

---

## 🧩 Main Pages

| Page          | Description                               |
| ------------- | ----------------------------------------- |
| `/`           | Landing page Road2Work.id                 |
| `/login`      | Halaman login                             |
| `/register`   | Halaman registrasi                        |
| `/onboarding` | Career onboarding                         |
| `/profile`    | Profile review                            |
| `/role-fit`   | Role fit recommendation                   |
| `/interview`  | Interview onboarding dan interview canvas |
| `/result`     | Hasil interview                           |
| `/dashboard`  | Career Readiness Dashboard                |
| `/admin`      | Admin panel                               |

> Route dapat disesuaikan dengan struktur final project.

---

## 🎙️ Interview Canvas Notes

Pada fitur adaptive interview:

* AI HRD memberikan pertanyaan.
* Mic aktif otomatis saat user masuk state `Listening`.
* User memiliki waktu maksimal 90 detik untuk menjawab.
* Jawaban dikirim ke backend.
* Backend meneruskan proses ke AI service untuk speech-to-text dan evaluation.
* Hasil evaluasi dikembalikan ke frontend untuk ditampilkan di result/dashboard.

Interview state:

```text
Idle → Asking → Listening → Thinking → Clarifying → Completed
```

---

## 📊 Dashboard Output

Career Readiness Dashboard menampilkan:

* Career Readiness Score
* Evidence Score
* Role Fit Score
* Interview Readiness
* Strengths
* Gaps
* Latest Feedback
* Timeline
* Next Best Actions

---

## 🐞 Troubleshooting

### 1. Port 3000 sudah digunakan

Jika muncul error bahwa port 3000 sudah digunakan, jalankan dengan port lain:

```bash
npm run dev -- -p 3001
```

Lalu buka:

```bash
http://localhost:3001
```

---

### 2. API tidak terbaca

Pastikan file `.env.local` sudah benar:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

Pastikan backend sudah berjalan di:

```bash
http://localhost:5000
```

Restart frontend setelah mengubah `.env.local`.

---

### 3. Build error

Coba hapus cache dan install ulang dependencies:

```bash
rm -rf node_modules .next package-lock.json
npm install
npm run build
```

Untuk Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
Remove-Item package-lock.json
npm install
npm run build
```

---

### 4. Styling tidak muncul

Pastikan Tailwind sudah dikonfigurasi dengan benar di:

```text
tailwind.config.ts
globals.css
postcss.config.js
```

Pastikan file global CSS sudah di-import di `layout.tsx`.

---

## 🚀 Deployment

Frontend dapat dideploy menggunakan:

* Vercel
* Netlify
* GitHub Pages, jika menggunakan static export

### Deploy ke Vercel

1. Push project ke GitHub.
2. Login ke Vercel.
3. Import repository.
4. Pilih folder `frontend` sebagai root directory.
5. Tambahkan environment variables:

   * `NEXT_PUBLIC_API_BASE_URL`
   * `NEXT_PUBLIC_APP_NAME`
   * `NEXT_PUBLIC_APP_URL`
6. Klik Deploy.

---

## ✅ Frontend Checklist

Sebelum submit/deploy, pastikan:

* [ ] `.env.local` sudah dikonfigurasi.
* [ ] Backend API URL sudah benar.
* [ ] Semua halaman utama dapat dibuka.
* [ ] Login/register berjalan.
* [ ] Upload CV/manual profile dapat digunakan.
* [ ] Interview canvas dapat mengirim jawaban.
* [ ] Result dan dashboard dapat menampilkan data.
* [ ] Responsive layout sudah dicek.
* [ ] Tidak ada error besar di console browser.
* [ ] Build production berhasil.

---

## 👥 Frontend Contributors

| Name                             | Role                                                     |
| -------------------------------- | -------------------------------------------------------- |
| Yosua Immanuel Hizkya Kristiawan | Frontend Lead, UI/UX, Interview Canvas, Dashboard        |
| Alvano Hastagina                 | Backend Integration, API Support, Full-Stack Development |

---

## 📌 Notes

Road2Work.id frontend adalah bagian dari sistem utama yang terhubung dengan backend, AI service, dan database. Untuk menjalankan aplikasi secara penuh, pastikan backend dan AI service juga sudah berjalan.

---

<div align="center">

### 🚀 Road2Work.id Frontend

**Your Roadmap to a Better Career**

</div>
