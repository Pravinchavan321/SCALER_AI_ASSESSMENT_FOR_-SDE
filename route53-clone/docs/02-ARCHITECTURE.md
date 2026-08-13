# Architecture

## High-Level Architecture

```text
                    Browser
                       |
                       ↓
              Next.js Frontend
                       |
                   REST API
                       |
                       ↓
                FastAPI Backend
                       |
                 Service Layer
                       |
                       ↓
                  SQLAlchemy
                       |
                       ↓
                    SQLite
```

## Frontend Architecture

The frontend uses Next.js App Router.

Recommended structure:
```text
frontend/
├── app/
├── components/
├── hooks/
├── lib/
├── types/
└── public/
```

### Frontend Responsibilities

- **`app/`**: Contains application routes and page-level composition.
- **`components/`**: Contains reusable UI components.
- **`hooks/`**: Contains reusable React/TanStack Query hooks.
- **`lib/`**: Contains API clients and utility functions.
- **`types/`**: Contains TypeScript types and interfaces.
- **`public/`**: Contains static assets.

## Backend Architecture

Recommended structure:
```text
backend/
└── app/
    ├── api/
    ├── services/
    ├── models/
    ├── schemas/
    ├── database/
    └── core/
```

### Backend Responsibilities

- **`api/`**: Contains FastAPI route definitions. Routes should focus on:
  - HTTP request handling
  - Validation
  - Calling services
  - Returning responses
  *(Complex business logic should not be placed directly in route functions.)*
- **`services/`**: Contains business logic (e.g., `auth_service.py`, `hosted_zone_service.py`, `record_service.py`).
- **`models/`**: Contains SQLAlchemy database models (e.g., `user.py`, `hosted_zone.py`, `record.py`).
- **`schemas/`**: Contains Pydantic request/response models (e.g., `auth.py`, `hosted_zone.py`, `record.py`).
- **`database/`**: Contains database connection, session configuration, initialization, and seed data.
- **`core/`**: Contains configuration, security utilities, and authentication helpers.

## Request Flow

### Example: Creating a Hosted Zone
```text
User
 ↓
Hosted Zone Form
 ↓
Frontend Validation
 ↓
TanStack Query Mutation
 ↓
API Client
 ↓
POST /api/hosted-zones
 ↓
FastAPI Route
 ↓
Hosted Zone Service
 ↓
SQLAlchemy
 ↓
SQLite
 ↓
API Response
 ↓
Frontend Cache Update
 ↓
Toast Notification
```

### Authentication Flow
```text
User
 ↓
Login Form
 ↓
POST /api/auth/login
 ↓
FastAPI
 ↓
Validate Mock User
 ↓
Generate Session/JWT
 ↓
Frontend Stores Session
 ↓
Authenticated Application
```

## Data Flow

Frontend must never access SQLite directly.

**Correct**:
```text
Next.js → FastAPI → SQLAlchemy → SQLite
```

**Incorrect**:
```text
Next.js → SQLite
```

## Architectural Rules

1. Frontend and backend must remain separate.
2. Frontend must communicate with backend through REST APIs.
3. Frontend must never access SQLite directly.
4. API routes should remain thin.
5. Business logic belongs in services.
6. Database models belong in the model layer.
7. Request/response validation belongs in Pydantic schemas.
8. React components should be reusable.
9. API calls should be centralized.
10. Avoid duplicate business logic.
11. Avoid unnecessary abstractions.
12. Keep the architecture understandable.
