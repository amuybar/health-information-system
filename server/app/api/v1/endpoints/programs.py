#type: ignore
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

@router.get("/{program_id}", response_model=ProgramOut)
def get_program(program_id: UUID, db: Session = Depends(get_db)):
    """
    API endpoint to retrieve a program by its unique identifier.

    Args:
        program_id (UUID): Unique identifier of the program.
        db (Session): Database session (provided by dependency injection).

    Returns:
        ProgramOut: The program record if found, else None.
    """
    return program_crud.get_program(db, program_id)

@router.put("/{program_id}", response_model=ProgramOut)
def update_program(program_id: UUID, program: ProgramCreate, db: Session = Depends(get_db)):
    """
    API endpoint to update an existing program.

    Args:
        program_id (UUID): Unique identifier of the program to update.
        program (ProgramCreate): Updated data for the program.
        db (Session): Database session (provided by dependency injection).

    Returns:
        ProgramOut: The updated program record.
    """
    return program_crud.update_program(db, program_id, program)
@router.delete("/{program_id}", response_model=ProgramOut)
def delete_program(program_id: UUID, db: Session = Depends(get_db)):
    """
    API endpoint to delete a program by its unique identifier.

    Args:
        program_id (UUID): Unique identifier of the program to delete.
        db (Session): Database session (provided by dependency injection).

    Returns:
        ProgramOut: The deleted program record.
    """
    return program_crud.delete_program(db, program_id)
