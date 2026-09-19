from backend.app.services.employee_service import EmployeeService
from backend.app.services.role_service import RoleService

class SkillGapService:
    @staticmethod
    def analyze_skill_gap(employee_code: str, role_id: str):
        emp = EmployeeService.get_employee_by_code(employee_code)
        if not emp:
            return None

        role = RoleService.get_role_by_id(role_id)
        if not role:
            return None

        emp_skills = {s["skill_id"]: s for s in EmployeeService.get_employee_skills(emp["id"])}
        role_reqs = role.get("required_skills", [])

        matched_items = []
        missing_items = []
        improvement_items = []

        for req in role_reqs:
            s_id = req["skill_id"]
            s_name = req["skill_name"]
            cat = req["category"]
            req_lvl = req["required_level"]

            if s_id not in emp_skills:
                item = {
                    "skill_id": s_id,
                    "skill_name": s_name,
                    "category": cat,
                    "current_level": 0,
                    "required_level": req_lvl,
                    "gap_type": "missing"
                }
                missing_items.append(item)
            else:
                curr_lvl = emp_skills[s_id]["proficiency"]
                if curr_lvl < req_lvl:
                    item = {
                        "skill_id": s_id,
                        "skill_name": s_name,
                        "category": cat,
                        "current_level": curr_lvl,
                        "required_level": req_lvl,
                        "gap_type": "needs_improvement"
                    }
                    improvement_items.append(item)
                else:
                    item = {
                        "skill_id": s_id,
                        "skill_name": s_name,
                        "category": cat,
                        "current_level": curr_lvl,
                        "required_level": req_lvl,
                        "gap_type": "matched"
                    }
                    matched_items.append(item)

        return {
            "employee_code": employee_code,
            "target_role_id": role["id"],
            "target_role_title": role["title"],
            "matched_skills": matched_items,
            "missing_skills": missing_items,
            "skills_to_improve": improvement_items
        }

    @staticmethod
    def get_learning_recommendations(employee_code: str, role_id: str):
        gap = SkillGapService.analyze_skill_gap(employee_code, role_id)
        if not gap:
            return []

        needed_skill_names = [item["skill_name"] for item in gap["missing_skills"] + gap["skills_to_improve"]]
        needed_skill_ids = [item["skill_id"] for item in gap["missing_skills"] + gap["skills_to_improve"]]

        from backend.app.database import get_table_data
        courses = get_table_data("courses")
        course_skills = get_table_data("course_skills")
        skills = {s["id"]: s["name"] for s in get_table_data("skills")}

        recommendations = []
        for course in courses:
            c_skills = [skills[cs["skill_id"]] for cs in course_skills if cs["course_id"] == course["id"] and cs["skill_id"] in skills]
            for target in c_skills:
                if target in needed_skill_names:
                    recommendations.append({
                        "course_id": course["id"],
                        "course_title": course["title"],
                        "provider": course.get("provider", "NovaTech Learning"),
                        "difficulty": course.get("difficulty", "Intermediate"),
                        "target_skill": target,
                        "reason": f"Fills target role skill requirement for {target}."
                    })
                    break
        return recommendations
