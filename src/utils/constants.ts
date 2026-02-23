import type { NavItem } from '@/types/nav'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: 'dashboard' },
  { label: 'Stories', path: '/stories', icon: 'auto_stories' },
  { label: 'Users', path: '/users', icon: 'group' },
  { label: 'Featured', path: '/featured', icon: 'star' },
  { label: 'Tickets', path: '/tickets', icon: 'support_agent' },
  { label: 'Reports', path: '/reports', icon: 'flag' },
  { label: 'Analytics', path: '/analytics', icon: 'analytics' },
]

export const SIDEBAR_WIDTH_EXPANDED = 260
export const SIDEBAR_WIDTH_COLLAPSED = 77
export const TOPBAR_HEIGHT = 64

export const STORY_TYPES = ['NOVEL', 'COMIC', 'SHORT_STORY'] as const
export const STORY_STATUSES = ['DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'REJECTED', 'ARCHIVED'] as const
export const STORY_GENRES = [
  'Fantasy',
  'Sci-Fi',
  'Romance',
  'Mystery',
  'Thriller',
  'Horror',
  'Drama',
  'Comedy',
  'Action',
  'Adventure',
  'Slice of Life',
  'Historical',
] as const

export const TICKET_STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const
export const TICKET_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const

export const REPORT_STATUSES = ['PENDING', 'REVIEWED', 'DISMISSED', 'ACTION_TAKEN'] as const
export const REPORT_REASONS = ['SPAM', 'INAPPROPRIATE', 'COPYRIGHT', 'HARASSMENT', 'OTHER'] as const

export const USER_ROLES = ['ADMIN', 'READER', 'CREATOR'] as const
