
from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json() or {}

    guidelines = data.get("guidelines", "")
    content = data.get("content", "")

    if not guidelines.strip() or not content.strip():
        return jsonify({
            "result": "Please enter both guidelines and content.",
            "suggestions": "Please enter both fields."
        })

    issues = []
    suggestions = []

    rules = guidelines.lower()
    text = content.lower()

    # Brand name consistency
    if "always write our brand name as" in rules:
        match = re.search(
            r"always write our brand name as\s+([^\n,.]+)",
            rules
        )

        if match:
            brand_name = match.group(1).strip()

            if brand_name not in text:
                issues.append(
                    "Brand name rule: The approved brand name "
                    "was not found in the content."
                )

                suggestions.append(
                    f"Correction: Include the approved brand name "
                    f"'{brand_name}' in your content."
                )

    # Unsupported claims
    risky_words = [
        "best in the world",
        "100% guaranteed",
        "number one",
        "healthiest",
        "cures all"
    ]

    for word in risky_words:
        if word in text:
            issues.append(
                f"Potential unsupported claim detected: '{word}'. "
                "Please verify it with an approved source."
            )

            suggestions.append(
                f"Correction: Remove or rephrase '{word}'. "
                "Use only claims supported by verified evidence."
            )

    # Tone check
    if "professional" in rules and "!!!" in content:
        issues.append(
            "Tone issue: Multiple exclamation marks may not "
            "match a professional brand tone."
        )

        suggestions.append(
            "Correction: Replace multiple exclamation marks "
            "with a single full stop."
        )

    if "friendly" in rules and "dear customer" not in text:
        issues.append(
            "Tone suggestion: Consider using more friendly language."
        )

        suggestions.append(
            "Correction: Use a warm and welcoming greeting "
            "to make the content more friendly."
        )

    # Prepare analysis results
    if not issues:
        result = (
            "No major issues detected by the current rule checks. "
            "Please review the content manually before publishing."
        )
    else:
        result = "\n\n".join(
            f"{i+1}. {issue}" for i, issue in enumerate(issues)
        )

    # Prepare correction suggestions
    if not suggestions:
        suggestion_result = "No corrections required."
    else:
        suggestion_result = "\n\n".join(
            f"{i+1}. {suggestion}"
            for i, suggestion in enumerate(suggestions)
        )

    return jsonify({
        "result": result,
        "suggestions": suggestion_result
    })


if __name__ == "__main__":
    app.run(debug=True)

