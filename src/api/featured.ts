import axiosInstance from '@/api'
import type { FeaturedItem } from '@/types/featured'

const featuredService = {
  getAll() {
    return axiosInstance.get<FeaturedItem[]>('/admin/featured')
  },

  create(formData: FormData) {
    return axiosInstance.post<FeaturedItem>('/admin/featured', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  update(id: number, formData: FormData) {
    return axiosInstance.patch<FeaturedItem>(`/admin/featured/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  reorder(id: number, position: number) {
    return axiosInstance.patch(`/admin/featured/${id}/reorder`, { position })
  },

  remove(id: number) {
    return axiosInstance.delete(`/admin/featured/${id}`)
  },
}

export default featuredService
