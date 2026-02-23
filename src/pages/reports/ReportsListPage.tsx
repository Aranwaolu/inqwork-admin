import { useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import SearchBar from '@/components/ui/SearchBar'
import Select from '@/components/ui/Select'
import DataTable, { type Column } from '@/components/common/DataTable'
import Pagination from '@/components/common/Pagination'
import Badge from '@/components/ui/Badge'
import type { Report } from '@/types/report'
import type { PageMetadata } from '@/types/api'
import { REPORT_STATUSES, REPORT_REASONS } from '@/utils/constants'
import { formatDate } from '@/utils/format'

const statusOptions = [
  { label: 'All Statuses', value: '' },
  ...REPORT_STATUSES.map((s) => ({ label: s.replace('_', ' '), value: s })),
]
const reasonOptions = [{ label: 'All Reasons', value: '' }, ...REPORT_REASONS.map((r) => ({ label: r, value: r }))]

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  PENDING: 'warning',
  REVIEWED: 'info',
  DISMISSED: 'default',
  ACTION_TAKEN: 'success',
}

const reasonVariant: Record<string, 'default' | 'error' | 'warning' | 'info'> = {
  SPAM: 'default',
  INAPPROPRIATE: 'error',
  COPYRIGHT: 'warning',
  HARASSMENT: 'error',
  OTHER: 'info',
}

const columns: Column<Report>[] = [
  {
    key: 'storyTitle',
    label: 'Story',
    sortable: true,
    render: (row) => <span className="font-medium text-gray-900">{row.storyTitle}</span>,
  },
  { key: 'reportedByName', label: 'Reported By' },
  {
    key: 'reason',
    label: 'Reason',
    render: (row) => <Badge variant={reasonVariant[row.reason]}>{row.reason}</Badge>,
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge variant={statusVariant[row.status]}>{row.status.replace('_', ' ')}</Badge>,
  },
  { key: 'createdAt', label: 'Created', sortable: true, render: (row) => formatDate(row.createdAt) },
]

const emptyPage: PageMetadata = { totalElements: 0, lastPage: 1, currentPage: 1, perPage: 10, prev: null, next: null }

export default function ReportsListPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [_search, setSearch] = useState(searchParams.get('q') || '')

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value)
      setSearchParams((prev) => {
        if (value) prev.set('q', value)
        else prev.delete('q')
        return prev
      })
    },
    [setSearchParams]
  )

  const isLoading = true
  const data: Report[] = []

  return (
    <div>
      <PageHeader title="Content Reports" subtitle="Review and manage user-submitted reports" />

      <div className="flex items-center gap-3 mb-5">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search reports..."
          defaultValue={searchParams.get('q') || ''}
          width={320}
        />
        <Select
          options={statusOptions}
          value={searchParams.get('status') || ''}
          onChange={(v) =>
            setSearchParams((prev) => {
              if (v) prev.set('status', v)
              else prev.delete('status')
              return prev
            })
          }
          placeholder="All Statuses"
        />
        <Select
          options={reasonOptions}
          value={searchParams.get('reason') || ''}
          onChange={(v) =>
            setSearchParams((prev) => {
              if (v) prev.set('reason', v)
              else prev.delete('reason')
              return prev
            })
          }
          placeholder="All Reasons"
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/reports/${row.id}`)}
        emptyTitle="No reports found"
        emptyDescription="Content reports will appear here when users submit them."
        emptyIcon="flag"
      />

      {!isLoading && data.length > 0 && <Pagination page={emptyPage} onPageChange={() => {}} />}
    </div>
  )
}
