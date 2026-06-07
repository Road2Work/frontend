import { AppError, http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { LoginPayload, RegisterPayload } from '@/schema/auth.schema'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import { useMockApi } from '@/services/api-mode'
import type { LoginPayload as ContractLoginPayload, SignupPayload, User } from '@/types/api-contract'

export type LoginAuthResponse = {
  success: true
  message: string
  data: {
    user: User
    accessToken: string
    refreshToken?: string
  }
}

export type SignupAuthResponse = {
  success: true
  message: string
  data: {
    user: User
    accessToken?: string
    refreshToken?: string
    requiresEmailVerification?: boolean
  }
}

export type AuthResponse = LoginAuthResponse | SignupAuthResponse

export const authService = {
  signup(payload: SignupPayload) {
    if (useMockApi) return mockRoad2WorkApi.signup(payload)
    return http.post<SignupAuthResponse, SignupPayload>(endpoints.auth.signup, payload)
  },

  register(payload: RegisterPayload) {
    const signupPayload = {
      name: payload.full_name,
      email: payload.email,
      password: payload.password,
    }

    return this.signup(signupPayload)
  },

  login(payload: LoginPayload | ContractLoginPayload) {
    if (useMockApi) return mockRoad2WorkApi.login(payload)
    return http.post<LoginAuthResponse, ContractLoginPayload>(endpoints.auth.login, payload)
  },

  me() {
    if (useMockApi) return mockRoad2WorkApi.me()
    return http
      .get<{ success: true; message: string; data: { user: User } }>(endpoints.auth.me)
      .catch(error => {
        if (error instanceof AppError && error.status === 404) {
          return http.get<{ success: true; message: string; data: { user: User } }>(endpoints.auth.meLegacy)
        }

        throw error
      })
  },

  exchangeOauthCode(code: string) {
    return http.post<LoginAuthResponse, { code: string }>(endpoints.auth.oauthExchange, { code })
  },

  verifyEmail(email: string, otp: string) {
    return http.post<{ success: true; message: string; data: { user: User } }, { email: string; otp: string }>(
      endpoints.auth.verifyEmail,
      { email, otp },
    )
  },

  resendVerification(email: string) {
    return http.post<{ success: true; message: string; data: { sent?: boolean; alreadyVerified?: boolean } }, { email: string }>(
      endpoints.auth.resendVerification,
      { email },
    )
  },

  googleUrl() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1'
    return `${baseUrl}${endpoints.auth.google}`
  },

  refresh(refreshToken?: string) {
    if (useMockApi) return mockRoad2WorkApi.me()

    return http.post<LoginAuthResponse, { refreshToken?: string }>(endpoints.auth.refresh, {
      refreshToken,
    })
  },
}

