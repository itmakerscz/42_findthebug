var ROUND_SIZE = 5;
var roundQuestions = [];
var roundIndex = 0;

function startNewRound(levelData) {
    roundQuestions = [];
    roundIndex = 0;

    let used = {};
    while (roundQuestions.length < ROUND_SIZE) {
        let r = Math.floor(Math.random() * levelData.length);
        if (!used[r]) {
            used[r] = true;
            roundQuestions.push(levelData[r]);
        }
    }
}
