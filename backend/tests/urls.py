from django.urls import path
from .views import *

urlpatterns = [
    path('create/', TestCreateView.as_view(), name='test-create'),
    path('list/', TestListView.as_view(), name='test-list'),
    path('delete/<int:pk>/', TestDeleteView.as_view(), name='test-delete'),
]
