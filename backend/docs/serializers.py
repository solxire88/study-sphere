# docs/serializers.py
from rest_framework import serializers
from .models import *

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        # include all fields, but make author & class_obj read-only
        fields = '__all__'
        read_only_fields = ('id', 'author', 'class_obj', 'uploaded_at')

class DocumentProgressSerializer(serializers.ModelSerializer):
    student = serializers.SlugRelatedField(read_only=True, slug_field='username')
    document = serializers.SlugRelatedField(read_only=True, slug_field='title')

    class Meta:
        model = DocumentProgress
        fields = ['student', 'document', 'downloaded_at']