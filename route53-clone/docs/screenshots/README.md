# AWS Route 53 UI / UX Reference Screenshot Index

This document acts as the visual source of truth and architectural reference for the AWS Route 53 Web Application console interface. Future development agents must adhere to the layout, design system, component patterns, and visual hierarchy detailed in this index and in [docs/06-UI-UX-SPEC.md](../06-UI-UX-SPEC.md).

---

## 1. Design System & Visual Hierarchy Overview

The AWS Management Console for Amazon Route 53 uses the **AWS Cloudscape Design System** visual language:

- **Top Navigation Bar**:
  - Dark theme header (`#161E2D` / `#232F3E`).
  - Left: AWS Logo, service search bar with magnifying glass icon.
  - Right: AWS Region dropdown (e.g., *Global* for Route 53), Notifications bell icon, Help/Support icon, Account/User dropdown menu.
- **Side Navigation (Sidebar)**:
  - White background (`#FFFFFF`) with thin gray border (`#EAEDED`).
  - Active menu item has a 3px blue left-border indicator (`#0972D3`), bold text, and faint background highlight (`#F2F8FD`).
  - Sections:
    - *Dashboard*
    - *Hosted zones* (Core)
    - *Traffic policies* (Placeholder/Coming Soon)
    - *Health checks* (Placeholder/Coming Soon)
    - *Resolver* (Placeholder/Coming Soon)
    - *Profiles* (Placeholder/Coming Soon)
- **Breadcrumbs**:
  - Located directly beneath top navigation on content background (`#F8F9FA`).
  - Example: `Route 53` > `Hosted zones` > `example.com`.
  - Blue interactive links (`#0972D3`), gray chevron separators (`#68707F`).
- **Page Header**:
  - Large font (`24px`, `#161E2D`, semi-bold/bold).
  - Contextual action buttons right-aligned (e.g., `Create hosted zone`, `Create record`, `Delete hosted zone`).
- **Primary vs. Secondary Action Buttons**:
  - **Primary CTA**: Solid orange/amber (`#EC7211` or `#FF9900`), white text, bold, rounded 20px / 4px depending on Cloudscape variant.
  - **Secondary Actions**: White button with dark border (`#545B64`), hover darkens slightly (`#F2F3F3`).
  - **Destructive Actions**: White button with red border/text or red solid (`#D13212`) for modal confirmations.
- **Data Tables**:
  - Clean table headers with light gray background (`#FAFAFA`) and subtle bottom border (`#EAEDED`).
  - Search input box above table (`Filter by property or enter a keyword`) with search icon.
  - Refresh button, settings gear, and pagination controls (`< 1 2 3 >` or `1 - 10 of 24`).
  - Row selection checkbox (radio or checkbox).
  - Row hover background tint (`#F8F9FA`).
- **Forms & Inputs**:
  - Standard AWS form fields: bold field labels, required asterisk `*`, light gray input border (`#68707F`), blue focus ring (`#0972D3`).
  - Helper/description text beneath inputs in small gray font (`#545B64`).
  - Dynamic record value input adapting to DNS record types (`A`, `AAAA`, `CNAME`, `TXT`, `MX`, `NS`, `PTR`, `SRV`, `CAA`).
- **Modals & Dialogs**:
  - Modal overlay with dimmed backdrop (`rgba(0, 0, 0, 0.4)`).
  - Confirmation dialog with warning banner / icon and explicit "Cancel" vs. "Confirm / Delete" action buttons.
- **Toast Notifications / Alerts**:
  - Full-width or floating banner alerts with color-coded status stripes (Green for Success `#037F0C`, Red for Error `#D13212`, Blue for Info `#0073BB`).

---

## 2. Screenshot Library Index

| Screenshot File | Screen / Area | UI Elements Demonstrated | Source / Documentation Reference |
| :--- | :--- | :--- | :--- |
| `route53-overview.png` | Global Shell & Navigation | AWS top navigation bar, search, sidebar menu items, active indicator, and main content area | Official AWS Management Console / Route 53 Developer Guide |
| `route53-hosted-zones-list.png` | Hosted Zones Table View | Hosted zones data table, column layout (Name, Type, Record count, Comment), search bar, pagination controls, selection | Official AWS Route 53 Console Documentation |
| `route53-hosted-zone-create.png` | Create Hosted Zone Page | Domain name input, description textarea, Type selector (Public / Private hosted zone), VPC association options, CTA buttons | Official AWS Route 53 Developer Guide: *Creating a Public/Private Hosted Zone* |
| `route53-hosted-zone-details.png` | Hosted Zone Detail Page | Hosted zone summary card (Zone ID, Name, Record count, NS list) and nested DNS Records table | Official AWS Route 53 Console Documentation |
| `route53-records-list.png` | DNS Records Table View | DNS records table (Record name, Type, TTL, Value/Route traffic to, Routing policy), Type filter dropdown, Search box | Official AWS Route 53 Developer Guide: *Listing Records* |
| `route53-record-create.png` | Create Record Interface | Dynamic record form, Record name prefix, Record type select (`A`, `AAAA`, `CNAME`, etc.), TTL input, Value textarea, Routing policy selector | Official AWS Route 53 Developer Guide: *Creating Records using the Console* |
| `route53-record-edit.png` | Edit Record Drawer / Modal | In-place record editing drawer/form, updated values, save and cancel buttons | Official AWS Route 53 Developer Guide: *Editing Records* |
| `route53-record-delete.png` | Delete Confirmation Modal | Destructive action confirmation dialog, warning text, danger action button, cancel button | Official AWS Route 53 Developer Guide: *Deleting Resource Record Sets* |
| `route53-empty-state.png` | Empty Table State | No hosted zones/records message, descriptive text, and primary call-to-action button | AWS Cloudscape Design System / Route 53 Console |

---

## 3. UI Guidelines for Implementation Agents

1. **Strictly adhere to the design specifications in `docs/06-UI-UX-SPEC.md`**.
2. **Do not create generic SaaS or startup dashboard aesthetics** (e.g., no purple neon glowing gradients, no oversized cards with decorative charts, no marketing copy).
3. **Use the exact Cloudscape / AWS color palette**:
   - Navigation Bar: `#161E2D` / `#232F3E`
   - Content Background: `#F8F9FA` / `#FFFFFF`
   - Primary Accent / CTA: `#EC7211` / `#FF9900`
   - Link / Active Indicator: `#0972D3`
   - Border Color: `#EAEDED` / `#D5DBDB`
   - Text Primary: `#161E2D`
   - Text Secondary: `#545B64`
4. **Ensure responsive fluid layouts** that prioritize a desktop cloud-management workflow while gracefully supporting tablet viewports.
