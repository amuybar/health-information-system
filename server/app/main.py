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

    This function creates all tables defined in the SQLAlchemy models
    by calling Base.metadata.create_all(bind=engine). It is intended
    to be called during the FastAPI startup event to ensure the database
    schema is up to date.
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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    """
    FastAPI startup event handler.

    This function is triggered when the FastAPI application starts.
    It initializes the database tables and can be extended to include
    other startup routines as needed.
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
"""Clients router: Handles all endpoints related to client management."""

app.include_router(programs.router, prefix="/api/v1/programs", tags=["Programs"])
"""Programs router: Handles all endpoints related to health programs."""

app.include_router(enrollments.router, prefix="/api/v1/enrollments", tags=["Enrollments"])
"""Enrollments router: Handles all endpoints related to client enrollments in programs."""