-- Schema for AI-Powered Talent Discovery and Internal Career Mobility Platform
-- PostgreSQL / Supabase Compatible

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DEPARTMENTS
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

-- 2. SKILLS
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL CHECK (category IN ('technical', 'soft', 'transferable', 'domain')),
    description TEXT
);

-- 3. ROLES
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
    description TEXT,
    min_experience INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active'
);

-- 4. ROLE SKILLS
CREATE TABLE IF NOT EXISTS role_skills (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    required_level INT NOT NULL CHECK (required_level BETWEEN 1 AND 5),
    importance FLOAT DEFAULT 1.0,
    is_critical BOOLEAN DEFAULT false,
    PRIMARY KEY (role_id, skill_id)
);

-- 5. EMPLOYEES
CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    current_role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
    experience_years INT DEFAULT 0,
    career_interest_role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EMPLOYEE SKILLS
CREATE TABLE IF NOT EXISTS employee_skills (
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency INT NOT NULL CHECK (proficiency BETWEEN 1 AND 5),
    confidence FLOAT DEFAULT 1.0,
    source VARCHAR(100) DEFAULT 'self_reported',
    evidence TEXT,
    is_inferred BOOLEAN DEFAULT false,
    verified BOOLEAN DEFAULT false,
    PRIMARY KEY (employee_id, skill_id)
);

-- 7. WORK HISTORY
CREATE TABLE IF NOT EXISTS work_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    organization VARCHAR(255) NOT NULL,
    role_title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE
);

-- 8. PROJECTS
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active'
);

-- 9. PROJECT SKILLS
CREATE TABLE IF NOT EXISTS project_skills (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    importance FLOAT DEFAULT 1.0,
    PRIMARY KEY (project_id, skill_id)
);

-- 10. EMPLOYEE PROJECTS
CREATE TABLE IF NOT EXISTS employee_projects (
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    project_role VARCHAR(255),
    contribution TEXT,
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (employee_id, project_id)
);

-- 11. COURSES
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    provider VARCHAR(255),
    description TEXT,
    difficulty VARCHAR(50) DEFAULT 'Intermediate'
);

-- 12. COURSE SKILLS
CREATE TABLE IF NOT EXISTS course_skills (
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (course_id, skill_id)
);

-- 13. EMPLOYEE LEARNING
CREATE TABLE IF NOT EXISTS employee_learning (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    progress INT DEFAULT 0,
    score INT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- 14. SKILL HISTORY
CREATE TABLE IF NOT EXISTS skill_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    old_level INT,
    new_level INT,
    reason TEXT,
    source VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. ROLE MATCHES
CREATE TABLE IF NOT EXISTS role_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    match_score FLOAT NOT NULL,
    match_level VARCHAR(50) NOT NULL,
    explanation JSONB,
    model_version VARCHAR(50) DEFAULT 'v1.0-weighted',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. SKILL GAPS
CREATE TABLE IF NOT EXISTS skill_gaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    target_role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    current_level INT DEFAULT 0,
    required_level INT NOT NULL,
    gap_type VARCHAR(50) NOT NULL CHECK (gap_type IN ('missing', 'needs_improvement', 'matched'))
);

-- 17. FEEDBACK
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    useful BOOLEAN DEFAULT true,
    comments TEXT,
    outcome VARCHAR(100)
);

-- 18. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. USER PROFILES
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    account_type VARCHAR(50) NOT NULL CHECK (account_type IN ('employee', 'hr', 'admin')),
    employee_id UUID REFERENCES employees(id) ON DELETE SET NULL
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_employees_code ON employees(employee_code);
CREATE INDEX IF NOT EXISTS idx_employee_skills_emp ON employee_skills(employee_id);
CREATE INDEX IF NOT EXISTS idx_role_skills_role ON role_skills(role_id);
CREATE INDEX IF NOT EXISTS idx_employee_learning_emp ON employee_learning(employee_id);
CREATE INDEX IF NOT EXISTS idx_role_matches_emp ON role_matches(employee_id);
