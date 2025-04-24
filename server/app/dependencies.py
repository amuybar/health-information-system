
# Import SessionLocal from your database setup file
from .core.database import SessionLocal

# Define a dependency function to get a database session.
# This function will be used with FastAPI's Depends().
# It creates a new database session for each request,
# and ensures the session is closed after the request is finished,
# even if errors occur.
def get_db():
    """
    Dependency function that provides a database session.

    Yields:
        sqlalchemy.orm.Session: A database session object.
    """
    # Create a new database session instance
    db = SessionLocal()
    try:
        # Yield the session to the endpoint function.
        # The code after yield will run after the response is sent
        # or if an exception occurs.
        yield db
    finally:
        # Ensure the database session is closed after the request.
        # This releases the connection back to the connection pool.
        db.close()

