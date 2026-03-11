# InvestSmart API - Postman Testing Guide

**Base URL:** `http://localhost:8000/api`  
**Date:** March 11, 2026

---

## 📥 Quick Setup in Postman

### Step 1: Create Environment Variables

1. Click **Environments** (left sidebar) → **Create Environment**
2. Name it: `InvestSmart Local`
3. Add these variables:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `base_url` | `http://localhost:8000/api` | `http://localhost:8000/api` |
| `session_id` | (leave empty) | (leave empty) |
| `business_id` | (leave empty) | (leave empty) |

4. Click **Save** and select this environment from the dropdown (top-right)

---

## 🔥 API Endpoints - Postman Configuration

---

## 1️⃣ HEALTH CHECK

### Check API Status

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/health/` |
| **Headers** | None required |
| **Body** | None |

**Expected Response (200 OK):**
```json
{
    "status": "healthy",
    "message": "InvestSmart API is running",
    "version": "1.0.0"
}
```

---

## 2️⃣ CATEGORIES

### Get All Categories

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/categories/` |
| **Headers** | None required |
| **Body** | None |

### Get Single Category

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/categories/1/` |
| **Headers** | None required |
| **Body** | None |

---

## 3️⃣ LESSONS

### Get All Lessons

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/lessons/` |
| **Headers** | None required |
| **Body** | None |

### Get Single Lesson

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/lessons/introduction-to-entrepreneurship/` |
| **Headers** | None required |
| **Body** | None |

### Mark Lesson Complete

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `{{base_url}}/lessons/introduction-to-entrepreneurship/complete/` |
| **Headers** | `Content-Type: application/json` |
| **Body** | None |

---

## 4️⃣ CHATBOT APIs

### 4.1 Start New Conversation

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `{{base_url}}/chat/new/` |
| **Headers** | `Content-Type: application/json` |
| **Body** | None (leave empty) |

**Postman Setup:**
1. Select `POST` method
2. Enter URL: `{{base_url}}/chat/new/`
3. Go to **Headers** tab, add:
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body** tab: Select `none`
5. Click **Send**

**Expected Response (200 OK):**
```json
{
    "session_id": "462c591e-1610-47a5-a1f6-4d6207aebba3",
    "message": "New conversation started"
}
```

**💡 Auto-save session_id:** Add this to **Tests** tab:
```javascript
var jsonData = pm.response.json();
pm.environment.set("session_id", jsonData.session_id);
```

---

### 4.2 Send Chat Message

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `{{base_url}}/chat/` |
| **Headers** | `Content-Type: application/json` |
| **Body** | raw (JSON) |

**Postman Setup:**
1. Select `POST` method
2. Enter URL: `{{base_url}}/chat/`
3. Go to **Headers** tab, add:
   - Key: `Content-Type`
   - Value: `application/json`
4. Go to **Body** tab:
   - Select `raw`
   - Select `JSON` from dropdown
   - Enter the JSON body below

**Body (raw JSON):**
```json
{
    "message": "How do I start a small business in Bangladesh?",
    "session_id": "{{session_id}}"
}
```

**Expected Response (200 OK):**
```json
{
    "session_id": "462c591e-1610-47a5-a1f6-4d6207aebba3",
    "message": "Starting a small business in Bangladesh involves several key steps..."
}
```

**Error Response (400 Bad Request) - Missing message:**
```json
{
    "error": "Message is required"
}
```

---

### 4.3 Get Conversation History

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/chat/history/{{session_id}}/` |
| **Headers** | None required |
| **Body** | None |

**Expected Response (200 OK):**
```json
{
    "session_id": "462c591e-1610-47a5-a1f6-4d6207aebba3",
    "messages": [
        {
            "role": "user",
            "content": "How do I start a small business?",
            "created_at": "2026-03-11T08:03:41.785357Z"
        },
        {
            "role": "assistant",
            "content": "Starting a small business involves...",
            "created_at": "2026-03-11T08:03:42.061062Z"
        }
    ]
}
```

---

## 5️⃣ BUSINESS IDEAS APIs

### 5.1 Get All Business Ideas

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/business-ideas/` |
| **Headers** | None required |
| **Body** | None |

---

### 5.2 Create Business Idea ⭐ (IMPORTANT)

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `{{base_url}}/business-ideas/` |
| **Headers** | `Content-Type: application/json` |
| **Body** | raw (JSON) |

**Postman Setup:**
1. Select `POST` method
2. Enter URL: `{{base_url}}/business-ideas/`
3. Go to **Headers** tab, add:
   - Key: `Content-Type`
   - Value: `application/json`
4. Go to **Body** tab:
   - Select `raw`
   - Select `JSON` from dropdown
   - Enter the JSON body below

**Body (raw JSON) - Full Example:**
```json
{
    "name": "Dhaka Coffee House",
    "description": "A modern coffee shop in Gulshan area targeting young professionals and students. Will serve premium coffee, pastries, and light snacks with free WiFi.",
    "initial_investment": 500000,
    "monthly_revenue": 150000,
    "monthly_expenses": 80000,
    "category_id": 2
}
```

**Body (raw JSON) - Minimal Example:**
```json
{
    "name": "Tea Stall",
    "description": "Small tea stall near office area",
    "initial_investment": 50000,
    "monthly_revenue": 30000,
    "monthly_expenses": 15000
}
```

**Required Fields:**

| Field | Type | Example | Description |
|-------|------|---------|-------------|
| `name` | string | "Dhaka Coffee House" | Business name |
| `description` | string | "A modern coffee shop..." | Business description |
| `initial_investment` | number | 500000 | Initial investment in BDT |
| `monthly_revenue` | number | 150000 | Expected monthly revenue |
| `monthly_expenses` | number | 80000 | Expected monthly expenses |

**Optional Fields:**

| Field | Type | Example | Description |
|-------|------|---------|-------------|
| `category_id` | number | 2 | Category ID (1-10) |

**Category IDs:**
- 1 = Retail
- 2 = Food & Beverage
- 3 = Technology
- 4 = Agriculture
- 5 = Services
- 6 = Manufacturing
- 7 = Education
- 8 = Healthcare
- 9 = Fashion
- 10 = E-commerce

**Expected Response (201 Created):**
```json
{
    "id": 5,
    "name": "Dhaka Coffee House",
    "description": "A modern coffee shop in Gulshan area...",
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
    "feasibility_score": 72,
    "ai_feedback": "**Analysis:**\n\nStrengths:\n- Good profit margin...",
    "created_at": "2026-03-11T14:10:00.000000+06:00",
    "updated_at": "2026-03-11T14:10:00.000000+06:00"
}
```

**💡 Auto-save business_id:** Add this to **Tests** tab:
```javascript
var jsonData = pm.response.json();
pm.environment.set("business_id", jsonData.id);
```

**Error Response (400 Bad Request):**
```json
{
    "name": ["This field is required."],
    "description": ["This field is required."],
    "initial_investment": ["This field is required."]
}
```

---

### 5.3 Get Single Business Idea

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/business-ideas/{{business_id}}/` |
| **Headers** | None required |
| **Body** | None |

---

### 5.4 Update Business Idea (PUT - Full Update)

| Field | Value |
|-------|-------|
| **Method** | `PUT` |
| **URL** | `{{base_url}}/business-ideas/{{business_id}}/` |
| **Headers** | `Content-Type: application/json` |
| **Body** | raw (JSON) |

**Body (raw JSON):**
```json
{
    "name": "Dhaka Coffee House Premium",
    "description": "An upgraded premium coffee shop with expanded menu",
    "initial_investment": 600000,
    "monthly_revenue": 200000,
    "monthly_expenses": 100000,
    "category_id": 2
}
```

---

### 5.5 Update Business Idea (PATCH - Partial Update)

| Field | Value |
|-------|-------|
| **Method** | `PATCH` |
| **URL** | `{{base_url}}/business-ideas/{{business_id}}/` |
| **Headers** | `Content-Type: application/json` |
| **Body** | raw (JSON) |

**Body (raw JSON):**
```json
{
    "monthly_revenue": 180000
}
```

---

### 5.6 Delete Business Idea

| Field | Value |
|-------|-------|
| **Method** | `DELETE` |
| **URL** | `{{base_url}}/business-ideas/{{business_id}}/` |
| **Headers** | None required |
| **Body** | None |

**Expected Response:** 
- Status: `204 No Content`
- Body: Empty

---

### 5.7 Run Simulation ⭐

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `{{base_url}}/business-ideas/{{business_id}}/simulate/` |
| **Headers** | `Content-Type: application/json` |
| **Body** | raw (JSON) |

**Postman Setup:**
1. Select `POST` method
2. Enter URL: `{{base_url}}/business-ideas/{{business_id}}/simulate/`
3. Go to **Headers** tab, add:
   - Key: `Content-Type`
   - Value: `application/json`
4. Go to **Body** tab:
   - Select `raw`
   - Select `JSON` from dropdown

**Body (raw JSON):**
```json
{
    "scenario_name": "Best Case Scenario"
}
```

**Or with empty body (uses default name):**
```json
{}
```

**Expected Response (200 OK):**
```json
{
    "id": 1,
    "business_idea": 5,
    "scenario_name": "Best Case Scenario",
    "scenario_description": "Simulation for Dhaka Coffee House",
    "projected_revenue": "1800000.00",
    "projected_expenses": "960000.00",
    "projected_profit": "840000.00",
    "projected_roi": "168.00",
    "risk_assessment": "Risk Level: medium",
    "recommendations": "Focus on customer retention...",
    "created_at": "2026-03-11T14:15:00.000000+06:00"
}
```

---

### 5.8 Get AI Scenarios

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/business-ideas/{{business_id}}/scenarios/` |
| **Headers** | None required |
| **Body** | None |

**Expected Response (200 OK):**
```json
{
    "business_idea": {
        "id": 5,
        "name": "Dhaka Coffee House",
        "..."
    },
    "scenarios": [
        {
            "name": "Optimistic",
            "revenue": 2340000.0,
            "expenses": 864000.0,
            "profit": 1476000.0,
            "roi": 295.2,
            "description": "Best case scenario"
        },
        {
            "name": "Realistic",
            "revenue": 1800000.0,
            "expenses": 960000.0,
            "profit": 840000.0,
            "roi": 168.0,
            "description": "Expected performance"
        },
        {
            "name": "Pessimistic",
            "revenue": 1260000.0,
            "expenses": 1152000.0,
            "profit": 108000.0,
            "roi": 21.6,
            "description": "Worst case scenario"
        }
    ]
}
```

---

### 5.9 Get Simulation History

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/business-ideas/{{business_id}}/history/` |
| **Headers** | None required |
| **Body** | None |

---

### 5.10 Get All Simulations

| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `{{base_url}}/simulations/` |
| **Headers** | None required |
| **Body** | None |

---

## 📋 Postman Collection JSON (Import This!)

Save the following as `InvestSmart_API.postman_collection.json` and import into Postman:

```json
{
    "info": {
        "name": "InvestSmart API",
        "description": "Complete API collection for InvestSmart backend",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "variable": [
        {
            "key": "base_url",
            "value": "http://localhost:8000/api"
        }
    ],
    "item": [
        {
            "name": "Core",
            "item": [
                {
                    "name": "Health Check",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/health/"
                    }
                },
                {
                    "name": "Get All Categories",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/categories/"
                    }
                },
                {
                    "name": "Get Single Category",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/categories/1/"
                    }
                }
            ]
        },
        {
            "name": "Learning",
            "item": [
                {
                    "name": "Get All Lessons",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/lessons/"
                    }
                },
                {
                    "name": "Get Single Lesson",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/lessons/introduction-to-entrepreneurship/"
                    }
                },
                {
                    "name": "Mark Lesson Complete",
                    "request": {
                        "method": "POST",
                        "url": "{{base_url}}/lessons/introduction-to-entrepreneurship/complete/",
                        "header": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ]
                    }
                }
            ]
        },
        {
            "name": "Chatbot",
            "item": [
                {
                    "name": "Start New Conversation",
                    "request": {
                        "method": "POST",
                        "url": "{{base_url}}/chat/new/",
                        "header": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ]
                    },
                    "event": [
                        {
                            "listen": "test",
                            "script": {
                                "exec": [
                                    "var jsonData = pm.response.json();",
                                    "pm.environment.set('session_id', jsonData.session_id);"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "Send Chat Message",
                    "request": {
                        "method": "POST",
                        "url": "{{base_url}}/chat/",
                        "header": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"message\": \"How do I start a business?\",\n    \"session_id\": \"{{session_id}}\"\n}"
                        }
                    }
                },
                {
                    "name": "Get Conversation History",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/chat/history/{{session_id}}/"
                    }
                }
            ]
        },
        {
            "name": "Business Ideas",
            "item": [
                {
                    "name": "Get All Business Ideas",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/business-ideas/"
                    }
                },
                {
                    "name": "Create Business Idea",
                    "request": {
                        "method": "POST",
                        "url": "{{base_url}}/business-ideas/",
                        "header": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"name\": \"Dhaka Coffee House\",\n    \"description\": \"A modern coffee shop in Gulshan area targeting young professionals\",\n    \"initial_investment\": 500000,\n    \"monthly_revenue\": 150000,\n    \"monthly_expenses\": 80000,\n    \"category_id\": 2\n}"
                        }
                    },
                    "event": [
                        {
                            "listen": "test",
                            "script": {
                                "exec": [
                                    "var jsonData = pm.response.json();",
                                    "pm.environment.set('business_id', jsonData.id);"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "Get Single Business Idea",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/business-ideas/{{business_id}}/"
                    }
                },
                {
                    "name": "Update Business Idea (PUT)",
                    "request": {
                        "method": "PUT",
                        "url": "{{base_url}}/business-ideas/{{business_id}}/",
                        "header": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"name\": \"Updated Coffee House\",\n    \"description\": \"Updated description\",\n    \"initial_investment\": 600000,\n    \"monthly_revenue\": 200000,\n    \"monthly_expenses\": 100000\n}"
                        }
                    }
                },
                {
                    "name": "Update Business Idea (PATCH)",
                    "request": {
                        "method": "PATCH",
                        "url": "{{base_url}}/business-ideas/{{business_id}}/",
                        "header": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"monthly_revenue\": 180000\n}"
                        }
                    }
                },
                {
                    "name": "Delete Business Idea",
                    "request": {
                        "method": "DELETE",
                        "url": "{{base_url}}/business-ideas/{{business_id}}/"
                    }
                },
                {
                    "name": "Run Simulation",
                    "request": {
                        "method": "POST",
                        "url": "{{base_url}}/business-ideas/{{business_id}}/simulate/",
                        "header": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"scenario_name\": \"Best Case Scenario\"\n}"
                        }
                    }
                },
                {
                    "name": "Get AI Scenarios",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/business-ideas/{{business_id}}/scenarios/"
                    }
                },
                {
                    "name": "Get Simulation History",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/business-ideas/{{business_id}}/history/"
                    }
                }
            ]
        },
        {
            "name": "Simulations",
            "item": [
                {
                    "name": "Get All Simulations",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/simulations/"
                    }
                }
            ]
        }
    ]
}
```

---

## 🚀 How to Import Collection

### Method 1: Import JSON File
1. Save the JSON above as `InvestSmart_API.postman_collection.json`
2. Open Postman
3. Click **Import** (top left)
4. Drag the file or click **Upload Files**
5. Click **Import**

### Method 2: Import Raw Text
1. Copy the JSON above
2. Open Postman
3. Click **Import** → **Raw text**
4. Paste the JSON
5. Click **Continue** → **Import**

---

## 📝 Testing Workflow

### Step 1: Test Health Check
```
GET {{base_url}}/health/
```
✅ Should return: `{"status": "healthy", ...}`

### Step 2: Create New Conversation
```
POST {{base_url}}/chat/new/
```
✅ Saves `session_id` automatically

### Step 3: Send Chat Message
```
POST {{base_url}}/chat/
Body: {"message": "Hello!", "session_id": "{{session_id}}"}
```
✅ Should return AI response

### Step 4: Create Business Idea
```
POST {{base_url}}/business-ideas/
Body: {full business data}
```
✅ Saves `business_id` automatically

### Step 5: Run Simulation
```
POST {{base_url}}/business-ideas/{{business_id}}/simulate/
Body: {"scenario_name": "Test"}
```
✅ Should return simulation results

### Step 6: Get Scenarios
```
GET {{base_url}}/business-ideas/{{business_id}}/scenarios/
```
✅ Should return 3 scenarios

---

## ⚠️ Common Issues

### Issue 1: "Could not get response"
**Solution:** Make sure Django server is running on port 8000
```bash
cd backend
python manage.py runserver
```

### Issue 2: 400 Bad Request
**Solution:** Check that:
- Body is set to `raw` and `JSON`
- All required fields are present
- JSON syntax is correct

### Issue 3: 404 Not Found
**Solution:** Check that:
- `{{business_id}}` or `{{session_id}}` has a value
- The ID exists in the database

### Issue 4: AI Feedback shows error
**Reason:** Gemini API quota exceeded
**Note:** This is normal - the API still works, just without AI analysis

---

## 📱 Screenshots Guide

### Setting Up Headers:
```
Headers Tab:
┌─────────────────┬─────────────────────┐
│ Key             │ Value               │
├─────────────────┼─────────────────────┤
│ Content-Type    │ application/json    │
└─────────────────┴─────────────────────┘
```

### Setting Up Body:
```
Body Tab:
○ none
○ form-data
○ x-www-form-urlencoded
● raw  [JSON ▼]

{
    "name": "Coffee Shop",
    "description": "My business",
    "initial_investment": 500000,
    "monthly_revenue": 150000,
    "monthly_expenses": 80000
}
```

---

*Guide created: March 11, 2026*
