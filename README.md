# INKLOOM AI – Brand Governance Platform

**AI-Powered Content Intelligence for Consistent Brand Communication**

## About the Project

INKLOOM AI is an AI-powered Brand Governance Platform that analyzes digital content and checks whether it follows predefined brand guidelines.

It identifies brand inconsistencies, unsupported claims, and tone-related issues using rule-based checks and Google Gemini AI. It also provides correction suggestions, severity levels, and compliance information to help users maintain consistent and trustworthy brand communication.

## Key Features

- **Brand Guideline Management:** Save and load brand guidelines.
- **Brand Consistency Checking:** Detect brand name and guideline violations.
- **AI-Powered Analysis:** Uses Google Gemini AI for content analysis.
- **Tone and Claim Detection:** Identifies tone-related issues and unsupported claims.
- **Severity Analysis:** Highlights issues with severity levels.
- **Correction Suggestions:** Provides recommendations to improve content.
- **Multi-Format Upload:** Supports PDF, DOCX, and TXT document uploads.
- **Compliance Reports:** Download analysis results as a compliance report.
- **Approval Workflow:** Allows users to approve or reject reviewed content.
- **Analysis Dashboard:** Displays total, approved, rejected, and pending reviews.
- **Analysis History:** Stores and displays previous content reviews.

## Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend development |
| Flask | Web framework |
| HTML | Frontend structure |
| CSS | UI styling |
| JavaScript | Frontend functionality |
| Google Gemini API | AI-powered content analysis |
| JSON | Guidelines and analysis history storage |
| PyPDF | PDF text extraction |
| python-docx | DOCX text extraction |
| Gunicorn | Application deployment |

## Project Structure

```text
INKLOOM_AI/
├── app.py
├── requirements.txt
├── Procfile
├── test_gemini.py
├── guidelines.json
├── history.json
├── templates/
│   └── index.html
├── static/
│   ├── script.js
│   └── style.css
├── README.md
├── ARCHITECTURE.md
└── .gitignore
```

Note: `guidelines.json` and `history.json` are created or updated by the application when data is saved. The `.env` file contains the private API key and should never be uploaded to GitHub.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dhratipanchal1402-crypto/INKLOOM_AI.git
```

### 2. Open the Project Folder

```bash
cd INKLOOM_AI
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Gemini API Key

Create a `.env` file in the project root directory.

Add:

```env
GEMINI_API_KEY=your_api_key_here
```

Replace the placeholder with your actual Gemini API key. Never upload your API key to GitHub.

### 5. Run the Application

```bash
python app.py
```

### 6. Open in Browser

```text
http://127.0.0.1:5000
```

## How It Works

1. The user enters or loads brand guidelines.
2. The user enters content or uploads a PDF, DOCX, or TXT document.
3. The Flask backend processes the input.
4. Rule-based checks and Gemini AI analyze the content.
5. The platform displays detected issues, severity levels, and correction suggestions.
6. The user can download a compliance report.
7. The user reviews the analysis and approves or rejects it.
8. Guidelines and analysis history are stored using JSON files.
9. The dashboard displays review statistics and previous analyses.

## Project Objective

The objective of INKLOOM AI is to help organizations maintain brand consistency, improve content quality, and reduce the risk of publishing content that does not align with their brand identity.

---

**INKLOOM AI – Check Before Publish.**