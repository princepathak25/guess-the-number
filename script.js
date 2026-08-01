// initializing variables for the game values
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;
let previousGuesses = [];
let gameOver = false;

// initializing variables for the game elements
const guessField = document.querySelector("#guessField");
const submitBtn = document.querySelector("#subt");
const playAgainBtn = document.querySelector("#newGame");
const guesses = document.querySelector(".guesses");
const attemptsLeft = document.querySelector(".lastResult");
const message = document.querySelector(".lowOrHigh");
const progressBar = document.querySelector(".progress-bar");
const bestScoreText = document.querySelector(".bestScore");

// best score
let bestScore = localStorage.getItem("bestScore");
if (bestScore === null) {
    localStorage.setItem("bestScore", 11);
    bestScore = 11;
}

bestScoreText.textContent = bestScore == 11 ? "-" : bestScore;

// submit
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (gameOver) return;
    const guess = Number(guessField.value);
    checkInput(guess);
});

// enter key
guessField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        submitBtn.click();
    }
});

// check input
function checkInput(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        showMessage("Enter a number between 1 and 100", "high");
        shakeInput();
        return;
    }
    previousGuesses.push(guess);
    guesses.textContent = previousGuesses.join(", ");
    attempts--;
    attemptsLeft.textContent = attempts;
    updateProgress();
    compareGuess(guess);
    guessField.value = "";
    guessField.focus();
}

// compare guess
function compareGuess(guess) {
    if (guess === randomNumber) {
        showMessage("🎉 Correct! You Won!", "win");
        updateBestScore();
        finishGame();
        return;
    }

    if (attempts === 0) {
        showMessage(`Game Over! Number was ${randomNumber}`, "game-over");
        finishGame();
        return;
    }

    if (guess < randomNumber) {
        showMessage("📉 Too Low!", "low");
    } else {
        showMessage("📈 Too High!", "high");
    }

    shakeInput();
}

// show message
function showMessage(text, type) {
    message.textContent = text;
    message.className = "lowOrHigh";
    message.classList.add(type);
}

// update progress
function updateProgress() {
    progressBar.style.width = `${attempts * 10}%`;
}

// shake input
function shakeInput() {
    guessField.classList.add("shake");

    setTimeout(function () {
        guessField.classList.remove("shake");
    }, 300);
}

// finish game
function finishGame() {
    gameOver = true;
    guessField.disabled = true;
    submitBtn.disabled = true;
    playAgainBtn.hidden = false;
}

// restart game
playAgainBtn.addEventListener("click", function () {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    previousGuesses = [];
    gameOver = false;
    guesses.textContent = "";
    attemptsLeft.textContent = attempts;
    progressBar.style.width = "100%";
    message.textContent = "";
    guessField.value = "";
    guessField.disabled = false;
    submitBtn.disabled = false;
    playAgainBtn.hidden = true;
    guessField.focus();
});

// update best score
function updateBestScore() {
    const currentBest = Number(localStorage.getItem("bestScore"));
    const score = previousGuesses.length;

    if (score < currentBest) {
        localStorage.setItem("bestScore", score);
        bestScoreText.textContent = score;
    }
}
