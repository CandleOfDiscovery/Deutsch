from django.urls import path, re_path
from stub_api.views import stub_view

urlpatterns = [
    path('', stub_view, name='root'),
    path('api/writing/', stub_view, name='writing'),
    re_path(r'^api/writing/.*$', stub_view, name='writing-catch-all'),
]
