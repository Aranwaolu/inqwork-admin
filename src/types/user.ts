export type UserRole = 'ADMIN' | 'READER' | 'CREATOR'

export interface User {
  id: number
  email: string
  displayName: string
  role: UserRole
  emailVerified: boolean
  avatarUrl: string | null
  bio: string | null
  lastActiveAt: string | null
  createdAt: string
}

export interface AuthUser {
  id: number
  email: string
  displayName: string
  role: UserRole
  emailVerified: boolean
  avatarUrl: string | null
  bio: string | null
}
