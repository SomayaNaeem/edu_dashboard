"""Insights service — returns mock data until OpenAI integration is wired."""
from app.schemas.insights import InsightItemSchema, InsightsResponse


async def fetch(campus: str, period: str) -> InsightsResponse:
    insights = [
        InsightItemSchema(
            type="growth",
            title="Key Growth Insight",
            body='Applications are up 18% this week, primarily driven by WhatsApp campaigns in the North region.',
            highlight="up 18%",
        ),
        InsightItemSchema(
            type="alert",
            title="Pipeline Alert",
            body="The biggest drop-off occurs at qualification completion. Average response delay is currently 4.2 hours.",
            highlight="qualification completion",
        ),
    ]
    ai_insight = (
        '"Scholarship" queries spiked 24% after last week\'s email blast. '
        "Priority should be given to these leads."
    )
    return InsightsResponse(insights=insights, ai_insight=ai_insight)
