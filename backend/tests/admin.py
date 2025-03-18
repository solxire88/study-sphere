from django.contrib import admin
from .models import Test, Question, AnswerOption

class AnswerOptionInline(admin.TabularInline):
    model = AnswerOption
    extra = 4

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1

@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'class_obj', 'created_by', 'created_at')
    search_fields = ('title', 'created_by__username', 'class_obj__title')

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'test', 'text', 'order')

@admin.register(AnswerOption)
class AnswerOptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'text', 'is_correct')
