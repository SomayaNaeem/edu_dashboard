"""Pipeline service — returns mock data until a real DB is connected."""
from app.schemas.pipeline import PipelineStageSchema, PipelineStatsSchema, PipelineResponse


async def fetch(campus: str, period: str) -> PipelineResponse:
    stages = [
        PipelineStageSchema(label="Inquiries", value=1284, pct=100, conv=None),
        PipelineStageSchema(label="Qualified",  value=873,  pct=68,  conv="68%"),
        PipelineStageSchema(label="Enrolled",   value=539,  pct=42,  conv="42%"),
    ]
    stats = PipelineStatsSchema(avg_time_to_enroll="14.2 Days", pipeline_velocity="+12%")
    return PipelineResponse(stages=stages, stats=stats)
