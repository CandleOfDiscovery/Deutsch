from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'prototype-only-tutor-secret-key'
DEBUG = True
ALLOWED_HOSTS = ['*']
INSTALLED_APPS = ['django.contrib.contenttypes', 'tutor_api']
MIDDLEWARE = ['tutor_api.middleware.CorsMiddleware', 'django.middleware.common.CommonMiddleware']
ROOT_URLCONF = 'tutor_project.urls'
DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': BASE_DIR / 'db.sqlite3'}}
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
