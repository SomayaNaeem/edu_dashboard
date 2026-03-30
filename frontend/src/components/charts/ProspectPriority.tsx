import { ProspectPriorityItem } from '../../types/dashboard.types'
import { useSettings } from '../../context/SettingsContext'

interface ProspectPriorityProps {
  items: ProspectPriorityItem[]
}

const pctTextMap: Record<string, string> = {
  'bg-accent-pink':         'text-accent-pink',
  'bg-accent-purple':       'text-accent-purple',
  'bg-accent-blue':         'text-accent-blue',
  'bg-primary':             'text-primary',
  'bg-slate-700':           'text-slate-500',
  'bg-accent-orange':       'text-accent-orange',
  'bg-accent-green':        'text-accent-green',
  'bg-accent-mint':         'text-accent-mint',
  'bg-accent-light-purple': 'text-accent-light-purple',
}

// Maps prospect tier label → settings key
const settingsKeyMap: Record<string, 'premiumPct' | 'importantPct' | 'moderatePct' | 'lowPriorityPct' | 'coldCasePct'> = {
  'Premium':      'premiumPct',
  'Important':    'importantPct',
  'Moderate':     'moderatePct',
  'Low Priority': 'lowPriorityPct',
  'Cold Case':    'coldCasePct',
}

export function ProspectPriority({ items }: ProspectPriorityProps) {
  const { settings } = useSettings()

  const enriched = items.map((item): ProspectPriorityItem => {
    const key = settingsKeyMap[item.label]
    return key ? { ...item, pct: settings[key] } : item
  })

  return (
    <div className="bg-card-dark p-8 rounded-xl border border-white/5 shadow-2xl flex flex-col">
      <h3 className="text-lg font-bold text-white mb-1">Prospect Priority</h3>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-8">Follow-up Urgency</p>

      <div className="flex-1 space-y-5">
        {enriched.map((item) => {
          const pctText = pctTextMap[item.color] ?? 'text-white'
          return (
            <div key={item.label} className="relative">
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1.5 group tooltip-container relative">
                  <span className="text-xs font-bold text-slate-300">{item.label}</span>
                  <span className="material-symbols-outlined text-[14px] text-slate-500 cursor-help hover:text-primary transition-colors">
                    info
                  </span>
                  <div className="tooltip-text absolute bottom-full left-0 mb-2 w-48 p-2 bg-slate-800 text-[10px] text-white rounded shadow-xl border border-white/10 invisible opacity-0 transition-all z-20">
                    {item.tooltip}
                  </div>
                </div>
                <span className={`text-[11px] font-bold ${pctText}`}>{item.pct}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
