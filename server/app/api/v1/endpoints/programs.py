from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.schemas.program import ProgramCreate, ProgramOut
from app.crud import program as program_crud
from app.dependencies import get_db

router = APIRouter()

@router.post("/", response_model=ProgramOut)
def create_program(program: ProgramCreate, db: Session = Depends(get_db)):
    """
    API endpoint to create a new program.

    Args:
        program (ProgramCreate): Data for the new program.
        db (Session): Database session (provided by dependency injection).

    Returns:
        ProgramOut: The newly created program record.
    """
    return program_crud.create_program(db, program)

@router.get("/", response_model=List[ProgramOut])
def get_programs(db: Session = Depends(get_db)):
    """
    API endpoint to retrieve all programs.

    Args:
        db (Session): Database session (provided by dependency injection).

    Returns:
        List[ProgramOut]: List of all program records.
    """
    return program_crud.get_all_programs(db)