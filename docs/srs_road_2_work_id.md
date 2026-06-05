# Software Requirements Specification (SRS)
# Road2Work.id â€” AI Interview Readiness Platform

**Versi:** 1.0  
**Project Theme:** Future-Ready Work & Economy  
**Prepared for:** Capstone Project Road2Work.id  
**Prepared by:** Tim Road2Work.id  

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen

Dokumen Software Requirements Specification (SRS) ini dibuat untuk mendefinisikan kebutuhan sistem Road2Work.id secara detail, terstruktur, dan dapat dijadikan acuan bersama oleh seluruh tim, termasuk Frontend, Backend, AI Engineer, Data Scientist, QA, dan Project Manager.

Dokumen ini bertujuan untuk:

1. Menjelaskan ruang lingkup aplikasi Road2Work.id.
2. Mendefinisikan kebutuhan fungsional dan non-fungsional sistem.
3. Menjelaskan alur pengguna dari awal sampai akhir.
4. Menjadi acuan pengembangan fitur MVP.
5. Mengurangi risiko miskomunikasi antar role teknis.
6. Menjadi dasar untuk API contract, database design, testing, dan demo project.

---

### 1.2 Deskripsi Singkat Produk

**Road2Work.id** adalah platform **AI Interview Readiness** yang membantu mahasiswa, fresh graduate, dan career switcher mempersiapkan interview kerja berdasarkan target role.

User dapat memilih role tujuan, memberikan konteks pengalaman melalui **upload CV** atau **isi profil singkat**, lalu menjalani **live voice interview** dengan AI HRD. Sistem akan mengevaluasi jawaban user, mendeteksi kelemahan, memberikan pertanyaan klarifikasi jika diperlukan, dan menghasilkan dashboard evaluasi berisi:

1. Strengths
2. Improvement Areas
3. Beforeâ€“After Answer Improvement
4. Next Practice Recommendation

Road2Work.id tidak diposisikan sebagai job portal utama, tetapi sebagai platform latihan interview yang membantu user membangun jawaban yang lebih relevan, jelas, dan berbasis evidence.

---

### 1.3 Scope MVP

Ruang lingkup MVP Road2Work.id meliputi:

1. Landing Page
2. Login dan Sign Up
3. Readiness Hub
4. Role Selection
5. Interview Context Setup
6. Upload CV
7. Isi Profil Singkat
8. CV/Profile Extraction
9. Live Voice HRD Interview Stage
10. Speech-to-Text internal
11. Pertanyaan interview adaptif
12. AI evaluation dan weakness detection
13. Clarifying question jika jawaban kurang jelas
14. Interview Readiness Score
15. Result Dashboard
16. Backend API Gateway
17. FastAPI AI Service
18. PostgreSQL Database
19. TensorFlow supporting model
20. Data Science dashboard menggunakan Streamlit

---

### 1.4 Out of Scope MVP

Fitur berikut tidak termasuk MVP dan dapat masuk future development:

1. Job portal dan lowongan kerja real-time.
2. ATS integration dengan perusahaan.
3. CV generator penuh.
4. Live avatar real-time dengan lip sync.
5. Webcam-based emotion atau eye contact analysis.
6. Company-specific interview pack.
7. Mentor marketplace.
8. Payment/subscription system.
9. Export sertifikat readiness.
10. Mobile native app.

---

### 1.5 Definisi Istilah

| Istilah | Definisi |
|---|---|
| User | Pengguna Road2Work.id, seperti mahasiswa, fresh graduate, atau career switcher. |
| Target Role | Role pekerjaan yang dipilih user untuk latihan interview. |
| Role Family | Kategori role, misalnya Data & AI atau Software Engineering. |
| Interview Context | Informasi pengalaman user yang digunakan AI untuk membuat interview lebih personal. |
| CV Extraction | Proses mengambil skill, tools, experience, dan evidence dari CV user. |
| Short Profile | Form singkat yang diisi user sebagai alternatif upload CV. |
| AI HRD | Simulasi interviewer berbasis AI. |
| STT | Speech-to-Text, proses mengubah suara user menjadi teks internal. |
| Clarifying Question | Pertanyaan klarifikasi yang diberikan AI jika jawaban user kurang jelas atau kurang evidence. |
| Evidence Ladder | Sistem level untuk menilai kekuatan bukti pengalaman dalam jawaban user. |
| Readiness Score | Skor akhir kesiapan interview user. |
| GenAI | Generative AI melalui backend service untuk menghasilkan pertanyaan dan feedback natural. |
| TensorFlow Model | Model deep learning pendukung untuk klasifikasi kualitas jawaban. |

---

## 2. Gambaran Umum Sistem

### 2.1 Product Perspective

Road2Work.id adalah aplikasi web berbasis AI yang memiliki beberapa komponen utama:

1. **Frontend Web Application**  
   Menyediakan UI untuk user, termasuk landing page, role selection, interview stage, dan result dashboard.

2. **Backend API Gateway**  
   Mengatur autentikasi, data user, session interview, database, dan komunikasi dengan AI service.

3. **AI Service**  
   Menangani extraction, speech-to-text, generation pertanyaan, evaluasi jawaban, dan scoring.

4. **Database**  
   Menyimpan user, profile, role, interview session, transcript, score, dan result dashboard.

5. **Data Science Layer**  
   Menyediakan role-skill matrix, competency map, question seed, data dictionary, EDA, dan dashboard insight.

---

### 2.2 Product Positioning

Road2Work.id diposisikan sebagai:

> AI-powered interview readiness platform yang membantu user melatih jawaban interview berdasarkan role target dan konteks pengalaman pribadi.

Road2Work.id berbeda dari aplikasi interview biasa karena:

1. Menggunakan konteks dari CV atau profil singkat.
2. Interview dilakukan berbasis voice.
3. AI dapat meminta klarifikasi jika jawaban kurang kuat.
4. Feedback berbasis evidence, bukan sekadar komentar umum.
5. Dashboard memberikan arahan latihan berikutnya.

---

### 2.3 High-Level User Flow

```txt
Landing Page
â†“
Login / Sign Up
â†“
Readiness Hub
â†“
Pilih Role Family
â†“
Pilih Target Role
â†“
Interview Context Setup
â”œâ”€â”€ Upload CV
â””â”€â”€ Isi Profil Singkat
â†“
Extract Skill, Tools, Experience, Evidence
â†“
Generate Initial Evidence Score
â†“
Build Personalized Interview Context
â†“
Interview Onboarding
â†“
Live Voice HRD Interview
â†“
Speech-to-Text Internal
â†“
AI Evaluation + Clarification
â†“
Final Interview Readiness Score
â†“
Result Dashboard
```

---

### 2.4 System Architecture

```txt
User Browser
â†“
Next.js Frontend
â†“
Express.js API Gateway
â†“
FastAPI AI Service
â†“
PostgreSQL Database
```

Komponen pendukung:

1. TensorFlow/Keras model untuk supporting answer quality classification.
2. GenAI API untuk pertanyaan natural, clarification, feedback, dan stronger answer.
3. Speech-to-Text engine untuk memproses jawaban voice.
4. Streamlit dashboard untuk Data Science insight.

---

## 3. User Role dan Stakeholder

### 3.1 User / Kandidat

Pengguna utama aplikasi. User akan memilih target role, memberikan konteks pengalaman, melakukan interview berbasis suara, dan melihat hasil evaluasi.

Kebutuhan utama:

1. Bisa latihan interview secara realistis.
2. Mendapatkan feedback yang jelas.
3. Mengetahui kekuatan dan kelemahan jawaban.
4. Mendapat rekomendasi latihan berikutnya.

---

### 3.2 Admin / Tim Project

Untuk MVP, admin panel penuh belum dibangun. Namun tim project perlu dapat mengelola data melalui backend/database secara teknis.

Kebutuhan utama:

1. Menyediakan data role.
2. Mengelola role-skill matrix.
3. Memantau hasil testing.
4. Menjalankan demo.

---

### 3.3 AI Engineer

Bertanggung jawab pada AI service, STT, evaluasi jawaban, GenAI, TensorFlow model, dan FastAPI.

---

### 3.4 Data Scientist

Bertanggung jawab pada dataset, role-skill matrix, competency map, data cleaning, EDA, dan Streamlit dashboard.

---

### 3.5 Frontend Developer

Bertanggung jawab pada tampilan aplikasi, user flow, interview stage, dan dashboard.

---

### 3.6 Backend Developer

Bertanggung jawab pada API, database, auth, session, integrasi AI service, dan deployment backend.

---

## 4. Kebutuhan Fungsional

Format requirement:

- **FR-XX** = Functional Requirement
- **Prioritas:** High / Medium / Low
- **MVP:** Ya / Tidak

---

## 4.1 Authentication

### FR-01 â€” Sign Up

**Deskripsi:**  
Sistem harus menyediakan fitur sign up agar user dapat membuat akun.

**Input:**

- Nama
- Email
- Password

**Output:**

- Akun user berhasil dibuat.
- User diarahkan ke Readiness Hub atau Login.

**Acceptance Criteria:**

1. User dapat mendaftar menggunakan email dan password.
2. Sistem melakukan validasi input.
3. Password tidak disimpan dalam plain text.
4. Jika email sudah digunakan, sistem menampilkan error.

**Prioritas:** High  
**MVP:** Ya

---

### FR-02 â€” Login

**Deskripsi:**  
Sistem harus menyediakan fitur login agar user dapat masuk ke akun.

**Input:**

- Email
- Password

**Output:**

- User berhasil login.
- Token/session dibuat.
- User diarahkan ke Readiness Hub.

**Acceptance Criteria:**

1. User dapat login dengan credential valid.
2. Credential invalid menampilkan error.
3. Session/token digunakan untuk mengakses fitur protected.

**Prioritas:** High  
**MVP:** Ya

---

### FR-03 â€” Logout

**Deskripsi:**  
Sistem harus menyediakan fitur logout untuk mengakhiri session.

**Acceptance Criteria:**

1. User dapat logout.
2. Token/session dihapus dari client.
3. User kembali ke landing page atau login page.

**Prioritas:** Medium  
**MVP:** Ya

---

## 4.2 Landing Page

### FR-04 â€” Menampilkan Landing Page

**Deskripsi:**  
Sistem harus menampilkan landing page yang menjelaskan value Road2Work.id.

**Konten utama:**

1. Hero section
2. Problem section
3. Solution section
4. How It Works
5. Features
6. Role Coverage
7. Dashboard Preview
8. Team Section
9. FAQ
10. CTA

**Acceptance Criteria:**

1. Landing page dapat diakses tanpa login.
2. CTA mengarahkan ke login/sign up atau start interview.
3. Branding Road2Work.id diterapkan.
4. Tampilan responsive.

**Prioritas:** High  
**MVP:** Ya

---

## 4.3 Readiness Hub

### FR-05 â€” Menampilkan Readiness Hub

**Deskripsi:**  
Setelah login, user melihat halaman Readiness Hub sebagai pusat awal assessment.

**Isi halaman:**

1. Greeting user.
2. Ringkasan proses interview.
3. CTA Start New Interview.
4. History singkat jika tersedia.

**Acceptance Criteria:**

1. User login dapat mengakses Readiness Hub.
2. CTA Start New Interview mengarah ke role selection.
3. Jika user belum pernah interview, tampil empty state.

**Prioritas:** High  
**MVP:** Ya

---

## 4.4 Role Selection

### FR-06 â€” Menampilkan Role Family

**Deskripsi:**  
Sistem harus menampilkan pilihan role family yang tersedia.

**Contoh role family:**

1. Data & AI
2. Software Engineering

**Acceptance Criteria:**

1. Role family tampil dalam bentuk card/selectable UI.
2. User dapat memilih satu role family.
3. Pilihan role family memfilter target role.

**Prioritas:** High  
**MVP:** Ya

---

### FR-07 â€” Menampilkan Target Role

**Deskripsi:**  
Sistem harus menampilkan target role berdasarkan role family yang dipilih.

**Role MVP:**

1. Data Analyst
2. Data Scientist
3. AI Engineer
4. ML Engineer
5. Backend Developer

**Acceptance Criteria:**

1. Target role tampil sesuai role family.
2. User dapat memilih satu target role.
3. Role yang dipilih disimpan untuk interview context.

**Prioritas:** High  
**MVP:** Ya

---

## 4.5 Interview Context Setup

### FR-08 â€” Menampilkan Pilihan Sumber Konteks

**Deskripsi:**  
Sistem harus meminta user memilih salah satu sumber konteks sebelum interview.

**Pilihan:**

1. Upload CV
2. Isi Profil Singkat

**Catatan:**  
Tidak ada opsi â€œlanjut tanpa dataâ€ pada MVP karena sistem membutuhkan minimal konteks user untuk menghasilkan interview yang relevan.

**Acceptance Criteria:**

1. User melihat dua pilihan sumber konteks.
2. User tidak dapat lanjut ke interview tanpa memilih salah satu.
3. Copywriting menjelaskan alasan sistem membutuhkan konteks.

**Prioritas:** High  
**MVP:** Ya

---

### FR-09 â€” Upload CV

**Deskripsi:**  
Sistem harus mengizinkan user mengupload CV dalam format PDF.

**Input:**

- File CV PDF

**Output:**

- File diterima backend.
- CV diproses AI service.
- Skill, tools, experience, dan evidence diekstrak.

**Acceptance Criteria:**

1. User dapat memilih file PDF.
2. Sistem memvalidasi format file.
3. Sistem memvalidasi ukuran file.
4. Sistem menampilkan status upload.
5. Hasil extraction dapat digunakan untuk interview context.

**Prioritas:** High  
**MVP:** Ya

---

### FR-10 â€” Isi Profil Singkat

**Deskripsi:**  
Sistem harus menyediakan form profil singkat sebagai alternatif upload CV.

**Input form:**

1. Pengalaman paling relevan
2. Skill/tools yang pernah digunakan
3. Project/magang/organisasi/freelance
4. Hasil, pencapaian, atau impact

**Output:**

- Profil singkat diproses seperti CV.
- Skill, tools, experience, dan evidence diekstrak.

**Acceptance Criteria:**

1. User dapat mengisi profil singkat.
2. Form memiliki validasi minimum.
3. Data dikirim ke backend/AI service.
4. Hasil extraction digunakan untuk interview context.

**Prioritas:** High  
**MVP:** Ya

---

### FR-11 â€” Extract Skill, Tools, Experience, Evidence

**Deskripsi:**  
Sistem harus mengekstrak informasi utama dari CV atau profil singkat.

**Input:**

- Teks CV atau teks profil singkat

**Output JSON:**

```json
{
  "skills": [],
  "tools": [],
  "experience_summary": "",
  "evidence_items": [],
  "initial_evidence_score": 0
}
```

**Acceptance Criteria:**

1. Sistem dapat memproses CV.
2. Sistem dapat memproses profil singkat.
3. Output minimal berisi skills, tools, experience, dan evidence.
4. Jika extraction gagal, sistem memberikan fallback response.

**Prioritas:** High  
**MVP:** Ya

---

### FR-12 â€” Generate Initial Evidence Score

**Deskripsi:**  
Sistem harus menghasilkan skor awal berdasarkan konteks user sebelum interview.

**Acceptance Criteria:**

1. Skor awal berada dalam range 0â€“100.
2. Skor dihitung berdasarkan jumlah dan kualitas evidence.
3. Skor digunakan sebagai baseline dalam dashboard.

**Prioritas:** Medium  
**MVP:** Ya

---

## 4.6 Interview Onboarding

### FR-13 â€” Menampilkan Interview Onboarding

**Deskripsi:**  
Sebelum interview dimulai, sistem menampilkan penjelasan singkat mengenai sesi interview.

**Isi:**

1. Target role
2. Estimasi durasi
3. Jumlah pertanyaan utama
4. Instruksi menjawab dengan voice
5. Informasi bahwa AI dapat bertanya klarifikasi

**Acceptance Criteria:**

1. User memahami proses interview.
2. User dapat menekan Start Interview.
3. Sistem memastikan interview context sudah tersedia.

**Prioritas:** High  
**MVP:** Ya

---

## 4.7 Live Voice HRD Interview

### FR-14 â€” Menampilkan HRD Interview Stage

**Deskripsi:**  
Sistem harus menampilkan halaman interview utama dengan visual HRD berbasis WebM loop.

**Komponen:**

1. HRD visual/video container
2. Question bubble
3. Mic button
4. Voice recording indicator
5. Progress pertanyaan
6. Timer kecil
7. State label: Asking, Listening, Thinking, Clarifying

**Acceptance Criteria:**

1. HRD visual tampil.
2. Pertanyaan interview tampil jelas.
3. User dapat mulai menjawab dengan voice.
4. State UI berubah sesuai proses interview.

**Prioritas:** High  
**MVP:** Ya

---

### FR-15 â€” Generate Natural Main Question

**Deskripsi:**  
Sistem harus menghasilkan pertanyaan interview utama secara natural menggunakan AI dengan guardrail.

**Input:**

1. Target role
2. Interview context
3. Competency map
4. Question seed
5. Session state

**Output:**

```json
{
  "question_text": "",
  "question_type": "main",
  "competency_target": "",
  "hrd_state": "asking"
}
```

**Acceptance Criteria:**

1. Pertanyaan relevan dengan target role.
2. Pertanyaan tidak berulang.
3. Pertanyaan tidak terlalu generik.
4. Question seed hanya menjadi guardrail, bukan template kaku.

**Prioritas:** High  
**MVP:** Ya

---

### FR-16 â€” Record Voice Answer

**Deskripsi:**  
Sistem harus memungkinkan user menjawab pertanyaan menggunakan suara.

**Acceptance Criteria:**

1. User dapat mengaktifkan microphone.
2. Sistem merekam audio jawaban.
3. Sistem membatasi durasi jawaban.
4. Sistem mengirim audio ke backend.
5. Jika microphone gagal, sistem menampilkan pesan error.

**Prioritas:** High  
**MVP:** Ya

---

### FR-17 â€” Speech-to-Text Internal

**Deskripsi:**  
Sistem harus mengubah audio jawaban user menjadi teks internal.

**Output:**

```json
{
  "transcript_text": "",
  "stt_confidence": 0.0,
  "status": "success"
}
```

**Acceptance Criteria:**

1. Audio dapat ditranskrip menjadi teks.
2. Transcript tidak wajib ditampilkan ke user untuk review manual.
3. Jika audio tidak jelas, sistem dapat memberi status needs_clarification.
4. Audio mentah tidak disimpan permanen kecuali diperlukan untuk debugging terbatas.

**Prioritas:** High  
**MVP:** Ya

---

### FR-18 â€” Evaluate Answer

**Deskripsi:**  
Sistem harus mengevaluasi jawaban user berdasarkan rubric interview readiness.

**Komponen penilaian:**

| Komponen | Bobot |
|---|---:|
| Role Relevance | 25% |
| STAR Structure | 20% |
| Evidence Specificity | 20% |
| Technical Accuracy | 15% |
| Communication Clarity | 10% |
| Self-Awareness | 10% |

**Output JSON:**

```json
{
  "score_breakdown": {
    "role_relevance": 0,
    "star_structure": 0,
    "evidence_specificity": 0,
    "technical_accuracy": 0,
    "communication_clarity": 0,
    "self_awareness": 0
  },
  "answer_score": 0,
  "detected_weaknesses": [],
  "evidence_level": 0,
  "needs_clarification": false,
  "clarification_type": null,
  "feedback": "",
  "stronger_answer": ""
}
```

**Acceptance Criteria:**

1. Setiap jawaban menghasilkan score breakdown.
2. Sistem mendeteksi weakness.
3. Evidence level muncul.
4. Feedback tidak mengarang data user.
5. Output disimpan ke database.

**Prioritas:** High  
**MVP:** Ya

---

### FR-19 â€” Clarifying Question Decision

**Deskripsi:**  
Sistem harus menentukan apakah jawaban user membutuhkan klarifikasi.

**Kondisi clarification:**

1. Jawaban terlalu umum.
2. Evidence lemah.
3. Tools tidak disebutkan.
4. Impact tidak jelas.
5. Kontribusi pribadi belum jelas.
6. Role relevance rendah.
7. Audio/STT kurang jelas.

**Acceptance Criteria:**

1. Sistem menghasilkan `needs_clarification` true/false.
2. Jika true, sistem menentukan `clarification_type`.
3. Clarification dibatasi agar tidak looping tanpa batas.
4. Maksimal clarification per main question dapat dikonfigurasi.

**Prioritas:** High  
**MVP:** Ya

---

### FR-20 â€” Generate Clarifying Question

**Deskripsi:**  
Jika jawaban user membutuhkan klarifikasi, sistem harus menghasilkan pertanyaan klarifikasi yang natural.

**Output:**

```json
{
  "question_text": "Bisa kamu jelaskan tools yang digunakan dan dampak dari project tersebut?",
  "question_type": "clarification",
  "parent_question_id": "",
  "clarification_type": "weak_evidence",
  "hrd_state": "clarifying"
}
```

**Acceptance Criteria:**

1. Pertanyaan klarifikasi sesuai weakness.
2. Pertanyaan tidak terlalu panjang.
3. Pertanyaan tidak memberi jawaban kepada user.
4. Pertanyaan tidak mengarang pengalaman user.
5. Clarification tersimpan sebagai bagian dari session.

**Prioritas:** High  
**MVP:** Ya

---

### FR-21 â€” Continue to Next Main Question

**Deskripsi:**  
Jika jawaban sudah cukup atau setelah clarification selesai, sistem melanjutkan ke pertanyaan utama berikutnya.

**Acceptance Criteria:**

1. Sistem mengetahui jumlah pertanyaan utama yang sudah diberikan.
2. Sistem tidak mengulang pertanyaan yang sama.
3. Sistem memperbarui session state.

**Prioritas:** High  
**MVP:** Ya

---

### FR-22 â€” Complete Interview Session

**Deskripsi:**  
Sistem harus menyelesaikan session interview setelah jumlah pertanyaan utama terpenuhi.

**Acceptance Criteria:**

1. Status session berubah menjadi completed.
2. Final score dihitung.
3. Result dashboard dapat digenerate.

**Prioritas:** High  
**MVP:** Ya

---

## 4.8 Result Dashboard

### FR-23 â€” Generate Final Interview Readiness Score

**Deskripsi:**  
Sistem harus menghitung skor akhir kesiapan interview user.

**Acceptance Criteria:**

1. Skor berada pada range 0â€“100.
2. Skor dihitung dari seluruh jawaban.
3. Skor memiliki status:
   - Ready
   - Almost Ready
   - Needs Practice

**Prioritas:** High  
**MVP:** Ya

---

### FR-24 â€” Menampilkan Strengths

**Deskripsi:**  
Dashboard harus menampilkan kekuatan utama user.

**Isi:**

1. 3 strength utama.
2. Alasan singkat.
3. Bukti dari jawaban user jika tersedia.

**Acceptance Criteria:**

1. Strengths diambil dari skor tertinggi dan detected evidence.
2. Tidak boleh generik tanpa alasan.
3. Ditampilkan dalam card yang mudah dibaca.

**Prioritas:** High  
**MVP:** Ya

---

### FR-25 â€” Menampilkan Improvement Areas

**Deskripsi:**  
Dashboard harus menampilkan area yang perlu diperbaiki user.

**Isi:**

1. 3 weakness utama.
2. Penyebab.
3. Saran perbaikan singkat.

**Acceptance Criteria:**

1. Improvement areas diambil dari skor terendah dan weakness detection.
2. Saran harus actionable.
3. Tidak hanya berupa kritik umum.

**Prioritas:** High  
**MVP:** Ya

---

### FR-26 â€” Menampilkan Beforeâ€“After Answer Improvement

**Deskripsi:**  
Dashboard harus menampilkan perbandingan jawaban awal user dan versi jawaban yang lebih kuat.

**Acceptance Criteria:**

1. Before menggunakan jawaban asli user.
2. After dibuat berdasarkan data yang user sebutkan.
3. AI tidak boleh menambahkan angka, tools, atau hasil yang tidak disebut user.
4. Sistem menjelaskan kenapa versi after lebih baik.

**Prioritas:** High  
**MVP:** Ya

---

### FR-27 â€” Menampilkan Next Practice Recommendation

**Deskripsi:**  
Dashboard harus menampilkan rekomendasi latihan berikutnya berdasarkan kelemahan terbesar.

**Contoh mapping:**

| Weakness | Recommendation |
|---|---|
| STAR lemah | Behavioral STAR Practice |
| Evidence lemah | Evidence Booster Practice |
| Technical detail lemah | Technical Interview Practice |
| Clarity lemah | Answer Clarity Practice |
| Role relevance lemah | Role Understanding Practice |

**Acceptance Criteria:**

1. Rekomendasi sesuai skor terendah.
2. Rekomendasi memiliki alasan.
3. Ada CTA untuk latihan ulang atau next session.

**Prioritas:** High  
**MVP:** Ya

---

### FR-28 â€” Menampilkan Score Breakdown

**Deskripsi:**  
Dashboard harus menampilkan breakdown skor agar user memahami hasilnya.

**Acceptance Criteria:**

1. Score breakdown tampil dalam progress bar/chart/card.
2. Setiap komponen memiliki nilai.
3. Tampilan mudah dipahami.

**Prioritas:** Medium  
**MVP:** Ya

---

## 4.9 Data Science Dashboard

### FR-29 â€” Streamlit Insight Dashboard

**Deskripsi:**  
Tim Data Science harus menyediakan dashboard Streamlit untuk insight internal/project evaluation.

**Isi dashboard:**

1. Distribusi role.
2. Skill gap.
3. Evidence level.
4. Readiness score.
5. Weakness paling sering muncul.
6. Business question result.

**Acceptance Criteria:**

1. Dashboard dapat dijalankan lokal.
2. Data dictionary tersedia.
3. Minimal 3 business question dijawab.
4. Visualisasi dapat dipakai untuk presentasi.

**Prioritas:** Medium  
**MVP:** Ya

---

## 5. Kebutuhan Non-Fungsional

## 5.1 Performance Requirements

### NFR-01 â€” Response Time UI

Halaman utama harus dapat dimuat dalam waktu yang wajar.

**Target:**

1. Landing page load < 3 detik pada koneksi normal.
2. Interaksi UI tidak terasa berat.
3. HRD WebM harus dikompres agar tidak memperlambat halaman.

---

### NFR-02 â€” AI Response Time

AI evaluation dan next question generation harus memberikan feedback dalam waktu yang masih nyaman.

**Target MVP:**

1. STT selesai dalam 5â€“15 detik tergantung durasi audio.
2. Evaluasi jawaban selesai dalam 5â€“15 detik.
3. UI menampilkan state â€œThinkingâ€ saat proses berlangsung.

---

### NFR-03 â€” File Upload Limit

Sistem harus membatasi file upload untuk menjaga performa.

**Target:**

1. Format CV: PDF.
2. Maksimal ukuran file: disesuaikan backend, rekomendasi 2â€“5 MB untuk MVP.
3. Audio jawaban dibatasi durasi dan ukuran.

---

## 5.2 Security Requirements

### NFR-04 â€” Password Security

Password user tidak boleh disimpan dalam plain text.

**Requirement:**

1. Password harus di-hash.
2. Credential tidak boleh muncul di response API.

---

### NFR-05 â€” API Key Security

API key untuk GenAI/STT tidak boleh disimpan di frontend atau repository publik.

**Requirement:**

1. API key disimpan di environment variable.
2. Tidak ada secret di GitHub.
3. Backend/AI service menjadi perantara request.

---

### NFR-06 â€” CV dan Audio Privacy

Sistem harus menjaga privasi file user.

**Requirement:**

1. Audio mentah tidak disimpan permanen kecuali diperlukan.
2. CV digunakan untuk extraction dan metadata.
3. User diberi informasi bahwa data digunakan untuk personalisasi interview.
4. Sistem menyediakan alternatif profil singkat jika user tidak ingin upload CV.

---

## 5.3 Usability Requirements

### NFR-07 â€” Simplicity

Setiap halaman harus memiliki satu keputusan utama.

**Prinsip UX:**

1. 1 screen = 1 decision.
2. 1 card = 1 insight.
3. 1 page = 1 primary CTA.

---

### NFR-08 â€” Voice Interview Usability

User harus memahami bahwa interview dilakukan dengan suara.

**Requirement:**

1. Terdapat instruksi microphone.
2. Ada state Listening saat user menjawab.
3. Ada error message jika microphone gagal.
4. Ada onboarding sebelum interview.

---

## 5.4 Reliability Requirements

### NFR-09 â€” Error Handling

Sistem harus menangani error dengan jelas.

**Contoh error:**

1. Upload CV gagal.
2. STT gagal.
3. AI service timeout.
4. Backend gagal menyimpan session.
5. GenAI API gagal.

**Requirement:**

1. User menerima pesan error yang jelas.
2. Backend mencatat error log.
3. Sistem memiliki fallback response jika AI gagal.

---

### NFR-10 â€” Fallback Demo

Untuk kebutuhan capstone, sistem harus memiliki strategi fallback demo.

**Fallback:**

1. Dummy data.
2. Local demo.
3. Predefined AI response.
4. Video backup demo.

---

## 5.5 Maintainability Requirements

### NFR-11 â€” Code Structure

Project harus memiliki struktur folder yang rapi.

**Frontend:**

```txt
app/
components/
services/
hooks/
types/
lib/
```

**Backend:**

```txt
routes/
controllers/
services/
middlewares/
db/
types/
```

**AI Service:**

```txt
app/routes/
app/services/
app/models/
app/schemas/
app/utils/
```

---

## 6. External Interface Requirements

## 6.1 User Interface

### UI-01 â€” Landing Page

Harus menampilkan copywriting produk dan CTA utama.

### UI-02 â€” Role Selection

Harus menggunakan card/selectable UI yang mudah dipahami.

### UI-03 â€” Interview Context Setup

Harus menampilkan dua pilihan: Upload CV dan Isi Profil Singkat.

### UI-04 â€” HRD Interview Stage

Harus menampilkan HRD WebM visual, question bubble, mic button, dan state indicator.

### UI-05 â€” Result Dashboard

Harus menampilkan score dan 4 komponen hasil utama.

---

## 6.2 API Interface

### Frontend ke Express API

```txt
POST   /api/v1/auth/signup
POST   /api/v1/auth/login
GET    /api/v1/roles
POST   /api/v1/profiles
GET    /api/v1/profiles/:profileId
POST   /api/v1/profiles/:profileId/cv
POST   /api/v1/profiles/:profileId/context
POST   /api/v1/interviews/sessions
GET    /api/v1/interviews/sessions/:sessionId
POST   /api/v1/interviews/sessions/:sessionId/voice-answer
GET    /api/v1/interviews/sessions/:sessionId/result
```

---

### Express API ke FastAPI AI Service

```txt
POST /v1/context/extract-cv
POST /v1/context/extract-profile
POST /v1/interview/next-question
POST /v1/interview/evaluate-answer
POST /v1/stt/transcribe
POST /v1/model/predict-answer-quality
```

---

## 6.3 Hardware Interface

Sistem membutuhkan akses microphone browser untuk fitur voice interview.

**Requirement:**

1. Browser meminta permission microphone.
2. Sistem menangani jika permission ditolak.
3. Sistem menampilkan error jika perangkat tidak mendukung audio recording.

---

## 6.4 Software Interface

Sistem menggunakan software/service berikut:

| Komponen | Teknologi |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| API Client | Axios / TanStack Query |
| Backend | Express.js, TypeScript |
| Database | PostgreSQL, Drizzle ORM |
| AI Service | FastAPI, Python |
| Model | TensorFlow/Keras |
| GenAI | OpenAI Responses API |
| STT | Whisper/faster-whisper/browser STT/API STT |
| DS Dashboard | Streamlit |
| Deployment FE | Vercel / Netlify |
| Deployment BE/AI | Render / Railway |

---

## 7. Data Requirements

## 7.1 Database Entities

### 7.1.1 Users

| Field | Type | Description |
|---|---|---|
| id | UUID / serial | User ID |
| name | string | Nama user |
| email | string | Email user |
| password_hash | string | Password hasil hash |
| created_at | timestamp | Waktu dibuat |

---

### 7.1.2 Profiles

| Field | Type | Description |
|---|---|---|
| id | UUID / serial | Profile ID |
| user_id | FK | Relasi ke user |
| target_role_id | FK | Role yang dipilih |
| context_source | enum | cv / short_profile |
| profile_summary | text | Ringkasan profil |
| created_at | timestamp | Waktu dibuat |

---

### 7.1.3 Roles

| Field | Type | Description |
|---|---|---|
| id | UUID / serial | Role ID |
| role_family | string | Kategori role |
| role_name | string | Nama target role |
| description | text | Deskripsi role |

---

### 7.1.4 Role Skills

| Field | Type | Description |
|---|---|---|
| id | UUID / serial | Skill ID |
| role_id | FK | Relasi ke role |
| skill_name | string | Nama skill |
| skill_type | string | core/tool/soft/domain |
| importance_level | int | Level pentingnya skill |

---

### 7.1.5 Interview Sessions

| Field | Type | Description |
|---|---|---|
| id | UUID / serial | Session ID |
| user_id | FK | Relasi ke user |
| profile_id | FK | Relasi ke profile |
| role_id | FK | Relasi ke role |
| status | enum | active/completed/cancelled |
| question_index | int | Index pertanyaan utama |
| total_main_questions | int | Total pertanyaan utama |
| clarification_count | int | Jumlah clarification |
| current_hrd_state | string | asking/listening/thinking/clarifying |
| created_at | timestamp | Waktu mulai |
| completed_at | timestamp | Waktu selesai |

---

### 7.1.6 Interview Answers

| Field | Type | Description |
|---|---|---|
| id | UUID / serial | Answer ID |
| session_id | FK | Relasi ke interview session |
| parent_question_id | nullable | Untuk clarification |
| question_type | enum | main/clarification |
| question_text | text | Pertanyaan |
| transcript_text | text | Transcript hasil STT |
| stt_confidence | float | Confidence STT |
| score_breakdown | json | Skor komponen |
| answer_score | int | Skor jawaban |
| evidence_level | int | Level Evidence Ladder |
| detected_weaknesses | json | Daftar weakness |
| clarification_type | string | Tipe clarification |
| feedback | text | Feedback AI |
| stronger_answer | text | Jawaban versi lebih kuat |
| created_at | timestamp | Waktu jawaban |

---

### 7.1.7 Interview Results

| Field | Type | Description |
|---|---|---|
| id | UUID / serial | Result ID |
| session_id | FK | Relasi ke session |
| final_score | int | Skor akhir |
| readiness_status | string | Ready/Almost Ready/Needs Practice |
| strengths | json | Strengths |
| improvement_areas | json | Improvement areas |
| before_after_improvement | json | Before-after answer |
| next_practice_recommendation | json | Rekomendasi latihan |
| created_at | timestamp | Waktu dibuat |

---

## 8. AI Requirements

## 8.1 AI Question Generation

AI harus dapat menghasilkan pertanyaan interview natural berdasarkan:

1. Target role
2. Role-skill matrix
3. Competency map
4. Question seed
5. User context
6. Jawaban sebelumnya
7. Weakness history

AI tidak boleh menghasilkan pertanyaan yang tidak relevan dengan role atau terlalu umum tanpa tujuan.

---

## 8.2 Clarification Decision Engine

Sistem harus mendeteksi apakah jawaban butuh klarifikasi.

**Decision logic MVP:**

```txt
Jika evidence_specificity < threshold â†’ weak_evidence
Jika technical_accuracy < threshold â†’ technical_detail
Jika role_relevance < threshold â†’ role_relevance
Jika STAR structure rendah â†’ star_structure
Jika STT confidence rendah â†’ unclear_audio
```

---

## 8.3 GenAI Guardrail

Prompt GenAI harus memiliki batasan:

1. Jangan mengarang pengalaman user.
2. Jangan menambahkan angka jika user tidak menyebutkan angka.
3. Jangan menambahkan tools jika user tidak menyebutkan tools.
4. Gunakan hanya fakta dari CV/profil/jawaban user.
5. Jika data kurang, beri saran untuk menambahkan data.
6. Output harus ringkas dan actionable.

---

## 8.4 TensorFlow Supporting Model

Model TensorFlow digunakan untuk memenuhi kebutuhan AI dan memberikan supporting quality score.

### Input Model

Opsi input:

1. Text jawaban user.
2. Fitur manual seperti:
   - jumlah kata
   - ada/tidaknya tools
   - ada/tidaknya impact
   - ada/tidaknya angka
   - indikator STAR
   - jumlah skill yang muncul

### Output Model

Opsi output:

1. Weak
2. Average
3. Strong

atau supporting score 0â€“100.

### Requirement Model

1. Menggunakan TensorFlow Functional API atau Model Subclassing.
2. Memiliki Custom Callback / Custom Loss / Custom Layer.
3. Diekspor ke `.keras` atau `SavedModel`.
4. Memiliki inference code.
5. Dapat dipanggil melalui FastAPI.

---

## 9. Business Rules

### BR-01 â€” User Tidak Bisa Interview Tanpa Konteks

User wajib memilih upload CV atau isi profil singkat sebelum interview.

### BR-02 â€” Interview Menggunakan Voice Sebagai Mode Utama

Text answer tidak menjadi flow utama pada MVP.

### BR-03 â€” Clarification Dibatasi

Clarification maksimal harus dibatasi agar interview tidak looping.

Rekomendasi:

1. Maksimal 1 clarification per main question.
2. Maksimal 3 clarification per session.

### BR-04 â€” AI Tidak Boleh Mengarang Data

Feedback dan stronger answer harus berdasarkan data user.

### BR-05 â€” Dashboard Harus Punya Alasan

Setiap score/feedback harus memiliki alasan agar tidak terlihat seperti angka kosong.

### BR-06 â€” GenAI Bukan Satu-Satunya Scoring Source

Scoring harus menggunakan hybrid approach:

1. Rule-based scoring
2. Role-skill matrix
3. Evidence Ladder
4. TensorFlow supporting model
5. GenAI wording

---

## 10. Use Case Specification

## UC-01 â€” User Sign Up

**Actor:** User  
**Precondition:** User belum memiliki akun  
**Main Flow:**

1. User membuka halaman Sign Up.
2. User mengisi nama, email, dan password.
3. Sistem memvalidasi input.
4. Sistem membuat akun.
5. User diarahkan ke Readiness Hub.

**Alternative Flow:**

- Jika email sudah terdaftar, sistem menampilkan pesan error.

---

## UC-02 â€” User Memilih Target Role

**Actor:** User  
**Precondition:** User sudah login  
**Main Flow:**

1. User membuka Readiness Hub.
2. User menekan Start New Interview.
3. Sistem menampilkan role family.
4. User memilih role family.
5. Sistem menampilkan target role.
6. User memilih target role.
7. Sistem menyimpan target role.

---

## UC-03 â€” User Upload CV

**Actor:** User  
**Precondition:** User sudah memilih target role  
**Main Flow:**

1. User memilih Upload CV.
2. User mengupload file PDF.
3. Sistem memvalidasi file.
4. Backend mengirim file ke AI service.
5. AI mengekstrak skill, tools, experience, evidence.
6. Sistem membangun interview context.

**Alternative Flow:**

- Jika file tidak valid, sistem menampilkan error.

---

## UC-04 â€” User Isi Profil Singkat

**Actor:** User  
**Precondition:** User sudah memilih target role  
**Main Flow:**

1. User memilih Isi Profil Singkat.
2. User mengisi form pengalaman, skill, project, dan impact.
3. Sistem memvalidasi form.
4. AI mengekstrak skill, tools, experience, evidence.
5. Sistem membangun interview context.

---

## UC-05 â€” User Menjalani Live Voice Interview

**Actor:** User  
**Precondition:** Interview context sudah tersedia  
**Main Flow:**

1. User masuk Interview Onboarding.
2. User menekan Start Interview.
3. Sistem menampilkan HRD Interview Stage.
4. AI menghasilkan pertanyaan utama.
5. User menjawab dengan voice.
6. Sistem melakukan STT.
7. AI mengevaluasi jawaban.
8. Jika perlu, AI bertanya klarifikasi.
9. User menjawab klarifikasi.
10. Sistem melanjutkan ke pertanyaan berikutnya.
11. Interview selesai setelah semua pertanyaan utama diberikan.

---

## UC-06 â€” User Melihat Result Dashboard

**Actor:** User  
**Precondition:** Interview session selesai  
**Main Flow:**

1. Sistem menghitung final readiness score.
2. Sistem membuat strengths.
3. Sistem membuat improvement areas.
4. Sistem membuat before-after answer improvement.
5. Sistem membuat next practice recommendation.
6. User melihat dashboard.

---

## 11. Testing Requirements

## 11.1 Functional Testing

Test case utama:

1. User dapat sign up.
2. User dapat login.
3. User dapat memilih role.
4. User dapat upload CV.
5. User dapat isi profil singkat.
6. AI dapat extract context.
7. User dapat memulai interview.
8. User dapat menjawab dengan voice.
9. STT menghasilkan transcript.
10. AI menghasilkan evaluasi.
11. AI menghasilkan clarification.
12. Dashboard tampil setelah interview selesai.

---

## 11.2 Integration Testing

Komponen yang harus diuji:

1. Frontend ke Backend.
2. Backend ke PostgreSQL.
3. Backend ke FastAPI.
4. FastAPI ke TensorFlow model.
5. FastAPI ke GenAI API.
6. Frontend menerima result dashboard.

---

## 11.3 User Acceptance Testing

Minimal skenario:

1. User memilih Data Analyst dan upload CV.
2. User memilih Backend Developer dan isi profil singkat.
3. User memberikan jawaban lemah agar clarification muncul.
4. User menyelesaikan interview sampai dashboard.

---

## 12. Deployment Requirements

### 12.1 Frontend Deployment

Rekomendasi:

1. Vercel
2. Netlify

Requirement:

1. Environment variable base API URL tersedia.
2. Build sukses.
3. Landing page dan flow utama dapat diakses publik.

---

### 12.2 Backend Deployment

Rekomendasi:

1. Render
2. Railway

Requirement:

1. Express API live.
2. CORS dikonfigurasi.
3. PostgreSQL terkoneksi.
4. Environment variable aman.

---

### 12.3 AI Service Deployment

Rekomendasi:

1. Render
2. Railway
3. Local fallback untuk demo

Requirement:

1. FastAPI live.
2. Model dapat diload.
3. Endpoint STT, evaluation, dan next-question tersedia.
4. Cold start dipertimbangkan.

---

### 12.4 Streamlit Dashboard Deployment

Rekomendasi:

1. Streamlit Cloud
2. Local demo

---

## 13. Risk and Mitigation

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Scope terlalu luas | Project tidak selesai | Fokus pada MVP interview-first |
| STT lambat/berat | Interview terganggu | Gunakan fallback atau browser/API STT |
| GenAI output generik | Feedback kurang bernilai | Gunakan rubric dan guardrail |
| AI hallucination | Feedback tidak valid | Prompt strict dan validasi data user |
| TensorFlow model kurang akurat | Scoring lemah | Jadikan supporting score, bukan source utama |
| Integrasi terlambat | Demo gagal | API contract dan mock data sejak awal |
| Deployment bermasalah | Tidak bisa demo | Siapkan local mode dan video backup |
| CV/audio privacy | Risiko kepercayaan user | Batasi penyimpanan data dan beri consent copy |

---

## 14. Requirement Prioritization

### P0 â€” Wajib Ada

1. Auth basic
2. Role selection
3. Upload CV / isi profil singkat
4. Context extraction
5. HRD Interview Stage
6. Voice answer
7. STT
8. AI evaluation
9. Clarifying question
10. Result dashboard
11. Backend API
12. Database

### P1 â€” Penting

1. TensorFlow supporting model
2. Evidence Ladder
3. Beforeâ€“After Answer Improvement
4. Streamlit dashboard
5. Deployment staging

### P2 â€” Bonus

1. Interview history
2. Export result
3. Advanced CV insight
4. Multiple interview persona
5. Company-specific question pack

---

## 15. Acceptance Criteria MVP

MVP Road2Work.id dianggap berhasil jika:

1. User dapat membuka landing page.
2. User dapat login/sign up.
3. User dapat memilih target role.
4. User dapat memilih upload CV atau isi profil singkat.
5. Sistem dapat mengekstrak skill, tools, experience, dan evidence.
6. User dapat masuk ke interview onboarding.
7. User dapat memulai live voice interview.
8. AI dapat menghasilkan pertanyaan utama.
9. User dapat menjawab dengan voice.
10. Sistem dapat melakukan speech-to-text.
11. Sistem dapat mengevaluasi jawaban.
12. Sistem dapat menghasilkan clarifying question jika jawaban kurang jelas.
13. Sistem dapat menyelesaikan interview.
14. Sistem dapat menampilkan result dashboard.
15. Dashboard berisi strengths, improvement areas, before-after answer improvement, dan next practice recommendation.
16. Project dapat dijalankan lokal atau staging.
17. Dokumentasi README tersedia.

---

## 16. Pembagian Tanggung Jawab Berdasarkan SRS

### Project Manager / Product Experience Lead

Tanggung jawab:

1. Menjaga scope MVP.
2. Menyusun flow aplikasi.
3. Mengelola GitHub Kanban Board.
4. Menentukan prioritas P0/P1/P2.
5. Menyiapkan demo scenario.
6. Menjaga agar fitur tidak melebar.

Deliverable:

1. Activity diagram.
2. Product flow.
3. Sprint roadmap.
4. SRS.
5. Demo script.

---

### Frontend Lead / Frontend Developer

Tanggung jawab:

1. Landing Page.
2. Login/Sign Up UI.
3. Readiness Hub.
4. Role Selection.
5. Interview Context Setup.
6. HRD Interview Stage.
7. Voice recording UI.
8. Result Dashboard.
9. API integration.
10. Responsive design.

Deliverable:

1. Next.js frontend.
2. Reusable components.
3. UI sesuai brand guideline.
4. Integrasi dengan backend.

---

### Backend Developer

Tanggung jawab:

1. Express API.
2. Auth endpoint.
3. User endpoint.
4. Profile endpoint.
5. Interview session endpoint.
6. Voice answer endpoint.
7. Result endpoint.
8. PostgreSQL schema.
9. Integrasi FastAPI.
10. Deployment backend.

Deliverable:

1. RESTful API.
2. Database schema.
3. API documentation.
4. Backend deployment.

---

### AI Engineer

Tanggung jawab:

1. FastAPI service.
2. CV/Profile extraction.
3. STT.
4. Interview state machine.
5. Question generation.
6. Clarifying question engine.
7. Answer evaluation.
8. Evidence Ladder.
9. GenAI integration.
10. TensorFlow model.

Deliverable:

1. AI service endpoint.
2. TensorFlow model.
3. Inference script.
4. Evaluation output JSON.

---

### Data Scientist

Tanggung jawab:

1. Dataset resume.
2. Data cleaning.
3. Role-skill matrix.
4. Skill taxonomy.
5. Competency map.
6. Question seed.
7. Weakness taxonomy.
8. Fit score logic.
9. EDA.
10. Streamlit dashboard.

Deliverable:

1. Cleaned dataset.
2. Data dictionary.
3. Role-skill matrix.
4. EDA notebook.
5. Dashboard DS.

---

### QA / Tester

Tanggung jawab:

1. End-to-end testing.
2. Functional testing.
3. Integration testing.
4. Bug reporting.
5. Demo readiness testing.

Deliverable:

1. Test checklist.
2. Bug report.
3. Final testing notes.

---

## 17. Future Enhancement

Fitur yang dapat dikembangkan setelah MVP:

1. History interview user.
2. Practice mode berdasarkan interview type.
3. HR interview, technical interview, behavioral interview mode.
4. Export dashboard result.
5. CV improvement insight lebih detail.
6. Personalized learning path.
7. Company-specific interview pack.
8. Integration dengan job portal.
9. Mentor feedback.
10. Live avatar AI lebih realistis.

---

## 18. Kesimpulan

Road2Work.id adalah platform AI Interview Readiness yang memiliki fokus jelas pada latihan interview berbasis role target, konteks pengalaman user, voice interview, AI evaluation, dan evidence-based feedback.

SRS ini mendefinisikan bahwa MVP Road2Work.id harus fokus pada alur inti:

```txt
Role Selection
â†“
Upload CV / Isi Profil Singkat
â†“
Extract Context
â†“
Live Voice Interview
â†“
AI Evaluation + Clarification
â†“
Result Dashboard
```

Dengan scope ini, Road2Work.id tetap realistis untuk dikembangkan sebagai capstone project, tetapi cukup kuat secara inovasi karena menghadirkan adaptive AI HRD interview, voice-based practice, Evidence Ladder, dan dashboard feedback yang actionable.

Dokumen ini menjadi acuan utama untuk pengembangan, integrasi, testing, deployment, dan presentasi akhir project Road2Work.id.


