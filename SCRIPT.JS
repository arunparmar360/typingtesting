const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests help improve your speed and accuracy.",
  "Practice makes perfect, especially with typing.",
  "Stay calm and keep typing with focus.",
  "JavaScript powers many interactive websites.",
  "Keep pushing forward, even when it’s tough.",
  "Creativity is intelligence having fun.",
  "Code like poetry — clean, elegant, and expressive.",
];

const quoteDisplay = document.getElementById("quote");
const inputArea = document.getElementById("inputArea");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");

let timer;
let time = 0;
let started = false;
let currentQuote = "";
let correctChars = 0;

function startTest() {
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  time = 0;
  correctChars = 0;
  started = false;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;
  timeDisplay.textContent = 0;
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = currentQuote;
}

function updateStats() {
  const typedText = inputArea.value;
  const elapsedTime = time;
  const words = typedText.trim().split(/\s+/).length;
  const wpm = Math.round((words / elapsedTime) * 60);
  const totalTyped = typedText.length;
  let correct = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentQuote[i]) {
      correct++;
    }
  }

  const accuracy = totalTyped > 0 ? Math.round((correct / totalTyped) * 100) : 0;

  wpmDisplay.textContent = wpm || 0;
  accuracyDisplay.textContent = accuracy;
}

inputArea.addEventListener("input", () => {
  if (!started) {
    started = true;
    timer = setInterval(() => {
      time++;
      timeDisplay.textContent = time;
      updateStats();
    }, 1000);
  }

  if (inputArea.value === currentQuote) {
    clearInterval(timer);
    updateStats();
    inputArea.disabled = true;
    quoteDisplay.textContent = "🎉 Well done! Click 'Start Test' to try again.";
  }
});

startBtn.addEventListener("click", startTest);
