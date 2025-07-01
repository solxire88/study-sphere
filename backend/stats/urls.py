from django.urls import path
from .views import (
    RatingCreateView,
    ClassAverageRatingView,
    EducatorAverageRatingView,
    FeedbackCreateView,
    ClassAverageSentimentView,
    EducatorAverageSentimentView,
    StudentRatingDetailView,
    StudentFeedbackDetailView,
)

urlpatterns = [
    path('rate/', RatingCreateView.as_view(), name='rating-create'),
    path('class/<int:class_id>/average/', ClassAverageRatingView.as_view(), name='class-average-rating'),
    path('educator/<int:educator_id>/average/', EducatorAverageRatingView.as_view(), name='educator-average-rating'),
    path('feedback/', FeedbackCreateView.as_view(), name='feedback-create'),
    path('class/<int:class_id>/sentiment/', ClassAverageSentimentView.as_view(), name='class-average-sentiment'),
    path('educator/<int:educator_id>/sentiment/', EducatorAverageSentimentView.as_view(), name='educator-average-sentiment'),
    path('rate/me/<int:class_id>/', StudentRatingDetailView.as_view(), name='rate-me'),
    path('feedback/me/<int:class_id>/', StudentFeedbackDetailView.as_view(), name='feedback-me'),
    
]
