"""KPI service — returns mock data until a real DB is connected."""
from app.schemas.kpis import KpiItem, KpiResponse

MOCK_KPIS = [
    KpiItem(label="Total Inquiries",    value="1,284", trend=12.5,  trend_label="vs last 7d", icon="forum",                accent_color="primary",        subtext="Today: 156 · Goal: 140"),
    KpiItem(label="Unique Applicants",  value="856",   trend=-2.1,  trend_label="vs last 7d", icon="person_search",        accent_color="accent-blue",    subtext="Benchmark: 880"),
    KpiItem(label="Qualified Prospects",value="78% Rate", trend=5.4, trend_label="vs last 7d", icon="verified",            accent_color="accent-purple",  subtext="Institution Avg: 65%"),
    KpiItem(label="Final Enrolled",     value="412",   trend=18.2,  trend_label="vs last 7d", icon="assignment_turned_in", accent_color="accent-mint",    subtext="Target: 500 (82%)"),
]


async def fetch(campus: str, period: str) -> KpiResponse:
    # TODO: replace with real DB query filtered by campus/period
    return KpiResponse(kpis=MOCK_KPIS)
