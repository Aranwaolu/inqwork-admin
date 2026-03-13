import axiosInstance from '@/api'

export type MediaPurpose = 'COVER' | 'EPISODE' | 'BANNER'

export interface MediaUploadResult {
  secureUrl: string
  publicId: string
  thumbnailUrl?: string
}

const mediaService = {
  upload(file: File, purpose: MediaPurpose) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('purpose', purpose)
    return axiosInstance.post<MediaUploadResult>('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

export default mediaService
