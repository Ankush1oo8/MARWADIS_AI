// script.js

async function submitQuestion() {
  const questionInput = document.getElementById("question");
  const responseDiv = document.getElementById("response");

  const userQuestion = questionInput.value.trim();

  if (!userQuestion) {
    responseDiv.innerHTML = "Please enter a question."; // Alert if input is empty
    return;
  }

  responseDiv.innerHTML = "Loading..."; // Show loading message

  try {
    const response = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: userQuestion }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Format and display the answer from the Gemini API
    formatResponse(data.answer);

    questionInput.value = ""; // Clear input field after submission
  } catch (error) {
    console.error("Error:", error);
    responseDiv.innerHTML = "Netlify Server Down!!!."; // Show error message
  }
}

// Function to format and display the API response
function formatResponse(answer) {
  const responseDiv = document.getElementById("response");

  // Clear previous content
  responseDiv.innerHTML = "";

  // Example formatting (you can customize this based on actual API structure)
  if (typeof answer === "string") {
    // If answer is a simple string
    const paragraph = document.createElement("p");
    paragraph.textContent = answer;
    responseDiv.appendChild(paragraph);
  } else if (Array.isArray(answer)) {
    // If answer is an array (e.g., list of items)
    const list = document.createElement("ul");
    answer.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.appendChild(listItem);
    });
    responseDiv.appendChild(list);
  } else if (typeof answer === "object") {
    // If answer is an object (e.g., key-value pairs)
    for (const [key, value] of Object.entries(answer)) {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = `<strong>${key}:</strong> ${value}`;
      responseDiv.appendChild(paragraph);
    }
  } else {
    // Default case if format is unknown
    const paragraph = document.createElement("p");
    paragraph.textContent = "No valid answer received.";
    responseDiv.appendChild(paragraph);
  }
}

// Function to set the question from suggested questions
function setQuestion(question) {
  document.getElementById("question").value = question; // Set input value
}
