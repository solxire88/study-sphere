# api/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class User(AbstractUser):
    ROLES = (
        ('student', 'Student'),
        ('educator', 'Educator'),
    )
    role = models.CharField(max_length=10, choices=ROLES, default='student')
    
    # REQUIRED FIELDS
    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        related_name="api_user_groups",
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name="api_user_permissions",
        related_query_name="user",
    )

    def __str__(self):
        return self.username