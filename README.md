########Please WAIT FOR 50 SECONDS WHEN YOU REQUEST 1 TIME BECAUSE RENDER TAKES 1 MINUTE = FOR BOOTUP.
# AWS Route53 Clone

A functional clone of the AWS Route53 web application.

## Project Structure
```text
route53-clone/
│
├── AGENTS.md
├── README.md
│
├── docs/
│   ├── 01-PROJECT-SPEC.md
│   ├── 02-ARCHITECTURE.md
│   ├── 03-DATABASE.md
│   ├── 04-API-SPEC.md
│   ├── 05-FRONTEND-SPEC.md
│   ├── 06-UI-UX-SPEC.md
│   ├── 07-DEVELOPMENT-PLAN.md
│   └── screenshots/
│
├── frontend/
│
└── backend/
```

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
```

Windows:
```cmd
venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run FastAPI:
```bash
uvicorn app.main:app --reload
```

- Backend: http://localhost:8000
- Swagger: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:3000

## Demo Credentials

The application uses mocked authentication.

Default development credentials:
- **Username**: `admin`
- **Password**: `admin123`

These credentials are for local development/demo purposes only.

## Database

SQLite is used for persistent application data.

Main tables:
- `users`
- `hosted_zones`
- `dns_records`

See: [docs/03-DATABASE.md](docs/03-DATABASE.md) for the complete schema.

## API

The backend exposes REST APIs for:
- Authentication
- Hosted Zones
- DNS Records

See: [docs/04-API-SPEC.md](docs/04-API-SPEC.md) for the complete API specification.

## UI/UX

The frontend is designed to closely resemble the AWS Route53 console.

Reference screenshots are stored in: `docs/screenshots/`

See: [docs/06-UI-UX-SPEC.md](docs/06-UI-UX-SPEC.md) for detailed UI requirements.

## Development

The project must be implemented phase-by-phase.

See: [docs/07-DEVELOPMENT-PLAN.md](docs/07-DEVELOPMENT-PLAN.md) for the complete implementation sequence.

## Scope

This project does not implement:
- Real AWS Route53
- Real DNS
- AWS IAM
- AWS Organizations
- AWS Billing
- Real AWS accounts
- Real AWS DNS infrastructure

The application is a functional Route53 experience clone.

## Assignment Deliverables

The final project should contain:
- Source code
- Frontend
- Backend
- SQLite persistence
- README
- Architecture documentation
- Database documentation
- API documentation
- Hosted demo link

## Deployment

The frontend and backend may be deployed separately.

Example:
```text
Frontend
    ↓
Vercel

Backend
    ↓
Render / Railway / Similar platform

Database
    ↓
SQLite
```

SQLite persistence must be considered carefully when deploying to platforms with ephemeral filesystems.

The database path should be configurable through environment variables.
