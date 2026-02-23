import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Skeleton from '@/components/ui/Skeleton'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ConfirmationModal from '@/components/ui/ConfirmationModal'

type ActionType = 'dismiss' | 'warn' | 'remove' | 'ban' | null

export default function ReportDetailPage() {
  const { id } = useParams()
  const isLoading = true
  const [confirmAction, setConfirmAction] = useState<ActionType>(null)

  const actionMessages: Record<string, string> = {
    dismiss: 'Are you sure you want to dismiss this report? The content will remain on the platform.',
    warn: 'This will send a warning to the content creator. Continue?',
    remove: 'This will permanently remove the reported content from the platform. This action cannot be undone.',
    ban: 'This will ban the user from the platform. This is a serious action. Continue?',
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Reports', href: '/reports' }, { label: `Report #${id}` }]} />

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Report details + content preview + history */}
        <div className="col-span-2 space-y-6">
          {/* Report Details */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Details</h2>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton width="50%" height="1.8rem" />
                <Skeleton width="70%" />
                <Skeleton width="100%" height="6rem" variant="rectangle" />
              </div>
            ) : (
              <p className="text-sm text-gray-500">Report details will load from the API.</p>
            )}
          </div>

          {/* Reported Content Preview */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Reported Content</h2>
            {isLoading ? (
              <div className="space-y-3">
                <div className="flex gap-4">
                  <Skeleton variant="rectangle" width="8rem" height="10rem" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="60%" height="1.8rem" />
                    <Skeleton width="40%" />
                    <Skeleton width="100%" height="4rem" variant="rectangle" />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Content preview will load from the API.</p>
            )}
          </div>

          {/* History Timeline */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Action History</h2>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton variant="circle" width="2.4rem" height="2.4rem" />
                    <div className="flex-1 space-y-1">
                      <Skeleton width="60%" />
                      <Skeleton width="30%" height="1.2rem" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">History will load from the API.</p>
            )}
          </div>
        </div>

        {/* Right: Status + Actions */}
        <div className="space-y-6">
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Status</h3>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton width="60%" />
                <Skeleton width="40%" />
                <Skeleton width="50%" />
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <Badge variant="warning">PENDING</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Reason</span>
                  <Badge variant="error">INAPPROPRIATE</Badge>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                fullWidth
                size="sm"
                icon="do_not_disturb"
                onClick={() => setConfirmAction('dismiss')}
              >
                Dismiss Report
              </Button>
              <Button variant="outline" fullWidth size="sm" icon="warning" onClick={() => setConfirmAction('warn')}>
                Warn Creator
              </Button>
              <Button variant="danger" fullWidth size="sm" icon="delete" onClick={() => setConfirmAction('remove')}>
                Remove Content
              </Button>
              <Button variant="danger" fullWidth size="sm" icon="block" onClick={() => setConfirmAction('ban')}>
                Ban User
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => setConfirmAction(null)}
        title={confirmAction ? `${confirmAction.charAt(0).toUpperCase() + confirmAction.slice(1)} Action` : ''}
        message={confirmAction ? actionMessages[confirmAction] : ''}
        confirmVariant={confirmAction === 'dismiss' || confirmAction === 'warn' ? 'primary' : 'danger'}
        confirmLabel={
          confirmAction === 'dismiss'
            ? 'Dismiss'
            : confirmAction === 'warn'
              ? 'Send Warning'
              : confirmAction === 'remove'
                ? 'Remove Content'
                : 'Ban User'
        }
      />
    </div>
  )
}
