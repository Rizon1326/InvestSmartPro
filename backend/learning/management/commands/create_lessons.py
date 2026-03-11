# learning/management/commands/create_lessons.py

from django.core.management.base import BaseCommand
from learning.models import Lesson


class Command(BaseCommand):
    help = 'Create initial lessons for the learning module'

    def handle(self, *args, **options):
        lessons = [
            {
                'title': 'Introduction to Entrepreneurship',
                'description': 'Learn the basics of starting your own business',
                'content': '''# Introduction to Entrepreneurship

## What is Entrepreneurship?

Entrepreneurship is the process of creating, launching, and running a new business. As an entrepreneur, you identify opportunities, take risks, and work to turn your ideas into reality.

## Why Become an Entrepreneur?

- **Independence**: Be your own boss
- **Impact**: Solve real problems in your community
- **Income Potential**: Build wealth over time
- **Personal Growth**: Learn new skills every day

## Key Traits of Successful Entrepreneurs

1. **Vision**: See opportunities where others see problems
2. **Resilience**: Bounce back from failures
3. **Adaptability**: Change course when needed
4. **Passion**: Love what you do

## Your First Steps

1. Identify a problem you want to solve
2. Research your target market
3. Create a simple business plan
4. Start small and learn as you go

## Action Items

- [ ] Write down 3 problems you've noticed in your community
- [ ] Think about how you could solve one of them
- [ ] Talk to 5 people about this problem
''',
                'difficulty': 'beginner',
                'duration_minutes': 15,
                'order': 1,
            },
            {
                'title': 'Understanding Your Market',
                'description': 'Learn how to research and understand your customers',
                'content': '''# Understanding Your Market

## Why Market Research Matters

Before starting a business, you need to understand:
- Who your customers are
- What they need
- How much they're willing to pay

## Defining Your Target Customer

### Demographics
- **Age**: What age group?
- **Gender**: Male, female, or both?
- **Location**: Urban, rural, specific areas?
- **Income level**: Budget, middle-class, affluent?

### Creating a Customer Persona

**Example:**
> **Name**: Rashida  
> **Age**: 28  
> **Occupation**: School teacher  
> **Location**: Mirpur, Dhaka  
> **Income**: 25,000 BDT/month  
> **Goals**: Save money, provide for family  

## How to Research Your Market

1. **Talk to people** - Ask friends, family, potential customers
2. **Observe** - Watch how people shop and behave
3. **Online research** - Check Facebook groups, forums
4. **Surveys** - Create simple questionnaires
5. **Competitor analysis** - See who buys from competitors

## Action Items

- [ ] Create 2-3 customer personas
- [ ] List your customers' top 5 problems
- [ ] Talk to at least 5 potential customers this week
''',
                'difficulty': 'beginner',
                'duration_minutes': 20,
                'order': 2,
            },
            {
                'title': 'Pricing Your Products',
                'description': 'Learn how to set the right prices for your products or services',
                'content': '''# Pricing Your Products

## Why Pricing Matters

The right price:
- Covers your costs
- Generates profit
- Attracts customers
- Positions your brand

## Pricing Methods

### 1. Cost-Plus Pricing

Calculate your total costs and add a markup.

**Formula:** Price = Cost + (Cost × Markup %)

**Example:**
- Product cost: 100 BDT
- Markup: 50%
- Price: 100 + (100 × 0.5) = 150 BDT

### 2. Value-Based Pricing

Price based on perceived value to the customer.

### 3. Competitive Pricing

Set prices based on what competitors charge.

## Tips for Bangladesh Market

1. **Consider purchasing power** - Know your target customer's budget
2. **Factor in seasonality** - Prices may vary during Eid, festivals
3. **Include all costs** - Transport, rent, utilities, taxes
4. **Test different prices** - Start with a price and adjust based on feedback

## Action Items

- [ ] List all your costs (fixed and variable)
- [ ] Research competitor prices
- [ ] Calculate your minimum viable price
- [ ] Determine your target profit margin
''',
                'difficulty': 'beginner',
                'duration_minutes': 20,
                'order': 3,
            },
            {
                'title': 'Managing Your Finances',
                'description': 'Learn basic financial management for your business',
                'content': '''# Managing Your Finances

## Why Financial Management Matters

Good financial management helps you:
- Know if you're making or losing money
- Plan for the future
- Make informed decisions
- Avoid running out of cash

## Key Financial Concepts

### Revenue
Money coming into your business from sales.

### Expenses
Money going out of your business (rent, supplies, salaries).

### Profit
Revenue minus Expenses = Profit

### Cash Flow
The movement of money in and out of your business over time.

## Simple Record Keeping

Track these daily:
1. **Sales**: What you sold, how much
2. **Expenses**: What you spent, why
3. **Balance**: How much cash you have

## Creating a Simple Budget

| Category | Monthly Budget (BDT) |
|----------|---------------------|
| Rent | 10,000 |
| Supplies | 15,000 |
| Utilities | 2,000 |
| Marketing | 3,000 |
| Salary | 20,000 |
| **Total** | **50,000** |

## Action Items

- [ ] Start a daily record of income and expenses
- [ ] Create a monthly budget
- [ ] Set a profit target
- [ ] Open a separate bank account for business
''',
                'difficulty': 'intermediate',
                'duration_minutes': 25,
                'order': 4,
            },
            {
                'title': 'Risk Management Basics',
                'description': 'Learn how to identify and manage business risks',
                'content': '''# Risk Management Basics

## What is Business Risk?

Risk is the possibility of something going wrong that could harm your business.

## Types of Business Risks

### 1. Financial Risks
- Running out of money
- Customers not paying
- Unexpected expenses

### 2. Market Risks
- Low demand for your product
- New competitors
- Changing customer preferences

### 3. Operational Risks
- Equipment breakdown
- Supply chain issues
- Employee problems

### 4. External Risks
- Natural disasters
- Political instability
- New regulations

## Risk Assessment

Rate each risk by:
- **Likelihood**: How likely is it? (1-5)
- **Impact**: How bad would it be? (1-5)
- **Risk Score**: Likelihood × Impact

## Risk Mitigation Strategies

1. **Avoid**: Don't take the risk
2. **Reduce**: Lower likelihood or impact
3. **Transfer**: Insurance, partnerships
4. **Accept**: Have a plan but accept the risk

## Practical Tips

1. **Keep emergency funds** - Save 3-6 months of operating costs
2. **Diversify** - Don't rely on one customer or product
3. **Get insurance** - Protect against major losses
4. **Stay informed** - Monitor market and competition

## Action Items

- [ ] List your top 10 business risks
- [ ] Score each risk
- [ ] Create mitigation plans for top 5 risks
''',
                'difficulty': 'intermediate',
                'duration_minutes': 20,
                'order': 5,
            },
        ]

        for lesson_data in lessons:
            lesson, created = Lesson.objects.update_or_create(
                slug=lesson_data['title'].lower().replace(' ', '-'),
                defaults=lesson_data
            )
            status = 'Created' if created else 'Updated'
            self.stdout.write(f"{status}: {lesson.title}")

        self.stdout.write(self.style.SUCCESS(f'Successfully created/updated {len(lessons)} lessons'))
