from django.urls import path
from auth_api.views import LoginView, MeView, SignupView

urlpatterns = [
    path('api/auth/signup/', SignupView.as_view(), name='signup'),
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/auth/me/', MeView.as_view(), name='me'),
]
