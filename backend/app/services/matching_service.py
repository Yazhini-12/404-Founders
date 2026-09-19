from backend.app.services.employee_service import EmployeeService
from backend.app.services.role_service import RoleService
from backend.app.database import get_table_data

class MatchingService:
    """
    Explainable Role Matching Service.
    Uses a deterministic weighted heuristic score (v1.0-weighted):
    - Skill Match: 60%
    - Experience Match: 15%
    - Career Interest Alignment: 15%
    - Learning Activity Alignment: 10%
    Designed so that a trained ML model (Random Forest / XGBoost) can be swapped in seamlessly.
    """

    @staticmethod
    def match_employee_to_role(employee_code: str, role_id: str):
        emp = EmployeeService.get_employee_by_code(employee_code)
        if not emp:
            return None

        role = RoleService.get_role_by_id(role_id)
        if not role:
            return None

        emp_skills = {s["skill_id"]: s for s in EmployeeService.get_employee_skills(emp["id"])}
        role_req_skills = role.get("required_skills", [])

        matched_skills = []
        missing_skills = []
        skills_to_improve = []

        total_weight = 0.0
        earned_weight = 0.0

        for req in role_req_skills:
            s_id = req["skill_id"]
            s_name = req["skill_name"]
            req_lvl = req["required_level"]
            weight = req["importance"] * (2.0 if req["is_critical"] else 1.0)
            total_weight += weight

            if s_id in emp_skills:
                curr_lvl = emp_skills[s_id]["proficiency"]
                if curr_lvl >= req_lvl:
                    matched_skills.append(s_name)
                    earned_weight += weight
                else:
                    skills_to_improve.append(s_name)
                    earned_weight += weight * (curr_lvl / req_lvl)
            else:
                missing_skills.append(s_name)

        # 1. Skill Match Score (0 - 100)
        skill_match_score = (earned_weight / total_weight * 100.0) if total_weight > 0 else 100.0

        # 2. Experience Match Score (0 - 100)
        req_exp = role.get("min_experience", 0)
        emp_exp = emp.get("experience_years", 0)
        if req_exp == 0:
            exp_match_score = 100.0
        elif emp_exp >= req_exp:
            exp_match_score = 100.0
        else:
            exp_match_score = (emp_exp / req_exp) * 100.0

        # 3. Career Interest Match Score (0 or 100)
        is_interest = (emp.get("career_interest_role_id") == role_id)
        interest_match_score = 100.0 if is_interest else 50.0

        # 4. Learning Alignment Score (0 - 100)
        emp_learning = EmployeeService.get_employee_learning(emp["id"])
        learning_aligned_count = 0
        missing_set = set(missing_skills).union(set(skills_to_improve))

        for l in emp_learning:
            for ms in l.get("mapped_skills", []):
                if ms in missing_set and l.get("status") in ("in_progress", "completed"):
                    learning_aligned_count += 1
                    break
        
        learning_score = min(100.0, learning_aligned_count * 50.0)

        # Weighted Final Composite Match Score
        final_score = round(
            (0.60 * skill_match_score) +
            (0.15 * exp_match_score) +
            (0.15 * interest_match_score) +
            (0.10 * learning_score), 1
        )

        if final_score >= 80.0:
            match_level = "High"
        elif final_score >= 55.0:
            match_level = "Medium"
        else:
            match_level = "Low"

        explanation = {
            "model_type": "Deterministic Weighted Heuristic (v1.0-weighted)",
            "weights": {
                "skill_match": "60%",
                "experience_match": "15%",
                "career_interest": "15%",
                "learning_alignment": "10%"
            },
            "sub_scores": {
                "skill_match_score": round(skill_match_score, 1),
                "experience_match_score": round(exp_match_score, 1),
                "career_interest_match_score": round(interest_match_score, 1),
                "learning_alignment_score": round(learning_score, 1)
            },
            "total_required_skills": len(role_req_skills),
            "matched_skill_count": len(matched_skills),
            "skills_to_improve_count": len(skills_to_improve),
            "missing_skill_count": len(missing_skills)
        }

        return {
            "role_id": role["id"],
            "role_title": role["title"],
            "department_name": role.get("department_name", "Unknown"),
            "match_score": final_score,
            "match_level": match_level,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "skills_to_improve": skills_to_improve,
            "explanation": explanation
        }

    @staticmethod
    def get_role_matches_for_employee(employee_code: str, exclude_current_role: bool = True):
        emp = EmployeeService.get_employee_by_code(employee_code)
        if not emp:
            return []

        all_roles = RoleService.get_all_roles()
        matches = []

        current_role_id = emp.get("current_role_id")

        for role in all_roles:
            if exclude_current_role and current_role_id and role["id"] == current_role_id:
                continue

            match_res = MatchingService.match_employee_to_role(employee_code, role["id"])
            if match_res:
                matches.append(match_res)

        # Sort by match_score descending
        matches.sort(key=lambda x: x["match_score"], reverse=True)
        return matches
