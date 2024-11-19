// Get references to the dropdown and countdown container
const eventSelect = document.getElementById("event-select");
const countdownContainer = document.getElementById("countdown");

// Initialize variables
let timerInterval;

// Function to update the countdown
function updateCountdown(targetDate) {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    countdownContainer.innerHTML = "<h2>The event has started!</h2>";
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Update the countdown display
  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

// Function to start a new countdown
function startCountdown() {
  clearInterval(timerInterval); // Clear any previous countdown
  const selectedDate = new Date(eventSelect.value).getTime();
  updateCountdown(selectedDate); // Update immediately
  timerInterval = setInterval(() => updateCountdown(selectedDate), 1000);
}

// Event listener for dropdown change
eventSelect.addEventListener("change", startCountdown);

// Start the initial countdown
startCountdown();
