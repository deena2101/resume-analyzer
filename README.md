# 🎯 ATS Resume Analyzer & Scorer

A modern, full-stack application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). The application parses resumes, extracts structural data and keywords, calculates a comprehensive compatibility score, and matches them against job descriptions to provide detailed suggestions for improvement.

---

## ✨ Features

- **📄 Multi-format Parsing:** Supports uploading and extracting text from `.pdf`, `.docx`, and `.txt` files.
- **📊 ATS Scoring Engine:** Calculates a detailed compatibility score based on sections found, formatting complexity, word count, and skills.
- **🧠 NLP & Keyword Analysis:** Leverages natural language processing (spaCy) to check keyword match percentage against a job description and highlights key missing terms.
- **⚠️ Mistake & Layout Audit:** Instantly flags missing vital information (e.g., Email, Phone Number, LinkedIn, GitHub) and common formatting mistakes.
- **💡 Smart Suggestions:** Provides actionable, customized tips to improve the resume's structure and detail level.
- **🔄 Resume Comparison:** Compare two resumes side-by-side to view progress or compare candidates.
- **📈 Dashboard & History:** Track and visualize your past analysis history over time.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (built with Vite)
- **Styling:** Tailwind CSS & Glassmorphism design system
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Visualization:** Recharts (Radial & Bar Charts)

### Backend
- **Framework:** FastAPI (Python 3)
- **Server:** Uvicorn
- **NLP Engine:** spaCy (`en_core_web_sm`)
- **Machine Learning / Matching:** Scikit-Learn (TF-IDF & Cosine Similarity)
- **Parsers:** `pdfplumber` (for PDFs) & `python-docx` (for Word documents)
- **Database Driver:** Motor (Async MongoDB client)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Python](https://www.python.org/) (v3.8+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally on port `27017` - *Optional*, backend runs gracefully without it)

---

### Setup Instructions

#### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/resume-analyzer.git
cd resume-analyzer
```

#### 2. Backend Setup
Create a virtual environment, activate it, install dependencies, and download the NLP model:
```bash
cd backend
python -m venv venv

# On Windows (PowerShell):
venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python -m spacy download en_core_web_sm
cd ..
```

#### 3. Frontend Setup
Install npm packages:
```bash
cd frontend
npm install
cd ..
```

---

### Running the Project

You can run both servers simultaneously using the root startup script or manually.

#### Option A: Quick Start (Windows)
Run the root startup script:
```cmd
.\start.bat
```

#### Option B: Manual Startup

**Start Backend (FastAPI):**
```bash
cd backend
# Make sure your virtualenv is active
uvicorn app:app --reload --port 8000
```
- API Docs will be available at: [http://localhost:8000/docs](http://localhost:8000/docs)

**Start Frontend (React + Vite):**
```bash
cd frontend
npm run dev
```
- App will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📂 Project Structure

```text
resume-analyzer/
├── backend/                  # FastAPI Backend
│   ├── analyzers/            # ATS scoring and NLP logic
│   ├── parsers/              # PDF/DOCX text extractors
│   ├── routes/               # API endpoints
│   ├── app.py                # Main application setup
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # View pages (Analyzer, Dashboard, Comparison)
│   │   ├── services/         # API integration layer
│   │   └── App.jsx           # Main routing structure
│   ├── package.json          # Node dependencies
│   └── tailwind.config.js    # Styling configuration
└── start.bat                 # Fast startup helper script
```


