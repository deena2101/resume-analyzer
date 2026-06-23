@echo off
echo Starting Resume Analyzer Backend...
start cmd /k "cd backend && call venv\Scripts\activate && uvicorn app:app --reload --port 8000"

echo Starting Resume Analyzer Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting!
