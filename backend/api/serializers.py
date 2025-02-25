# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Student, Educator

class UserSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(
        choices=['student', 'educator'],
        write_only=True,
        required=True
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'email': {'required': True}
        }

    def create(self, validated_data):
        role = validated_data.pop('role')  # Remove role from data
        user = User.objects.create_user(**validated_data)
        
        # Create the appropriate profile based on role
        if role == 'student':
            Student.objects.create(user=user)
        elif role == 'educator':
            Educator.objects.create(user=user)
            
        return user