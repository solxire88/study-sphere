from django.urls import path
from .views import TestCreateView, TestListView

urlpatterns = [
    path('create/', TestCreateView.as_view(), name='test-create'),
    path('list/', TestListView.as_view(), name='test-list'),
]
