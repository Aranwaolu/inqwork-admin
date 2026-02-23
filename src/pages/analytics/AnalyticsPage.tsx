import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import StatCard from '@/components/common/StatCard'
import ChartBox from '@/components/common/ChartBox'
import DataTable, { type Column } from '@/components/common/DataTable'
import type { AnalyticsTab } from '@/types/analytics'
import type { EChartsOption } from 'echarts'

const tabs: { key: AnalyticsTab; label: string }[] = [
  { key: 'story-performance', label: 'Story Performance' },
  { key: 'creator-metrics', label: 'Creator Metrics' },
  { key: 'reader-activity', label: 'Reader Activity' },
  { key: 'top-tags', label: 'Top Tags' },
]

const placeholderLineChart: EChartsOption = {
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisLabel: { fontSize: 12 } },
  yAxis: { type: 'value', axisLabel: { fontSize: 12 } },
  series: [
    {
      data: [150, 230, 224, 218, 135, 347],
      type: 'line',
      smooth: true,
      lineStyle: { color: '#5e17eb' },
      itemStyle: { color: '#5e17eb' },
    },
  ],
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
}

const placeholderBarChart: EChartsOption = {
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Action'], axisLabel: { fontSize: 12 } },
  yAxis: { type: 'value', axisLabel: { fontSize: 12 } },
  series: [{ data: [120, 90, 85, 60, 55], type: 'bar', itemStyle: { color: '#5e17eb', borderRadius: [4, 4, 0, 0] } }],
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
}

interface TopItemRow {
  id: number
  name: string
  value: number
  extra: string
}

const topColumns: Column<TopItemRow>[] = [
  { key: 'name', label: 'Name', render: (row) => <span className="font-medium text-gray-900">{row.name}</span> },
  { key: 'value', label: 'Value', sortable: true },
  { key: 'extra', label: 'Details' },
]

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('story-performance')
  const isLoading = true

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Platform performance and insights" />

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-3 text-sm font-medium transition border-b-2 -mb-px ${
              activeTab === tab.key
                ? 'border-brand text-brand'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'story-performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-5">
            <StatCard label="Total Views" value="—" icon="visibility" color="#5e17eb" isLoading={isLoading} />
            <StatCard label="Avg. Read Time" value="—" icon="schedule" color="#0ea5e9" isLoading={isLoading} />
            <StatCard label="Top Rated" value="—" icon="star" color="#f59e0b" isLoading={isLoading} />
            <StatCard label="Completion Rate" value="—" icon="check_circle" color="#10b981" isLoading={isLoading} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <ChartBox title="Views Over Time" option={placeholderLineChart} isLoading={isLoading} />
            <ChartBox title="Views by Genre" option={placeholderBarChart} isLoading={isLoading} />
          </div>
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Top Performing Stories</h3>
            <DataTable<TopItemRow> columns={topColumns} data={[]} isLoading={isLoading} emptyTitle="No data yet" />
          </div>
        </div>
      )}

      {activeTab === 'creator-metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-5">
            <StatCard label="Active Creators" value="—" icon="edit_note" color="#5e17eb" isLoading={isLoading} />
            <StatCard label="Avg. Stories" value="—" icon="auto_stories" color="#0ea5e9" isLoading={isLoading} />
            <StatCard label="New This Month" value="—" icon="person_add" color="#f59e0b" isLoading={isLoading} />
            <StatCard label="Retention Rate" value="—" icon="trending_up" color="#10b981" isLoading={isLoading} />
          </div>
          <ChartBox title="Creator Growth" option={placeholderLineChart} isLoading={isLoading} />
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Top Creators</h3>
            <DataTable<TopItemRow> columns={topColumns} data={[]} isLoading={isLoading} emptyTitle="No data yet" />
          </div>
        </div>
      )}

      {activeTab === 'reader-activity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-5">
            <StatCard label="Daily Active" value="—" icon="people" color="#5e17eb" isLoading={isLoading} />
            <StatCard label="Monthly Active" value="—" icon="groups" color="#0ea5e9" isLoading={isLoading} />
            <StatCard label="Avg. Session" value="—" icon="timer" color="#f59e0b" isLoading={isLoading} />
            <StatCard label="Bounce Rate" value="—" icon="exit_to_app" color="#10b981" isLoading={isLoading} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <ChartBox title="Daily Active Users" option={placeholderLineChart} isLoading={isLoading} />
            <ChartBox title="Reading Sessions" option={placeholderBarChart} isLoading={isLoading} />
          </div>
        </div>
      )}

      {activeTab === 'top-tags' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-5">
            <StatCard label="Total Tags" value="—" icon="label" color="#5e17eb" isLoading={isLoading} />
            <StatCard label="Most Used" value="—" icon="trending_up" color="#0ea5e9" isLoading={isLoading} />
            <StatCard label="New This Month" value="—" icon="new_releases" color="#f59e0b" isLoading={isLoading} />
            <StatCard label="Avg. Per Story" value="—" icon="tag" color="#10b981" isLoading={isLoading} />
          </div>
          <ChartBox title="Tag Popularity" option={placeholderBarChart} isLoading={isLoading} />
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">All Tags</h3>
            <DataTable<TopItemRow> columns={topColumns} data={[]} isLoading={isLoading} emptyTitle="No tags yet" />
          </div>
        </div>
      )}
    </div>
  )
}
