from pydantic import BaseModel
from typing import Generic, TypeVar
from datetime import datetime

T = TypeVar("T")


class ResponseMeta(BaseModel):
    generated_at: datetime
    filters: dict


class ApiResponse(BaseModel, Generic[T]):
    data: T
    meta: ResponseMeta


class KpiItem(BaseModel):
    label: str
    value: str | int
    trend: float
    trend_label: str
    icon: str
    accent_color: str
    subtext: str


class KpiResponse(BaseModel):
    kpis: list[KpiItem]
