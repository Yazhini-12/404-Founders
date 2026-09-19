from fastapi import APIRouter, HTTPException
from typing import List
from backend.app.services.role_service import RoleService

router = APIRouter(prefix="/roles", tags=["Roles & Departments"])

@router.get("/departments", response_model=List[dict])
def get_departments():
    """Retrieve list of all departments."""
    return RoleService.get_all_departments()

@router.get("", response_model=List[dict])
def get_all_roles():
    """Retrieve all internal roles and their skill requirements."""
    return RoleService.get_all_roles()

@router.get("/{role_id}", response_model=dict)
def get_role_by_id(role_id: str):
    """Retrieve specific role details by ID."""
    role = RoleService.get_role_by_id(role_id)
    if not role:
        raise HTTPException(status_code=404, detail=f"Role ID {role_id} not found.")
    return role
