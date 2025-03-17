from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import User
from classes.models import Class, EnrollmentRequest

class EnrollmentFlowTest(APITestCase):
    def setUp(self):
        # Create an educator and a student
        self.educator = User.objects.create_user(
            username="educator2", password="password", role="educator"
        )
        self.student = User.objects.create_user(
            username="student2", password="password", role="student"
        )

        # Have the educator create a class.
        self.client.force_authenticate(user=self.educator)
        self.class_data = {
            "title": "Test Class",
            "tags": ["test"],
            "schedule": "Mon 10am",
            "description": "This is a test class",
            "syllabus": "Test syllabus content"
        }
        create_class_url = reverse("class-list-create")
        response = self.client.post(create_class_url, self.class_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.class_id = response.data["id"]

        # Log out educator for now.
        self.client.force_authenticate(user=None)

    def test_enrollment_flow(self):
        # Student sends an enrollment request.
        self.client.force_authenticate(user=self.student)
        enrollment_data = {"class_obj": self.class_id}
        enrollment_url = reverse("enroll-create")
        enrollment_response = self.client.post(enrollment_url, enrollment_data, format="json")
        self.assertEqual(enrollment_response.status_code, status.HTTP_201_CREATED)
        enrollment_id = enrollment_response.data["id"]

        # Educator updates the enrollment request to 'accepted'.
        self.client.force_authenticate(user=self.educator)
        update_url = reverse("enrollment-update", kwargs={"pk": enrollment_id})
        update_data = {"status": "accepted"}
        update_response = self.client.patch(update_url, update_data, format="json")
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)

        # Refresh the enrollment request from the DB.
        enrollment_request = EnrollmentRequest.objects.get(id=enrollment_id)
        self.assertEqual(enrollment_request.status, "accepted")

        # Assuming that the acceptance logic adds the student to the class,
        # verify that the student is now enrolled.
        class_obj = Class.objects.get(id=self.class_id)
        self.assertIn(self.student, class_obj.enrolled_students.all())
