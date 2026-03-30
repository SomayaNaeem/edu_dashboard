export interface KpiData {
  label: string
  value: string | number
  trend: number
  trendLabel: string
  icon: string
  accentColor: string
  subtext: string
}

export interface PipelineStage {
  label: string
  value: number
  pct: number
  conv: string | null
}

export interface ProspectPriorityItem {
  label: string
  pct: number
  color: string
  tooltip: string
}

export interface InquiryTopic {
  label: string
  pct: number
  color: string
}

export interface TrafficRow {
  channel: string
  color: string
  cells: number[]
}

export interface InsightItem {
  type: 'growth' | 'alert'
  title: string
  body: string
  highlight: string
}

export interface DashboardFilters {
  campus: string
  channel: string
  period: '7d' | '30d'
  dateFrom?: string
  dateTo?: string
}

export interface DashboardData {
  kpis: KpiData[]
  pipeline: PipelineStage[]
  prospectPriority: ProspectPriorityItem[]
  inquiryTopics: InquiryTopic[]
  traffic: TrafficRow[]
  insights: InsightItem[]
  aiInsight: string
  pipelineStats: {
    avgTimeToEnroll: string
    pipelineVelocity: string
  }
}
