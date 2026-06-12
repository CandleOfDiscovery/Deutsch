from django.urls import path, re_path
from tutor_api.views import tutor_chat, tutor_health

urlpatterns = [
    path('', tutor_health, name='root'),
    path('api/tutor/', tutor_health, name='tutor-health'),
    path('api/tutor/chat/', tutor_chat, name='tutor-chat'),
    re_path(r'^api/tutor/.*$', tutor_chat, name='tutor-catch-all'),
]
