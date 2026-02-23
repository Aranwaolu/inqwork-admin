import { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '@/context/AuthContext'
import { useSidebar } from '@/context/SidebarContext'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'
import { SIDEBAR_WIDTH_EXPANDED, SIDEBAR_WIDTH_COLLAPSED, TOPBAR_HEIGHT } from '@/utils/constants'

export default function TopBar() {
  const { user, logout } = useAuth()
  const { collapsed } = useSidebar()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, right: 0 })

  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const sidebarWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right,
      })
    }
  }, [])

  const toggleDropdown = useCallback(() => {
    if (!dropdownOpen) updatePosition()
    setDropdownOpen((prev) => !prev)
  }, [dropdownOpen, updatePosition])

  // Close on outside click
  useEffect(() => {
    if (!dropdownOpen) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if (dropdownRef.current?.contains(target)) return
      setDropdownOpen(false)
    }

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick)
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [dropdownOpen])

  // Close on Escape
  useEffect(() => {
    if (!dropdownOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false)
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [dropdownOpen])

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center justify-between bg-white transition-all duration-300"
      style={{
        left: sidebarWidth,
        height: TOPBAR_HEIGHT,
        paddingLeft: 32,
        paddingRight: 32,
        boxShadow: '4px 4px 4px 0px #8282821a',
      }}
    >
      <div>
        <p className="text-base font-semibold text-gray-900">
          Welcome back, {user?.displayName?.split(' ')[0] || 'Admin'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition">
          <GoogleMaterialIcon name="notifications" size={22} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Avatar dropdown trigger */}
        <button
          ref={triggerRef}
          onClick={toggleDropdown}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-brand text-sm font-bold">
            {user?.displayName?.charAt(0).toUpperCase() || 'A'}
          </div>
          <GoogleMaterialIcon
            name="expand_more"
            size={18}
            className="text-gray-400"
            style={{ transition: 'transform 0.2s ease', transform: dropdownOpen ? 'rotate(180deg)' : undefined }}
          />
        </button>

        {/* Avatar dropdown — portaled */}
        {dropdownOpen &&
          createPortal(
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: position.top,
                right: position.right,
                width: 192,
                zIndex: 9999,
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '8px 16px', borderBottom: '1px solid #f3f4f6' }}>
                <p className="text-sm font-medium text-gray-900 truncate">{user?.displayName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <div
                role="button"
                onClick={() => {
                  setDropdownOpen(false)
                  logout()
                }}
                className="flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                style={{ padding: '10px 16px' }}
              >
                <GoogleMaterialIcon name="logout" size={18} />
                Sign out
              </div>
            </div>,
            document.body
          )}
      </div>
    </header>
  )
}
