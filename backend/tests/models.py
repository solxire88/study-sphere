from django.db import models
from django.conf import settings
from classes.models import Class

class Test(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='tests')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tests')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()
    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"Question {self.order}: {self.text[:50]}"


class AnswerOption(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answer_options')
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text
