var currentLevel = "easy";
var score = 0;
var timerId;
var timeLeft;

var codeEl = document.getElementById("code-snippet");
var answersEl = document.getElementById("answers");
var feedbackEl = document.getElementById("feedback");
var counterEl = document.getElementById("question-counter");
var timerEl = document.getElementById("timer");

var levelData = {
    easy: [],
    medium: [],
    hard: []
};

async function loadJSON() {
    levelData.easy = await (await fetch("data/easy.json")).json();
    levelData.medium = await (await fetch("data/medium.json")).json();
    levelData.hard = await (await fetch("data/hard.json")).json();

    startGame();
}

function startGame() {
    score = 0;
    updateLevelButtons(currentLevel);
    startNewRound(levelData[currentLevel]);
    renderQuestion();
}

function startTimer() {
    timeLeft = 20;
    timerEl.textContent = "Time: " + timeLeft;

    timerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            nextQuestion();
        }
    }, 1000);
}

function renderQuestion() {
    clearInterval(timerId);

    let q = roundQuestions[roundIndex];

    codeEl.textContent = q.code;
    counterEl.textContent = "Question " + (roundIndex + 1) + " / " + ROUND_SIZE;
    feedbackEl.textContent = "";
    answersEl.innerHTML = "";

    q.answers.forEach((ans, idx) => {
        let btn = document.createElement("button");
        btn.textContent = ans;
        btn.dataset.index = idx;

        btn.addEventListener("click", () => {
            if (idx === q.correct) {
                score++;
                feedbackEl.textContent = "Correct!";
            } else {
                feedbackEl.textContent = "Wrong!";
            }

            setTimeout(nextQuestion, 600);
        });

        answersEl.appendChild(btn);
    });

    startTimer();
}

function nextQuestion() {
    roundIndex++;

    if (roundIndex >= ROUND_SIZE) {
        showSummary(currentLevel, score, ROUND_SIZE);
        return;
    }

    renderQuestion();
}

document.getElementById("summary-back").addEventListener("click", () => {
    hideSummary();
    startGame();
});

document.querySelectorAll('#level-select [role="radio"]').forEach(btn => {
    btn.addEventListener("click", () => {
        currentLevel = btn.dataset.level;
        startGame();
    });
});

loadJSON();
