# type: ignore
import uuid
from sqlalchemy import Column , String, Integer,DateTime
from sqlalchemy.dialects.postgresql import UUID 
from datetime import datetime
from ..core.database import Base


class Client(Base):
    __tablename__ = "clients"

    id = Column(
                UUID(as_uuid=True),
                primary_key=True,
                default=uuid.uuid4,
                index=True
                )
    full_name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    
    
     # __repr__ method for better representation when printing objects
    def __repr__(self):
        return f"<Client(id={self.id}, name='{self.full_name}', email='{self.email}')>"
