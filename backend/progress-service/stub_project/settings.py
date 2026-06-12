from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'prototype-only-stub-secret-key'
DEBUG = True
ALLOWED_HOSTS = ['*']
INSTALLED_APPS = ['django.contrib.contenttypes', 'stub_api']
MIDDLEWARE = ['stub_api.middleware.CorsMiddleware', 'django.middleware.common.CommonMiddleware']
ROOT_URLCONF = 'stub_project.urls'
DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': BASE_DIR / 'db.sqlite3'}}
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
