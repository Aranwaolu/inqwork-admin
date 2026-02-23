import axiosInstance from '@/api'
import type { PaginatedData, RequestQueryParams } from '@/types/api'
import type { Ticket, TicketDetail } from '@/types/ticket'

const ticketsService = {
  getAll(params?: RequestQueryParams) {
    return axiosInstance.get<PaginatedData<Ticket>>('/admin/tickets', { params })
  },

  getById(id: number) {
    return axiosInstance.get<TicketDetail>(`/admin/tickets/${id}`)
  },

  update(id: number, data: { status?: string; priority?: string; assignedToId?: number | null }) {
    return axiosInstance.patch(`/admin/tickets/${id}`, data)
  },

  reply(id: number, content: string) {
    return axiosInstance.post(`/admin/tickets/${id}/reply`, { content })
  },
}

export default ticketsService
