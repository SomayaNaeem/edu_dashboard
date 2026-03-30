# EduAdmin AI — Executive Dashboard

A school enrollment analytics platform for executive users. The dashboard visualizes the full admission pipeline (Inquiries → Qualified → Enrolled), KPI cards, chatbot topic breakdowns, prospect priority scoring, and AI-generated insights — all in a dark-themed, real-time UI.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Reference](#api-reference)
- [Settings & Configuration](#settings--configuration)
- [Git Flow](#git-flow)

---

## Overview

EduAdmin AI gives school executives a live view of their enrollment funnel. It connects to a chatbot backend (WhatsApp + Web Widget) and surfaces:

- How many students are inquiring, qualifying, and enrolling
- Where the biggest drop-off in the pipeline is
- Which inquiry topics are trending
- When peak traffic hours occur across channels
- AI-generated commentary on anomalies and opportunities

All dashboard configurations (goals, benchmarks, thresholds) are editable from the **Settings** page and reflected immediately across all charts and KPI cards.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, TypeScript |
| **Styling** | Tailwind CSS v3 |
| **Charts** | Recharts |
| **State / Server state** | React Context + `@tanstack/react-query` |
| **HTTP client** | Axios |
| **Icons** | Material Symbols Outlined (Google Fonts CDN) |
| **Font** | Space Grotesk (Google Fonts CDN) |
| **Backend** | Python 3.11, FastAPI |
| **Validation** | Pydantic v2 |
| **Config** | pydantic-settings |
| **Testing** | Vitest (frontend), pytest + httpx (backend) |

---

## Project Structure

```
edu_dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI app, CORS, router registration
│   │   ├── config.py                # pydantic-settings (reads .env)
│   │   ├── routers/
│   │   │   ├── dashboard.py         # GET /api/v1/dashboard  (aggregates all)
│   │   │   ├── kpis.py              # GET /api/v1/kpis
│   │   │   ├── pipeline.py          # GET /api/v1/pipeline
│   │   │   ├── topics.py            # GET /api/v1/topics
│   │   │   └── insights.py          # GET /api/v1/insights
│   │   ├── schemas/                 # Pydantic v2 request/response models
│   │   │   ├── dashboard.py
│   │   │   ├── kpis.py
│   │   │   ├── pipeline.py
│   │   │   ├── topics.py
│   │   │   └── insights.py
│   │   └── services/                # Business logic (DB-ready stubs)
│   │       ├── kpi_service.py
│   │       ├── pipeline_service.py
│   │       ├── topics_service.py
│   │       └── insights_service.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── main.tsx                 # React root — QueryClient + providers
│       ├── App.tsx                  # Page router (Dashboard / Settings)
│       ├── index.css                # Tailwind base, custom scrollbar
│       ├── api/
│       │   └── dashboardApi.ts      # Axios client functions
│       ├── context/
│       │   ├── FilterContext.tsx    # Campus, channel, period, date range
│       │   └── SettingsContext.tsx  # Dashboard config (localStorage)
│       ├── hooks/
│       │   └── useDashboardData.ts  # React Query hook + mock data fallback
│       ├── types/
│       │   ├── dashboard.types.ts
│       │   └── settings.types.ts
│       ├── pages/
│       │   └── SettingsPage.tsx     # Config form with live preview
│       └── components/
│           ├── layout/
│           │   ├── Sidebar.tsx      # Nav + user profile
│           │   └── Header.tsx       # Period toggle, filters, date picker
│           ├── kpis/
│           │   ├── KpiCard.tsx      # Single metric card
│           │   └── KpiGrid.tsx      # 4-column responsive grid
│           ├── pipeline/
│           │   └── PipelineFunnel.tsx
│           ├── charts/
│           │   ├── ProspectPriority.tsx
│           │   ├── HourlyTrafficChart.tsx
│           │   └── InquiryThemes.tsx
│           ├── insights/
│           │   └── InsightStrip.tsx
│           └── ui/
│               └── DatePickerModal.tsx
│
├── docker-compose.yml
├── CLAUDE.md                        # AI-assisted development guide
└── Executive Dashboard.html         # Original HTML prototype
```

---

## Design System

### Color Tokens

```js
// tailwind.config.js
colors: {
  primary:              '#2FEAFF',  // Cyan — active states, highlights
  'accent-purple':      '#8000FF',
  'accent-blue':        '#3980FF',
  'accent-indigo':      '#5957FD',
  'accent-pink':        '#FD33FF',
  'accent-green':       '#A3FF12',
  'accent-orange':      '#FF5A36',  // Alerts / warnings
  'accent-light-purple':'#9C6BFF',
  'accent-mint':        '#C8FFE0',
  'background-dark':    '#000044',  // Page background
  'card-dark':          '#06065c',  // Card background
}
```

### Typography

- Font family: **Space Grotesk** (via Google Fonts)
- Page title: `text-2xl font-bold text-white`
- Card metric: `text-3xl font-bold text-white`
- Section label: `text-[10px] font-bold uppercase tracking-widest`
- Body: `text-sm font-medium text-slate-200`
- Muted: `text-slate-400` / `text-slate-500`

### Cards

```
bg-card-dark p-6 rounded-xl border border-white/5 shadow-2xl
```

---

## Features

### Dashboard Page

| Section | Description |
|---|---|
| **Executive Insight Strip** | Two AI-generated banners — one growth highlight, one pipeline alert |
| **KPI Cards** | Total Inquiries, Unique Applicants, Qualified Prospects, Final Enrolled — each with trend badge and contextual subtext |
| **Enrollment Pipeline Funnel** | Three-stage horizontal bar funnel (Inquiries → Qualified → Enrolled) with conversion rates, leakage alert badge, avg time-to-enroll, and pipeline velocity |
| **Prospect Priority Chart** | Horizontal progress bars for 6 priority tiers (Premium → Not Scored) with hover tooltips |
| **Hourly Traffic Heatmap** | Grid heatmap showing Website vs WhatsApp activity across 12 time slots with peak hours callout |
| **Inquiry Themes** | Top 10 chatbot topic breakdown with percentage bars and AI insight card |
| **Date Picker Modal** | Custom date range selector with Today / Yesterday / This Month presets, Escape-to-close |
| **Filter Bar** | Campus filter, Channel filter, period toggle (7d / 30d), Compare to Prior toggle |

### Settings Page

All values are persisted to `localStorage` and immediately reflected in the dashboard on save.

| Section | Configurable Fields |
|---|---|
| **KPI Targets & Benchmarks** | Daily Inquiry Goal, Unique Applicants Benchmark, Institution Qualification Avg, Enrollment Target |
| **Pipeline Configuration** | Leakage Alert Stage, Avg Time-to-Enroll Target (days), Max Response Delay (hours), Pipeline Velocity Target (%) |
| **Prospect Priority Thresholds** | Slider for each tier: Premium, Important, Moderate, Low Priority, Cold Case |
| **General Preferences** | Default Period, Default Campus, Default Channel, Compare to Prior default |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Git

### Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build → frontend/dist/
npm run lint       # ESLint + TypeScript check
npm run test       # Vitest unit tests
```

> The frontend renders immediately using **built-in mock data** even without the backend running. All charts and KPI cards are fully functional offline.

### Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and OPENAI_API_KEY

# Start development server
uvicorn app.main:app --reload --port 8000
```

API docs available at `http://localhost:8000/api/docs` (Swagger UI).

### Docker (both services)

```bash
docker-compose up --build
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

---

## API Reference

All endpoints live under `/api/v1/`. Every response uses the envelope:

```json
{
  "data": { ... },
  "meta": {
    "generated_at": "2026-03-30T10:00:00",
    "filters": { "campus": "all", "period": "7d" }
  }
}
```

### `GET /api/v1/dashboard`

Aggregates all four data sources in a single request (uses `asyncio.gather` internally).

| Query param | Type | Default | Description |
|---|---|---|---|
| `campus` | string | `all` | `all`, `west`, `intl` |
| `channel` | string | `all` | `all`, `whatsapp`, `web` |
| `period` | `7d` \| `30d` | `7d` | Reporting window |

### `GET /api/v1/kpis`

Returns the 4 KPI card values with trends.

### `GET /api/v1/pipeline`

Returns funnel stages, conversion rates, and pipeline stats.

### `GET /api/v1/topics`

Returns inquiry themes, prospect priority tiers, and hourly traffic data.

### `GET /api/v1/insights`

Returns the insight strip items and the AI insight string.

### `GET /api/health`

Returns `{ "status": "ok" }`.

---

## Settings & Configuration

### Environment Variables (backend)

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/eduadmin
OPENAI_API_KEY=sk-...
CORS_ORIGINS=["http://localhost:5173"]
```

> Never commit `.env`. Only `.env.example` is tracked.

### Dashboard Settings (frontend)

Settings are stored in `localStorage` under the key `eduadmin_settings`. They are loaded on app boot and merged with defaults, so adding new settings fields is always backwards-compatible.

---

## Git Flow

```
main
 └─ develop
     ├─ feature/BE-001-kpi-endpoint
     ├─ feature/FE-012-pipeline-funnel
     ├─ fix/FE-009-modal-esc-key
     └─ docs/add-readme
```

### Branch naming

```
<type>/<ticket-id>-<short-description>

Types: feature | fix | chore | refactor | docs | test
```

### Commit messages (Conventional Commits)

```
feat(kpis): add campus filter to /api/v1/kpis endpoint
fix(modal): close date picker on Escape key press
docs(readme): add full project documentation
```

### Pull Request rules

1. Never push directly to `main` — always PR through `develop`
2. Require at least 1 review before merging to `develop`; 2 reviews for `main`
3. All CI checks (lint + tests) must pass
4. Squash-merge feature branches; merge commit for `develop → main`
