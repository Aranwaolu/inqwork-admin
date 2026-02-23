import type { PageMetadata } from '@/types/api'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'

interface PaginationProps {
  page: PageMetadata
  onPageChange: (page: number) => void
}

export default function Pagination({ page, onPageChange }: PaginationProps) {
  const { totalElements, currentPage, lastPage, perPage } = page

  const start = (currentPage - 1) * perPage + 1
  const end = Math.min(currentPage * perPage, totalElements)

  const pages: (number | '...')[] = []
  for (let i = 1; i <= lastPage; i++) {
    if (i === 1 || i === lastPage || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <div className="flex items-center justify-between px-1 py-3">
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium text-gray-700">{start}</span>–
        <span className="font-medium text-gray-700">{end}</span> of{' '}
        <span className="font-medium text-gray-700">{totalElements}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!page.prev}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <GoogleMaterialIcon name="chevron_left" size={20} />
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-sm text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`min-w-8 rounded-lg px-2.5 py-1.5 text-sm font-medium transition ${
                p === currentPage ? 'bg-brand text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!page.next}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <GoogleMaterialIcon name="chevron_right" size={20} />
        </button>
      </div>
    </div>
  )
}
