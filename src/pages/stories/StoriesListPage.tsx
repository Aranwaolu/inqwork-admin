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
import type { StoryQueryParams } from '@/api/stories'
import { useStories } from '@/hooks/useAdminStories'
import { STORY_FORMATS, STORY_STATUSES, STORY_GENRES } from '@/utils/constants'
import { formatDate } from '@/utils/format'

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand'> = {
  DRAFT: 'default',
  PENDING_REVIEW: 'warning',
  PUBLISHED: 'success',
  REJECTED: 'error',
  ARCHIVED: 'info',
}

const formatOptions = [
  { label: 'All Formats', value: '' },
  ...STORY_FORMATS.map((f) => ({ label: f.replace('_', ' '), value: f })),
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
  {
    key: 'creator',
    label: 'Author',
    sortable: true,
    render: (row) => row.creator?.displayName ?? 'Unknown',
  },
  {
    key: 'format',
    label: 'Format',
    render: (row) => <Badge variant="brand">{row.format.replace('_', ' ')}</Badge>,
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge variant={statusVariant[row.status]}>{row.status.replace('_', ' ')}</Badge>,
  },
  { key: 'episodesCount', label: 'Episodes' },
  { key: 'bookmarkCount', label: 'Bookmarks', sortable: true },
  {
    key: 'lastPublishedAt',
    label: 'Last Published',
    sortable: true,
    render: (row) => (row.lastPublishedAt ? formatDate(row.lastPublishedAt) : '—'),
  },
]

export default function StoriesListPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [_search, setSearch] = useState(searchParams.get('q') || '')

  const pageNo = Number(searchParams.get('page') || '1')

  const params: StoryQueryParams = {
    q: searchParams.get('q') || undefined,
    format: searchParams.get('format') || undefined,
    status: searchParams.get('status') || undefined,
    genre: searchParams.get('genre') || undefined,
    pageNo,
    pageSize: 15,
  }

  const { data, isLoading } = useStories(params)
  const stories = data?.content ?? []
  const page = data?.page

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value)
      setSearchParams((prev) => {
        if (value) prev.set('q', value)
        else prev.delete('q')
        prev.delete('page')
        return prev
      })
    },
    [setSearchParams]
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams((prev) => {
        if (newPage > 1) prev.set('page', String(newPage))
        else prev.delete('page')
        return prev
      })
    },
    [setSearchParams]
  )

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
          options={formatOptions}
          value={searchParams.get('format') || ''}
          onChange={(v) =>
            setSearchParams((prev) => {
              if (v) prev.set('format', v)
              else prev.delete('format')
              prev.delete('page')
              return prev
            })
          }
          placeholder="All Formats"
        />
        <Select
          options={statusOptions}
          value={searchParams.get('status') || ''}
          onChange={(v) =>
            setSearchParams((prev) => {
              if (v) prev.set('status', v)
              else prev.delete('status')
              prev.delete('page')
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
              prev.delete('page')
              return prev
            })
          }
          placeholder="All Genres"
          searchable
        />
      </div>

      <DataTable
        columns={columns}
        data={stories}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/stories/${row.slug}`)}
        emptyTitle="No stories found"
        emptyDescription="Stories will appear here once they are uploaded to the platform."
        emptyIcon="auto_stories"
      />

      {!isLoading && stories.length > 0 && page && (
        <Pagination page={page} onPageChange={handlePageChange} />
      )}
    </div>
  )
}
