import type { ApiSuccess, User } from '@/types/api-contract'

export type AuthParticipant = User

export type IRegisterResponse = ApiSuccess<{
  user: User
  accessToken: string
}>

export type ILoginResponse = ApiSuccess<{
  user: User
  accessToken: string
}>
