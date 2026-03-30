export interface DashboardSettings {
  // KPI targets & benchmarks
  dailyInquiryGoal: number
  applicantBenchmark: number
  qualificationRateAvg: number   // institution avg, %
  enrollmentTarget: number

  // Pipeline
  leakageAlertStage: 'Qualified' | 'Enrolled'
  avgTimeToEnrollTargetDays: number
  maxResponseDelayHours: number
  pipelineVelocityTarget: number  // % growth target

  // Prospect priority thresholds (display %)
  premiumPct: number
  importantPct: number
  moderatePct: number
  lowPriorityPct: number
  coldCasePct: number

  // General preferences
  defaultPeriod: '7d' | '30d'
  defaultCampus: string
  defaultChannel: string
  compareToPriorDefault: boolean
}

export const DEFAULT_SETTINGS: DashboardSettings = {
  dailyInquiryGoal: 140,
  applicantBenchmark: 880,
  qualificationRateAvg: 65,
  enrollmentTarget: 500,

  leakageAlertStage: 'Qualified',
  avgTimeToEnrollTargetDays: 14,
  maxResponseDelayHours: 4,
  pipelineVelocityTarget: 10,

  premiumPct: 12,
  importantPct: 18,
  moderatePct: 25,
  lowPriorityPct: 22,
  coldCasePct: 15,

  defaultPeriod: '7d',
  defaultCampus: 'all',
  defaultChannel: 'all',
  compareToPriorDefault: true,
}
