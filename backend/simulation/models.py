from django.db import models
from django.contrib.auth.models import User
from core.models import Category

# Create your models here.

class BusinessIdea(models.Model):
    """User's business idea for simulation"""
    RISK_CHOICES = [
        ('low', 'Low Risk'),
        ('medium', 'Medium Risk'),
        ('high', 'High Risk'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='business_ideas', null=True, blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    initial_investment = models.DecimalField(max_digits=12, decimal_places=2, help_text="Investment in BDT")
    monthly_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    monthly_expenses = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    monthly_profit = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    risk_level = models.CharField(max_length=10, choices=RISK_CHOICES, default='medium')
    feasibility_score = models.PositiveIntegerField(default=0, help_text="Score 0-100")
    ai_feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Auto-calculate monthly profit
        self.monthly_profit = self.monthly_revenue - self.monthly_expenses
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class SimulationHistory(models.Model):
    """Historical simulation runs"""
    business_idea = models.ForeignKey(BusinessIdea, on_delete=models.CASCADE, related_name='simulations')
    scenario_name = models.CharField(max_length=100)
    scenario_description = models.TextField(blank=True)
    projected_revenue = models.DecimalField(max_digits=12, decimal_places=2)
    projected_expenses = models.DecimalField(max_digits=12, decimal_places=2)
    projected_profit = models.DecimalField(max_digits=12, decimal_places=2)
    projected_roi = models.DecimalField(max_digits=5, decimal_places=2, help_text="ROI percentage")
    risk_assessment = models.TextField(blank=True)
    recommendations = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Simulation Histories"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.scenario_name} - {self.business_idea.name}"
