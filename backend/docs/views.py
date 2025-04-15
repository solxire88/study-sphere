# docs/views.py
from rest_framework import generics, permissions, serializers
from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer
from classes.models import Class
from classes.permissions import IsEducator 
from django.http import FileResponse, Http404
from rest_framework.views import APIView # your custom educator permission

# Educators can upload documents for their class.
class DocumentUploadView(generics.CreateAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated, IsEducator]

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

        serializer.save(class_obj=class_obj, author=self.request.user)


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