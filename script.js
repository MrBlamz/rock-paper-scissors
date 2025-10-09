const options = ['Rock', 'Paper', 'Scissors'];
const WINNERS = {
  TIE: 'Tie',
  HUMAN: 'Human',
  COMPUTER: 'Computer',
};

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sanitizeString(string) {
  const lower = string.toLowerCase();
  return String(lower).charAt(0).toUpperCase() + String(lower).slice(1);
}

function isValidChoice(choice) {
  return options.includes(choice);
}

function getComputerChoice() {
  const choice = getRandomInteger(0, 2);
  return options[choice];
}

function checkIfIsTie(human, computer) {
  return human === computer;
}

function evaluateRound(humanChoice, computerChoice) {
  if (checkIfIsTie(humanChoice, computerChoice)) {
    return WINNERS.TIE;
  }

  if (humanChoice === 'Rock' && computerChoice === 'Paper') {
    return WINNERS.COMPUTER;
  }

  if (humanChoice === 'Rock' && computerChoice === 'Scissors') {
    return WINNERS.HUMAN;
  }

  if (humanChoice === 'Paper' && computerChoice === 'Rock') {
    return WINNERS.HUMAN;
  }

  if (humanChoice === 'Paper' && computerChoice === 'Scissors') {
    return WINNERS.COMPUTER;
  }

  if (humanChoice === 'Scissors' && computerChoice === 'Rock') {
    return WINNERS.COMPUTER;
  }

  if (humanChoice === 'Scissors' && computerChoice === 'Paper') {
    return WINNERS.HUMAN;
  }
}

function evaluateGame(humanScore, computerScore) {
  if (humanScore === computerScore) {
    return WINNERS.TIE;
  }

  if (humanScore > computerScore) {
    return WINNERS.HUMAN;
  }

  return WINNERS.COMPUTER;
}

function printCurrentRound(round) {
  console.log(`Round: ${round}`);
}

function printRoundResult(winner, humanChoice, computerChoice) {
  const container = document.querySelector('.results');

  switch (winner) {
    case WINNERS.TIE:
      container.textContent = "It's a tie!";
      break;

    case WINNERS.HUMAN:
      container.textContent = `You win! ${humanChoice} beats ${computerChoice}.`;
      break;

    case WINNERS.COMPUTER:
      container.textContent = `You lose! ${computerChoice} beats ${humanChoice}.`;
      break;
  }
}

function printGameResult(winner, humanScore, computerScore) {
  switch (winner) {
    case WINNERS.TIE:
      console.log(`The game ends in a tie! (${humanScore} - ${computerScore})`);
      break;

    case WINNERS.HUMAN:
      console.log(`You won! (${humanScore} - ${computerScore})`);
      break;

    case WINNERS.COMPUTER:
      console.log(`You lose! (${humanScore} - ${computerScore})`);
      break;
  }
}

function playGame() {
  let round = 1;
  let computerScore = 0;
  let humanScore = 0;

  const choiceButtons = document.querySelectorAll('.choice-button');

  choiceButtons.forEach((btn) =>
    btn.addEventListener('click', (e) => playRound(e.target.textContent))
  );

  function incrementScore(winner) {
    const playerScoreUiElement = document.querySelector('.score .player');
    const computerScoreUiElement = document.querySelector('.score .computer');

    if (winner === WINNERS.HUMAN) {
      humanScore++;
      playerScoreUiElement.textContent = `Human - ${humanScore}`;
    }

    if (winner === WINNERS.COMPUTER) {
      computerScore++;
      computerScoreUiElement.textContent = `Computer - ${computerScore}`;
    }
  }

  function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    const winner = evaluateRound(humanChoice, computerChoice);

    printRoundResult(winner, humanChoice, computerChoice);
    incrementScore(winner);
  }

  // while (round !== 6) {
  // printCurrentRound(round);

  round++;
  // }

  // const winner = evaluateGame(humanScore, computerScore);
  // printGameResult(winner, humanScore, computerScore);
}

playGame();
