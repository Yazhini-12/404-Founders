from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from backend.app.services.analytics_service import AnalyticsService
from backend.app.services.employee_service import EmployeeService
from backend.app.services.role_service import RoleService
from backend.app.schemas.role import RoleCreateRequest
import uuid

router = APIRouter(prefix="/hr", tags=["HR Analytics & Management"])

@router.get("/overview", response_model=dict)
def get_hr_overview():
    """HR Dashboard executive summary metrics."""
    return AnalyticsService.get_hr_overview()

@router.get("/employees", response_model=List[dict])
def get_hr_employees():
    """Retrieve all employee records for HR workforce review."""
    return EmployeeService.get_all_employees()

@router.get("/workforce-skills", response_model=List[dict])
def get_workforce_skills():
    """Workforce-wide skill distribution and average proficiency levels."""
    return AnalyticsService.get_workforce_skills()

@router.get("/skill-gaps", response_model=List[dict])
def get_organization_skill_gaps():
    """Identify organizational skill deficits between role requirements and workforce supply."""
    return AnalyticsService.get_organization_skill_gaps()

@router.get("/emerging-skills", response_model=List[dict])
def get_emerging_skills():
    """Track trending skills based on employee course enrollments."""
    return AnalyticsService.get_emerging_skills()

@router.get("/roles/{role_id}/matches", response_model=List[dict])
def get_ranked_candidates_for_role(role_id: str):
    """Rank internal workforce employees for a specific target role vacancy."""
    candidates = AnalyticsService.get_ranked_candidates_for_role(role_id)
    if not candidates:
        raise HTTPException(status_code=404, detail=f"Role ID {role_id} not found.")
    return candidates

@router.get("/talent-search", response_model=List[dict])
def talent_search(
    skills: Optional[str] = Query(None, description="Comma-separated skills (e.g. Python,SQL)"),
    department: Optional[str] = Query(None, description="Department name filter"),
    min_experience: Optional[int] = Query(None, description="Minimum years of experience")
):
    """Talent search engine allowing HR to filter employees by skill, department, and experience."""
    return AnalyticsService.talent_search(skills_filter=skills, department_filter=department, min_experience=min_experience)

@router.post("/roles", response_model=dict)
def create_role(role_req: RoleCreateRequest):
    """Allow HR to create a new internal open role."""
    new_id = str(uuid.uuid4())
    new_role = {
        "id": new_id,
        "title": role_req.title,
        "department_id": role_req.department_id,
        "description": role_req.description,
        "min_experience": role_req.min_experience,
        "status": "active",
        "required_skills": role_req.required_skills
    }
    return {"message": "Role created successfully", "role": new_role}
