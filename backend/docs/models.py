# docs/models.py
from django.db import models
from api.models import User
from classes.models import Class  # added so documents are linked to a class

class Document(models.Model):
    title = models.CharField(max_length=255)
    file_type = models.CharField(max_length=255)
    file_size = models.CharField(max_length=50)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    file = models.FileField(upload_to='documents/')
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='documents')

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'document'  # set a custom table name or leave it blank for the default
        managed = True
        verbose_name = 'Document'
        verbose_name_plural = 'Documents'
