# DeutschMeister Prototype

DeutschMeister is a polished React + Django microservices prototype for a German language learning platform. The frontend emphasizes editorial hero imagery, generous spacing, rounded cards, mobile navigation, dark mode, and Framer Motion interactions. The backend includes one fully functional JWT auth service, seven lightweight stub services, and an AI tutor service that can call OpenAI when an API key is configured.

## Architecture

- **Frontend**: React, Vite, React Router, Tailwind CSS, Framer Motion, Lucide icons.
- **Auth service**: Django, Django REST Framework, SimpleJWT, SQLite.
- **Stub services**: Minimal Django projects returning success JSON for every configured endpoint.
- **Tutor service**: Django service on port 8009 with a CEFR-aware AI tutor endpoint powered by the OpenAI Responses API when `OPENAI_API_KEY` is available, and a safe prototype fallback when it is not.

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
| AI Tutor | 8009 | `/api/tutor/`, `/api/tutor/chat/` |

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
pip install -r backend/tutor-service/requirements.txt
```

The seven stub services only require Django, so the lessons-service requirements are sufficient for all stubs. The tutor service additionally installs the OpenAI Python SDK.

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

This runs `scripts/dev.sh`, which starts the nine Django services and the Vite frontend. Open `http://localhost:5173`.

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
python backend/tutor-service/manage.py runserver 8009
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

## AI Tutor service

The tutor service exposes a conversational endpoint for German practice:

```bash
curl -X POST http://localhost:8009/api/tutor/chat/ \
  -H 'Content-Type: application/json' \
  -d '{"message":"Bitte korrigiere meinen Satz: Ich gehe gestern ins Kino.","level":"A2","focus":"grammar repair"}'
```

If `OPENAI_API_KEY` is set, the service calls OpenAI using `OPENAI_MODEL` (default: `gpt-5.2`). If no key is configured, it returns a deterministic prototype response so the UI and Docker stack still work offline.

## Running with Docker

1. Optional: create a `.env` file for the AI tutor.

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-5.2
```

2. Build and start all services plus the frontend.

```bash
docker compose up --build
```

3. Open the app at `http://localhost:5173`. The compose stack exposes:

- Auth service: `http://localhost:8001`
- Stub services: `http://localhost:8002` through `http://localhost:8008`
- AI tutor service: `http://localhost:8009`
- Frontend: `http://localhost:5173`

4. Stop the stack.

```bash
docker compose down
```

The auth container runs migrations and seeds the demo users on startup. A named Docker volume stores the auth SQLite database at `/data/db.sqlite3`.

## Frontend pages

- `/` landing page with hero, how-it-works, feature grid, CEFR cards, stats, and footer.
- `/signup` functional signup flow.
- `/login` functional login flow prefilled with the demo user.
- `/dashboard` protected dashboard calling all stub services and the AI tutor from feature cards.
- `/learn`, `/practice`, `/speak`, `/profile` rich section pages with level cards and animated service response modals. `/speak` also includes an embedded AI tutor chat panel.
