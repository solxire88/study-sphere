from django.contrib import admin
from .models import Rating, Feedback

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'class_obj', 'rating', 'created_at')
    search_fields = ('student__username', 'class_obj__title')
    list_filter = ('class_obj', 'rating')


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'class_obj', 'sentiment_label', 'sentiment_score', 'created_at')
    search_fields = ('student__username', 'class_obj__title', 'text')
    list_filter = ('sentiment_label', 'class_obj')
