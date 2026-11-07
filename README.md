# INKLOOM AI – Brand Governance Platform

**AI-Powered Content Intelligence for Consistent Brand Communication**

## About the Project

INKLOOM AI is an AI-powered Brand Governance Platform designed to analyze digital content and ensure that it follows predefined brand guidelines.

It identifies brand inconsistencies, unsupported claims, and tone-related issues. It also generates correction suggestions and improved content to help maintain consistent and trustworthy brand communication.

## Key Features

- **Brand Consistency Checking:** Checks whether content follows the defined brand guidelines.
- **AI-Powered Analysis:** Uses Google Gemini AI to analyze content.
- **Tone Detection:** Identifies tone-related issues.
- **Unsupported Claim Detection:** Highlights potentially exaggerated or unsupported claims.
- **Smart Suggestions:** Provides recommendations to improve content.
- **Corrected Content Generator:** Generates improved versions of the original content.
- **Approval Workflow:** Allows users to approve or reject corrected content.
- **Analysis Dashboard:** Displays total, approved, rejected, and pending analyses.
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
| SQLite | Database management |

## Project Structure

```text
INKLOOM_AI/
│
├── static/
│   ├── script.js
│   └── style.css
│
├── templates/
│   └── index.html
│
├── app.py
├── test_gemini.py
├── inkloom.db
├── .env
├── .gitignore
└── README.md
```

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
pip install flask google-genai python-dotenv
```

### 4. Configure API Key

Create a `.env` file in the project root directory.

Add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key. Never upload your API key to GitHub.

### 5. Run the Application

```bash
python app.py
```

### 6. Open in Browser

```text
http://127.0.0.1:5000
```

## How It Works

1. User enters brand guidelines.
2. User provides content for analysis.
3. INKLOOM AI analyzes the content using predefined checks and Gemini AI.
4. The platform identifies potential issues.
5. AI generates correction suggestions and improved content.
6. User reviews the corrected content.
7. User approves or rejects the content.
8. Analysis results and review status are stored in the SQLite database.
9. Dashboard displays analysis statistics and history.

## Project Objective

The main objective of INKLOOM AI is to help organizations maintain brand consistency, improve content quality, and reduce the risk of publishing content that does not align with their brand identity.

## Team

**Project: INKLOOM AI**

Developed as part of a Round 2 project submission.

---

**INKLOOM AI – Check Before Publish.**