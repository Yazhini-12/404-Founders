from backend.app.services.employee_service import EmployeeService
from backend.app.services.role_service import RoleService
from backend.app.services.readiness_service import ReadinessService
from backend.app.database import get_table_data
from typing import List, Dict, Any

class CareerSimulatorService:
    @staticmethod
    def simulate_career_impact(employee_code: str, target_role_id: str, skill_changes: List[Dict[str, Any]]):
        """
        Simulates hypothetical skill level changes on an in-memory copy of employee skills.
        DOES NOT PERSIST CHANGES TO DATABASE OR LOCAL STORAGE.
        """
        emp = EmployeeService.get_employee_by_code(employee_code)
        if not emp:
            return {"error": f"Employee {employee_code} not found.", "status_code": 404}

        role = RoleService.get_role_by_id(target_role_id)
        if not role:
            return {"error": f"Target Role ID {target_role_id} not found.", "status_code": 404}

        # 1. Calculate baseline readiness
        current_readiness_res = ReadinessService.calculate_career_readiness(employee_code, target_role_id)
        if not current_readiness_res:
            return {"error": "Could not calculate current readiness.", "status_code": 500}

        # 2. Prepare master skills lookup
        all_skills = {s["name"].lower(): s for s in get_table_data("skills")}

        # 3. Create IN-MEMORY COPY of employee skills
        original_skills = EmployeeService.get_employee_skills(emp["id"])
        simulated_skills = [dict(s) for s in original_skills]
        simulated_skills_map = {s["skill_id"]: s for s in simulated_skills}

        applied_changes = []

        for change in skill_changes:
            s_name = change.get("skill_name", "").strip()
            new_lvl = change.get("new_level")

            if not s_name:
                continue

            if new_lvl is None or not (1 <= new_lvl <= 5):
                return {
                    "error": f"Proficiency for '{s_name}' must be an integer between 1 and 5.",
                    "status_code": 400
                }

            s_name_lower = s_name.lower()
            if s_name_lower not in all_skills:
                return {
                    "error": f"Skill '{s_name}' is not recognized in taxonomy.",
                    "status_code": 400
                }

            skill_info = all_skills[s_name_lower]
            s_id = skill_info["id"]

            if s_id in simulated_skills_map:
                old_lvl = simulated_skills_map[s_id]["proficiency"]
                simulated_skills_map[s_id]["proficiency"] = new_lvl
            else:
                old_lvl = 0
                new_skill_entry = {
                    "skill_id": s_id,
                    "skill_name": skill_info["name"],
                    "category": skill_info.get("category", "technical"),
                    "proficiency": new_lvl,
                    "confidence": 0.9,
                    "source": "simulated",
                    "evidence": "Hypothetical simulated skill addition",
                    "is_inferred": False,
                    "verified": False
                }
                simulated_skills.append(new_skill_entry)
                simulated_skills_map[s_id] = new_skill_entry

            applied_changes.append({
                "skill": skill_info["name"],
                "from_level": old_lvl,
                "to_level": new_lvl
            })

        # 4. Calculate projected readiness using simulated in-memory list
        projected_readiness_res = ReadinessService.calculate_career_readiness(
            employee_code, target_role_id, custom_employee_skills=simulated_skills
        )

        curr_score = current_readiness_res["career_readiness_score"]
        proj_score = projected_readiness_res["career_readiness_score"]
        delta = proj_score - curr_score

        remaining_gaps = (
            projected_readiness_res["missing_skills"] + projected_readiness_res["skills_to_improve"]
        )

        changed_names = [c["skill"] for c in applied_changes]
        message = (
            f"Developing proficiency in {', '.join(changed_names)} projects a {delta:+} point "
            f"readiness shift for the {role['title']} position."
        )

        return {
            "status_code": 200,
            "data": {
                "employee_code": employee_code,
                "target_role": role["title"],
                "current_readiness": curr_score,
                "projected_readiness": proj_score,
                "readiness_improvement": delta,
                "current_label": current_readiness_res["readiness_label"],
                "projected_label": projected_readiness_res["readiness_label"],
                "simulated_changes": applied_changes,
                "remaining_gaps": remaining_gaps,
                "message": message
            }
        }
