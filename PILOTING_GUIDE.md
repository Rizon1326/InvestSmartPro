# InvestSmart - Pilot Implementation Guide

> **An AI-Powered Entrepreneurial Simulation & Decision Support Platform**

---

## Table of Contents

1. [Overview](#overview)
2. [Proposed Solution](#proposed-solution)
3. [Technical Methodology](#technical-methodology)
   - [AI Model / Approach](#ai-model--approach)
   - [System Design & Technical Workflow](#system-design--technical-workflow)
   - [Datasets](#datasets)
   - [Tools & Frameworks](#tools--frameworks)
4. [Project Scope](#project-scope)
5. [Pilot Implementation](#pilot-implementation)
   - [Pilot Features Checklist](#pilot-features-checklist)
   - [Implementation Tasks](#implementation-tasks)
6. [Getting Started](#getting-started)

---

## Overview

**InvestSmart** is an AI-powered web platform designed to help Bangladeshi youth, students, and aspiring entrepreneurs learn, test, and validate business ideas through interactive simulations. The platform combines **real-time market insights, AI-driven guidance, and hands-on business practice** to bridge the gap between academic theory and real-world entrepreneurship.

---

## Proposed Solution

The solution provides the following core modules:

| Module | Description |
|--------|-------------|
| **Business Idea Simulator** | Users test business concepts in a virtual environment with realistic market conditions |
| **AI Business Mentor** | A generative AI assistant providing step-by-step guidance on planning, budgeting, pricing, marketing, and risk assessment |
| **Market Feasibility Analyzer** | Automated evaluation of demand, competition, investment needs, and profit potential |
| **Learning Hub** | Short modules, case studies, and tutorials to strengthen practical business skills |
| **Progress & Performance Tracking** | Analytics dashboards showing improvement across decisions and simulations |

> **Goal:** Empower beginners to make informed decisions *before* investing money, supporting youth empowerment, self-employment, and SDG-aligned development.

---

## Technical Methodology

### AI Model / Approach

#### a. Retrieval-Augmented Generation (RAG)

- Used for fetching relevant business cases, examples, and learning content
- Combines vector similarity search with LLM generation for personalized recommendations

**Use Cases:**
- [ ] AI Business Mentor retrieves topic-specific content from structured knowledge base
- [ ] Business Idea Simulator fetches similar historical business cases to predict outcomes

#### b. Large Language Models (LLM)

Models like **GPT-4, Mistral, or LLaMA** used for:
- Generating step-by-step guidance and actionable advice
- Explaining complex business concepts in simple terms
- Suggesting mini-case exercises or implementation examples

> Fine-tuned or prompt-engineered for domain-specific business knowledge.

---

### System Design & Technical Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                        SYSTEM ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────┘

1. USER INPUT LAYER
   └── Collects: business idea, budget, location, team experience, learning preferences

2. DATA PREPROCESSING & STORAGE
   ├── Structured Data: SQLite3 (business cases, KPIs)
   └── Unstructured Data: MongoDB / Vector DB (learning modules, case studies)

3. AI PROCESSING LAYER
   ├── RAG Pipeline: Retrieve relevant content or past business cases
   ├── LLM: Generate personalized insights, learning guidance, scenario predictions
   └── Predictive ML Models: Compute KPIs, risk scores, feasibility metrics

4. SIMULATION / SCENARIO ENGINE
   ├── Evaluate multiple "what-if" scenarios for business ideas
   └── Generate: projected revenue, risk assessment, success probability

5. LEARNING & GUIDANCE LAYER
   └── AI Mentor: step-by-step explanations, practical examples, gamified exercises

6. ANALYTICS & DASHBOARD
   ├── Track user progress, learning outcomes, simulation performance
   └── Visualize improvement and recommendations via charts/dashboards
```

---

### Datasets

#### a. Internal / Proprietary Datasets
- [ ] Structured business case experiments, KPI results, success/failure scenarios
- [ ] User interaction and learning progress data (for analytics and model feedback)

#### b. External Datasets
- [ ] Market trends, competitor data, economic indicators via web scraping or APIs
  - Google Trends API
  - World Bank Open Data
  - Kaggle datasets
- [ ] Business tutorials, books, online resources for RAG-based learning content

#### c. Data Processing Pipeline
| Data Type | Processing |
|-----------|------------|
| Text data | Cleaned → Tokenized → Embedded into vector space for RAG |
| Numeric/market data | Normalized → Structured for predictive modeling |

---

### Tools & Frameworks

| Layer | Tools / Frameworks |
|-------|-------------------|
| **AI / RAG** | LangChain |
| **LLM** | Free models (Mistral, LLaMA, etc.) |
| **ML/Analytics** | Scikit-learn, Pandas, NumPy, Plotly, Matplotlib |
| **Backend** | Python, Django |
| **Frontend** | React.js |
| **Data Collection** | BeautifulSoup, Scrapy, APIs |
| **Database** | SQLite3 (default), Vector databases (Chroma/FAISS) |
| **Deployment** | Docker, GitHub, Vercel |

---

## Project Scope

InvestSmart focuses on helping Bangladeshi youth learn, test, and validate business ideas using AI-driven tools.

### Core Features (Full Scope)

- [ ] **Business Idea Simulator:** Virtual testing with cost, demand, risk, and competition factors
- [ ] **AI Business Mentor:** Step-by-step guidance using RAG + LLMs
- [ ] **Market Feasibility Analyzer:** Automated scoring of demand, competition, investment needs, profitability
- [ ] **Learning Hub:** Short modules and case studies for practical business skills
- [ ] **Progress Dashboard:** Tracks user improvement and decision quality

### Target Users
- Students
- Young entrepreneurs
- Unemployed youth seeking self-employment

### Technology Coverage
- RAG for retrieval
- LLMs for guidance
- ML models for risk and feasibility prediction

---

## Pilot Implementation

The pilot includes a **minimal set of core features** to test the basic usefulness of InvestSmart.

### Pilot Features Checklist

| # | Feature | Description | Status |
|---|---------|-------------|--------|
| 1 | **Business Idea Input** | Users add a business idea with basic cost and price info | ⬜ TODO |
| 2 | **Basic Simulation** | Shows estimated profit and risk level | ⬜ TODO |
| 3 | **AI Mentor (Simple Tips)** | Gives short suggestions on pricing, cost, and marketing | ⬜ TODO |
| 4 | **Feasibility Score** | Provides a basic rating: High / Medium / Low | ⬜ TODO |
| 5 | **Small Learning Section** | 2–3 quick lessons on pricing, customers, and risk | ⬜ TODO |
| 6 | **Simple Progress View** | Shows number of simulations and completed lessons | ⬜ TODO |

---

### Implementation Tasks

#### Phase 1: Project Setup
- [ ] Initialize Django backend project
- [ ] Initialize React.js frontend project
- [ ] Configure Gemini API key
- [ ] Configure Docker for containerization
- [ ] Set up GitHub repository

> **Note:** Using SQLite3 (Django default) - no separate database setup required!

#### Phase 2: Business Idea Input Module
- [ ] Create business idea submission form (React)
- [ ] Design database schema for business ideas
- [ ] Build API endpoint for idea submission (Django REST)
- [ ] Validate and store user inputs

**Fields to collect:**
```
- Business Name
- Business Category/Type
- Initial Investment (BDT)
- Expected Monthly Revenue (BDT)
- Expected Monthly Costs (BDT)
- Location/Area
- Target Customers
```

#### Phase 3: Basic Simulation Engine
- [ ] Implement profit calculation logic
- [ ] Create risk assessment algorithm
- [ ] Build simulation results API
- [ ] Design results display UI

**Basic Formulas:**
```python
# Profit Calculation
monthly_profit = expected_revenue - expected_costs
roi = (monthly_profit * 12) / initial_investment * 100

# Risk Level (simplified)
if roi > 50:
    risk = "Low"
elif roi > 20:
    risk = "Medium"
else:
    risk = "High"
```

#### Phase 4: AI Mentor Integration
- [ ] Set up LangChain with chosen LLM
- [ ] Create prompt templates for business advice
- [ ] Build AI chat/tips API endpoint
- [ ] Integrate AI suggestions in frontend

**Sample Prompt Template:**
```python
prompt = """
You are a business mentor for aspiring entrepreneurs in Bangladesh.
Based on the following business idea, provide 3-5 practical tips:

Business: {business_name}
Category: {category}
Investment: {investment} BDT
Expected Revenue: {revenue} BDT
Expected Costs: {costs} BDT

Provide actionable advice on:
1. Pricing strategy
2. Cost optimization
3. Marketing approach
"""
```

#### Phase 5: Feasibility Score
- [ ] Define scoring criteria
- [ ] Implement scoring algorithm
- [ ] Create feasibility score API
- [ ] Display score with explanation

**Scoring Criteria:**
| Factor | Weight |
|--------|--------|
| ROI Potential | 30% |
| Market Demand | 25% |
| Competition Level | 20% |
| Initial Investment Risk | 15% |
| Operational Complexity | 10% |

#### Phase 6: Learning Section
- [ ] Create 2-3 static learning modules
- [ ] Design learning content database schema
- [ ] Build lesson display components
- [ ] Track lesson completion

**Initial Lessons:**
1. **Pricing Basics** - How to price your product/service
2. **Understanding Your Customers** - Identifying target market
3. **Risk Management 101** - Basics of business risk

#### Phase 7: Progress Tracking
- [ ] Design user progress schema
- [ ] Track simulations completed
- [ ] Track lessons completed
- [ ] Build simple dashboard UI

---

## Getting Started

### Prerequisites

```bash
# Required installations
- Python 3.10+
- Node.js 18+
- Docker (optional)
# Note: SQLite3 comes built-in with Python - no separate database needed!
```

### Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Install dependencies
pip install django djangorestframework django-cors-headers
pip install google-generativeai python-dotenv

# Initialize Django project
django-admin startproject investsmart_backend
cd investsmart_backend
python manage.py startapp core
python manage.py startapp simulation
python manage.py startapp learning
```

### Frontend Setup
```bash
# Create React app
npx create-react-app investsmart-frontend
cd investsmart-frontend

# Install dependencies
npm install axios react-router-dom recharts tailwindcss
```

### Environment Variables

```bash
# Backend .env file
GEMINI_API_KEY=your_gemini_api_key_here
SECRET_KEY=your_django_secret_key
DEBUG=True

# Frontend .env file
VITE_API_URL=http://localhost:8000/api
```

> **Note:** No database configuration needed! Django uses SQLite3 by default and creates `db.sqlite3` automatically.

---

## Project Structure (Recommended)

```
investsmart/
├── backend/
│   ├── investsmart/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── core/
│   │   ├── models.py
│   │   ├── views.py
│   │   └── serializers.py
│   ├── simulation/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── services.py      # Business logic
│   │   └── ai_mentor.py     # LangChain integration
│   ├── learning/
│   │   ├── models.py
│   │   └── views.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/        # API calls
│   │   └── App.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── README.md
└── PILOTING_GUIDE.md
```

---

## Quick Reference Commands

```bash
# Backend
python manage.py runserver          # Run Django server
python manage.py makemigrations     # Create migrations
python manage.py migrate            # Apply migrations

# Frontend
npm start                           # Run React dev server
npm run build                       # Build for production

# Docker
docker-compose up -d                # Start all services
docker-compose down                 # Stop all services
```

---

## Next Steps

1. ✅ Review this implementation guide
2. ⬜ Set up development environment
3. ⬜ Initialize backend and frontend projects
4. ⬜ Implement Phase 1-7 sequentially
5. ⬜ Test each feature before moving to the next
6. ⬜ Deploy pilot version for user testing

---

**Team:** Mahir Faisal, Khandakar Mehedi Hasan, Ibne Bin Rafid  
**Institution:** Institute of Information Technology, University of Dhaka  
**Supervisor:** Saed Siddik
