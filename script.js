
async function submitQuestion() {
    const question = document.getElementById('question').value.trim();
    const responseDiv = document.getElementById('response');
    
    // Clear previous response
    responseDiv.innerHTML = '';

    if (!question) {
        responseDiv.innerHTML = '<p style="color:red;">Please enter a question.</p>';
        return; // Exit if no question is entered
    }

    const conversationId = 'YOUR_CONVERSATION_ID'; // Replace with your conversation ID

    try {
        const response = await fetch('http://localhost:3000/api/v1/bots/YOUR_BOT_ID/conversations/' + conversationId + '/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'text',
                text: question
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        responseDiv.innerHTML = `<p><strong>Response:</strong> ${data.text}</p>`;
        
        // Clear input field after submission
        document.getElementById('question').value = '';
        
    } catch (error) {
        responseDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}
