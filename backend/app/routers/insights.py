from datetime import datetime
from typing import Literal
from fastapi import APIRouter, Query
from app.schemas.kpis import ApiResponse, ResponseMeta
from app.schemas.insights import InsightsResponse
from app.services import insights_service

router = APIRouter(prefix="/insights", tags=["insights"])


@router.get("", response_model=ApiResponse[InsightsResponse])
async def get_insights(
    campus: str = Query("all"),
    period: Literal["7d", "30d"] = Query("7d"),
) -> ApiResponse[InsightsResponse]:
    data = await insights_service.fetch(campus=campus, period=period)
    return ApiResponse(
        data=data,
        meta=ResponseMeta(generated_at=datetime.utcnow(), filters={"campus": campus, "period": period}),
    )
