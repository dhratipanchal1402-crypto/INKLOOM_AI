```mermaid
flowchart TD
    A[User] --> B[Web Interface<br/>HTML CSS JavaScript]

    B --> C[Flask Backend<br/>app.py]

    C --> D[Input Validation]

    D --> E[Content Input or File Upload]

    E --> F[Document Text Extraction<br/>PDF DOCX TXT]

    F --> G[Brand Guideline Analysis]

    S[Saved Brand Guidelines] <--> T[guidelines.json]
    T --> G

    G --> H[Rule-Based Checks]
    G --> I[Google Gemini AI]

    H --> J[Analysis Results]
    I --> J

    J --> K[Severity Levels and Correction Suggestions]

    K --> L[Compliance Report Download]

    K --> U[AI Generated Corrected Content]

    U --> L
    U --> M[User Review]

    J --> M

    M --> N{Approval Decision}

    N -->|Approve| O[Approved]
    N -->|Reject| P[Rejected]

    O --> Q[history.json]
    P --> Q

    Q --> R[Dashboard and Analysis History]
```