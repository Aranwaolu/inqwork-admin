export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface Ticket {
  id: number
  subject: string
  status: TicketStatus
  priority: TicketPriority
  createdById: number
  createdByName: string
  assignedToId: number | null
  assignedToName: string | null
  createdAt: string
  updatedAt: string
}

export interface TicketMessage {
  id: number
  ticketId: number
  senderId: number
  senderName: string
  senderRole: string
  content: string
  createdAt: string
}

export interface TicketDetail extends Ticket {
  messages: TicketMessage[]
}
