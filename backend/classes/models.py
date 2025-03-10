from django.db import models
from api.models import User

class Class(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authored_classes')
    tags = models.JSONField(default=dict)
    schedule = models.TextField()
    description = models.TextField()
    syllabus = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class EnrollmentRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollment_requests')
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='enrollments')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'class_obj')

    def __str__(self):
        return f"{self.student} - {self.class_obj}"