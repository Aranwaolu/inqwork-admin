import axiosInstance from '@/api'
import type { PaginatedData, RequestQueryParams } from '@/types/api'
import type { Report, ReportDetail } from '@/types/report'

const reportsService = {
  getAll(params?: RequestQueryParams) {
    return axiosInstance.get<PaginatedData<Report>>('/admin/reports', { params })
  },

  getById(id: number) {
    return axiosInstance.get<ReportDetail>(`/admin/reports/${id}`)
  },

  takeAction(id: number, action: string, note?: string) {
    return axiosInstance.post(`/admin/reports/${id}/action`, { action, note })
  },
}

export default reportsService
