# Backend Integration V2.3

Frontend memakai satu API client di `libs/api.ts` dan service per domain di folder `services`.

## Environment

Buat `.env.local` dari `.env.example`.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_USE_MOCK_API=false
```

Gunakan mock hanya untuk demo tanpa backend:

```env
NEXT_PUBLIC_USE_MOCK_API=true
```

## Endpoint Utama

- Auth: `POST /auth/signup`, `POST /auth/login`, `GET /auth/me`, `POST /auth/refresh`
- Role: `GET /roles`, `GET /roles/:roleId`
- Profile: `POST /profiles/cv`, `POST /profiles/manual`, `GET /profiles/:profileId`, `PATCH /profiles/:profileId`
- Role fit: `POST /role-fit/generate-ranking`, `POST /role-fit/score`, `POST /role-fit/confirm`
- Interview: `POST /interviews/sessions`, `POST /interviews/sessions/:sessionId/voice-answer`, `GET /interviews/sessions/:sessionId/result`
- Dashboard: `GET /dashboard`, `POST /dashboard/refresh`
- Admin: `GET /admin/users`, `GET /admin/analytics`

## Catatan Integrasi

- Token disimpan sebagai `token`; `refreshToken` ikut disimpan jika backend mengirim.
- `GET /auth/me` mengikuti backend V2.3. Frontend masih punya fallback ke `/me` bila service lama belum dipindah.
- Role dari backend dinormalisasi agar komponen bisa memakai `roleName`, walaupun backend mengirim field `name`.
- Role fit menerima response `recommendations` atau `recommendedRoles`, lalu dinormalisasi ke `recommendations`.
- Profile memakai endpoint V2.3 lebih dulu. Jika backend masih memakai flow lama, frontend fallback ke `POST /profiles` lalu `POST /profiles/:profileId/cv` atau `POST /profiles/:profileId/context`.
- Saat interview selesai, dashboard refresh memakai `{ profileId }` sesuai contract V2.3.
