from datetime import datetime
from typing import Literal
from fastapi import APIRouter, Query
from app.schemas.kpis import ApiResponse, ResponseMeta
from app.schemas.topics import TopicsResponse
from app.services import topics_service

router = APIRouter(prefix="/topics", tags=["topics"])


@router.get("", response_model=ApiResponse[TopicsResponse])
async def get_topics(
    campus: str = Query("all"),
    channel: str = Query("all"),
    period: Literal["7d", "30d"] = Query("7d"),
) -> ApiResponse[TopicsResponse]:
    data = await topics_service.fetch(campus=campus, period=period, channel=channel)
    return ApiResponse(
        data=data,
        meta=ResponseMeta(generated_at=datetime.utcnow(), filters={"campus": campus, "period": period, "channel": channel}),
    )
