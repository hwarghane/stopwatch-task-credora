let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

const display = document.getElementById("display");
const startStop = document.getElementById("startStop");
const reset = document.getElementById("reset");
const lap = document.getElementById("lap");
const laps = document.getElementById("laps");
const themeToggle = document.getElementById("themeToggle");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

startStop.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 1000);
    startStop.textContent = "Stop";
    running = true;
  } else {
    clearInterval(interval);
    startStop.textContent = "Start";
    running = false;
  }
});

reset.addEventListener("click", () => {
  clearInterval(interval);
  elapsedTime = 0;
  updateDisplay();
  startStop.textContent = "Start";
  running = false;
  laps.innerHTML = '';
});

lap.addEventListener("click", () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = formatTime(elapsedTime);
    laps.appendChild(li);
  }
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
