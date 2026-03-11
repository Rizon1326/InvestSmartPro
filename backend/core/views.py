from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category
from .serializers import CategorySerializer

# Create your views here.

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for viewing categories"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@api_view(['GET'])
def health_check(request):
    """Health check endpoint"""
    return Response({
        'status': 'healthy',
        'message': 'InvestSmart API is running',
        'version': '1.0.0'
    })
