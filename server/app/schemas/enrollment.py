#type: ignore
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class EnrollmentCreate(BaseModel):
    """
    Schema for creating a new enrollment.

    Attributes:
        client_id (UUID): Unique identifier of the client to enroll.
        program_id (UUID): Unique identifier of the program to enroll the client in.
    """
    client_id: UUID
    program_id: UUID

class EnrollmentOut(BaseModel):
    """
    Schema for returning enrollment data.

    Attributes:
        id (UUID): Unique identifier for the enrollment record.
        client_id (UUID): Unique identifier of the enrolled client.
        program_id (UUID): Unique identifier of the program.
        enrolled_at (datetime): Timestamp when the enrollment was created.
    """
    id: UUID
    client_id: UUID
    program_id: UUID
    enrolled_at: datetime

    class Config:
        orm_mode = True  # Enables compatibility with ORM objects