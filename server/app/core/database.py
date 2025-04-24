
# type: ignore

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables from a .env file if it exists.

load_dotenv()

# Retrieve the database URL from environment variables.
# It defaults to a SQLite database file named 'healthinfo.db' in the current directory
# if the DATABASE_URL environment variable is not set.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./healthinfo.db")

# Create the SQLAlchemy engine.
# The engine is the source of database connections.
if DATABASE_URL.startswith("sqlite"):
    # For SQLite, we need to add connect_args={"check_same_thread": False}.
    # This is specific to SQLite and needed because SQLite is single-threaded
    # and by default, SQLAlchemy will prevent concurrent access from different threads,
    # which is common in web applications like FastAPI.
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    # For other databases (like PostgreSQL, MySQL), the default engine creation is fine.
    engine = create_engine(DATABASE_URL)

# Create a configured "SessionLocal" class.
# This sessionmaker will be used to create Session objects.
# autocommit=False: Prevents sessions from automatically committing transactions.
# autoflush=False: Prevents sessions from automatically flushing changes to the database.
# bind=engine: Binds the sessionmaker to the created engine.
# We will instantiate SessionLocal in our dependency to get a database session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a declarative base class.
# This class will be the base for all your SQLAlchemy models (database tables).
# Your model classes will inherit from this Base.
Base = declarative_base()

