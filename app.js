/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var player0 = prompt("Hello player 1! Please enter your name");
var player1 = prompt("Hello player 2! Please enter your name");

var scores, roundScore, activePlayer, gamePlaying, totalScore;

totalScore = [0, 0];

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = "none";
    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    document.getElementById('name-0').textContent = player0 != "" ? player0 : 'Player1';
    document.getElementById('name-1').textContent = player1 != "" ? player1 : 'Player2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
init()

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        dice = Math.floor(Math.random() * 6) + 1;
        // 2. Display the result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = "block";
        diceDOM.src = 'dice-' + dice + '.png';
        //3. Update the round score IF the rolled number is NOT a 1
        if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }
    }

})

document.querySelector('.btn-hold').addEventListener("click", function () {
    if (gamePlaying) {
        // 1. Add current score to global score
        scores[activePlayer] += roundScore;
        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var pointsInput = document.querySelector('.pointsInput').value;

        // Undefined, 0, null or "" are COERCED to false
        if (pointsInput) {
            var winningScore = pointsInput;
        } else {
            winningScore = 100;
        }
        // 3. Check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            // alert("Player" + (activePlayer + 1) + " won!");
            document.querySelector('#name-' + activePlayer).textContent = "Winner!"
            document.querySelector('.dice').style.display = 'none';
            totalScore[activePlayer]++;
            document.getElementById('total-score-0').textContent = totalScore[0];
            document.getElementById('total-score-1').textContent = totalScore[1];
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

})

document.querySelector('.btn-new').addEventListener('click', init)

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}