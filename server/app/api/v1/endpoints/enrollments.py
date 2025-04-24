from uuid import UUID
from fastapi import APIRouter, Depends
from app.schemas.program import ProgramOut
from sqlalchemy.orm import Session
from app.schemas.client import ClientOut
from app.schemas.enrollment import EnrollmentCreate, EnrollmentOut
from app.crud import enrollment as enrollment_crud
from app.dependencies import get_db

router = APIRouter()


@router.post("/", response_model=EnrollmentOut)
def enroll_client(
    enrollment: EnrollmentCreate,
    db: Session = Depends(get_db)
) -> EnrollmentOut:
    """
    Enroll a client in a program.

    Args:
        enrollment (EnrollmentCreate): Enrollment data containing client_id and program_id.
        db (Session): Database session (provided by dependency injection).

    Returns:
        EnrollmentOut: The newly created enrollment record.
    """
    return enrollment_crud.enroll_client_in_program(db, enrollment)


@router.get("/clients/{client_id}/programs", response_model=list[ProgramOut])
def get_programs_for_client(
    client_id: UUID,
    db: Session = Depends(get_db)
) -> list[ProgramOut]:
    """
    Retrieve all programs for a specific client.

    Args:
        client_id (UUID): Unique identifier of the client.
        db (Session): Database session (provided by dependency injection).

    Returns:
        list: List of programs the client is enrolled in.
    """
    return enrollment_crud.get_programs_for_client(db, client_id)


@router.get("/programs/{program_id}/clients", response_model=list[ClientOut])
def get_clients_in_program(
    program_id: UUID,
    db: Session = Depends(get_db)
) -> list[ClientOut]:
    """
    Retrieve all clients enrolled in a specific program.

    Args:
        program_id (UUID): Unique identifier of the program.
        db (Session): Database session (provided by dependency injection).

    Returns:
        list[ClientOut]: List of clients enrolled in the program.
    """
    return enrollment_crud.get_clients_in_program(db, program_id)