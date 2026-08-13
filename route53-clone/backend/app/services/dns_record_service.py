import math
from typing import Optional, Tuple, List
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.hosted_zone import HostedZone
from app.models.dns_record import DNSRecord
from app.schemas.dns_record import DNSRecordCreate, DNSRecordUpdate, RecordTypeEnum

def get_records_by_hosted_zone(
    db: Session,
    hosted_zone_id: int,
    search: Optional[str] = None,
    record_type: Optional[RecordTypeEnum] = None,
    page: int = 1,
    limit: int = 10,
) -> Tuple[List[DNSRecord], int, int]:
    query = db.query(DNSRecord).filter(DNSRecord.hosted_zone_id == hosted_zone_id)

    if record_type:
        query = query.filter(DNSRecord.type == record_type.value)

    if search:
        search_pattern = f"%{search.strip()}%"
        query = query.filter(
            or_(
                DNSRecord.name.ilike(search_pattern),
                DNSRecord.value.ilike(search_pattern),
            )
        )

    total = query.count()
    total_pages = math.ceil(total / limit) if total > 0 else 0
    offset = (page - 1) * limit

    items = (
        query.order_by(DNSRecord.created_at.asc(), DNSRecord.id.asc())
        .offset(offset)
        .limit(limit)
        .all()
    )
    return items, total, total_pages

def get_record_by_id(
    db: Session,
    hosted_zone_id: int,
    record_id: int
) -> Optional[DNSRecord]:
    return (
        db.query(DNSRecord)
        .filter(
            DNSRecord.id == record_id,
            DNSRecord.hosted_zone_id == hosted_zone_id
        )
        .first()
    )

def create_record(
    db: Session,
    hosted_zone: HostedZone,
    record_in: DNSRecordCreate
) -> DNSRecord:
    record = DNSRecord(
        hosted_zone_id=hosted_zone.id,
        name=record_in.name,
        type=record_in.type.value,
        ttl=record_in.ttl,
        value=record_in.value,
        routing_policy=record_in.routing_policy,
        alias=record_in.alias,
    )
    db.add(record)

    # Increment record_count atomically
    hosted_zone.record_count = (hosted_zone.record_count or 0) + 1

    db.commit()
    db.refresh(record)
    db.refresh(hosted_zone)
    return record

def update_record(
    db: Session,
    db_record: DNSRecord,
    record_in: DNSRecordUpdate
) -> DNSRecord:
    update_data = record_in.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        if field == "type" and value is not None:
            value = value.value if hasattr(value, "value") else value
        setattr(db_record, field, value)

    db.commit()
    db.refresh(db_record)
    return db_record

def delete_record(
    db: Session,
    hosted_zone: HostedZone,
    db_record: DNSRecord
) -> None:
    db.delete(db_record)

    # Decrement record_count safely (never negative)
    hosted_zone.record_count = max(0, (hosted_zone.record_count or 1) - 1)

    db.commit()
    db.refresh(hosted_zone)
