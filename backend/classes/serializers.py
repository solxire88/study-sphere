from rest_framework import serializers
from .models import Class, EnrollmentRequest
from api.models import User

class ClassSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Class
        fields = '__all__'
        read_only_fields = ('author',)

class EnrollmentRequestSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField(read_only=True)
    class_obj = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all(), write_only=True)

    class Meta:
        model = EnrollmentRequest
        fields = '__all__'
        read_only_fields = ('student', 'status', 'created_at')

class EnrollmentStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnrollmentRequest
        fields = ('status',)