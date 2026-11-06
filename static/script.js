
async function analyzeContent() {

    const guidelines = document.getElementById("guidelines").value;
    const content = document.getElementById("content").value;
    const results = document.getElementById("results");

    if (!guidelines.trim() || !content.trim()) {
        results.innerHTML =
            "<p style='color:red;margin-top:20px;'>Please enter both brand guidelines and content.</p>";
        return;
    }

    results.innerHTML =
        "<p style='margin-top:20px;color:#1596a5;'>Analyzing your content... Please wait.</p>";

    try {

        const response = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                guidelines: guidelines,
                content: content
            })
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        const escapeHTML = (value) => String(value ?? "").replace(
            /[&<>"']/g,
            char => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            })[char]
        );

        results.innerHTML = `

            <div style="margin-top:25px;padding:20px;background:#f0f8fb;border-radius:8px;">

                <h3>Analysis Results</h3>

                <p style="margin-top:15px;white-space:pre-wrap;">
                    ${escapeHTML(data.result)}
                </p>

            </div>

            <div style="margin-top:20px;padding:20px;background:#eaf7f2;border-radius:8px;">

                <h3>Suggested Corrections</h3>

                <p style="margin-top:15px;white-space:pre-wrap;">
                    ${escapeHTML(data.suggestions)}
                </p>

            </div>

        `;

    } catch (error) {

        results.innerHTML =
            "<p style='color:red;margin-top:20px;'>Something went wrong. Please try again.</p>";

        console.error(error);

    }
}
