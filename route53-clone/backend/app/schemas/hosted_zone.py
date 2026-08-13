from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

class HostedZoneCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, description="Domain name for the hosted zone")
    zone_type: str = Field(default="Public", description="Public or Private zone")
    comment: Optional[str] = Field(default=None, max_length=500, description="Optional description/comment")
    private_zone: bool = Field(default=False, description="Whether the hosted zone is private")

class HostedZoneUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=255)
    zone_type: Optional[str] = Field(default=None)
    comment: Optional[str] = Field(default=None, max_length=500)
    private_zone: Optional[bool] = Field(default=None)

class HostedZoneResponse(BaseModel):
    id: int
    name: str
    zone_type: str
    comment: Optional[str] = None
    private_zone: bool
    record_count: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class HostedZoneListResponse(BaseModel):
    items: List[HostedZoneResponse]
    page: int
    limit: int
    total: int
    total_pages: int
