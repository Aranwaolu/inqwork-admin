import { useParams } from 'react-router-dom'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Skeleton from '@/components/ui/Skeleton'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import { TICKET_STATUSES, TICKET_PRIORITIES } from '@/utils/constants'

const statusOptions = TICKET_STATUSES.map((s) => ({ label: s.replace('_', ' '), value: s }))
const priorityOptions = TICKET_PRIORITIES.map((p) => ({ label: p, value: p }))

export default function TicketDetailPage() {
  const { id } = useParams()
  const isLoading = true

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Tickets', href: '/tickets' }, { label: `Ticket #${id}` }]} />

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Message thread + reply */}
        <div className="col-span-2 space-y-6">
          {/* Messages */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversation</h2>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton variant="circle" width="3.2rem" height="3.2rem" />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex gap-2">
                        <Skeleton width="10rem" />
                        <Skeleton width="6rem" height="1.2rem" />
                      </div>
                      <Skeleton width="100%" height="4rem" variant="rectangle" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Messages will load from the API.</p>
            )}
          </div>

          {/* Reply */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Reply</h3>
            <Textarea label="" placeholder="Type your reply..." rows={4} />
            <div className="mt-3 flex justify-end">
              <Button icon="send" size="sm">
                Send Reply
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Details + Actions */}
        <div className="space-y-6">
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Ticket Details</h3>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton width="80%" />
                <Skeleton width="60%" />
                <Skeleton width="50%" />
                <Skeleton width="70%" />
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <Badge variant="info">OPEN</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Priority</span>
                  <Badge variant="warning">MEDIUM</Badge>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Update Ticket</h3>
            <div className="space-y-3">
              <Select label="Status" options={statusOptions} value="" onChange={() => {}} />
              <Select label="Priority" options={priorityOptions} value="" onChange={() => {}} />
              <Select label="Assign To" options={[{ label: 'Unassigned', value: '' }]} value="" onChange={() => {}} />
              <Button fullWidth size="sm">
                Update Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
