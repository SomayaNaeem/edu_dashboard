from pydantic import BaseModel


class PipelineStageSchema(BaseModel):
    label: str
    value: int
    pct: float
    conv: str | None


class PipelineStatsSchema(BaseModel):
    avg_time_to_enroll: str
    pipeline_velocity: str


class PipelineResponse(BaseModel):
    stages: list[PipelineStageSchema]
    stats: PipelineStatsSchema
