from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class SkillBase(BaseModel):
    id: str
    name: str
    category: str
    description: Optional[str] = None

class EmployeeSkillResponse(BaseModel):
    skill_id: str
    skill_name: str
    category: str
    proficiency: int
    confidence: float
    source: str
    evidence: Optional[str] = None
    is_inferred: bool
    verified: bool

class WorkHistoryResponse(BaseModel):
    id: str
    organization: str
    role_title: str
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class EmployeeProjectResponse(BaseModel):
    project_id: str
    title: str
    project_role: Optional[str] = None
    contribution: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    skills_used: List[str] = []

class EmployeeLearningResponse(BaseModel):
    course_id: str
    title: str
    provider: Optional[str] = None
    status: str
    progress: int
    score: Optional[int] = None
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
    mapped_skills: List[str] = []

class EmployeeBase(BaseModel):
    id: str
    employee_code: str
    name: str
    email: str
    department_id: Optional[str] = None
    department_name: Optional[str] = None
    current_role_id: Optional[str] = None
    current_role_title: Optional[str] = None
    experience_years: int
    career_interest_role_id: Optional[str] = None
    career_interest_role_title: Optional[str] = None
    bio: Optional[str] = None

class SkillPassportResponse(BaseModel):
    employee: EmployeeBase
    explicit_skills: List[EmployeeSkillResponse]
    inferred_skills: List[EmployeeSkillResponse]
    transferable_skills: List[EmployeeSkillResponse]
    projects: List[EmployeeProjectResponse]
    learning: List[EmployeeLearningResponse]
    work_history: List[WorkHistoryResponse]
