import { TrafficRow } from '../../types/dashboard.types'

interface HourlyTrafficChartProps {
  rows: TrafficRow[]
}

const timeLabels = ['8A', '10A', '12P', '2P', '4P', '6P', '8P', '10P', '12A', '2A', '4A', '6A']

function cellOpacityClass(value: number, color: string): string {
  const pct = Math.round(value)
  if (pct >= 100) return `${color} border border-white/20`
  if (pct >= 80) return `${color}/90`
  if (pct >= 60) return `${color}/60`
  if (pct >= 40) return `${color}/50`
  if (pct >= 25) return `${color}/30`
  if (pct >= 15) return `${color}/20`
  if (pct >= 8)  return `${color}/10`
  return `${color}/5`
}

export function HourlyTrafficChart({ rows }: HourlyTrafficChartProps) {
  return (
    <div className="lg:col-span-2 bg-card-dark p-8 rounded-xl border border-white/5 shadow-2xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-lg font-bold text-white">Hourly Traffic Density</h3>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Performance across channels</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-sm bg-primary" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Web (64%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-sm bg-accent-green" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">WhatsApp (36%)</span>
          </div>
        </div>
      </div>

      {/* Time labels */}
      <div className="grid grid-cols-12 gap-1.5 text-[9px] font-bold text-slate-500 mb-3 uppercase tracking-widest text-center">
        {timeLabels.map((t) => <div key={t}>{t}</div>)}
      </div>

      {/* Heatmap rows */}
      <div className="space-y-5 flex-1 flex flex-col justify-center">
        {rows.map((row) => (
          <div key={row.channel} className="flex items-center gap-5">
            <span className="text-[10px] font-bold text-slate-400 w-20 uppercase tracking-tight">
              {row.channel}
            </span>
            <div className="flex-1 flex gap-1 h-12">
              {row.cells.map((val, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${cellOpacityClass(val, row.color)}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Peak note */}
      <div className="mt-8 flex items-center justify-center">
        <div className="bg-white/5 border border-white/10 px-6 py-2.5 rounded-full">
          <p className="text-[11px] text-slate-300 font-medium italic">
            <span className="text-primary font-bold uppercase mr-1.5">Peak Performance:</span>
            Observed between <span className="text-white font-bold">4 PM and 8 PM</span> local time.
          </p>
        </div>
      </div>
    </div>
  )
}
