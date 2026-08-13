from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, Response
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.models.hosted_zone import HostedZone
from app.services import hosted_zone_service, dns_record_service
from app.schemas.dns_record import (
    RecordTypeEnum,
    DNSRecordCreate,
    DNSRecordUpdate,
    DNSRecordResponse,
    DNSRecordListResponse,
)

router = APIRouter(prefix="/hosted-zones/{hosted_zone_id}/records", tags=["DNS Records"])

def get_verified_hosted_zone(
    hosted_zone_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> HostedZone:
    zone = hosted_zone_service.get_hosted_zone_by_id(
        db=db,
        hosted_zone_id=hosted_zone_id,
        user_id=current_user.id,
    )
    if not zone:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hosted zone not found",
        )
    return zone

@router.get("", response_model=DNSRecordListResponse)
def list_records(
    hosted_zone_id: int,
    search: Optional[str] = Query(None, description="Search records by name or value"),
    type: Optional[RecordTypeEnum] = Query(None, description="Filter records by DNS record type"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db),
    hosted_zone: HostedZone = Depends(get_verified_hosted_zone),
):
    items, total, total_pages = dns_record_service.get_records_by_hosted_zone(
        db=db,
        hosted_zone_id=hosted_zone.id,
        search=search,
        record_type=type,
        page=page,
        limit=limit,
    )
    return {
        "items": items,
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": total_pages,
    }

@router.post("", response_model=DNSRecordResponse, status_code=status.HTTP_201_CREATED)
def create_record(
    record_in: DNSRecordCreate,
    db: Session = Depends(get_db),
    hosted_zone: HostedZone = Depends(get_verified_hosted_zone),
):
    return dns_record_service.create_record(
        db=db,
        hosted_zone=hosted_zone,
        record_in=record_in,
    )

@router.get("/{record_id}", response_model=DNSRecordResponse)
def get_record(
    record_id: int,
    db: Session = Depends(get_db),
    hosted_zone: HostedZone = Depends(get_verified_hosted_zone),
):
    record = dns_record_service.get_record_by_id(
        db=db,
        hosted_zone_id=hosted_zone.id,
        record_id=record_id,
    )
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="DNS record not found",
        )
    return record

@router.put("/{record_id}", response_model=DNSRecordResponse)
def update_record(
    record_id: int,
    record_in: DNSRecordUpdate,
    db: Session = Depends(get_db),
    hosted_zone: HostedZone = Depends(get_verified_hosted_zone),
):
    record = dns_record_service.get_record_by_id(
        db=db,
        hosted_zone_id=hosted_zone.id,
        record_id=record_id,
    )
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="DNS record not found",
        )
    return dns_record_service.update_record(
        db=db,
        db_record=record,
        record_in=record_in,
    )

@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_record(
    record_id: int,
    db: Session = Depends(get_db),
    hosted_zone: HostedZone = Depends(get_verified_hosted_zone),
):
    record = dns_record_service.get_record_by_id(
        db=db,
        hosted_zone_id=hosted_zone.id,
        record_id=record_id,
    )
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="DNS record not found",
        )
    dns_record_service.delete_record(
        db=db,
        hosted_zone=hosted_zone,
        db_record=record,
    )
    return Response(status_code=status.HTTP_204_NO_CONTENT)
