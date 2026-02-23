export interface AnalyticsStat {
  label: string
  value: number
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
}

export interface TimeSeriesPoint {
  date: string
  value: number
}

export interface TopItem {
  id: number
  name: string
  value: number
  extra?: string
}

export type AnalyticsTab = 'story-performance' | 'creator-metrics' | 'reader-activity' | 'top-tags'
