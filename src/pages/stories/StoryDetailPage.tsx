import { useParams } from 'react-router-dom'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Skeleton from '@/components/ui/Skeleton'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import DataTable, { type Column } from '@/components/common/DataTable'
import type { Episode } from '@/types/story'
import { STORY_STATUSES } from '@/utils/constants'

const statusOptions = STORY_STATUSES.map((s) => ({ label: s.replace('_', ' '), value: s }))

const episodeColumns: Column<Episode>[] = [
  { key: 'number', label: '#', width: '60px' },
  { key: 'title', label: 'Title', render: (row) => <span className="font-medium">{row.title}</span> },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge variant={row.status === 'PUBLISHED' ? 'success' : 'default'}>{row.status}</Badge>,
  },
  { key: 'createdAt', label: 'Created' },
]

export default function StoryDetailPage() {
  const { id } = useParams()
  const isLoading = true

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Stories', href: '/stories' }, { label: `Story #${id}` }]} />

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Details + Episodes */}
        <div className="col-span-2 space-y-6">
          {/* Details Card */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Story Details</h2>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton width="60%" height="2rem" />
                <Skeleton width="40%" />
                <Skeleton width="100%" height="6rem" variant="rectangle" />
                <div className="flex gap-2">
                  <Skeleton width="6rem" height="2rem" />
                  <Skeleton width="6rem" height="2rem" />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Story details will load from the API.</p>
            )}
          </div>

          {/* Episodes Table */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Episodes</h2>
            <DataTable<Episode>
              columns={episodeColumns}
              data={[]}
              isLoading={isLoading}
              skeletonRows={3}
              emptyTitle="No episodes yet"
              emptyDescription="Episodes will appear once the creator uploads them."
            />
          </div>
        </div>

        {/* Right: Cover + Actions */}
        <div className="space-y-6">
          {/* Cover image */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Cover Image</h3>
            {isLoading ? (
              <Skeleton variant="rectangle" height="20rem" />
            ) : (
              <div className="h-80 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No cover image
              </div>
            )}
          </div>

          {/* Author & Stats */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Author & Stats</h3>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton width="50%" />
                <Skeleton width="30%" />
                <Skeleton width="60%" />
              </div>
            ) : (
              <p className="text-sm text-gray-500">Author info will load from the API.</p>
            )}
          </div>

          {/* Moderation Actions */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Moderation</h3>
            <div className="space-y-3">
              <Select label="Status" options={statusOptions} value="" onChange={() => {}} />
              <Button fullWidth>Update Status</Button>
              <Button variant="danger" fullWidth icon="delete">
                Remove Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
