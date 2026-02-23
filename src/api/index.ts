import type { ApiResponse, AxiosWrappedError, CustomAxiosRequestConfig } from '@/types/api'
import axios, { type AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

let currentAccessToken: string | null = null

export const setAccessTokenForAxios = (token: string | null) => {
  currentAccessToken = token
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8020/api',
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  if (currentAccessToken) {
    config.headers['X-InqWork-Token'] = currentAccessToken
  }
  return config
})

axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => {
    if (response.data && typeof response.data === 'object' && 'status' in response.data) {
      return {
        ...response,
        data: response.data.data,
      }
    }
    return response
  },
  async (error: AxiosWrappedError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest._skipAuthRedirect) {
      originalRequest._retry = true

      toast.error('Session expired. Please log in again.')

      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }

    if (error.response?.data?.status === 'failure') {
      toast.error(error.response.data.message || 'An unexpected error occurred.')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
