import axiosInstance from '@/api'
import type { PaginatedData } from '@/types/api'
import type {
  FeaturedPlacement,
  CreateFeaturedDto,
  UpdateFeaturedDto,
  PlacementType,
} from '@/types/featured'

export interface FeaturedQueryParams {
  placementType?: PlacementType
  isActive?: boolean
  storyId?: number
  pageNo?: number
  pageSize?: number
}

const featuredService = {
  getAll(params?: FeaturedQueryParams) {
    return axiosInstance.get<PaginatedData<FeaturedPlacement>>(
      '/featured-placements',
      { params },
    )
  },

  getById(id: number) {
    return axiosInstance.get<FeaturedPlacement>(`/featured-placements/${id}`)
  },

  create(data: CreateFeaturedDto) {
    return axiosInstance.post<FeaturedPlacement>('/featured-placements', data)
  },

  update(id: number, data: UpdateFeaturedDto) {
    return axiosInstance.patch<FeaturedPlacement>(
      `/featured-placements/${id}`,
      data,
    )
  },

  remove(id: number) {
    return axiosInstance.delete(`/featured-placements/${id}`)
  },
}

export default featuredService
