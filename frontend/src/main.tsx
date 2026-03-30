import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterProvider } from './context/FilterContext'
import { SettingsProvider } from './context/SettingsContext'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </SettingsProvider>
    </QueryClientProvider>
  </StrictMode>
)
