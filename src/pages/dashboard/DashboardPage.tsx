import PageHeader from '@/components/layout/PageHeader'
import StatCard from '@/components/common/StatCard'
import ChartBox from '@/components/common/ChartBox'
import Skeleton from '@/components/ui/Skeleton'
import type { EChartsOption } from 'echarts'

const userGrowthOption: EChartsOption = {
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    axisLabel: { fontSize: 12 },
  },
  yAxis: { type: 'value', axisLabel: { fontSize: 12 } },
  series: [
    {
      data: [120, 200, 280, 350, 410, 520],
      type: 'line',
      smooth: true,
      areaStyle: { color: 'rgba(94, 23, 235, 0.08)' },
      lineStyle: { color: '#5e17eb', width: 2 },
      itemStyle: { color: '#5e17eb' },
    },
  ],
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
}

const contentTypeOption: EChartsOption = {
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 45, name: 'Novels', itemStyle: { color: '#5e17eb' } },
        { value: 30, name: 'Comics', itemStyle: { color: '#818cf8' } },
        { value: 25, name: 'Short Stories', itemStyle: { color: '#c4b5fd' } },
      ],
      label: { fontSize: 12 },
    },
  ],
}

export default function DashboardPage() {
  const isLoading = true

  return (
    <div>
      <PageHeader title="Dashboard" />

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        <StatCard label="Total Stories" value="—" icon="auto_stories" color="#5e17eb" isLoading={isLoading} />
        <StatCard label="Total Users" value="—" icon="group" color="#0ea5e9" isLoading={isLoading} />
        <StatCard label="Pending Reviews" value="—" icon="pending_actions" color="#f59e0b" isLoading={isLoading} />
        <StatCard label="Active Creators" value="—" icon="edit_note" color="#10b981" isLoading={isLoading} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5 mb-6">
        <ChartBox title="User Growth" subtitle="Last 6 months" option={userGrowthOption} isLoading={isLoading} />
        <ChartBox title="Content by Type" subtitle="Distribution" option={contentTypeOption} isLoading={isLoading} />
      </div>

      {/* Recent Activity skeleton */}
      <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circle" width="3.2rem" height="3.2rem" />
              <div className="flex-1 space-y-1.5">
                <Skeleton width="70%" />
                <Skeleton width="40%" height="1.2rem" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
