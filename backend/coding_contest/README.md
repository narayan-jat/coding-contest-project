# CodeHut — Backend (Django REST)

Django 5 project exposing a **REST API** for users, contests, problems, prizes, and participant registration. Designed as the **system of record** while Firebase handles client-side authentication.

---

## Stack

- **Django 5** + **Django REST Framework 3**
- **django-cors-headers** — browser access from the Vite dev origin
- **drf-yasg** — OpenAPI schema and **Swagger UI** at `/swagger/`
- **SQLite** — default in `settings.py` for local development
- **dj-database-url** + **psycopg2** — optional PostgreSQL URL without code changes
- **firebase-admin** — present for optional token verification (integration largely commented; see `views/authentications.py`)

---

## Local development

```bash
cd backend/coding_contest   # this directory
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

- API root: `http://127.0.0.1:8000/`
- Admin: `http://127.0.0.1:8000/admin/`
- Swagger: `http://127.0.0.1:8000/swagger/`

---

## URL layout

| Prefix | Purpose |
|--------|---------|
| `auth/` | User signup sync from Firebase (`signup/`) |
| `host/` | Contest CRUD, details, problems, prizes, deletes |
| `participant/` | Contest listing/details patterns, registration |
| `swagger/` | API documentation |

Implementation: `coding_contest_app/urls/{auth,host,participant}.py`.

---

## Data model (summary)

Core entities include **Users**, **UserDetails**, addresses and social links, **Contests** + **ContestDetails**, **Problems**, **ContestProblems** (with uniqueness constraint), **ContestPrizes**, **ContestRegistration**, and forward-looking **Submissions**, **TestCases**, **SubmissionResult**, **Ranking**, **Language**, and **Samples**. See `coding_contest_app/models.py` for the full schema.

---

## Security notes (production)

Before deploying publicly: move `SECRET_KEY` and database credentials to **environment variables**, avoid `CORS_ALLOW_ALL_ORIGINS = True`, and consider enabling **DRF authentication** with verified Firebase tokens. The repo is configured for learning and demos first.


## Interview angles

- **Persona-separated URLconfs** show API design discipline.
- **Prefetch_related** in contest detail views shows ORM performance awareness.
- **Swagger** proves you care about **consumer experience** for the API, not only the React client.
