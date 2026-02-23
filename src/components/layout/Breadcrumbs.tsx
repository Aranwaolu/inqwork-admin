import { Link } from 'react-router-dom'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 mb-4 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <GoogleMaterialIcon name="chevron_right" size={16} className="text-gray-400" />}
            {isLast || !item.href ? (
              <span className={isLast ? 'font-medium text-gray-900' : 'text-gray-500'}>{item.label}</span>
            ) : (
              <Link to={item.href} className="text-gray-500 hover:text-brand transition">
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
