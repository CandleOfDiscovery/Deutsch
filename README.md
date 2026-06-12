# DeutschMeister Prototype

DeutschMeister is a polished React + Django microservices prototype for a German language learning platform. The frontend emphasizes editorial hero imagery, generous spacing, rounded cards, mobile navigation, dark mode, and Framer Motion interactions. The backend includes one fully functional JWT auth service and seven lightweight stub services.

## Architecture

- **Frontend**: React, Vite, React Router, Tailwind CSS, Framer Motion, Lucide icons.
- **Auth service**: Django, Django REST Framework, SimpleJWT, SQLite.
- **Stub services**: Minimal Django projects returning success JSON for every configured endpoint.

## Service Ports

| Service | Port | Endpoint |
| --- | ---: | --- |
| Auth | 8001 | `/api/auth/signup/`, `/api/auth/login/`, `/api/auth/me/` |
| Lessons | 8002 | `/api/lessons/` |
| Vocabulary | 8003 | `/api/vocabulary/` |
| Grammar | 8004 | `/api/grammar/` |
| Exam | 8005 | `/api/exam/` |
| Speaking | 8006 | `/api/speaking/` |
| Writing | 8007 | `/api/writing/` |
| Progress | 8008 | `/api/progress/` |

## Quick Start

### 1. Frontend dependencies

```bash
npm install
npm --prefix frontend install
```

### 2. Backend dependencies

For a prototype, you can use one virtual environment for all services:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/auth-service/requirements.txt
pip install -r backend/lessons-service/requirements.txt
```

The seven stub services only require Django, so the lessons-service requirements are sufficient for all stubs.

### 3. Initialize auth database and seed demo users

```bash
python backend/auth-service/manage.py migrate
python backend/auth-service/manage.py seed_demo_users
```

Seeded accounts:

- `demo@deutschmeister.dev` / `DemoPass123!`
- `anna@deutschmeister.dev` / `DemoPass123!`

### 4. Configure frontend environment

```bash
cp frontend/.env.example frontend/.env
```

### 5. Run everything

```bash
npm run dev
```

This runs `scripts/dev.sh`, which starts the eight Django services and the Vite frontend. Open `http://localhost:5173`.

## Running services individually

```bash
python backend/auth-service/manage.py runserver 8001
python backend/lessons-service/manage.py runserver 8002
python backend/vocabulary-service/manage.py runserver 8003
python backend/grammar-service/manage.py runserver 8004
python backend/exam-service/manage.py runserver 8005
python backend/speaking-service/manage.py runserver 8006
python backend/writing-service/manage.py runserver 8007
python backend/progress-service/manage.py runserver 8008
npm --prefix frontend run dev
```

## Auth API

### Sign up

```bash
curl -X POST http://localhost:8001/api/auth/signup/ \
  -H 'Content-Type: application/json' \
  -d '{"name":"Max Muster","email":"max@example.com","password":"DemoPass123!"}'
```

### Login

```bash
curl -X POST http://localhost:8001/api/auth/login/ \
  -H 'Content-Type: application/json' \
  -d '{"email":"demo@deutschmeister.dev","password":"DemoPass123!"}'
```

### Current user

```bash
curl http://localhost:8001/api/auth/me/ -H 'Authorization: Bearer <access-token>'
```

## Frontend pages

- `/` landing page with hero, how-it-works, feature grid, CEFR cards, stats, and footer.
- `/signup` functional signup flow.
- `/login` functional login flow prefilled with the demo user.
- `/dashboard` protected dashboard calling all stub services from feature cards.
- `/learn`, `/practice`, `/speak`, `/profile` rich section pages with level cards and animated service response modals.
