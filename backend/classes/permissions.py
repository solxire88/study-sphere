from rest_framework.permissions import BasePermission

class IsEducator(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'educator'

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'