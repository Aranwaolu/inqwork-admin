import type { ReactNode } from 'react'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'
import Skeleton from '@/components/ui/Skeleton'
import EmptyState from '@/components/common/EmptyState'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  width?: string
  render?: (row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  skeletonRows?: number
  sortField?: string
  sortDirection?: 'ASC' | 'DESC'
  onSort?: (field: string) => void
  onRowClick?: (row: T) => void
  emptyTitle?: string
  emptyDescription?: string
  emptyIcon?: string
}

export default function DataTable<T extends { id: number | string }>({
  columns,
  data,
  isLoading = false,
  skeletonRows = 5,
  sortField,
  sortDirection,
  onSort,
  onRowClick,
  emptyTitle = 'No data found',
  emptyDescription,
  emptyIcon,
}: DataTableProps<T>) {
  if (!isLoading && data.length === 0) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/70">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
                style={{ width: col.width }}
              >
                {col.sortable && onSort ? (
                  <button
                    onClick={() => onSort(col.key)}
                    className="inline-flex items-center gap-1 hover:text-gray-700 transition"
                  >
                    {col.label}
                    {sortField === col.key && (
                      <GoogleMaterialIcon
                        name={sortDirection === 'ASC' ? 'arrow_upward' : 'arrow_downward'}
                        size={14}
                      />
                    )}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading
            ? Array.from({ length: skeletonRows }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <Skeleton width="80%" />
                    </td>
                  ))}
                </tr>
              ))
            : data.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} transition`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-gray-700">
                      {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
