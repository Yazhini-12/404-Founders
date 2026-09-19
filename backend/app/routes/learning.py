from fastapi import APIRouter
from typing import List
from backend.app.database import get_table_data

router = APIRouter(prefix="/learning", tags=["Learning & Courses"])

@router.get("/courses", response_model=List[dict])
def get_all_courses():
    """Retrieve all synthetic learning catalog courses."""
    courses = get_table_data("courses")
    course_skills = get_table_data("course_skills")
    skills = {s["id"]: s["name"] for s in get_table_data("skills")}

    result = []
    for c in courses:
        c_copy = dict(c)
        c_copy["mapped_skills"] = [skills[cs["skill_id"]] for cs in course_skills if cs["course_id"] == c["id"] and cs["skill_id"] in skills]
        result.append(c_copy)
    return result
