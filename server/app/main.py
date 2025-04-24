from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .core.database import engine
from .dependencies import get_db
from .models.client import Client
from .core.database import Base

# Initialize FastAPI application
app = FastAPI(
    title="Health Information System API",
    description="API for managing health information data",
    version="1.0.0"
)

def initialize_database():
    """Initialize database tables on application startup."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully.")

@app.on_event("startup")
async def startup_event():
    """Initialize application services on startup."""
    initialize_database()

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint that returns a welcome message."""
    return {
        "message": "Welcome to the Health Information System API",
        "documentation": "/docs",
        "status": "operational"
    }

@app.get("/health", tags=["Status"])
async def health_check():
    """Basic health check endpoint."""
    return {"status": "healthy"}

@app.get("/test-db", tags=["Database"])
async def test_database_connection(db: Session = Depends(get_db)):
    """
    Test database connection and verify basic functionality.
    
    Returns:
        - Success message with first client ID if exists
        - Success message if table is empty
        - Error message if connection fails
    """
    try:
        first_client = db.query(Client).first()
        
        if first_client:
            return {
                "status": "success",
                "message": "Database connection successful",
                "data": {"first_client_id": first_client.id}
            }
        return {
            "status": "success",
            "message": "Database connection successful (empty table)"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": "Database connection failed",
                "error": str(e)
            }
        )