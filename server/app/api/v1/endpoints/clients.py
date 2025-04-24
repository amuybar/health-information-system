#type:ignore

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List
from app.schemas.client import ClientCreate, ClientOut
from app.crud import client as client_crud
from app.dependencies import get_db

router = APIRouter()

@router.post("/", response_model=ClientOut)
def create_client(client: ClientCreate, db: Session = Depends(get_db)):
    """
    API endpoint to create a new client.

    Args:
        client (ClientCreate): Data for the new client.
        db (Session): Database session (provided by dependency injection).

    Returns:
        ClientOut: The newly created client record.
    """
    return client_crud.create_client(db, client)

@router.get("/", response_model=List[ClientOut])
def get_all_clients(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    API endpoint to retrieve all clients with pagination.

    Args:
        skip (int): Number of records to skip.
        limit (int): Maximum number of records to return.
        db (Session): Database session (provided by dependency injection).

    Returns:
        List[ClientOut]: List of client records.
    """
    return client_crud.get_clients(db, skip, limit)

@router.get("/search", response_model=List[ClientOut])
def search_clients(name: str, db: Session = Depends(get_db)):
    """
    API endpoint to search for clients by name.

    Args:
        name (str): Name or partial name to search for.
        db (Session): Database session (provided by dependency injection).

    Returns:
        List[ClientOut]: List of matching client records.
    """
    return client_crud.search_clients_by_name(db, name)

@router.get("/{client_id}", response_model=ClientOut)
def get_client(client_id: UUID, db: Session = Depends(get_db)):
    """
    API endpoint to retrieve a client by their unique identifier.

    Args:
        client_id (UUID): Unique identifier of the client.
        db (Session): Database session (provided by dependency injection).

    Returns:
        ClientOut: The client record with related programs if found.

    Raises:
        HTTPException: If the client is not found.
    """
    db_client = client_crud.get_client_with_programs(db, client_id)
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")
    return db_client

@router.delete("/{client_id}", response_model=ClientOut)
def delete_client(client_id: UUID, db: Session = Depends(get_db)):
    """
    API endpoint to delete a client by their unique identifier.

    Args:
        client_id (UUID): Unique identifier of the client.
        db (Session): Database session (provided by dependency injection).

    Returns:
        ClientOut: The deleted client record.

    Raises:
        HTTPException: If the client is not found.
    """
    db_client = client_crud.get_client(db, client_id)
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client_crud.delete_client(db, db_client)


@router.get("/programs/{program_id}", response_model=List[ClientOut])
def get_clients_by_program(program_id: UUID, db: Session = Depends(get_db)):
    """
    API endpoint to retrieve clients enrolled in a specific program.

    Args:
        program_id (UUID): Unique identifier of the program.
        db (Session): Database session (provided by dependency injection).

    Returns:
        List[ClientOut]: List of client records enrolled in the specified program.
    """
    return client_crud.get_client_by_program(db, program_id)

@router.put("/{client_id}", response_model=ClientOut)
def update_client(client_id: UUID, client: ClientCreate, db: Session = Depends(get_db)):
    """
    API endpoint to update a client's information.

    Args:
        client_id (UUID): Unique identifier of the client.
        client (ClientCreate): Updated data for the client.
        db (Session): Database session (provided by dependency injection).

    Returns:
        ClientOut: The updated client record.

    Raises:
        HTTPException: If the client is not found.
    """
    db_client = client_crud.get_client(db, client_id)
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client_crud.update_client(db, db_client, client)
