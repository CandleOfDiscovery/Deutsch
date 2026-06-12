from django.urls import path, re_path
from stub_api.views import stub_view

urlpatterns = [
    path('', stub_view, name='root'),
    path('api/speaking/', stub_view, name='speaking'),
    re_path(r'^api/speaking/.*$', stub_view, name='speaking-catch-all'),
]
