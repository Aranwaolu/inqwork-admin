import { useLocation, Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { useSidebar } from '@/context/SidebarContext'
import { useAuth } from '@/context/AuthContext'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'
import Badge from '@/components/ui/Badge'
import { NAV_ITEMS, SIDEBAR_WIDTH_EXPANDED, SIDEBAR_WIDTH_COLLAPSED } from '@/utils/constants'

export default function Sidebar() {
  const { collapsed, toggle } = useSidebar()
  const { user, logout } = useAuth()
  const location = useLocation()

  const width = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-card-border bg-white transition-all duration-300"
      style={{ width }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-card-border px-5 shrink-0">
        <img src="/logo-icon.png" alt="InqWork" className="h-9 w-9 shrink-0 object-contain" />
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-base font-bold text-gray-900 whitespace-nowrap">InqWork</p>
            <p className="text-xs text-gray-400 -mt-0.5">Admin</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <SimpleBar className="flex-1" style={{ height: 'calc(100vh - 64px)' }} autoHide>
        <nav className="py-2">
          <ul>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path)
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    className="group relative flex items-center gap-4 text-sm font-normal transition-all duration-200"
                    style={{
                      height: 41,
                      padding: collapsed ? '10px 30px' : '10px 21px',
                      backgroundColor: active ? '#f3eefe' : undefined,
                      borderRight: `2px solid ${active ? '#5e17eb' : 'transparent'}`,
                      color: active ? '#5e17eb' : '#4b5563',
                      cursor: active ? 'default' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = '#faf8ff'
                        e.currentTarget.style.borderRight = '2px solid #c4b5fd'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = ''
                        e.currentTarget.style.borderRight = '2px solid transparent'
                      }
                    }}
                  >
                    <GoogleMaterialIcon name={item.icon} size={22} fill={active} className="shrink-0" />
                    {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}

                    {/* Tooltip on collapsed */}
                    {collapsed && (
                      <div className="pointer-events-none absolute left-full ml-3 hidden rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg group-hover:block whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </SimpleBar>

      {/* User section (expanded) */}
      {!collapsed && user && (
        <div className="border-t border-card-border p-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand text-sm font-bold">
              {user.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.displayName}</p>
              <Badge variant="brand" className="mt-0.5">
                {user.role}
              </Badge>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-3 flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
          >
            <GoogleMaterialIcon name="logout" size={18} />
            Sign out
          </button>
        </div>
      )}

      {/* Collapsed: just logout icon */}
      {collapsed && user && (
        <div className="border-t border-card-border p-3 flex flex-col items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-brand text-sm font-bold">
            {user.displayName.charAt(0).toUpperCase()}
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition"
          >
            <GoogleMaterialIcon name="logout" size={18} />
          </button>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={toggle}
        className="absolute -right-3.5 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition"
        style={{ top: 28 }}
      >
        <GoogleMaterialIcon name={collapsed ? 'chevron_right' : 'chevron_left'} size={16} className="text-gray-500" />
      </button>
    </aside>
  )
}
