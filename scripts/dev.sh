#!/usr/bin/env bash
set -euo pipefail
trap 'kill 0' EXIT
python backend/auth-service/manage.py runserver 8001 &
python backend/lessons-service/manage.py runserver 8002 &
python backend/vocabulary-service/manage.py runserver 8003 &
python backend/grammar-service/manage.py runserver 8004 &
python backend/exam-service/manage.py runserver 8005 &
python backend/speaking-service/manage.py runserver 8006 &
python backend/writing-service/manage.py runserver 8007 &
python backend/progress-service/manage.py runserver 8008 &
python backend/tutor-service/manage.py runserver 8009 &
npm --prefix frontend run dev &
wait
