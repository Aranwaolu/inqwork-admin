import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import DashboardLayout from '@/layouts/DashboardLayout'
import AuthLayout from '@/layouts/AuthLayout'
import AdminGuard from '@/providers/AdminGuard'

import LoginPage from '@/pages/auth/LoginPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import StoriesListPage from '@/pages/stories/StoriesListPage'
import StoryDetailPage from '@/pages/stories/StoryDetailPage'
import StoryUploadPage from '@/pages/stories/StoryUploadPage'
import UsersPage from '@/pages/users/UsersPage'
import FeaturedPage from '@/pages/featured/FeaturedPage'
import TicketsListPage from '@/pages/tickets/TicketsListPage'
import TicketDetailPage from '@/pages/tickets/TicketDetailPage'
import ReportsListPage from '@/pages/reports/ReportsListPage'
import ReportDetailPage from '@/pages/reports/ReportDetailPage'
import AnalyticsPage from '@/pages/analytics/AnalyticsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<AdminGuard />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/stories" element={<StoriesListPage />} />
            <Route path="/stories/upload" element={<StoryUploadPage />} />
            <Route path="/stories/:id" element={<StoryDetailPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/featured" element={<FeaturedPage />} />
            <Route path="/tickets" element={<TicketsListPage />} />
            <Route path="/tickets/:id" element={<TicketDetailPage />} />
            <Route path="/reports" element={<ReportsListPage />} />
            <Route path="/reports/:id" element={<ReportDetailPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontSize: '1.4rem' },
        }}
      />
    </BrowserRouter>
  )
}
