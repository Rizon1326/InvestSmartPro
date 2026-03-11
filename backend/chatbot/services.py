# chatbot/services.py

import google.generativeai as genai
from django.conf import settings
import uuid

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)


class GeminiChatService:
    """Service for interacting with Gemini AI"""
    
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        self.system_prompt = """
You are InvestSmart Assistant, a friendly and supportive AI chatbot designed to help aspiring entrepreneurs in Bangladesh.

Your role is to:
1. Answer questions about starting and running a business
2. Provide practical advice on budgeting, pricing, and marketing
3. Explain business concepts in simple, easy-to-understand terms
4. Offer encouragement and motivation to young entrepreneurs
5. Help users understand their business simulation results

Guidelines:
- Be friendly, supportive, and encouraging
- Use simple language, avoiding jargon
- Provide specific, actionable advice when possible
- Consider the Bangladeshi business context (currency in BDT, local market conditions)
- Keep responses concise but helpful (2-3 paragraphs max)
- Use bullet points for lists
- If you don't know something, admit it honestly

Remember: You're here to help users succeed in their entrepreneurial journey!
"""

    def generate_response(self, user_message: str, conversation_history: list = None) -> str:
        """Generate a response to user message"""
        try:
            # Build conversation context
            context = self.system_prompt + "\n\n"
            
            if conversation_history:
                for msg in conversation_history[-5:]:  # Last 5 messages for context
                    role = "User" if msg['role'] == 'user' else "Assistant"
                    context += f"{role}: {msg['content']}\n"
            
            context += f"User: {user_message}\nAssistant:"
            
            response = self.model.generate_content(context)
            return response.text
            
        except Exception as e:
            return f"I'm sorry, I encountered an error. Please try again. Error: {str(e)}"

    def analyze_business_idea(self, business_data: dict) -> dict:
        """Analyze a business idea and provide feedback"""
        try:
            prompt = f"""
{self.system_prompt}

Please analyze this business idea and provide constructive feedback:

Business Name: {business_data.get('name', 'N/A')}
Description: {business_data.get('description', 'N/A')}
Initial Investment: {business_data.get('initial_investment', 0)} BDT
Expected Monthly Revenue: {business_data.get('monthly_revenue', 0)} BDT
Expected Monthly Expenses: {business_data.get('monthly_expenses', 0)} BDT

Please provide:
1. Feasibility Score (0-100)
2. Risk Level (low/medium/high)
3. Strengths of this business idea
4. Potential challenges
5. Recommendations for improvement

Format your response as follows:
FEASIBILITY_SCORE: [number]
RISK_LEVEL: [low/medium/high]
FEEDBACK: [your detailed feedback]
"""
            
            response = self.model.generate_content(prompt)
            text = response.text
            
            # Parse response
            feasibility_score = 50  # Default
            risk_level = 'medium'  # Default
            
            if 'FEASIBILITY_SCORE:' in text:
                try:
                    score_line = [l for l in text.split('\n') if 'FEASIBILITY_SCORE:' in l][0]
                    feasibility_score = int(''.join(filter(str.isdigit, score_line.split(':')[1][:4])))
                    feasibility_score = min(100, max(0, feasibility_score))
                except:
                    pass
            
            if 'RISK_LEVEL:' in text:
                try:
                    risk_line = [l for l in text.split('\n') if 'RISK_LEVEL:' in l][0].lower()
                    if 'low' in risk_line:
                        risk_level = 'low'
                    elif 'high' in risk_line:
                        risk_level = 'high'
                except:
                    pass
            
            # Extract feedback
            feedback = text
            if 'FEEDBACK:' in text:
                feedback = text.split('FEEDBACK:')[1].strip()
            
            return {
                'feasibility_score': feasibility_score,
                'risk_level': risk_level,
                'feedback': feedback
            }
            
        except Exception as e:
            return {
                'feasibility_score': 50,
                'risk_level': 'medium',
                'feedback': f"Unable to analyze at this time. Error: {str(e)}"
            }

    def generate_scenarios(self, business_data: dict) -> list:
        """Generate business scenarios"""
        try:
            prompt = f"""
{self.system_prompt}

Generate 3 business scenarios (optimistic, realistic, pessimistic) for this business:

Business: {business_data.get('name', 'N/A')}
Initial Investment: {business_data.get('initial_investment', 0)} BDT
Monthly Revenue: {business_data.get('monthly_revenue', 0)} BDT
Monthly Expenses: {business_data.get('monthly_expenses', 0)} BDT

For each scenario, provide projected revenue, expenses, profit, and ROI after 12 months.
Format each scenario as:
SCENARIO: [name]
REVENUE: [amount]
EXPENSES: [amount]
PROFIT: [amount]
ROI: [percentage]
DESCRIPTION: [brief description]
---
"""
            
            response = self.model.generate_content(prompt)
            text = response.text
            
            # Parse scenarios (simplified parsing)
            scenarios = []
            scenario_texts = text.split('---')
            
            for scenario_text in scenario_texts:
                if 'SCENARIO:' in scenario_text:
                    scenario = {
                        'name': 'Scenario',
                        'revenue': business_data.get('monthly_revenue', 0) * 12,
                        'expenses': business_data.get('monthly_expenses', 0) * 12,
                        'profit': 0,
                        'roi': 0,
                        'description': scenario_text.strip()
                    }
                    
                    try:
                        lines = scenario_text.split('\n')
                        for line in lines:
                            if 'SCENARIO:' in line:
                                scenario['name'] = line.split(':')[1].strip()
                            elif 'REVENUE:' in line:
                                scenario['revenue'] = float(''.join(filter(lambda x: x.isdigit() or x == '.', line.split(':')[1])))
                            elif 'EXPENSES:' in line:
                                scenario['expenses'] = float(''.join(filter(lambda x: x.isdigit() or x == '.', line.split(':')[1])))
                            elif 'PROFIT:' in line:
                                scenario['profit'] = float(''.join(filter(lambda x: x.isdigit() or x == '.', line.split(':')[1])))
                            elif 'ROI:' in line:
                                scenario['roi'] = float(''.join(filter(lambda x: x.isdigit() or x == '.', line.split(':')[1])))
                            elif 'DESCRIPTION:' in line:
                                scenario['description'] = line.split(':')[1].strip()
                    except:
                        pass
                    
                    scenarios.append(scenario)
            
            # Ensure we have at least default scenarios
            if len(scenarios) < 3:
                base_revenue = float(business_data.get('monthly_revenue', 10000))
                base_expenses = float(business_data.get('monthly_expenses', 5000))
                initial = float(business_data.get('initial_investment', 50000))
                
                default_scenarios = [
                    {
                        'name': 'Optimistic',
                        'revenue': base_revenue * 12 * 1.3,
                        'expenses': base_expenses * 12 * 0.9,
                        'profit': 0,
                        'roi': 0,
                        'description': 'Best case with increased sales and reduced costs'
                    },
                    {
                        'name': 'Realistic',
                        'revenue': base_revenue * 12,
                        'expenses': base_expenses * 12,
                        'profit': 0,
                        'roi': 0,
                        'description': 'Expected performance based on current projections'
                    },
                    {
                        'name': 'Pessimistic',
                        'revenue': base_revenue * 12 * 0.7,
                        'expenses': base_expenses * 12 * 1.2,
                        'profit': 0,
                        'roi': 0,
                        'description': 'Challenging market conditions with lower sales'
                    }
                ]
                
                for s in default_scenarios:
                    s['profit'] = s['revenue'] - s['expenses']
                    s['roi'] = ((s['profit']) / initial * 100) if initial > 0 else 0
                
                return default_scenarios
            
            return scenarios[:3]
            
        except Exception as e:
            # Return default scenarios on error
            return [
                {'name': 'Optimistic', 'revenue': 0, 'expenses': 0, 'profit': 0, 'roi': 0, 'description': 'Error generating scenario'},
                {'name': 'Realistic', 'revenue': 0, 'expenses': 0, 'profit': 0, 'roi': 0, 'description': 'Error generating scenario'},
                {'name': 'Pessimistic', 'revenue': 0, 'expenses': 0, 'profit': 0, 'roi': 0, 'description': 'Error generating scenario'}
            ]


# Singleton instance
gemini_service = GeminiChatService()
