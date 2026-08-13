# Project Specification

## Objective

Build a functional clone of the AWS Route53 web application.

The focus is:
- Route53-like UI/UX
- Persistent storage
- Backend API
- Hosted Zone management
- DNS Record management

Real DNS functionality is not required.

## Required Features

### Authentication

Required:
- Login
- Logout
- Session persistence
- Protected application routes
- Current user information

Authentication is mocked.

IAM, AWS Accounts, Organizations, Billing, and other AWS dependencies can be mocked.

### Hosted Zones

Users must be able to:
- View Hosted Zones
- Search Hosted Zones
- Create Hosted Zones
- Edit Hosted Zones
- Delete Hosted Zones
- View Hosted Zone details
- Navigate to records within a Hosted Zone

All Hosted Zone data must persist in SQLite.

### DNS Records

Users must be able to manage DNS records within a Hosted Zone.

Required record types:
- A
- AAAA
- CNAME
- TXT
- MX
- NS
- PTR
- SRV
- CAA

Users must be able to:
- View Records
- Search Records
- Filter Records
- Create Records
- Edit Records
- Delete Records
- Paginate Records

All DNS Record data must persist in SQLite.

### Route53 Experience

The application should closely resemble the AWS Route53 experience.

Required:
- AWS-style navigation
- AWS-style sidebar
- AWS-style top navigation
- Breadcrumbs
- Page headers
- Tables
- Search
- Filters
- Pagination
- Forms
- Modals
- Confirmation dialogs
- Notifications
- Loading states
- Empty states
- Error states

The application should feel like Route53 instead of a generic CRUD application.

## Mocked Sections

The following sections may be present as placeholders:
- Dashboard
- Traffic Policies
- Health Checks
- Resolver
- Profiles

A professional "Coming Soon" page is sufficient.

Do not implement real functionality for these sections.

## Bonus Features

Bonus features are optional.

Only implement bonus features after all required functionality is complete.

Possible bonus features:
- Import DNS records from BIND zone files
- Export Hosted Zones as JSON
- Export Hosted Zones as BIND
- Dark Mode
- Keyboard Shortcuts
- Bulk Operations

## Evaluation Priorities

The project should prioritize:
- UI similarity to Route53
- Functional completeness
- Frontend engineering quality
- Backend/API quality
- Database design
- Code quality and maintainability
- Documentation
- Optional bonus functionality

## Important Scope Rule

Do not implement functionality that is not required by this specification unless it is necessary for a required feature.

Avoid scope creep.
