# type: ignore
from fastapi import FastAPI
from sqlalchemy.orm import Session
from .core.database import engine, Base
from app.api.v1.endpoints import clients, programs, enrollments
import logging
from fastapi.middleware.cors import CORSMiddleware

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def initialize_database():
    """
    Initialize database tables on application startup.
    Ensures all tables defined in SQLAlchemy models are created.
    """
    logger.info("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created successfully.")

# Initialize FastAPI application with metadata for documentation
app = FastAPI(
    title="Health Information System API",
    description="API for managing health information data",
    version="1.0.0",
    openapi_tags=[
        {"name": "Clients", "description": "Manage client data"},
        {"name": "Programs", "description": "Manage health programs"},
        {"name": "Enrollments", "description": "Client enrollment in programs"},
        {"name": "Status", "description": "Health/status checks"}
    ]
)

# Configure CORS middleware to allow requests from specified origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:5173", 
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    """
    FastAPI startup event handler.
    Initializes database tables and other startup routines.
    """
    initialize_database()

@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint that returns a welcome message and API status.

    Returns:
        dict: Welcome message, documentation link, and status.
    """
    return {
        "message": "Welcome to the Health Information System API",
        "documentation": "/docs",
        "status": "operational"
    }


# Include API routers for versioned endpoints

app.include_router(clients.router, prefix="/api/v1/clients", tags=["Clients"])

app.include_router(programs.router, prefix="/api/v1/programs", tags=["Programs"])

app.include_router(enrollments.router, prefix="/api/v1/enrollments", tags=["Enrollments"])