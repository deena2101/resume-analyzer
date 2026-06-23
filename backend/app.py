from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from parsers.file_parser import extract_text_from_file
from analyzers.ats_scorer import calculate_ats_score
from analyzers.nlp_analyzer import analyze_resume
import os
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI(title="Resume Analyzer API")

# MongoDB configuration
MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
db = client.resume_analyzer_db


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the ATS Resume Analyzer API"}

@app.post("/api/analyze")
async def analyze_uploaded_resume(file: UploadFile = File(...), job_description: str = Form(None)):
    try:
        # Extract text based on file type
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in [".pdf", ".docx", ".txt"]:
            raise HTTPException(status_code=400, detail="Unsupported file format")

        file_content = await file.read()
        text = extract_text_from_file(file_content, file_ext)

        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the document")

        # NLP Analysis
        nlp_results = analyze_resume(text, job_description)

        # ATS Scoring
        ats_results = calculate_ats_score(nlp_results)

        # Save to MongoDB (gracefully handle if MongoDB isn't running)
        try:
            record = {
                "filename": file.filename,
                "job_description": job_description,
                "analysis": nlp_results,
                "ats_score": ats_results,
            }
            await db.history.insert_one(record)
        except Exception as db_err:
            print(f"MongoDB warning: Could not save history ({db_err})")

        return {
            "status": "success",
            "filename": file.filename,
            "parsed_text": text[:500] + "..." if len(text) > 500 else text,
            "analysis": nlp_results,
            "ats_score": ats_results,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
