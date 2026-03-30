from datetime import datetime
from typing import Literal
from fastapi import APIRouter, Query
from app.schemas.kpis import ApiResponse, KpiResponse, ResponseMeta
from app.services import kpi_service

router = APIRouter(prefix="/kpis", tags=["kpis"])


@router.get("", response_model=ApiResponse[KpiResponse])
async def get_kpis(
    campus: str = Query("all"),
    period: Literal["7d", "30d"] = Query("7d"),
) -> ApiResponse[KpiResponse]:
    data = await kpi_service.fetch(campus=campus, period=period)
    return ApiResponse(
        data=data,
        meta=ResponseMeta(generated_at=datetime.utcnow(), filters={"campus": campus, "period": period}),
    )
