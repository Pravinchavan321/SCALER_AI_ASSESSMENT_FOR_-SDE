# Frontend Specification

## Framework

Use:
- Next.js
- TypeScript
- App Router
- Tailwind CSS
- TanStack Query
- Lucide React

## Application Routes

Required routes:
- `/login`
- `/dashboard`
- `/hosted-zones`
- `/hosted-zones/[zoneId]`
- `/traffic-policies`
- `/health-checks`
- `/resolver`
- `/profiles`

## Authentication

Unauthenticated users should be redirected to `/login`.  
Authenticated users should be able to refresh the browser without losing their session.

## Login Page

The login page should:
- Look professional
- Match the AWS-style visual direction
- Provide username input
- Provide password input
- Display validation errors
- Display authentication errors
- Show loading state
- Prevent duplicate submissions

## Application Shell

Create a reusable application shell containing:
- Top navigation
- Sidebar
- Main content area
- Breadcrumbs
- User menu
- Notifications

*(The shell should not be duplicated across pages.)*

## Hosted Zones Page

The Hosted Zones page must contain:
- Page title
- Breadcrumbs
- Search
- Create Hosted Zone button
- Hosted Zones table
- Pagination
- Row actions
- Loading state
- Empty state
- Error state
- Notifications

## Hosted Zone Detail Page

Display:
- Hosted Zone name
- Hosted Zone ID
- Zone type
- Record count
- Nameservers
- DNS Records
- Navigation to manage records

## DNS Records Interface

The DNS records interface must provide:
- Search
- Record type filter
- Create record
- Edit record
- Delete record
- Pagination
- Loading state
- Empty state
- Error state
- Notifications

## DNS Record Form

Create a reusable record form that adapts based on record type:
- **A**: Name, TTL, IPv4 value
- **AAAA**: Name, TTL, IPv6 value
- **CNAME**: Name, TTL, Target
- **TXT**: Name, TTL, Text value
- **MX**: Name, TTL, Priority, Mail server
- **NS**: Name, TTL, Nameserver
- **PTR**: Name, TTL, Target
- **SRV**: Name, TTL, Priority, Weight, Port, Target
- **CAA**: Name, TTL, Flags, Tag, Value

## Components

Create reusable components for:
- AWS-style Sidebar
- Topbar
- Breadcrumbs
- Page Header
- Data Table
- Pagination
- Search Bar
- Filter
- Modal
- Confirmation Dialog
- Toast
- Form controls
- Loading state
- Empty state
- Error state
- Coming Soon page

## Data Fetching

Use TanStack Query with reusable hooks:
- `useAuth()`
- `useCurrentUser()`
- `useHostedZones()`
- `useHostedZone()`
- `useCreateHostedZone()`
- `useUpdateHostedZone()`
- `useDeleteHostedZone()`
- `useRecords()`
- `useRecord()`
- `useCreateRecord()`
- `useUpdateRecord()`
- `useDeleteRecord()`

## API Client

Centralize API communication handling:
- Base URL
- Authentication
- JSON parsing
- Errors
- Common request behavior

## Type Safety

Use TypeScript interfaces/types for:
- User
- Hosted Zone
- DNS Record
- API response
- Pagination
- API errors
- Forms

## Forms & Tables

- **Forms**: Validate input, display validation/API errors, show loading state, disable submit during mutation, prevent duplicate submission, show toast on success.
- **Tables**: Clear headers, row hover states, consistent spacing, actions, empty/loading states, pagination.

## Notifications & Feedback

- Toast notifications for create, update, delete, and errors.
- Never show blank screens: use skeletons, spinners, and disabled states.
- Empty states should offer clear explanations and primary CTA buttons.

## Mocked Pages

Use a reusable Coming Soon component for:
- `/dashboard`
- `/traffic-policies`
- `/health-checks`
- `/resolver`
- `/profiles`
