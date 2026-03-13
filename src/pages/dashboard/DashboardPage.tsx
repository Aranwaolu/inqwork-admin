import PageHeader from '@/components/layout/PageHeader'
import StatCard from '@/components/common/StatCard'
import ChartBox from '@/components/common/ChartBox'
import { useStories } from '@/hooks/useAdminStories'
import { useFeaturedPlacements } from '@/hooks/useAdminFeatured'
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
  const storiesQuery = useStories({ pageSize: 1 })
  const draftsQuery = useStories({ pageSize: 1, status: 'DRAFT' })
  const featuredQuery = useFeaturedPlacements({ pageSize: 1 })

  const isLoading = storiesQuery.isLoading || draftsQuery.isLoading || featuredQuery.isLoading

  const totalStories = storiesQuery.data?.page?.totalElements
  const draftStories = draftsQuery.data?.page?.totalElements
  const featuredCount = featuredQuery.data?.page?.totalElements

  return (
    <div>
      <PageHeader title="Dashboard" />

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        <StatCard
          label="Total Stories"
          value={totalStories?.toLocaleString() ?? '—'}
          icon="auto_stories"
          color="#5e17eb"
          isLoading={storiesQuery.isLoading}
        />
        <StatCard
          label="Draft Stories"
          value={draftStories?.toLocaleString() ?? '—'}
          icon="pending_actions"
          color="#f59e0b"
          isLoading={draftsQuery.isLoading}
        />
        <StatCard
          label="Featured"
          value={featuredCount?.toLocaleString() ?? '—'}
          icon="star"
          color="#0ea5e9"
          isLoading={featuredQuery.isLoading}
        />
        <StatCard
          label="Active Creators"
          value="—"
          icon="edit_note"
          color="#10b981"
          isLoading={false}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5 mb-6">
        <ChartBox title="User Growth" subtitle="Last 6 months" option={userGrowthOption} isLoading={isLoading} />
        <ChartBox title="Content by Type" subtitle="Distribution" option={contentTypeOption} isLoading={isLoading} />
      </div>

      {/* Placeholder for future analytics */}
      <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-5">
        <p className="text-sm text-gray-500 text-center py-4">
          Analytics endpoints coming soon
        </p>
      </div>
    </div>
  )
}
