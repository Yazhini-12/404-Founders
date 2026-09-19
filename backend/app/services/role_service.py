from backend.app.database import get_table_data

class RoleService:
    @staticmethod
    def get_all_departments():
        return get_table_data("departments")

    @staticmethod
    def get_all_roles():
        roles = get_table_data("roles")
        departments = {d["id"]: d["name"] for d in get_table_data("departments")}
        role_skills = get_table_data("role_skills")
        skills = {s["id"]: s for s in get_table_data("skills")}

        result = []
        for r in roles:
            r_copy = dict(r)
            r_copy["department_name"] = departments.get(r.get("department_id"), "Unknown")
            
            # Fetch skill requirements
            reqs = []
            for rs in role_skills:
                if rs["role_id"] == r["id"]:
                    s_info = skills.get(rs["skill_id"], {})
                    reqs.append({
                        "skill_id": rs["skill_id"],
                        "skill_name": s_info.get("name", "Unknown"),
                        "category": s_info.get("category", "technical"),
                        "required_level": rs["required_level"],
                        "importance": rs.get("importance", 1.0),
                        "is_critical": rs.get("is_critical", False)
                    })
            r_copy["required_skills"] = reqs
            result.append(r_copy)
        return result

    @staticmethod
    def get_role_by_id(role_id: str):
        roles = RoleService.get_all_roles()
        for r in roles:
            if r["id"] == role_id:
                return r
        return None

    @staticmethod
    def get_role_by_title(title: str):
        roles = RoleService.get_all_roles()
        for r in roles:
            if r["title"].lower() == title.lower():
                return r
        return None
