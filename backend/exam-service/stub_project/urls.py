from django.urls import path, re_path
from stub_api.views import stub_view

urlpatterns = [
    path('', stub_view, name='root'),
    path('api/exam/', stub_view, name='exam'),
    re_path(r'^api/exam/.*$', stub_view, name='exam-catch-all'),
]
