from django.urls import path
from .views import *

urlpatterns = [
    path('<int:class_id>/upload/', DocumentUploadView.as_view(), name='document-upload'),
    path('<int:class_id>/list/', DocumentListView.as_view(), name='document-list'),
    path('documents/<str:filename>/', DocumentDownloadView.as_view(), name='document-download'),
    path('delete/<int:pk>/', DocumentDeleteView.as_view(), name='document-delete'),
    path('<int:class_id>/progress/', ClassDocumentProgressView.as_view(), name='document-progress'),
]
