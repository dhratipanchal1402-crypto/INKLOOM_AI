
// =====================================
// 1. ANALYZE CONTENT
// =====================================

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

        // Display analysis results
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

            <div style="margin-top:20px;padding:20px;background:#fff8e8;border-radius:8px;">

                <h3>Generated Corrected Content</h3>

                <p style="margin-top:15px;white-space:pre-wrap;">
                    ${escapeHTML(data.corrected_content)}
                </p>

                <p id="approvalStatus" style="margin-top:15px;font-weight:bold;">
                    Status: Pending
                </p>

                <button id="approveBtn"
                    style="background:#16865b;color:white;padding:10px 20px;border:none;border-radius:6px;cursor:pointer;margin-right:10px;">

                    ✓ Approve

                </button>

                <button id="rejectBtn"
                    style="background:#d9534f;color:white;padding:10px 20px;border:none;border-radius:6px;cursor:pointer;">

                    ✕ Reject

                </button>

            </div>

        `;

        // Approve button
        document.getElementById("approveBtn").addEventListener("click", () => {

            updateReview(data.review_id, "Approved");

        });

        // Reject button
        document.getElementById("rejectBtn").addEventListener("click", () => {

            updateReview(data.review_id, "Rejected");

        });

        // Refresh dashboard after analysis
        loadDashboard();

    } catch (error) {

        results.innerHTML =
            "<p style='color:red;margin-top:20px;'>Something went wrong. Please try again.</p>";

        console.error(error);

    }

}


// =====================================
// 2. APPROVE / REJECT CONTENT
// =====================================

async function updateReview(reviewId, status) {

    try {

        const response = await fetch(`/review/${reviewId}`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status: status
            })

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message || "Could not update review.");

        }

        // Update approval status on screen
        document.getElementById("approvalStatus").textContent =
            "Status: " + data.status;

        // Disable buttons after decision
        document.getElementById("approveBtn").disabled = true;
        document.getElementById("rejectBtn").disabled = true;

        // Refresh dashboard and history
        loadDashboard();

    } catch (error) {

        alert(error.message);

        console.error(error);

    }

}


// =====================================
// 3. LOAD DASHBOARD AND HISTORY
// =====================================

async function loadDashboard() {

    const historyList = document.getElementById("historyList");

    if (!historyList) {
        return;
    }

    try {

        const response = await fetch("/history");

        if (!response.ok) {

            throw new Error("Unable to load history");

        }

        const data = await response.json();

        // Update dashboard statistics
        document.getElementById("totalCount").textContent =
            data.stats.total || 0;

        document.getElementById("approvedCount").textContent =
            data.stats.approved || 0;

        document.getElementById("rejectedCount").textContent =
            data.stats.rejected || 0;

        document.getElementById("pendingCount").textContent =
            data.stats.pending || 0;

        // Check whether history is empty
        if (data.reviews.length === 0) {

            historyList.innerHTML =
                "<p>No analysis history available yet.</p>";

            return;

        }

        // Escape HTML to safely display database content
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

        // Display previous analyses
        historyList.innerHTML = data.reviews.map(review => {

            const statusColor =
                review.status === "Approved" ? "#16865b" :
                review.status === "Rejected" ? "#d9534f" :
                "#c58b16";

            return `

                <div class="history-card">

                    <h3>Review #${review.id}</h3>

                    <p>
                        <strong>Original Content:</strong><br>
                        ${escapeHTML(review.original_content)}
                    </p>

                    <p>
                        <strong>Corrected Content:</strong><br>
                        ${escapeHTML(review.corrected_content)}
                    </p>

                    <p style="color:${statusColor};font-weight:bold;">
                        Status: ${escapeHTML(review.status)}
                    </p>

                </div>

            `;

        }).join("");

    } catch (error) {

        historyList.innerHTML =
            "<p>Unable to load analysis history.</p>";

        console.error(error);

    }

}


// =====================================
// 4. LOAD DASHBOARD WHEN PAGE OPENS
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    loadDashboard();

});
sss