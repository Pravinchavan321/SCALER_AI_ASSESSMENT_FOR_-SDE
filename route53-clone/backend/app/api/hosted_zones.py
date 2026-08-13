from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, Response
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.hosted_zone import (
    HostedZoneCreate,
    HostedZoneUpdate,
    HostedZoneResponse,
    HostedZoneListResponse,
)
from app.services import hosted_zone_service

router = APIRouter(prefix="/hosted-zones", tags=["Hosted Zones"])

@router.get("", response_model=HostedZoneListResponse)
def list_hosted_zones(
    search: Optional[str] = Query(None, description="Search hosted zones by name or comment"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    items, total, total_pages = hosted_zone_service.get_hosted_zones(
        db=db,
        user_id=current_user.id,
        search=search,
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

@router.post("", response_model=HostedZoneResponse, status_code=status.HTTP_201_CREATED)
def create_hosted_zone(
    zone_in: HostedZoneCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return hosted_zone_service.create_hosted_zone(
        db=db,
        zone_in=zone_in,
        user_id=current_user.id,
    )

@router.get("/{hosted_zone_id}", response_model=HostedZoneResponse)
def get_hosted_zone(
    hosted_zone_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
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

@router.put("/{hosted_zone_id}", response_model=HostedZoneResponse)
def update_hosted_zone(
    hosted_zone_id: int,
    zone_in: HostedZoneUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
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
    return hosted_zone_service.update_hosted_zone(
        db=db,
        db_zone=zone,
        zone_in=zone_in,
    )

@router.delete("/{hosted_zone_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_hosted_zone(
    hosted_zone_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
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
    hosted_zone_service.delete_hosted_zone(db=db, db_zone=zone)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
