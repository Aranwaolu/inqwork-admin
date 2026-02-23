import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import SearchBar from '@/components/ui/SearchBar'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'
import ConfirmationModal from '@/components/ui/ConfirmationModal'
import Skeleton from '@/components/ui/Skeleton'
import EmptyState from '@/components/common/EmptyState'
import type { FeaturedItem } from '@/types/featured'

export default function FeaturedPage() {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const isLoading = true
  const items: FeaturedItem[] = []

  return (
    <div>
      <PageHeader
        title="Featured Stories"
        subtitle="Manage featured stories on the homepage"
        action={
          <Button icon="add" onClick={() => setAddModalOpen(true)}>
            Add Featured
          </Button>
        }
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
          action={
            <Button icon="add" onClick={() => setAddModalOpen(true)}>
              Add Featured
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl bg-white shadow-sm border border-gray-100 p-4"
            >
              <div className="h-20 w-32 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                {item.bannerImageUrl && <img src={item.bannerImageUrl} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">{item.storyTitle}</h3>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{item.tagline}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-400">Position: {item.position}</span>
                  <span className={`text-xs font-medium ${item.active ? 'text-green-600' : 'text-gray-400'}`}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                  <GoogleMaterialIcon name="arrow_upward" size={18} />
                </button>
                <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                  <GoogleMaterialIcon name="arrow_downward" size={18} />
                </button>
                <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                  <GoogleMaterialIcon name="edit" size={18} />
                </button>
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                >
                  <GoogleMaterialIcon name="delete" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Featured Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Featured Story"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm">Add Featured</Button>
          </>
        }
      >
        <div className="space-y-4">
          <SearchBar placeholder="Search for a story..." width="100%" />
          <Input label="Tagline" placeholder="Enter tagline for the featured banner" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
            <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 cursor-pointer hover:border-brand transition">
              <GoogleMaterialIcon name="cloud_upload" size={36} className="text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">Click to upload banner</p>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => setDeleteConfirm(null)}
        message="Are you sure you want to remove this featured story? This action cannot be undone."
        confirmVariant="danger"
        confirmLabel="Remove"
      />
    </div>
  )
}
