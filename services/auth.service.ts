import { AppError, http } from '@/lib/api'
import { endpoints } from '@/lib/endpoints'
import { LoginPayload, RegisterPayload } from '@/schema/auth.schema'
import { mockRoad2WorkApi } from '@/services/mock-road2work-api'
import { useMockApi } from '@/services/api-mode'
import type { LoginPayload as ContractLoginPayload, SignupPayload, User } from '@/types/api-contract'

export type AuthResponse = {
  success: true
  message: string
  data: {
    user: User
    accessToken: string
    refreshToken?: string
  }
}

export const authService = {
  signup(payload: SignupPayload) {
    if (useMockApi) return mockRoad2WorkApi.signup(payload)
    return http.post<AuthResponse, SignupPayload>(endpoints.auth.signup, payload)
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
    return http.post<AuthResponse, ContractLoginPayload>(endpoints.auth.login, payload)
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

  refresh(refreshToken?: string) {
    if (useMockApi) return mockRoad2WorkApi.me()

    return http.post<AuthResponse, { refreshToken?: string }>(endpoints.auth.refresh, {
      refreshToken,
    })
  },
}
