# API Specification

## Base URL

Local development: `http://localhost:8000`  
API prefix: `/api`

## Authentication

### Login
`POST /api/auth/login`

Request:
```json
{
  "username": "admin",
  "password": "admin123"
}
```
Response should contain authentication/session information and the authenticated user.

### Logout
`POST /api/auth/logout`

The endpoint should invalidate/clear the current session.

### Current User
`GET /api/auth/me`

Returns the currently authenticated user.

## Hosted Zones

### List Hosted Zones
`GET /api/hosted-zones`

Query parameters:
- `search`
- `page`
- `limit`

Example: `GET /api/hosted-zones?search=example&page=1&limit=10`

### Get Hosted Zone
`GET /api/hosted-zones/{zone_id}`

### Create Hosted Zone
`POST /api/hosted-zones`

The request should contain the required hosted zone fields.

### Update Hosted Zone
`PUT /api/hosted-zones/{zone_id}`

### Delete Hosted Zone
`DELETE /api/hosted-zones/{zone_id}`

Deleting a Hosted Zone should also correctly handle its associated DNS Records.

## DNS Records

### List Records
`GET /api/hosted-zones/{zone_id}/records`

Query parameters:
- `search`
- `type`
- `page`
- `limit`

Example: `GET /api/hosted-zones/1/records?search=www&type=A&page=1&limit=10`

### Get Record
`GET /api/hosted-zones/{zone_id}/records/{record_id}`

### Create Record
`POST /api/hosted-zones/{zone_id}/records`

### Update Record
`PUT /api/hosted-zones/{zone_id}/records/{record_id}`

### Delete Record
`DELETE /api/hosted-zones/{zone_id}/records/{record_id}`

## Supported Record Types
- `A`
- `AAAA`
- `CNAME`
- `TXT`
- `MX`
- `NS`
- `PTR`
- `SRV`
- `CAA`

## Search & Filtering

- **Search**: Hosted Zones and Records must support searching handled through API query parameters (`search`).
- **Filtering**: DNS Records must support filtering by record type (`?type=A`).

## Pagination

List endpoints should support `page` and `limit`.

Recommended response structure:
```json
{
  "items": [],
  "page": 1,
  "limit": 10,
  "total": 0,
  "total_pages": 0
}
```

## Error Format

Use a consistent FastAPI error response:
```json
{
  "detail": "Hosted zone not found"
}
```

## HTTP Status Codes

- `200 OK`
- `201 Created`
- `204 No Content`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `422 Validation Error`
- `500 Internal Server Error`

## Authentication Requirement

Protected Hosted Zone and DNS Record endpoints must require authentication. Unauthenticated requests should return `401 Unauthorized`.

## API Design Rules

1. Use REST-style endpoints.
2. Use proper HTTP methods.
3. Validate request bodies with Pydantic.
4. Return consistent response structures.
5. Return appropriate HTTP status codes.
6. Do not expose database implementation details.
7. Keep API routes thin.
8. Put business logic in service functions.
9. Do not create unnecessary endpoints.
10. Keep this API specification as the source of truth.
