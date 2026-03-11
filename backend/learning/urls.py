# learning/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'lessons', views.LessonViewSet, basename='lesson')
router.register(r'progress', views.LessonProgressViewSet, basename='progress')

urlpatterns = [
    path('', include(router.urls)),
]
