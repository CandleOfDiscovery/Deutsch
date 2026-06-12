from django.urls import path, re_path
from stub_api.views import stub_view

urlpatterns = [
    path('', stub_view, name='root'),
    path('api/grammar/', stub_view, name='grammar'),
    re_path(r'^api/grammar/.*$', stub_view, name='grammar-catch-all'),
]
