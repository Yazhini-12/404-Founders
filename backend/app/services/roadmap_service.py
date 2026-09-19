from backend.app.services.employee_service import EmployeeService
from backend.app.services.role_service import RoleService
from backend.app.services.skill_gap_service import SkillGapService
from backend.app.database import get_table_data

class RoadmapService:
    @staticmethod
    def generate_career_roadmap(employee_code: str, target_role_id: str):
        emp = EmployeeService.get_employee_by_code(employee_code)
        if not emp:
            return None

        target_role = RoleService.get_role_by_id(target_role_id)
        if not target_role:
            return None

        gap_analysis = SkillGapService.analyze_skill_gap(employee_code, target_role_id)
        recommendations = SkillGapService.get_learning_recommendations(employee_code, target_role_id)

        projects = get_table_data("projects")
        project_skills = get_table_data("project_skills")
        skills = {s["id"]: s["name"] for s in get_table_data("skills")}

        needed_skill_names = [item["skill_name"] for item in gap_analysis["missing_skills"] + gap_analysis["skills_to_improve"]]

        # Find a recommended internal project matching target skills
        recommended_project = None
        for p in projects:
            p_skills = [skills[ps["skill_id"]] for ps in project_skills if ps["project_id"] == p["id"] and ps["skill_id"] in skills]
            overlap = [sk for sk in p_skills if sk in needed_skill_names]
            if overlap:
                recommended_project = {
                    "project_id": p["id"],
                    "project_title": p["title"],
                    "description": p["description"],
                    "relevant_skills": overlap
                }
                break

        nodes = []
        step_idx = 1

        # Node 1: Current Role
        nodes.append({
            "step": step_idx,
            "title": f"Current Position: {emp.get('current_role_title', 'Employee')}",
            "type": "current_role",
            "description": f"Currently operating with {emp.get('experience_years', 0)} years experience.",
            "details": {
                "department": emp.get("department_name"),
                "experience_years": emp.get("experience_years")
            }
        })
        step_idx += 1

        # Node 2: Skill Gaps
        if needed_skill_names:
            nodes.append({
                "step": step_idx,
                "title": "Skill Development Targets",
                "type": "skill_upgrade",
                "description": f"Focus on building proficiency in {', '.join(needed_skill_names[:4])}.",
                "details": {
                    "missing": [s["skill_name"] for s in gap_analysis["missing_skills"]],
                    "needs_improvement": [s["skill_name"] for s in gap_analysis["skills_to_improve"]]
                }
            })
            step_idx += 1

        # Node 3: Recommended Courses
        if recommendations:
            top_rec = recommendations[0]
            nodes.append({
                "step": step_idx,
                "title": f"Upskill Course: {top_rec['course_title']}",
                "type": "recommended_course",
                "description": f"Enroll in '{top_rec['course_title']}' by {top_rec['provider']} to master {top_rec['target_skill']}.",
                "details": top_rec
            })
            step_idx += 1

        # Node 4: Practical Project
        if recommended_project:
            nodes.append({
                "step": step_idx,
                "title": f"Internal Stretch Project: {recommended_project['project_title']}",
                "type": "recommended_project",
                "description": f"Apply learned skills on {recommended_project['project_title']}.",
                "details": recommended_project
            })
            step_idx += 1

        # Node 5: Target Role Goal
        nodes.append({
            "step": step_idx,
            "title": f"Target Position: {target_role['title']}",
            "type": "target_role",
            "description": f"Readiness target for {target_role['title']} in {target_role.get('department_name', 'Org')}.",
            "details": {
                "department": target_role.get("department_name"),
                "min_experience_required": target_role.get("min_experience")
            }
        })

        return {
            "employee_code": employee_code,
            "employee_name": emp["name"],
            "current_role": emp.get("current_role_title", "Current Role"),
            "target_role": target_role["title"],
            "estimated_months": max(3, len(needed_skill_names) * 2),
            "nodes": nodes
        }
