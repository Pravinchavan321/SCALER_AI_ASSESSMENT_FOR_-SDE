from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.session import Base

class DNSRecord(Base):
    __tablename__ = "dns_records"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    hosted_zone_id = Column(Integer, ForeignKey("hosted_zones.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False, index=True)
    type = Column(String, nullable=False, index=True)
    ttl = Column(Integer, nullable=False, default=300)
    value = Column(Text, nullable=False)
    routing_policy = Column(String, nullable=True)
    alias = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    hosted_zone = relationship("HostedZone", back_populates="records")
