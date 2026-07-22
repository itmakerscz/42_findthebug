var STORAGE_KEY = 'find-the-bug-state';

var levels = {
    easy: [
        {
            code: "int\tft_strlen(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t\ti++;\n\treturn (i + 1);\n}",
            bug: "Off-by-one: should return i, not i + 1."
        },
        {
            code: "char\t*ft_strcpy(char *d, char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t\td[i] = s[i];\n\treturn (d);\n}",
            bug: "Missing i++ inside loop → infinite loop."
        }
    ],
    medium: [
        {
            code: "int\tft_str_is_printable(char *s)\n{\n\tint i;\n\ti = 0;\n\twhile (s[i])\n\t{\n\t\tif (s[i] < 32 || s[i] > 127)\n\t\t\treturn (0);\n\t\ti++;\n\t}\n\treturn (1);\n}",
            bug: "127 is not printable; upper bound should be 126."
        },
        {
            code: "unsigned int\tft_strlcpy(char *d, char *s, unsigned int n)\n{\n\tunsigned int i;\n\ti = 0;\n\twhile (i < n && s[i])\n\t{\n\t\td[i] = s[i];\n\t\ti++;\n\t}\n\td[i] = '\\0';\n\treturn (i);\n}",
            bug: "Return must be length of src, not copied count."
        }
    ],
    hard: [
        {
            code: "void\tft_putnbr(int n)\n{\n\tchar c;\n\tif (n < 0)\n\t{\n\t\twrite(1, \"-\", 1);\n\t\tn = -n;\n\t}\n\tc = n % 10;\n\twrite(1, &c, 1);\n}",
            bug: "INT_MIN cannot be negated; c must be '0' + digit."
        },
        {
            code: "int\tft_atoi(char *s)\n{\n\tint i;\n\tint res;\n\tint sign;\n\ti = 0;\n\tres = 0;\n\tsign = 1;\n\twhile (s[i] == ' ')\n\t\ti++;\n\tif (s[i] == '-' || s[i] == '+')\n\t\tsign = -1;\n\ti++;\n\twhile (s[i] >= '0' && s[i] <= '9')\n\t{\n\t\tres = res * 10 + (s[i] - '0');\n\t\ti++;\n\t}\n\treturn (res * sign);\n}",
            bug: "Sign logic wrong; '+' should not flip sign; whitespace incomplete."
        }
    ]
};

var currentLevel = 'easy';
var currentIndex = 0;
var score = 0;

var codeEl = document.getElementById('code-snippet');
var scoreEl = document.getElementById('score');
var levelEl = document.getElementById('level');
var counterEl = document.getElementById('question-counter');
var feedbackEl = document.getElementById('feedback');
var timerEl = document.getElementById('timer');
var btnShowBug = document.getElementById('btn-show-bug');
var btnNext = document.getElementById('btn-next');
var levelButtons = document.querySelectorAll('#level-select [role="radio"]');

var summaryEl = document.getElementById('summary');
var summaryLevelEl = document.getElementById('summary-level');
var summaryQuestionsEl = document.getElementById('summary-questions');
var summaryScoreEl = document.getElementById('summary-score');
var summaryBackBtn = document.getElementById('summary-back');

var timeLeft;
var timerId;

function loadState() {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return;
    }
    var state = JSON.parse(raw);
    if (state.level && levels[state.level]) {
        currentLevel = state.level;
    }
    if (typeof state.index === 'number') {
        currentIndex = state.index;
    }
    if (typeof state.score === 'number') {
        score = state.score;
    }
}

function saveState() {
    var state = {
        level: currentLevel,
        index: currentIndex,
        score: score
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateLevelButtons() {
    levelButtons.forEach(function (btn) {
        var lvl = btn.getAttribute('data-level');
        var checked = lvl === currentLevel;
        btn.setAttribute('aria-checked', checked ? 'true' : 'false');
    });
}

function stopTimer() {
    clearInterval(timerId);
}

function startTimer() {
    timeLeft = 20;
    timerEl.textContent = 'Time: ' + timeLeft;

    timerId = setInterval(function () {
        timeLeft = timeLeft - 1;
        timerEl.textContent = 'Time: ' + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            feedbackEl.textContent = 'Time is up!';
            btnNext.focus();
        }
    }, 1000);
}

function renderQuestion() {
    stopTimer();

    var q = levels[currentLevel][currentIndex];

    codeEl.textContent = q.code;
    counterEl.textContent = 'Question ' + (currentIndex + 1);
    levelEl.textContent = 'Level: ' + currentLevel;
    scoreEl.textContent = 'Score: ' + score;
    feedbackEl.textContent = '';

    updateLevelButtons();
    saveState();
    startTimer();
}

function showSummary() {
    summaryLevelEl.textContent = 'Level: ' + currentLevel;
    summaryQuestionsEl.textContent = 'Questions: ' + levels[currentLevel].length;
    summaryScoreEl.textContent = 'Score: ' + score;

    summaryEl.hidden = false;
    document.querySelector('main').hidden = true;

    summaryBackBtn.focus();
}

summaryBackBtn.addEventListener('click', function () {
    summaryEl.hidden = false;
    summaryEl.hidden = true;
    document.querySelector('main').hidden = false;
    renderQuestion();
});

levelButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        currentLevel = btn.getAttribute('data-level');
        currentIndex = 0;
        renderQuestion();
    });
});

btnShowBug.addEventListener('click', function () {
    var q = levels[currentLevel][currentIndex];
    feedbackEl.textContent = q.bug;
    score = score + 1;
    scoreEl.textContent = 'Score: ' + score;
    saveState();
});

btnNext.addEventListener('click', function () {
    var len = levels[currentLevel].length;
    if (currentIndex + 1 >= len) {
        showSummary();
        return;
    }
    currentIndex = currentIndex + 1;
    renderQuestion();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        btnShowBug.click();
    }
    if (e.key === 'ArrowRight') {
        btnNext.click();
    }
    if (e.key === '1') {
        currentLevel = 'easy';
        currentIndex = 0;
        renderQuestion();
    }
    if (e.key === '2') {
        currentLevel = 'medium';
        currentIndex = 0;
        renderQuestion();
    }
    if (e.key === '3') {
        currentLevel = 'hard';
        currentIndex = 0;
        renderQuestion();
    }
});

loadState();
renderQuestion();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
