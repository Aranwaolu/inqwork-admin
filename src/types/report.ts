export type ReportStatus = 'PENDING' | 'REVIEWED' | 'DISMISSED' | 'ACTION_TAKEN'
export type ReportReason = 'SPAM' | 'INAPPROPRIATE' | 'COPYRIGHT' | 'HARASSMENT' | 'OTHER'

export interface Report {
  id: number
  storyId: number
  storyTitle: string
  reportedById: number
  reportedByName: string
  reason: ReportReason
  description: string
  status: ReportStatus
  createdAt: string
  updatedAt: string
}

export interface ReportHistoryEntry {
  id: number
  action: string
  performedBy: string
  note: string | null
  createdAt: string
}

export interface ReportDetail extends Report {
  history: ReportHistoryEntry[]
}
