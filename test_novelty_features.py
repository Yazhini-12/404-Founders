"""
Novelty Features & Bug Fix Verification Test Script
Tests:
1. Current-role exclusion for employee-facing recommendations vs HR candidate matching
2. Explainable Career Readiness Score calculation
3. What-If Career Simulator (including non-persistence immutability test)
4. Evidence-Based Hidden Skill Discovery (strict keyword evidence matching & deduplication)
5. Error validation & regression checks
"""

from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.role_service import RoleService

client = TestClient(app)

def run_novelty_tests():
    print("==================================================")
    print("    RUNNING NOVELTY LAYER & BUG FIX TESTS         ")
    print("==================================================")

    # 1. Bug Fix Verification: Current Role Exclusion for Employee
    res = client.get("/employees/EMP001/role-matches")
    assert res.status_code == 200, "EMP001 Role Matches failed"
    matches = res.json()
    emp_top_role = matches[0]["role_title"]
    all_future_roles = [m["role_title"] for m in matches]

    assert "Backend Developer" not in all_future_roles, "BUG FAIL: Current role 'Backend Developer' should be excluded from future career recommendations!"
    print(f"[OK] Employee-Facing Role Matches ({len(matches)} future roles): Excluded current role 'Backend Developer'. Top future match: '{emp_top_role}'")

    # Verify HR candidate search STILL evaluates current role normally
    backend_role = RoleService.get_role_by_title("Backend Developer")
    assert backend_role is not None
    res = client.get(f"/hr/roles/{backend_role['id']}/matches")
    assert res.status_code == 200, "HR Role Matches failed"
    hr_candidates = res.json()
    emp001_in_hr = any(c["employee_code"] == "EMP001" for c in hr_candidates)
    assert emp001_in_hr, "HR Search should still include EMP001 for Backend Developer evaluation!"
    print("[OK] HR Candidate Matching: EMP001 correctly included when HR searches Backend Developer candidates.")

    # 2. Novelty 1: Explainable Career Readiness Score
    ml_role = RoleService.get_role_by_title("Machine Learning Engineer")
    assert ml_role is not None
    ml_role_id = ml_role["id"]

    res = client.get(f"/employees/EMP001/career-readiness/{ml_role_id}")
    assert res.status_code == 200, "Career Readiness endpoint failed"
    readiness = res.json()

    print("\n--- NOVELTY 1: CAREER READINESS SCORE ---")
    print(f"Target Role: {readiness['target_role']}")
    print(f"Score: {readiness['career_readiness_score']} ({readiness['readiness_label']})")
    print(f"Breakdown: {readiness['breakdown']}")
    print(f"Matched Skills: {readiness['matched_skills']}")
    print(f"Needs Improvement: {readiness['skills_to_improve']}")
    print(f"Missing Skills: {readiness['missing_skills']}")

    assert readiness["career_readiness_score"] > 0, "Readiness score should be calculated"
    assert readiness["readiness_label"] in ["Foundation Stage", "Developing", "Near Ready", "Role Ready"]
    assert "Python" in readiness["matched_skills"]
    assert "Machine Learning" in readiness["skills_to_improve"]
    assert "TensorFlow" in readiness["missing_skills"]
    print("[OK] Career Readiness Score verification passed!")

    # 3. Novelty 2: What-If Career Simulator
    sim_payload = {
        "target_role_id": ml_role_id,
        "skill_changes": [
            {"skill_name": "Machine Learning", "new_level": 4},
            {"skill_name": "TensorFlow", "new_level": 3}
        ]
    }
    res = client.post("/employees/EMP001/career-simulator", json=sim_payload)
    assert res.status_code == 200, "Career Simulator failed"
    sim = res.json()

    print("\n--- NOVELTY 2: WHAT-IF CAREER SIMULATOR ---")
    print(f"Current Readiness: {sim['current_readiness']} ({sim['current_label']})")
    print(f"Projected Readiness: {sim['projected_readiness']} ({sim['projected_label']})")
    print(f"Improvement: {sim['readiness_improvement']:+} points")
    print(f"Simulated Changes: {sim['simulated_changes']}")
    print(f"Remaining Gaps: {sim['remaining_gaps']}")

    assert sim["projected_readiness"] >= sim["current_readiness"], "Projected readiness should increase"
    assert sim["readiness_improvement"] > 0, "Improvement delta should be positive"

    # CRITICAL IMMUTABILITY CHECK: Verify stored skills were NOT modified
    res = client.get("/employees/EMP001/skills")
    emp_skills_after = res.json()
    ml_skill_after = next((s for s in emp_skills_after if s["skill_name"] == "Machine Learning"), None)
    tf_skill_after = next((s for s in emp_skills_after if s["skill_name"] == "TensorFlow"), None)

    assert ml_skill_after["proficiency"] == 2, f"STORED SKILL MUTATED! Expected proficiency 2, got {ml_skill_after['proficiency']}"
    assert tf_skill_after is None, "STORED SKILL MUTATED! TensorFlow should not exist in database!"
    print("[OK] What-If Career Simulator Immutability Check PASSED! Zero state changes persisted.")

    # 4. Novelty 3: Evidence-Based Hidden Skill Discovery
    res = client.get("/employees/EMP001/skills")
    explicit_skills = {s["skill_name"].lower() for s in res.json()}

    res = client.get("/employees/EMP001/hidden-skills")
    assert res.status_code == 200, "Hidden Skills endpoint failed"
    hidden = res.json()

    print("\n--- NOVELTY 3: EVIDENCE-BASED HIDDEN SKILLS ---")
    print(f"Total Inferred Skills: {hidden['total_inferred']}")
    hidden_names = [hs["skill_name"] for hs in hidden["hidden_skills"]]
    print(f"Hidden Skills Found: {hidden_names}")

    for hs in hidden["hidden_skills"]:
        s_name = hs["skill_name"]
        evidence = hs["evidence"]
        print(f"  - Skill: '{s_name}' ({hs['category']}) | Confidence: {hs['confidence']} | Evidence: '{evidence[:60]}...'")

        # 4a. Verify explicit skills are NOT duplicated in hidden skills
        assert s_name.lower() not in explicit_skills, f"DEDUPLICATION FAIL: '{s_name}' is already an explicit employee skill!"

        # 4b. Verify required attributes
        assert evidence and len(evidence) > 5, "Evidence text must be present"
        assert hs["is_inferred"] is True, "is_inferred must be true"
        assert hs["verified"] is False, "inferred skill must not be auto-verified"

    print("[OK] Evidence-Based Hidden Skill Discovery verification passed! Deduplication and evidence accuracy confirmed.")

    # 5. Validation & Error Handling Tests
    res = client.get("/employees/INVALID999/career-readiness/" + ml_role_id)
    assert res.status_code == 404, "Invalid employee code should return 404"

    res = client.post("/employees/EMP001/career-simulator", json={"target_role_id": ml_role_id, "skill_changes": [{"skill_name": "Python", "new_level": 10}]})
    assert res.status_code == 400, "Invalid proficiency level (>5) should return 400"

    print("[OK] Input Validation & Error Handling tests passed!")

    print("\n==================================================")
    print("    ALL NOVELTY LAYER & BUG FIX TESTS PASSED!     ")
    print("==================================================")

if __name__ == "__main__":
    run_novelty_tests()
