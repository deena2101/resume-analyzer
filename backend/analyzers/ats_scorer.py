def calculate_ats_score(nlp_results):
    score = 0
    categories = {}
    
    # 1. Resume Structure (15%)
    structure_score = sum(nlp_results["sections"].values()) / 5 * 15
    categories["structure"] = {"score": int(structure_score), "max": 15}
    score += structure_score
    
    # 2. Keyword Match (25%)
    if nlp_results["job_match"]["match_percentage"] > 0:
        keyword_score = (nlp_results["job_match"]["match_percentage"] / 100) * 25
    else:
        keyword_score = 15
    categories["keywords"] = {"score": int(keyword_score), "max": 25}
    score += keyword_score
    
    # 3. Skills Section (10%)
    skills_score = 10 if nlp_results["sections"]["skills"] else 0
    categories["skills"] = {"score": skills_score, "max": 10}
    score += skills_score
    
    # 4. Experience Quality (15%)
    exp_score = 15 if nlp_results["sections"]["experience"] else 5
    categories["experience"] = {"score": exp_score, "max": 15}
    score += exp_score
    
    # 5. Education Details (10%)
    edu_score = 10 if nlp_results["sections"]["education"] else 0
    categories["education"] = {"score": edu_score, "max": 10}
    score += edu_score
    
    # 6. Formatting Simplicity (10%)
    format_score = 10 if nlp_results["word_count"] > 100 else 5
    categories["formatting"] = {"score": format_score, "max": 10}
    score += format_score
    
    # 7. Contact Information (5%)
    contact_score = 5 if nlp_results["sections"]["contact"] else 0
    categories["contact"] = {"score": contact_score, "max": 5}
    score += contact_score
    
    # 8. Grammar & Readability (10%)
    grammar_score = 8 # Placeholder for grammar checking
    categories["grammar"] = {"score": grammar_score, "max": 10}
    score += grammar_score
    
    return {
        "total_score": int(score),
        "breakdown": categories
    }
