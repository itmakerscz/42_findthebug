function updateLevelButtons(level) {
    document.querySelectorAll('#level-select [role="radio"]').forEach(btn => {
        btn.setAttribute('aria-checked', btn.dataset.level === level ? 'true' : 'false');
    });
}

function showSummary(level, score, total) {
    document.querySelector('main').hidden = true;
    const summary = document.getElementById('summary');
    summary.hidden = false;

    document.getElementById('summary-level').textContent = "Level: " + level;
    document.getElementById('summary-questions').textContent = "Questions: " + total;
    document.getElementById('summary-score').textContent = "Correct answers: " + score;
}

function hideSummary() {
    document.getElementById('summary').hidden = true;
    document.querySelector('main').hidden = false;
}
