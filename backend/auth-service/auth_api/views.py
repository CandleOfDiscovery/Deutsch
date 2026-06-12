from django.contrib.auth import authenticate, get_user_model
from django.db import IntegrityError
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


def user_payload(user):
    return {
        'id': user.id,
        'email': user.email,
        'name': user.first_name or user.username,
    }


def token_payload(user):
    refresh = RefreshToken.for_user(user)
    return {'refresh': str(refresh), 'access': str(refresh.access_token), 'user': user_payload(user)}


class SignupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150, trim_whitespace=True)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)

    def validate_email(self, value):
        normalized = value.lower().strip()
        if User.objects.filter(email__iexact=normalized).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return normalized


class SignupView(APIView):
    authentication_classes = []

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        try:
            user = User.objects.create_user(
                username=data['email'],
                email=data['email'],
                password=data['password'],
                first_name=data['name'],
            )
        except IntegrityError:
            return Response({'detail': 'An account with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(token_payload(user), status=status.HTTP_201_CREATED)


class LoginView(APIView):
    authentication_classes = []

    def post(self, request):
        email = str(request.data.get('email', '')).lower().strip()
        password = request.data.get('password', '')
        if not email or not password:
            return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(request, username=email, password=password)
        if user is None:
            return Response({'detail': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(token_payload(user))


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(user_payload(request.user))
