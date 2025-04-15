from django.urls import path
from .views import *

urlpatterns = [
    path('classes/', ClassListCreateView.as_view(), name='class-list-create'),
    path('classes/<int:pk>/', ClassRetrieveUpdateDestroyView.as_view(), name='class-detail'),
    path('enroll/', EnrollmentCreateView.as_view(), name='enroll-create'),
    path('enrollments/', EnrollmentListView.as_view(), name='enrollment-list'),
    path('enrollments/<int:pk>/', EnrollmentStatusUpdateView.as_view(), name='enrollment-update'),
    # path('student/enrollments/', StudentEnrollmentListView.as_view(), name='student-enrollment-list'),
    path('student/enrollments/<int:pk>/', EnrollmentDeleteView.as_view(), name='student-enrollment-delete'),
    path('student/classes/available/', StudentAvailableClassListView.as_view(), name='student-available-classes'),
    path('student/classes/accepted/', StudentAcceptedClassListView.as_view(), name='student-accepted-classes'),
    path('student/enrollments/pending/', StudentPendingEnrollmentListView.as_view(), name='student-enrollment-pending'),
    path('student/enrollments/accepted/', StudentAcceptedEnrollmentListView.as_view(), name='student-enrollment-accepted'),
]