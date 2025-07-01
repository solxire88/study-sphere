from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['role'] = user.role 
        token['id']   = user.id
        token['username']   = user.username

        return token
    
    def validate(self, attrs):
        # runs the default validation (checking username/password)
        data = super().validate(attrs)

        # Add custom response fields
        data['role'] = self.user.role
        data['id']   = self.user.id
        data['username']   = self.user.username
        return data