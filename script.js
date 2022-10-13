const buttons = document.querySelectorAll('.transition');

let round = 0;
let gameEnded = false;

buttons.forEach(button => {
    button.addEventListener('click', addScore);
})

function addScore(e) {

    if (e.type != 'click' || gameEnded == true) return;


    const playerSelection = this.getAttribute('data-choice');
    const computerSelection = getComputerChoice();

    const winner = playRound(playerSelection, computerSelection);

    if (winner != 'tie') {
        const winnerElem = document.querySelector(`[winner="${winner}"]`);
        let winnerCurrentScore = Number(winnerElem.textContent);
        winnerCurrentScore += 1;
        winnerElem.textContent = winnerCurrentScore;

        if (winnerCurrentScore == 5) {
            const roundMessage = document.querySelector('.message');

            switch (winner) {
                case 'player':
                    roundMessage.textContent = 'You won!';
                    break;
                case 'computer':
                    roundMessage.textContent = 'You lost...'
                    break;
            }

            gameEnded = true;

            const resetBtn = document.querySelector('.reset');
            resetBtn.style.display = 'initial';
            resetBtn.addEventListener('click', () => {
                reset();
            })
        }
    }

}

const animatedBtns = document.querySelectorAll('.transition');
animatedBtns.forEach(btn => {
    btn.addEventListener('transitionend', removeTransition)
});


function removeTransition(e) {
    if (e.propertyName != 'transform') return;
    this.classList.remove('animate');
}


function reset() {
    const resetElem = document.querySelector('.reset');
    resetElem.style.display = 'none';
    const scoreElements = document.querySelectorAll("[winner]");
    scoreElements.forEach(scoreElem => {
        scoreElem.textContent = 0;
    });
    const messageElem = document.querySelector('.message');
    messageElem.innerHTML = "First to reach 5 points wins"
    gameEnded = false;
    round = 0;
    const imgElements = document.querySelectorAll('.score img');
    imgElements.forEach(elem => {
        elem.style.visibility = 'hidden'
    });
    const roundElem = document.querySelector('.round');
    roundElem.textContent = '';
}


function getComputerChoice() {

    let randomNumber = Math.floor(Math.random() * 3);
    let choice;

    switch (randomNumber) {
        case 0:
            choice = 'Rock';
            break;
        case 1:
            choice = 'Paper';
            break;
        case 2:
            choice = 'Scissors';
            break;
        default:
            alert('Unexpected Random Number');
    }

    return choice;
}

function displayScoreMessage(resultMessage) {
    const roundElem = document.querySelector('.round');
    roundElem.textContent = 'Round ' + round;

    const roundMessage = document.querySelector('.message');
    roundMessage.textContent = resultMessage;
}

function displayImageChoice(playerSelection, computerSelection) {
    const imgList = { Rock: 'images/rock.png', Paper: 'images/paper.png', Scissors: 'images/scissors.png' };

    const playerElem = document.querySelector('[data-img="player-Selection"]');
    const computerElem = document.querySelector('[data-img="computer-Selection"]');

    playerElem.getAttributeNode('src').value = imgList[playerSelection];
    playerElem.style.visibility = 'visible';

    computerElem.getAttributeNode('src').value = imgList[computerSelection];
    computerElem.style.visibility = 'visible';
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.toLowerCase().slice(1, playerSelection.length);
    computerSelection = computerSelection[0].toUpperCase() + computerSelection.toLowerCase().slice(1, computerSelection.length);

    let resultMessage;
    let winner;

    displayImageChoice(playerSelection, computerSelection);

    if (playerSelection == computerSelection) {
        resultMessage = "It's a tie: " + playerSelection + " vs " + computerSelection;
        winner = 'tie';
    }

    else {
        if (playerSelection == 'Rock' && computerSelection == 'Paper' || playerSelection == 'Scissors' && computerSelection == 'Rock' || playerSelection == 'Paper' && computerSelection == 'Scissors') {
            resultMessage = "You lose. " + computerSelection + " beats " + playerSelection;
            winner = 'computer';
        }

        else {
            resultMessage = "You win. " + playerSelection + " beats " + computerSelection;
            winner = 'player';
        }
    }

    round += 1;

    displayScoreMessage(resultMessage);

    return winner;
}
