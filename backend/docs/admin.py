from django.contrib import admin
from .models import Document

# Register your models here.
@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'file_type', 'file_size', 'author', 'class_obj')
    search_fields = ('title', 'author__username')
    list_filter = ('file_type', 'class_obj')