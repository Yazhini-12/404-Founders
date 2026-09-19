from backend.app.services.employee_service import EmployeeService
from backend.app.services.role_service import RoleService
from backend.app.services.skill_gap_service import SkillGapService

class ReadinessService:
    @staticmethod
    def calculate_career_readiness(employee_code: str, role_id: str, custom_employee_skills: list = None):
        """
        Calculates Explainable Career Readiness Score (0-100).
        Components:
        - Technical Skill Readiness: 50%
        - Experience Readiness: 20%
        - Transferable Skill Readiness: 15%
        - Learning Alignment: 15%
        
        Optional custom_employee_skills allows what-if in-memory simulation without modifying storage.
        """
        emp = EmployeeService.get_employee_by_code(employee_code)
        if not emp:
            return None

        role = RoleService.get_role_by_id(role_id)
        if not role:
            return None

        # Fetch skills (or use custom simulated list)
        if custom_employee_skills is not None:
            emp_skills = {s["skill_id"]: s for s in custom_employee_skills}
        else:
            emp_skills = {s["skill_id"]: s for s in EmployeeService.get_employee_skills(emp["id"])}

        role_reqs = role.get("required_skills", [])

        # 1. TECHNICAL SKILL READINESS (50%)
        tech_reqs = [r for r in role_reqs if r.get("category", "technical") == "technical"]
        if not tech_reqs:
            tech_reqs = role_reqs  # Fallback to all requirements if uncategorized

        tech_total_weight = 0.0
        tech_earned_weight = 0.0

        matched_skills = []
        skills_to_improve = []
        missing_skills = []

        for req in role_reqs:
            s_id = req["skill_id"]
            s_name = req["skill_name"]
            req_lvl = req["required_level"]
            weight = req.get("importance", 1.0) * (1.5 if req.get("is_critical", False) else 1.0)
            
            tech_total_weight += weight

            if s_id in emp_skills:
                curr_lvl = emp_skills[s_id]["proficiency"]
                if curr_lvl >= req_lvl:
                    matched_skills.append(s_name)
                    tech_earned_weight += weight
                else:
                    skills_to_improve.append(s_name)
                    tech_earned_weight += weight * (curr_lvl / req_lvl)
            else:
                missing_skills.append(s_name)

        technical_readiness = (tech_earned_weight / tech_total_weight * 100.0) if tech_total_weight > 0 else 100.0
        technical_readiness = min(100.0, max(0.0, technical_readiness))

        # 2. EXPERIENCE READINESS (20%)
        min_exp = role.get("min_experience", 0)
        emp_exp = emp.get("experience_years", 0)
        if min_exp <= 0:
            experience_readiness = 100.0
        else:
            experience_readiness = min(100.0, (emp_exp / min_exp) * 100.0)

        # 3. TRANSFERABLE SKILL READINESS (15%)
        transferable_reqs = [r for r in role_reqs if r.get("category") in ("soft", "transferable")]
        if transferable_reqs:
            trans_earned = 0.0
            trans_total = 0.0
            for tr in transferable_reqs:
                s_id = tr["skill_id"]
                w = tr.get("importance", 1.0)
                trans_total += w
                if s_id in emp_skills:
                    trans_earned += w * min(1.0, emp_skills[s_id]["proficiency"] / tr["required_level"])
            transferable_readiness = (trans_earned / trans_total * 100.0) if trans_total > 0 else 100.0
        else:
            # Evaluate possessed soft/transferable skills
            trans_skills = [s for s in emp_skills.values() if s.get("category") in ("soft", "transferable")]
            if trans_skills:
                avg_prof = sum(s["proficiency"] for s in trans_skills) / len(trans_skills)
                transferable_readiness = (avg_prof / 5.0) * 100.0
            else:
                transferable_readiness = 70.0  # Baseline neutral

        transferable_readiness = min(100.0, max(0.0, transferable_readiness))

        # 4. LEARNING ALIGNMENT (15%)
        emp_learning = EmployeeService.get_employee_learning(emp["id"])
        gap_skill_names = set(missing_skills).union(set(skills_to_improve))

        learning_aligned_count = 0
        for l in emp_learning:
            for ms in l.get("mapped_skills", []):
                if ms in gap_skill_names and l.get("status") in ("in_progress", "completed"):
                    learning_aligned_count += 1
                    break

        if gap_skill_names:
            learning_alignment = min(100.0, learning_aligned_count * 50.0 + (30.0 if emp_learning else 0.0))
        else:
            learning_alignment = 100.0

        # COMPOSITE SCORE (0-100)
        readiness_score = round(
            (0.50 * technical_readiness) +
            (0.20 * experience_readiness) +
            (0.15 * transferable_readiness) +
            (0.15 * learning_alignment)
        )
        readiness_score = min(100, max(0, readiness_score))

        # READINESS LABELS
        if readiness_score >= 80:
            label = "Role Ready"
        elif readiness_score >= 60:
            label = "Near Ready"
        elif readiness_score >= 40:
            label = "Developing"
        else:
            label = "Foundation Stage"

        # EXPLANATIONS
        explanation = []
        if matched_skills:
            explanation.append(f"Strong proficiency in {', '.join(matched_skills[:3])} aligns with target requirements.")
        if skills_to_improve:
            explanation.append(f"Skills needing enhancement: {', '.join(skills_to_improve)}.")
        if missing_skills:
            explanation.append(f"Missing required competencies: {', '.join(missing_skills)}.")
        if learning_aligned_count > 0:
            explanation.append("Active learning coursework directly addresses identified skill gaps.")

        return {
            "employee_code": employee_code,
            "target_role": role["title"],
            "career_readiness_score": readiness_score,
            "readiness_label": label,
            "breakdown": {
                "technical_readiness": round(technical_readiness, 1),
                "experience_readiness": round(experience_readiness, 1),
                "transferable_skill_readiness": round(transferable_readiness, 1),
                "learning_alignment": round(learning_alignment, 1)
            },
            "matched_skills": matched_skills,
            "skills_to_improve": skills_to_improve,
            "missing_skills": missing_skills,
            "explanation": explanation
        }
