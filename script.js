function getComputerChoice() {
    let choices = ['Rock', 'Paper', 'Scissors'];
    let computerChoice = Math.floor(Math.random() * choices.length);
    let computerSelection = choices[computerChoice];
    return (computerSelection);
}

function playRound(playerSelection, computerSelection) {

    switch (playerSelection + computerSelection) {
        case 'rockScissors':
        case 'paperRock':
        case 'scissorsPaper':
            return 'YOU WIN!'
            break
        case 'rockPaper':
        case 'paperScissors':
        case 'scissorsRock':
            return 'YOU LOSE!'
            break
        case 'rockRock':
        case 'paperPaper':
        case 'scissorsScissors':
            return 'TIE!'
            break
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (i = 0; i < 5; i++) {
        let playerSelection = prompt('Choose: Rock, Paper or Scissors?').toLowerCase();
        let computerSelection = getComputerChoice();
        let result = playRound(playerSelection, computerSelection);
        console.log(`Round ${i + 1} ${result}`);

        if (result.includes("WIN")) {
            playerScore += 1;
        } else if (result.includes("LOSE")) {
            computerScore += 1;
        }
    }
    if (playerScore > computerScore) {
        return `You beat the computer!`;
    } else if (computerScore > playerScore) {
        return `You lost this game!`;
    } else {
        return `It's a tie, give it another shot!`;
    }

}

console.log(game());
