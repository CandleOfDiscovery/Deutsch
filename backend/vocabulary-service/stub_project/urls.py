from django.urls import path, re_path
from stub_api.views import stub_view

urlpatterns = [
    path('', stub_view, name='root'),
    path('api/vocabulary/', stub_view, name='vocabulary'),
    re_path(r'^api/vocabulary/.*$', stub_view, name='vocabulary-catch-all'),
]
