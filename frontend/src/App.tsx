import { useState, useEffect } from 'react'
import { Sidebar, type Page } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { KpiGrid } from './components/kpis/KpiGrid'
import { PipelineFunnel } from './components/pipeline/PipelineFunnel'
import { ProspectPriority } from './components/charts/ProspectPriority'
import { HourlyTrafficChart } from './components/charts/HourlyTrafficChart'
import { InquiryThemes } from './components/charts/InquiryThemes'
import { InsightStrip } from './components/insights/InsightStrip'
import { DatePickerModal } from './components/ui/DatePickerModal'
import { SettingsPage } from './pages/SettingsPage'
import { useFilters } from './context/FilterContext'
import { useSettings } from './context/SettingsContext'
import { useDashboardData } from './hooks/useDashboardData'

export default function App() {
  const { filters, setFilters } = useFilters()
  const { settings } = useSettings()
  const { data } = useDashboardData(filters)
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [activePage, setActivePage] = useState<Page>('dashboard')

  // Apply saved default filters on first mount
  useEffect(() => {
    setFilters({
      campus: settings.defaultCampus,
      channel: settings.defaultChannel,
      period: settings.defaultPeriod,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-dark">
        <div className="text-primary text-sm font-bold animate-pulse">Loading dashboard…</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {activePage === 'settings' ? (
          <SettingsPage />
        ) : (
          <>
            <Header onOpenDatePicker={() => setDatePickerOpen(true)} />

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 bg-background-dark">
              <InsightStrip insights={data.insights} />
              <KpiGrid kpis={data.kpis} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <PipelineFunnel
                  stages={data.pipeline}
                  avgTimeToEnroll={data.pipelineStats.avgTimeToEnroll}
                  pipelineVelocity={data.pipelineStats.pipelineVelocity}
                />
                <ProspectPriority items={data.prospectPriority} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <HourlyTrafficChart rows={data.traffic} />
                <InquiryThemes topics={data.inquiryTopics} aiInsight={data.aiInsight} />
              </div>
            </div>

            <DatePickerModal
              isOpen={datePickerOpen}
              onClose={() => setDatePickerOpen(false)}
            />
          </>
        )}
      </main>
    </div>
  )
}
