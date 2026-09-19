"""
End-to-End Verification Test Script for Demo Workflow (EMP001 & HR Analytics)
"""

from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.role_service import RoleService

client = TestClient(app)

def run_tests():
    print("==================================================")
    print("      RUNNING MVP END-TO-END DEMO TESTS           ")
    print("==================================================")

    # 1. Health Check
    res = client.get("/health")
    assert res.status_code == 200, "Health check failed"
    print("[OK] Health Check: OK")

    # 2. EMP001 Arun Kumar Profile
    res = client.get("/employees/EMP001")
    assert res.status_code == 200, "EMP001 profile fetch failed"
    emp_data = res.json()
    assert emp_data["name"] == "Arun Kumar", f"Expected Arun Kumar, got {emp_data['name']}"
    assert emp_data["current_role_title"] == "Backend Developer", f"Expected Backend Developer, got {emp_data['current_role_title']}"
    print(f"[OK] EMP001 Profile: {emp_data['name']} ({emp_data['current_role_title']}) - Interest: {emp_data['career_interest_role_title']}")

    # 3. EMP001 Skill Passport
    res = client.get("/employees/EMP001/skill-passport")
    assert res.status_code == 200, "EMP001 Skill Passport failed"
    passport = res.json()
    explicit_skill_names = [s["skill_name"] for s in passport["explicit_skills"]]
    inferred_skill_names = [s["skill_name"] for s in passport["inferred_skills"]]
    print(f"[OK] Skill Passport Explicit Skills: {explicit_skill_names}")
    print(f"[OK] Skill Passport Inferred Skills: {inferred_skill_names}")

    # 4. Role Matching for EMP001
    res = client.get("/employees/EMP001/role-matches")
    assert res.status_code == 200, "EMP001 Role Matches failed"
    matches = res.json()
    print(f"[OK] Role Matches Total: {len(matches)}")
    ml_role = RoleService.get_role_by_title("Machine Learning Engineer")
    assert ml_role is not None, "Machine Learning Engineer role not found"
    ml_role_id = ml_role["id"]

    # 5. Skill Gap against Machine Learning Engineer
    res = client.get(f"/employees/EMP001/skill-gap/{ml_role_id}")
    assert res.status_code == 200, "Skill gap analysis failed"
    gap = res.json()
    matched_names = [s["skill_name"] for s in gap["matched_skills"]]
    improvement_names = [s["skill_name"] for s in gap["skills_to_improve"]]
    missing_names = [s["skill_name"] for s in gap["missing_skills"]]

    print("\n--- SKILL GAP VERIFICATION (EMP001 vs Machine Learning Engineer) ---")
    print(f"Matched Skills: {matched_names}")
    print(f"Needs Improvement: {improvement_names}")
    print(f"Missing Skills: {missing_names}")

    assert "Python" in matched_names, "Python should be matched"
    assert "SQL" in matched_names, "SQL should be matched"
    assert "Docker" in matched_names, "Docker should be matched"
    assert "Machine Learning" in improvement_names, "Machine Learning should need improvement (current lvl 2 vs required 4)"
    assert "TensorFlow" in missing_names, "TensorFlow should be missing"
    assert "Statistics" in missing_names, "Statistics should be missing"
    print("[OK] Skill Gap Categorization matches exact specification!")

    # 6. Learning Recommendations
    res = client.get(f"/employees/EMP001/learning-recommendations/{ml_role_id}")
    assert res.status_code == 200, "Learning recommendations failed"
    recs = res.json()
    print(f"\n[OK] Learning Recommendations ({len(recs)} courses found):")
    for r in recs:
        print(f"  - Course: '{r['course_title']}' for target skill '{r['target_skill']}'")

    # 7. Career Roadmap
    res = client.get(f"/employees/EMP001/career-roadmap/{ml_role_id}")
    assert res.status_code == 200, "Career roadmap failed"
    roadmap = res.json()
    print(f"\n[OK] Career Roadmap Generated (Estimated {roadmap['estimated_months']} months):")
    for node in roadmap["nodes"]:
        print(f"  [Step {node['step']}] {node['title']} ({node['type']}): {node['description']}")

    # 8. HR Flow Verification
    print("\n--- HR FLOW VERIFICATION ---")
    res = client.get("/hr/overview")
    assert res.status_code == 200, "HR Overview failed"
    overview = res.json()
    print(f"[OK] HR Overview: {overview['total_employees']} employees, {overview['total_roles']} roles, {overview['total_departments']} departments")

    res = client.get(f"/hr/roles/{ml_role_id}/matches")
    assert res.status_code == 200, "HR Ranked Candidates failed"
    candidates = res.json()
    print(f"[OK] Ranked Candidates for ML Engineer ({len(candidates)} candidates):")
    for c in candidates[:3]:
        print(f"  - {c['name']} ({c['current_role']}): {c['match_score']}% Match ({c['match_level']})")

    res = client.get("/hr/talent-search?skills=Python,FastAPI&min_experience=2")
    assert res.status_code == 200, "HR Talent Search failed"
    search_res = res.json()
    print(f"[OK] HR Talent Search (Python + FastAPI, >=2 yrs exp): {len(search_res)} matching employees found")

    # 9. AI Chat Interface Verification
    res = client.post("/ai/chat", json={"employee_code": "EMP001", "message": "What skills do I need to become an ML Engineer?"})
    assert res.status_code == 200, "AI Chat endpoint failed"
    ai_res = res.json()
    print("\n--- AI CHAT INTERFACE VERIFICATION ---")
    print(f"AI Response Snippet: {ai_res['ai_response'][:180]}...")

    print("\n==================================================")
    print("      ALL HACKATHON DEMO TESTS PASSED!             ")
    print("==================================================")

if __name__ == "__main__":
    run_tests()
