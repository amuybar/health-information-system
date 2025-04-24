from sqlalchemy.orm import Session
from uuid import UUID
from app.schemas.client import ClientCreate
from app.models.client import Client

def create_client(db: Session, client: ClientCreate):
    """
    Create a new client in the database.

    Args:
        db (Session): Database session.
        client (ClientCreate): Data for the new client.

    Returns:
        Client: The newly created client record.
    """
    db_client = Client(**client.dict())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def get_client(db: Session, client_id: UUID):
    """
    Retrieve a client by their unique identifier.

    Args:
        db (Session): Database session.
        client_id (UUID): Unique identifier of the client.

    Returns:
        Client: The client record if found, else None.
    """
    return db.query(Client).filter(Client.id == client_id).first()

def get_clients(db: Session, skip: int = 0, limit: int = 10) -> list[Client]:
    """
    Retrieve a list of clients with pagination.

    Args:
        db (Session): Database session.
        skip (int): Number of records to skip.
        limit (int): Maximum number of records to return.

    Returns:
        list[Client]: List of client records.
    """
    return db.query(Client).offset(skip).limit(limit).all()

def search_clients_by_name(db: Session, name_query: str) -> list[Client]:
    """
    Search for clients by name using a case-insensitive match.

    Args:
        db (Session): Database session.
        name_query (str): Name or partial name to search for.

    Returns:
        list[Client]: List of matching client records.
    """
    return db.query(Client).filter(Client.full_name.ilike(f"%{name_query}%")).all()

def get_client_with_programs(db: Session, client_id: UUID) -> Client:
    """
    Retrieve a client along with their enrolled programs.

    Args:
        db (Session): Database session.
        client_id (UUID): Unique identifier of the client.

    Returns:
        Client: The client record with related programs if found, else None.
    """
    return db.query(Client).filter(Client.id == client_id).first()