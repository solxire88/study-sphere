from django.db import models
from django.conf import settings
from classes.models import Class

class Rating(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='ratings')
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='ratings')
    rating = models.PositiveSmallIntegerField()  # 1 to 5
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'class_obj')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.student} rated {self.class_obj} as {self.rating}"


class Feedback(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='feedbacks')
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='feedbacks')
    text = models.TextField()
    sentiment_score = models.FloatField(null=True, blank=True)
    sentiment_label = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback by {self.student} on {self.class_obj}"
