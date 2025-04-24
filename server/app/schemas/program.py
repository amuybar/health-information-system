#type: ignore
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class ProgramBase(BaseModel):
    """
    Base schema for a program.

    Attributes:
        name (str): Name of the program.
        description (str): Description of the program.
    """
    name: str
    description: str

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
    """
    id: UUID
    created_at: datetime

    class Config:
        orm_mode = True  # Enables compatibility with ORM objects