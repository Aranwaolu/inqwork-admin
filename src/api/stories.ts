import axiosInstance from '@/api'
import type { PaginatedData, RequestQueryParams } from '@/types/api'
import type { Story, Episode } from '@/types/story'

const storiesService = {
  getAll(params?: RequestQueryParams) {
    return axiosInstance.get<PaginatedData<Story>>('/admin/stories', { params })
  },

  getById(id: number) {
    return axiosInstance.get<Story>(`/admin/stories/${id}`)
  },

  getEpisodes(storyId: number) {
    return axiosInstance.get<Episode[]>(`/admin/stories/${storyId}/episodes`)
  },

  updateStatus(id: number, status: string) {
    return axiosInstance.patch(`/admin/stories/${id}/status`, { status })
  },

  remove(id: number) {
    return axiosInstance.delete(`/admin/stories/${id}`)
  },

  upload(formData: FormData) {
    return axiosInstance.post<Story>('/admin/stories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

export default storiesService
