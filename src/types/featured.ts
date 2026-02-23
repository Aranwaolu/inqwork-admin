export interface FeaturedItem {
  id: number
  storyId: number
  storyTitle: string
  tagline: string
  bannerImageUrl: string | null
  position: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateFeaturedDto {
  storyId: number
  tagline: string
  bannerImage?: File
}

export interface UpdateFeaturedDto {
  tagline?: string
  position?: number
  active?: boolean
  bannerImage?: File
}
