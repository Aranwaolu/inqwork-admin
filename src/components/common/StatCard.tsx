import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'
import Skeleton from '@/components/ui/Skeleton'

interface StatCardProps {
  label: string
  value: string | number
  icon: string
  color: string
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  isLoading?: boolean
}

export default function StatCard({ label, value, icon, color, trend, isLoading = false }: StatCardProps) {
  if (isLoading) {
    return (
      <div
        className="flex items-center gap-3 bg-white overflow-hidden"
        style={{ height: 90, padding: 12, borderRadius: 10, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}
      >
        <div
          className="shrink-0 self-center"
          style={{ width: 6, height: 65, borderRadius: 10, backgroundColor: color }}
        />
        <div className="flex-1 space-y-3">
          <Skeleton width="60%" height="1.4rem" />
          <Skeleton width="40%" height="1.8rem" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex items-center gap-3 bg-white overflow-hidden"
      style={{ height: 90, padding: 12, borderRadius: 10, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}
    >
      <div
        className="shrink-0 self-center"
        style={{ width: 6, height: 65, borderRadius: 10, backgroundColor: color }}
      />
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-gray-500" style={{ lineHeight: 1.2 }}>
            {label}
          </p>
          <p className="text-lg font-semibold text-gray-900 mt-1" style={{ lineHeight: 1.1 }}>
            {value}
          </p>
          {trend && (
            <p className={`mt-1 text-xs font-medium ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend.direction === 'up' ? '↑' : '↓'} {trend.percentage}%
            </p>
          )}
        </div>
        <div className="rounded-xl p-3" style={{ backgroundColor: `${color}14` }}>
          <GoogleMaterialIcon name={icon} size={28} className="block" style={{ color }} />
        </div>
      </div>
    </div>
  )
}
