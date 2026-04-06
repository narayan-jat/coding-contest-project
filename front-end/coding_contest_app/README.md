# CodeHut — Frontend (React + Vite)

Single-page application for the coding contest platform: **landing**, **Firebase-authenticated** host and participant flows, and Axios integration with the Django API.

---

## Stack

- **React 18** with **Vite 5**
- **React Router 6** — public routes, `ProtectedRoute` guard, nested contest-edit routes
- **Firebase** — `firebase/auth` for sign-in/up, `firebase/storage` for contest banners
- **HTTP** — Axios with shared helpers in `src/host/apis/ApiRequests.js` and error handling in `Exceptions.js`
- **UI** — Bootstrap 5, React Bootstrap, MUI, Font Awesome, assorted component libraries (incrementally adopted)

---

## Local development

```bash
npm install
npm run dev
```

Default Vite dev server: `http://localhost:5173`

Point the client at your API by editing [`src/Constants.js`](src/Constants.js) (`BASE_SERVER_URL`).

Firebase configuration lives in [`src/firebase/firebase.js`](src/firebase/firebase.js). Without valid keys, auth and storage calls will fail at runtime.

---

## Source layout (mental map)

| Area | Path |
|------|------|
| Routes | `src/Router.jsx` |
| Auth context | `src/context/user.jsx` |
| Landing | `src/common/landing/` |
| Host UI | `src/host/` — `pages/`, `components/` (login, signup, dashboard, contest creation, leaderboard, profile) |
| Participant UI | `src/participant/` |
| Shared utilities | `src/utilities/` — `ProtectedRoute`, contest details, support, styles |

---

## Product documentation

- **Organizer (host) narrative**: [`../../docs/README-host-organizer.md`](../../docs/README-host-organizer.md)
- **Participant narrative**: [`../../docs/README-participant.md`](../../docs/README-participant.md)
- **Monorepo overview**: [`../../README.md`](../../README.md)

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

---

## Interview angles

- **Split by persona** in folder structure and routes mirrors how you would scale teams or code ownership.
- **ProtectedRoute + auth loading** shows you understand async identity before rendering sensitive screens.
- **Multipart + REST** usage matches the Django backend’s parsers—good talking point for full-stack contracts.
