# InvestSmart API Documentation

**Version:** 1.0.0  
**Base URL:** `http://localhost:8000/api`  
**Date:** March 11, 2026  
**Status:** ✅ Backend Development Complete

---

## Table of Contents

1. [Overview](#overview)
2. [API Status Summary](#api-status-summary)
3. [Core APIs](#core-apis)
4. [Learning Module APIs](#learning-module-apis)
5. [Business Simulation APIs](#business-simulation-apis)
6. [Chatbot APIs](#chatbot-apis)
7. [Error Handling](#error-handling)
8. [Important Notes for Frontend Developer](#important-notes-for-frontend-developer)

---

## Overview

InvestSmart is a business education and simulation platform designed for aspiring entrepreneurs in Bangladesh. The backend provides APIs for:

- **Core**: Health check and business categories
- **Learning**: Educational lessons and progress tracking
- **Simulation**: Business idea creation, AI analysis, and financial projections
- **Chatbot**: AI-powered business advisor chat (using Google Gemini)

### Authentication

Currently, all endpoints use `AllowAny` permission, meaning no authentication is required. However, some features (like lesson progress) work better with authenticated users.

### CORS

Allowed origins:
- `http://localhost:5173` (Vite dev server)
- `http://127.0.0.1:5173`

---

## API Status Summary

| Module | Endpoint | Method | Status |
|--------|----------|--------|--------|
| Core | `/api/health/` | GET | ✅ Working |
| Core | `/api/categories/` | GET | ✅ Working |
| Core | `/api/categories/{id}/` | GET | ✅ Working |
| Learning | `/api/lessons/` | GET | ✅ Working |
| Learning | `/api/lessons/{slug}/` | GET | ✅ Working |
| Learning | `/api/lessons/{slug}/complete/` | POST | ✅ Working (Auth required) |
| Learning | `/api/progress/` | GET | ✅ Working |
| Simulation | `/api/business-ideas/` | GET, POST | ✅ Working |
| Simulation | `/api/business-ideas/{id}/` | GET, PUT, DELETE | ✅ Working |
| Simulation | `/api/business-ideas/{id}/simulate/` | POST | ✅ Working |
| Simulation | `/api/business-ideas/{id}/scenarios/` | GET | ✅ Working |
| Simulation | `/api/business-ideas/{id}/history/` | GET | ✅ Working |
| Simulation | `/api/simulations/` | GET | ✅ Working |
| Chatbot | `/api/chat/` | POST | ✅ Working |
| Chatbot | `/api/chat/new/` | POST | ✅ Working |
| Chatbot | `/api/chat/history/{session_id}/` | GET | ✅ Working |

### AI Integration Status

⚠️ **Note:** The Gemini AI integration is working correctly, but the current API key has exceeded its free tier quota. When AI quota is available:
- Business idea analysis returns AI-generated feedback
- Chat responds with AI-generated messages
- Scenario generation provides AI insights

**When quota is exceeded:**
- Business ideas are still created with default values
- Chat returns error messages gracefully
- Scenarios return fallback default projections

---

## Core APIs

### 1. Health Check

Check if the API server is running.

**Endpoint:** `GET /api/health/`

**Response:**
```json
{
    "status": "healthy",
    "message": "InvestSmart API is running",
    "version": "1.0.0"
}
```

---

### 2. List Categories

Get all business categories.

**Endpoint:** `GET /api/categories/`

**Response:**
```json
[
    {
        "id": 1,
        "name": "Retail",
        "description": "Shops and stores selling products directly to consumers",
        "icon": "store",
        "created_at": "2026-03-11T13:16:27.663189+06:00"
    },
    {
        "id": 2,
        "name": "Food & Beverage",
        "description": "Restaurants, cafes, food stalls, and catering",
        "icon": "restaurant",
        "created_at": "2026-03-11T13:16:27.671237+06:00"
    }
    // ... more categories
]
```

**Available Categories:**
| ID | Name | Icon |
|----|------|------|
| 1 | Retail | store |
| 2 | Food & Beverage | restaurant |
| 3 | Technology | computer |
| 4 | Agriculture | leaf |
| 5 | Services | briefcase |
| 6 | Manufacturing | factory |
| 7 | Education | school |
| 8 | Healthcare | medical |
| 9 | Fashion | shirt |
| 10 | E-commerce | cart |

---

### 3. Get Single Category

**Endpoint:** `GET /api/categories/{id}/`

**Example:** `GET /api/categories/1/`

**Response:**
```json
{
    "id": 1,
    "name": "Retail",
    "description": "Shops and stores selling products directly to consumers",
    "icon": "store",
    "created_at": "2026-03-11T13:16:27.663189+06:00"
}
```

---

## Learning Module APIs

### 1. List All Lessons

Get all published lessons.

**Endpoint:** `GET /api/lessons/`

**Response:**
```json
[
    {
        "id": 1,
        "title": "Introduction to Entrepreneurship",
        "slug": "introduction-to-entrepreneurship",
        "description": "Learn the basics of starting your own business",
        "content": "# Introduction to Entrepreneurship\n\n## What is Entrepreneurship?...",
        "difficulty": "beginner",
        "duration_minutes": 15,
        "order": 1,
        "is_published": true,
        "created_at": "2026-03-11T13:16:28.388792+06:00",
        "updated_at": "2026-03-11T13:16:28.388830+06:00"
    }
    // ... more lessons
]
```

**Available Lessons:**
| Order | Title | Difficulty | Duration |
|-------|-------|------------|----------|
| 1 | Introduction to Entrepreneurship | beginner | 15 min |
| 2 | Understanding Your Market | beginner | 20 min |
| 3 | Pricing Your Products | beginner | 20 min |
| 4 | Managing Your Finances | intermediate | 25 min |
| 5 | Risk Management Basics | intermediate | 20 min |

**Difficulty Levels:** `beginner`, `intermediate`, `advanced`

---

### 2. Get Single Lesson

Get a lesson by its slug.

**Endpoint:** `GET /api/lessons/{slug}/`

**Example:** `GET /api/lessons/introduction-to-entrepreneurship/`

**Response:**
```json
{
    "id": 1,
    "title": "Introduction to Entrepreneurship",
    "slug": "introduction-to-entrepreneurship",
    "description": "Learn the basics of starting your own business",
    "content": "# Introduction to Entrepreneurship\n\n## What is Entrepreneurship?...",
    "difficulty": "beginner",
    "duration_minutes": 15,
    "order": 1,
    "is_published": true,
    "created_at": "2026-03-11T13:16:28.388792+06:00",
    "updated_at": "2026-03-11T13:16:28.388830+06:00"
}
```

**Note:** The `content` field contains Markdown-formatted lesson content. Frontend should render it as HTML.

---

### 3. Mark Lesson as Complete

Mark a lesson as completed for the authenticated user.

**Endpoint:** `POST /api/lessons/{slug}/complete/`

**Authentication:** Required

**Example:** `POST /api/lessons/introduction-to-entrepreneurship/complete/`

**Response (Success):**
```json
{
    "message": "Lesson marked as completed",
    "lesson": {
        "id": 1,
        "title": "Introduction to Entrepreneurship",
        "slug": "introduction-to-entrepreneurship",
        // ... lesson details
    },
    "completed_at": "2026-03-11T14:00:00.000000+06:00"
}
```

**Response (Not Authenticated):**
```json
{
    "error": "Authentication required"
}
```
**HTTP Status:** 401

---

### 4. Get User Progress

Get lesson progress for the authenticated user.

**Endpoint:** `GET /api/progress/`

**Authentication:** Required (returns empty array if not authenticated)

**Response:**
```json
[
    {
        "id": 1,
        "lesson": {
            "id": 1,
            "title": "Introduction to Entrepreneurship",
            // ... lesson details
        },
        "is_completed": true,
        "completed_at": "2026-03-11T14:00:00.000000+06:00",
        "created_at": "2026-03-11T14:00:00.000000+06:00"
    }
]
```

---

## Business Simulation APIs

### 1. List Business Ideas

Get all business ideas.

**Endpoint:** `GET /api/business-ideas/`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `user_only` | string | Set to `"true"` to filter by authenticated user's ideas only |

**Example:** `GET /api/business-ideas/?user_only=true`

**Response:**
```json
[
    {
        "id": 1,
        "name": "Coffee Shop",
        "description": "A small coffee shop in Dhaka selling premium coffee and snacks",
        "category": 2,
        "category_detail": {
            "id": 2,
            "name": "Food & Beverage",
            "description": "Restaurants, cafes, food stalls, and catering",
            "icon": "restaurant",
            "created_at": "2026-03-11T13:16:27.671237+06:00"
        },
        "initial_investment": "500000.00",
        "monthly_revenue": "150000.00",
        "monthly_expenses": "80000.00",
        "monthly_profit": "70000.00",
        "risk_level": "medium",
        "feasibility_score": 75,
        "ai_feedback": "This is a solid business idea with good profit margins...",
        "created_at": "2026-03-11T14:00:00.000000+06:00",
        "updated_at": "2026-03-11T14:00:00.000000+06:00"
    }
]
```

---

### 2. Create Business Idea

Create a new business idea with AI analysis.

**Endpoint:** `POST /api/business-ideas/`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "name": "Coffee Shop",
    "description": "A small coffee shop in Dhaka selling premium coffee and snacks",
    "initial_investment": "500000",
    "monthly_revenue": "150000",
    "monthly_expenses": "80000",
    "category_id": 2
}
```

**Required Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Business name (max 200 chars) |
| `description` | string | Business description |
| `initial_investment` | decimal/string | Initial investment in BDT |
| `monthly_revenue` | decimal/string | Expected monthly revenue in BDT |
| `monthly_expenses` | decimal/string | Expected monthly expenses in BDT |

**Optional Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `category_id` | integer | Category ID (1-10) |

**Response:**
```json
{
    "id": 5,
    "name": "Coffee Shop",
    "description": "A small coffee shop in Dhaka selling premium coffee and snacks",
    "category": 2,
    "category_detail": {
        "id": 2,
        "name": "Food & Beverage",
        "description": "Restaurants, cafes, food stalls, and catering",
        "icon": "restaurant",
        "created_at": "2026-03-11T13:16:27.671237+06:00"
    },
    "initial_investment": "500000.00",
    "monthly_revenue": "150000.00",
    "monthly_expenses": "80000.00",
    "monthly_profit": "70000.00",
    "risk_level": "medium",
    "feasibility_score": 75,
    "ai_feedback": "**Strengths:**\n- Good profit margin (46.7%)\n- Growing coffee culture in Bangladesh\n\n**Challenges:**\n- High competition in urban areas\n- Initial investment is significant\n\n**Recommendations:**\n- Focus on unique offerings\n- Consider premium positioning",
    "created_at": "2026-03-11T14:00:00.000000+06:00",
    "updated_at": "2026-03-11T14:00:00.000000+06:00"
}
```

**Auto-calculated Fields:**
- `monthly_profit`: Calculated as `monthly_revenue - monthly_expenses`
- `feasibility_score`: AI-generated score (0-100)
- `risk_level`: AI-generated (`low`, `medium`, `high`)
- `ai_feedback`: AI-generated detailed analysis

---

### 3. Get Single Business Idea

**Endpoint:** `GET /api/business-ideas/{id}/`

**Example:** `GET /api/business-ideas/5/`

**Response:** Same format as create response

---

### 4. Update Business Idea

**Endpoint:** `PUT /api/business-ideas/{id}/`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "name": "Updated Coffee Shop",
    "description": "Updated description",
    "initial_investment": "600000",
    "monthly_revenue": "180000",
    "monthly_expenses": "90000"
}
```

**Response:** Same format as create response with updated values

---

### 5. Delete Business Idea

**Endpoint:** `DELETE /api/business-ideas/{id}/`

**Example:** `DELETE /api/business-ideas/5/`

**Response:** 
- **HTTP Status:** 204 No Content
- **Body:** Empty

---

### 6. Run Simulation

Run a financial simulation on a business idea.

**Endpoint:** `POST /api/business-ideas/{id}/simulate/`

**Example:** `POST /api/business-ideas/5/simulate/`

**Request Body:**
```json
{
    "scenario_name": "Best Case Scenario"
}
```

**Optional Fields:**
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `scenario_name` | string | "Custom Simulation" | Name for this simulation |

**Response:**
```json
{
    "id": 1,
    "business_idea": 5,
    "scenario_name": "Best Case Scenario",
    "scenario_description": "Simulation for Coffee Shop",
    "projected_revenue": "1800000.00",
    "projected_expenses": "960000.00",
    "projected_profit": "840000.00",
    "projected_roi": "168.00",
    "risk_assessment": "Risk Level: medium",
    "recommendations": "Focus on customer retention and quality...",
    "created_at": "2026-03-11T14:05:00.000000+06:00"
}
```

**Calculations:**
- `projected_revenue`: Monthly revenue × 12
- `projected_expenses`: Monthly expenses × 12
- `projected_profit`: Annual profit (revenue - expenses)
- `projected_roi`: (Annual profit / Initial investment) × 100

---

### 7. Get AI Scenarios

Get AI-generated business scenarios (optimistic, realistic, pessimistic).

**Endpoint:** `GET /api/business-ideas/{id}/scenarios/`

**Example:** `GET /api/business-ideas/5/scenarios/`

**Response:**
```json
{
    "business_idea": {
        "id": 5,
        "name": "Coffee Shop",
        // ... full business idea object
    },
    "scenarios": [
        {
            "name": "Optimistic",
            "revenue": 2340000.0,
            "expenses": 864000.0,
            "profit": 1476000.0,
            "roi": 295.2,
            "description": "Best case with increased sales and reduced costs"
        },
        {
            "name": "Realistic",
            "revenue": 1800000.0,
            "expenses": 960000.0,
            "profit": 840000.0,
            "roi": 168.0,
            "description": "Expected performance based on current projections"
        },
        {
            "name": "Pessimistic",
            "revenue": 1260000.0,
            "expenses": 1152000.0,
            "profit": 108000.0,
            "roi": 21.6,
            "description": "Challenging market conditions with lower sales"
        }
    ]
}
```

---

### 8. Get Simulation History

Get all simulations for a specific business idea.

**Endpoint:** `GET /api/business-ideas/{id}/history/`

**Example:** `GET /api/business-ideas/5/history/`

**Response:**
```json
[
    {
        "id": 1,
        "business_idea": 5,
        "scenario_name": "Best Case Scenario",
        "scenario_description": "Simulation for Coffee Shop",
        "projected_revenue": "1800000.00",
        "projected_expenses": "960000.00",
        "projected_profit": "840000.00",
        "projected_roi": "168.00",
        "risk_assessment": "Risk Level: medium",
        "recommendations": "Focus on customer retention...",
        "created_at": "2026-03-11T14:05:00.000000+06:00"
    }
]
```

---

### 9. List All Simulations

Get all simulation records.

**Endpoint:** `GET /api/simulations/`

**Response:** Array of simulation objects (same format as simulation history)

---

## Chatbot APIs

### 1. Start New Conversation

Create a new chat conversation session.

**Endpoint:** `POST /api/chat/new/`

**Request Body:** None required

**Response:**
```json
{
    "session_id": "462c591e-1610-47a5-a1f6-4d6207aebba3",
    "message": "New conversation started"
}
```

**Note:** Store the `session_id` on the client side to continue the conversation.

---

### 2. Send Chat Message

Send a message and receive an AI response.

**Endpoint:** `POST /api/chat/`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "message": "How do I price my products?",
    "session_id": "462c591e-1610-47a5-a1f6-4d6207aebba3"
}
```

**Required Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `message` | string | User's message |

**Optional Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `session_id` | string | Existing session ID. If not provided, a new session is created. |

**Response:**
```json
{
    "session_id": "462c591e-1610-47a5-a1f6-4d6207aebba3",
    "message": "Great question! Here are some key pricing strategies:\n\n**1. Cost-Plus Pricing**\nCalculate all your costs and add a profit margin. For example:\n- Product cost: 100 BDT\n- Add 50% margin: 150 BDT selling price\n\n**2. Value-Based Pricing**\nPrice based on the value your product provides to customers.\n\n**3. Competitive Pricing**\nResearch what competitors charge and position accordingly.\n\n**Tips:**\n- Always cover your costs first\n- Consider your target market's budget\n- Test different prices and adjust"
}
```

**Error Response (No message):**
```json
{
    "error": "Message is required"
}
```
**HTTP Status:** 400

---

### 3. Get Conversation History

Retrieve the history of a conversation.

**Endpoint:** `GET /api/chat/history/{session_id}/`

**Example:** `GET /api/chat/history/462c591e-1610-47a5-a1f6-4d6207aebba3/`

**Response:**
```json
{
    "session_id": "462c591e-1610-47a5-a1f6-4d6207aebba3",
    "messages": [
        {
            "role": "user",
            "content": "How do I price my products?",
            "created_at": "2026-03-11T08:03:41.785357Z"
        },
        {
            "role": "assistant",
            "content": "Great question! Here are some key pricing strategies...",
            "created_at": "2026-03-11T08:03:42.061062Z"
        }
    ]
}
```

**Error Response (Session not found):**
```json
{
    "error": "Conversation not found"
}
```
**HTTP Status:** 404

---

## Error Handling

### Common Error Responses

**404 Not Found:**
```json
{
    "detail": "Not found."
}
```

**400 Bad Request:**
```json
{
    "error": "Message is required"
}
```
or
```json
{
    "field_name": ["This field is required."]
}
```

**401 Unauthorized:**
```json
{
    "error": "Authentication required"
}
```

**500 Internal Server Error:**
```json
{
    "detail": "Internal server error"
}
```

### AI Service Errors

When Gemini AI quota is exceeded or unavailable, the API still works but returns fallback values:

**Business Idea Analysis:**
```json
{
    "feasibility_score": 50,
    "risk_level": "medium",
    "ai_feedback": "Unable to analyze at this time. Error: ..."
}
```

**Chat Response:**
```json
{
    "message": "I'm sorry, I encountered an error. Please try again. Error: ..."
}
```

**Scenarios:**
```json
{
    "scenarios": [
        {"name": "Optimistic", "revenue": 0, "expenses": 0, "profit": 0, "roi": 0, "description": "Error generating scenario"},
        {"name": "Realistic", "revenue": 0, "expenses": 0, "profit": 0, "roi": 0, "description": "Error generating scenario"},
        {"name": "Pessimistic", "revenue": 0, "expenses": 0, "profit": 0, "roi": 0, "description": "Error generating scenario"}
    ]
}
```

---

## Important Notes for Frontend Developer

### 1. Base URL Configuration
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

### 2. Making Requests

```javascript
// Example: Fetch all lessons
const fetchLessons = async () => {
    const response = await fetch(`${API_BASE_URL}/lessons/`);
    const data = await response.json();
    return data;
};

// Example: Create business idea
const createBusinessIdea = async (ideaData) => {
    const response = await fetch(`${API_BASE_URL}/business-ideas/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ideaData),
    });
    const data = await response.json();
    return data;
};
```

### 3. Handling Markdown Content

Lesson content is in Markdown format. Use a library like `react-markdown` to render it:

```bash
npm install react-markdown
```

```jsx
import ReactMarkdown from 'react-markdown';

function LessonContent({ content }) {
    return <ReactMarkdown>{content}</ReactMarkdown>;
}
```

### 4. Chat Session Management

Store the session ID in state or localStorage:

```javascript
// Start new conversation
const startChat = async () => {
    const response = await fetch(`${API_BASE_URL}/chat/new/`, {
        method: 'POST',
    });
    const data = await response.json();
    localStorage.setItem('chatSessionId', data.session_id);
    return data.session_id;
};

// Send message
const sendMessage = async (message) => {
    const sessionId = localStorage.getItem('chatSessionId') || await startChat();
    const response = await fetch(`${API_BASE_URL}/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, session_id: sessionId }),
    });
    return response.json();
};
```

### 5. Currency Formatting

All monetary values are in BDT (Bangladeshi Taka):

```javascript
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        minimumFractionDigits: 0,
    }).format(amount);
};

// Usage: formatCurrency(500000) → "BDT 5,00,000"
```

### 6. AI Response Handling

Handle AI errors gracefully in the UI:

```javascript
const isAIError = (feedback) => {
    return feedback && feedback.includes('Unable to analyze');
};

// Display fallback UI when AI is unavailable
if (isAIError(businessIdea.ai_feedback)) {
    // Show "AI analysis temporarily unavailable" message
}
```

### 7. Time Zone

All timestamps are in `Asia/Dhaka` timezone (UTC+6).

### 8. Decimal Fields

All monetary fields are returned as strings with 2 decimal places. Parse them as floats when doing calculations:

```javascript
const monthlyProfit = parseFloat(idea.monthly_profit);
```

### 9. Category Icons

Map category icons to your icon library:

```javascript
const iconMap = {
    'store': '🏪',        // or Icon component
    'restaurant': '🍽️',
    'computer': '💻',
    'leaf': '🌿',
    'briefcase': '💼',
    'factory': '🏭',
    'school': '🎓',
    'medical': '🏥',
    'shirt': '👕',
    'cart': '🛒',
};
```

### 10. Recommended Axios Configuration

```javascript
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
```

---

## Testing Summary

| Test | Result |
|------|--------|
| Health Check | ✅ Pass |
| Categories List | ✅ Pass |
| Single Category | ✅ Pass |
| Lessons List | ✅ Pass |
| Single Lesson | ✅ Pass |
| Business Ideas CRUD | ✅ Pass |
| Business Idea Simulation | ✅ Pass |
| Scenarios Generation | ✅ Pass |
| Simulation History | ✅ Pass |
| New Conversation | ✅ Pass |
| Send Chat Message | ✅ Pass |
| Conversation History | ✅ Pass |
| Error Handling (404) | ✅ Pass |
| Error Handling (400) | ✅ Pass |
| CORS Headers | ✅ Configured |

---

## Contact

For any questions or issues with the API, contact the backend development team.

---

*Documentation generated on March 11, 2026*
