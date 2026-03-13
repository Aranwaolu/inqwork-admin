import axiosInstance from '@/api'
import type { PaginatedData } from '@/types/api'

export interface Tag {
  id: number
  type: string
  name: string
  slug: string
}

export interface TagQueryParams {
  type?: string
  q?: string
  pageNo?: number
  pageSize?: number
}

export interface CreateTagDto {
  type: string
  name: string
  slug?: string
}

const tagsService = {
  getAll(params?: TagQueryParams) {
    return axiosInstance.get<PaginatedData<Tag>>('/tags', { params })
  },

  getGenres() {
    return axiosInstance.get<Tag[]>('/tags/genres')
  },

  create(tags: CreateTagDto[]) {
    return axiosInstance.post<Tag[]>('/tags', { tags })
  },
}

export default tagsService
