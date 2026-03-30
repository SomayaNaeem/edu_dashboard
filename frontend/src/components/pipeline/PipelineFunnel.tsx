import { PipelineStage } from '../../types/dashboard.types'
import { useSettings } from '../../context/SettingsContext'

interface PipelineFunnelProps {
  stages: PipelineStage[]
  avgTimeToEnroll: string
  pipelineVelocity: string
}

const opacityMap: Record<number, string> = {
  0: 'opacity-80',
  1: 'opacity-60',
  2: 'opacity-40',
}

export function PipelineFunnel({ stages, avgTimeToEnroll, pipelineVelocity }: PipelineFunnelProps) {
  const { settings } = useSettings()

  return (
    <div className="lg:col-span-2 bg-card-dark p-8 rounded-xl border border-white/5 shadow-2xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-lg font-bold text-white">Enrollment Pipeline</h3>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Stage-to-Stage Conversion</p>
          </div>
          <div className="px-3 py-1 bg-accent-orange/10 border border-accent-orange/30 rounded text-[10px] font-bold text-accent-orange flex items-center gap-2">
            <span className="material-symbols-outlined text-xs">warning</span>
            LEAKAGE POINT: {settings.leakageAlertStage.toUpperCase()}
          </div>
        </div>

        <div className="space-y-6">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex items-center group">
              <span className="text-[11px] font-bold text-slate-400 uppercase w-32 shrink-0 group-hover:text-primary transition-colors">
                {stage.label}
              </span>
              <div className="flex-1 h-12 bg-white/5 rounded-l-lg border-y border-l border-white/10 relative overflow-hidden flex items-center px-4">
                <div
                  className={`bg-primary h-full absolute left-0 top-0 ${opacityMap[i] ?? 'opacity-40'}`}
                  style={{ width: `${stage.pct}%` }}
                />
                <span
                  className={`relative z-10 font-bold text-xs uppercase tracking-tight ${
                    i === 0 ? 'text-background-dark' : 'text-white'
                  }`}
                >
                  {stage.value.toLocaleString()} Leads
                </span>
              </div>
              <div className="w-24 text-center">
                {stage.conv ? (
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-accent-orange">{stage.conv}</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase">Conv.</span>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-slate-600">—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-8">
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Avg Time to Enroll</p>
            <p className="text-lg font-bold text-white">{avgTimeToEnroll}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
              Target: {settings.avgTimeToEnrollTargetDays}d
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Pipeline Velocity</p>
            <p className="text-lg font-bold text-white">{pipelineVelocity}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
              Target: +{settings.pipelineVelocityTarget}%
            </p>
          </div>
        </div>
        <div className="flex -space-x-2">
          <div className="size-7 rounded-full border-2 border-card-dark bg-slate-800" />
          <div className="size-7 rounded-full border-2 border-card-dark bg-slate-700" />
          <div className="size-7 rounded-full border-2 border-card-dark bg-slate-600 flex items-center justify-center text-[8px] font-bold">
            +15
          </div>
        </div>
      </div>
    </div>
  )
}
