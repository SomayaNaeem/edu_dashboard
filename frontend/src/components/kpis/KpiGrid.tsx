import { KpiData } from '../../types/dashboard.types'
import { useSettings } from '../../context/SettingsContext'
import { KpiCard } from './KpiCard'

interface KpiGridProps {
  kpis: KpiData[]
}

export function KpiGrid({ kpis }: KpiGridProps) {
  const { settings } = useSettings()

  const enriched = kpis.map((kpi): KpiData => {
    switch (kpi.label) {
      case 'Total Inquiries':
        return { ...kpi, subtext: `Today: 156 · Goal: ${settings.dailyInquiryGoal}` }

      case 'Unique Applicants':
        return { ...kpi, subtext: `Benchmark: ${settings.applicantBenchmark.toLocaleString()}` }

      case 'Qualified Prospects':
        return { ...kpi, subtext: `Institution Avg: ${settings.qualificationRateAvg}%` }

      case 'Final Enrolled': {
        const enrolled =
          typeof kpi.value === 'number'
            ? kpi.value
            : parseInt(String(kpi.value).replace(/,/g, ''), 10)
        const pct = Math.round((enrolled / settings.enrollmentTarget) * 100)
        return { ...kpi, subtext: `Target: ${settings.enrollmentTarget.toLocaleString()} (${pct}%)` }
      }

      default:
        return kpi
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {enriched.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </div>
  )
}
