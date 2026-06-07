import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService, type SignupAuthResponse } from '@/services/auth.service'
import type { RegisterPayload } from '@/schema/auth.schema'

export const useLoginMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: data => {
      localStorage.setItem('token', data.data.accessToken)
      const refreshToken = 'refreshToken' in data.data ? data.data.refreshToken : undefined
      if (typeof refreshToken === 'string' && refreshToken) localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(data.data.user))

      document.cookie = `token=${data.data.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      document.cookie = `userRole=${data.data.user.role ?? 'user'}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`

      router.push(data.data.user.role === 'admin' ? '/admin' : '/hub')
    },
    onError: (error: Error) => {
      console.error(error)
    },
  })
}

export const useRegisterMutation = () => {
  const router = useRouter()

  return useMutation<SignupAuthResponse, Error, RegisterPayload>({
    mutationFn: authService.register,
    onSuccess: data => {
      const requiresEmailVerification = 'requiresEmailVerification' in data.data && data.data.requiresEmailVerification

      if (!data.data.accessToken || requiresEmailVerification) {
        router.push(`/verify-email?sent=1&email=${encodeURIComponent(data.data.user.email)}`)
        return
      }

      localStorage.setItem('token', data.data.accessToken)
      const refreshToken = 'refreshToken' in data.data ? data.data.refreshToken : undefined
      if (typeof refreshToken === 'string' && refreshToken) localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      document.cookie = `token=${data.data.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      document.cookie = `userRole=${data.data.user.role ?? 'user'}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      router.push('/hub')
    },
    onError: (error: Error) => {
      console.error(error)
    },
  })
}


