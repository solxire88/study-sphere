from django.db import models

# Create your models here.

from django.db import models
from django.conf import settings
from classes.models import Class

class ChatMessage(models.Model):
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='chat_messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='chat_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} at {self.timestamp}: {self.content[:50]}"