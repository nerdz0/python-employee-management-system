from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import os

app = FastAPI()

# --- Enterprise Security Configuration ---
# Only allow your specific Vercel domain and localhost to talk to this API
origins = [
    "http://localhost:3000",
    "https://employee-management-system-navy-omega.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Employee(BaseModel):
    id: int
    name: str
    role: str
    department: str
    status: str

# Mock Database
employees_db = [
    {"id": 1, "name": "Bhaskar Roy", "role": "System Architect", "department": "Engineering", "status": "Active"},
    {"id": 2, "name": "Jane Doe", "role": "Product Manager", "department": "Product", "status": "On Leave"},
]

@app.get("/api/health")
def health_check():
    """Used by Vercel to verify the Python runtime is healthy"""
    return {"status": "healthy", "runtime": "Python 3.9+"}

@app.get("/api/employees", response_model=List[Employee])
async def get_all_employees():
    try:
        # We use 'async' here to mimic real database calls
        if not employees_db:
            raise HTTPException(status_code=404, detail="No employees found")
        return employees_db
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))