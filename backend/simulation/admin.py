from django.contrib import admin
from .models import BusinessIdea, SimulationHistory


@admin.register(BusinessIdea)
class BusinessIdeaAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'category', 'initial_investment', 'monthly_profit', 'risk_level', 'feasibility_score']
    list_filter = ['risk_level', 'category']
    search_fields = ['name', 'user__username']


@admin.register(SimulationHistory)
class SimulationHistoryAdmin(admin.ModelAdmin):
    list_display = ['scenario_name', 'business_idea', 'projected_profit', 'projected_roi', 'created_at']
    list_filter = ['created_at']
    search_fields = ['scenario_name', 'business_idea__name']
