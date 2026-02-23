import axiosInstance from '@/api'
import type { AnalyticsStat, TimeSeriesPoint, TopItem } from '@/types/analytics'

const analyticsService = {
  getDashboardStats() {
    return axiosInstance.get<AnalyticsStat[]>('/admin/analytics/dashboard')
  },

  getUserGrowth() {
    return axiosInstance.get<TimeSeriesPoint[]>('/admin/analytics/user-growth')
  },

  getContentByType() {
    return axiosInstance.get<{ type: string; count: number }[]>('/admin/analytics/content-by-type')
  },

  getStoryPerformance() {
    return axiosInstance.get<TopItem[]>('/admin/analytics/story-performance')
  },

  getCreatorMetrics() {
    return axiosInstance.get<TopItem[]>('/admin/analytics/creator-metrics')
  },

  getReaderActivity() {
    return axiosInstance.get<TimeSeriesPoint[]>('/admin/analytics/reader-activity')
  },

  getTopTags() {
    return axiosInstance.get<TopItem[]>('/admin/analytics/top-tags')
  },
}

export default analyticsService
