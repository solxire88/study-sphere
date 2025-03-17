from rest_framework import serializers
from .models import Class, EnrollmentRequest

class ClassSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    tags = serializers.ListField(
        child=serializers.CharField(),
        allow_empty=True,
        required=False
    )
    # Show enrolled students
    enrolled_students = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='username'
    )

    class Meta:
        model = Class
        fields = [
            'id', 'title', 'author', 'tags', 'schedule',
            'description', 'syllabus', 'enrolled_students'
        ]
        read_only_fields = ('author', 'enrolled_students')

class EnrollmentRequestSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField(read_only=True)
    class_obj = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all(), write_only=True)

    class Meta:
        model = EnrollmentRequest
        fields = ['id', 'student', 'class_obj', 'status']
        read_only_fields = ('student', 'status')

class EnrollmentStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnrollmentRequest
        fields = ['status']