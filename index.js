"use strict";
const form = document.getElementById('shorten-form');
const input = document.getElementById('shorten-input');
const resultsContainer = document.getElementById('results-container');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const originalUrl = input.value;
    if (!originalUrl)
        return;
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`);
        const shortUrl = await response.text();
        addResultToPage(originalUrl, shortUrl);
        input.value = '';
    }
    catch (error) {
        alert("Something went wrong. Please try again.");
    }
});
function addResultToPage(original, short) {
    const resultHTML = `
        <div class="result-card" style="background: white; padding: 1rem; margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; border-radius: 5px;">
            <p style="color: var(--neutral-very-dark-blue);">${original}</p>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <p style="color: var(--primary-color);">${short}</p>
                <button class="btn btn--primary" onclick="navigator.clipboard.writeText('${short}')">Copy</button>
            </div>
        </div>
    `;
    resultsContainer.insertAdjacentHTML('afterbegin', resultHTML);
}
