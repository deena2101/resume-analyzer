import spacy
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load spaCy model. Will fail gracefully if not downloaded yet.
try:
    nlp = spacy.load("en_core_web_sm")
except:
    nlp = None

def extract_entities(text):
    if not nlp:
        return {"skills": [], "entities": {}}
    doc = nlp(text)
    entities = {}
    for ent in doc.ents:
        if ent.label_ not in entities:
            entities[ent.label_] = []
        if ent.text not in entities[ent.label_]:
            entities[ent.label_].append(ent.text)
    return entities

def find_missing_keywords(resume_text, job_desc):
    if not job_desc:
        return {"match_percentage": 0, "missing": []}
    
    if not nlp:
        return {"match_percentage": 0, "missing": []}
        
    jd_doc = nlp(job_desc.lower())
    resume_doc = nlp(resume_text.lower())
    
    jd_keywords = set([token.lemma_ for token in jd_doc if not token.is_stop and token.is_alpha])
    resume_keywords = set([token.lemma_ for token in resume_doc if not token.is_stop and token.is_alpha])
    
    missing = list(jd_keywords - resume_keywords)
    match_percentage = int((len(jd_keywords.intersection(resume_keywords)) / max(1, len(jd_keywords))) * 100)
    
    return {
        "match_percentage": match_percentage,
        "missing": missing[:15] # Top 15 missing keywords
    }

def detect_sections(text):
    sections = {
        "education": False,
        "experience": False,
        "skills": False,
        "projects": False,
        "contact": False
    }
    
    text_lower = text.lower()
    
    if re.search(r'\b(education|academic|degree)\b', text_lower):
        sections["education"] = True
    if re.search(r'\b(experience|employment|work history)\b', text_lower):
        sections["experience"] = True
    if re.search(r'\b(skills|technologies|tools)\b', text_lower):
        sections["skills"] = True
    if re.search(r'\b(projects|portfolio)\b', text_lower):
        sections["projects"] = True
    
    # Contact info detection
    has_email = bool(re.search(r'[\w\.-]+@[\w\.-]+', text))
    has_phone = bool(re.search(r'\+?\d{10,14}', text.replace('-', '').replace(' ', '')))
    has_linkedin = bool(re.search(r'linkedin\.com', text_lower))
    has_github = bool(re.search(r'github\.com', text_lower))
    
    if has_email or has_phone:
        sections["contact"] = True
        
    mistakes = []
    if not has_email: mistakes.append("Missing email address")
    if not has_phone: mistakes.append("Missing phone number")
    if not has_linkedin: mistakes.append("Missing LinkedIn profile")
    if not has_github: mistakes.append("Missing GitHub profile")
    
    return {
        "sections_found": sections,
        "mistakes": mistakes,
        "contact_info": {
            "has_email": has_email,
            "has_phone": has_phone,
            "has_linkedin": has_linkedin,
            "has_github": has_github
        }
    }

def analyze_resume(text, job_desc=None):
    # Length check
    word_count = len(text.split())
    
    # Sections
    section_data = detect_sections(text)
    
    # Entities / Skills
    entities = extract_entities(text)
    
    # Job Matching
    job_match = find_missing_keywords(text, job_desc)
    
    # Suggestions
    suggestions = []
    if not section_data["sections_found"]["projects"]:
        suggestions.append("Add a dedicated 'Projects' section to showcase practical experience.")
    if not section_data["sections_found"]["experience"]:
        suggestions.append("Ensure your work experience is clearly labeled with 'Experience'.")
    if word_count < 200:
        suggestions.append("Your resume is quite short. Consider adding more detail to your experience or projects.")
    
    return {
        "word_count": word_count,
        "sections": section_data["sections_found"],
        "mistakes": section_data["mistakes"],
        "contact_info": section_data["contact_info"],
        "job_match": job_match,
        "suggestions": suggestions
    }
