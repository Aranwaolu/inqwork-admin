import type { Story } from '@/types/story'

export type PlacementType = 'HOMEPAGE_BANNER' | 'EDITOR_PICK' | 'CATEGORY_HIGHLIGHT'

export interface FeaturedPlacement {
  id: number
  storyId: number
  placementType: PlacementType
  placementKey: string | null
  sortOrder: number
  startsAt: string | null
  endsAt: string | null
  campaignName: string | null
  campaignMeta: object | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  story: Story
}

export interface CreateFeaturedDto {
  storyId: number
  placementType: PlacementType
  placementKey?: string
  sortOrder?: number
  startsAt?: string
  endsAt?: string
  campaignName?: string
  campaignMeta?: object
  isActive?: boolean
}

export type UpdateFeaturedDto = Partial<CreateFeaturedDto>
