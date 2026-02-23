import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import SearchBar from '@/components/ui/SearchBar'
import Select from '@/components/ui/Select'
import DataTable, { type Column } from '@/components/common/DataTable'
import Pagination from '@/components/common/Pagination'
import Badge from '@/components/ui/Badge'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'
import type { User } from '@/types/user'
import type { PageMetadata } from '@/types/api'
import { USER_ROLES } from '@/utils/constants'
import { formatDate } from '@/utils/format'

const roleOptions = [{ label: 'All Roles', value: '' }, ...USER_ROLES.map((r) => ({ label: r, value: r }))]

const roleVariant: Record<string, 'default' | 'brand' | 'success' | 'info'> = {
  ADMIN: 'brand',
  CREATOR: 'success',
  READER: 'info',
}

const columns: Column<User>[] = [
  {
    key: 'avatarUrl',
    label: '',
    width: '48px',
    render: (row) => (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
        {row.avatarUrl ? (
          <img src={row.avatarUrl} alt="" className="h-full w-full rounded-full object-cover" />
        ) : (
          row.displayName.charAt(0).toUpperCase()
        )}
      </div>
    ),
  },
  {
    key: 'displayName',
    label: 'Name',
    sortable: true,
    render: (row) => <span className="font-medium text-gray-900">{row.displayName}</span>,
  },
  { key: 'email', label: 'Email', sortable: true },
  {
    key: 'role',
    label: 'Role',
    render: (row) => <Badge variant={roleVariant[row.role] || 'default'}>{row.role}</Badge>,
  },
  {
    key: 'emailVerified',
    label: 'Verified',
    width: '80px',
    render: (row) =>
      row.emailVerified ? (
        <GoogleMaterialIcon name="verified" size={18} className="text-green-500" />
      ) : (
        <GoogleMaterialIcon name="cancel" size={18} className="text-gray-300" />
      ),
  },
  {
    key: 'lastActiveAt',
    label: 'Last Active',
    sortable: true,
    render: (row) => (row.lastActiveAt ? formatDate(row.lastActiveAt) : <span className="text-gray-400">Never</span>),
  },
  { key: 'createdAt', label: 'Joined', sortable: true, render: (row) => formatDate(row.createdAt) },
]

const emptyPage: PageMetadata = {
  totalElements: 0,
  lastPage: 1,
  currentPage: 1,
  perPage: 10,
  prev: null,
  next: null,
}

export default function UsersPage() {
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
  const data: User[] = []

  return (
    <div>
      <PageHeader title="Users" subtitle="View all registered users" />

      <div className="flex items-center gap-3 mb-5">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search users..."
          defaultValue={searchParams.get('q') || ''}
          width={320}
        />
        <Select
          options={roleOptions}
          value={searchParams.get('role') || ''}
          onChange={(v) =>
            setSearchParams((prev) => {
              if (v) prev.set('role', v)
              else prev.delete('role')
              return prev
            })
          }
          placeholder="All Roles"
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyTitle="No users found"
        emptyDescription="Users will appear here once they register on the platform."
        emptyIcon="group"
      />

      {!isLoading && data.length > 0 && <Pagination page={emptyPage} onPageChange={() => {}} />}
    </div>
  )
}
