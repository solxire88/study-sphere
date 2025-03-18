from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Avg
from transformers import pipeline
from .models import Rating, Feedback
from .serializers import RatingSerializer, FeedbackSerializer
from classes.models import Class

# Initialize the Hugging Face sentiment-analysis pipeline with a small model.
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

class RatingCreateView(generics.CreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)


class ClassAverageRatingView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, class_id):
        avg_rating = Rating.objects.filter(class_obj_id=class_id).aggregate(average=Avg('rating'))
        return Response(avg_rating, status=status.HTTP_200_OK)


class EducatorAverageRatingView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, educator_id):
        classes = Class.objects.filter(author_id=educator_id)
        avg_rating = Rating.objects.filter(class_obj__in=classes).aggregate(average=Avg('rating'))
        return Response(avg_rating, status=status.HTTP_200_OK)


class FeedbackCreateView(generics.CreateAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        text = serializer.validated_data['text']
        # Use Hugging Face pipeline for sentiment analysis.
        result = sentiment_pipeline(text)
        # result is a list like: [{"label": "POSITIVE", "score": 0.95}]
        label = result[0]["label"]
        score = result[0]["score"]
        # Convert score: positive remains positive, negative becomes negative.
        if label == "NEGATIVE":
            score = -score
        serializer.save(
            student=self.request.user, 
            sentiment_score=score, 
            sentiment_label=label
        )


class ClassAverageSentimentView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, class_id):
        avg_sentiment = Feedback.objects.filter(class_obj_id=class_id).aggregate(average=Avg('sentiment_score'))
        return Response(avg_sentiment, status=status.HTTP_200_OK)


class EducatorAverageSentimentView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, educator_id):
        classes = Class.objects.filter(author_id=educator_id)
        avg_sentiment = Feedback.objects.filter(class_obj__in=classes).aggregate(average=Avg('sentiment_score'))
        return Response(avg_sentiment, status=status.HTTP_200_OK)
