from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Class, EnrollmentRequest
from .serializers import ClassSerializer, EnrollmentRequestSerializer, EnrollmentStatusUpdateSerializer
from .permissions import IsEducator, IsStudent
from api.models import User

# Class Views
class ClassListCreateView(generics.ListCreateAPIView):
    serializer_class = ClassSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsEducator()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        return Class.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ClassRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [IsEducator]

    def get_queryset(self):
        return super().get_queryset().filter(author=self.request.user)

# Enrollment Views
class EnrollmentCreateView(generics.CreateAPIView):
    serializer_class = EnrollmentRequestSerializer
    permission_classes = [IsStudent]

    def perform_create(self, serializer):
        class_obj = serializer.validated_data['class_obj']
        serializer.save(student=self.request.user, status='pending')

class EnrollmentListView(generics.ListAPIView):
    serializer_class = EnrollmentRequestSerializer
    permission_classes = [IsEducator]

    def get_queryset(self):
        return EnrollmentRequest.objects.filter(class_obj__author=self.request.user)

class EnrollmentStatusUpdateView(generics.UpdateAPIView):
    serializer_class = EnrollmentStatusUpdateSerializer
    permission_classes = [IsEducator]
    queryset = EnrollmentRequest.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(class_obj__author=self.request.user)