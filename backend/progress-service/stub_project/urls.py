from django.urls import path, re_path
from stub_api.views import stub_view

urlpatterns = [
    path('', stub_view, name='root'),
    path('api/progress/', stub_view, name='progress'),
    re_path(r'^api/progress/.*$', stub_view, name='progress-catch-all'),
]
