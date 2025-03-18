from django.urls import path
from .views import (
    RatingCreateView,
    ClassAverageRatingView,
    EducatorAverageRatingView,
    FeedbackCreateView,
    ClassAverageSentimentView,
    EducatorAverageSentimentView
)

urlpatterns = [
    path('rate/', RatingCreateView.as_view(), name='rating-create'),
    path('class/<int:class_id>/average/', ClassAverageRatingView.as_view(), name='class-average-rating'),
    path('educator/<int:educator_id>/average/', EducatorAverageRatingView.as_view(), name='educator-average-rating'),
    path('feedback/', FeedbackCreateView.as_view(), name='feedback-create'),
    path('class/<int:class_id>/sentiment/', ClassAverageSentimentView.as_view(), name='class-average-sentiment'),
    path('educator/<int:educator_id>/sentiment/', EducatorAverageSentimentView.as_view(), name='educator-average-sentiment'),
]
