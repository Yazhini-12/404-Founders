from pydantic import BaseModel
from typing import List, Optional

class DepartmentResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None

class RoleSkillRequirement(BaseModel):
    skill_id: str
    skill_name: str
    category: str
    required_level: int
    importance: float
    is_critical: bool

class RoleResponse(BaseModel):
    id: str
    title: str
    department_id: str
    department_name: Optional[str] = None
    description: Optional[str] = None
    min_experience: int
    status: str = "active"
    required_skills: List[RoleSkillRequirement] = []

class RoleCreateRequest(BaseModel):
    title: str
    department_id: str
    description: str
    min_experience: int = 0
    required_skills: List[dict] = []
