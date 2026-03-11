from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BusinessIdea, SimulationHistory
from .serializers import BusinessIdeaSerializer, SimulationHistorySerializer
from chatbot.services import gemini_service

# Create your views here.

class BusinessIdeaViewSet(viewsets.ModelViewSet):
    """API endpoint for business ideas"""
    serializer_class = BusinessIdeaSerializer
    queryset = BusinessIdea.objects.all()

    def get_queryset(self):
        queryset = BusinessIdea.objects.all()
        # Filter by user if authenticated
        if self.request.user.is_authenticated:
            user_only = self.request.query_params.get('user_only', 'false')
            if user_only.lower() == 'true':
                queryset = queryset.filter(user=self.request.user)
        return queryset.order_by('-created_at')

    def perform_create(self, serializer):
        # Save the business idea first
        instance = serializer.save(
            user=self.request.user if self.request.user.is_authenticated else None
        )
        
        # Get AI analysis
        business_data = {
            'name': instance.name,
            'description': instance.description,
            'initial_investment': float(instance.initial_investment),
            'monthly_revenue': float(instance.monthly_revenue),
            'monthly_expenses': float(instance.monthly_expenses),
        }
        
        analysis = gemini_service.analyze_business_idea(business_data)
        
        # Update with AI feedback
        instance.feasibility_score = analysis['feasibility_score']
        instance.risk_level = analysis['risk_level']
        instance.ai_feedback = analysis['feedback']
        instance.save()

    @action(detail=True, methods=['post'])
    def simulate(self, request, pk=None):
        """Run a simulation on this business idea"""
        idea = self.get_object()
        
        scenario_name = request.data.get('scenario_name', 'Custom Simulation')
        
        # Calculate projections
        monthly_profit = float(idea.monthly_revenue) - float(idea.monthly_expenses)
        annual_profit = monthly_profit * 12
        roi = (annual_profit / float(idea.initial_investment) * 100) if idea.initial_investment > 0 else 0
        
        # Create simulation record
        simulation = SimulationHistory.objects.create(
            business_idea=idea,
            scenario_name=scenario_name,
            scenario_description=f"Simulation for {idea.name}",
            projected_revenue=float(idea.monthly_revenue) * 12,
            projected_expenses=float(idea.monthly_expenses) * 12,
            projected_profit=annual_profit,
            projected_roi=roi,
            risk_assessment=f"Risk Level: {idea.risk_level}",
            recommendations=idea.ai_feedback
        )
        
        return Response(SimulationHistorySerializer(simulation).data)

    @action(detail=True, methods=['get'])
    def scenarios(self, request, pk=None):
        """Get multiple scenario projections"""
        idea = self.get_object()
        
        business_data = {
            'name': idea.name,
            'description': idea.description,
            'initial_investment': float(idea.initial_investment),
            'monthly_revenue': float(idea.monthly_revenue),
            'monthly_expenses': float(idea.monthly_expenses),
        }
        
        scenarios = gemini_service.generate_scenarios(business_data)
        
        return Response({
            'business_idea': BusinessIdeaSerializer(idea).data,
            'scenarios': scenarios
        })

    @action(detail=True, methods=['get'])
    def history(self, request, pk=None):
        """Get simulation history for this business idea"""
        idea = self.get_object()
        simulations = idea.simulations.all()
        return Response(SimulationHistorySerializer(simulations, many=True).data)


class SimulationHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for simulation history"""
    serializer_class = SimulationHistorySerializer
    queryset = SimulationHistory.objects.all()
