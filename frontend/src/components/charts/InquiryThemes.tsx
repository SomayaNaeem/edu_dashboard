import { InquiryTopic } from '../../types/dashboard.types'

interface InquiryThemesProps {
  topics: InquiryTopic[]
  aiInsight: string
}

export function InquiryThemes({ topics, aiInsight }: InquiryThemesProps) {
  return (
    <div className="bg-card-dark p-8 rounded-xl border border-white/5 shadow-2xl flex flex-col h-full overflow-hidden">
      <h3 className="text-lg font-bold text-white mb-1">Inquiry Themes</h3>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-8">Top 10 Trending Topics</p>

      <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
        {topics.map((topic) => (
          <div key={topic.label}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`size-2 rounded-full ${topic.color}`} />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">
                  {topic.label}
                </span>
              </div>
              <span className="text-[11px] font-bold text-white">{topic.pct}%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className={`${topic.color} h-full`} style={{ width: `${topic.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight Card */}
      <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/5 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-base">auto_awesome</span>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Insight AI</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400 font-medium">{aiInsight}</p>
      </div>
    </div>
  )
}
