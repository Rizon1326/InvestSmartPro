# InvestSmart - High-Level Overview & Workflow

## 🎯 Project Summary

**InvestSmart** is an AI-powered entrepreneurial simulation platform designed for Bangladeshi youth (ages 15-25) to learn business skills through interactive, gamified experiences with real-time AI mentorship.

---

## 🏗️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Django 4.2 + Django REST Framework |
| **Frontend** | React + Vite + TailwindCSS |
| **Database** | SQLite3 (Django default) |
| **AI Model** | Gemini 2.5 Flash |
| **AI SDK** | google-generativeai |

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│                    React + Vite + TailwindCSS                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │Dashboard │ │Simulation│ │ Learning │ │   AI Chatbot     │   │
│  │   Page   │ │  Module  │ │  Module  │ │    Interface     │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                 │
│                    Django REST Framework                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │   User   │ │Simulation│ │ Learning │ │    AI Service    │   │
│  │   API    │ │   API    │ │   API    │ │  (Gemini 2.5)    │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE                                 │
│                         SQLite3                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │  Users   │ │Businesses│ │ Progress │ │  Chat History    │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Development Workflow

### Phase 1: Environment Setup
```
1. Create project folder
2. Set up Python virtual environment
3. Install Django & dependencies
4. Create React+Vite frontend
5. Configure environment variables
```

### Phase 2: Backend Development
```
1. Create Django project & apps
2. Define database models
3. Build REST API endpoints
4. Integrate Gemini AI service
5. Set up authentication
```

### Phase 3: Frontend Development
```
1. Set up React components
2. Create UI pages (Dashboard, Simulation, Chat)
3. Connect to backend APIs
4. Style with TailwindCSS
5. Add charts & visualizations
```

### Phase 4: AI Integration
```
1. Configure Gemini 2.5 Flash API
2. Build AI chatbot service
3. Implement business advice engine
4. Create scenario generation logic
```

### Phase 5: Testing & Deployment
```
1. Unit & integration testing
2. User acceptance testing
3. Deploy to production server
4. Monitor & iterate
```

---

## 📁 Project Structure

```
InvestSmart/
├── backend/
│   ├── investsmart/          # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── users/                # User authentication app
│   ├── simulation/           # Business simulation app
│   ├── learning/             # Learning modules app
│   ├── ai_service/           # Gemini AI integration
│   ├── manage.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Quick Start Commands

### Backend Setup
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install django djangorestframework django-cors-headers google-generativeai python-dotenv

# Create Django project
django-admin startproject investsmart .
python manage.py startapp users
python manage.py startapp simulation
python manage.py startapp ai_service

# Run migrations & start server
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
# Create Vite React project
npm create vite@latest frontend -- --template react
cd frontend

# Install dependencies
npm install axios react-router-dom recharts
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start development server
npm run dev
```

---

## 🎮 Core Features (Pilot)

| # | Feature | Description |
|---|---------|-------------|
| 1 | **User Registration** | Sign up with profile creation |
| 2 | **Business Simulation** | Virtual business management game |
| 3 | **AI Chatbot** | Gemini-powered business mentor |
| 4 | **Learning Modules** | Interactive business lessons |
| 5 | **Progress Tracking** | Dashboard with analytics |
| 6 | **Decision Scenarios** | Real-world business challenges |
| 7 | **Feedback System** | AI-generated performance insights |

---

## 🔗 API Endpoints Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register/` | POST | User registration |
| `/api/auth/login/` | POST | User login |
| `/api/simulation/start/` | POST | Start new simulation |
| `/api/simulation/decision/` | POST | Submit business decision |
| `/api/chat/message/` | POST | Send message to AI chatbot |
| `/api/learning/modules/` | GET | Get learning modules |
| `/api/progress/` | GET | Get user progress |

---

## 📋 Implementation Checklist

### Week 1-2: Foundation
- [ ] Set up development environment
- [ ] Initialize Django backend
- [ ] Initialize React frontend
- [ ] Configure Gemini API

### Week 3-4: Core Backend
- [ ] Create database models
- [ ] Build authentication system
- [ ] Implement simulation logic
- [ ] Create AI service integration

### Week 5-6: Frontend Development
- [ ] Build UI components
- [ ] Create main pages
- [ ] Connect to APIs
- [ ] Add responsive styling

### Week 7-8: Integration & Testing
- [ ] Integrate all features
- [ ] Test AI chatbot
- [ ] User testing
- [ ] Bug fixes & refinements

---

## 🔑 Environment Variables

```bash
# backend/.env
GEMINI_API_KEY=your_gemini_api_key_here
SECRET_KEY=your_django_secret_key
DEBUG=True
```

```bash
# frontend/.env
VITE_API_URL=http://localhost:8000/api
```

---

## 📚 Related Documentation

| Document | Purpose |
|----------|---------|
| `IMPLEMENTATION_WORKFLOW.md` | Detailed A-to-Z implementation guide |
| `PILOTING_GUIDE.md` | Pilot project implementation guide |
| `Piloting.tex` | LaTeX source for formal documentation |
| `Proposal.tex` | Original project proposal |

---

## 🎯 Success Metrics

- **User Engagement**: Active users, session duration
- **Learning Outcomes**: Module completion rates
- **AI Effectiveness**: Chatbot satisfaction scores
- **System Performance**: Response times, uptime

---

*Last Updated: March 2026*
