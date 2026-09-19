from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from backend.app.services.employee_service import EmployeeService
from backend.app.services.matching_service import MatchingService
from backend.app.services.skill_gap_service import SkillGapService
from backend.app.services.roadmap_service import RoadmapService

router = APIRouter(prefix="/ai", tags=["AI Engine Modular Interface"])

class ExtractSkillsRequest(BaseModel):
    text_content: str  # Project description, resume snippet, or bio

class MatchRoleAIRequest(BaseModel):
    employee_code: str
    target_role_id: str

class SkillGapAIRequest(BaseModel):
    employee_code: str
    target_role_id: str

class RoadmapAIRequest(BaseModel):
    employee_code: str
    target_role_id: str

class AIChatRequest(BaseModel):
    employee_code: str
    message: str

@router.post("/extract-skills")
def extract_skills_from_text(payload: ExtractSkillsRequest):
    """
    Placeholder AI Endpoint for extracting hidden/inferred skills from project text or bio.
    Can be connected to spaCy / HuggingFace / LLM NER models.
    """
    text = payload.text_content.lower()
    inferred = []
    skill_keywords = {
        "python": "Python",
        "fastapi": "FastAPI",
        "sql": "SQL",
        "docker": "Docker",
        "kubernetes": "Kubernetes",
        "machine learning": "Machine Learning",
        "react": "React",
        "aws": "AWS",
        "pandas": "Pandas",
        "scikit-learn": "Scikit-learn",
        "tensorflow": "TensorFlow"
    }

    for kw, skill_name in skill_keywords.items():
        if kw in text:
            inferred.append({
                "skill_name": skill_name,
                "confidence": 0.88,
                "extracted_snippet": f"Found mention of '{kw}' in input text."
            })

    return {
        "status": "success",
        "model_engine": "Extracted-Skills-NLP-Interface-v1",
        "extracted_skills": inferred
    }

@router.post("/match-role")
def ai_match_role(payload: MatchRoleAIRequest):
    """Modular endpoint for AI-driven role matching."""
    match_res = MatchingService.match_employee_to_role(payload.employee_code, payload.target_role_id)
    if not match_res:
        raise HTTPException(status_code=404, detail="Employee or Role not found.")
    return {
        "status": "success",
        "engine": "AI-Role-Matching-Interface",
        "result": match_res
    }

@router.post("/skill-gap")
def ai_skill_gap(payload: SkillGapAIRequest):
    """Modular endpoint for AI-driven skill gap assessment."""
    gap = SkillGapService.analyze_skill_gap(payload.employee_code, payload.target_role_id)
    if not gap:
        raise HTTPException(status_code=404, detail="Employee or Role not found.")
    return {
        "status": "success",
        "engine": "AI-SkillGap-Interface",
        "result": gap
    }

@router.post("/career-roadmap")
def ai_career_roadmap(payload: RoadmapAIRequest):
    """Modular endpoint for AI-driven career roadmap generation."""
    roadmap = RoadmapService.generate_career_roadmap(payload.employee_code, payload.target_role_id)
    if not roadmap:
        raise HTTPException(status_code=404, detail="Employee or Role not found.")
    return {
        "status": "success",
        "engine": "AI-Roadmap-Interface",
        "result": roadmap
    }

@router.post("/chat")
def ai_career_assistant_chat(payload: AIChatRequest):
    """
    RAG AI Career Assistant Chat Interface.
    Retrieves full contextual data for an employee (profile, skills, role matches, skill gaps, learning)
    and formats a structured AI Career Assistant response.
    """
    emp = EmployeeService.get_employee_by_code(payload.employee_code)
    if not emp:
        raise HTTPException(status_code=404, detail=f"Employee {payload.employee_code} not found.")

    passport = EmployeeService.get_skill_passport(payload.employee_code)
    matches = MatchingService.get_role_matches_for_employee(payload.employee_code)

    top_match = matches[0] if matches else None
    target_role_title = emp.get("career_interest_role_title", "target role")

    # Contextual structured answer format for frontend chat component
    reply = (
        f"Hello {emp['name']}! I am your AI Career Mobility Assistant. "
        f"I analyzed your profile as a {emp.get('current_role_title', 'Employee')}.\n\n"
        f"Your top career match is **{top_match['role_title'] if top_match else target_role_title}** "
        f"with a **{top_match['match_score'] if top_match else 'N/A'}% match score** ({top_match['match_level'] if top_match else ''}).\n\n"
    )

    if top_match and top_match.get("missing_skills"):
        reply += f"To reach your goal, prioritize building skills in: {', '.join(top_match['missing_skills'])}. "

    if top_match and top_match.get("skills_to_improve"):
        reply += f"Also deepen proficiency in: {', '.join(top_match['skills_to_improve'])}."

    return {
        "employee_code": payload.employee_code,
        "user_message": payload.message,
        "ai_response": reply,
        "context_retrieved": {
            "employee_name": emp["name"],
            "current_role": emp.get("current_role_title"),
            "skill_count": len(passport["explicit_skills"]) + len(passport["inferred_skills"]),
            "top_match": top_match
        },
        "llm_connected": False,
        "note": "Modular interface ready for open-source LLM/RAG integration."
    }
