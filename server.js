// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to handle requests from the frontend
app.post('/ask', async (req, res) => {
    const userQuestion = req.body.question;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: userQuestion }] }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // Extracting the text from the API response
        const answer = response.data.candidates[0].content.parts[0].text;

        // Send the answer back to the frontend
        res.json({ answer });
    } catch (error) {
        console.error("Error fetching data from Gemini API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch data from Gemini API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});