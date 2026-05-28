# Frontend V2 Implementation Notes

Dokumen ini mencatat fitur frontend v2 yang sudah mulai diimplementasikan berdasarkan `docs/version 2.0`.

Update terbaru juga mulai menyesuaikan `docs/version 2.0/version 2.3` untuk Adaptive Session.

## Fitur yang Sudah Ada

- `GET /me` sudah menjadi endpoint current user.
- Mock API v2 sudah mendukung domain, role family, role, professional profile, role fit, interview, dan dashboard.
- Auth mock menyimpan `token` dan `userRole` cookie agar `proxy.ts` bisa menjaga route produk dan admin.
- Asset publik seperti `/logo`, `/videos`, `/images`, dan file media/font tidak diblokir oleh route guard.
- Navbar dan header dashboard membaca status auth mock, menampilkan Dashboard/Keluar saat user sudah login.
- Jika user mock memiliki role `admin`, navbar dan user menu menampilkan shortcut ke `/admin`.
- Komponen state reusable `PageState` dipakai untuk loading, empty, dan error agar halaman tidak menampilkan fallback data yang membingungkan.
- Halaman `Career Readiness Onboarding`:
  - route: `/career-onboarding`
  - pilihan Upload CV atau Isi Profil Manual
  - menyimpan path ke `sessionStorage`
- Upload CV Path:
  - `/career-onboarding`
  - `/setup`
  - `/profile-review`
  - `/role-fit`
  - `/onboarding`
- Manual Profile Path:
  - `/career-onboarding`
  - `/start`
  - `/setup`
  - `/profile-review`
  - `/onboarding`
- Review & Edit Professional Profile:
  - route: `/profile-review`
  - edit professional summary
  - edit skills
  - edit tools
  - edit skill evidence
  - confirm profile
- Role Fit Ranking khusus CV Path:
  - route: `/role-fit`
  - generate ranking mock
  - confirm selected role
- Admin Panel Basic:
  - route: `/admin`
  - analytics dashboard sederhana
  - user management table + search
  - CRUD ringan domain, role family, dan role
  - hanya bisa dibuka jika cookie `userRole=admin`
- Interview Stage v2:
  - session memakai 3 main questions untuk demo
  - recording timer tampil saat mic aktif
  - auto-stop jawaban pada 90 detik
  - state copy disesuaikan menjadi Recording dan Processing
  - dashboard refresh dipanggil setelah interview selesai
- Interview Result handoff:
  - result page menampilkan notice bahwa Career Readiness Dashboard sudah diperbarui
  - CTA utama mengarah ke `/hub`
  - statistik sesi membaca total main questions dari session
  - dashboard memiliki state Career Summary locked/unlocked
- Manual Role Selection:
  - route `/start` sekarang membaca Domain, Role Family, dan Role dari service/mock API
  - pilihan manual path tidak lagi memakai taxonomy hardcoded di komponen
  - selected domain, role family, dan role disimpan sebagai id untuk flow backend
- Profile Setup dan Review:
  - `/setup` mengikuti path yang dipilih di `/career-onboarding`
  - CV Path melakukan validasi PDF dan ukuran maksimal 5 MB sebelum extraction
  - Manual Path menampilkan selected target role dan tidak menawarkan upload CV ulang
  - `/profile-review` dapat mengedit achievement signals selain summary, skills, tools, dan skill evidence
- Role Fit Detail:
  - route `/role-fit/detail`
  - menampilkan fit score, reason, matched skills, missing skills, strengths, gaps, dan next best action
  - dashboard action `review_role` diarahkan ke halaman detail ini
  - memiliki loading, empty, dan error state standar
- Interview History:
  - route `/interview-history`
  - menampilkan riwayat sesi, score, role, status, tanggal, dan link detail hasil
  - dapat diakses dari Career Readiness Dashboard dan Result Page
  - service sudah mendukung filter `profileId` dan `roleId` sesuai API v2.3
  - memiliki loading, empty, dan error state standar
- Clarifying Question:
  - mock interview sekarang menghasilkan 1 follow-up question saat jawaban pertama lemah evidence
  - UI menampilkan state `clarifying` tanpa menaikkan progress main question
  - setelah user menjawab clarification, interview lanjut ke main question berikutnya
- Adaptive Session v2.3:
  - type contract sudah mendukung `RecordingPolicy`, `PracticeMode`, `AdaptivePracticeMemory`, `InterviewCompetency`, dan metadata submit voice answer
  - `interviewService.createSession` menerima payload v2.3: `questionCount`, `practiceMode`, `retryMode`, `avoidRepeatedQuestions`, `improvementFocus`, dan `requestedCompetencies`
  - `interviewService.submitVoiceAnswer` menerima metadata recording: `questionId`, `questionType`, `recordingStartedAt`, `recordingEndedAt`, `answerDurationSec`, `maxDurationSec`, `stopReason`, `autoMicStarted`, dan `silenceAutoStopEnabled`
  - route `/onboarding` menampilkan Adaptive Practice Memory jika ada history interview sebelumnya
  - route `/onboarding` menyediakan cek microphone agar permission siap sebelum masuk interview
  - route `/interview` mengaktifkan mic otomatis setelah state `asking` atau `clarifying`, lalu auto-stop pada batas recording policy
  - route `/interview` memakai `MediaRecorder` untuk merekam audio user dan fallback mock blob jika browser/permission tidak tersedia
  - route `/hub` menampilkan `adaptiveInterviewInsight`, `scoreMessage`, dan `impactScoreText` dari dashboard v2.3
  - route `/results` menampilkan `adaptiveSessionSuggestion` dan menyimpan fokus latihan berikutnya ke session storage sebelum user menekan `Latihan Lagi`
  - Admin Role form mulai mendukung `competencyMap` agar role dapat dipakai untuk adaptive question generation
  - Admin Panel memiliki editor `competencyMap` per role dan service untuk `PATCH /admin/roles/:id/competency-map`

## Catatan Flow Penting

Manual Path tidak memanggil `POST /role-fit/generate-ranking`.

Manual Path hanya menghitung `POST /role-fit/score` lalu `POST /role-fit/confirm`, karena user sudah memilih target role sebelum mengisi profil singkat.

## Session Storage

- `road2work:onboarding-path`
- `road2work:selected-domain-id`
- `road2work:selected-role-family-id`
- `road2work:selected-role-id`
- `road2work:selected-role-name`
- `road2work:profile-id`
- `road2work:profile-status`
- `road2work:profile-context-source`
- `road2work:role-fit-selection`
- `road2work:active-session-id`
- `road2work:last-result-id`
- `road2work:total-main-questions`
- `road2work:current-question-type`
- `road2work:practice-mode`
- `road2work:adaptive-memory`
- `road2work:recording-policy`

## Mock Auth

- User biasa: login dengan email apa pun selain `admin@road2work.id`, lalu diarahkan ke `/hub`.
- Admin: login dengan `admin@road2work.id`, lalu diarahkan ke `/admin`.
- `/login` dan `/signup` akan redirect ke `/hub` jika user sudah memiliki token.
- Tombol `Keluar` menghapus `token`, `user`, dan `userRole`, lalu mengarahkan kembali ke `/login`.

## Verifikasi

- `npm.cmd run lint`
- `npm.cmd run build`

## QA Manual

Gunakan `docs/frontend-v2-3-qa-checklist.md` untuk menguji Upload CV Path, Manual Profile Path, Adaptive Session v2.3, Interview History, Admin Panel, dan mobile checks.
