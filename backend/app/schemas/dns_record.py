from datetime import datetime
from typing import Optional, List
from enum import Enum
from pydantic import BaseModel, Field, field_validator

class RecordTypeEnum(str, Enum):
    A = "A"
    AAAA = "AAAA"
    CNAME = "CNAME"
    TXT = "TXT"
    MX = "MX"
    NS = "NS"
    PTR = "PTR"
    SRV = "SRV"
    CAA = "CAA"

SUPPORTED_RECORD_TYPES = {t.value for t in RecordTypeEnum}

class DNSRecordCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, description="Record name/subdomain")
    type: RecordTypeEnum = Field(..., description="DNS record type")
    ttl: int = Field(default=300, gt=0, le=2147483647, description="Time to live in seconds")
    value: str = Field(..., min_length=1, description="Record value / target")
    routing_policy: Optional[str] = Field(default=None, description="Routing policy")
    alias: bool = Field(default=False, description="Whether this is an alias record")

    @field_validator("name", "value")
    @classmethod
    def strip_strings(cls, v: str) -> str:
        return v.strip()

class DNSRecordUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=255)
    type: Optional[RecordTypeEnum] = Field(default=None)
    ttl: Optional[int] = Field(default=None, gt=0, le=2147483647)
    value: Optional[str] = Field(default=None, min_length=1)
    routing_policy: Optional[str] = Field(default=None)
    alias: Optional[bool] = Field(default=None)

    @field_validator("name", "value")
    @classmethod
    def strip_strings(cls, v: Optional[str]) -> Optional[str]:
        return v.strip() if v is not None else None

class DNSRecordResponse(BaseModel):
    id: int
    hosted_zone_id: int
    name: str
    type: str
    ttl: int
    value: str
    routing_policy: Optional[str] = None
    alias: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class DNSRecordListResponse(BaseModel):
    items: List[DNSRecordResponse]
    page: int
    limit: int
    total: int
    total_pages: int
