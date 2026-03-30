import { useEffect, useState } from 'react'
import { useFilters } from '../../context/FilterContext'

interface DatePickerModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DatePickerModal({ isOpen, onClose }: DatePickerModalProps) {
  const { setDateRange } = useFilters()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!isOpen) return null

  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split('T')[0]

  function applyPreset(start: string, end: string) {
    setFrom(start)
    setTo(end)
  }

  function handleApply() {
    setDateRange(from, to)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-card-dark border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Select Date Range</h3>
            <p className="text-xs text-slate-400">Choose custom reporting period</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">End Date</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Presets */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => applyPreset(today, today)}
              className="text-[10px] font-bold py-2 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-slate-300 uppercase"
            >
              Today
            </button>
            <button
              onClick={() => applyPreset(yesterday, yesterday)}
              className="text-[10px] font-bold py-2 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-slate-300 uppercase"
            >
              Yesterday
            </button>
            <button
              onClick={() => applyPreset(monthStart, today)}
              className="text-[10px] font-bold py-2 bg-primary/20 text-primary rounded border border-primary/20 uppercase"
            >
              This Month
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white/5 border-t border-white/5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="bg-primary text-background-dark px-6 py-2 rounded-lg font-bold text-xs shadow-lg shadow-primary/10 hover:brightness-110 transition-all"
          >
            Apply Range
          </button>
        </div>
      </div>
    </div>
  )
}
