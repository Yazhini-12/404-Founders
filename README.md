# AI-Powered Talent Discovery and Internal Career Mobility Platform

An end-to-end backend system built with **FastAPI**, **Supabase PostgreSQL**, and **Synthetic Datasets** for NovaTech Solutions. Designed for hackathons and talent mobility applications, featuring explainable role matching, skill gap analysis, career roadmap generation, HR workforce analytics, and modular AI interface endpoints.

---

## 🏗 Architecture & Overview

```
                        ┌──────────────────────────────┐
                        │      React Frontend          │
                        │    (http://localhost:5173)   │
                        └──────────────┬───────────────┘
                                       │ REST / JSON
                                       ▼
 ┌───────────────────────────────────────────────────────────────────────────┐
 │                            FastAPI Backend                                │
 ├──────────────┬──────────────┬──────────────┬──────────────┬───────────────┤
 │  /employees  │     /hr      │    /roles    │  /learning   │     /ai       │
 └──────┬───────┴──────┬───────┴──────┬───────┴──────┬───────┴───────┬───────┘
        │              │              │              │               │
        └──────────────┴──────────────┼──────────────┴───────────────┘
                                      ▼
                        ┌──────────────────────────────┐
                        │ Database & Fallback Layer    │
                        │  (Supabase PostgreSQL / JSON)│
                        └──────────────────────────────┘
```

### Key Features
1. **Dynamic Skill Passport**: Consolidates explicit, inferred, and transferable skills along with project contributions, learning history, and past work experience.
2. **Explainable Role Matching Engine**: Calculates transparent 0-100 scores based on:
   - Skill Match (60%)
   - Experience Match (15%)
   - Career Interest Alignment (15%)
   - Learning Activity Alignment (10%)
3. **Skill Gap Engine**: Categorizes skills into `matched`, `needs_improvement`, or `missing` against target role requirements.
4. **Career Roadmap Generator**: Generates structured step-by-step career path nodes formatted for visual rendering in React.
5. **HR Workforce Analytics & Talent Search**: Offers workforce skill distributions, organizational skill deficit tracking, emerging skill trends, and candidate ranking.
6. **Modular AI Engine Interface**: Clean, production-ready placeholder endpoints for skill extraction, role matching, gap analysis, and RAG AI Career Assistant chat.

---

## 📁 Project Structure

```
talent ai/
├── frontend/                    # React + Vite application
│   ├── src/                     # Pages, layouts, components, services, and mock data
│   ├── public/                  # Static assets
│   ├── package.json             # Frontend dependencies and scripts
│   └── vite.config.js           # Vite configuration
├── backend/
│   └── app/
│       ├── main.py                  # FastAPI application entry point & CORS
│       ├── config.py                # Configuration and environment variables
│       ├── database.py              # Supabase client & local dataset fallback reader
│       ├── routes/                  # API Controllers
│       │   ├── employees.py         # Employee & Skill Passport endpoints
│       │   ├── hr.py                # HR Analytics & Talent Search endpoints
│       │   ├── roles.py             # Internal Roles & Departments endpoints
│       │   ├── learning.py          # Course Catalog endpoints
│       │   └── ai.py                # AI Engine Modular Interface & Chat endpoints
│       ├── services/                # Core Business Logic
│       │   ├── employee_service.py  # Passport compilation & details
│       │   ├── role_service.py      # Department & Role queries
│       │   ├── matching_service.py  # Explainable role matching engine
│       │   ├── skill_gap_service.py # Skill gap & course recommendation engine
│       │   ├── roadmap_service.py   # Visual career roadmap generator
│       │   └── analytics_service.py # HR metrics & talent search
│       └── schemas/                 # Pydantic Request & Response Data Models
│           ├── employee.py
│           ├── role.py
│           └── matching.py
├── dataset/
│   ├── generate_dataset.py          # Deterministic synthetic data generator (seed 42)
│   ├── seed_supabase.py             # Idempotent Supabase PostgreSQL seeder
│   └── data/                        # Generated JSON and CSV data files
├── sql/
│   └── schema.sql                   # Complete PostgreSQL schema for Supabase
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore configuration
├── requirements.txt                 # Python dependencies
└── README.md                        # Documentation
```

---

## 🚀 Getting Started

### 1. Installation

Clone or open the repository and create a virtual environment (optional but recommended):

```bash
# Create virtual environment
python -m venv venv

# Activate on Windows PowerShell
.\venv\Scripts\Activate.ps1

# Install required dependencies
pip install -r requirements.txt
```

### 2. Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_KEY=your-supabase-anon-or-service-key
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

> **Note:** If `SUPABASE_URL` is not set or set to default template, the backend automatically uses the built-in local JSON dataset provider so you can test the application end-to-end immediately!

### 3. Running the React Frontend

In a second terminal, install the frontend dependencies and start Vite:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`.

---

## 🗄 Database & Synthetic Data Generation

### 1. Running SQL Schema on Supabase
1. Open your Supabase Dashboard -> **SQL Editor**.
2. Paste the contents of `sql/schema.sql` and run the script.
3. This creates all 19 tables with UUID primary keys, foreign keys, and indexes.

### 2. Generating Synthetic Dataset
Run the reproducible synthetic dataset generator (`random.seed(42)`):

```bash
python dataset/generate_dataset.py
```

This populates `dataset/data/` with JSON and CSV files for 6 departments, 22 roles, 75 skills, 100 employees (including carefully configured demo employee `EMP001`), 20 courses, and 8 projects.

### 3. Seeding Data into Supabase
Seed the live Supabase database in strict dependency order:

```bash
python dataset/seed_supabase.py
```

---

## ⚡ Running the FastAPI Backend

Start the local server using `uvicorn`:

```bash
uvicorn backend.app.main:app --reload --port 8000
```

The backend server will run at: `http://localhost:8000`
- Interactive OpenAPI Docs: `http://localhost:8000/docs`
- ReDoc Documentation: `http://localhost:8000/redoc`

---

## 📡 API Endpoint Summary

### System Health
- `GET /health` - Health check status & database connection state

### Employee & Skill Passport
- `GET /employees` - List all synthetic employees
- `GET /employees/{employee_code}` - Get single employee details
- `GET /employees/{employee_code}/skills` - List explicit & inferred skills
- `GET /employees/{employee_code}/projects` - List project assignments & skills used
- `GET /employees/{employee_code}/work-history` - List past employment history
- `GET /employees/{employee_code}/learning` - List enrolled courses & progress
- `GET /employees/{employee_code}/skill-passport` - Complete aggregated Skill Passport
- `GET /employees/{employee_code}/role-matches` - Internal role matches ranked by match score
- `GET /employees/{employee_code}/skill-gap/{role_id}` - Skill gap breakdown (`matched`, `needs_improvement`, `missing`)
- `GET /employees/{employee_code}/learning-recommendations/{role_id}` - Course recommendations for target role
- `GET /employees/{employee_code}/career-roadmap/{role_id}` - Step-by-step career path roadmap

### HR Analytics & Management
- `GET /hr/overview` - HR executive dashboard metrics
- `GET /hr/employees` - Full employee catalog
- `GET /hr/workforce-skills` - Workforce skill distribution & average proficiency
- `GET /hr/skill-gaps` - Organization-wide skill deficit analysis
- `GET /hr/emerging-skills` - Emerging learning skill trends
- `GET /hr/roles/{role_id}/matches` - Rank internal candidates for open role vacancy
- `GET /hr/talent-search?skills=Python,SQL&department=Software Engineering&min_experience=3` - Filter employees
- `POST /hr/roles` - Create new open internal role

### Roles & Learning Catalog
- `GET /roles/departments` - List departments
- `GET /roles` - List all 22 roles with skill requirements
- `GET /roles/{id}` - Get role by ID
- `GET /learning/courses` - List course catalog

### AI Engine Interfaces
- `POST /ai/extract-skills` - NLP text skill extraction interface
- `POST /ai/match-role` - AI role matching interface
- `POST /ai/skill-gap` - AI skill gap interface
- `POST /ai/career-roadmap` - AI career roadmap interface
- `POST /ai/chat` - RAG AI Career Assistant chat interface

---

## 🎯 DEMO Workflow: EMP001 Arun Kumar

Use this flow for hackathon demonstration:

1. **Query EMP001 Profile**:
   `GET /employees/EMP001`
   - **Name**: Arun Kumar
   - **Current Role**: Backend Developer (3 yrs experience)
   - **Career Interest**: Machine Learning Engineer

2. **Retrieve Skill Passport**:
   `GET /employees/EMP001/skill-passport`
   - Skills: Python (4), FastAPI (4), SQL (3), Docker (3), Git (4), Machine Learning (2), Problem Solving (4).

3. **Check Role Recommendations**:
   `GET /employees/EMP001/role-matches`
   - Matches include Machine Learning Engineer, Backend Developer, Data Engineer.

4. **Skill Gap Analysis against Machine Learning Engineer**:
   `GET /employees/EMP001/skill-gap/{ml_engineer_role_id}`
   - **Matched**: Python (4/4), SQL (3/3), Docker (3/3)
   - **Needs Improvement**: Machine Learning (2/4)
   - **Missing**: TensorFlow (0/3), Statistics (0/3)

5. **Learning Recommendations**:
   `GET /employees/EMP001/learning-recommendations/{ml_engineer_role_id}`
   - Recommends: *Deep Learning with TensorFlow* and *Advanced Machine Learning & Scikit-Learn*.

6. **Career Roadmap**:
   `GET /employees/EMP001/career-roadmap/{ml_engineer_role_id}`
   - Visual step-by-step path: Backend Developer -> Skill Targets -> Course -> Project -> Machine Learning Engineer.
