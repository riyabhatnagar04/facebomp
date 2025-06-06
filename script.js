// Select DOM elements
const holes = document.querySelectorAll('.hole');
const faces = document.querySelectorAll('.face');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const finalMessage = document.getElementById('final-message');



let score = 0;
let timeLeft = 30;
let gameTimer;
let popUpTimer;
let gameActive = false;

// Utility: Get a random image from one of the holes
function getRandomFace() {
  const index = Math.floor(Math.random() * faces.length);
  return faces[index];
}

// Show a face temporarily
function popUpFace() {
  const face = getRandomFace();

  // If already active, skip to avoid overlap
  if (face.classList.contains('active')) return;

  // Show the face (CSS handles the animation)
  face.classList.add('active');

  // Hide the face after a short time (800ms)
  setTimeout(() => {
    face.classList.remove('active');
  }, 800);
}

function startGame() {
  // Set button to "Playing..."
  startButton.textContent = "Playing...";

  // Rest of the code remains the same...
  score = 0;
  timeLeft = 30;
  gameActive = true;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  finalMessage.textContent = '';
  faces.forEach(face => face.classList.remove('clicked'));
  popUpTimer = setInterval(popUpFace, 600);
  gameTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}


function endGame() {
  gameActive = false;
  clearInterval(gameTimer);
  clearInterval(popUpTimer);

  // Reset button text
  startButton.textContent = "Start Game";

  // Hide all faces and show message
  faces.forEach(face => face.classList.remove('active'));
  let message;
  if (score === 0) {
    message = "Oops! Did you blink?";
  } else if (score < 5) {
    message = "You bopped a few! Try again!";
  } else if (score < 15) {
    message = "Nice reflexes!";
  } else {
    message = "FaceBomp Champion! 🎯";
  }
  finalMessage.textContent = `Game Over! Score: ${score}. ${message}`;
}

// Handle clicking on a face
faces.forEach(face => {
  face.addEventListener('click', () => {
    // Ignore clicks if game is not active or face is not visible
    if (!gameActive || !face.classList.contains('active')) return;

    // Increment score
    score++;
    scoreDisplay.textContent = score;

    // Add red border (CSS class)
    face.classList.add('clicked');

    // Remove border after 300ms
    setTimeout(() => {
      face.classList.remove('clicked');
    }, 300);

    // Hide the face immediately
    face.classList.remove('active');
  });
});

// Start button event
startButton.addEventListener('click', () => {
  // Stop current game if active
  if (gameActive) {
    clearInterval(gameTimer);
    clearInterval(popUpTimer);
  }
  startGame();
});
