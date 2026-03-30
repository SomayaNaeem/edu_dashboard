import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '../api/dashboardApi'
import { DashboardFilters, DashboardData } from '../types/dashboard.types'

// Fallback mock data so the UI renders without a running backend
const mockData: DashboardData = {
  kpis: [
    {
      label: 'Total Inquiries',
      value: '1,284',
      trend: 12.5,
      trendLabel: 'vs last 7d',
      icon: 'forum',
      accentColor: 'primary',
      subtext: 'Today: 156 · Goal: 140',
    },
    {
      label: 'Unique Applicants',
      value: '856',
      trend: -2.1,
      trendLabel: 'vs last 7d',
      icon: 'person_search',
      accentColor: 'accent-blue',
      subtext: 'Benchmark: 880',
    },
    {
      label: 'Qualified Prospects',
      value: '78% Rate',
      trend: 5.4,
      trendLabel: 'vs last 7d',
      icon: 'verified',
      accentColor: 'accent-purple',
      subtext: 'Institution Avg: 65%',
    },
    {
      label: 'Final Enrolled',
      value: '412',
      trend: 18.2,
      trendLabel: 'vs last 7d',
      icon: 'assignment_turned_in',
      accentColor: 'accent-mint',
      subtext: 'Target: 500 (82%)',
    },
  ],
  pipeline: [
    { label: 'Inquiries', value: 1284, pct: 100, conv: null },
    { label: 'Qualified', value: 873, pct: 68, conv: '68%' },
    { label: 'Enrolled', value: 539, pct: 42, conv: '42%' },
  ],
  prospectPriority: [
    { label: 'Premium', pct: 12, color: 'bg-accent-pink', tooltip: 'Highest value leads with immediate intent and perfect fit profile.' },
    { label: 'Important', pct: 18, color: 'bg-accent-purple', tooltip: 'Strong prospects who have engaged with multiple outreach channels.' },
    { label: 'Moderate', pct: 25, color: 'bg-accent-blue', tooltip: 'Steady interest shown, currently in the regular nurture cycle.' },
    { label: 'Low Priority', pct: 22, color: 'bg-primary', tooltip: 'Informational inquiries with low conversion signal so far.' },
    { label: 'Cold Case', pct: 15, color: 'bg-slate-700', tooltip: 'No activity in over 30 days; requires re-engagement campaign.' },
    { label: 'Not Scored Yet', pct: 8, color: 'bg-accent-orange', tooltip: 'New entries currently being processed by the AI qualification engine.' },
  ],
  inquiryTopics: [
    { label: 'Tuition & Fees', pct: 42, color: 'bg-accent-blue' },
    { label: 'Admission Deadlines', pct: 28, color: 'bg-accent-purple' },
    { label: 'Core Curriculum', pct: 18, color: 'bg-accent-orange' },
    { label: 'Campus Tour Booking', pct: 12, color: 'bg-accent-green' },
    { label: 'Scholarships', pct: 11, color: 'bg-primary' },
    { label: 'Sports & Clubs', pct: 9, color: 'bg-accent-pink' },
    { label: 'International Visa', pct: 7, color: 'bg-accent-mint' },
    { label: 'Housing Options', pct: 6, color: 'bg-accent-light-purple' },
    { label: 'Entrance Exams', pct: 4, color: 'bg-slate-400' },
    { label: 'Placement Support', pct: 3, color: 'bg-white/20' },
  ],
  traffic: [
    { channel: 'Website', color: 'bg-primary', cells: [5, 10, 30, 50, 80, 100, 90, 60, 20, 10, 5, 5] },
    { channel: 'WhatsApp', color: 'bg-accent-green', cells: [5, 10, 20, 40, 70, 100, 100, 60, 30, 10, 5, 5] },
  ],
  insights: [
    {
      type: 'growth',
      title: 'Key Growth Insight',
      body: 'Applications are up 18% this week, primarily driven by WhatsApp campaigns in the North region.',
      highlight: 'up 18%',
    },
    {
      type: 'alert',
      title: 'Pipeline Alert',
      body: 'The biggest drop-off occurs at qualification completion. Average response delay is currently 4.2 hours.',
      highlight: 'qualification completion',
    },
  ],
  aiInsight:
    '"Scholarship" queries spiked 24% after last week\'s email blast. Priority should be given to these leads.',
  pipelineStats: {
    avgTimeToEnroll: '14.2 Days',
    pipelineVelocity: '+12%',
  },
}

export function useDashboardData(filters: DashboardFilters) {
  return useQuery({
    queryKey: ['dashboard', filters],
    queryFn: () => getDashboardData(filters),
    staleTime: 60_000,
    initialData: mockData,
    retry: false,
  })
}
