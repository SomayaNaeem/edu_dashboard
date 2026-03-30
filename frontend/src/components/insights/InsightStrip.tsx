import { InsightItem } from '../../types/dashboard.types'

interface InsightStripProps {
  insights: InsightItem[]
}

const config = {
  growth: {
    border: 'border-accent-green/20',
    bg: 'bg-accent-green/5',
    iconBg: 'bg-accent-green',
    label: 'text-accent-green',
    icon: 'trending_up',
  },
  alert: {
    border: 'border-accent-orange/20',
    bg: 'bg-accent-orange/5',
    iconBg: 'bg-accent-orange',
    label: 'text-accent-orange',
    icon: 'priority_high',
  },
}

export function InsightStrip({ insights }: InsightStripProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {insights.map((item) => {
        const style = config[item.type]
        return (
          <div
            key={item.title}
            className={`${style.bg} border ${style.border} p-5 rounded-xl flex items-start gap-4`}
          >
            <div
              className={`size-9 rounded-full ${style.iconBg} flex items-center justify-center text-background-dark shrink-0`}
            >
              <span className="material-symbols-outlined text-lg">{style.icon}</span>
            </div>
            <div>
              <p className={`text-[11px] font-bold ${style.label} uppercase tracking-widest mb-1`}>
                {item.title}
              </p>
              <p className="text-sm font-medium text-slate-200 leading-relaxed">{item.body}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
