from fastapi import APIRouter, HTTPException
from typing import List, Optional
from backend.app.services.employee_service import EmployeeService
from backend.app.services.matching_service import MatchingService
from backend.app.services.skill_gap_service import SkillGapService
from backend.app.services.roadmap_service import RoadmapService

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.get("", response_model=List[dict])
def get_all_employees():
    """Retrieve list of all employees in NovaTech Solutions."""
    return EmployeeService.get_all_employees()

@router.get("/{employee_code}", response_model=dict)
def get_employee_by_code(employee_code: str):
    """Retrieve detailed employee profile by employee_code (e.g. EMP001)."""
    emp = EmployeeService.get_employee_by_code(employee_code)
    if not emp:
        raise HTTPException(status_code=404, detail=f"Employee {employee_code} not found.")
    return emp

@router.get("/{employee_code}/skills", response_model=List[dict])
def get_employee_skills(employee_code: str):
    """Retrieve explicit and inferred skills for employee."""
    emp = EmployeeService.get_employee_by_code(employee_code)
    if not emp:
        raise HTTPException(status_code=404, detail=f"Employee {employee_code} not found.")
    return EmployeeService.get_employee_skills(emp["id"])

@router.get("/{employee_code}/projects", response_model=List[dict])
def get_employee_projects(employee_code: str):
    """Retrieve project assignments and skills used for employee."""
    emp = EmployeeService.get_employee_by_code(employee_code)
    if not emp:
        raise HTTPException(status_code=404, detail=f"Employee {employee_code} not found.")
    return EmployeeService.get_employee_projects(emp["id"])

@router.get("/{employee_code}/work-history", response_model=List[dict])
def get_employee_work_history(employee_code: str):
    """Retrieve past work history records for employee."""
    emp = EmployeeService.get_employee_by_code(employee_code)
    if not emp:
        raise HTTPException(status_code=404, detail=f"Employee {employee_code} not found.")
    return EmployeeService.get_employee_work_history(emp["id"])

@router.get("/{employee_code}/learning", response_model=List[dict])
def get_employee_learning(employee_code: str):
    """Retrieve learning activities and enrolled courses for employee."""
    emp = EmployeeService.get_employee_by_code(employee_code)
    if not emp:
        raise HTTPException(status_code=404, detail=f"Employee {employee_code} not found.")
    return EmployeeService.get_employee_learning(emp["id"])

@router.get("/{employee_code}/skill-passport", response_model=dict)
def get_employee_skill_passport(employee_code: str):
    """Generate dynamic Skill Passport combining skills, projects, learning, and history."""
    passport = EmployeeService.get_skill_passport(employee_code)
    if not passport:
        raise HTTPException(status_code=404, detail=f"Employee {employee_code} not found.")
    return passport

@router.get("/{employee_code}/role-matches", response_model=List[dict])
def get_employee_role_matches(employee_code: str):
    """Calculate internal role recommendations ranked by match score."""
    matches = MatchingService.get_role_matches_for_employee(employee_code)
    if not matches and not EmployeeService.get_employee_by_code(employee_code):
        raise HTTPException(status_code=404, detail=f"Employee {employee_code} not found.")
    return matches

@router.get("/{employee_code}/skill-gap/{role_id}", response_model=dict)
def get_employee_skill_gap(employee_code: str, role_id: str):
    """Analyze skill gap against a specific target role ID."""
    gap = SkillGapService.analyze_skill_gap(employee_code, role_id)
    if not gap:
        raise HTTPException(status_code=404, detail="Employee or Role not found.")
    return gap

@router.get("/{employee_code}/learning-recommendations/{role_id}", response_model=List[dict])
def get_employee_learning_recommendations(employee_code: str, role_id: str):
    """Get targeted course recommendations to bridge missing or weak skills."""
    return SkillGapService.get_learning_recommendations(employee_code, role_id)

@router.get("/{employee_code}/career-roadmap/{role_id}", response_model=dict)
def get_employee_career_roadmap(employee_code: str, role_id: str):
    """Generate structured step-by-step career path roadmap."""
    roadmap = RoadmapService.generate_career_roadmap(employee_code, role_id)
    if not roadmap:
        raise HTTPException(status_code=404, detail="Employee or Role not found.")
    return roadmap
