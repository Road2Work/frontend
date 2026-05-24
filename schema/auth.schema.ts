import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type LoginPayload = LoginFormValues

export const registerSchema = z
  .object({
    full_name: z.string({ error: 'Nama lengkap wajib diisi' }).trim().min(2, 'Nama minimal 2 karakter'),
    email: z.string({ error: 'Email wajib diisi' }).trim().email('Format email tidak valid'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string({ error: 'Konfirmasi password wajib diisi' }).min(1),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Konfirmasi password tidak cocok',
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
export type RegisterPayload = Omit<RegisterFormValues, 'confirmPassword'>
