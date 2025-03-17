from django.contrib import admin
from django.utils.html import format_html
from .models import Class, EnrollmentRequest
from api.models import User

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'enrolled_students_count', 'enrollment_status')
    list_filter = ('author', 'enrolled_students')
    search_fields = ('title', 'description', 'enrolled_students__username')
    filter_horizontal = ('enrolled_students',)  # Better UI for M2M management
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'author', 'tags')
        }),
        ('Schedule & Content', {
            'fields': ('schedule', 'description', 'syllabus')
        }),
        ('Enrollment', {
            'fields': ('enrolled_students',),
            'classes': ('collapse',)
        }),
    )

    def enrolled_students_count(self, obj):
        return obj.enrolled_students.count()
    enrolled_students_count.short_description = 'Enrolled Students'

    def enrollment_status(self, obj):
        pending = obj.enrollments.filter(status='pending').count()
        return format_html(
            '<span style="color: {};">{} Approved</span>, <span style="color: orange;">{} Pending</span>',
            'green',
            obj.enrolled_students.count(),
            pending
        )
    enrollment_status.short_description = 'Enrollment Status'

    def save_model(self, request, obj, form, change):
        if not obj.author_id:
            obj.author = request.user
        super().save_model(request, obj, form, change)

@admin.register(EnrollmentRequest)
class EnrollmentRequestAdmin(admin.ModelAdmin):
    list_display = ('student', 'class_obj', 'status')
    list_display_links = ('student', 'class_obj')
    list_editable = ('status',)
    list_filter = ('status', 'class_obj')
    search_fields = ('student__username', 'class_obj__title')
    actions = ['approve_selected', 'decline_selected']

    fieldsets = (
        ('Enrollment Details', {
            'fields': ('student', 'class_obj', 'status')
        }),
    )

    def approve_selected(self, request, queryset):
        for enrollment in queryset:
            if enrollment.status != 'accepted':
                enrollment.status = 'accepted'
                enrollment.save()
                enrollment.class_obj.enrolled_students.add(enrollment.student)
    approve_selected.short_description = "Approve selected enrollments"

    def decline_selected(self, request, queryset):
        for enrollment in queryset:
            if enrollment.status != 'declined':
                enrollment.status = 'declined'
                enrollment.save()
                enrollment.class_obj.enrolled_students.remove(enrollment.student)
    decline_selected.short_description = "Decline selected enrollments"

    def save_model(self, request, obj, form, change):
        # Handle enrollment status changes
        if 'status' in form.changed_data:
            if obj.status == 'accepted':
                obj.class_obj.enrolled_students.add(obj.student)
            elif obj.status == 'declined':
                obj.class_obj.enrolled_students.remove(obj.student)
        super().save_model(request, obj, form, change)

# User Admin
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'enrolled_classes_count', 'is_staff')
    list_filter = ('role', 'is_staff')
    
    def enrolled_classes_count(self, obj):
        return obj.enrolled_classes.count()
    enrolled_classes_count.short_description = 'Classes Enrolled'

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)