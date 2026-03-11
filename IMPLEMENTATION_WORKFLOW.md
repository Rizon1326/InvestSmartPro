# InvestSmart - Complete Implementation Workflow

> **A-to-Z Step-by-Step Guide for Building the Pilot Project**

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Phase 1: Environment Setup](#phase-1-environment-setup)
- [Phase 2: Backend Development (Django)](#phase-2-backend-development-django)
- [Phase 3: Frontend Development (React + Vite)](#phase-3-frontend-development-react--vite)
- [Phase 4: Database Design & Models](#phase-4-database-design--models)
- [Phase 5: API Development](#phase-5-api-development)
- [Phase 6: AI Chatbot Integration (Gemini 2.5 Flash)](#phase-6-ai-chatbot-integration-gemini-25-flash)
- [Phase 7: Business Simulation Engine](#phase-7-business-simulation-engine)
- [Phase 8: Learning Module](#phase-8-learning-module)
- [Phase 9: Frontend Components & Pages](#phase-9-frontend-components--pages)
- [Phase 10: Integration & Testing](#phase-10-integration--testing)
- [Phase 11: Deployment](#phase-11-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

Before starting, ensure you have the following installed:

| Software | Version | Download Link |
|----------|---------|---------------|
| Python | 3.10+ | [python.org](https://python.org) |
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| Git | Latest | [git-scm.com](https://git-scm.com) |
| VS Code | Latest | [code.visualstudio.com](https://code.visualstudio.com) |

> **Note:** We're using SQLite3 (Django's default database) - no separate database installation needed!

### Verify Installations

```bash
# Check Python
python --version
# Expected: Python 3.10.x or higher

# Check Node.js
node --version
# Expected: v18.x.x or higher

# Check npm
npm --version
# Expected: 9.x.x or higher

# Check Git
git --version
# Expected: git version 2.x.x
```

### Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy and save the API key securely

---

## Phase 1: Environment Setup

### Step 1.1: Create Project Directory

```bash
# Create main project folder
mkdir -p ~/Desktop/InvestSmart
cd ~/Desktop/InvestSmart

# Create subdirectories
mkdir backend frontend docs

# Initialize Git repository
git init
```

### Step 1.2: Create .gitignore

```bash
# Create .gitignore file
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
.env

# Node
node_modules/
dist/
.env.local

# IDE
.vscode/
.idea/

# Database
*.sqlite3
db.sqlite3

# Logs
*.log

# OS
.DS_Store
Thumbs.db
EOF
```

> **SQLite3 Database:** Django will automatically create a `db.sqlite3` file in your backend folder. No additional database setup required!

---

## Phase 2: Backend Development (Django)

### Step 2.1: Setup Python Virtual Environment

```bash
cd ~/Desktop/InvestSmart/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# On Windows: venv\Scripts\activate

# Verify activation (should show venv path)
which python
```

### Step 2.2: Install Python Dependencies

```bash
# Install Django and related packages
pip install django==4.2.9
pip install djangorestframework==3.14.0
pip install django-cors-headers==4.3.1
pip install python-dotenv==1.0.0
pip install google-generativeai==0.3.2

# Save dependencies
pip freeze > requirements.txt
```

### Step 2.3: Create Django Project

```bash
# Create Django project
django-admin startproject config .

# Create Django apps
python manage.py startapp core
python manage.py startapp simulation
python manage.py startapp chatbot
python manage.py startapp learning
```

### Step 2.4: Create Environment File

```bash
# Create .env file
cat > .env << 'EOF'
# Django
SECRET_KEY=your-super-secret-key-change-this-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key-here
EOF
```

### Step 2.5: Configure Django Settings

Edit `config/settings.py`:

```python
# config/settings.py

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# Security
SECRET_KEY = os.getenv('SECRET_KEY', 'fallback-secret-key')
DEBUG = os.getenv('DEBUG', 'True') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third party
    'rest_framework',
    'corsheaders',
    # Local apps
    'core',
    'simulation',
    'chatbot',
    'learning',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database - Using SQLite3 (Django default)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Dhaka'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
]
CORS_ALLOW_CREDENTIALS = True

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

# Gemini API Key
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
```

### Step 2.6: Test Django Setup

```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
# Enter: admin / admin@example.com / your_password

# Run development server
python manage.py runserver

# Visit http://127.0.0.1:8000/admin to verify
```

---

## Phase 3: Frontend Development (React + Vite)

### Step 3.1: Create Vite React Project

```bash
cd ~/Desktop/InvestSmart/frontend

# Create Vite project
npm create vite@latest . -- --template react

# Install dependencies
npm install
```

### Step 3.2: Install Additional Dependencies

```bash
# Install required packages
npm install axios react-router-dom
npm install recharts  # For charts
npm install lucide-react  # For icons
npm install clsx  # For conditional classes

# Install TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3.3: Configure TailwindCSS

Edit `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
```

### Step 3.4: Update CSS

Edit `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #f8fafc;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
```

### Step 3.5: Create Environment File

```bash
# Create .env file
cat > .env << 'EOF'
VITE_API_URL=http://localhost:8000/api
EOF
```

### Step 3.6: Test Frontend Setup

```bash
# Run development server
npm run dev

# Visit http://localhost:5173 to verify
```

---

## Phase 4: Database Design & Models

### Step 4.1: Core Models

Edit `backend/core/models.py`:

```python
# core/models.py

from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)  # Icon name
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name
```

### Step 4.2: Simulation Models

Edit `backend/simulation/models.py`:

```python
# simulation/models.py

from django.db import models
from django.contrib.auth.models import User
from core.models import Category

class BusinessIdea(models.Model):
    RISK_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    
    FEASIBILITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='business_ideas')
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    description = models.TextField(blank=True)
    
    # Financial inputs
    initial_investment = models.DecimalField(max_digits=12, decimal_places=2)
    monthly_revenue = models.DecimalField(max_digits=12, decimal_places=2)
    monthly_costs = models.DecimalField(max_digits=12, decimal_places=2)
    
    # Location
    location = models.CharField(max_length=200, blank=True)
    target_customers = models.TextField(blank=True)
    
    # Calculated fields
    monthly_profit = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    roi_percentage = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    risk_level = models.CharField(max_length=10, choices=RISK_CHOICES, blank=True)
    feasibility_score = models.CharField(max_length=10, choices=FEASIBILITY_CHOICES, blank=True)
    
    # AI generated advice
    ai_advice = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Calculate monthly profit
        self.monthly_profit = self.monthly_revenue - self.monthly_costs
        
        # Calculate ROI percentage (annual)
        if self.initial_investment > 0:
            annual_profit = self.monthly_profit * 12
            self.roi_percentage = (annual_profit / self.initial_investment) * 100
        
        # Determine risk level
        if self.roi_percentage:
            if self.roi_percentage > 50:
                self.risk_level = 'low'
            elif self.roi_percentage > 20:
                self.risk_level = 'medium'
            else:
                self.risk_level = 'high'
        
        # Determine feasibility score
        if self.monthly_profit and self.monthly_profit > 0:
            if self.roi_percentage > 40:
                self.feasibility_score = 'high'
            elif self.roi_percentage > 15:
                self.feasibility_score = 'medium'
            else:
                self.feasibility_score = 'low'
        else:
            self.feasibility_score = 'low'
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} by {self.user.username}"


class SimulationHistory(models.Model):
    business_idea = models.ForeignKey(BusinessIdea, on_delete=models.CASCADE, related_name='simulations')
    scenario_name = models.CharField(max_length=100)
    
    # Scenario parameters
    revenue_change = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # percentage
    cost_change = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # percentage
    
    # Results
    projected_profit = models.DecimalField(max_digits=12, decimal_places=2)
    projected_roi = models.DecimalField(max_digits=8, decimal_places=2)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Simulation Histories"

    def __str__(self):
        return f"{self.scenario_name} for {self.business_idea.name}"
```

### Step 4.3: Chatbot Models

Edit `backend/chatbot/models.py`:

```python
# chatbot/models.py

from django.db import models
from django.contrib.auth.models import User

class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='conversations', null=True, blank=True)
    session_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Conversation {self.session_id}"


class Message(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
    ]

    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.role}: {self.content[:50]}..."
```

### Step 4.4: Learning Models

Edit `backend/learning/models.py`:

```python
# learning/models.py

from django.db import models
from django.contrib.auth.models import User

class Lesson(models.Model):
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    content = models.TextField()  # Markdown content
    difficulty = models.CharField(max_length=15, choices=DIFFICULTY_CHOICES, default='beginner')
    duration_minutes = models.IntegerField(default=10)
    order = models.IntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class LessonProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='progress')
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'lesson']
        verbose_name_plural = "Lesson Progress"

    def __str__(self):
        status = "Completed" if self.is_completed else "In Progress"
        return f"{self.user.username} - {self.lesson.title} ({status})"
```

### Step 4.5: Run Migrations

```bash
cd ~/Desktop/InvestSmart/backend
source venv/bin/activate

# Create migrations
python manage.py makemigrations core
python manage.py makemigrations simulation
python manage.py makemigrations chatbot
python manage.py makemigrations learning

# Apply migrations
python manage.py migrate

# Verify in admin
python manage.py runserver
# Visit http://127.0.0.1:8000/admin
```

### Step 4.6: Register Models in Admin

Edit `backend/core/admin.py`:

```python
from django.contrib import admin
from .models import Profile, Category

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'location', 'created_at']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
```

Edit `backend/simulation/admin.py`:

```python
from django.contrib import admin
from .models import BusinessIdea, SimulationHistory

@admin.register(BusinessIdea)
class BusinessIdeaAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'category', 'initial_investment', 'monthly_profit', 'risk_level', 'feasibility_score']
    list_filter = ['risk_level', 'feasibility_score', 'category']
    search_fields = ['name', 'user__username']

@admin.register(SimulationHistory)
class SimulationHistoryAdmin(admin.ModelAdmin):
    list_display = ['scenario_name', 'business_idea', 'projected_profit', 'projected_roi', 'created_at']
```

Edit `backend/learning/admin.py`:

```python
from django.contrib import admin
from .models import Lesson, LessonProgress

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['title', 'difficulty', 'duration_minutes', 'order', 'is_published']
    list_filter = ['difficulty', 'is_published']
    prepopulated_fields = {'slug': ('title',)}

@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'lesson', 'is_completed', 'completed_at']
    list_filter = ['is_completed']
```

---

## Phase 5: API Development

### Step 5.1: Create Serializers

Create `backend/core/serializers.py`:

```python
# core/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Category

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = ['id', 'user', 'phone', 'location', 'created_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'icon']
```

Create `backend/simulation/serializers.py`:

```python
# simulation/serializers.py

from rest_framework import serializers
from .models import BusinessIdea, SimulationHistory
from core.serializers import CategorySerializer

class BusinessIdeaSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source='category', read_only=True)
    
    class Meta:
        model = BusinessIdea
        fields = [
            'id', 'name', 'category', 'category_detail', 'description',
            'initial_investment', 'monthly_revenue', 'monthly_costs',
            'location', 'target_customers',
            'monthly_profit', 'roi_percentage', 'risk_level', 'feasibility_score',
            'ai_advice', 'created_at', 'updated_at'
        ]
        read_only_fields = ['monthly_profit', 'roi_percentage', 'risk_level', 'feasibility_score', 'ai_advice']

class SimulationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SimulationHistory
        fields = ['id', 'business_idea', 'scenario_name', 'revenue_change', 'cost_change', 
                  'projected_profit', 'projected_roi', 'created_at']
```

Create `backend/learning/serializers.py`:

```python
# learning/serializers.py

from rest_framework import serializers
from .models import Lesson, LessonProgress

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'slug', 'description', 'content', 
                  'difficulty', 'duration_minutes', 'order', 'is_published']

class LessonProgressSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer(read_only=True)
    
    class Meta:
        model = LessonProgress
        fields = ['id', 'lesson', 'is_completed', 'completed_at']
```

### Step 5.2: Create Views

Create `backend/core/views.py`:

```python
# core/views.py

from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category
from .serializers import CategorySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@api_view(['GET'])
def health_check(request):
    return Response({'status': 'healthy', 'message': 'InvestSmart API is running'})
```

Create `backend/simulation/views.py`:

```python
# simulation/views.py

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings
import google.generativeai as genai
from .models import BusinessIdea, SimulationHistory
from .serializers import BusinessIdeaSerializer, SimulationHistorySerializer

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

class BusinessIdeaViewSet(viewsets.ModelViewSet):
    serializer_class = BusinessIdeaSerializer

    def get_queryset(self):
        # For now, return all. Later filter by user
        return BusinessIdea.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        # Save the business idea
        instance = serializer.save()
        
        # Generate AI advice
        try:
            ai_advice = self.generate_ai_advice(instance)
            instance.ai_advice = ai_advice
            instance.save()
        except Exception as e:
            print(f"AI advice generation failed: {e}")

    def generate_ai_advice(self, business_idea):
        prompt = f"""
        You are a business mentor for aspiring entrepreneurs in Bangladesh.
        Analyze this business idea and provide 3-5 practical, actionable tips.

        Business Name: {business_idea.name}
        Category: {business_idea.category.name if business_idea.category else 'Not specified'}
        Description: {business_idea.description}
        Initial Investment: {business_idea.initial_investment} BDT
        Expected Monthly Revenue: {business_idea.monthly_revenue} BDT
        Expected Monthly Costs: {business_idea.monthly_costs} BDT
        Location: {business_idea.location}
        Target Customers: {business_idea.target_customers}
        
        Calculated Metrics:
        - Monthly Profit: {business_idea.monthly_profit} BDT
        - ROI: {business_idea.roi_percentage}%
        - Risk Level: {business_idea.risk_level}
        - Feasibility: {business_idea.feasibility_score}

        Provide advice on:
        1. Pricing strategy
        2. Cost optimization
        3. Marketing approach
        4. Risk mitigation
        5. Growth opportunities

        Be specific, practical, and encouraging. Keep it concise.
        """
        
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        return response.text

    @action(detail=True, methods=['post'])
    def simulate(self, request, pk=None):
        """Run a what-if simulation"""
        business_idea = self.get_object()
        
        scenario_name = request.data.get('scenario_name', 'Custom Scenario')
        revenue_change = float(request.data.get('revenue_change', 0))
        cost_change = float(request.data.get('cost_change', 0))
        
        # Calculate projected values
        projected_revenue = float(business_idea.monthly_revenue) * (1 + revenue_change / 100)
        projected_costs = float(business_idea.monthly_costs) * (1 + cost_change / 100)
        projected_profit = projected_revenue - projected_costs
        
        if float(business_idea.initial_investment) > 0:
            projected_roi = (projected_profit * 12 / float(business_idea.initial_investment)) * 100
        else:
            projected_roi = 0
        
        # Save simulation
        simulation = SimulationHistory.objects.create(
            business_idea=business_idea,
            scenario_name=scenario_name,
            revenue_change=revenue_change,
            cost_change=cost_change,
            projected_profit=projected_profit,
            projected_roi=projected_roi
        )
        
        return Response(SimulationHistorySerializer(simulation).data)

    @action(detail=True, methods=['get'])
    def simulations(self, request, pk=None):
        """Get all simulations for a business idea"""
        business_idea = self.get_object()
        simulations = business_idea.simulations.all().order_by('-created_at')
        return Response(SimulationHistorySerializer(simulations, many=True).data)
```

Create `backend/learning/views.py`:

```python
# learning/views.py

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Lesson, LessonProgress
from .serializers import LessonSerializer, LessonProgressSerializer

class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Lesson.objects.filter(is_published=True)
    serializer_class = LessonSerializer
    lookup_field = 'slug'

    @action(detail=True, methods=['post'])
    def complete(self, request, slug=None):
        """Mark a lesson as completed"""
        lesson = self.get_object()
        
        # For now, create progress without user (anonymous)
        # Later, link to authenticated user
        progress, created = LessonProgress.objects.get_or_create(
            lesson=lesson,
            user_id=1,  # TODO: Use request.user when auth is implemented
            defaults={'is_completed': True, 'completed_at': timezone.now()}
        )
        
        if not created and not progress.is_completed:
            progress.is_completed = True
            progress.completed_at = timezone.now()
            progress.save()
        
        return Response({
            'message': 'Lesson marked as completed',
            'lesson': lesson.title,
            'completed_at': progress.completed_at
        })
```

### Step 5.3: Configure URLs

Create `backend/core/urls.py`:

```python
# core/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('health/', views.health_check, name='health-check'),
]
```

Create `backend/simulation/urls.py`:

```python
# simulation/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'business-ideas', views.BusinessIdeaViewSet, basename='business-idea')

urlpatterns = [
    path('', include(router.urls)),
]
```

Create `backend/learning/urls.py`:

```python
# learning/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'lessons', views.LessonViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

Update `backend/config/urls.py`:

```python
# config/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/', include('simulation.urls')),
    path('api/', include('learning.urls')),
    path('api/chat/', include('chatbot.urls')),
]
```

### Step 5.4: Test API Endpoints

```bash
# Run server
python manage.py runserver

# Test health check
curl http://localhost:8000/api/health/

# Test categories
curl http://localhost:8000/api/categories/

# Test business ideas
curl http://localhost:8000/api/business-ideas/
```

---

## Phase 6: AI Chatbot Integration (Gemini 2.5 Flash)

### Step 6.1: Create Chatbot Service

Create `backend/chatbot/services.py`:

```python
# chatbot/services.py

import google.generativeai as genai
from django.conf import settings
import uuid

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

class GeminiChatService:
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

    def generate_response(self, user_message, conversation_history=None):
        """Generate a response to a user message"""
        try:
            # Build conversation context
            messages = []
            
            if conversation_history:
                for msg in conversation_history[-10:]:  # Last 10 messages for context
                    messages.append({
                        'role': msg['role'],
                        'parts': [msg['content']]
                    })
            
            # Start chat with history
            chat = self.model.start_chat(history=messages)
            
            # Send message with system context
            full_prompt = f"{self.system_prompt}\n\nUser: {user_message}"
            response = chat.send_message(full_prompt)
            
            return {
                'success': True,
                'response': response.text
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'response': "I'm sorry, I encountered an error. Please try again."
            }

    def get_business_advice(self, business_context, question):
        """Get specific advice based on business context"""
        prompt = f"""
{self.system_prompt}

The user has a business with the following details:
{business_context}

User's question: {question}

Please provide specific, helpful advice based on this business context.
"""
        try:
            response = self.model.generate_content(prompt)
            return {
                'success': True,
                'response': response.text
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'response': "I'm sorry, I couldn't generate advice. Please try again."
            }

    @staticmethod
    def generate_session_id():
        """Generate a unique session ID"""
        return str(uuid.uuid4())
```

### Step 6.2: Create Chatbot Views

Create `backend/chatbot/views.py`:

```python
# chatbot/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import GeminiChatService
from .models import Conversation, Message

class ChatView(APIView):
    def post(self, request):
        user_message = request.data.get('message', '').strip()
        session_id = request.data.get('session_id')
        business_context = request.data.get('business_context', '')
        
        if not user_message:
            return Response(
                {'error': 'Message is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get or create session
        if not session_id:
            session_id = GeminiChatService.generate_session_id()
        
        conversation, created = Conversation.objects.get_or_create(
            session_id=session_id
        )
        
        # Save user message
        Message.objects.create(
            conversation=conversation,
            role='user',
            content=user_message
        )
        
        # Get conversation history
        history = [
            {'role': msg.role, 'content': msg.content}
            for msg in conversation.messages.all()
        ]
        
        # Generate response
        chat_service = GeminiChatService()
        
        if business_context:
            result = chat_service.get_business_advice(business_context, user_message)
        else:
            result = chat_service.generate_response(user_message, history)
        
        # Save assistant response
        Message.objects.create(
            conversation=conversation,
            role='assistant',
            content=result['response']
        )
        
        return Response({
            'session_id': session_id,
            'response': result['response'],
            'success': result.get('success', True)
        })


class ConversationHistoryView(APIView):
    def get(self, request, session_id):
        try:
            conversation = Conversation.objects.get(session_id=session_id)
            messages = [
                {
                    'role': msg.role,
                    'content': msg.content,
                    'timestamp': msg.created_at.isoformat()
                }
                for msg in conversation.messages.all()
            ]
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
    def post(self, request):
        session_id = GeminiChatService.generate_session_id()
        Conversation.objects.create(session_id=session_id)
        return Response({
            'session_id': session_id,
            'message': 'New conversation started'
        })
```

### Step 6.3: Create Chatbot URLs

Create `backend/chatbot/urls.py`:

```python
# chatbot/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.ChatView.as_view(), name='chat'),
    path('new/', views.NewConversationView.as_view(), name='new-conversation'),
    path('history/<str:session_id>/', views.ConversationHistoryView.as_view(), name='conversation-history'),
]
```

### Step 6.4: Test Chatbot

```bash
# Test chat endpoint
curl -X POST http://localhost:8000/api/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I start a small grocery business in Dhaka?"}'
```

---

## Phase 7: Business Simulation Engine

### Step 7.1: Create Simulation Service

Create `backend/simulation/services.py`:

```python
# simulation/services.py

from decimal import Decimal
import google.generativeai as genai
from django.conf import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

class SimulationService:
    @staticmethod
    def calculate_metrics(initial_investment, monthly_revenue, monthly_costs):
        """Calculate basic business metrics"""
        monthly_profit = monthly_revenue - monthly_costs
        
        if initial_investment > 0:
            roi_percentage = (monthly_profit * 12 / initial_investment) * 100
        else:
            roi_percentage = 0
        
        # Break-even analysis
        if monthly_profit > 0:
            break_even_months = initial_investment / monthly_profit
        else:
            break_even_months = float('inf')
        
        # Risk assessment
        if roi_percentage > 50:
            risk_level = 'low'
            risk_score = 30
        elif roi_percentage > 20:
            risk_level = 'medium'
            risk_score = 60
        else:
            risk_level = 'high'
            risk_score = 90
        
        # Feasibility score
        if monthly_profit > 0 and roi_percentage > 40:
            feasibility = 'high'
            feasibility_score = 85
        elif monthly_profit > 0 and roi_percentage > 15:
            feasibility = 'medium'
            feasibility_score = 60
        else:
            feasibility = 'low'
            feasibility_score = 30
        
        return {
            'monthly_profit': float(monthly_profit),
            'annual_profit': float(monthly_profit * 12),
            'roi_percentage': float(roi_percentage),
            'break_even_months': float(break_even_months) if break_even_months != float('inf') else None,
            'risk_level': risk_level,
            'risk_score': risk_score,
            'feasibility': feasibility,
            'feasibility_score': feasibility_score
        }

    @staticmethod
    def run_scenario(base_metrics, revenue_change_pct, cost_change_pct):
        """Run a what-if scenario"""
        original_revenue = base_metrics.get('monthly_revenue', 0)
        original_costs = base_metrics.get('monthly_costs', 0)
        initial_investment = base_metrics.get('initial_investment', 0)
        
        new_revenue = original_revenue * (1 + revenue_change_pct / 100)
        new_costs = original_costs * (1 + cost_change_pct / 100)
        
        return SimulationService.calculate_metrics(
            initial_investment,
            new_revenue,
            new_costs
        )

    @staticmethod
    def generate_scenarios(business_idea):
        """Generate multiple scenarios for comparison"""
        base = {
            'initial_investment': float(business_idea.initial_investment),
            'monthly_revenue': float(business_idea.monthly_revenue),
            'monthly_costs': float(business_idea.monthly_costs)
        }
        
        scenarios = [
            {
                'name': 'Current Projection',
                'revenue_change': 0,
                'cost_change': 0
            },
            {
                'name': 'Optimistic (20% revenue increase)',
                'revenue_change': 20,
                'cost_change': 5
            },
            {
                'name': 'Conservative (10% cost increase)',
                'revenue_change': 0,
                'cost_change': 10
            },
            {
                'name': 'Pessimistic (15% revenue drop)',
                'revenue_change': -15,
                'cost_change': 5
            },
            {
                'name': 'Growth Mode (30% revenue, 15% costs)',
                'revenue_change': 30,
                'cost_change': 15
            }
        ]
        
        results = []
        for scenario in scenarios:
            metrics = SimulationService.run_scenario(
                base,
                scenario['revenue_change'],
                scenario['cost_change']
            )
            results.append({
                'name': scenario['name'],
                'revenue_change': scenario['revenue_change'],
                'cost_change': scenario['cost_change'],
                **metrics
            })
        
        return results
```

### Step 7.2: Add Scenario Endpoint

Update `backend/simulation/views.py` to add:

```python
# Add to simulation/views.py

from .services import SimulationService

# Add this action to BusinessIdeaViewSet class:

@action(detail=True, methods=['get'])
def scenarios(self, request, pk=None):
    """Get multiple scenario projections"""
    business_idea = self.get_object()
    scenarios = SimulationService.generate_scenarios(business_idea)
    return Response({
        'business_idea': BusinessIdeaSerializer(business_idea).data,
        'scenarios': scenarios
    })
```

---

## Phase 8: Learning Module

### Step 8.1: Create Initial Lessons (via Django Admin or Management Command)

Create `backend/learning/management/commands/create_lessons.py`:

```python
# learning/management/commands/create_lessons.py

from django.core.management.base import BaseCommand
from learning.models import Lesson

class Command(BaseCommand):
    help = 'Create initial lessons for the learning module'

    def handle(self, *args, **options):
        lessons = [
            {
                'title': 'Pricing Basics',
                'slug': 'pricing-basics',
                'description': 'Learn the fundamentals of pricing your products or services.',
                'content': '''
# Pricing Basics

## Why Pricing Matters

Pricing is one of the most critical decisions you'll make for your business. The right price:
- Covers your costs
- Generates profit
- Attracts customers
- Positions your brand

## Key Pricing Concepts

### 1. Cost-Plus Pricing
Calculate your total costs and add a markup percentage.

**Formula:** Price = Cost + (Cost × Markup %)

**Example:**
- Product cost: 100 BDT
- Markup: 50%
- Price: 100 + (100 × 0.5) = 150 BDT

### 2. Value-Based Pricing
Price based on the perceived value to the customer.

Consider:
- What problem does your product solve?
- How much would customers pay to solve this problem?
- What are alternatives costing?

### 3. Competitive Pricing
Set prices based on what competitors charge.

Options:
- Price below competitors (budget positioning)
- Match competitors (similar positioning)
- Price above competitors (premium positioning)

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
                'duration_minutes': 10,
                'order': 1
            },
            {
                'title': 'Understanding Your Customers',
                'slug': 'understanding-customers',
                'description': 'Learn how to identify and understand your target customers.',
                'content': '''
# Understanding Your Customers

## Why Customer Understanding Matters

Knowing your customers helps you:
- Create products they actually want
- Market effectively
- Price appropriately
- Build lasting relationships

## Defining Your Target Customer

### Demographics
- **Age**: What age group?
- **Gender**: Male, female, or both?
- **Location**: Urban, rural, specific areas?
- **Income level**: Budget, middle-class, affluent?
- **Occupation**: Students, professionals, homemakers?

### Psychographics
- **Values**: What do they care about?
- **Lifestyle**: How do they spend their time?
- **Pain points**: What problems do they face?
- **Buying behavior**: How do they make purchase decisions?

## Creating a Customer Persona

**Example Persona:**

> **Name**: Rashida  
> **Age**: 28  
> **Occupation**: School teacher  
> **Location**: Mirpur, Dhaka  
> **Income**: 25,000 BDT/month  
> **Goals**: Save money, provide for family  
> **Challenges**: Limited time, tight budget  
> **Shopping behavior**: Compares prices, prefers quality  

## How to Research Customers

1. **Talk to people** - Ask friends, family, potential customers
2. **Observe** - Watch how people shop and behave
3. **Online research** - Check Facebook groups, forums
4. **Surveys** - Create simple questionnaires
5. **Competitor analysis** - See who buys from competitors

## Action Items

- [ ] Create 2-3 customer personas
- [ ] List your customers' top 5 problems
- [ ] Identify where your customers spend time (online/offline)
- [ ] Talk to at least 5 potential customers this week
''',
                'difficulty': 'beginner',
                'duration_minutes': 12,
                'order': 2
            },
            {
                'title': 'Risk Management 101',
                'slug': 'risk-management-101',
                'description': 'Learn how to identify and manage business risks.',
                'content': '''
# Risk Management 101

## What is Business Risk?

Risk is the possibility of something going wrong that could harm your business. Every business faces risks, but successful entrepreneurs learn to manage them.

## Types of Business Risks

### 1. Financial Risks
- Running out of money
- Customers not paying
- Unexpected expenses
- Currency fluctuations

### 2. Market Risks
- Low demand for your product
- New competitors entering
- Changing customer preferences
- Economic downturn

### 3. Operational Risks
- Equipment breakdown
- Supply chain issues
- Employee problems
- Power outages

### 4. External Risks
- Natural disasters (floods, cyclones)
- Political instability
- New regulations
- Pandemic situations

## Risk Assessment Matrix

Rate each risk by:
- **Likelihood**: How likely is it? (1-5)
- **Impact**: How bad would it be? (1-5)
- **Risk Score**: Likelihood × Impact

| Risk | Likelihood | Impact | Score | Priority |
|------|------------|--------|-------|----------|
| Running out of cash | 3 | 5 | 15 | High |
| Equipment failure | 2 | 3 | 6 | Medium |
| Competitor price war | 3 | 4 | 12 | High |

## Risk Mitigation Strategies

### 1. Avoid
Don't take the risk at all.

### 2. Reduce
Take steps to lower likelihood or impact.

### 3. Transfer
Insurance, partnerships, outsourcing.

### 4. Accept
For low-priority risks, have a plan but accept they might happen.

## Practical Tips

1. **Keep emergency funds** - Save 3-6 months of operating costs
2. **Diversify** - Don't rely on one customer or product
3. **Get insurance** - Protect against major losses
4. **Stay informed** - Monitor market and competition
5. **Have backup plans** - Alternative suppliers, locations

## Action Items

- [ ] List your top 10 business risks
- [ ] Score each risk using the matrix
- [ ] Create mitigation plans for top 5 risks
- [ ] Set up an emergency fund target
''',
                'difficulty': 'beginner',
                'duration_minutes': 15,
                'order': 3
            }
        ]

        for lesson_data in lessons:
            lesson, created = Lesson.objects.update_or_create(
                slug=lesson_data['slug'],
                defaults=lesson_data
            )
            status = 'Created' if created else 'Updated'
            self.stdout.write(f'{status}: {lesson.title}')

        self.stdout.write(self.style.SUCCESS('Successfully created/updated lessons'))
```

### Step 8.2: Create the Management Command Directory

```bash
mkdir -p backend/learning/management/commands
touch backend/learning/management/__init__.py
touch backend/learning/management/commands/__init__.py
```

### Step 8.3: Run the Command

```bash
python manage.py create_lessons
```

---

## Phase 9: Frontend Components & Pages

### Step 9.1: Setup Project Structure

```bash
cd ~/Desktop/InvestSmart/frontend

# Create directory structure
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/services
mkdir -p src/hooks
mkdir -p src/context
```

### Step 9.2: Create API Service

Create `frontend/src/services/api.js`:

```javascript
// src/services/api.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Categories
export const getCategories = () => api.get('/categories/');

// Business Ideas
export const getBusinessIdeas = () => api.get('/business-ideas/');
export const getBusinessIdea = (id) => api.get(`/business-ideas/${id}/`);
export const createBusinessIdea = (data) => api.post('/business-ideas/', data);
export const updateBusinessIdea = (id, data) => api.put(`/business-ideas/${id}/`, data);
export const deleteBusinessIdea = (id) => api.delete(`/business-ideas/${id}/`);
export const runSimulation = (id, data) => api.post(`/business-ideas/${id}/simulate/`, data);
export const getScenarios = (id) => api.get(`/business-ideas/${id}/scenarios/`);

// Lessons
export const getLessons = () => api.get('/lessons/');
export const getLesson = (slug) => api.get(`/lessons/${slug}/`);
export const completeLesson = (slug) => api.post(`/lessons/${slug}/complete/`);

// Chat
export const sendChatMessage = (message, sessionId = null, businessContext = null) => {
  return api.post('/chat/', {
    message,
    session_id: sessionId,
    business_context: businessContext,
  });
};
export const startNewChat = () => api.post('/chat/new/');
export const getChatHistory = (sessionId) => api.get(`/chat/history/${sessionId}/`);

// Health check
export const healthCheck = () => api.get('/health/');

export default api;
```

### Step 9.3: Create Layout Component

Create `frontend/src/components/Layout.jsx`:

```jsx
// src/components/Layout.jsx

import { Link, useLocation } from 'react-router-dom';
import { Home, Lightbulb, BookOpen, MessageCircle, BarChart3 } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/simulation', label: 'Simulation', icon: Lightbulb },
  { path: '/learning', label: 'Learning', icon: BookOpen },
  { path: '/chat', label: 'AI Chat', icon: MessageCircle },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">IS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">InvestSmart</span>
            </Link>
            
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}
```

### Step 9.4: Create Chatbot Component

Create `frontend/src/components/Chatbot.jsx`:

```jsx
// src/components/Chatbot.jsx

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { sendChatMessage } from '../services/api';

export default function Chatbot({ businessContext = null }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your InvestSmart Assistant. I\'m here to help you with your business questions. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(userMessage, sessionId, businessContext);
      
      if (response.data.session_id && !sessionId) {
        setSessionId(response.data.session_id);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.response
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-xl shadow-lg border">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-blue-50 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">InvestSmart Assistant</h3>
            <p className="text-xs text-gray-500">Powered by Gemini AI</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${
              msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-gray-200' : 'bg-blue-100'
              }`}>
                {msg.role === 'user' ? (
                  <User size={16} className="text-gray-600" />
                ) : (
                  <Bot size={16} className="text-blue-600" />
                )}
              </div>
              <div className={`px-4 py-2 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
              <Loader2 size={16} className="animate-spin text-blue-600" />
              <span className="text-sm text-gray-500">Thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your business..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Step 9.5: Create Pages

Create `frontend/src/pages/Home.jsx`:

```jsx
// src/pages/Home.jsx

import { Link } from 'react-router-dom';
import { Lightbulb, BookOpen, MessageCircle, ArrowRight, TrendingUp, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: Lightbulb,
    title: 'Business Simulator',
    description: 'Test your business ideas with realistic market simulations',
    link: '/simulation',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    icon: BookOpen,
    title: 'Learning Hub',
    description: 'Learn practical business skills through short lessons',
    link: '/learning',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: MessageCircle,
    title: 'AI Business Mentor',
    description: 'Get personalized advice from our AI-powered assistant',
    link: '/chat',
    color: 'bg-blue-100 text-blue-600'
  }
];

const stats = [
  { icon: TrendingUp, value: '85%', label: 'Success Rate' },
  { icon: Users, value: '1000+', label: 'Entrepreneurs' },
  { icon: Shield, value: '100%', label: 'Risk-Free Testing' },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Turn Your Business Ideas Into
          <span className="text-blue-600"> Reality</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          InvestSmart helps aspiring entrepreneurs in Bangladesh test, learn, and launch successful businesses with AI-powered guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/simulation"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Start Simulation</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/learning"
            className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Explore Lessons
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 md:gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="text-center p-4 bg-white rounded-xl shadow-sm">
              <Icon className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Everything You Need to Succeed
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Link
                key={idx}
                to={feature.link}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border group"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="mb-6 text-blue-100">
          Join thousands of aspiring entrepreneurs who are building their dreams with InvestSmart.
        </p>
        <Link
          to="/simulation"
          className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Get Started Free
        </Link>
      </section>
    </div>
  );
}
```

Create `frontend/src/pages/Simulation.jsx`:

```jsx
// src/pages/Simulation.jsx

import { useState, useEffect } from 'react';
import { Plus, TrendingUp, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { getBusinessIdeas, createBusinessIdea, getCategories } from '../services/api';

export default function Simulation() {
  const [ideas, setIdeas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    initial_investment: '',
    monthly_revenue: '',
    monthly_costs: '',
    location: '',
    target_customers: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ideasRes, categoriesRes] = await Promise.all([
        getBusinessIdeas(),
        getCategories()
      ]);
      setIdeas(ideasRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createBusinessIdea(formData);
      setShowForm(false);
      setFormData({
        name: '',
        category: '',
        description: '',
        initial_investment: '',
        monthly_revenue: '',
        monthly_costs: '',
        location: '',
        target_customers: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error creating business idea:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFeasibilityIcon = (feasibility) => {
    switch (feasibility) {
      case 'high': return <CheckCircle className="text-green-600" size={20} />;
      case 'medium': return <TrendingUp className="text-yellow-600" size={20} />;
      case 'low': return <AlertTriangle className="text-red-600" size={20} />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Simulator</h1>
          <p className="text-gray-600">Test your business ideas with realistic simulations</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          <span>New Idea</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add Business Idea</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Dhaka Fresh Groceries"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Briefly describe your business idea"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Initial Investment (BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.initial_investment}
                    onChange={(e) => setFormData({ ...formData, initial_investment: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="100000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Revenue (BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.monthly_revenue}
                    onChange={(e) => setFormData({ ...formData, monthly_revenue: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="50000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Costs (BDT) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.monthly_costs}
                  onChange={(e) => setFormData({ ...formData, monthly_costs: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="35000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Mirpur, Dhaka"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Customers
                </label>
                <input
                  type="text"
                  value={formData.target_customers}
                  onChange={(e) => setFormData({ ...formData, target_customers: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Young professionals, families"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                  <span>{isSubmitting ? 'Analyzing...' : 'Analyze Idea'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Business Ideas List */}
      {ideas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <Lightbulb className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No business ideas yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first business idea to simulate</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Your First Idea
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {ideas.map((idea) => (
            <div key={idea.id} className="bg-white rounded-xl p-6 border shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{idea.name}</h3>
                  <p className="text-sm text-gray-500">{idea.category_detail?.name || 'Uncategorized'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getFeasibilityIcon(idea.feasibility_score)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(idea.risk_level)}`}>
                    {idea.risk_level?.toUpperCase()} RISK
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Monthly Profit</p>
                  <p className={`text-lg font-semibold ${idea.monthly_profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ৳{Number(idea.monthly_profit).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">ROI</p>
                  <p className={`text-lg font-semibold ${idea.roi_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Number(idea.roi_percentage).toFixed(1)}%
                  </p>
                </div>
              </div>

              {idea.ai_advice && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-600 font-medium mb-1">AI Advice</p>
                  <p className="text-sm text-gray-700 line-clamp-3">{idea.ai_advice}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

Create `frontend/src/pages/Learning.jsx`:

```jsx
// src/pages/Learning.jsx

import { useState, useEffect } from 'react';
import { BookOpen, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { getLessons, getLesson, completeLesson } from '../services/api';

export default function Learning() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await getLessons();
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLesson = async (slug) => {
    setIsLoadingLesson(true);
    try {
      const response = await getLesson(slug);
      setSelectedLesson(response.data);
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setIsLoadingLesson(false);
    }
  };

  const handleComplete = async () => {
    if (!selectedLesson) return;
    try {
      await completeLesson(selectedLesson.slug);
      alert('Lesson marked as completed!');
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-600';
      case 'intermediate': return 'bg-yellow-100 text-yellow-600';
      case 'advanced': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Learning Hub</h1>
        <p className="text-gray-600">Build practical business skills through short lessons</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Lesson List */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="font-semibold text-gray-900">Available Lessons</h2>
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => handleSelectLesson(lesson.slug)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedLesson?.id === lesson.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty}
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  {lesson.duration_minutes} min
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Lesson Content */}
        <div className="md:col-span-2">
          {isLoadingLesson ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl border">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : selectedLesson ? (
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedLesson.title}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(selectedLesson.difficulty)}`}>
                      {selectedLesson.difficulty}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {selectedLesson.duration_minutes} minutes
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleComplete}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <CheckCircle size={18} />
                  <span>Complete</span>
                </button>
              </div>
              
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700">
                  {selectedLesson.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border">
              <BookOpen className="text-gray-400 mb-4" size={48} />
              <p className="text-gray-500">Select a lesson to start learning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

Create `frontend/src/pages/Chat.jsx`:

```jsx
// src/pages/Chat.jsx

import Chatbot from '../components/Chatbot';

export default function Chat() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Business Mentor</h1>
        <p className="text-gray-600">Get personalized advice for your business questions</p>
      </div>
      
      <Chatbot />
      
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Suggested Questions</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• How do I price my products competitively?</li>
          <li>• What are the key steps to start a small business in Bangladesh?</li>
          <li>• How can I reduce my business costs?</li>
          <li>• What marketing strategies work for small businesses?</li>
          <li>• How do I handle competition in my area?</li>
        </ul>
      </div>
    </div>
  );
}
```

Create `frontend/src/pages/Dashboard.jsx`:

```jsx
// src/pages/Dashboard.jsx

import { useState, useEffect } from 'react';
import { TrendingUp, Lightbulb, BookOpen, Target, Loader2 } from 'lucide-react';
import { getBusinessIdeas, getLessons } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ideasRes, lessonsRes] = await Promise.all([
        getBusinessIdeas(),
        getLessons()
      ]);
      setIdeas(ideasRes.data);
      setLessons(lessonsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  const stats = [
    { label: 'Business Ideas', value: ideas.length, icon: Lightbulb, color: 'bg-blue-500' },
    { label: 'Lessons Available', value: lessons.length, icon: BookOpen, color: 'bg-green-500' },
    { label: 'Avg ROI', value: ideas.length > 0 
      ? `${(ideas.reduce((sum, i) => sum + Number(i.roi_percentage || 0), 0) / ideas.length).toFixed(1)}%`
      : '0%', icon: TrendingUp, color: 'bg-yellow-500' },
    { label: 'High Feasibility', value: ideas.filter(i => i.feasibility_score === 'high').length, icon: Target, color: 'bg-purple-500' },
  ];

  const chartData = ideas.slice(0, 5).map(idea => ({
    name: idea.name.length > 15 ? idea.name.substring(0, 15) + '...' : idea.name,
    profit: Number(idea.monthly_profit) || 0,
    roi: Number(idea.roi_percentage) || 0
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Track your progress and business performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-4 rounded-xl border shadow-sm">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      {ideas.length > 0 && (
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Ideas Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#3b82f6" name="Monthly Profit (BDT)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Ideas */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Business Ideas</h2>
        {ideas.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No business ideas yet. Start by creating one!</p>
        ) : (
          <div className="space-y-3">
            {ideas.slice(0, 5).map((idea) => (
              <div key={idea.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{idea.name}</p>
                  <p className="text-sm text-gray-500">
                    ROI: {Number(idea.roi_percentage).toFixed(1)}% | Risk: {idea.risk_level}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  idea.feasibility_score === 'high' ? 'bg-green-100 text-green-600' :
                  idea.feasibility_score === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {idea.feasibility_score}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Step 9.6: Update App.jsx

Edit `frontend/src/App.jsx`:

```jsx
// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Learning from './pages/Learning';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
```

---

## Phase 10: Integration & Testing

### Step 10.1: Add Sample Categories

```bash
cd ~/Desktop/InvestSmart/backend
source venv/bin/activate

python manage.py shell
```

```python
from core.models import Category

categories = [
    {'name': 'Retail', 'description': 'Shops and stores', 'icon': 'store'},
    {'name': 'Food & Restaurant', 'description': 'Food businesses', 'icon': 'utensils'},
    {'name': 'Services', 'description': 'Service-based businesses', 'icon': 'briefcase'},
    {'name': 'Technology', 'description': 'Tech startups', 'icon': 'laptop'},
    {'name': 'Education', 'description': 'Tutoring and training', 'icon': 'graduation-cap'},
    {'name': 'Agriculture', 'description': 'Farming and agribusiness', 'icon': 'leaf'},
]

for cat in categories:
    Category.objects.get_or_create(name=cat['name'], defaults=cat)

print("Categories created!")
exit()
```

### Step 10.2: Test Complete Flow

```bash
# Terminal 1: Run Backend
cd ~/Desktop/InvestSmart/backend
source venv/bin/activate
python manage.py runserver

# Terminal 2: Run Frontend
cd ~/Desktop/InvestSmart/frontend
npm run dev
```

### Step 10.3: Testing Checklist

- [ ] Home page loads correctly
- [ ] Navigation works on desktop and mobile
- [ ] Business simulation form works
- [ ] AI advice is generated
- [ ] Chat functionality works
- [ ] Lessons are displayed
- [ ] Dashboard shows statistics

---

## Phase 11: Deployment

### Step 11.1: Prepare Backend for Production

Update `.env`:

```bash
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
```

Create `requirements.txt`:

```bash
pip freeze > requirements.txt
```

### Step 11.2: Prepare Frontend for Production

```bash
cd ~/Desktop/InvestSmart/frontend

# Update .env for production
echo "VITE_API_URL=https://api.your-domain.com" > .env.production

# Build
npm run build
```

### Step 11.3: Docker Setup (Optional)

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app
      - sqlite_data:/app/data  # Persist SQLite database
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  sqlite_data:
```

> **Note:** For production with SQLite, consider using a volume to persist the database file, or migrate to PostgreSQL for better performance with multiple users.

---

## Troubleshooting

### Common Issues

#### 1. Database Error (SQLite3)

```bash
# If database is corrupted or you want to start fresh
cd ~/Desktop/InvestSmart/backend
rm db.sqlite3  # Delete existing database
python manage.py migrate  # Create new database
python manage.py createsuperuser  # Create admin user again
```

#### 2. CORS Error

Make sure `corsheaders` middleware is first in the list and origins are correct in `settings.py`.

#### 3. Gemini API Error

```python
# Test API key in Python shell
import google.generativeai as genai
genai.configure(api_key='your-key')
model = genai.GenerativeModel('gemini-2.5-flash')
response = model.generate_content('Hello')
print(response.text)
```

#### 4. Frontend API Connection

Check that `VITE_API_URL` is correct in `.env` and the backend is running.

#### 5. Module Not Found

```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

---

## Summary

You've now completed the full implementation of the InvestSmart pilot project! The system includes:

✅ Django backend with REST API  
✅ React + Vite frontend  
✅ PostgreSQL database  
✅ AI Chatbot with Gemini 2.5 Flash  
✅ Business simulation engine  
✅ Learning module  
✅ Dashboard with analytics  

**Next Steps:**
1. Add user authentication
2. Implement more simulation scenarios
3. Add more lessons
4. Deploy to production
5. Gather user feedback

---

**Happy Building! 🚀**

*InvestSmart Team - University of Dhaka*
