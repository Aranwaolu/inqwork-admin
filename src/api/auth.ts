import axiosInstance from '@/api'
import type { CustomAxiosRequestConfig } from '@/types/api'
import type { AuthUser } from '@/types/user'

export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  accessExpiresInMs: number
  refreshExpiresInMs: number
  user: AuthUser
}

const authService = {
  login(dto: LoginDto) {
    return axiosInstance.post<AuthResponse>('/auth/login', dto)
  },

  refresh() {
    return axiosInstance.post<AuthResponse>('/auth/refresh')
  },

  logout() {
    return axiosInstance.post('/auth/logout')
  },

  getMe() {
    return axiosInstance.get<AuthUser>('/auth/me', {
      _skipAuthRedirect: true,
    } as CustomAxiosRequestConfig)
  },
}

export default authService
