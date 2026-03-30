from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from app.config import settings
from app.routers import kpis, pipeline, topics, insights, dashboard

app = FastAPI(
    title="EduAdmin AI — Executive Dashboard API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError) -> JSONResponse:
    return JSONResponse(status_code=422, content={"detail": exc.errors()})


# Routers
API_PREFIX = "/api/v1"
app.include_router(dashboard.router, prefix=API_PREFIX)
app.include_router(kpis.router,      prefix=API_PREFIX)
app.include_router(pipeline.router,  prefix=API_PREFIX)
app.include_router(topics.router,    prefix=API_PREFIX)
app.include_router(insights.router,  prefix=API_PREFIX)


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok"}
