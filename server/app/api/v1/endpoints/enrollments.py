from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.enrollment import EnrollmentCreate, EnrollmentOut
from app.crud import enrollment as enrollment_crud
from app.dependencies import get_db

router = APIRouter()

@router.post("/", response_model=EnrollmentOut)
def enroll_client(enrollment: EnrollmentCreate, db: Session = Depends(get_db)):
    """
    API endpoint to enroll a client in a program.

    Args:
        enrollment (EnrollmentCreate): Enrollment data containing client_id and program_id.
        db (Session): Database session (provided by dependency injection).

    Returns:
        EnrollmentOut: The newly created enrollment record.
    """
    return enrollment_crud.enroll_client_in_program(db, enrollment)