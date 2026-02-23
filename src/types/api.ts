import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

export interface ApiResponse<T> {
  status: string
  code: number
  message: string
  data: T
}

export interface PageMetadata {
  totalElements: number
  lastPage: number
  currentPage: number
  perPage: number
  prev: number | null
  next: number | null
}

export interface PaginatedData<T> {
  content: T[]
  page: PageMetadata
}

export interface RequestQueryParams {
  pageNo?: number
  pageSize?: number
  sortBy?: {
    field: string
    direction: 'ASC' | 'DESC'
  }
  [key: string]: string | number | boolean | undefined | object
}

export type AxiosWrappedError<T = unknown> = AxiosError<ApiResponse<T>>

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
  _skipAuthRedirect?: boolean
}
