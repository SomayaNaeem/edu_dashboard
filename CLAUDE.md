# CLAUDE.md — EduAdmin AI Executive Dashboard

> Project context and best practices for AI-assisted development of the **EduAdmin AI Executive Suite** dashboard (Python backend + React frontend).

---

## 🗂️ Project Overview

**EduAdmin AI** is a school enrollment analytics platform for executive users.
The dashboard visualizes the admission pipeline (inquiries → qualified → enrolled), KPIs, chatbot topic breakdowns, and AI-generated insights.

**Stack:**
- **Backend:** Python 3.11 + FastAPI
- **Frontend:** React 18 (Vite) + Tailwind CSS v3
- **Charts:** Recharts (preferred) or Chart.js
- **Icons:** Material Symbols Outlined (Google Fonts CDN)
- **Font:** Space Grotesk (Google Fonts CDN)
- **State management:** React Context + hooks (no Redux unless justified)
- **API communication:** Axios or native `fetch`

---

## 🎨 Design System

### Color Tokens (match the HTML prototype exactly)

```js
// tailwind.config.js
colors: {
  primary:             "#2FEAFF",  // Cyan — active state, highlights
  "accent-purple":     "#8000FF",
  "accent-blue":       "#3980FF",
  "accent-indigo":     "#5957FD",
  "accent-pink":       "#FD33FF",
  "accent-green":      "#A3FF12",
  "accent-orange":     "#FF5A36",  // Alert/warning color
  "accent-light-purple":"#9C6BFF",
  "accent-mint":       "#C8FFE0",
  "background-dark":   "#000044",  // Page background
  "card-dark":         "#06065c",  // Card background
}
```

### Typography

```css
font-family: 'Space Grotesk', sans-serif; /* all text */
```

Use these text-size conventions (Tailwind classes):
- Page title: `text-2xl font-bold text-white`
- Card metric: `text-3xl font-bold text-white`
- Section label: `text-[10px] font-bold uppercase tracking-widest`
- Body: `text-sm font-medium text-slate-200`
- Muted: `text-slate-400` / `text-slate-500`

### Spacing & Borders

- Cards: `bg-card-dark p-6 rounded-xl border border-white/5 shadow-2xl`
- Sidebar: `border-r border-white/10`
- Dividers: `border-t border-white/5`
- Scrollbar: `.custom-scrollbar` — 4px thumb, transparent track, `bg-primary/20` thumb

---

## 📁 Project Structure

```
eduadmin-dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI entrypoint
│   │   ├── routers/
│   │   │   ├── kpis.py         # /api/kpis
│   │   │   ├── pipeline.py     # /api/pipeline
│   │   │   ├── topics.py       # /api/topics
│   │   │   └── insights.py     # /api/insights
│   │   ├── schemas/            # Pydantic models
│   │   ├── services/           # Business logic
│   │   └── db/                 # DB connection & queries
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Sidebar, Header, UtilityBar
│   │   │   ├── kpis/           # KpiCard, KpiGrid
│   │   │   ├── pipeline/       # PipelineFunnel, PipelineStep
│   │   │   ├── charts/         # TopicsBarChart, ProspectPriority
│   │   │   ├── insights/       # InsightStrip, AIInsightCard
│   │   │   └── ui/             # DatePickerModal, Toggle, Select
│   │   ├── hooks/              # useDashboardData, useFilters
│   │   ├── context/            # FilterContext, DateRangeContext
│   │   ├── api/                # API client functions
│   │   ├── types/              # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
│
├── CLAUDE.md                   ← you are here
└── docker-compose.yml
```

---

## 🐍 Python / FastAPI — Best Practices

### API Design

- All routes live under `/api/v1/`
- Use **Pydantic v2** for request/response schemas — always validate input
- Return consistent envelope: `{ "data": ..., "meta": { "generated_at": "...", "filters": {...} } }`
- Raise `HTTPException` with meaningful status codes; never swallow exceptions silently

```python
# ✅ Good
@router.get("/kpis", response_model=KpiResponse)
async def get_kpis(
    campus: str = Query("all"),
    period: Literal["7d", "30d"] = "7d",
    db: AsyncSession = Depends(get_db),
):
    data = await kpi_service.fetch(campus=campus, period=period, db=db)
    return KpiResponse(data=data)

# ❌ Bad — no typing, no dependency injection
@router.get("/kpis")
def get_kpis():
    return {"total_inquiries": 1284}
```

### Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Modules / files | `snake_case` | `kpi_service.py` |
| Classes | `PascalCase` | `KpiResponse` |
| Functions / variables | `snake_case` | `fetch_pipeline_data` |
| Constants | `UPPER_SNAKE` | `DEFAULT_PERIOD = "7d"` |
| Pydantic models | `PascalCase` + noun | `PipelineStageSchema` |

### Environment Variables

Always use `pydantic-settings`:

```python
# app/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    openai_api_key: str
    cors_origins: list[str] = ["http://localhost:5173"]

    class Config:
        env_file = ".env"
```

Never hardcode secrets. Always read from `settings.X`.

### Error Handling

```python
# Use custom exception handlers in main.py
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(status_code=422, content={"detail": exc.errors()})
```

### Testing

- Use `pytest` + `httpx.AsyncClient`
- Aim for ≥ 80% coverage on service layer
- Mock external calls (OpenAI, DB) with `pytest-mock`

```bash
pytest backend/tests/ -v --cov=app --cov-report=term-missing
```

---

## ⚛️ React / TypeScript — Best Practices

### Component Rules

- **Functional components only** — no class components
- **Single responsibility** — one concern per component
- Props via TypeScript interfaces (never `any`)
- Export named components; default export only at route/page level

```tsx
// ✅ Good
interface KpiCardProps {
  label: string;
  value: string | number;
  trend: number;         // percentage, positive = up
  icon: string;          // Material Symbol name
  accentColor?: string;  // Tailwind color class
}

export function KpiCard({ label, value, trend, icon, accentColor = "primary" }: KpiCardProps) { ... }
```

### Styling Rules

- **Tailwind utility classes only** — no inline `style={}` unless truly dynamic (e.g., percentage bar widths)
- Dynamic widths are the **only** acceptable use of `style={{ width: "68%" }}`
- Never mix CSS modules with Tailwind in the same component
- Dark mode is always on (`class="dark"` on `<html>`) — do not add light mode variants

```tsx
// ✅ Acceptable dynamic style
<div className="bg-primary h-full absolute left-0 top-0" style={{ width: `${pct}%` }} />

// ❌ Never do this
<div style={{ backgroundColor: "#2FEAFF", padding: "24px" }} />
```

### State & Data Fetching

- Use custom hooks for all data fetching:

```tsx
// hooks/useDashboardData.ts
export function useDashboardKpis(filters: DashboardFilters) {
  return useQuery({
    queryKey: ["kpis", filters],
    queryFn: () => api.getKpis(filters),
    staleTime: 60_000,
  });
}
```

- Use **React Query** (`@tanstack/react-query`) for server state — no manual `useEffect` + `useState` for API calls
- Filters (campus, channel, date range) live in `FilterContext` — all charts consume from context

### Component File Naming

| Type | Convention | Example |
|---|---|---|
| Component | `PascalCase.tsx` | `KpiCard.tsx` |
| Hook | `camelCase.ts` | `useDashboardData.ts` |
| Context | `PascalCase.tsx` | `FilterContext.tsx` |
| API module | `camelCase.ts` | `dashboardApi.ts` |
| Type file | `camelCase.ts` | `dashboard.types.ts` |

---

## 📊 Dashboard Components — Implementation Notes

### KPI Cards

Each card shows: **icon**, **label**, **big number**, **trend badge** (+/- %, vs prior period), **subtext**.

```tsx
// Trend color logic
const trendColor = trend >= 0 ? "text-accent-green" : "text-accent-orange";
const trendPrefix = trend >= 0 ? "+" : "";
```

### Enrollment Pipeline (Funnel)

- 3 stages: **Inquiries → Qualified → Enrolled**
- Each bar width is a CSS percentage of the widest bar (Inquiries = 100%)
- Show conversion rate between stages
- Highlight the biggest drop-off stage with `accent-orange` warning badge

```tsx
const stages = [
  { label: "Inquiries",  value: 1284, pct: 100,  conv: null },
  { label: "Qualified",  value:  873, pct:  68,   conv: "68%" },
  { label: "Enrolled",   value:  539, pct:  42,   conv: "42%" },
];
```

### Prospect Priority Chart

Horizontal progress bars, each with tooltip on hover. Use `opacity-0 group-hover:opacity-100 transition-all` for tooltips.

### AI Insight Card

Always placed at the bottom of the right-side panel. Style:

```tsx
<div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/5">
  <div className="flex items-center gap-2 mb-2">
    <span className="material-symbols-outlined text-primary text-base">auto_awesome</span>
    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Insight AI</span>
  </div>
  <p className="text-[11px] leading-relaxed text-slate-400 font-medium">{insight}</p>
</div>
```

### Date Picker Modal

- Controlled by a boolean state (`isOpen`)
- Clicking the backdrop or pressing `Escape` closes it
- Preset buttons: Today, Yesterday, This Month
- Always apply backdrop blur: `bg-black/60 backdrop-blur-sm`

---

## 🔄 Git Flow

```
main
 └─ develop
     ├─ feature/BE-001-kpi-endpoint
     ├─ feature/FE-012-pipeline-funnel
     ├─ fix/FE-009-modal-esc-key
     └─ chore/update-deps
```

### Branch Naming

```
<type>/<ticket-id>-<short-description>

Types: feature | fix | chore | refactor | docs | test
```

### Commit Messages (Conventional Commits)

```
feat(kpis): add campus filter to /api/v1/kpis endpoint
fix(modal): close date picker on Escape key press
refactor(pipeline): extract PipelineStep into own component
docs(claude): update color token reference
test(kpis): add coverage for negative trend values
```

### Pull Request Rules

1. **Never push directly to `main`** — always PR through `develop`
2. PR title = commit message format
3. Require at least 1 review before merge to `develop`; 2 reviews for `main`
4. All CI checks (lint + tests) must pass before merge
5. Squash-merge feature branches; merge commit for `develop → main`

### Release Flow

```
develop ──PR──► main  (tag: v1.2.0)
```

Versioning: `MAJOR.MINOR.PATCH` (SemVer).  
Tag on `main` only. Include `CHANGELOG.md` entry in PR.

---

## 🚀 Running the Project

```bash
# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm install
npm run dev          # http://localhost:5173
npm run build        # production build
npm run lint         # ESLint + Prettier check
npm run test         # Vitest unit tests
```

---

## ⚠️ Things Claude Should NOT Do

- Do **not** add light-mode CSS variants — this is always-dark UI
- Do **not** use inline `style={}` except for dynamic percentage widths
- Do **not** use `any` in TypeScript — always type properly
- Do **not** store API keys in frontend code — use backend proxy
- Do **not** commit `.env` files — only commit `.env.example`
- Do **not** create class components in React
- Do **not** bypass the `FilterContext` — all filter state must flow through it
- Do **not** hardcode mock data in production components — use the API hooks
- Do **not** push to `main` directly

*Last updated: auto-generated from `Executive_Dashboard.html` prototype.*
