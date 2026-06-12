from django.urls import path, re_path
from stub_api.views import stub_view

urlpatterns = [
    path('', stub_view, name='root'),
    path('api/lessons/', stub_view, name='lessons'),
    re_path(r'^api/lessons/.*$', stub_view, name='lessons-catch-all'),
]
