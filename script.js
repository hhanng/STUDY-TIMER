const STUDY_DURATION_MINUTES = 30;
const REST_DURATION_MINUTES = 15;

const SESSION_TYPES = {
  STUDY: 'Study',
  REST: 'Rest',
};

const studyDuration = STUDY_DURATION_MINUTES * 60;
const restDuration = REST_DURATION_MINUTES * 60;

const timeDisplay = document.getElementById('time-display');
const sessionLabel = document.getElementById('session-label');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');

let intervalId = null;
let isRunning = false;
let activeSession = SESSION_TYPES.STUDY;
let remainingSeconds = studyDuration;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
  sessionLabel.textContent = activeSession;
}

function switchSession() {
  if (activeSession === SESSION_TYPES.STUDY) {
    activeSession = SESSION_TYPES.REST;
    remainingSeconds = restDuration;
  } else {
    activeSession = SESSION_TYPES.STUDY;
    remainingSeconds = studyDuration;
  }
  updateDisplay();
}

function tick() {
  if (remainingSeconds > 0) {
    remainingSeconds -= 1;
    updateDisplay();
    return;
  }

  switchSession();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startPauseButton.textContent = 'Pause';
  intervalId = window.setInterval(tick, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  isRunning = false;
  startPauseButton.textContent = 'Resume';
  if (intervalId !== null) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
}

function resetTimer() {
  pauseTimer();
  activeSession = SESSION_TYPES.STUDY;
  remainingSeconds = studyDuration;
  startPauseButton.textContent = 'Start';
  updateDisplay();
}

startPauseButton.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetButton.addEventListener('click', resetTimer);

// Initialize display on load
updateDisplay();
