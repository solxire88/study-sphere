from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    # Include the 'role' field in the fieldsets for editing an existing user
    fieldsets = BaseUserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )
    # Include the 'role' field in the add_fieldsets for creating a new user
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (None, {'fields': ('role',)}),
    )
    # Optionally, display 'role' in the list view
    list_display = ('id', 'username', 'email', 'role', 'is_staff')

admin.site.register(User, UserAdmin)
