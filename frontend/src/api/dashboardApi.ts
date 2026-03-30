import axios from 'axios'
import { DashboardFilters, DashboardData } from '../types/dashboard.types'

const client = axios.create({ baseURL: '/api/v1' })

export async function getDashboardData(filters: DashboardFilters): Promise<DashboardData> {
  const { data } = await client.get('/dashboard', { params: filters })
  return data.data
}

export async function getKpis(filters: DashboardFilters) {
  const { data } = await client.get('/kpis', { params: filters })
  return data.data
}

export async function getPipeline(filters: DashboardFilters) {
  const { data } = await client.get('/pipeline', { params: filters })
  return data.data
}

export async function getTopics(filters: DashboardFilters) {
  const { data } = await client.get('/topics', { params: filters })
  return data.data
}

export async function getInsights(filters: DashboardFilters) {
  const { data } = await client.get('/insights', { params: filters })
  return data.data
}
