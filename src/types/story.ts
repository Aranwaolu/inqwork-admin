export type StoryFormat = 'NOVEL' | 'SHORT_STORY' | 'POEM' | 'COMIC'
export type StoryStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'
export type PublishingState = 'ONGOING' | 'COMPLETED' | 'HIATUS' | 'CANCELLED'
export type ContentRating = 'EVERYONE' | 'TEEN' | 'MATURE'

export interface StoryCreator {
  id: number
  displayName: string
  avatarUrl: string | null
}

export interface StoryTag {
  id: number
  type: string
  name: string
  slug: string
}

export interface Story {
  id: number
  slug: string
  title: string
  description: string | null
  coverImageUrl: string | null
  thumbnailImageUrl: string | null
  creator: StoryCreator | null
  format: StoryFormat
  language: string
  status: StoryStatus
  contentRating: ContentRating
  primaryGenre: string | null
  secondaryGenres: string[]
  publishingState: PublishingState
  tags: StoryTag[]
  episodesCount: number
  publishedEpisodesCount: number
  lastPublishedAt: string | null
  bookmarkCount: number
  viewer: object | null
}

export type EpisodeStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED'

export interface Episode {
  id: number
  storyId: number
  episodeNumber: number
  title: string
  body: string | null
  status: EpisodeStatus
  contentRating: string
  isFree: boolean
  publishedAt: string | null
  scheduledPublishAt: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateStoryPayload {
  title: string
  slug: string
  description?: string
  format: StoryFormat
  primaryGenre?: string
  coverImageUrl?: string
  thumbnailImageUrl?: string
  language?: string
  secondaryGenres?: string[]
  publishingState?: PublishingState
  contentRating?: ContentRating
}

export type UpdateStoryPayload = Partial<CreateStoryPayload>

export interface UpdateStoryTagsPayload {
  tagIds?: number[]
  tags?: { type: string; slug: string; name?: string }[]
}
