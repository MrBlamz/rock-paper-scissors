const options = ['Rock', 'Paper', 'Scissors'];
const WINNERS = {
  TIE: 'Tie',
  HUMAN: 'Human',
  COMPUTER: 'Computer',
};
let computerScore = 0;
let humanScore = 0;

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

function checkIfIsGameOver(humanScore, computerScore) {
  return humanScore === 5 || computerScore === 5;
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

function toggleModal() {
  const modal = document.querySelector('.modal');
  modal.classList.toggle('active');
}

function printGameResult(humanScore, computerScore) {
  const text = document.querySelector('.modal .winner');

  if (humanScore === 5) {
    text.textContent = `You won! (${humanScore} - ${computerScore})`;
  }

  if (computerScore === 5) {
    text.textContent = `You lose! (${humanScore} - ${computerScore})`;
  }

  toggleModal();
}

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

  const isGameOver = checkIfIsGameOver(humanScore, computerScore);

  if (isGameOver) {
    printGameResult(humanScore, computerScore);
  }
}

function start() {
  const choiceButtons = document.querySelectorAll('.choice-button');

  choiceButtons.forEach((btn) =>
    btn.addEventListener('click', (e) => playRound(e.target.textContent))
  );
}

function reset() {
  const resetButton = document.querySelector('.reset-btn');

  resetButton.addEventListener('click', () => {
    const playerScoreUiElement = document.querySelector('.score .player');
    const computerScoreUiElement = document.querySelector('.score .computer');

    humanScore = 0;
    computerScore = 0;
    playerScoreUiElement.textContent = `Human - ${humanScore}`;
    computerScoreUiElement.textContent = `Computer - ${computerScore}`;

    toggleModal();
  });
}

function play() {
  start();
  reset();
}

play();
