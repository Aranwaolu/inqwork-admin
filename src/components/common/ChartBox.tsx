import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import Skeleton from '@/components/ui/Skeleton'

interface ChartBoxProps {
  title: string
  subtitle?: string
  option: EChartsOption
  isLoading?: boolean
  height?: string
}

export default function ChartBox({ title, subtitle, option, isLoading = false, height = '30rem' }: ChartBoxProps) {
  return (
    <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {isLoading ? (
        <Skeleton variant="rectangle" height={height} />
      ) : (
        <ReactECharts option={option} style={{ height }} />
      )}
    </div>
  )
}
