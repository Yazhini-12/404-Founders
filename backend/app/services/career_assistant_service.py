"""
Grounded AI Career Assistant Service using Google Gemini & Fallback Provider.
Gather authentic backend employee context and grounds Gemini responses strictly in verified data.
Includes robust fallback error handling so backend never crashes if Gemini is unavailable.
"""

import os
import json
import re
from typing import Dict, Any, Optional

from backend.app.config import settings
from backend.app.services.employee_service import EmployeeService
from backend.app.services.role_service import RoleService
from backend.app.services.matching_service import MatchingService
from backend.app.services.skill_gap_service import SkillGapService
from backend.app.services.readiness_service import ReadinessService
from backend.app.services.roadmap_service import RoadmapService
from backend.app.services.hidden_skill_service import HiddenSkillService
from backend.app.services.career_simulator_service import CareerSimulatorService

SYSTEM_INSTRUCTION = """You are an AI Career Mobility Assistant inside an organization's internal talent platform (NovaTech Solutions).

Answer the employee using ONLY the supplied employee and career context for factual claims about their profile.

Do not invent skills, match scores, readiness scores, projects, courses, experience, or job requirements.

Role-match scores, skill gaps, and career-readiness values are calculated by backend services and must be treated as authoritative platform values.

Explain results clearly and constructively.

Distinguish:
- current verified information
- inferred skills
- hypothetical/projected simulator results

Never claim that a recommendation guarantees promotion, selection, eligibility, salary improvement, or career success.

If information needed to answer the question is not present in the provided context, say that the platform does not currently have enough information.

Do not recommend the employee's current role as a future career opportunity.

Keep answers concise, useful, and career-focused."""


class CareerAssistantService:
    @staticmethod
    def gather_employee_career_context(employee_code: str, user_message: str) -> Optional[Dict[str, Any]]:
        """Gathers full verified backend context for an employee."""
        emp = EmployeeService.get_employee_by_code(employee_code)
        if not emp:
            return None

        emp_id = emp["id"]

        # 1. Profile & Passport
        passport = EmployeeService.get_skill_passport(employee_code)

        # 2. Hidden Skills
        hidden_skills_data = HiddenSkillService.discover_hidden_skills(employee_code)

        # 3. Employee-Facing Future Role Matches (current role excluded)
        matches = MatchingService.get_role_matches_for_employee(employee_code, exclude_current_role=True)
        top_matches = matches[:3] if matches else []

        # Determine target role (from query, career interest, or top match)
        target_role_info = None
        target_role_id = emp.get("career_interest_role_id")
        
        # Check if user message explicitly mentions a role
        msg_lower = user_message.lower()
        all_roles = RoleService.get_all_roles()
        for r in all_roles:
            if r["title"].lower() in msg_lower:
                target_role_id = r["id"]
                target_role_info = r
                break
        
        if not target_role_id and top_matches:
            target_role_id = top_matches[0]["role_id"]
            target_role_info = RoleService.get_role_by_id(target_role_id)
        elif target_role_id and not target_role_info:
            target_role_info = RoleService.get_role_by_id(target_role_id)

        # 4. Target Role Deep Data (Readiness, Skill Gap, Recommendations, Roadmap)
        readiness_data = None
        gap_data = None
        recommendations = []
        roadmap_data = None

        if target_role_id:
            readiness_data = ReadinessService.calculate_career_readiness(employee_code, target_role_id)
            gap_data = SkillGapService.analyze_skill_gap(employee_code, target_role_id)
            recommendations = SkillGapService.get_learning_recommendations(employee_code, target_role_id)
            roadmap_data = RoadmapService.generate_career_roadmap(employee_code, target_role_id)

        # 5. Check for What-If Simulation intent in message (e.g. "what if I learn TensorFlow")
        simulation_data = None
        if "what if" in msg_lower and target_role_id:
            sim_changes = []
            if "tensorflow" in msg_lower:
                sim_changes.append({"skill_name": "TensorFlow", "new_level": 3})
            if "machine learning" in msg_lower:
                sim_changes.append({"skill_name": "Machine Learning", "new_level": 4})
            if "statistics" in msg_lower:
                sim_changes.append({"skill_name": "Statistics", "new_level": 3})
            
            if sim_changes:
                sim_res = CareerSimulatorService.simulate_career_impact(employee_code, target_role_id, sim_changes)
                if sim_res.get("status_code") == 200:
                    simulation_data = sim_res["data"]

        context = {
            "employee": {
                "code": emp["employee_code"],
                "name": emp["name"],
                "current_role": emp.get("current_role_title"),
                "department": emp.get("department_name"),
                "experience_years": emp.get("experience_years"),
                "career_interest": emp.get("career_interest_role_title")
            },
            "explicit_skills": [f"{s['skill_name']} (Lvl {s['proficiency']})" for s in passport.get("explicit_skills", [])],
            "inferred_hidden_skills": hidden_skills_data.get("hidden_skills", []) if hidden_skills_data else [],
            "top_future_role_matches": top_matches,
            "target_role_evaluating": target_role_info.get("title") if target_role_info else None,
            "career_readiness": readiness_data,
            "skill_gap": gap_data,
            "learning_recommendations": recommendations,
            "career_roadmap": roadmap_data,
            "simulated_what_if": simulation_data
        }

        return context

    @staticmethod
    def generate_fallback_response(context: Dict[str, Any], user_message: str) -> str:
        """Constructs a deterministic, structured natural-language response when Gemini is unconfigured or unavailable."""
        emp = context["employee"]
        msg_lower = user_message.lower()
        top_matches = context.get("top_future_role_matches", [])
        readiness = context.get("career_readiness")
        gaps = context.get("skill_gap")
        recs = context.get("learning_recommendations", [])
        roadmap = context.get("career_roadmap")
        hidden = context.get("inferred_hidden_skills", [])
        sim = context.get("simulated_what_if")

        # 1. Hidden Skills Question
        if "hidden" in msg_lower or "passport" in msg_lower:
            reply = f"Hello {emp['name']}! Based on your Skill Passport as a {emp['current_role']}:\n\n"
            reply += f"**Explicit Skills**: {', '.join(context['explicit_skills'][:5])}\n\n"
            if hidden:
                reply += "**Evidence-Based Inferred Skills**:\n"
                for hs in hidden:
                    reply += f"- **{hs['skill_name']}** ({hs['category']}): {hs['evidence']}\n"
            else:
                reply += "No additional inferred skills identified beyond explicit passport entries."
            return reply

        # 2. What-If Simulation Question
        if sim or "what if" in msg_lower:
            if sim:
                changes_str = ", ".join([f"{c['skill']} (Lvl {c['from_level']} -> {c['to_level']})" for c in sim['simulated_changes']])
                gaps_str = ", ".join(sim['remaining_gaps']) if sim['remaining_gaps'] else "None"
                reply = (
                    f"**Hypothetical What-If Simulation Result for {sim['target_role']}**:\n\n"
                    f"- Current Readiness: **{sim['current_readiness']}%** ({sim['current_label']})\n"
                    f"- Projected Readiness: **{sim['projected_readiness']}%** ({sim['projected_label']})\n"
                    f"- Impact Delta: **{sim['readiness_improvement']:+} points**\n"
                    f"- Simulated Changes: {changes_str}\n"
                    f"- Remaining Gaps: {gaps_str}\n\n"
                    f"*{sim['message']} (Note: This is a hypothetical simulation and does not persist changes to your profile).*"
                )
                return reply

        # 3. What roles suitable for / Future opportunities
        if "suitable" in msg_lower or "roles am i" in msg_lower or "opportunity" in msg_lower:
            reply = f"Hello {emp['name']}! Based on your 3 years of experience as a {emp['current_role']}, your top internal future career opportunities are:\n\n"
            for idx, m in enumerate(top_matches, 1):
                reply += f"{idx}. **{m['role_title']}** ({m['department_name']}) — **{m['match_score']}% Match** ({m['match_level']})\n"
                reply += f"   - Matched Skills: {', '.join(m['matched_skills'][:4])}\n"
                if m.get('missing_skills'):
                    reply += f"   - Key Gaps: {', '.join(m['missing_skills'][:3])}\n"
                reply += "\n"
            return reply

        # 4. Readiness / Roadmap / How to become
        target_title = context.get("target_role_evaluating") or emp.get("career_interest") or "Machine Learning Engineer"
        reply = (
            f"Hello {emp['name']}! I analyzed your profile as a {emp['current_role']}.\n\n"
            f"Your top future career match is **{target_title}**"
        )
        if top_matches and top_matches[0]["role_title"].lower() == target_title.lower():
            reply += f" with a **{top_matches[0]['match_score']}% match score** ({top_matches[0]['match_level']}).\n\n"
        else:
            reply += ".\n\n"

        if readiness:
            reply += (
                f"Your **Career Readiness Score** for {readiness['target_role']} is **{readiness['career_readiness_score']}%** "
                f"({readiness['readiness_label']}).\n"
                f"Breakdown — Technical: {readiness['breakdown']['technical_readiness']}% | "
                f"Experience: {readiness['breakdown']['experience_readiness']}% | "
                f"Transferable: {readiness['breakdown']['transferable_skill_readiness']}%\n\n"
            )

        if gaps:
            if gaps.get("matched_skills"):
                matched_names = [s["skill_name"] for s in gaps["matched_skills"]]
                reply += f"**Matched Skills**: {', '.join(matched_names)}\n"
            if gaps.get("skills_to_improve"):
                imp_names = [s["skill_name"] for s in gaps["skills_to_improve"]]
                reply += f"**Needs Improvement**: {', '.join(imp_names)}\n"
            if gaps.get("missing_skills"):
                miss_names = [s["skill_name"] for s in gaps["missing_skills"]]
                reply += f"**Missing Skills**: {', '.join(miss_names)}\n\n"

        if recs:
            reply += f"**Recommended Courses**: {', '.join([r['course_title'] for r in recs[:2]])}\n"

        if roadmap:
            reply += f"**Roadmap**: {roadmap['nodes'][0]['title']} ➔ {roadmap['nodes'][-1]['title']} (Estimated {roadmap['estimated_months']} months)\n"

        return reply

    @staticmethod
    def answer_career_question(employee_code: str, message: str) -> Dict[str, Any]:
        """
        Main entry point for AI Career Assistant.
        Attempts Gemini API call when GEMINI_API_KEY is configured.
        Falls back to structured deterministic generator if unconfigured or API fails.
        """
        context = CareerAssistantService.gather_employee_career_context(employee_code, message)
        if not context:
            return {"error": f"Employee {employee_code} not found.", "status_code": 404}

        api_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY", "")

        gemini_success = False
        ai_response_text = ""
        mode = "fallback"

        if api_key and "your-gemini" not in api_key.lower():
            try:
                from google import genai
                from google.genai import types

                client = genai.Client(api_key=api_key)
                prompt = f"Employee Question: {message}\n\nEmployee Verified Career Context:\n{json.dumps(context, indent=2)}"

                # Try models in order of preference
                for model_name in ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-2.5-flash"]:
                    try:
                        response = client.models.generate_content(
                            model=model_name,
                            contents=prompt,
                            config=types.GenerateContentConfig(
                                system_instruction=SYSTEM_INSTRUCTION,
                                temperature=0.2
                            )
                        )
                        if response and response.text:
                            ai_response_text = response.text.strip()
                            gemini_success = True
                            mode = "gemini"
                            break
                    except Exception:
                        continue
            except Exception as e:
                print(f"[WARNING] Gemini API call failed: {e}. Falling back to deterministic Career Assistant.")
                gemini_success = False

        if not gemini_success:
            ai_response_text = CareerAssistantService.generate_fallback_response(context, message)
            mode = "fallback"

        return {
            "status_code": 200,
            "data": {
                "employee_code": employee_code,
                "user_message": message,
                "ai_response": ai_response_text,
                "mode": mode,
                "context_retrieved": {
                    "employee_name": context["employee"]["name"],
                    "current_role": context["employee"]["current_role"],
                    "target_role": context.get("target_role_evaluating"),
                    "top_future_match": context.get("top_future_role_matches")[0] if context.get("top_future_role_matches") else None,
                    "career_readiness": context.get("career_readiness")
                },
                "llm_connected": gemini_success
            }
        }
