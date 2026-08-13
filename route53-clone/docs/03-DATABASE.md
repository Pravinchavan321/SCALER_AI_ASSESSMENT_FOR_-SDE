# Database Specification

## Database

- **Database engine**: SQLite
- **ORM**: SQLAlchemy

The database must provide persistent storage for the application.

## Entity Relationship

```text
User
 |
 | 1:N
 ↓
HostedZone
 |
 | 1:N
 ↓
DNSRecord
```

## Users

**Table**: `users`

**Fields**:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | Yes | Primary key |
| `username` | String | Yes | Login username |
| `email` | String | Yes | User email |
| `password_hash` | String | Yes | Hashed password |
| `created_at` | DateTime | Yes | Creation timestamp |

## Hosted Zones

**Table**: `hosted_zones`

**Fields**:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | Yes | Primary key |
| `name` | String | Yes | Hosted zone domain |
| `zone_type` | String | Yes | Public or private |
| `comment` | String | No | Optional description |
| `private_zone` | Boolean | Yes | Whether the zone is private |
| `record_count` | Integer | Yes | Number of records |
| `user_id` | Integer | Yes | Owner user |
| `created_at` | DateTime | Yes | Creation timestamp |
| `updated_at` | DateTime | Yes | Last update timestamp |

## DNS Records

**Table**: `dns_records`

**Fields**:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | Yes | Primary key |
| `hosted_zone_id` | Integer | Yes | Parent hosted zone |
| `name` | String | Yes | Record name |
| `type` | String | Yes | DNS record type |
| `ttl` | Integer | Yes | Time to live |
| `value` | Text | Yes | Record value |
| `routing_policy` | String | No | Mocked routing policy |
| `alias` | Boolean | Yes | Whether the record is an alias |
| `created_at` | DateTime | Yes | Creation timestamp |
| `updated_at` | DateTime | Yes | Last update timestamp |

## Foreign Keys

- `hosted_zones.user_id` references `users.id`
- `dns_records.hosted_zone_id` references `hosted_zones.id`

## Relationships

- One User can have many Hosted Zones.
- One Hosted Zone can have many DNS Records.

Example:
```text
User
 ├── Hosted Zone: example.com
 │    ├── A
 │    ├── AAAA
 │    ├── CNAME
 │    └── TXT
 │
 └── Hosted Zone: example.org
      ├── A
      └── MX
```

## Supported Record Types

The following values are allowed:
- `A`
- `AAAA`
- `CNAME`
- `TXT`
- `MX`
- `NS`
- `PTR`
- `SRV`
- `CAA`

## Persistence Requirement

All CRUD operations must modify SQLite.

Frontend-only state does not satisfy the persistence requirement.

Example:
```text
Create Hosted Zone → SQLite → Restart backend → Hosted Zone still exists
```

The same requirement applies to DNS Records.

## Validation

Backend validation must ensure:
- Hosted Zone name is valid
- Record type is supported
- TTL is valid
- Required record values are provided
- Parent Hosted Zone exists
- Records cannot reference nonexistent Hosted Zones

## Record Count

The Hosted Zone record count should remain consistent with the actual number of records associated with the Hosted Zone. Avoid manually storing incorrect counts. If `record_count` is stored, it must be updated correctly after record creation and deletion.
