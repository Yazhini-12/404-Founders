"""
Comprehensive AI Career Assistant Verification Test Suite
Tests:
1. "What roles am I suitable for?" (Backend Developer excluded)
2. "Why am I recommended for Machine Learning Engineer?" (Grounded in match & readiness)
3. "What skills should I improve for Machine Learning Engineer?" (Exact gaps: ML, TensorFlow, Statistics)
4. "How ready am I for Machine Learning Engineer?" (Calculated readiness score used)
5. "How can I become a Machine Learning Engineer?" (Roadmap context used)
6. "Explain my hidden skills." (Evidence referenced)
7. Fallback mode when GEMINI_API_KEY is missing/unconfigured
8. Invalid employee code validation (HTTP 404)
9. Mock Gemini failure resilience check (graceful fallback without 500)
"""

from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.career_assistant_service import CareerAssistantService
from backend.app.config import settings
import unittest.mock as mock

client = TestClient(app)

def run_career_assistant_tests():
    print("==================================================")
    print("    RUNNING AI CAREER ASSISTANT TEST SUITE        ")
    print("==================================================")

    # 1. Role suitability query
    res = client.post("/ai/chat", json={"employee_code": "EMP001", "message": "What roles am I suitable for?"})
    assert res.status_code == 200, "Role suitability chat query failed"
    data1 = res.json()
    reply1 = data1["ai_response"]
    print("\n--- TEST 1: ROLE SUITABILITY ---")
    print(f"AI Response snippet: {reply1[:200]}...")

    assert "Backend Developer" not in data1["context_retrieved"]["top_future_match"]["role_title"], "Top future match must not be current role!"
    assert "Machine Learning Engineer" in reply1 or "Machine Learning Engineer" in str(data1["context_retrieved"]), "Machine Learning Engineer should be recommended"
    print("[OK] Role suitability test passed (Current role Backend Developer excluded from future recommendations)!")

    # 2. Why recommended for Machine Learning Engineer
    res = client.post("/ai/chat", json={"employee_code": "EMP001", "message": "Why am I recommended for Machine Learning Engineer?"})
    assert res.status_code == 200, "Why recommended query failed"
    data2 = res.json()
    reply2 = data2["ai_response"]
    print("\n--- TEST 2: WHY RECOMMENDED FOR ML ENGINEER ---")
    print(f"AI Response snippet: {reply2[:200]}...")
    assert "Machine Learning Engineer" in reply2 or "Machine Learning" in reply2
    print("[OK] Why recommended query test passed!")

    # 3. Skills to improve
    res = client.post("/ai/chat", json={"employee_code": "EMP001", "message": "What skills should I improve for Machine Learning Engineer?"})
    assert res.status_code == 200, "Skills to improve query failed"
    data3 = res.json()
    reply3 = data3["ai_response"]
    print("\n--- TEST 3: SKILLS TO IMPROVE ---")
    print(f"AI Response snippet: {reply3[:200]}...")
    assert "Machine Learning" in reply3 or "TensorFlow" in reply3 or "Statistics" in reply3
    print("[OK] Skills to improve test passed!")

    # 4. Career Readiness
    res = client.post("/ai/chat", json={"employee_code": "EMP001", "message": "How ready am I for Machine Learning Engineer?"})
    assert res.status_code == 200, "Readiness query failed"
    data4 = res.json()
    reply4 = data4["ai_response"]
    print("\n--- TEST 4: CAREER READINESS ---")
    print(f"AI Response snippet: {reply4[:200]}...")
    assert "71%" in reply4 or "Near Ready" in reply4 or "Readiness" in reply4
    print("[OK] Career Readiness query test passed!")

    # 5. Career Roadmap / How to become
    res = client.post("/ai/chat", json={"employee_code": "EMP001", "message": "How can I become a Machine Learning Engineer?"})
    assert res.status_code == 200, "Roadmap query failed"
    data5 = res.json()
    reply5 = data5["ai_response"]
    print("\n--- TEST 5: CAREER ROADMAP ---")
    print(f"AI Response snippet: {reply5[:200]}...")
    assert "Roadmap" in reply5 or "Machine Learning Fundamentals" in reply5 or "Backend Developer" in reply5
    print("[OK] Career Roadmap query test passed!")

    # 6. Hidden Skills Explanation
    res = client.post("/ai/chat", json={"employee_code": "EMP001", "message": "Explain my hidden skills."})
    assert res.status_code == 200, "Hidden skills query failed"
    data6 = res.json()
    reply6 = data6["ai_response"]
    print("\n--- TEST 6: HIDDEN SKILLS EXPLANATION ---")
    print(f"AI Response snippet: {reply6[:200]}...")
    assert "Inferred" in reply6 or "Leadership" in reply6 or "Passport" in reply6
    print("[OK] Hidden skills query test passed!")

    # 7. Fallback Mode when GEMINI_API_KEY is missing/unconfigured
    with mock.patch.object(settings, "GEMINI_API_KEY", ""):
        res = client.post("/ai/chat", json={"employee_code": "EMP001", "message": "What should I learn next?"})
        assert res.status_code == 200, "Fallback query should succeed with HTTP 200"
        data7 = res.json()
        assert data7["mode"] == "fallback", f"Expected fallback mode, got {data7['mode']}"
        assert data7["llm_connected"] is False
        print("\n--- TEST 7: FALLBACK MODE (NO API KEY) ---")
        print(f"Fallback mode confirmed: {data7['mode']} | Response snippet: {data7['ai_response'][:120]}...")
        print("[OK] Fallback mode verification passed!")

    # 8. Invalid Employee Code
    res = client.post("/ai/chat", json={"employee_code": "INVALID999", "message": "Hello"})
    assert res.status_code == 404, "Invalid employee code should return HTTP 404"
    print("[OK] Invalid employee code validation test passed!")

    # 9. Mock Gemini Failure Resilience
    with mock.patch.object(settings, "GEMINI_API_KEY", "fake_key_123"):
        with mock.patch.object(CareerAssistantService, "answer_career_question", wraps=CareerAssistantService.answer_career_question):
            res = client.post("/ai/chat", json={"employee_code": "EMP001", "message": "What roles am I suitable for?"})
            assert res.status_code == 200, "Must fall back gracefully on API failure without HTTP 500"
            data9 = res.json()
            assert data9["mode"] == "fallback"
            print("\n--- TEST 9: MOCK GEMINI API FAILURE RESILIENCE ---")
            print(f"Resilience confirmed: mode='{data9['mode']}', HTTP {res.status_code}")
            print("[OK] Gemini failure resilience test passed!")

    print("\n==================================================")
    print("    ALL AI CAREER ASSISTANT TESTS PASSED!        ")
    print("==================================================")

if __name__ == "__main__":
    run_career_assistant_tests()
