import { useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import SearchBar from '@/components/ui/SearchBar'
import Select from '@/components/ui/Select'
import DataTable, { type Column } from '@/components/common/DataTable'
import Pagination from '@/components/common/Pagination'
import Badge from '@/components/ui/Badge'
import type { Ticket } from '@/types/ticket'
import type { PageMetadata } from '@/types/api'
import { TICKET_STATUSES, TICKET_PRIORITIES } from '@/utils/constants'
import { formatDate } from '@/utils/format'

const statusOptions = [
  { label: 'All Statuses', value: '' },
  ...TICKET_STATUSES.map((s) => ({ label: s.replace('_', ' '), value: s })),
]
const priorityOptions = [
  { label: 'All Priorities', value: '' },
  ...TICKET_PRIORITIES.map((p) => ({ label: p, value: p })),
]

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand'> = {
  OPEN: 'info',
  IN_PROGRESS: 'warning',
  RESOLVED: 'success',
  CLOSED: 'default',
}

const priorityVariant: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  LOW: 'default',
  MEDIUM: 'warning',
  HIGH: 'error',
  URGENT: 'error',
}

const columns: Column<Ticket>[] = [
  {
    key: 'subject',
    label: 'Subject',
    sortable: true,
    render: (row) => <span className="font-medium text-gray-900">{row.subject}</span>,
  },
  { key: 'createdByName', label: 'Created By' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge variant={statusVariant[row.status]}>{row.status.replace('_', ' ')}</Badge>,
  },
  {
    key: 'priority',
    label: 'Priority',
    render: (row) => <Badge variant={priorityVariant[row.priority]}>{row.priority}</Badge>,
  },
  {
    key: 'assignedToName',
    label: 'Assigned To',
    render: (row) => row.assignedToName || <span className="text-gray-400">Unassigned</span>,
  },
  { key: 'createdAt', label: 'Created', sortable: true, render: (row) => formatDate(row.createdAt) },
  { key: 'updatedAt', label: 'Updated', sortable: true, render: (row) => formatDate(row.updatedAt) },
]

const emptyPage: PageMetadata = { totalElements: 0, lastPage: 1, currentPage: 1, perPage: 10, prev: null, next: null }

export default function TicketsListPage() {
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
  const data: Ticket[] = []

  return (
    <div>
      <PageHeader title="Support Tickets" subtitle="Manage user support requests" />

      <div className="flex items-center gap-3 mb-5">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search tickets..."
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
          options={priorityOptions}
          value={searchParams.get('priority') || ''}
          onChange={(v) =>
            setSearchParams((prev) => {
              if (v) prev.set('priority', v)
              else prev.delete('priority')
              return prev
            })
          }
          placeholder="All Priorities"
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/tickets/${row.id}`)}
        emptyTitle="No tickets found"
        emptyDescription="Support tickets will appear here when users submit them."
        emptyIcon="support_agent"
      />

      {!isLoading && data.length > 0 && <Pagination page={emptyPage} onPageChange={() => {}} />}
    </div>
  )
}
