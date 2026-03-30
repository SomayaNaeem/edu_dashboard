from pydantic import BaseModel
from app.schemas.kpis import KpiItem
from app.schemas.pipeline import PipelineStageSchema, PipelineStatsSchema
from app.schemas.topics import InquiryTopicSchema, ProspectPrioritySchema, TrafficRowSchema
from app.schemas.insights import InsightItemSchema


class DashboardResponse(BaseModel):
    kpis: list[KpiItem]
    pipeline: list[PipelineStageSchema]
    prospect_priority: list[ProspectPrioritySchema]
    inquiry_topics: list[InquiryTopicSchema]
    traffic: list[TrafficRowSchema]
    insights: list[InsightItemSchema]
    ai_insight: str
    pipeline_stats: PipelineStatsSchema
