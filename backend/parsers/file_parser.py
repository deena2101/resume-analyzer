import io
import pdfplumber
import docx

def extract_text_from_file(file_content: bytes, file_ext: str) -> str:
    text = ""
    if file_ext == ".pdf":
        with pdfplumber.open(io.BytesIO(file_content)) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
    elif file_ext == ".docx":
        doc = docx.Document(io.BytesIO(file_content))
        for para in doc.paragraphs:
            text += para.text + "\n"
    elif file_ext == ".txt":
        text = file_content.decode("utf-8")
    
    return text
