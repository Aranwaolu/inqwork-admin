import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { setAccessTokenForAxios } from '@/api'
import authService from '@/api/auth'
import type { AuthUser } from '@/types/user'

interface AuthContextType {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  loading: boolean
  logout: () => void
  fetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const hasFetchedRef = useRef(false)

  const fetchUser = useCallback(async () => {
    try {
      const response = await authService.getMe()
      setUser(response.data)
      localStorage.setItem('inqwork-user', JSON.stringify(response.data))
    } catch {
      // If API fails, try restoring user from localStorage (supports dummy login)
      const storedUser = localStorage.getItem('inqwork-user')
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
          return
        } catch {
          /* invalid JSON, fall through */
        }
      }
      localStorage.removeItem('inqwork-token')
      localStorage.removeItem('inqwork-user')
      setAccessTokenForAxios(null)
      setAccessTokenState(null)
      setUser(null)
      hasFetchedRef.current = false
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem('inqwork-token')

      if (storedToken && !hasFetchedRef.current) {
        hasFetchedRef.current = true
        setAccessTokenForAxios(storedToken)
        setAccessTokenState(storedToken)
        await fetchUser()
      }

      setLoading(false)
    }

    init()
  }, [fetchUser])

  const logout = async () => {
    try {
      await authService.logout()
    } catch {
      // Proceed with local cleanup even if server logout fails
    }
    localStorage.removeItem('inqwork-token')
    localStorage.removeItem('inqwork-user')
    setAccessTokenState(null)
    setAccessTokenForAxios(null)
    setUser(null)
    hasFetchedRef.current = false
  }

  const setAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('inqwork-token', token)
      setAccessTokenForAxios(token)
      setAccessTokenState(token)
      hasFetchedRef.current = true
    } else {
      logout()
    }
  }

  const persistUser = (u: AuthUser | null) => {
    setUser(u)
    if (u) {
      localStorage.setItem('inqwork-user', JSON.stringify(u))
    } else {
      localStorage.removeItem('inqwork-user')
    }
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser: persistUser, loading, logout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
