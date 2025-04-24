from typing import List
from sqlalchemy.orm import Session
from app.models.enrollment import Enrollment
from app.models.client import Client  # Ensure this import exists
from app.schemas.enrollment import EnrollmentCreate
from uuid import UUID
from datetime import datetime

def enroll_client_in_program(db: Session, enrollment: EnrollmentCreate) -> Enrollment:
    """
    Enroll a client in a program.

    Args:
        db (Session): Database session.
        enrollment (EnrollmentCreate): Enrollment data containing client_id and program_id.

    Returns:
        Enrollment: The newly created enrollment record.
    """
    db_enrollment = Enrollment(**enrollment.dict(), enrolled_at=datetime.utcnow())
    db.add(db_enrollment)
    db.commit()
    db.refresh(db_enrollment)
    return db_enrollment


def get_enrollments_for_client(db: Session, client_id: UUID) -> List[Enrollment]:
    """
    Retrieve all enrollments for a specific client.

    Args:
        db (Session): Database session.
        client_id (UUID): Unique identifier of the client.

    Returns:
        List[Enrollment]: List of enrollment records for the client.
    """
    return (
        db.query(Enrollment)
        .filter(Enrollment.client_id == client_id)
        .all()
    )


def get_clients_in_program(db: Session, program_id: UUID) -> List[Client]:
    """
    Get all clients enrolled in a specific program.

    Args:
        db (Session): Database session.
        program_id (UUID): Unique identifier of the program.

    Returns:
        List[Client]: List of clients enrolled in the program.
    """
    return (
        db.query(Client)
        .join(Enrollment, Client.id == Enrollment.client_id)
        .filter(Enrollment.program_id == program_id)
        .all()
    )