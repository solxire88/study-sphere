from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Class, EnrollmentRequest
from .serializers import ClassSerializer, EnrollmentRequestSerializer, EnrollmentStatusUpdateSerializer
from .permissions import *
from api.models import User
from rest_framework.views import APIView
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import serializers


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
        

class EducatorClassListView(generics.ListAPIView):
    serializer_class = ClassSerializer
    permission_classes = [IsEducator]
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsEducator()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        return Class.objects.filter(author=self.request.user)

# Retrieve, update, or delete a class
class ClassRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    # permission_classes = [IsEducator]

    def get_queryset(self):
        return super().get_queryset().filter(author=self.request.user)

# Student Enrolls in a Class
class EnrollmentCreateView(generics.CreateAPIView):
    serializer_class = EnrollmentRequestSerializer
    permission_classes = [IsStudent]

    def perform_create(self, serializer):
        class_obj = serializer.validated_data['class_obj']
        student = self.request.user

        # Check if the user is already enrolled
        if class_obj.enrolled_students.filter(id=student.id).exists():
            # Optional: return early or raise a validation error
            raise serializers.ValidationError("You are already enrolled in this course.")

        # Check if there is already a pending request
        if EnrollmentRequest.objects.filter(student=student, class_obj=class_obj, status='pending').exists():
            raise serializers.ValidationError("You have already submitted a request for this course.")

        instance = serializer.save(student=student, status='pending')

        if instance.status == 'accepted':
            instance.class_obj.enrolled_students.add(instance.student)
        elif instance.status == 'declined':
            instance.class_obj.enrolled_students.remove(instance.student)

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except serializers.ValidationError as e:
            return Response({"detail": str(e.detail)}, status=status.HTTP_400_BAD_REQUEST)

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
    1
    def perform_update(self, serializer):
        # Save the new status
        enrollment_request = serializer.save()

        # If accepted, add the student to enrolled_students
        if enrollment_request.status == 'accepted':
            enrollment_request.class_obj.enrolled_students.add(enrollment_request.student)

        # If declined, remove the student if they were previously added (edge case)
        elif enrollment_request.status == 'declined':
            enrollment_request.class_obj.enrolled_students.remove(enrollment_request.student)
    
        
        # save the new status
        enrollment_request = serializer.save()

        # build email
        student = enrollment_request.student
        class_name = enrollment_request.class_obj
        new_status = enrollment_request.status

        subject = f" StudySphere Enrollment {new_status.capitalize()}"
        message = (
            f"Hi {student.get_full_name() or student.username},\n\n"
            f"Your enrollment request for “{class_name}” has been {new_status}.\n"
            "If you have any questions, feel free to reply to this email.\n\n"
            "Best,\n"
            f"{self.request.user.get_full_name()}"
        )
        from_email = settings.DEFAULT_FROM_EMAIL
        print('Sending email to:', student.email)

        recipient_list = [student.email]

        # send it!
        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
    

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
    permission_classes = [IsStudent, IsEnrolledStudent]

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
    permission_classes = [permissions.IsAuthenticated, IsStudent, IsEnrolledStudent]

    def get_queryset(self):
        # List classes where the current student IS in enrolled_students
        return Class.objects.filter(enrolled_students=self.request.user)
    
class ClassEnrollmentListView(generics.ListAPIView):
    """
    List all enrollment requests for a single class.
    Only the educator who owns that class may call it.
    """
    serializer_class = EnrollmentRequestSerializer
    permission_classes = [IsEducator]

    def get_queryset(self):
        class_id = self.kwargs['class_id']
        # ensure the educator only sees enrollments for their own class
        return EnrollmentRequest.objects.filter(
            class_obj_id=class_id,
            class_obj__author=self.request.user
        )
        
class MyEnrollmentsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EnrollmentRequestSerializer
    
    def get_queryset(self):
        user = self.request.user
        return EnrollmentRequest.objects.filter(student=user, status='pending')

    # def get(self, request):
    #     user = request.user
    #     enrolled_classes = Class.objects.filter(enrolled_students=user)
    #     serializer = ClassSerializer(enrolled_classes, many=True)
    #     return Response(serializer.data)
