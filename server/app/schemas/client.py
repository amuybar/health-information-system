# type: ignore
from pydantic import BaseModel, EmailStr 
from uuid import UUID
from datetime import datetime
from typing import List, Optional
from .program import ProgramOut


class ClientBase(BaseModel):
    """
    Base schema for a client.

    Attributes:
        full_name (str): Full name of the client.
        age (int): Age of the client.
        gender (str): Gender of the client.
        email (EmailStr): Email address of the client.
        phone_number (Optional[str]): Phone number of the client.
        address (Optional[str]): Address of the client.
        notes (Optional[str]): Additional notes.
        status (str): Status of the client.
    """
    full_name: str
    age: int
    gender: str
    email: EmailStr
    phone_number: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None
    status: str = "active"

class ClientCreate(ClientBase):
    """
    Schema for creating a new client.
    Inherits all fields from ClientBase.
    """
    pass

class ClientOut(ClientBase):
    """
    Schema for returning client data.

    Attributes:
        id (UUID): Unique identifier for the client.
        created_at (datetime): Timestamp when the client was created.
        enrolled_programs (Optional[List[ProgramOut]]): List of programs the client is enrolled in.
    """
    id: UUID
    created_at: datetime
    enrolled_programs: Optional[List[ProgramOut]] = []

    class Config:
        orm_mode = True  # Enables compatibility with ORM objects