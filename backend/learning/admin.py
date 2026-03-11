from django.contrib import admin
from .models import Lesson, LessonProgress


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['title', 'difficulty', 'duration_minutes', 'order', 'is_published']
    list_filter = ['difficulty', 'is_published']
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ['title', 'description']


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'lesson', 'is_completed', 'completed_at']
    list_filter = ['is_completed']
    search_fields = ['user__username', 'lesson__title']
