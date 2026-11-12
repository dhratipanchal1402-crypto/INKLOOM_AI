let latestReportData = null;
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
    latestReportData = {
    id: data.id,
    guidelines: guidelines,
    content: content,
    result: data.result,
    suggestions: data.suggestions,
    corrected_content: data.corrected_content,
    date: new Date().toLocaleString(),
    reviewStatus: "Pending Review"
};

document.getElementById("reviewSection").style.display = "block";

document.getElementById("reviewStatus").textContent =
    "Status: Pending Review";

document.getElementById("downloadReportBtn").style.display = "inline-block";

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
            <h3 style="margin-top:20px;">✨ AI Generated Corrected Content</h3>

<div style="margin-top:15px;padding:15px;background:#e8f7ed;border-radius:8px;white-space:pre-wrap;">
    ${escapeHTML(data.corrected_content || "Corrected content unavailable.")}
</div>
            </div>

        `;
        loadDashboard();
    } catch (error) {

        results.innerHTML =
            "<p style='color:red;margin-top:20px;'>Something went wrong. Please try again.</p>";

        console.error(error);


    }
}

async function saveGuidelines() {
    const guidelines = document.getElementById("guidelines").value;

    try {
        const response = await fetch("/save-guidelines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ guidelines: guidelines })
        });

        const result = await response.json();

        document.getElementById("saveMessage").innerText =
            result.message;

    } catch (error) {
        document.getElementById("saveMessage").innerText =
            "Unable to save guidelines.";
    }
}
async function loadGuidelines() {
    try {
        const response = await fetch("/get-guidelines");
        const data = await response.json();

        document.getElementById("guidelines").value =
            data.guidelines || "";

    } catch (error) {
        console.log("Unable to load saved guidelines.");
    }
}

document.addEventListener("DOMContentLoaded", loadGuidelines);

async function uploadDocument() {
    const fileInput = document.getElementById("fileUpload");
    const message = document.getElementById("uploadMessage");
    const contentBox = document.getElementById("content");

    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    message.textContent = "Uploading and extracting text...";

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            contentBox.value = data.content;
            message.textContent = "✅ " + data.message;
        } else {
            message.textContent = "❌ " + data.message;
        }

    } catch (error) {
        message.textContent = "❌ Upload failed. Please try again.";
        console.error(error);
    }
}
function downloadComplianceReport() {

    if (!latestReportData) {
        alert("Please analyze content first.");
        return;
    }

    const report = `
INKLOOM AI
BRAND COMPLIANCE REPORT

Date: ${latestReportData.date}

================================
ORIGINAL CONTENT
================================

${latestReportData.content}


================================
BRAND GUIDELINES
================================

${latestReportData.guidelines}


================================
ANALYSIS RESULTS
================================

${latestReportData.result}


================================
SUGGESTED CORRECTIONS
================================

${latestReportData.suggestions}


================================
REVIEW STATUS
================================

${latestReportData.reviewStatus}

Generated by INKLOOM AI
`;

    const blob = new Blob([report], {
        type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "INKLOOM_AI_Compliance_Report.txt";

    link.click();

    URL.revokeObjectURL(url);
}
async function updateReviewStatus(status) {

    if (!latestReportData || !latestReportData.id) {
        alert("Please analyze content first.");
        return;
    }

    try {
        const response = await fetch("/update-review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: latestReportData.id,
                status: status
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {

            latestReportData.reviewStatus = status;

            document.getElementById("reviewStatus").textContent =
                "Status: " + status;

            alert("Review status saved successfully!");
            loadDashboard();
        } else {
            alert("Could not save review status.");
        }

    } catch (error) {
        console.error("Review Error:", error);
        alert("Server connection failed.");
    }
}

async function loadHistory() {
    const historySection = document.getElementById("historySection");

    historySection.innerHTML = "<p>Loading history...</p>";

    try {
        const response = await fetch("/history");
        const data = await response.json();

        const history = data.history;

        if (!history || history.length === 0) {
            historySection.innerHTML = "<p>No analysis history found.</p>";
            return;
        }

        historySection.innerHTML = `
            <h2>📜 Review History</h2>

            ${history.slice().reverse().map(item => `
                <div style="border:1px solid #ccc; padding:15px; margin:10px 0; border-radius:8px;">

                    <p><b>Date:</b> ${item.date || "N/A"}</p>

                    <p><b>Content:</b> ${(item.content || "").substring(0, 150)}</p>

                    <p><b>Review Status:</b> ${item.review_status || "Pending Review"}</p>

                    <p><b>Analysis:</b> ${(item.result || "").substring(0, 300)}</p>

                </div>
            `).join("")}
        `;

    } catch (error) {
        console.error(error);
        historySection.innerHTML = "<p>Unable to load history.</p>";
    }
}
// DASHBOARD: LOAD HISTORY AND STATISTICS
async function loadDashboard() {
    const historyList = document.getElementById("historyList");

    if (!historyList) return;

    try {
        const response = await fetch("/history");
        const data = await response.json();

        const history = data.history || [];

        const approved = history.filter(
            item => item.review_status === "Approved"
        ).length;

        const rejected = history.filter(
            item => item.review_status === "Rejected"
        ).length;

        const pending = history.length - approved - rejected;

        document.getElementById("totalCount").textContent = history.length;
        document.getElementById("approvedCount").textContent = approved;
        document.getElementById("rejectedCount").textContent = rejected;
        document.getElementById("pendingCount").textContent = pending;

        if (history.length === 0) {
            historyList.innerHTML = "<p>No analysis history available.</p>";
            return;
        }

        historyList.innerHTML = history.slice().reverse().map(item => `
            <div class="history-card">
                <h3>Review #${item.id}</h3>
                <p><b>Date:</b> ${item.date || "N/A"}</p>
                <p><b>Content:</b> ${escapeHTML(item.content || "").substring(0, 150)}</p>
                <p><b>Status:</b> ${escapeHTML(item.review_status || "Pending Review")}</p>
                <p><b>Analysis:</b> ${escapeHTML(item.result || "").substring(0, 250)}</p>
            </div>
        `).join("");

    } catch (error) {
        console.error("Dashboard Error:", error);
        historyList.innerHTML = "<p>Unable to load dashboard.</p>";
    }
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

document.addEventListener("DOMContentLoaded", loadDashboard);