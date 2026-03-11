# learning/serializers.py

from rest_framework import serializers
from .models import Lesson, LessonProgress


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'slug', 'description', 'content',
            'difficulty', 'duration_minutes', 'order', 'is_published',
            'created_at', 'updated_at'
        ]


class LessonProgressSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer(read_only=True)

    class Meta:
        model = LessonProgress
        fields = ['id', 'lesson', 'is_completed', 'completed_at', 'created_at']
