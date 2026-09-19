"""
Supabase Seeder Script for NovaTech Solutions Talent Platform
Inserts synthetic dataset into Supabase PostgreSQL in dependency order.
Idempotent implementation using Supabase upsert.
"""

import os
import json
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found. Please run generate_dataset.py first.")
        sys.exit(1)
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

def seed():
    print("=========================================")
    print("      SUPABASE SEEDING SCRIPT            ")
    print("=========================================")

    if not SUPABASE_URL or not SUPABASE_KEY or "your-supabase" in SUPABASE_URL:
        print("[WARNING] SUPABASE_URL or SUPABASE_KEY is missing or unconfigured in .env!")
        print("Please configure your .env file with actual Supabase project credentials to seed live PostgreSQL.")
        print("Dataset JSON/CSV files in dataset/data/ are available for local fallback execution.")
        return

    try:
        from supabase import create_client, Client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print(f"Connected to Supabase project at {SUPABASE_URL}")
    except Exception as e:
        print(f"[ERROR] Failed to connect to Supabase: {e}")
        return

    tables_in_order = [
        ("departments.json", "departments"),
        ("skills.json", "skills"),
        ("roles.json", "roles"),
        ("role_skills.json", "role_skills"),
        ("employees.json", "employees"),
        ("employee_skills.json", "employee_skills"),
        ("work_history.json", "work_history"),
        ("projects.json", "projects"),
        ("project_skills.json", "project_skills"),
        ("employee_projects.json", "employee_projects"),
        ("courses.json", "courses"),
        ("course_skills.json", "course_skills"),
        ("employee_learning.json", "employee_learning")
    ]

    for json_file, table_name in tables_in_order:
        data = load_json(json_file)
        if not data:
            continue
        
        print(f"Seeding table '{table_name}' ({len(data)} records)...")
        try:
            # Batch upsert to make script idempotent
            # Batch in chunks of 100 to avoid payload size limits
            batch_size = 100
            for i in range(0, len(data), batch_size):
                chunk = data[i:i + batch_size]
                response = supabase.table(table_name).upsert(chunk).execute()
            print(f"Successfully seeded '{table_name}'")
        except Exception as err:
            print(f"[ERROR] Failed to seed table '{table_name}': {err}")

    print("\nSupabase Seeding completed successfully!")

if __name__ == "__main__":
    seed()
