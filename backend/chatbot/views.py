from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import gemini_service
from .models import Conversation, Message
import uuid

# Create your views here.

class ChatView(APIView):
    """Handle chat messages"""
    
    def post(self, request):
        message = request.data.get('message', '')
        session_id = request.data.get('session_id', str(uuid.uuid4()))
        
        if not message:
            return Response(
                {'error': 'Message is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get or create conversation
        conversation, created = Conversation.objects.get_or_create(
            session_id=session_id,
            defaults={'title': message[:50]}
        )
        
        # Save user message
        Message.objects.create(
            conversation=conversation,
            role='user',
            content=message
        )
        
        # Get conversation history
        history = list(conversation.messages.values('role', 'content')[:10])
        
        # Generate AI response
        ai_response = gemini_service.generate_response(message, history)
        
        # Save assistant message
        Message.objects.create(
            conversation=conversation,
            role='assistant',
            content=ai_response
        )
        
        # Update conversation
        conversation.save()
        
        return Response({
            'session_id': session_id,
            'message': ai_response
        })


class ConversationHistoryView(APIView):
    """Get conversation history"""
    
    def get(self, request, session_id):
        try:
            conversation = Conversation.objects.get(session_id=session_id)
            messages = list(conversation.messages.values('role', 'content', 'created_at'))
            return Response({
                'session_id': session_id,
                'messages': messages
            })
        except Conversation.DoesNotExist:
            return Response(
                {'error': 'Conversation not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class NewConversationView(APIView):
    """Start a new conversation"""
    
    def post(self, request):
        session_id = str(uuid.uuid4())
        conversation = Conversation.objects.create(
            session_id=session_id,
            title="New Conversation"
        )
        
        return Response({
            'session_id': session_id,
            'message': 'New conversation started'
        })
