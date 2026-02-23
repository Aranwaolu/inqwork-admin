import { useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/ui/Button'
import SearchBar from '@/components/ui/SearchBar'
import Select from '@/components/ui/Select'
import DataTable, { type Column } from '@/components/common/DataTable'
import Pagination from '@/components/common/Pagination'
import Badge from '@/components/ui/Badge'
import type { Story } from '@/types/story'
import type { PageMetadata } from '@/types/api'
import { STORY_TYPES, STORY_STATUSES, STORY_GENRES } from '@/utils/constants'
import { formatDate } from '@/utils/format'

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand'> = {
  DRAFT: 'default',
  PENDING_REVIEW: 'warning',
  PUBLISHED: 'success',
  REJECTED: 'error',
  ARCHIVED: 'info',
}

const typeOptions = [
  { label: 'All Types', value: '' },
  ...STORY_TYPES.map((t) => ({ label: t.replace('_', ' '), value: t })),
]
const statusOptions = [
  { label: 'All Statuses', value: '' },
  ...STORY_STATUSES.map((s) => ({ label: s.replace('_', ' '), value: s })),
]
const genreOptions = [{ label: 'All Genres', value: '' }, ...STORY_GENRES.map((g) => ({ label: g, value: g }))]

const columns: Column<Story>[] = [
  {
    key: 'coverImageUrl',
    label: '',
    width: '48px',
    render: (row) => (
      <div className="h-10 w-8 rounded bg-gray-200 overflow-hidden">
        {row.coverImageUrl && <img src={row.coverImageUrl} alt="" className="h-full w-full object-cover" />}
      </div>
    ),
  },
  {
    key: 'title',
    label: 'Title',
    sortable: true,
    render: (row) => <span className="font-medium text-gray-900">{row.title}</span>,
  },
  { key: 'authorName', label: 'Author', sortable: true },
  {
    key: 'type',
    label: 'Type',
    render: (row) => <Badge variant="brand">{row.type.replace('_', ' ')}</Badge>,
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge variant={statusVariant[row.status]}>{row.status.replace('_', ' ')}</Badge>,
  },
  { key: 'viewCount', label: 'Views', sortable: true },
  { key: 'episodeCount', label: 'Episodes' },
  { key: 'createdAt', label: 'Created', sortable: true, render: (row) => formatDate(row.createdAt) },
]

const emptyPage: PageMetadata = {
  totalElements: 0,
  lastPage: 1,
  currentPage: 1,
  perPage: 10,
  prev: null,
  next: null,
}

export default function StoriesListPage() {
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
  const data: Story[] = []

  return (
    <div>
      <PageHeader
        title="Stories"
        subtitle="Manage all stories on the platform"
        action={
          <Button icon="add" href="/stories/upload">
            Upload Story
          </Button>
        }
      />

      <div className="flex items-center gap-3 mb-5">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search stories..."
          defaultValue={searchParams.get('q') || ''}
          width={320}
        />
        <Select
          options={typeOptions}
          value={searchParams.get('type') || ''}
          onChange={(v) =>
            setSearchParams((prev) => {
              if (v) prev.set('type', v)
              else prev.delete('type')
              return prev
            })
          }
          placeholder="All Types"
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
          options={genreOptions}
          value={searchParams.get('genre') || ''}
          onChange={(v) =>
            setSearchParams((prev) => {
              if (v) prev.set('genre', v)
              else prev.delete('genre')
              return prev
            })
          }
          placeholder="All Genres"
          searchable
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/stories/${row.id}`)}
        emptyTitle="No stories found"
        emptyDescription="Stories will appear here once they are uploaded to the platform."
        emptyIcon="auto_stories"
      />

      {!isLoading && data.length > 0 && <Pagination page={emptyPage} onPageChange={() => {}} />}
    </div>
  )
}
