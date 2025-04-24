from sqlalchemy.orm import Session
from app.models.program import Program
from app.schemas.program import ProgramCreate
from uuid import UUID
from typing import List

def create_program(db: Session, program: ProgramCreate) -> Program:
    """
    Create a new program in the database.

    Args:
        db (Session): Database session.
        program (ProgramCreate): Data for the new program.

    Returns:
        Program: The newly created program record.
    """
    db_program = Program(**program.dict())
    db.add(db_program)
    db.commit()
    db.refresh(db_program)
    return db_program

def get_program(db: Session, program_id: UUID) -> Program:
    """
    Retrieve a program by its unique identifier.

    Args:
        db (Session): Database session.
        program_id (UUID): Unique identifier of the program.

    Returns:
        Program: The program record if found, else None.
    """
    return db.query(Program).filter(Program.id == program_id).first()

def get_all_programs(db: Session) -> List[Program]:
    """
    Retrieve all programs from the database.

    Args:
        db (Session): Database session.

    Returns:
        List[Program]: List of all program records.
    """
    return db.query(Program).all()