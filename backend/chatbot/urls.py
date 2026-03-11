# chatbot/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.ChatView.as_view(), name='chat'),
    path('new/', views.NewConversationView.as_view(), name='new-conversation'),
    path('history/<str:session_id>/', views.ConversationHistoryView.as_view(), name='conversation-history'),
]
