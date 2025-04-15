from rest_framework import generics, permissions
from .models import Test
from .serializers import TestSerializer

# Only authenticated educators should be able to create tests.
class TestCreateView(generics.CreateAPIView):
    serializer_class = TestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Optionally, add a check that self.request.user is an educator.
        serializer.save(created_by=self.request.user)


# List tests for a given class so that students can fetch them.
class TestListView(generics.ListAPIView):
    serializer_class = TestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        class_id = self.request.query_params.get('class_id')
        if class_id:
            return Test.objects.filter(class_obj_id=class_id)
        return Test.objects.none()

# Delete a test. Only the educator that created the test may delete it.
class TestDeleteView(generics.DestroyAPIView):
    serializer_class = TestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # This returns only tests created by the current user.
        return Test.objects.filter(created_by=self.request.user)