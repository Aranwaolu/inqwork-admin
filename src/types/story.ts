export type StoryType = 'NOVEL' | 'COMIC' | 'SHORT_STORY'
export type StoryStatus = 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED'

export interface Story {
  id: number
  title: string
  synopsis: string
  type: StoryType
  status: StoryStatus
  genre: string
  tags: string[]
  coverImageUrl: string | null
  authorId: number
  authorName: string
  viewCount: number
  episodeCount: number
  createdAt: string
  updatedAt: string
}

export interface Episode {
  id: number
  storyId: number
  title: string
  number: number
  status: StoryStatus
  createdAt: string
}

export interface StoryUploadDto {
  title: string
  type: StoryType
  genre: string
  synopsis: string
  tags: string[]
  coverImage?: File
}
