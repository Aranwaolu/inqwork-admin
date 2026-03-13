import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'
import ConfirmationModal from '@/components/ui/ConfirmationModal'
import Skeleton from '@/components/ui/Skeleton'
import EmptyState from '@/components/common/EmptyState'
import {
  useFeaturedPlacements,
  useCreateFeatured,
  useUpdateFeatured,
  useDeleteFeatured,
} from '@/hooks/useAdminFeatured'
import type { PlacementType } from '@/types/featured'

const placementOptions = [
  { label: 'Homepage Banner', value: 'HOMEPAGE_BANNER' },
  { label: 'Editor Pick', value: 'EDITOR_PICK' },
  { label: 'Category Highlight', value: 'CATEGORY_HIGHLIGHT' },
]

const initialForm = { storyId: '', placementType: 'HOMEPAGE_BANNER', sortOrder: '0' }

export default function FeaturedPage() {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [form, setForm] = useState(initialForm)

  const { data, isLoading } = useFeaturedPlacements()
  const createMutation = useCreateFeatured()
  const updateMutation = useUpdateFeatured()
  const deleteMutation = useDeleteFeatured()

  const items = data?.content ?? []

  const handleCreate = () => {
    if (!form.storyId) return
    createMutation.mutate(
      {
        storyId: Number(form.storyId),
        placementType: form.placementType as PlacementType,
        sortOrder: Number(form.sortOrder) || 0,
      },
      { onSuccess: () => { setAddModalOpen(false); setForm(initialForm) } },
    )
  }

  const handleReorder = (id: number, currentOrder: number, delta: number) => {
    updateMutation.mutate({ id, data: { sortOrder: currentOrder + delta } })
  }

  const handleToggleActive = (id: number, isActive: boolean) => {
    updateMutation.mutate({ id, data: { isActive: !isActive } })
  }

  const handleDelete = () => {
    if (deleteConfirm === null) return
    deleteMutation.mutate(deleteConfirm, { onSuccess: () => setDeleteConfirm(null) })
  }

  return (
    <div>
      <PageHeader
        title="Featured Stories"
        subtitle="Manage featured stories on the homepage"
        action={<Button icon="add" onClick={() => setAddModalOpen(true)}>Add Featured</Button>}
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl bg-white shadow-sm border border-gray-100 p-4">
              <Skeleton variant="rectangle" width="12rem" height="7rem" />
              <div className="flex-1 space-y-2">
                <Skeleton width="40%" height="1.8rem" />
                <Skeleton width="60%" />
                <Skeleton width="20%" height="1.2rem" />
              </div>
              <div className="flex gap-2">
                <Skeleton variant="rectangle" width="3.2rem" height="3.2rem" />
                <Skeleton variant="rectangle" width="3.2rem" height="3.2rem" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon="star"
          title="No featured stories"
          description="Add stories to the featured section to highlight them on the homepage."
          action={<Button icon="add" onClick={() => setAddModalOpen(true)}>Add Featured</Button>}
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-xl bg-white shadow-sm border border-gray-100 p-4">
              <div className="h-20 w-32 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                {item.story?.coverImageUrl && (
                  <img src={item.story.coverImageUrl} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">{item.story?.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  {item.placementType.replace(/_/g, ' ')}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-400">Order: {item.sortOrder}</span>
                  <button
                    onClick={() => handleToggleActive(item.id, item.isActive)}
                    className={`text-xs font-medium ${item.isActive ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleReorder(item.id, item.sortOrder, -1)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                  <GoogleMaterialIcon name="arrow_upward" size={18} />
                </button>
                <button onClick={() => handleReorder(item.id, item.sortOrder, 1)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                  <GoogleMaterialIcon name="arrow_downward" size={18} />
                </button>
                <button onClick={() => setDeleteConfirm(item.id)} className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
                  <GoogleMaterialIcon name="delete" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Featured Story"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleCreate} disabled={createMutation.isPending || !form.storyId}>
              {createMutation.isPending ? 'Adding...' : 'Add Featured'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Story ID"
            type="number"
            placeholder="Enter story ID"
            value={form.storyId}
            onChange={(e) => setForm((f) => ({ ...f, storyId: e.target.value }))}
          />
          <Select
            label="Placement Type"
            options={placementOptions}
            value={form.placementType}
            onChange={(v) => setForm((f) => ({ ...f, placementType: v }))}
          />
          <Input
            label="Sort Order"
            type="number"
            placeholder="0"
            value={form.sortOrder}
            onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))}
          />
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to remove this featured story? This action cannot be undone."
        confirmVariant="danger"
        confirmLabel="Remove"
      />
    </div>
  )
}
