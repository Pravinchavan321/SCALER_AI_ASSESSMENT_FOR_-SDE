import math
from typing import Optional, Tuple, List
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.hosted_zone import HostedZone
from app.schemas.hosted_zone import HostedZoneCreate, HostedZoneUpdate

def get_hosted_zones(
    db: Session,
    user_id: int,
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 10,
) -> Tuple[List[HostedZone], int, int]:
    query = db.query(HostedZone).filter(HostedZone.user_id == user_id)

    if search:
        search_pattern = f"%{search.strip()}%"
        query = query.filter(
            or_(
                HostedZone.name.ilike(search_pattern),
                HostedZone.comment.ilike(search_pattern),
            )
        )

    total = query.count()
    total_pages = math.ceil(total / limit) if total > 0 else 0
    offset = (page - 1) * limit

    items = query.order_by(HostedZone.created_at.desc()).offset(offset).limit(limit).all()
    return items, total, total_pages

def get_hosted_zone_by_id(db: Session, hosted_zone_id: int, user_id: int) -> Optional[HostedZone]:
    return (
        db.query(HostedZone)
        .filter(HostedZone.id == hosted_zone_id, HostedZone.user_id == user_id)
        .first()
    )

def create_hosted_zone(db: Session, zone_in: HostedZoneCreate, user_id: int) -> HostedZone:
    zone = HostedZone(
        name=zone_in.name.strip(),
        zone_type=zone_in.zone_type,
        comment=zone_in.comment.strip() if zone_in.comment else None,
        private_zone=zone_in.private_zone,
        record_count=0,
        user_id=user_id,
    )
    db.add(zone)
    db.commit()
    db.refresh(zone)
    return zone

def update_hosted_zone(
    db: Session,
    db_zone: HostedZone,
    zone_in: HostedZoneUpdate
) -> HostedZone:
    update_data = zone_in.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        if field in ["name", "comment"] and isinstance(value, str):
            value = value.strip()
        setattr(db_zone, field, value)

    db.commit()
    db.refresh(db_zone)
    return db_zone

def delete_hosted_zone(db: Session, db_zone: HostedZone) -> None:
    db.delete(db_zone)
    db.commit()
