# Frontend v2.3 QA Checklist

Checklist ini dipakai untuk review manual Road2Work.id frontend berdasarkan brief `version 2.3 Adaptive Session`.

## Prasyarat

- Jalankan frontend dengan `npm.cmd run dev`.
- Mock API aktif secara default. Jika memakai `.env`, pastikan `NEXT_PUBLIC_USE_MOCK_API` tidak bernilai `false`.
- User biasa dapat login dengan email apa pun selain `admin@road2work.id`.
- Admin mock:
  - Email: `admin@road2work.id`
  - Password: bebas, contoh `password123`

## Smoke Test

- `npm.cmd run lint` berhasil.
- `npm.cmd run build` berhasil.
- `/` dapat dibuka tanpa login.
- `/logo`, `/videos`, dan asset publik tidak terkena redirect login.
- Route produk tanpa token redirect ke `/login`.
- Setelah login user biasa, `/hub` dapat dibuka.
- Setelah login admin, `/admin` dapat dibuka.
- User biasa yang membuka `/admin` diarahkan ke `/hub`.

## Upload CV Path

1. Buka `/login`, login sebagai user biasa.
2. Masuk ke `/career-onboarding`.
3. Pilih Upload CV.
4. Di `/setup`, upload file PDF maksimal 5 MB.
5. Pastikan loading extraction muncul.
6. Masuk `/profile-review`.
7. Edit summary, skills, tools, skill evidence, dan achievement signals.
8. Confirm profile.
9. Masuk `/role-fit`.
10. Pastikan top role ranking muncul.
11. Buka `/role-fit/detail`.
12. Confirm selected role.
13. Masuk `/onboarding`.
14. Pastikan quota dan Adaptive Practice Memory tampil.
15. Tes mic dan aktifkan kamera bila perlu.
16. Centang checklist lalu mulai interview.
17. Di `/interview`, pastikan:
    - state awal `asking`
    - mic otomatis aktif setelah HRD bertanya
    - timer 90 detik berjalan
    - user camera canvas bisa tampil/disembunyikan
    - Mic Off mengirim jawaban
    - clarification tidak menaikkan progress main question
18. Selesaikan session.
19. Masuk `/results`.
20. Pastikan Dashboard Updated Notice dan Adaptive Session Berikutnya tampil.
21. Klik `Latihan Lagi`, pastikan kembali ke `/onboarding` dengan adaptive focus tersimpan.
22. Buka `/hub`, pastikan dashboard menampilkan score, next action, adaptive insight, feedback terbaru, dan timeline.

## Manual Profile Path

1. Login user biasa.
2. Buka `/career-onboarding`.
3. Pilih Isi Profil Manual.
4. Di `/start`, pilih Domain, Role Family, Target Role.
5. Di `/setup`, isi profil singkat.
6. Pastikan flow tidak membuka Role Fit Ranking.
7. Di `/profile-review`, confirm profile.
8. Pastikan manual path langsung menghitung Role Fit Score lalu masuk `/onboarding`.
9. Lanjut interview sampai `/results`.
10. Pastikan `/hub` ter-update.

## Adaptive Session v2.3

- `/onboarding` menampilkan `Adaptive Practice Memory` ketika mock memiliki previous session.
- Create session mengirim:
  - `questionCount`
  - `practiceMode`
  - `retryMode`
  - `avoidRepeatedQuestions`
  - `improvementFocus`
  - `requestedCompetencies`
- `/interview` submit answer mengirim:
  - `questionId`
  - `questionType`
  - `audioFile`
  - `recordingStartedAt`
  - `recordingEndedAt`
  - `answerDurationSec`
  - `maxDurationSec`
  - `stopReason`
  - `autoMicStarted`
  - `silenceAutoStopEnabled`
- `/results` menampilkan `adaptiveSessionSuggestion`.
- Klik `Latihan Lagi` menyimpan practice mode dan improvement focus untuk session berikutnya.
- `/hub` menampilkan `adaptiveInterviewInsight`.

## Interview History

1. Buka `/interview-history`.
2. Pastikan list history tampil.
3. Klik Detail.
4. Pastikan `sessionId`, `resultId`, dan selected role disimpan lalu `/results` terbuka.
5. Pastikan service sudah siap menerima filter `profileId` dan `roleId`.

## Admin Panel

1. Login dengan `admin@road2work.id`.
2. Pastikan diarahkan ke `/admin`.
3. Navbar/user menu menampilkan shortcut Admin Panel.
4. Tab Analytics:
   - total users tampil
   - completed interviews tampil
   - common weaknesses tampil
5. Tab Users:
   - search user berfungsi
   - role/status/quota/interview count tampil
6. Tab Taxonomy:
   - create domain berfungsi
   - create role family berfungsi
   - create role berfungsi
   - competency map dapat dipilih saat create role
   - editor competency map per role dapat menyimpan perubahan
   - delete/disable domain, family, dan role berfungsi di mock

## Mobile Checks

- Landing page tidak overflow horizontal.
- Login/signup tetap dua kolom di desktop dan satu kolom di mobile.
- `/onboarding` camera preview, mic check, checklist, dan CTA tidak overlap.
- `/interview` HRD video, user camera canvas, question bubble, progress, dan mic control tetap usable di layar mobile.
- `/hub`, `/results`, `/admin`, dan `/interview-history` dapat discroll tanpa elemen saling menumpuk.

## Known Limitations

- Backend asli belum aktif; semua response masih mock saat `NEXT_PUBLIC_USE_MOCK_API !== false`.
- Audio direkam di frontend, tetapi mock tidak menyimpan audio. Penyimpanan audio/transcript/evaluation akan menjadi tanggung jawab backend.
- STT dan AI evaluation masih simulasi mock.
- Tidak ada automated E2E test karena Playwright belum menjadi dependency project.
