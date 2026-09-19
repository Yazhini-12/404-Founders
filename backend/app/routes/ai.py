from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from backend.app.services.employee_service import EmployeeService
from backend.app.services.matching_service import MatchingService
from backend.app.services.skill_gap_service import SkillGapService
from backend.app.services.roadmap_service import RoadmapService
from backend.app.services.career_assistant_service import CareerAssistantService

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
    Grounded AI Career Assistant Chat Endpoint.
    Uses Google Gemini (when GEMINI_API_KEY is configured) grounded strictly in authentic employee backend context.
    Falls back gracefully to a deterministic career assistant response if Gemini is unconfigured or unavailable.
    """
    res = CareerAssistantService.answer_career_question(payload.employee_code, payload.message)
    if res.get("status_code") != 200:
        raise HTTPException(status_code=res["status_code"], detail=res.get("error", "Error in AI Assistant"))
    return res["data"]
