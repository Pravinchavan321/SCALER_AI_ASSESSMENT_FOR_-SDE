# Development Plan

The project must be implemented sequentially. Do not skip phases. Do not implement future phases before the required current phase is stable unless the future work is technically required.

## Phase 1 — Project Setup
- **Tasks**: Create frontend, backend, Next.js + TS + App Router config, FastAPI config, SQLite + SQLAlchemy, CORS, env variables, health endpoint.
- **Verification**: Frontend & backend start, health check works, frontend-backend communication works.

## Phase 2 — Database
- **Tasks**: User model, HostedZone model, DNSRecord model, relationships, DB initialization & session handling, development seed user.
- **Verification**: Tables exist, relationships work, seed user created, data persists across restart.

## Phase 3 — Authentication
- **Tasks**: Login API, Logout API, Current-user API, JWT/session handling, login page, auth state, protected routes & endpoints.
- **Verification**: Login/logout works, invalid login handled, session preserved on refresh, route guards active.

## Phase 4 — AWS Route53 Layout
- **Tasks**: Top navigation, sidebar, main layout, breadcrumbs, page header, user menu, notification system.
- **Verification**: AWS Route53 resemblance, working navigation, active page indicator, responsive behavior.

## Phase 5 — Hosted Zones Backend
- **Tasks**: List, search, pagination, get, create, update, delete Hosted Zones with auth protection.
- **Verification**: Endpoint testing (success, validation error, 404, 401, persistence, pagination, search).

## Phase 6 — Hosted Zones Frontend
- **Tasks**: Hosted Zones table, search, pagination, create/edit modals, delete dialog, details view, states (loading/empty/error), toasts.
- **Verification**: Complete Hosted Zone CRUD via UI, verified persistence.

## Phase 7 — DNS Records Backend
- **Tasks**: List, search, filter by type, pagination, get, create, update, delete DNS records across all 9 supported types (`A`, `AAAA`, `CNAME`, `TXT`, `MX`, `NS`, `PTR`, `SRV`, `CAA`).
- **Verification**: Test CRUD, validation, search, filter, pagination, persistence for all record types.

## Phase 8 — DNS Records Frontend
- **Tasks**: Record table, search, type filter, dynamic record create/edit form, delete confirmation, pagination, loading/error/empty states, toasts.
- **Verification**: Complete DNS Record CRUD via UI across all supported types.

## Phase 9 — Mocked Pages
- **Tasks**: Dashboard, Traffic Policies, Health Checks, Resolver, Profiles placeholders using reusable Coming Soon component.
- **Verification**: Visual placeholders in place without unnecessary real functionality.

## Phase 10 — UX Polish
- **Tasks**: Spacing, typography, tables, forms, buttons, modals, toasts, states, responsive checks against reference screenshots.
- **Verification**: High fidelity alignment with AWS Route53 console screenshots.

## Phase 11 — Testing
- **Tasks**: End-to-end verification across Auth, Hosted Zones, DNS Records, UI edge cases, and persistence.
- **Verification**: All core flows tested without regressions.

## Phase 12 — Code Quality
- **Tasks**: TypeScript/Python type checks, clean imports, remove dead code, validation review, architectural boundaries.
- **Verification**: Clean build with zero lint/type errors.

## Phase 13 — Documentation
- **Tasks**: README, Architecture, Database, API, Setup, Env variables, Demo credentials, Deployment guides.
- **Verification**: Clear, comprehensive, and up-to-date documentation.

## Phase 14 — Deployment
- **Tasks**: Deploy frontend (Vercel) & backend (Render/Railway), configure env vars & SQLite persistence paths.
- **Verification**: Fully functioning deployed live demo.

## Phase 15 — Optional Bonuses
- **Tasks**: (Only after all required features complete): JSON export, BIND export, BIND import, Dark mode, Bulk ops, Shortcuts.

---

## Definition of Done

The assignment is considered complete when:
- User can log in & log out
- Session persists across reloads
- Full CRUD for Hosted Zones works via UI & persists
- Full CRUD for DNS Records across all 9 types works via UI & persists
- Search, filter, and pagination work
- UI faithfully resembles AWS Route53
- Loading, error, empty states & toasts are implemented
- Mocked sections have Coming Soon states
- Documentation is complete and application is deployable
