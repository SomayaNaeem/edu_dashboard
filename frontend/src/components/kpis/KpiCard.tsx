import { KpiData } from '../../types/dashboard.types'

// Maps accent color names to Tailwind class pairs [bg, text]
const accentMap: Record<string, { bg: string; text: string }> = {
  primary:              { bg: 'bg-primary/10',              text: 'text-primary' },
  'accent-blue':        { bg: 'bg-accent-blue/10',          text: 'text-accent-blue' },
  'accent-purple':      { bg: 'bg-accent-purple/10',        text: 'text-accent-purple' },
  'accent-mint':        { bg: 'bg-accent-mint/10',          text: 'text-accent-mint' },
  'accent-orange':      { bg: 'bg-accent-orange/10',        text: 'text-accent-orange' },
  'accent-green':       { bg: 'bg-accent-green/10',         text: 'text-accent-green' },
  'accent-pink':        { bg: 'bg-accent-pink/10',          text: 'text-accent-pink' },
  'accent-indigo':      { bg: 'bg-accent-indigo/10',        text: 'text-accent-indigo' },
  'accent-light-purple':{ bg: 'bg-accent-light-purple/10',  text: 'text-accent-light-purple' },
}

interface KpiCardProps {
  kpi: KpiData
}

export function KpiCard({ kpi }: KpiCardProps) {
  const accent = accentMap[kpi.accentColor] ?? accentMap['primary']
  const isPositive = kpi.trend >= 0
  const trendColor = isPositive ? 'text-accent-green' : 'text-accent-orange'
  const trendPrefix = isPositive ? '+' : ''

  return (
    <div className="bg-card-dark p-6 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${accent.bg} ${accent.text}`}>
          <span className="material-symbols-outlined text-2xl">{kpi.icon}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xs font-bold ${trendColor}`}>
            {trendPrefix}{kpi.trend}%
          </span>
          <span className="text-[9px] text-slate-500 font-bold uppercase">{kpi.trendLabel}</span>
        </div>
      </div>

      <p className="text-slate-400 text-sm font-bold tracking-tight">{kpi.label}</p>
      <p className="text-3xl font-bold text-white my-1">{kpi.value}</p>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-2">{kpi.subtext}</p>
    </div>
  )
}
