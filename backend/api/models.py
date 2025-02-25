from django.db import models
from django.contrib.auth.models import User


# Create your models here.

# models.py
from django.db import models
from django.contrib.auth.models import User

class Educator(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    enrolled_classes = models.ManyToManyField('Class')

class Class(models.Model):
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(Educator, on_delete=models.CASCADE)