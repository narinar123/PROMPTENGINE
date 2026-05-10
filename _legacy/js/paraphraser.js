/**
 * GS Prompt Hero — Client-side Logic for AI Paraphrasing
 * Talks to the back-end API
 */

window.currentMode = 'standard';

async function processParaphrase() {
    const inputElement = document.getElementById('inputText');
    const outputContainer = document.getElementById('outputContainer');
    const loader = document.getElementById('loader');
    const resStats = document.getElementById('resultStats');

    const text = inputElement.value.trim();
    if (!text) {
        alert("Please enter some text to paraphrase.");
        return;
    }

    loader.style.display = 'flex';
    outputContainer.innerHTML = '<div class="output-placeholder">Connecting to AI...</div>';
    resStats.style.display = 'none';

    const start = Date.now();
    try {
        // Call global backend client API
        const res = await window.gsApi.call('paraphraser', text, {
            mode: window.currentMode || 'standard',
            synonymLevel: document.getElementById('synonymLevel')?.value || 2
        });
        
        const elapsed = ((Date.now() - start) / 1000).toFixed(2);
        
        loader.style.display = 'none';
        // Render output with simple differential styling simulate or direct text
        const textRes = res.result;
        
        outputContainer.innerHTML = `<div class="diff-word" style="line-height: 1.8; white-space: pre-wrap;">${textRes}</div>`;
        
        resStats.innerText = `Success • ${elapsed}s time`;
        resStats.style.display = 'block';
        
    } catch (error) {
        loader.style.display = 'none';
        outputContainer.innerHTML = `<div style="color:#f87171; padding: 20px; text-align: center;">Error: ${error.message}</div>`;
    }
}
