import { useFilters } from '../../context/FilterContext'

interface HeaderProps {
  onOpenDatePicker: () => void
}

export function Header({ onOpenDatePicker }: HeaderProps) {
  const { filters, setPeriod, setCampus, setChannel } = useFilters()

  return (
    <header className="h-auto border-b border-white/10 bg-background-dark/95 backdrop-blur-md flex flex-col px-8 pt-6 pb-4 shrink-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white">Executive Overview</h2>
          <p className="text-sm text-slate-400 font-medium">Monitoring Enrollment Pipeline Performance</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period toggle */}
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setPeriod('7d')}
              className={`px-4 py-1.5 text-xs font-bold rounded transition-all ${
                filters.period === '7d'
                  ? 'bg-primary text-background-dark shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setPeriod('30d')}
              className={`px-4 py-1.5 text-xs font-bold rounded transition-all ${
                filters.period === '30d'
                  ? 'bg-primary text-background-dark shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Last 30 Days
            </button>
          </div>

          {/* Date picker trigger */}
          <button
            onClick={onOpenDatePicker}
            className="size-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-white/10"
            title="Select Date Range"
          >
            <span className="material-symbols-outlined text-xl">tune</span>
          </button>
        </div>
      </div>

      {/* Utility / Filter Bar */}
      <div className="flex items-center gap-6 py-3 border-t border-white/5">
        {/* Campus filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Campus:</span>
          <select
            value={filters.campus}
            onChange={(e) => setCampus(e.target.value)}
            className="bg-transparent border-none text-xs font-bold text-slate-200 p-0 pr-6 focus:ring-0 cursor-pointer"
          >
            <option className="bg-card-dark" value="all">Main Campus (All)</option>
            <option className="bg-card-dark" value="west">West Wing</option>
            <option className="bg-card-dark" value="intl">International School</option>
          </select>
        </div>

        {/* Channel filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Channel:</span>
          <select
            value={filters.channel}
            onChange={(e) => setChannel(e.target.value)}
            className="bg-transparent border-none text-xs font-bold text-slate-200 p-0 pr-6 focus:ring-0 cursor-pointer"
          >
            <option className="bg-card-dark" value="all">All Channels</option>
            <option className="bg-card-dark" value="whatsapp">WhatsApp Only</option>
            <option className="bg-card-dark" value="web">Web Widget</option>
          </select>
        </div>

        {/* Compare to prior toggle */}
        <div className="flex items-center gap-3 ml-auto">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Compare to Prior:</span>
            <div className="relative inline-flex items-center">
              <input defaultChecked type="checkbox" className="sr-only peer" />
              <div className="w-8 h-4 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary" />
            </div>
          </label>
        </div>
      </div>
    </header>
  )
}
