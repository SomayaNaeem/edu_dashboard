from datetime import datetime
from typing import Literal
from fastapi import APIRouter, Query
from app.schemas.kpis import ApiResponse, ResponseMeta
from app.schemas.dashboard import DashboardResponse
from app.services import kpi_service, pipeline_service, topics_service, insights_service

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("", response_model=ApiResponse[DashboardResponse])
async def get_dashboard(
    campus: str = Query("all"),
    channel: str = Query("all"),
    period: Literal["7d", "30d"] = Query("7d"),
) -> ApiResponse[DashboardResponse]:
    kpis_data, pipeline_data, topics_data, insights_data = await _fetch_all(campus, channel, period)

    data = DashboardResponse(
        kpis=kpis_data.kpis,
        pipeline=pipeline_data.stages,
        prospect_priority=topics_data.prospect_priority,
        inquiry_topics=topics_data.inquiry_topics,
        traffic=topics_data.traffic,
        insights=insights_data.insights,
        ai_insight=insights_data.ai_insight,
        pipeline_stats=pipeline_data.stats,
    )
    return ApiResponse(
        data=data,
        meta=ResponseMeta(
            generated_at=datetime.utcnow(),
            filters={"campus": campus, "channel": channel, "period": period},
        ),
    )


async def _fetch_all(campus: str, channel: str, period: str):
    import asyncio
    return await asyncio.gather(
        kpi_service.fetch(campus=campus, period=period),
        pipeline_service.fetch(campus=campus, period=period),
        topics_service.fetch(campus=campus, period=period, channel=channel),
        insights_service.fetch(campus=campus, period=period),
    )
