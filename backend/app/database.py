"""
Database module for Supabase connection & Local JSON fallback data loader.
"""

import os
import json
from backend.app.config import settings

# Attempt Supabase client creation
supabase_client = None
if settings.SUPABASE_URL and settings.SUPABASE_KEY and "your-supabase" not in settings.SUPABASE_URL:
    try:
        from supabase import create_client, Client
        supabase_client: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        print("Supabase client initialized successfully.")
    except Exception as e:
        print(f"Warning: Could not initialize Supabase client: {e}")
else:
        print("Using Local JSON dataset fallback provider (SUPABASE_URL not configured).")

# Local Fallback Data Loader
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "dataset", "data"))

_cache = {}

def get_local_data(table_name: str):
    """Retrieves local synthetic JSON table data from dataset/data/."""
    if table_name in _cache:
        return _cache[table_name]
    
    filepath = os.path.join(DATA_DIR, f"{table_name}.json")
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            _cache[table_name] = data
            return data
    return []

def get_table_data(table_name: str):
    """
    Attempts to fetch from Supabase. If unconfigured or errors out,
    falls back seamlessly to local synthetic dataset.
    """
    if supabase_client:
        try:
            res = supabase_client.table(table_name).select("*").execute()
            if res.data:
                return res.data
        except Exception as e:
            print(f"Supabase query error on {table_name}: {e}. Falling back to local dataset.")
    
    return get_local_data(table_name)
