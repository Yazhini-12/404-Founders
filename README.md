# AI-Powered Talent Discovery & Internal Career Mobility

> Turning employee experience into a living skill profile and connecting people to their next opportunity.

An AI-powered talent intelligence platform that helps organizations discover hidden and transferable employee skills, match employees with internal opportunities, identify skill gaps, and generate personalized career growth paths.

Instead of relying only on resumes and job titles, the platform analyzes authorized employee activities, project experience, work history, and learning activities to continuously build an evidence-based Skill Passport.

---

## Problem

Organizations often struggle to understand the skills they already have internally.

Traditional talent systems mainly depend on:

* Resumes
* Job titles
* Static skill declarations
* Manual HR assessments

This creates a gap between what an employee's profile says and what they can actually do.

As a result:

* Hidden skills remain undiscovered
* Employees may miss internal opportunities
* HR teams spend time manually searching for talent
* Skill gaps are difficult to identify
* Career development becomes generic rather than personalized

---

## Our Solution

We build a living employee capability profile from authorized organizational data.

```text
Employee Activities
        |
        v
AI Skill Extraction
        |
        v
Skills + Evidence + Confidence
        |
        v
Living Skill Passport
        |
        v
Internal Role Matching
        |
        v
Skill Gap Analysis
        |
        v
Learning Recommendations
        |
        v
Personalized Career Roadmap
```

### Core Principle

> Evidence > Claims

Every extracted skill is connected to evidence from the employee's activity.

Example:

```text
Activity:
"Built a payment microservice using Spring Boot and Kafka,
containerized it with Docker and deployed it on AWS."

                |
                v

Detected Skills:

Spring Boot      -> Demonstrated -> 100%
Kafka            -> Demonstrated -> 100%
Docker           -> Demonstrated -> 100%
AWS              -> Demonstrated -> 100%
Microservices    -> Demonstrated -> 100%
Java             -> Inferred     -> 95%
Cloud Computing  -> Inferred     -> 90%
```

---

## Key Features

### 1. Dynamic Skill Passport

Creates an evolving employee capability profile containing:

* Explicit skills
* Demonstrated skills
* Inferred skills
* Transferable skills
* Project experience
* Learning history
* Work experience

The profile can evolve as new employee activities and learning experiences are added.

### 2. AI-Powered Skill Extraction

Our AI engine analyzes employee activities using Gemini 3.6 Flash.

It extracts:

* Skill name
* Confidence score
* Evidence
* Skill status

Supported statuses include:

```text
Demonstrated
Inferred
Transferable
```

A controlled skill taxonomy prevents the model from generating arbitrary or unsupported skills.

### 3. Explainable Internal Role Matching

Employees can be matched with internal roles using a transparent scoring model.

| Factor                      | Weight |
| --------------------------- | -----: |
| Skill Match                 |    60% |
| Experience Match            |    15% |
| Career Interest Alignment   |    15% |
| Learning Activity Alignment |    10% |

The system provides an explainable score rather than a black-box recommendation.

### 4. Skill Gap Analysis

For a selected target role, the system categorizes required skills into:

```text
Matched
Needs Improvement
Missing
```

This helps employees understand exactly what they need to improve before moving into a target role.

### 5. Learning Recommendations

The platform connects identified skill gaps with relevant learning resources.

Example:

```text
Target Role:
Machine Learning Engineer

Skill Gap:
TensorFlow

        |
        v

Recommended Learning:
Deep Learning with TensorFlow
```

### 6. Personalized Career Roadmap

The system generates a structured career path:

```text
Current Role
     |
     v
Skill Targets
     |
     v
Learning
     |
     v
Practical Project
     |
     v
Target Role
```

### 7. HR Workforce Intelligence

HR teams can access organizational-level insights including:

* Workforce skill distribution
* Skill proficiency
* Organization-wide skill gaps
* Emerging skills
* Internal talent discovery
* Candidate matching for open roles
* Department-level talent information

### 8. AI Career Assistant

The architecture includes a modular AI Career Assistant interface designed to support personalized career questions using employee, role, and learning context.

Example questions:

> What skills do I currently have?

> What skills am I missing for a Data Engineer role?

> What should I learn next?

> Which internal roles match my current capabilities?

---

## System Architecture

```text
                         +-------------------------+
                         |     React Frontend      |
                         |     Vite + JavaScript   |
                         +------------+------------+
                                      |
                                  REST / JSON
                                      |
                                      v
              +-----------------------------------------+
              |             FastAPI Backend              |
              |                                         |
              |  Employees | HR | Roles | Learning | AI |
              +---------------+-------------------------+
                              |
              +---------------+----------------+
              |                                |
              v                                v
   +---------------------+          +---------------------+
   | Supabase PostgreSQL |          |    AI Engine        |
   |                     |          |                     |
   | Employees           |          | Gemini 3.6 Flash    |
   | Skills              |          | Skill Extraction    |
   | Roles               |          | Evidence            |
   | Projects            |          | Confidence          |
   | Learning            |          | Classification      |
   +---------------------+          +---------------------+
              |                                |
              +----------------+---------------+
                               |
                               v
                  +------------------------+
                  | Living Skill Passport  |
                  +-----------+------------+
                              |
                              v
                  Role Matching & Skill Gaps
                              |
                              v
                   Learning & Career Roadmap
```

---

## AI Engine Flow

The core AI pipeline is:

```text
Employee Activity
       |
       v
Gemini 3.6 Flash
       |
       v
Skill Extraction
       |
       v
Controlled Taxonomy Validation
       |
       v
Evidence Validation
       |
       v
Confidence Classification
       |
       v
Structured Skill Output
```

### Example API

`POST /ai/extract-skills`

Request:

```json
{
  "employee_id": "emp001",
  "activity": "Built a payment microservice using Spring Boot and Kafka, containerized it with Docker and deployed it on AWS."
}
```

Response:

```json
{
  "employee_id": "emp001",
  "skills": [
    {
      "name": "Spring Boot",
      "confidence": 100,
      "status": "demonstrated",
      "evidence": "Built a payment microservice using Spring Boot"
    },
    {
      "name": "Kafka",
      "confidence": 100,
      "status": "demonstrated",
      "evidence": "using Spring Boot and Kafka"
    },
    {
      "name": "Docker",
      "confidence": 100,
      "status": "demonstrated",
      "evidence": "containerized it with Docker"
    }
  ]
}
```

---

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Python
* FastAPI
* Pydantic
* REST APIs

### AI

* Google Gemini 3.6 Flash
* Google GenAI SDK
* LLM-based skill extraction
* Evidence-based classification
* Confidence scoring

### Database

* Supabase
* PostgreSQL

### Data

* Synthetic employee dataset
* JSON
* CSV

### Development

* Git
* GitHub
* Uvicorn

---

## Project Structure

```text
404-Founders/
|
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
|
├── backend/
│   └── app/
│       ├── main.py
│       ├── config.py
│       ├── database.py
│       |
│       ├── routes/
│       │   ├── employees.py
│       │   ├── hr.py
│       │   ├── roles.py
│       │   ├── learning.py
│       │   └── ai.py
│       |
│       ├── services/
│       │   ├── employee_service.py
│       │   ├── role_service.py
│       │   ├── matching_service.py
│       │   ├── skill_gap_service.py
│       │   ├── roadmap_service.py
│       │   ├── analytics_service.py
│       │   └── skill_extractor.py
│       |
│       └── schemas/
│           ├── employee.py
│           ├── role.py
│           └── matching.py
|
├── dataset/
│   ├── generate_dataset.py
│   ├── seed_supabase.py
│   └── data/
|
├── sql/
│   └── schema.sql
|
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Yazhini-12/404-Founders.git
cd 404-Founders
```

### 2. Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

Windows:

```bash
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file based on `.env.example`.

```env
GEMINI_API_KEY=your_gemini_api_key

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

PORT=8000
HOST=0.0.0.0

CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Security

The Gemini API key is stored only on the backend.

The frontend never receives or exposes the Gemini API key.

---

## Running the Application

The application requires two terminals.

### Terminal 1 — Backend

From the project root:

```bash
uvicorn backend.app.main:app --reload --port 8000
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

ReDoc:

```text
http://localhost:8000/redoc
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Database Setup

The project supports Supabase PostgreSQL and a local JSON fallback.

### Create Database Schema

Open the Supabase SQL Editor and execute:

```text
sql/schema.sql
```

### Generate Synthetic Data

```bash
python dataset/generate_dataset.py
```

### Seed Supabase

```bash
python dataset/seed_supabase.py
```

---

## API Overview

### Employee APIs

```text
GET /employees
GET /employees/{employee_code}
GET /employees/{employee_code}/skills
GET /employees/{employee_code}/projects
GET /employees/{employee_code}/work-history
GET /employees/{employee_code}/learning
GET /employees/{employee_code}/skill-passport
GET /employees/{employee_code}/role-matches
```

### Skill Gap & Career APIs

```text
GET /employees/{employee_code}/skill-gap/{role_id}

GET /employees/{employee_code}/learning-recommendations/{role_id}

GET /employees/{employee_code}/career-roadmap/{role_id}
```

### HR APIs

```text
GET /hr/overview
GET /hr/employees
GET /hr/workforce-skills
GET /hr/skill-gaps
GET /hr/emerging-skills
GET /hr/roles/{role_id}/matches

GET /hr/talent-search
POST /hr/roles
```

### Role & Learning APIs

```text
GET /roles
GET /roles/departments
GET /roles/{id}

GET /learning/courses
```

### AI APIs

```text
POST /ai/extract-skills
POST /ai/match-role
POST /ai/skill-gap
POST /ai/career-roadmap
POST /ai/chat
```

---

## Hackathon Demo Flow

### Step 1 — Employee Profile

```text
Employee:
Arun Kumar

Current Role:
Backend Developer

Experience:
3 years
```

### Step 2 — Add Experience

```text
Built a payment microservice using Spring Boot and Kafka,
containerized it with Docker and deployed it on AWS.
```

### Step 3 — AI Analysis

The AI extracts:

```text
Spring Boot     -> Demonstrated
Kafka           -> Demonstrated
Docker          -> Demonstrated
AWS             -> Demonstrated
Microservices   -> Demonstrated
Java            -> Inferred
```

Each skill contains supporting evidence and confidence.

### Step 4 — Skill Passport

The new skills become part of the employee's evolving capability profile.

### Step 5 — Internal Opportunity

The system compares the employee's profile against internal roles.

### Step 6 — Skill Gap

For the selected target role:

```text
Matched
Needs Improvement
Missing
```

### Step 7 — Learning

The platform recommends learning resources for missing skills.

### Step 8 — Career Roadmap

The employee receives a structured path toward the target role.

---

## HR Use Case

HR can move from:

```text
"Who has this skill?"
```

to:

```text
"Which employees have evidence of this capability,
what roles could they move into,
and what skills would they need next?"
```

This enables internal talent discovery and mobility without relying exclusively on static resumes.

---

## Privacy & Responsible AI

The platform is designed around authorized organizational data.

It does not require:

* Keylogging
* Webcam monitoring
* Private browsing surveillance
* Screen recording
* Personal device surveillance

The system focuses on employee-provided and authorized organizational information such as:

* Project contributions
* Work experience
* Learning activities
* Organizational role information

AI-generated skills are separated into demonstrated and inferred categories so that inference is not presented as direct evidence.

---

## What Makes It Different?

### Traditional Resume Matching

```text
Resume
   |
   v
Declared Skills
   |
   v
Job Match
```

### Our Approach

```text
Employee Activity
       |
       v
Actual Evidence
       |
       v
AI Skill Understanding
       |
       v
Living Skill Passport
       |
       v
Role Discovery
       |
       v
Skill Gap
       |
       v
Learning
       |
       v
Career Growth
```

> A resume is a snapshot. Our platform builds a living picture of employee capabilities.

---

## Future Enhancements

The architecture is designed to support:

* Embedding-based semantic role matching
* RAG-powered career assistant
* Continuous skill profile updates
* Advanced transferable-skill discovery
* Personalized learning paths
* Organization-wide talent graphs
* Skill trend forecasting
* Advanced workforce planning
* Semantic search

---

## Repository

GitHub:

https://github.com/Yazhini-12/404-Founders

---

## Team

404 Founders

### Project

AI-Powered Talent Discovery & Internal Career Mobility
