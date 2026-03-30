import { createContext, useContext, useState, ReactNode } from 'react'
import { DashboardFilters } from '../types/dashboard.types'

interface FilterContextValue {
  filters: DashboardFilters
  setFilters: (filters: DashboardFilters) => void
  setPeriod: (period: '7d' | '30d') => void
  setCampus: (campus: string) => void
  setChannel: (channel: string) => void
  setDateRange: (from: string, to: string) => void
}

const FilterContext = createContext<FilterContextValue | null>(null)

const defaultFilters: DashboardFilters = {
  campus: 'all',
  channel: 'all',
  period: '7d',
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters)

  const setPeriod = (period: '7d' | '30d') =>
    setFilters((prev) => ({ ...prev, period }))

  const setCampus = (campus: string) =>
    setFilters((prev) => ({ ...prev, campus }))

  const setChannel = (channel: string) =>
    setFilters((prev) => ({ ...prev, channel }))

  const setDateRange = (dateFrom: string, dateTo: string) =>
    setFilters((prev) => ({ ...prev, dateFrom, dateTo }))

  return (
    <FilterContext.Provider
      value={{ filters, setFilters, setPeriod, setCampus, setChannel, setDateRange }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters(): FilterContextValue {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used inside FilterProvider')
  return ctx
}
