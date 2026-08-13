from app.schemas.auth import LoginRequest, UserResponse, MessageResponse
from app.schemas.hosted_zone import (
    HostedZoneCreate,
    HostedZoneUpdate,
    HostedZoneResponse,
    HostedZoneListResponse,
)
from app.schemas.dns_record import (
    RecordTypeEnum,
    SUPPORTED_RECORD_TYPES,
    DNSRecordCreate,
    DNSRecordUpdate,
    DNSRecordResponse,
    DNSRecordListResponse,
)

__all__ = [
    "LoginRequest",
    "UserResponse",
    "MessageResponse",
    "HostedZoneCreate",
    "HostedZoneUpdate",
    "HostedZoneResponse",
    "HostedZoneListResponse",
    "RecordTypeEnum",
    "SUPPORTED_RECORD_TYPES",
    "DNSRecordCreate",
    "DNSRecordUpdate",
    "DNSRecordResponse",
    "DNSRecordListResponse",
]
