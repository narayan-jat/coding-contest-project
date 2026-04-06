# Product: Participant Experience

This document describes the **participant-facing product**—discovery, registration, and practice-style views—and how it fits the rest of the platform.

---

## Problem you are solving for participants

Participants need **clarity**: which contests are open, whether they can still register, and where to read problems. They should not hunt through chat threads or PDFs for rules and timelines.

---

## What you shipped (this codebase)

- **Landing and marketing surface** (`/`) — hero, branding, feature narrative, and contest discovery hooks that funnel users toward sign-up/login.
- **Authentication**: same Firebase-backed account as hosts; after login, participants can reach protected routes intended for their role.
- **Contest detail access** (`/contests/:contestId/details`) — authenticated view to inspect a contest (aligned with host-created data when wired to the same APIs).
- **Registration**: Django **`ContestRegistration`** model and **`ContestRegistrationView`** under `participant/` URLs support creating and listing registrations via the API—foundation for “one click register” in the UI.
- **Participant dashboard** (`participant/dashboard`) — shell with header and **contest history** component structure for ongoing work.
- **Shared leaderboard page** — reused for participant vs host header context; demonstrates **search, sort, and pagination** UX (currently fed with static data as a prototype).
- **Questions page** (`/questions`) — searchable, expandable problem cards with sample statements (static list today; demonstrates UI patterns for a future API-driven problem set).
- **Support** (`/support`) — contact/help entry point for the product story.

---

## Technical expertise demonstrated

| Topic | How it shows up here |
|-------|----------------------|
| **Role-aware UI** | Shared `Header` with `headerType` prop; routes split between public and protected participant paths. |
| **Client-side discovery** | Search/filter/sort patterns on questions and leaderboard without round-trips—easy to swap data source to the API. |
| **API alignment** | `PARTICIPANT_ENDPOINT` in constants and participant URLconf mirror a clean **BFF-style** split from the host API surface. |
| **Consistency with domain** | Registrations and future rankings map directly to relational tables already defined on the server. |

---

## Impact framing (credible)

- **Lowers onboarding friction**: one account and one dashboard concept instead of separate tools for “seeing contests” vs “entering them.”
- **UI readiness**: leaderboard and questions screens prove you can build **data-dense, interactive** views before the judge pipeline exists—useful for staged delivery (“we shipped discovery and registration first”).
- **Next measurable wins**: registration conversion (views → successful `ContestRegistration` POST), or time-on-page on contest details—once analytics are added.

---

## Honest limitations (strength in interviews)

- **Leaderboard** and **questions** content are largely **mocked in the frontend** to showcase interaction design; connecting them to `GET` endpoints on `Ranking` and contest problems is the natural Phase 2.
- **Submissions and auto-grading** are modeled in the database but not exposed as a complete participant flow yet—clear roadmap item tied to `Submissions`, `TestCases`, and `SubmissionResult`.
