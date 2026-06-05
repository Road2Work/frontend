# Road2Work.id Local Setup After Clone

Panduan ini dipakai setelah project Road2Work.id di-clone ke mesin baru. Arsitektur lokal terdiri dari tiga service utama:

- `frontend` - Next.js web app
- `backend` - Node.js API service
- `machine-learning` - FastAPI AI service

Data Science asset yang dipakai AI service berada di `machine-learning/data`.

## 1. Prasyarat

Install dulu:

- Node.js 20+
- npm
- Python 3.11+
- PostgreSQL 15+
- Git

Opsional tapi disarankan:

- VS Code
- Postman/Thunder Client
- pgAdmin atau DBeaver

## 2. Struktur Folder yang Disarankan

```text
Final Apps/
  frontend/
  backend/
  machine-learning/
    data/
      01_raw/
      02_interim/
      03_processed/
```

Pastikan folder `machine-learning/data` ikut tersedia setelah clone karena file JSON/CSV di dalamnya dipakai untuk role taxonomy, scoring rubric, question seed, dan model answer quality.

## 3. Setup PostgreSQL Lokal

Buat database lokal:

```bash
createdb -h localhost -p 5432 -U postgres road2work_local
```

Jika password PostgreSQL lokal berbeda, sesuaikan nilai `PGPASSWORD` di `backend/.env`.

## 4. Setup Backend

Masuk ke folder backend:

```bash
cd backend
npm install
copy .env.example .env
```

Isi minimal `.env`:

```env
NODE_ENV=development
HOST=localhost
PORT=5000

PGHOST=localhost
PGPORT=5432
PGDATABASE=road2work_local
PGUSER=postgres
PGPASSWORD=isi_password_postgres_lokal
PGSSLMODE=disable

ACCESS_TOKEN_KEY=change_this_access_secret
REFRESH_TOKEN_KEY=change_this_refresh_secret
ACCESS_TOKEN_AGE=180
REFRESH_TOKEN_AGE=10080

ML_SERVICE_URL=http://localhost:8000
```

Jalankan migration/seed sesuai script backend yang tersedia di `package.json`, lalu jalankan server:

```bash
npm run dev
```

Backend default berjalan di:

```text
http://localhost:5000/api/v1
```

Untuk akun admin lokal, gunakan seed backend atau update role user test menjadi `admin` di database lokal. Jangan commit kredensial admin nyata ke repository.

## 5. Setup Machine Learning Service

Masuk ke folder machine-learning:

```bash
cd machine-learning
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Isi minimal `.env`:

```env
OPENAI_API_KEY=isi_openai_api_key_lokal
OPENAI_MODEL=gpt-5.4-mini
OPENAI_MAX_OUTPUT_TOKENS=2048
GENAI_MAX_RETRIES=3

DS_RESOURCES_DIR=./data
DS_RAW_DIR=./data/01_raw
DS_PROCESSED_DIR=./data/03_processed
DS_INTERIM_DIR=./data/02_interim
DS_ASSET_AUTO_RELOAD=true
```

Jalankan AI service:

```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Jika port 8000 sedang dipakai, pakai 8001:

```bash
uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```

Lalu ubah `backend/.env`:

```env
ML_SERVICE_URL=http://localhost:8001
```

Cek service:

```text
http://127.0.0.1:8000/docs
```

## 6. Setup Frontend

Masuk ke folder frontend:

```bash
cd frontend
npm install
copy .env.example .env.local
```

Isi `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_USE_MOCK_API=false
```

Jalankan frontend:

```bash
npm run dev
```

Frontend default berjalan di:

```text
http://localhost:3000
```

## 7. Urutan Run Lokal

Jalankan service dengan urutan ini:

1. PostgreSQL
2. Machine Learning service
3. Backend API
4. Frontend

Flow lokal yang harus dites:

1. Signup/Login
2. Build Profile melalui Upload CV atau Isi Profil Manual
3. Profile Review
4. Role Fit Ranking
5. Interview Setup
6. Adaptive Interview
7. Result
8. Career Readiness Dashboard
9. Admin Panel

## 8. Git Ignore dan File yang Tidak Boleh Dicommmit

Jangan commit file berikut:

- `.env`, `.env.local`, `.env.production`
- `node_modules/`
- `.next/`
- `.venv/`
- `uploads/`
- `__pycache__/`
- model binary hasil training seperti `.keras`, `.h5`, `.pb`
- file audio temporary seperti `.wav`, `.webm`, `.mp3`

File yang boleh dicommit:

- `.env.example`
- source code
- asset public yang memang dibutuhkan app
- dataset kecil di `machine-learning/data` yang dibutuhkan runtime

Jika file besar sudah terlanjur tracked Git, `.gitignore` tidak otomatis menghapusnya dari Git index. Bersihkan dari index dengan hati-hati:

```bash
git rm -r --cached node_modules .next .venv uploads
```

Lalu commit perubahan `.gitignore`.

## 9. Production Notes

Untuk production frontend:

```env
NEXT_PUBLIC_API_URL=https://api.road2work.id/api/v1
NEXT_PUBLIC_USE_MOCK_API=false
```

Backend production harus mengizinkan CORS origin frontend, contoh:

```text
https://www.road2work.id
https://road2work.id
```

Jika request memakai cookie/credentials, backend tidak boleh memakai `Access-Control-Allow-Origin: *`.
