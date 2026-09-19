from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.config import settings
from backend.app.routes import employees, hr, roles, learning, ai

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for AI-Powered Talent Discovery & Internal Career Mobility Platform",
    version="1.0.0"
)

# Configure CORS for React frontend (default http://localhost:5173)
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]
if "*" not in origins and "http://localhost:5173" not in origins:
    origins.append("http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if "*" in origins else origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(employees.router)
app.include_router(hr.router)
app.include_router(roles.router)
app.include_router(learning.router)
app.include_router(ai.router)

@app.get("/health", tags=["System Health"])
def health_check():
    """Health check endpoint to verify backend operational state."""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "database_status": "connected" if settings.SUPABASE_URL and "your-supabase" not in settings.SUPABASE_URL else "fallback_local_dataset"
    }

@app.get("/", tags=["System Health"])
def root():
    return {
        "message": "Welcome to AI-Powered Talent Discovery Platform API",
        "docs_url": "/docs",
        "health_check": "/health"
    }
