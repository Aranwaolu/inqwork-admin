import axiosInstance from '@/api'
import type { PaginatedData } from '@/types/api'
import type {
  Story,
  Episode,
  CreateStoryPayload,
  UpdateStoryPayload,
  UpdateStoryTagsPayload,
} from '@/types/story'

export interface StoryQueryParams {
  q?: string
  format?: string
  status?: string
  genre?: string
  sort?: string
  pageNo?: number
  pageSize?: number
}

const storiesService = {
  getAll(params?: StoryQueryParams) {
    return axiosInstance.get<PaginatedData<Story>>('/stories', { params })
  },

  getBySlug(slug: string) {
    return axiosInstance.get<Story>(`/stories/${slug}`)
  },

  create(data: CreateStoryPayload) {
    return axiosInstance.post<Story>('/stories', data)
  },

  update(slug: string, data: UpdateStoryPayload) {
    return axiosInstance.patch<Story>(`/stories/${slug}`, data)
  },

  publish(slug: string) {
    return axiosInstance.post(`/stories/${slug}/publish`)
  },

  schedule(slug: string, scheduledFor: string) {
    return axiosInstance.post(`/stories/${slug}/schedule`, { scheduledFor })
  },

  archive(slug: string) {
    return axiosInstance.post(`/stories/${slug}/archive`)
  },

  updateTags(slug: string, data: UpdateStoryTagsPayload) {
    return axiosInstance.put(`/stories/${slug}/tags`, data)
  },

  getEpisodes(slug: string, params?: { pageNo?: number; pageSize?: number }) {
    return axiosInstance.get<PaginatedData<Episode>>(
      `/stories/${slug}/episodes`,
      { params },
    )
  },
}

export default storiesService
