from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class SkillGapItem(BaseModel):
    skill_id: str
    skill_name: str
    category: str
    current_level: int
    required_level: int
    gap_type: str  # 'missing', 'needs_improvement', 'matched'

class SkillGapResponse(BaseModel):
    employee_code: str
    target_role_id: str
    target_role_title: str
    matched_skills: List[SkillGapItem]
    missing_skills: List[SkillGapItem]
    skills_to_improve: List[SkillGapItem]

class RoleMatchResponse(BaseModel):
    role_id: str
    role_title: str
    department_name: str
    match_score: float  # 0 to 100
    match_level: str    # High, Medium, Low
    matched_skills: List[str]
    missing_skills: List[str]
    skills_to_improve: List[str]
    explanation: Dict[str, Any]

class LearningRecommendationItem(BaseModel):
    course_id: str
    course_title: str
    provider: str
    difficulty: str
    target_skill: str
    reason: str

class RoadmapNode(BaseModel):
    step: int
    title: str
    type: str  # 'current_role', 'skill_upgrade', 'recommended_course', 'recommended_project', 'target_role'
    description: str
    details: Dict[str, Any]

class CareerRoadmapResponse(BaseModel):
    employee_code: str
    employee_name: str
    current_role: str
    target_role: str
    estimated_months: int
    nodes: List[RoadmapNode]

class HRWorkforceSkillStats(BaseModel):
    skill_name: str
    category: str
    employee_count: int
    avg_proficiency: float

class HROverviewResponse(BaseModel):
    total_employees: int
    total_departments: int
    total_roles: int
    total_skills: int
    top_workforce_skills: List[HRWorkforceSkillStats]
    critical_skill_gaps: List[Dict[str, Any]]
