# type: ignore
import uuid
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from app.core.database import Base

class Program(Base):
  __tablename__ = "programs"

  id = Column(
    UUID(as_uuid=True),
    primary_key=True,
    default=uuid.uuid4,
    index=True
  )
  name = Column(String, unique=True, nullable=False)
  description = Column(String)
  start_date = Column(DateTime, nullable=False, default=datetime.utcnow)
  end_date = Column(DateTime, nullable=True, default=lambda: datetime.utcnow().replace(year=datetime.utcnow().year + 1))
  created_at = Column(DateTime, default=datetime.utcnow)
  updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
