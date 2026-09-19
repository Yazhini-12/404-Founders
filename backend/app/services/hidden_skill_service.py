from backend.app.services.employee_service import EmployeeService
from backend.app.database import get_table_data
from typing import List, Dict, Any
import re

KEYWORD_SKILL_MAPPING = [
    {
        "keywords": ["led", "lead", "heading team", "managed team", "team lead"],
        "skill": "Leadership",
        "category": "soft",
        "base_confidence": 0.85
    },
    {
        "keywords": ["coordinated", "coordination", "timelines", "deliverables", "project lead"],
        "skill": "Project Coordination",
        "category": "transferable",
        "base_confidence": 0.80
    },
    {
        "keywords": ["stakeholder", "client", "business team", "executive deck", "aligning expectations"],
        "skill": "Stakeholder Management",
        "category": "transferable",
        "base_confidence": 0.82
    },
    {
        "keywords": ["presented", "presentation", "demonstrated", "delivered talks"],
        "skill": "Presentation",
        "category": "soft",
        "base_confidence": 0.78
    },
    {
        "keywords": ["collaborated", "worked with team", "team effort", "partnered"],
        "skill": "Team Collaboration",
        "category": "soft",
        "base_confidence": 0.75
    },
    {
        "keywords": ["cross-functional", "multiple teams", "qa and cloud teams", "cross departmental"],
        "skill": "Cross-functional Collaboration",
        "category": "transferable",
        "base_confidence": 0.84
    },
    {
        "keywords": ["resolved", "optimized", "troubleshot", "debugged", "fixing failures"],
        "skill": "Problem Solving",
        "category": "transferable",
        "base_confidence": 0.82
    },
    {
        "keywords": ["analyzed", "analysis", "insights", "evaluated", "statistical modeling"],
        "skill": "Analytical Thinking",
        "category": "transferable",
        "base_confidence": 0.80
    },
    {
        "keywords": ["mentored", "guided junior", "coached", "onboarded"],
        "skill": "Mentoring",
        "category": "soft",
        "base_confidence": 0.85
    }
]

def extract_snippet_with_keyword(full_text: str, keyword: str) -> str:
    """Extracts the specific sentence or phrase containing the keyword."""
    if not full_text:
        return ""
    # Split text into sentences or clauses
    parts = re.split(r'[.;!\n]', full_text)
    for p in parts:
        if keyword in p.lower():
            return p.strip()
    return full_text.strip()

class HiddenSkillService:
    @staticmethod
    def discover_hidden_skills(employee_code: str) -> Dict[str, Any]:
        """
        Discovers evidence-backed hidden and transferable skills from project descriptions,
        work history, and learning activities.
        - Excludes skills already explicitly possessed by the employee.
        - Ensures evidence snippet directly contains the triggering keyword phrase.
        """
        emp = EmployeeService.get_employee_by_code(employee_code)
        if not emp:
            return None

        emp_id = emp["id"]
        # Fetch existing skills to exclude duplicates
        existing_skill_names = {s["skill_name"].lower() for s in EmployeeService.get_employee_skills(emp_id)}

        projects = EmployeeService.get_employee_projects(emp_id)
        history = EmployeeService.get_employee_work_history(emp_id)
        learning = EmployeeService.get_employee_learning(emp_id)

        inferred_results = []
        seen_skills = set(existing_skill_names)

        # 1. Scan Projects
        for p in projects:
            title = p.get("title", "")
            role = p.get("project_role", "")
            contrib = p.get("contribution", "")
            full_text = f"{title}. {role}. {contrib}"

            for rule in KEYWORD_SKILL_MAPPING:
                s_name = rule["skill"]
                if s_name.lower() in seen_skills:
                    continue

                for kw in rule["keywords"]:
                    if kw in full_text.lower():
                        snippet = extract_snippet_with_keyword(full_text, kw)
                        if snippet and kw in snippet.lower():
                            evidence = f"Extracted from project '{title}': '{snippet}'"
                            inferred_results.append({
                                "skill_name": s_name,
                                "category": rule["category"],
                                "confidence": rule["base_confidence"],
                                "source": "project_description",
                                "evidence": evidence,
                                "is_inferred": True,
                                "verified": False
                            })
                            seen_skills.add(s_name.lower())
                            break

        # 2. Scan Work History
        for h in history:
            role_title = h.get("role_title", "")
            desc = h.get("description", "")
            full_text = f"{role_title}. {desc}"

            for rule in KEYWORD_SKILL_MAPPING:
                s_name = rule["skill"]
                if s_name.lower() in seen_skills:
                    continue

                for kw in rule["keywords"]:
                    if kw in full_text.lower():
                        snippet = extract_snippet_with_keyword(full_text, kw)
                        if snippet and kw in snippet.lower():
                            evidence = f"Extracted from work history ('{role_title}'): '{snippet}'"
                            inferred_results.append({
                                "skill_name": s_name,
                                "category": rule["category"],
                                "confidence": round(rule["base_confidence"] * 0.95, 2),
                                "source": "work_history",
                                "evidence": evidence,
                                "is_inferred": True,
                                "verified": False
                            })
                            seen_skills.add(s_name.lower())
                            break

        # 3. Scan Enrolled Learning Activities
        for l in learning:
            if l.get("status") in ("in_progress", "completed"):
                for m_skill in l.get("mapped_skills", []):
                    if m_skill.lower() not in seen_skills:
                        course_title = l.get("title", "Course")
                        evidence = f"Demonstrated through course enrolment in '{course_title}' (Status: {l.get('status')})"
                        inferred_results.append({
                            "skill_name": m_skill,
                            "category": "technical",
                            "confidence": 0.75 if l.get("status") == "in_progress" else 0.90,
                            "source": "learning_activity",
                            "evidence": evidence,
                            "is_inferred": True,
                            "verified": False
                        })
                        seen_skills.add(m_skill.lower())

        return {
            "employee_code": employee_code,
            "employee_name": emp["name"],
            "hidden_skills": inferred_results,
            "total_inferred": len(inferred_results)
        }
