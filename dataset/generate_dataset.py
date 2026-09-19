"""
Synthetic Dataset Generator for NovaTech Solutions
Generates deterministic employee, role, skill, project, and learning datasets for hackathon MVP.
Uses fixed random seed 42.
"""

import os
import json
import uuid
import random
import csv
from datetime import datetime, timedelta

# Fix seed for reproducibility
random.seed(42)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)

# ---------------------------------------------------------
# 1. DEPARTMENTS
# ---------------------------------------------------------
DEPARTMENTS_DATA = [
    {"name": "Software Engineering", "description": "Core software product design, frontend, backend, and mobile development."},
    {"name": "Data & AI", "description": "Data analytics, data engineering, data science, machine learning, and AI research."},
    {"name": "Cloud & DevOps", "description": "Infrastructure, cloud management, CI/CD, site reliability, and MLOps."},
    {"name": "Cybersecurity", "description": "Information security, threat detection, network security, and cloud security."},
    {"name": "Quality Assurance", "description": "Quality assurance, manual testing, test automation, and performance testing."},
    {"name": "Product & Business", "description": "Product management, business analysis, product analytics, and strategic planning."}
]

# ---------------------------------------------------------
# 2. MASTER SKILLS TAXONOMY (~70 skills)
# ---------------------------------------------------------
SKILLS_DATA = [
    # Programming
    {"name": "Python", "category": "technical", "description": "High-level programming language for web, data, and AI."},
    {"name": "Java", "category": "technical", "description": "Object-oriented enterprise programming language."},
    {"name": "JavaScript", "category": "technical", "description": "Dynamic script language for client-side and server-side web."},
    {"name": "TypeScript", "category": "technical", "description": "Typed superset of JavaScript."},
    {"name": "C++", "category": "technical", "description": "Performance-critical system programming language."},
    {"name": "SQL", "category": "technical", "description": "Structured Query Language for database query and management."},

    # Frontend
    {"name": "HTML", "category": "technical", "description": "Standard markup language for document structure."},
    {"name": "CSS", "category": "technical", "description": "Style sheet language for visual presentation."},
    {"name": "React", "category": "technical", "description": "Frontend UI library for component-based applications."},
    {"name": "Next.js", "category": "technical", "description": "React framework for server-side rendering and static sites."},

    # Backend
    {"name": "Node.js", "category": "technical", "description": "JavaScript runtime for building backend APIs."},
    {"name": "Express.js", "category": "technical", "description": "Web app framework for Node.js."},
    {"name": "FastAPI", "category": "technical", "description": "Modern high-performance Python web framework."},
    {"name": "Spring Boot", "category": "technical", "description": "Java enterprise backend framework."},
    {"name": "REST API", "category": "technical", "description": "Architectural style for Web APIs."},
    {"name": "Microservices", "category": "technical", "description": "Distributed architecture pattern."},

    # Databases
    {"name": "PostgreSQL", "category": "technical", "description": "Advanced open-source relational database."},
    {"name": "MongoDB", "category": "technical", "description": "Document-oriented NoSQL database."},
    {"name": "Redis", "category": "technical", "description": "In-memory data structure store for caching."},

    # Data
    {"name": "Pandas", "category": "technical", "description": "Python data manipulation library."},
    {"name": "NumPy", "category": "technical", "description": "Numerical computing library for Python."},
    {"name": "Power BI", "category": "domain", "description": "Business analytics tool for dynamic dashboards."},
    {"name": "Excel", "category": "domain", "description": "Spreadsheet calculations and data analysis."},
    {"name": "Data Visualization", "category": "domain", "description": "Presenting complex data visually."},
    {"name": "Statistics", "category": "technical", "description": "Mathematical statistical modeling and analysis."},
    {"name": "ETL", "category": "technical", "description": "Extract, Transform, Load data pipelines."},
    {"name": "Data Warehousing", "category": "domain", "description": "Central storage of integrated data."},

    # AI/ML
    {"name": "Machine Learning", "category": "technical", "description": "Algorithms learning patterns from data."},
    {"name": "Deep Learning", "category": "technical", "description": "Neural networks for complex decision making."},
    {"name": "Scikit-learn", "category": "technical", "description": "Python machine learning toolkit."},
    {"name": "TensorFlow", "category": "technical", "description": "Open source platform for machine learning models."},
    {"name": "PyTorch", "category": "technical", "description": "Deep learning framework for tensor calculations."},
    {"name": "NLP", "category": "technical", "description": "Natural Language Processing."},
    {"name": "Computer Vision", "category": "technical", "description": "Visual data processing and pattern recognition."},

    # Generative AI
    {"name": "LLM", "category": "technical", "description": "Large Language Models fine-tuning and inference."},
    {"name": "RAG", "category": "technical", "description": "Retrieval-Augmented Generation for AI knowledge search."},
    {"name": "Prompt Engineering", "category": "technical", "description": "Crafting optimal prompts for AI foundation models."},
    {"name": "Vector Databases", "category": "technical", "description": "High-dimensional vector storage (Pinecone, PGVector)."},
    {"name": "Embeddings", "category": "technical", "description": "Vector representations of text and data."},

    # Cloud / DevOps
    {"name": "AWS", "category": "technical", "description": "Amazon Web Services cloud computing suite."},
    {"name": "Azure", "category": "technical", "description": "Microsoft Azure cloud services."},
    {"name": "Docker", "category": "technical", "description": "Container deployment platform."},
    {"name": "Kubernetes", "category": "technical", "description": "Container orchestration system."},
    {"name": "Linux", "category": "technical", "description": "Unix-like open source operating system."},
    {"name": "Terraform", "category": "technical", "description": "Infrastructure as Code tool."},
    {"name": "CI/CD", "category": "technical", "description": "Continuous Integration and Continuous Deployment."},
    {"name": "Git", "category": "technical", "description": "Distributed version control system."},
    {"name": "GitHub", "category": "technical", "description": "Code hosting and collaboration platform."},

    # Security
    {"name": "Network Security", "category": "domain", "description": "Protecting network infrastructure from intrusion."},
    {"name": "Cloud Security", "category": "domain", "description": "Securing cloud environments and workloads."},
    {"name": "SIEM", "category": "domain", "description": "Security Information and Event Management."},
    {"name": "Threat Detection", "category": "domain", "description": "Identifying potential security risks."},
    {"name": "Incident Response", "category": "domain", "description": "Managing and mitigating security incidents."},
    {"name": "Vulnerability Assessment", "category": "domain", "description": "Evaluating security weaknesses."},

    # Testing
    {"name": "Selenium", "category": "technical", "description": "Web browser automation testing tool."},
    {"name": "API Testing", "category": "technical", "description": "Validating functionality and security of REST APIs."},
    {"name": "Test Automation", "category": "technical", "description": "Automating software test suites."},
    {"name": "Unit Testing", "category": "technical", "description": "Testing individual software components."},

    # Product / Business
    {"name": "Business Analysis", "category": "domain", "description": "Identifying business needs and solutions."},
    {"name": "Product Analytics", "category": "domain", "description": "Tracking user behavioral metrics."},
    {"name": "Requirement Analysis", "category": "domain", "description": "Gathering user stories and requirements."},
    {"name": "Agile", "category": "transferable", "description": "Iterative software development approach."},
    {"name": "Scrum", "category": "transferable", "description": "Agile framework for team collaboration."},

    # Soft / Transferable
    {"name": "Communication", "category": "soft", "description": "Clear verbal and written information sharing."},
    {"name": "Leadership", "category": "soft", "description": "Guiding teams and inspiring goal achievement."},
    {"name": "Problem Solving", "category": "transferable", "description": "Analytical approach to overcoming obstacles."},
    {"name": "Team Collaboration", "category": "soft", "description": "Working effectively across peer groups."},
    {"name": "Analytical Thinking", "category": "transferable", "description": "Evaluating data logically."},
    {"name": "Stakeholder Management", "category": "transferable", "description": "Aligning project expectations with business leaders."},
    {"name": "Presentation", "category": "soft", "description": "Delivering effective talks and visual decks."},
    {"name": "Decision Making", "category": "transferable", "description": "Choosing optimal paths under uncertainty."},
    {"name": "Project Coordination", "category": "transferable", "description": "Managing timelines and project deliverables."},
    {"name": "Cross-functional Collaboration", "category": "transferable", "description": "Partnering across distinct business departments."},
    {"name": "Time Management", "category": "soft", "description": "Prioritizing tasks and meeting deadlines."},
    {"name": "Mentoring", "category": "soft", "description": "Coaching junior team members."}
]

# ---------------------------------------------------------
# 3. ROLES (22 specified roles)
# ---------------------------------------------------------
ROLES_SPEC = [
    # Software Engineering
    {"title": "Frontend Developer", "dept": "Software Engineering", "exp": 2, "desc": "Build responsive user interfaces using HTML, CSS, React, and modern web tech."},
    {"title": "Backend Developer", "dept": "Software Engineering", "exp": 3, "desc": "Design scalable REST APIs, microservices, and database systems."},
    {"title": "Full Stack Developer", "dept": "Software Engineering", "exp": 3, "desc": "Deliver end-to-end web applications combining React frontend and Python/Node backend."},
    {"title": "Software Engineer", "dept": "Software Engineering", "exp": 2, "desc": "Develop, test, and maintain software applications using clean architecture."},
    {"title": "Mobile Developer", "dept": "Software Engineering", "exp": 2, "desc": "Build cross-platform and native mobile applications."},

    # Data & AI
    {"title": "Data Analyst", "dept": "Data & AI", "exp": 2, "desc": "Analyze data trends, build SQL pipelines, and design executive dashboards."},
    {"title": "Data Scientist", "dept": "Data & AI", "exp": 3, "desc": "Formulate predictive statistical models and derive insights from raw data."},
    {"title": "Data Engineer", "dept": "Data & AI", "exp": 3, "desc": "Build robust ETL pipelines, data warehouses, and Big Data platforms."},
    {"title": "Machine Learning Engineer", "dept": "Data & AI", "exp": 3, "desc": "Deploy machine learning models, TensorFlow algorithms, and statistical pipelines into production."},
    {"title": "AI Engineer", "dept": "Data & AI", "exp": 3, "desc": "Implement LLMs, RAG applications, vector search, and GenAI capabilities."},

    # Cloud & DevOps
    {"title": "Cloud Engineer", "dept": "Cloud & DevOps", "exp": 3, "desc": "Architect and manage AWS/Azure cloud infrastructure."},
    {"title": "DevOps Engineer", "dept": "Cloud & DevOps", "exp": 3, "desc": "Automate CI/CD pipelines, Docker containerization, and Kubernetes clusters."},
    {"title": "Site Reliability Engineer", "dept": "Cloud & DevOps", "exp": 4, "desc": "Ensure uptime, latency performance, and automated infrastructure resilience."},
    {"title": "MLOps Engineer", "dept": "Cloud & DevOps", "exp": 3, "desc": "Automate model retraining, monitoring pipelines, and AI cloud deployments."},

    # Cybersecurity
    {"title": "Cybersecurity Analyst", "dept": "Cybersecurity", "exp": 2, "desc": "Monitor network traffic, evaluate vulnerabilities, and enforce security policies."},
    {"title": "Security Engineer", "dept": "Cybersecurity", "exp": 3, "desc": "Implement encryption, SIEM monitoring, and incident response tools."},
    {"title": "Cloud Security Engineer", "dept": "Cybersecurity", "exp": 3, "desc": "Harden cloud environments, manage IAM policies, and guard cloud infrastructure."},

    # Quality Assurance
    {"title": "QA Engineer", "dept": "Quality Assurance", "exp": 2, "desc": "Design test plans, execute functional validation, and track bugs."},
    {"title": "Automation Test Engineer", "dept": "Quality Assurance", "exp": 3, "desc": "Develop automated test scripts using Selenium and API testing suites."},

    # Product & Business
    {"title": "Product Analyst", "dept": "Product & Business", "exp": 2, "desc": "Track product usage KPIs, conduct user funnel analysis, and report insights."},
    {"title": "Business Analyst", "dept": "Product & Business", "exp": 3, "desc": "Bridge business stakeholder requirements with technical development teams."},
    {"title": "Product Manager", "dept": "Product & Business", "exp": 4, "desc": "Define product vision, roadmap, sprint backlog, and cross-functional leadership."}
]

# Mapping roles to required skills
ROLE_SKILLS_MAPPING = {
    "Frontend Developer": [
        ("React", 4, 1.5, True), ("JavaScript", 4, 1.5, True), ("HTML", 4, 1.0, False),
        ("CSS", 4, 1.0, False), ("TypeScript", 3, 1.2, False), ("Git", 3, 1.0, False),
        ("Problem Solving", 3, 1.0, False)
    ],
    "Backend Developer": [
        ("Python", 4, 1.5, True), ("FastAPI", 4, 1.5, True), ("REST API", 4, 1.2, True),
        ("SQL", 3, 1.2, True), ("PostgreSQL", 3, 1.0, False), ("Docker", 3, 1.0, False),
        ("Git", 4, 1.0, False), ("Problem Solving", 4, 1.0, False)
    ],
    "Full Stack Developer": [
        ("React", 4, 1.2, True), ("Node.js", 3, 1.2, True), ("JavaScript", 4, 1.2, True),
        ("SQL", 3, 1.0, False), ("REST API", 4, 1.2, True), ("Docker", 3, 1.0, False),
        ("Git", 3, 1.0, False)
    ],
    "Software Engineer": [
        ("Python", 3, 1.2, True), ("Java", 3, 1.2, False), ("SQL", 3, 1.0, False),
        ("Git", 3, 1.0, False), ("Unit Testing", 3, 1.0, False), ("Problem Solving", 3, 1.0, False)
    ],
    "Mobile Developer": [
        ("JavaScript", 4, 1.5, True), ("TypeScript", 3, 1.2, False), ("REST API", 3, 1.2, True),
        ("Git", 3, 1.0, False)
    ],
    "Data Analyst": [
        ("SQL", 4, 1.5, True), ("Excel", 4, 1.2, False), ("Power BI", 4, 1.5, True),
        ("Python", 3, 1.2, False), ("Data Visualization", 4, 1.2, False), ("Statistics", 3, 1.0, False)
    ],
    "Data Scientist": [
        ("Python", 4, 1.5, True), ("Statistics", 4, 1.5, True), ("Machine Learning", 4, 1.5, True),
        ("Pandas", 4, 1.2, False), ("Scikit-learn", 4, 1.2, False), ("SQL", 3, 1.0, False)
    ],
    "Data Engineer": [
        ("Python", 4, 1.5, True), ("SQL", 4, 1.5, True), ("ETL", 4, 1.5, True),
        ("PostgreSQL", 4, 1.2, False), ("Data Warehousing", 3, 1.2, False), ("Docker", 3, 1.0, False)
    ],
    "Machine Learning Engineer": [
        ("Python", 4, 1.5, True), ("Machine Learning", 4, 1.5, True), ("TensorFlow", 3, 1.5, True),
        ("Statistics", 3, 1.2, False), ("SQL", 3, 1.0, False), ("Docker", 3, 1.0, False)
    ],
    "AI Engineer": [
        ("Python", 4, 1.5, True), ("LLM", 4, 1.5, True), ("RAG", 4, 1.5, True),
        ("Vector Databases", 3, 1.2, False), ("Embeddings", 3, 1.2, False), ("PyTorch", 3, 1.2, False)
    ],
    "Cloud Engineer": [
        ("AWS", 4, 1.5, True), ("Terraform", 3, 1.2, False), ("Docker", 3, 1.2, False),
        ("Linux", 4, 1.2, True), ("CI/CD", 3, 1.0, False)
    ],
    "DevOps Engineer": [
        ("Docker", 4, 1.5, True), ("Kubernetes", 4, 1.5, True), ("AWS", 4, 1.2, False),
        ("Linux", 4, 1.5, True), ("CI/CD", 4, 1.5, True), ("Terraform", 3, 1.0, False)
    ],
    "Site Reliability Engineer": [
        ("Linux", 4, 1.5, True), ("Kubernetes", 4, 1.5, True), ("Python", 3, 1.2, False),
        ("CI/CD", 4, 1.2, False), ("Problem Solving", 4, 1.0, False)
    ],
    "MLOps Engineer": [
        ("Python", 4, 1.5, True), ("Docker", 4, 1.5, True), ("Kubernetes", 3, 1.2, False),
        ("Machine Learning", 3, 1.2, True), ("CI/CD", 3, 1.2, False)
    ],
    "Cybersecurity Analyst": [
        ("Network Security", 4, 1.5, True), ("Threat Detection", 4, 1.5, True),
        ("SIEM", 3, 1.2, False), ("Vulnerability Assessment", 3, 1.2, False)
    ],
    "Security Engineer": [
        ("Network Security", 4, 1.5, True), ("Incident Response", 4, 1.5, True),
        ("Python", 3, 1.0, False), ("Linux", 3, 1.2, False)
    ],
    "Cloud Security Engineer": [
        ("Cloud Security", 4, 1.5, True), ("AWS", 4, 1.5, True), ("Vulnerability Assessment", 3, 1.2, False)
    ],
    "QA Engineer": [
        ("API Testing", 4, 1.5, True), ("Unit Testing", 4, 1.2, False), ("SQL", 3, 1.0, False)
    ],
    "Automation Test Engineer": [
        ("Selenium", 4, 1.5, True), ("Test Automation", 4, 1.5, True), ("Python", 3, 1.2, False)
    ],
    "Product Analyst": [
        ("Product Analytics", 4, 1.5, True), ("SQL", 4, 1.5, True), ("Excel", 3, 1.0, False)
    ],
    "Business Analyst": [
        ("Business Analysis", 4, 1.5, True), ("Requirement Analysis", 4, 1.5, True), ("Agile", 4, 1.2, False)
    ],
    "Product Manager": [
        ("Agile", 4, 1.5, True), ("Stakeholder Management", 4, 1.5, True), ("Leadership", 4, 1.5, True)
    ]
}

# ---------------------------------------------------------
# 4. COURSES (~35 courses)
# ---------------------------------------------------------
COURSES_SPEC = [
    {"title": "Python Fundamentals", "provider": "Coursera", "difficulty": "Beginner", "skills": ["Python"]},
    {"title": "Advanced Python for Systems", "provider": "Udemy", "difficulty": "Advanced", "skills": ["Python", "FastAPI"]},
    {"title": "Advanced SQL & Database Tuning", "provider": "Datacamp", "difficulty": "Intermediate", "skills": ["SQL", "PostgreSQL"]},
    {"title": "React Development Masterclass", "provider": "Udemy", "difficulty": "Intermediate", "skills": ["React", "JavaScript", "HTML", "CSS"]},
    {"title": "Docker Essentials for Developers", "provider": "Pluralsight", "difficulty": "Beginner", "skills": ["Docker"]},
    {"title": "Kubernetes Fundamentals", "provider": "Linux Foundation", "difficulty": "Advanced", "skills": ["Kubernetes", "Docker"]},
    {"title": "AWS Cloud Architect Fundamentals", "provider": "AWS Training", "difficulty": "Intermediate", "skills": ["AWS", "Linux"]},
    {"title": "Machine Learning Fundamentals", "provider": "Coursera", "difficulty": "Intermediate", "skills": ["Machine Learning", "Python", "Statistics"]},
    {"title": "Advanced Machine Learning & Scikit-Learn", "provider": "DeepLearning.AI", "difficulty": "Advanced", "skills": ["Machine Learning", "Scikit-learn", "Python"]},
    {"title": "Deep Learning with TensorFlow", "provider": "Coursera", "difficulty": "Advanced", "skills": ["Deep Learning", "TensorFlow", "PyTorch"]},
    {"title": "MLOps Fundamentals", "provider": "Udemy", "difficulty": "Intermediate", "skills": ["MLOps Engineer", "Docker", "Machine Learning", "CI/CD"]},
    {"title": "Generative AI & Prompt Engineering", "provider": "DeepLearning.AI", "difficulty": "Intermediate", "skills": ["LLM", "Prompt Engineering"]},
    {"title": "RAG Application Development with Vector DBs", "provider": "Udemy", "difficulty": "Advanced", "skills": ["RAG", "Vector Databases", "Embeddings"]},
    {"title": "Power BI Analytics for Enterprise", "provider": "Microsoft", "difficulty": "Intermediate", "skills": ["Power BI", "Data Visualization", "Excel"]},
    {"title": "Cybersecurity Fundamentals", "provider": "EdX", "difficulty": "Beginner", "skills": ["Network Security", "Threat Detection"]},
    {"title": "Leadership & Stakeholder Essentials", "provider": "LinkedIn Learning", "difficulty": "Intermediate", "skills": ["Leadership", "Stakeholder Management", "Communication"]},
    {"title": "Agile & Scrum Practitioner", "provider": "Scrum.org", "difficulty": "Intermediate", "skills": ["Agile", "Scrum", "Requirement Analysis"]},
    {"title": "FastAPI Microservices Architecture", "provider": "Udemy", "difficulty": "Intermediate", "skills": ["FastAPI", "REST API", "Microservices"]},
    {"title": "Data Engineering Pipelines with ETL", "provider": "Coursera", "difficulty": "Advanced", "skills": ["ETL", "Data Warehousing", "SQL"]},
    {"title": "Cloud Security Architecture", "provider": "AWS Training", "difficulty": "Advanced", "skills": ["Cloud Security", "Vulnerability Assessment"]}
]

# ---------------------------------------------------------
# 5. PROJECTS (~25 projects)
# ---------------------------------------------------------
PROJECTS_SPEC = [
    {
        "title": "High-Throughput Microservice Billing API",
        "dept": "Software Engineering",
        "desc": "Developed REST APIs using FastAPI and PostgreSQL and containerized services using Docker.",
        "skills": ["FastAPI", "Python", "PostgreSQL", "Docker", "REST API"]
    },
    {
        "title": "Customer Churn Prediction Platform",
        "dept": "Data & AI",
        "desc": "Built customer churn prediction models using Python, Pandas and Scikit-learn.",
        "skills": ["Python", "Pandas", "Scikit-learn", "Machine Learning", "SQL"]
    },
    {
        "title": "Multi-Cloud Infrastructure Automation",
        "dept": "Cloud & DevOps",
        "desc": "Led a team and coordinated deployment of Kubernetes clusters with Terraform and AWS.",
        "skills": ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"]
    },
    {
        "title": "Enterprise Knowledge Search with RAG & Vector DB",
        "dept": "Data & AI",
        "desc": "Architected an internal AI assistant utilizing LLM embeddings, RAG pipelines, and vector databases.",
        "skills": ["Python", "RAG", "LLM", "Vector Databases", "Embeddings"]
    },
    {
        "title": "Executive KPI Dashboard & ETL Pipeline",
        "dept": "Product & Business",
        "desc": "Designed Power BI dashboards fed by automated SQL ETL data warehousing pipelines.",
        "skills": ["Power BI", "SQL", "ETL", "Excel", "Data Visualization"]
    },
    {
        "title": "Cloud Security Monitoring & SIEM Guardrail",
        "dept": "Cybersecurity",
        "desc": "Implemented SIEM threat detection alerts and automated vulnerability scanning across AWS accounts.",
        "skills": ["Cloud Security", "SIEM", "Threat Detection", "Network Security"]
    },
    {
        "title": "Automated Web & API Regression Suite",
        "dept": "Quality Assurance",
        "desc": "Built end-to-end API testing scripts and Selenium web automation suites for release verification.",
        "skills": ["Selenium", "API Testing", "Test Automation", "Python"]
    },
    {
        "title": "Next-Gen Mobile Self-Service App",
        "dept": "Software Engineering",
        "desc": "Created responsive React and mobile user experiences backed by Node.js APIs.",
        "skills": ["React", "JavaScript", "TypeScript", "Node.js", "REST API"]
    }
]

FIRST_NAMES = ["Arun", "Priya", "Rahul", "Ananya", "Vikram", "Neha", "Rohan", "Kavya", "Siddharth", "Meera",
               "Aditya", "Sneha", "Karan", "Pooja", "Amit", "Ritu", "Suresh", "Divya", "Rajesh", "Nisha",
               "Alex", "Jordan", "Taylor", "Morgan", "Sam", "Chris", "Pat", "Riley", "Casey", "Jamie"]

LAST_NAMES = ["Kumar", "Sharma", "Verma", "Patel", "Singh", "Reddy", "Rao", "Nair", "Gupta", "Joshi",
              "Mehta", "Iyer", "Deshmukh", "Chopra", "Bhasin", "Smith", "Johnson", "Williams", "Brown", "Jones"]

def generate():
    print("Generating NovaTech Solutions Synthetic Dataset...")

    # Data structures
    departments = []
    skills = []
    roles = []
    role_skills = []
    courses = []
    course_skills = []
    projects = []
    project_skills = []

    employees = []
    employee_skills = []
    work_history = []
    employee_projects = []
    employee_learning = []

    # Map names to UUIDs for quick lookup
    dept_map = {}
    skill_map = {}
    role_map = {}
    course_map = {}
    project_map = {}

    # 1. Departments
    for d in DEPARTMENTS_DATA:
        d_id = str(uuid.uuid4())
        d_obj = {"id": d_id, "name": d["name"], "description": d["description"]}
        departments.append(d_obj)
        dept_map[d["name"]] = d_id

    # 2. Skills
    for s in SKILLS_DATA:
        s_id = str(uuid.uuid4())
        s_obj = {"id": s_id, "name": s["name"], "category": s["category"], "description": s["description"]}
        skills.append(s_obj)
        skill_map[s["name"]] = s_id

    # 3. Roles & Role Skills
    for r in ROLES_SPEC:
        r_id = str(uuid.uuid4())
        dept_id = dept_map[r["dept"]]
        r_obj = {
            "id": r_id,
            "title": r["title"],
            "department_id": dept_id,
            "description": r["desc"],
            "min_experience": r["exp"],
            "status": "active"
        }
        roles.append(r_obj)
        role_map[r["title"]] = r_id

        # Role skills
        r_skills = ROLE_SKILLS_MAPPING.get(r["title"], [])
        for skill_name, req_lvl, imp, is_crit in r_skills:
            if skill_name in skill_map:
                role_skills.append({
                    "role_id": r_id,
                    "skill_id": skill_map[skill_name],
                    "required_level": req_lvl,
                    "importance": imp,
                    "is_critical": is_crit
                })

    # 4. Courses & Course Skills
    for c in COURSES_SPEC:
        c_id = str(uuid.uuid4())
        c_obj = {
            "id": c_id,
            "title": c["title"],
            "provider": c["provider"],
            "description": f"Learn key competencies in {', '.join(c['skills'])}.",
            "difficulty": c["difficulty"]
        }
        courses.append(c_obj)
        course_map[c["title"]] = c_id

        for s_name in c["skills"]:
            if s_name in skill_map:
                course_skills.append({
                    "course_id": c_id,
                    "skill_id": skill_map[s_name]
                })

    # 5. Projects & Project Skills
    for p in PROJECTS_SPEC:
        p_id = str(uuid.uuid4())
        p_obj = {
            "id": p_id,
            "title": p["title"],
            "department_id": dept_map[p["dept"]],
            "description": p["desc"],
            "status": "active"
        }
        projects.append(p_obj)
        project_map[p["title"]] = p_id

        for s_name in p["skills"]:
            if s_name in skill_map:
                project_skills.append({
                    "project_id": p_id,
                    "skill_id": skill_map[s_name],
                    "importance": round(random.uniform(1.0, 1.5), 2)
                })

    # 6. DEMO EMPLOYEE: EMP001 (Arun Kumar)
    emp1_id = str(uuid.uuid4())
    backend_role_id = role_map["Backend Developer"]
    ml_role_id = role_map["Machine Learning Engineer"]
    sw_dept_id = dept_map["Software Engineering"]

    emp1 = {
        "id": emp1_id,
        "employee_code": "EMP001",
        "name": "Arun Kumar",
        "email": "arun.kumar@novatech.com",
        "department_id": sw_dept_id,
        "current_role_id": backend_role_id,
        "experience_years": 3,
        "career_interest_role_id": ml_role_id,
        "bio": "Enthusiastic Backend Developer passionate about scaling distributed microservices and transitioning into Machine Learning Engineer role.",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
    employees.append(emp1)

    # EMP001 Skills (Python=4, FastAPI=4, SQL=3, Docker=3, Git=4, Machine Learning=2, Problem Solving=4)
    emp1_skill_list = [
        ("Python", 4, 0.95, "self_reported", "Built FastAPI microservices & Python scripts", False, True),
        ("FastAPI", 4, 0.95, "project_extracted", "Designed REST APIs for core billing engine", False, True),
        ("SQL", 3, 0.85, "self_reported", "Wrote complex analytical queries in PostgreSQL", False, True),
        ("Docker", 3, 0.80, "project_extracted", "Containerized API services for dev/staging", False, True),
        ("Git", 4, 0.90, "self_reported", "Version control lead for team repository", False, True),
        ("Machine Learning", 2, 0.60, "course_completed", "Completed ML Fundamentals online course", True, False),
        ("Problem Solving", 4, 0.90, "peer_review", "Consistently solves complex algorithmic bugs", False, True)
    ]
    for s_name, prof, conf, src, ev, is_inf, ver in emp1_skill_list:
        if s_name in skill_map:
            employee_skills.append({
                "employee_id": emp1_id,
                "skill_id": skill_map[s_name],
                "proficiency": prof,
                "confidence": conf,
                "source": src,
                "evidence": ev,
                "is_inferred": is_inf,
                "verified": ver
            })

    # EMP001 Work History
    work_history.append({
        "id": str(uuid.uuid4()),
        "employee_id": emp1_id,
        "organization": "NovaTech Solutions",
        "role_title": "Backend Developer",
        "description": "Developed high-throughput FastAPI REST services and PostgreSQL database models.",
        "start_date": "2023-01-15",
        "end_date": None
    })
    work_history.append({
        "id": str(uuid.uuid4()),
        "employee_id": emp1_id,
        "organization": "CloudSoft Tech",
        "role_title": "Junior Python Developer",
        "description": "Wrote script automation and database migration utilities.",
        "start_date": "2021-06-01",
        "end_date": "2022-12-31"
    })

    # EMP001 Projects
    billing_proj_id = project_map["High-Throughput Microservice Billing API"]
    employee_projects.append({
        "employee_id": emp1_id,
        "project_id": billing_proj_id,
        "project_role": "Lead Backend Developer",
        "contribution": "Developed REST APIs using FastAPI and PostgreSQL and containerized services using Docker.",
        "start_date": "2023-03-01",
        "end_date": "2023-11-30"
    })

    # EMP001 Learning ("Machine Learning Fundamentals" - In Progress)
    ml_course_id = course_map["Machine Learning Fundamentals"]
    employee_learning.append({
        "id": str(uuid.uuid4()),
        "employee_id": emp1_id,
        "course_id": ml_course_id,
        "status": "in_progress",
        "progress": 65,
        "score": None,
        "started_at": (datetime.now() - timedelta(days=30)).isoformat(),
        "completed_at": None
    })

    # 7. OTHER ~99 EMPLOYEES
    role_titles = list(role_map.keys())
    for idx in range(2, 101):
        emp_id = str(uuid.uuid4())
        emp_code = f"EMP{idx:03d}"
        fname = random.choice(FIRST_NAMES)
        lname = random.choice(LAST_NAMES)
        fullname = f"{fname} {lname}"
        email = f"{fname.lower()}.{lname.lower()}{idx}@novatech.com"

        assigned_role_title = random.choice(role_titles)
        assigned_role_id = role_map[assigned_role_title]
        role_info = next(r for r in ROLES_SPEC if r["title"] == assigned_role_title)
        dept_id = dept_map[role_info["dept"]]
        exp_years = random.randint(role_info["exp"], role_info["exp"] + 8)

        # Pick career interest (sometimes same department, sometimes transition)
        interest_title = random.choice(role_titles)
        interest_role_id = role_map[interest_title]

        employees.append({
            "id": emp_id,
            "employee_code": emp_code,
            "name": fullname,
            "email": email,
            "department_id": dept_id,
            "current_role_id": assigned_role_id,
            "experience_years": exp_years,
            "career_interest_role_id": interest_role_id,
            "bio": f"{assigned_role_title} with {exp_years} years of experience at NovaTech Solutions.",
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        })

        # Add skills based on assigned role requirements + some random transferable skills
        req_skills = ROLE_SKILLS_MAPPING.get(assigned_role_title, [])
        for s_name, req_lvl, _, _ in req_skills:
            if s_name in skill_map:
                # Vary proficiency around required level
                prof = max(1, min(5, req_lvl + random.choice([-1, 0, 0, 1])))
                employee_skills.append({
                    "employee_id": emp_id,
                    "skill_id": skill_map[s_name],
                    "proficiency": prof,
                    "confidence": round(random.uniform(0.7, 0.95), 2),
                    "source": random.choice(["self_reported", "project_extracted", "manager_verified"]),
                    "evidence": f"Applied {s_name} in enterprise projects at level {prof}.",
                    "is_inferred": random.choice([True, False]),
                    "verified": random.choice([True, False])
                })

        # Add 1-2 random transferable skills
        transferable = ["Communication", "Problem Solving", "Team Collaboration", "Agile", "Time Management"]
        for t_skill in random.sample(transferable, k=random.randint(1, 2)):
            if t_skill in skill_map and not any(es["employee_id"] == emp_id and es["skill_id"] == skill_map[t_skill] for es in employee_skills):
                employee_skills.append({
                    "employee_id": emp_id,
                    "skill_id": skill_map[t_skill],
                    "proficiency": random.randint(3, 5),
                    "confidence": 0.85,
                    "source": "peer_review",
                    "evidence": f"Demonstrated strong {t_skill} in cross-functional work.",
                    "is_inferred": False,
                    "verified": True
                })

        # Work history
        work_history.append({
            "id": str(uuid.uuid4()),
            "employee_id": emp_id,
            "organization": "NovaTech Solutions",
            "role_title": assigned_role_title,
            "description": f"Worked as {assigned_role_title} delivering key software solutions.",
            "start_date": (datetime.now() - timedelta(days=365*min(exp_years, 3))).strftime("%Y-%m-%d"),
            "end_date": None
        })

        # Assign 1-2 projects
        sample_projs = random.sample(projects, k=random.randint(1, 2))
        for proj in sample_projs:
            employee_projects.append({
                "employee_id": emp_id,
                "project_id": proj["id"],
                "project_role": assigned_role_title,
                "contribution": f"Contributed to {proj['title']} execution.",
                "start_date": "2023-01-10",
                "end_date": "2023-10-15"
            })

        # Assign 1-3 learning activities
        sample_courses = random.sample(courses, k=random.randint(1, 3))
        for course in sample_courses:
            status = random.choice(["not_started", "in_progress", "completed"])
            prog = 100 if status == "completed" else (random.randint(10, 90) if status == "in_progress" else 0)
            score = random.randint(75, 100) if status == "completed" else None
            employee_learning.append({
                "id": str(uuid.uuid4()),
                "employee_id": emp_id,
                "course_id": course["id"],
                "status": status,
                "progress": prog,
                "score": score,
                "started_at": (datetime.now() - timedelta(days=60)).isoformat() if status != "not_started" else None,
                "completed_at": (datetime.now() - timedelta(days=10)).isoformat() if status == "completed" else None
            })

    # Save dataset to JSON files
    datasets = {
        "departments.json": departments,
        "skills.json": skills,
        "roles.json": roles,
        "role_skills.json": role_skills,
        "courses.json": courses,
        "course_skills.json": course_skills,
        "projects.json": projects,
        "project_skills.json": project_skills,
        "employees.json": employees,
        "employee_skills.json": employee_skills,
        "work_history.json": work_history,
        "employee_projects.json": employee_projects,
        "employee_learning.json": employee_learning
    }

    for filename, data in datasets.items():
        filepath = os.path.join(DATA_DIR, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"Saved {len(data)} records to dataset/data/{filename}")

    # Also save CSV files
    for filename, data in datasets.items():
        csv_filename = filename.replace(".json", ".csv")
        csv_filepath = os.path.join(DATA_DIR, csv_filename)
        if data:
            keys = data[0].keys()
            with open(csv_filepath, "w", newline="", encoding="utf-8") as f:
                dict_writer = csv.DictWriter(f, fieldnames=keys)
                dict_writer.writeheader()
                dict_writer.writerows(data)

    print("\nDataset generation completed successfully!")

if __name__ == "__main__":
    generate()
