from rest_framework.permissions import BasePermission
from rest_framework import permissions

class IsEducator(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'educator'

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'
    
class IsEnrolledStudent(permissions.BasePermission):
    """
    Only allow students who are enrolled in the class to access it.
    """

    def has_object_permission(self, request, view, obj):
        # obj is a Class instance
        return request.user in obj.enrolled_students.all()