"""
URL configuration for InvestSmart project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/', include('simulation.urls')),
    path('api/chat/', include('chatbot.urls')),
    path('api/', include('learning.urls')),
]
