from pydantic import BaseModel


class InquiryTopicSchema(BaseModel):
    label: str
    pct: float
    color: str


class ProspectPrioritySchema(BaseModel):
    label: str
    pct: float
    color: str
    tooltip: str


class TrafficRowSchema(BaseModel):
    channel: str
    color: str
    cells: list[float]


class TopicsResponse(BaseModel):
    inquiry_topics: list[InquiryTopicSchema]
    prospect_priority: list[ProspectPrioritySchema]
    traffic: list[TrafficRowSchema]
