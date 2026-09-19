from backend.app.database import get_table_data

class EmployeeService:
    @staticmethod
    def get_all_employees():
        employees = get_table_data("employees")
        departments = {d["id"]: d["name"] for d in get_table_data("departments")}
        roles = {r["id"]: r["title"] for r in get_table_data("roles")}

        result = []
        for e in employees:
            e_copy = dict(e)
            e_copy["department_name"] = departments.get(e.get("department_id"), "Unknown")
            e_copy["current_role_title"] = roles.get(e.get("current_role_id"), "Unassigned")
            e_copy["career_interest_role_title"] = roles.get(e.get("career_interest_role_id"), "Unassigned")
            result.append(e_copy)
        return result

    @staticmethod
    def get_employee_by_code(employee_code: str):
        employees = EmployeeService.get_all_employees()
        for e in employees:
            if e["employee_code"].upper() == employee_code.upper():
                return e
        return None

    @staticmethod
    def get_employee_skills(employee_id: str):
        emp_skills = get_table_data("employee_skills")
        skills = {s["id"]: s for s in get_table_data("skills")}

        user_skills = []
        for es in emp_skills:
            if es["employee_id"] == employee_id:
                s_info = skills.get(es["skill_id"], {})
                user_skills.append({
                    "skill_id": es["skill_id"],
                    "skill_name": s_info.get("name", "Unknown Skill"),
                    "category": s_info.get("category", "technical"),
                    "proficiency": es["proficiency"],
                    "confidence": es.get("confidence", 1.0),
                    "source": es.get("source", "self_reported"),
                    "evidence": es.get("evidence"),
                    "is_inferred": es.get("is_inferred", False),
                    "verified": es.get("verified", False)
                })
        return user_skills

    @staticmethod
    def get_employee_work_history(employee_id: str):
        history = get_table_data("work_history")
        return [h for h in history if h["employee_id"] == employee_id]

    @staticmethod
    def get_employee_projects(employee_id: str):
        emp_projs = get_table_data("employee_projects")
        projects = {p["id"]: p for p in get_table_data("projects")}
        proj_skills = get_table_data("project_skills")
        skills = {s["id"]: s["name"] for s in get_table_data("skills")}

        result = []
        for ep in emp_projs:
            if ep["employee_id"] == employee_id:
                p_info = projects.get(ep["project_id"], {})
                used_skills = [skills[ps["skill_id"]] for ps in proj_skills if ps["project_id"] == ep["project_id"] and ps["skill_id"] in skills]
                result.append({
                    "project_id": ep["project_id"],
                    "title": p_info.get("title", "Project"),
                    "project_role": ep.get("project_role"),
                    "contribution": ep.get("contribution"),
                    "start_date": ep.get("start_date"),
                    "end_date": ep.get("end_date"),
                    "skills_used": used_skills
                })
        return result

    @staticmethod
    def get_employee_learning(employee_id: str):
        emp_learning = get_table_data("employee_learning")
        courses = {c["id"]: c for c in get_table_data("courses")}
        course_skills = get_table_data("course_skills")
        skills = {s["id"]: s["name"] for s in get_table_data("skills")}

        result = []
        for el in emp_learning:
            if el["employee_id"] == employee_id:
                c_info = courses.get(el["course_id"], {})
                c_skills = [skills[cs["skill_id"]] for cs in course_skills if cs["course_id"] == el["course_id"] and cs["skill_id"] in skills]
                result.append({
                    "course_id": el["course_id"],
                    "title": c_info.get("title", "Course"),
                    "provider": c_info.get("provider", "Internal"),
                    "status": el.get("status", "not_started"),
                    "progress": el.get("progress", 0),
                    "score": el.get("score"),
                    "started_at": el.get("started_at"),
                    "completed_at": el.get("completed_at"),
                    "mapped_skills": c_skills
                })
        return result

    @staticmethod
    def get_skill_passport(employee_code: str):
        emp = EmployeeService.get_employee_by_code(employee_code)
        if not emp:
            return None

        emp_id = emp["id"]
        all_skills = EmployeeService.get_employee_skills(emp_id)

        explicit_skills = [s for s in all_skills if not s["is_inferred"]]
        inferred_skills = [s for s in all_skills if s["is_inferred"]]
        transferable_skills = [s for s in all_skills if s["category"] in ("transferable", "soft")]

        projects = EmployeeService.get_employee_projects(emp_id)
        learning = EmployeeService.get_employee_learning(emp_id)
        work_history = EmployeeService.get_employee_work_history(emp_id)

        return {
            "employee": emp,
            "explicit_skills": explicit_skills,
            "inferred_skills": inferred_skills,
            "transferable_skills": transferable_skills,
            "projects": projects,
            "learning": learning,
            "work_history": work_history
        }
