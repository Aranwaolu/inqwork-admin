import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import { useSidebar } from '@/context/SidebarContext'
import { SIDEBAR_WIDTH_EXPANDED, SIDEBAR_WIDTH_COLLAPSED, TOPBAR_HEIGHT } from '@/utils/constants'

export default function DashboardLayout() {
  const { collapsed } = useSidebar()
  const sidebarWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <TopBar />
      <main
        className="transition-all duration-300"
        style={{
          marginLeft: sidebarWidth,
          paddingTop: TOPBAR_HEIGHT + 24,
          paddingLeft: 32,
          paddingRight: 32,
          paddingBottom: 24,
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}
