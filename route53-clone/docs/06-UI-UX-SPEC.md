# UI/UX Specification

## Primary Goal

The application must visually and behaviorally resemble the AWS Route53 console.
The application must not look like a generic SaaS dashboard.
The Route53 UI experience is one of the highest-priority evaluation criteria.

Reference screenshots stored in: `docs/screenshots/` should be treated as the visual source of truth.

## Visual Principles

Prioritize:
- AWS-style layout
- AWS-style spacing
- AWS-style typography
- AWS-style navigation
- AWS-style tables
- AWS-style forms
- AWS-style buttons
- AWS-style modals
- AWS-style notifications
- Consistent interaction behavior

## Overall Layout

```text
Top Navigation
       |
       ↓
Sidebar + Main Content
```

The layout should resemble an AWS cloud management console.

## Sidebar

Navigation items:
- Dashboard
- Hosted Zones
- Traffic Policies
- Health Checks
- Resolver
- Profiles

The active navigation item must be visually distinguishable. The sidebar should remain consistent throughout the application.

## Top Navigation

AWS-inspired structure including:
- AWS branding area
- Search area
- Region/context area
- Help/support area
- User/account menu

## Breadcrumbs & Headers

- **Breadcrumbs**: Inner pages must provide clear navigation context (e.g., `Route 53 > Hosted zones > example.com`).
- **Page Headers**: Clean headers with AWS-like spacing, typography, search, and primary actions.

## Tables & Forms

- **Tables**: Clear column headers, appropriate column spacing, row hover state, action controls, consistent borders, pagination, empty/loading states. Avoid excessive decoration.
- **Forms**: Clear labels, consistent input styles, grouped related fields, validation feedback, clear Cancel/Submit buttons, loading state during submission.

## Modals & Notifications

- **Modals**: Confirmation dialogs for destructive actions with clear visual distinction.
- **Notifications**: Clear and concise toast notifications for success/failure feedback.

## Loading & Error States

- Never display blank screens while data is loading (use skeletons/spinners).
- Empty states must provide explanations and a primary create action.
- API failures must show actionable error messages.

## Responsive Design

Desktop is the primary target (since AWS management consoles are primarily desktop-oriented), while maintaining usability on tablets and smaller screens.

## Avoid Generic SaaS Design

Do **NOT** introduce:
- Giant dashboard cards
- Excessive gradients
- Marketing landing-page layouts
- Unnecessary animations
- Excessive rounded cards
- Unnecessary charts
- Bright decorative backgrounds
- Generic admin dashboard templates

## Reference Screenshots

Store reference screenshots under `docs/screenshots/`:
- `aws-sidebar.png`
- `aws-topbar.png`
- `hosted-zones.png`
- `hosted-zone-detail.png`
- `records.png`
- `create-zone.png`
- `create-record.png`

Compare implementations directly against reference screenshots for visual fidelity.
