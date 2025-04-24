#type: ignore
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class ProgramBase(BaseModel):
    """
    Base schema for a program.

    Attributes:
        name (str): Name of the program.
        description (Optional[str]): Description of the program.
        start_date (datetime): Start date of the program.
        end_date (Optional[datetime]): End date of the program.
    """
    name: str
    description: Optional[str] = None
    end_date: Optional[datetime] = None

class ProgramCreate(ProgramBase):
    """
    Schema for creating a new program.
    Inherits all fields from ProgramBase.
    """
    pass

class ProgramOut(ProgramBase):
    """
    Schema for returning program data.

    Attributes:
        id (UUID): Unique identifier for the program.
        created_at (datetime): Timestamp when the program was created.
        updated_at (datetime): Timestamp when the program was last updated.
    """
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True  # Enables compatibility with ORM objects