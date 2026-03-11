# simulation/serializers.py

from rest_framework import serializers
from .models import BusinessIdea, SimulationHistory
from core.serializers import CategorySerializer


class BusinessIdeaSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source='category', read_only=True)
    category_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = BusinessIdea
        fields = [
            'id', 'name', 'description', 'category', 'category_id', 'category_detail',
            'initial_investment', 'monthly_revenue', 'monthly_expenses', 'monthly_profit',
            'risk_level', 'feasibility_score', 'ai_feedback', 'created_at', 'updated_at'
        ]
        read_only_fields = ['monthly_profit', 'feasibility_score', 'ai_feedback']


class SimulationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SimulationHistory
        fields = [
            'id', 'business_idea', 'scenario_name', 'scenario_description',
            'projected_revenue', 'projected_expenses', 'projected_profit',
            'projected_roi', 'risk_assessment', 'recommendations', 'created_at'
        ]
        read_only_fields = ['created_at']
