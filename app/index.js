const express = require('express');
const questions = require('./questions');

const app = express();
app.use(express.json());

const PORT = 3000;

// Root
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to DevOps Enigma",
    endpoints: ["/question", "/answer", "/health"]
  });
});

// Health
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// Get random question
app.get('/question', (req, res) => {
  const q = questions[Math.floor(Math.random() * questions.length)];
  res.json({
    id: q.id,
    question: q.question,
    choices: q.choices
  });
});

// Submit answer
app.post('/answer', (req, res) => {
  const { id, choice } = req.body;

  const q = questions.find(q => q.id === id);
  if (!q) {
    return res.status(400).json({ error: "Invalid question id" });
  }

  const correct = q.answer === choice;
  res.json({
    correct,
    message: correct ? "Correct answer 🎉" : "Wrong answer ❌"
  });
});

app.listen(PORT, () => {
  console.log(`DevOps Enigma running on port ${PORT}`);
});
