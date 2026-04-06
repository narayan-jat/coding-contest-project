# Product: Host & Organizer Experience

This document describes the **organizer-facing product** in the CodeHut monorepo—what it does, how it is built.
---

## Problem you are solving for hosts

Student clubs and small orgs need a **single place** to define when a contest runs, who can join, what problems count, and what winners receive—without paying for enterprise tooling or bending a generic form builder into a contest shape.

---

## What you shipped (this codebase)

- **Authentication-aware shell**: routes under `/administration/*` and `/profile` are wrapped in a **protected route** that waits for Firebase auth state and redirects anonymous users to login.
- **Operational dashboard**: entry point after login for hosts to manage their world (contests, leaderboard view shared with participants, profile).
- **Contest lifecycle**:
  - Create flow: `/administration/contests/create` and related steps (registration fields, about page, challenge selection/creation, prizes).
  - Edit flow: nested routes under `/administration/contests/:contestId/edit` (basic details, about, challenges, prizes, including prize create/edit).
  - List hosted contests and delete contests via API.
- **Rich contest metadata**: organization type/name, visibility, participant caps, registration deadline, start/end times—persisted through DRF serializers.
- **Problems (“challenges”)**: create problems with statement, formats, constraints, difficulty, weightage; attach/detach from contests; ordering and per-contest weight supported at the model/API level.
- **Prizes**: create, list, update, delete prizes per contest through dedicated endpoints.
- **Media**: contest banner workflow using **Firebase Storage** (upload → download URL stored with contest details).

---

## Technical expertise demonstrated

| Topic | How it shows up here |
|-------|----------------------|
| **SPA architecture** | React Router with nested layouts for contest editing; separation of `host/`, `participant/`, `common/` trees. |
| **API design consumption** | Centralized Axios helpers (`getData`, `sendData`, `putData`, `deleteData`) and consistent JSON/status handling. |
| **Forms & uploads** | `multipart/form-data` aligned with DRF `MultiPartParser` / `FormParser` on contest and user endpoints. |
| **State & auth** | React context bridging Firebase user → backend `user_id` for host-scoped queries. |
| **UX polish** | Loading overlay on auth resolution, toast/SweetAlert feedback, responsive tables and sidebars. |

---

## Impact framing (credible)

- **Reduces conceptual fragmentation**: one guided flow replaces disconnected docs/forms for “when / who / what / prizes.”
- **Scales with schema**: the same APIs that power the UI also expose **Swagger**—useful for collaborators, mobile clients, or automation later.
- **Measurable when you instrument**: time to create a contest (form completion), number of API round-trips per step, or validation error rate are all fair metrics to add with basic logging—good interview follow-up (“here is what I would instrument first”).


## Honest limitations (strength in interviews)

- Leaderboard UI in the app currently uses **static sample rows**; the **`Ranking`** model exists to back a real implementation.
- **Server-side Firebase token verification** is prepared in code comments but not enabled globally in DRF settings—worth naming as a deliberate security backlog item.
