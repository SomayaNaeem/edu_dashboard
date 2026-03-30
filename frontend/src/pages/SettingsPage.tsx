import { useState } from 'react'
import { useSettings } from '../context/SettingsContext'
import { DashboardSettings, DEFAULT_SETTINGS } from '../types/settings.types'

// ─── Reusable field components ────────────────────────────────────────────────

function SectionCard({ title, icon, children }: { title: string; icon: string; children: ReactNode }) {
  return (
    <div className="bg-card-dark p-8 rounded-xl border border-white/5 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        <h3 className="text-base font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

interface FieldProps {
  label: string
  hint?: string
  children: ReactNode
}

function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-start">
      <div>
        <p className="text-sm font-bold text-slate-200">{label}</p>
        {hint && <p className="text-[11px] text-slate-500 mt-0.5">{hint}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  suffix,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  suffix?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
      />
      {suffix && <span className="text-xs text-slate-500 font-bold shrink-0">{suffix}</span>}
    </div>
  )
}

function SelectInput({
  value,
  options,
  onChange,
}: {
  value: string
  options: { label: string; value: string }[]
  onChange: (v: string) => void
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-card-dark">
          {o.label}
        </option>
      ))}
    </select>
  )
}

function ToggleInput({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
    </label>
  )
}

// ─── Types ─────────────────────────────────────────────────────────────────--

import type { ReactNode } from 'react'

// ─── Page ─────────────────────────────────────────────────────────────────---

export function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettings()
  const [draft, setDraft] = useState<DashboardSettings>(settings)
  const [saved, setSaved] = useState(false)

  function set<K extends keyof DashboardSettings>(key: K, value: DashboardSettings[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSave() {
    updateSettings(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleReset() {
    setDraft(DEFAULT_SETTINGS)
    resetSettings()
    setSaved(false)
  }

  const isDirty = JSON.stringify(draft) !== JSON.stringify(settings)

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-background-dark">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-slate-400 font-medium mt-1">
          Configure dashboard targets, benchmarks, and display preferences
        </p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* ── KPI Targets & Benchmarks ─────────────────────────────────── */}
        <SectionCard title="KPI Targets & Benchmarks" icon="track_changes">
          <Field
            label="Daily Inquiry Goal"
            hint="Triggers 'Today' counter color when reached"
          >
            <NumberInput value={draft.dailyInquiryGoal} onChange={(v) => set('dailyInquiryGoal', v)} min={1} suffix="inquiries / day" />
          </Field>

          <Field
            label="Unique Applicants Benchmark"
            hint="Reference line shown on the Unique Applicants KPI card"
          >
            <NumberInput value={draft.applicantBenchmark} onChange={(v) => set('applicantBenchmark', v)} min={1} suffix="applicants" />
          </Field>

          <Field
            label="Institution Qualification Avg"
            hint="Peer average displayed below the Qualified Prospects KPI"
          >
            <NumberInput value={draft.qualificationRateAvg} onChange={(v) => set('qualificationRateAvg', v)} min={0} max={100} suffix="%" />
          </Field>

          <Field
            label="Enrollment Target"
            hint="Annual / period enrollment goal shown on the Enrolled KPI card"
          >
            <NumberInput value={draft.enrollmentTarget} onChange={(v) => set('enrollmentTarget', v)} min={1} suffix="students" />
          </Field>
        </SectionCard>

        {/* ── Pipeline Configuration ───────────────────────────────────── */}
        <SectionCard title="Pipeline Configuration" icon="account_tree">
          <Field
            label="Leakage Alert Stage"
            hint="Stage flagged as the biggest drop-off in the funnel header"
          >
            <SelectInput
              value={draft.leakageAlertStage}
              onChange={(v) => set('leakageAlertStage', v as DashboardSettings['leakageAlertStage'])}
              options={[
                { label: 'Inquiries → Qualified', value: 'Qualified' },
                { label: 'Qualified → Enrolled', value: 'Enrolled' },
              ]}
            />
          </Field>

          <Field
            label="Avg Time-to-Enroll Target"
            hint="Expected days from first inquiry to enrollment confirmation"
          >
            <NumberInput value={draft.avgTimeToEnrollTargetDays} onChange={(v) => set('avgTimeToEnrollTargetDays', v)} min={1} suffix="days" />
          </Field>

          <Field
            label="Max Response Delay"
            hint="Alert fires when avg response delay exceeds this threshold"
          >
            <NumberInput value={draft.maxResponseDelayHours} onChange={(v) => set('maxResponseDelayHours', v)} min={0} suffix="hours" />
          </Field>

          <Field
            label="Pipeline Velocity Target"
            hint="Expected period-over-period growth rate for the pipeline"
          >
            <NumberInput value={draft.pipelineVelocityTarget} onChange={(v) => set('pipelineVelocityTarget', v)} suffix="%" />
          </Field>
        </SectionCard>

        {/* ── Prospect Priority Thresholds ─────────────────────────────── */}
        <SectionCard title="Prospect Priority Thresholds" icon="leaderboard">
          <p className="text-[11px] text-slate-500 -mt-2 mb-2">
            These percentages control where each tier's progress bar sits in the Priority chart. Values are independent display targets.
          </p>

          {(
            [
              { key: 'premiumPct',      label: 'Premium',        color: 'text-accent-pink' },
              { key: 'importantPct',    label: 'Important',      color: 'text-accent-purple' },
              { key: 'moderatePct',     label: 'Moderate',       color: 'text-accent-blue' },
              { key: 'lowPriorityPct',  label: 'Low Priority',   color: 'text-primary' },
              { key: 'coldCasePct',     label: 'Cold Case',      color: 'text-slate-500' },
            ] as const
          ).map(({ key, label, color }) => (
            <Field key={key} label={label}>
              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-bold w-8 text-right ${color}`}>
                  {draft[key]}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={draft[key]}
                  onChange={(e) => set(key, Number(e.target.value))}
                  className="flex-1 accent-primary cursor-pointer"
                />
              </div>
            </Field>
          ))}
        </SectionCard>

        {/* ── General Preferences ──────────────────────────────────────── */}
        <SectionCard title="General Preferences" icon="tune">
          <Field
            label="Default Period"
            hint="Pre-selected period when the dashboard loads"
          >
            <SelectInput
              value={draft.defaultPeriod}
              onChange={(v) => set('defaultPeriod', v as '7d' | '30d')}
              options={[
                { label: 'Last 7 Days', value: '7d' },
                { label: 'Last 30 Days', value: '30d' },
              ]}
            />
          </Field>

          <Field
            label="Default Campus"
            hint="Campus filter applied on initial load"
          >
            <SelectInput
              value={draft.defaultCampus}
              onChange={(v) => set('defaultCampus', v)}
              options={[
                { label: 'Main Campus (All)', value: 'all' },
                { label: 'West Wing', value: 'west' },
                { label: 'International School', value: 'intl' },
              ]}
            />
          </Field>

          <Field
            label="Default Channel"
            hint="Channel filter applied on initial load"
          >
            <SelectInput
              value={draft.defaultChannel}
              onChange={(v) => set('defaultChannel', v)}
              options={[
                { label: 'All Channels', value: 'all' },
                { label: 'WhatsApp Only', value: 'whatsapp' },
                { label: 'Web Widget', value: 'web' },
              ]}
            />
          </Field>

          <Field
            label="Compare to Prior by Default"
            hint="Pre-enable the period comparison toggle"
          >
            <ToggleInput
              checked={draft.compareToPriorDefault}
              onChange={(v) => set('compareToPriorDefault', v)}
            />
          </Field>
        </SectionCard>

        {/* ── Action bar ───────────────────────────────────────────────── */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-accent-orange transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">restart_alt</span>
            Reset to Defaults
          </button>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs font-bold text-accent-green flex items-center gap-1.5 animate-pulse">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Saved
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className="bg-primary text-background-dark px-6 py-2 rounded-lg font-bold text-xs shadow-lg shadow-primary/10 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">save</span>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
