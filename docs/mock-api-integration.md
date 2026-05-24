# Mock API Integration Road2Work.id

Dokumen ini menjelaskan integrasi frontend berdasarkan `docs/Api-contract-road2work-id.docx`.

## Mode API

Frontend memakai mock API secara default agar development tidak perlu menunggu backend.

```env
NEXT_PUBLIC_USE_MOCK_API=true
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Jika `NEXT_PUBLIC_USE_MOCK_API` tidak diisi, aplikasi tetap memakai mock. Untuk pindah ke backend asli:

```env
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## Struktur Integrasi

- `types/api-contract.ts`: tipe response, entity, dan payload sesuai API contract.
- `libs/endpoint.ts`: daftar endpoint `/api/v1` tanpa hardcode di komponen.
- `libs/api.ts`: axios client untuk backend asli, termasuk bearer token dari `localStorage`.
- `services/mock-road2work-api.ts`: mock backend in-memory dengan shape response contract.
- `services/*.service.ts`: facade service yang memilih mock atau HTTP berdasarkan env.

## Mapping Endpoint

- Auth: `POST /auth/signup`, `POST /auth/login`, `GET /auth/me`
- Roles: `GET /roles`, `GET /roles/:roleId`
- Profiles: `POST /profiles`, `GET /profiles/:profileId`, `POST /profiles/:profileId/cv`, `POST /profiles/:profileId/context`
- Interview: `POST /interviews/sessions`, `GET /interviews/sessions/:sessionId`, `POST /interviews/sessions/:sessionId/voice-answer`, `PATCH /interviews/sessions/:sessionId/cancel`
- Result: `GET /interviews/sessions/:sessionId/result`, `GET /interviews/history`

## Flow Halaman

1. Login/Signup memanggil `authService`, menyimpan `accessToken` dan `user`.
2. Role Selection membuat profile lewat `profileService.createProfile`.
3. Interview Setup mengirim CV atau profil singkat lewat `profileService`.
4. Onboarding membuat session interview lewat `interviewService.createSession`.
5. Interview mengirim jawaban audio mock lewat `interviewService.submitVoiceAnswer`.
6. Results mengambil dashboard lewat `resultService.getResult`.

## Session Storage Keys

- `road2work:selected-role-id`
- `road2work:selected-role-name`
- `road2work:profile-id`
- `road2work:profile-context-source`
- `road2work:session-id`
- `road2work:current-question-id`
- `road2work:current-question-text`
- `road2work:result-id`

## Catatan Integrasi Backend

Saat backend siap, samakan response dengan bentuk standar:

```ts
{
  success: true,
  message: string,
  data: object
}
```

Untuk error:

```ts
{
  success: false,
  message: string,
  error: {
    code: string,
    details: unknown
  }
}
```

Frontend hanya perlu mengubah env ke `NEXT_PUBLIC_USE_MOCK_API=false`. Komponen tidak perlu diubah selama contract response backend tetap sama.
