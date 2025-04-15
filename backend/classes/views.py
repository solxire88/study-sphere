from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Class, EnrollmentRequest
from .serializers import ClassSerializer, EnrollmentRequestSerializer, EnrollmentStatusUpdateSerializer
from .permissions import IsEducator, IsStudent
from api.models import User

# Class Views
# List all classes and create a new class
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

# Retrieve, update, or delete a class
class ClassRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [IsEducator]

    def get_queryset(self):
        return super().get_queryset().filter(author=self.request.user)

# Student Enrolls in a Class
class EnrollmentCreateView(generics.CreateAPIView):
    serializer_class = EnrollmentRequestSerializer
    permission_classes = [IsStudent]

    def perform_create(self, serializer):
        class_obj = serializer.validated_data['class_obj']
        instance = serializer.save(student=self.request.user, status='pending')

        if instance.status == 'accepted':
            instance.class_obj.enrolled_students.add(instance.student)
        
        # Remove student if declined
        elif instance.status == 'declined':
            instance.class_obj.enrolled_students.remove(instance.student)

# List all enrollments
class EnrollmentListView(generics.ListAPIView):
    serializer_class = EnrollmentRequestSerializer
    permission_classes = [IsEducator]

    def get_queryset(self):
        return EnrollmentRequest.objects.filter(class_obj__author=self.request.user)

# Update enrollment status
class EnrollmentStatusUpdateView(generics.UpdateAPIView):
    serializer_class = EnrollmentStatusUpdateSerializer
    permission_classes = [IsEducator]
    queryset = EnrollmentRequest.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(class_obj__author=self.request.user)
    

# Student Views
# List all enrollments for a student
class StudentPendingEnrollmentListView(generics.ListAPIView):
    serializer_class = EnrollmentRequestSerializer
    permission_classes = [IsStudent]

    def get_queryset(self):
        # Only return enrollments for the logged-in student with status "pending"
        return EnrollmentRequest.objects.filter(student=self.request.user, status='pending')


# List accepted enrollments for a student
class StudentAcceptedEnrollmentListView(generics.ListAPIView):
    serializer_class = EnrollmentRequestSerializer
    permission_classes = [IsStudent]

    def get_queryset(self):
        # Only return enrollments for the logged-in student with status "accepted"
        return EnrollmentRequest.objects.filter(student=self.request.user, status='accepted')


# New view for a student to cancel (delete) an enrollment request
class EnrollmentDeleteView(generics.DestroyAPIView):
    serializer_class = EnrollmentRequestSerializer
    permission_classes = [IsStudent]
    queryset = EnrollmentRequest.objects.all()

    def get_queryset(self):
        # Ensure a student can only delete his own enrollment requests
        return super().get_queryset().filter(student=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # If the enrollment has been accepted, remove the student from the class as well
        if instance.status == 'accepted':
            instance.class_obj.enrolled_students.remove(instance.student)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# New view for a student to list available classes
class StudentAvailableClassListView(generics.ListAPIView):
    serializer_class = ClassSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        # List classes where the current student is NOT in enrolled_students
        return Class.objects.exclude(enrolled_students=self.request.user)
    
# View for classes the student is accepted in (enrolled classes)
class StudentAcceptedClassListView(generics.ListAPIView):
    serializer_class = ClassSerializer
    permission_classes = [permissions.IsAuthenticated, IsStudent]

    def get_queryset(self):
        # List classes where the current student IS in enrolled_students
        return Class.objects.filter(enrolled_students=self.request.user)