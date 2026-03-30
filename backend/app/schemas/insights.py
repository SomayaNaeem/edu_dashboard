from pydantic import BaseModel
from typing import Literal


class InsightItemSchema(BaseModel):
    type: Literal["growth", "alert"]
    title: str
    body: str
    highlight: str


class InsightsResponse(BaseModel):
    insights: list[InsightItemSchema]
    ai_insight: str
