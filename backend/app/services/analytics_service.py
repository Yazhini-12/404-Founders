from backend.app.database import get_table_data
from backend.app.services.employee_service import EmployeeService
from backend.app.services.role_service import RoleService
from backend.app.services.matching_service import MatchingService
from collections import Counter

class AnalyticsService:
    @staticmethod
    def get_hr_overview():
        employees = get_table_data("employees")
        departments = get_table_data("departments")
        roles = get_table_data("roles")
        skills = get_table_data("skills")

        top_skills = AnalyticsService.get_workforce_skills()[:5]
        gaps = AnalyticsService.get_organization_skill_gaps()[:5]

        return {
            "total_employees": len(employees),
            "total_departments": len(departments),
            "total_roles": len(roles),
            "total_skills": len(skills),
            "top_workforce_skills": top_skills,
            "critical_skill_gaps": gaps
        }

    @staticmethod
    def get_workforce_skills():
        emp_skills = get_table_data("employee_skills")
        skills = {s["id"]: s for s in get_table_data("skills")}

        stats = {}
        for es in emp_skills:
            s_id = es["skill_id"]
            if s_id not in stats:
                stats[s_id] = {"count": 0, "sum_prof": 0}
            stats[s_id]["count"] += 1
            stats[s_id]["sum_prof"] += es["proficiency"]

        result = []
        for s_id, data in stats.items():
            s_info = skills.get(s_id, {})
            result.append({
                "skill_name": s_info.get("name", "Unknown"),
                "category": s_info.get("category", "technical"),
                "employee_count": data["count"],
                "avg_proficiency": round(data["sum_prof"] / data["count"], 2)
            })

        result.sort(key=lambda x: x["employee_count"], reverse=True)
        return result

    @staticmethod
    def get_organization_skill_gaps():
        role_skills = get_table_data("role_skills")
        emp_skills = get_table_data("employee_skills")
        skills = {s["id"]: s["name"] for s in get_table_data("skills")}

        # Count total role demand vs actual employee supply
        role_demand = Counter()
        for rs in role_skills:
            role_demand[rs["skill_id"]] += 1

        emp_supply = Counter()
        for es in emp_skills:
            emp_supply[es["skill_id"]] += 1

        gaps = []
        for s_id, demand in role_demand.items():
            supply = emp_supply.get(s_id, 0)
            if demand > supply:
                gaps.append({
                    "skill_name": skills.get(s_id, "Unknown"),
                    "roles_requiring": demand,
                    "employees_possessing": supply,
                    "gap_deficit": demand - supply
                })

        gaps.sort(key=lambda x: x["gap_deficit"], reverse=True)
        return gaps

    @staticmethod
    def get_emerging_skills():
        emp_learning = get_table_data("employee_learning")
        course_skills = get_table_data("course_skills")
        skills = {s["id"]: s["name"] for s in get_table_data("skills")}

        skill_interest = Counter()
        for el in emp_learning:
            for cs in course_skills:
                if cs["course_id"] == el["course_id"]:
                    skill_interest[cs["skill_id"]] += 1

        result = []
        for s_id, count in skill_interest.most_common(10):
            result.append({
                "skill_name": skills.get(s_id, "Unknown"),
                "learning_activities_count": count,
                "trend_status": "High Growth"
            })

        return result

    @staticmethod
    def get_ranked_candidates_for_role(role_id: str):
        employees = EmployeeService.get_all_employees()
        ranked = []

        for emp in employees:
            match_res = MatchingService.match_employee_to_role(emp["employee_code"], role_id)
            if match_res:
                ranked.append({
                    "employee_code": emp["employee_code"],
                    "name": emp["name"],
                    "current_role": emp.get("current_role_title"),
                    "department": emp.get("department_name"),
                    "experience_years": emp.get("experience_years"),
                    "match_score": match_res["match_score"],
                    "match_level": match_res["match_level"],
                    "matched_skills": match_res["matched_skills"],
                    "missing_skills": match_res["missing_skills"]
                })

        ranked.sort(key=lambda x: x["match_score"], reverse=True)
        return ranked

    @staticmethod
    def talent_search(skills_filter: str = None, department_filter: str = None, min_experience: int = None):
        employees = EmployeeService.get_all_employees()
        filtered = []

        target_skills = [s.strip().lower() for s in skills_filter.split(",")] if skills_filter else []

        for emp in employees:
            # Check experience
            if min_experience is not None and emp.get("experience_years", 0) < min_experience:
                continue

            # Check department
            if department_filter and emp.get("department_name", "").lower() != department_filter.lower():
                continue

            # Check skills
            if target_skills:
                user_skills = EmployeeService.get_employee_skills(emp["id"])
                user_skill_names = [s["skill_name"].lower() for s in user_skills]
                has_all_skills = all(ts in user_skill_names for ts in target_skills)
                if not has_all_skills:
                    continue

            filtered.append(emp)

        return filtered
