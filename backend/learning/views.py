from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Lesson, LessonProgress
from .serializers import LessonSerializer, LessonProgressSerializer

# Create your views here.

class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for lessons"""
    queryset = Lesson.objects.filter(is_published=True)
    serializer_class = LessonSerializer
    lookup_field = 'slug'

    @action(detail=True, methods=['post'])
    def complete(self, request, slug=None):
        """Mark a lesson as completed"""
        lesson = self.get_object()
        
        if not request.user.is_authenticated:
            return Response(
                {'error': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        progress, created = LessonProgress.objects.get_or_create(
            user=request.user,
            lesson=lesson
        )
        
        if not progress.is_completed:
            progress.is_completed = True
            progress.completed_at = timezone.now()
            progress.save()
        
        return Response({
            'message': 'Lesson marked as completed',
            'lesson': LessonSerializer(lesson).data,
            'completed_at': progress.completed_at
        })


class LessonProgressViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for user's lesson progress"""
    serializer_class = LessonProgressSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return LessonProgress.objects.filter(user=self.request.user)
        return LessonProgress.objects.none()
