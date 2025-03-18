from rest_framework import serializers
from .models import Rating, Feedback

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'student', 'class_obj', 'rating', 'created_at']
        read_only_fields = ['student', 'created_at']


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'student', 'class_obj', 'text', 'sentiment_score', 'sentiment_label', 'created_at']
        read_only_fields = ['student', 'sentiment_score', 'sentiment_label', 'created_at']
