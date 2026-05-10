/**
 * GS Prompt Hero — Client API Client
 * Handles backend API communication with loading states
 */

window.gsApi = {
    async call(toolName, text, options = {}) {
        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool: toolName,
                    text: text,
                    options: options
                })
            });
            
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || `Server error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};
