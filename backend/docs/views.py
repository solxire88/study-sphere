# docs/views.py
from rest_framework import generics, permissions, serializers
from rest_framework.response import Response
from .models import *
from .serializers import *
from classes.models import Class
from classes.permissions import IsEducator 
from django.http import FileResponse, Http404
from rest_framework.views import APIView 
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status


# Educators can upload documents for their class.
class DocumentUploadView(generics.CreateAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Get the class ID from the URL parameter
        class_id = self.kwargs.get('class_id')
        try:
            class_obj = Class.objects.get(pk=class_id)
        except Class.DoesNotExist:
            raise serializers.ValidationError("Class not found.")

        # Ensure that the current user is the author (educator) of the class.
        if class_obj.author != self.request.user:
            raise serializers.ValidationError("You are not allowed to upload documents for this class.")

        # Save the document
        instance = serializer.save(class_obj=class_obj, author=self.request.user)

        # Notify all enrolled students via email
        student_emails = list(class_obj.enrolled_students.values_list('email', flat=True))
        if student_emails:
            subject = f"New document for {class_obj.title}"
            message = (
                f"Hello,\n\n"
                f"A new document “{instance.title}” has been uploaded by "
                f"{self.request.user.get_full_name() or self.request.user.username} "
                f"for the class “{class_obj.title}”.\n\n"
                "Please log in to your student portal to view it.\n\n"
                "Best,\n"
                f"{class_obj.author.get_full_name() or class_obj.author.username}"
            )
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                student_emails,
                fail_silently=True
            )



# List documents for a given class.
class DocumentListView(generics.ListAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Get the class ID from the URL parameter
        class_id = self.kwargs.get('class_id')
        if not class_id:
            return Document.objects.none()
        try:
            class_obj = Class.objects.get(pk=class_id)
        except Class.DoesNotExist:
            return Document.objects.none()

        user = self.request.user
        # Allow access only if the user is the class author (educator) or an accepted student.
        if user == class_obj.author or user in class_obj.enrolled_students.all():
            return Document.objects.filter(class_obj=class_obj)
        return Document.objects.none()


class DocumentDownloadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, filename, format=None):
        # Look up the document by matching the file path.
        # The FileField stores the file path as "documents/<filename>"
        try:
            document = Document.objects.get(file="documents/" + filename)
        except Document.DoesNotExist:
            raise Http404("Document not found.")

        # Check if the user is authorized: they must be the class author or an accepted student.
        class_obj = document.class_obj
        user = request.user
        if user != class_obj.author and user not in class_obj.enrolled_students.all():
            raise Http404("You are not authorized to download this document.")
        if user != class_obj.author:
            DocumentProgress.objects.get_or_create(student=user, document=document)

        # Open the file in binary mode and return it as an attachment.
        response = FileResponse(document.file.open('rb'), content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{document.title}"'
        return response
    
    

# Delete a document (only for the educator of the class).
class DocumentDeleteView(generics.DestroyAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated, IsEducator]

    def get_queryset(self):
        # Only allow deletion of documents for classes where the request.user is the educator (author).
        return Document.objects.filter(class_obj__author=self.request.user)
    
class ClassDocumentProgressView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, IsEducator]

    def get(self, request, class_id):
        # only the educator of that class may call this
        try:
            class_obj = Class.objects.get(pk=class_id, author=request.user)
        except Class.DoesNotExist:
            return Response({'detail': 'Not found or unauthorized.'}, status=status.HTTP_404_NOT_FOUND)

        docs = Document.objects.filter(class_obj=class_obj)
        total_docs = docs.count()
        students = class_obj.enrolled_students.all()

        per_student = []
        for stu in students:
            done = DocumentProgress.objects.filter(student=stu, document__in=docs).count()
            pct = (done / total_docs * 100) if total_docs else 0
            per_student.append({
                'student': stu.username,
                'downloaded': done,
                'total_docs': total_docs,
                'percentage': round(pct, 1),
            })

        # class average across all students
        class_avg = round(sum(p['percentage'] for p in per_student) / len(per_student), 1) if per_student else 0

        return Response({
            'total_docs': total_docs,
            'per_student': per_student,
            'class_average_percentage': class_avg,
        }, status=status.HTTP_200_OK)