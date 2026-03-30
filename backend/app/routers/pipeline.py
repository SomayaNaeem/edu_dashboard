from datetime import datetime
from typing import Literal
from fastapi import APIRouter, Query
from app.schemas.kpis import ApiResponse, ResponseMeta
from app.schemas.pipeline import PipelineResponse
from app.services import pipeline_service

router = APIRouter(prefix="/pipeline", tags=["pipeline"])


@router.get("", response_model=ApiResponse[PipelineResponse])
async def get_pipeline(
    campus: str = Query("all"),
    period: Literal["7d", "30d"] = Query("7d"),
) -> ApiResponse[PipelineResponse]:
    data = await pipeline_service.fetch(campus=campus, period=period)
    return ApiResponse(
        data=data,
        meta=ResponseMeta(generated_at=datetime.utcnow(), filters={"campus": campus, "period": period}),
    )
