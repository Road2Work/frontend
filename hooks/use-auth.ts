import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'

export const useLoginMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: data => {
      localStorage.setItem('token', data.data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.data.user))

      // Also set cookie so Next.js middleware can read it for route protection
      document.cookie = `token=${data.data.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`

      router.push('/')
    },
    onError: (error: Error) => {
      console.error(error)
    },
  })
}

export const useRegisterMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: authService.register,
    onSuccess: data => {
      localStorage.setItem('token', data.data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      document.cookie = `token=${data.data.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      router.push('/hub')
    },
    onError: (error: Error) => {
      console.error(error)
    },
  })
}
