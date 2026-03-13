import { useParams } from 'react-router-dom'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Skeleton from '@/components/ui/Skeleton'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import DataTable, { type Column } from '@/components/common/DataTable'
import type { Episode } from '@/types/story'
import { useStory, useEpisodes, usePublishStory, useArchiveStory } from '@/hooks/useAdminStories'
import { formatDate } from '@/utils/format'

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  DRAFT: 'default',
  SCHEDULED: 'warning',
  PUBLISHED: 'success',
  ARCHIVED: 'info',
}

const episodeColumns: Column<Episode>[] = [
  { key: 'episodeNumber', label: '#', width: '60px' },
  { key: 'title', label: 'Title', render: (row) => <span className="font-medium">{row.title}</span> },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge variant={row.status === 'PUBLISHED' ? 'success' : 'default'}>{row.status}</Badge>,
  },
  {
    key: 'isFree',
    label: 'Free',
    render: (row) => (row.isFree ? <Badge variant="success">Free</Badge> : <Badge variant="default">Paid</Badge>),
  },
  {
    key: 'createdAt',
    label: 'Created',
    render: (row) => formatDate(row.createdAt),
  },
]

export default function StoryDetailPage() {
  const { id } = useParams()
  const { data: story, isLoading } = useStory(id!)
  const { data: episodesData, isLoading: episodesLoading } = useEpisodes(id!)
  const publishMutation = usePublishStory()
  const archiveMutation = useArchiveStory()

  const episodes = episodesData?.content ?? []

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Stories', href: '/stories' },
          { label: story?.title ?? `Story` },
        ]}
      />

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
            ) : story ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{story.title}</h3>
                <p className="text-sm text-gray-600">{story.description || 'No description provided.'}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="brand">{story.format.replace('_', ' ')}</Badge>
                  <Badge variant={statusVariant[story.status]}>{story.status.replace('_', ' ')}</Badge>
                  <Badge variant="info">{story.publishingState}</Badge>
                  <Badge variant="default">{story.contentRating}</Badge>
                </div>
                {story.primaryGenre && (
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Genre:</span> {story.primaryGenre}
                  </p>
                )}
                {story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {story.tags.map((tag) => (
                      <Badge key={tag.id} variant="default">{tag.name}</Badge>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Story not found.</p>
            )}
          </div>

          {/* Episodes Table */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Episodes</h2>
            <DataTable<Episode>
              columns={episodeColumns}
              data={episodes}
              isLoading={episodesLoading}
              skeletonRows={3}
              emptyTitle="No episodes yet"
              emptyDescription="Episodes will appear once the creator uploads them."
            />
          </div>
        </div>

        {/* Right: Cover + Author + Actions */}
        <div className="space-y-6">
          {/* Cover image */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Cover Image</h3>
            {isLoading ? (
              <Skeleton variant="rectangle" height="20rem" />
            ) : story?.coverImageUrl ? (
              <img
                src={story.coverImageUrl}
                alt={story.title}
                className="w-full h-80 rounded-lg object-cover"
              />
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
            ) : story ? (
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  {story.creator?.avatarUrl && (
                    <img src={story.creator.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                  )}
                  <span className="font-medium text-gray-900">{story.creator?.displayName ?? 'Unknown'}</span>
                </div>
                <div className="text-gray-600 space-y-1">
                  <p>Episodes: <span className="font-medium text-gray-900">{story.episodesCount}</span></p>
                  <p>Published: <span className="font-medium text-gray-900">{story.publishedEpisodesCount}</span></p>
                  <p>Bookmarks: <span className="font-medium text-gray-900">{story.bookmarkCount}</span></p>
                  {story.lastPublishedAt && (
                    <p>Last published: <span className="font-medium text-gray-900">{formatDate(story.lastPublishedAt)}</span></p>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* Moderation Actions */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Moderation</h3>
            <div className="space-y-3">
              <Button
                fullWidth
                onClick={() => id && publishMutation.mutate(id)}
                disabled={publishMutation.isPending || story?.status === 'PUBLISHED'}
              >
                {publishMutation.isPending ? 'Publishing...' : 'Publish Story'}
              </Button>
              <Button
                variant="danger"
                fullWidth
                icon="archive"
                onClick={() => id && archiveMutation.mutate(id)}
                disabled={archiveMutation.isPending || story?.status === 'ARCHIVED'}
              >
                {archiveMutation.isPending ? 'Archiving...' : 'Archive Story'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
