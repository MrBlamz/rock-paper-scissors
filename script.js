const CHOICES = {
  ROCK: '✊',
  PAPER: '✋',
  SCISSORS: '✌',
};
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
  const keys = Object.keys(CHOICES);
  const randomNumber = getRandomInteger(0, Object.keys(CHOICES).length - 1);
  const randomKey = keys[randomNumber];
  return CHOICES[randomKey];
}

function checkIfIsTie(human, computer) {
  return human === computer;
}

function evaluateRound(humanChoice, computerChoice) {
  if (checkIfIsTie(humanChoice, computerChoice)) {
    return WINNERS.TIE;
  }

  if (humanChoice === CHOICES.ROCK && computerChoice === CHOICES.PAPER) {
    return WINNERS.COMPUTER;
  }

  if (humanChoice === CHOICES.ROCK && computerChoice === CHOICES.SCISSORS) {
    return WINNERS.HUMAN;
  }

  if (humanChoice === CHOICES.PAPER && computerChoice === CHOICES.ROCK) {
    return WINNERS.HUMAN;
  }

  if (humanChoice === CHOICES.PAPER && computerChoice === CHOICES.SCISSORS) {
    return WINNERS.COMPUTER;
  }

  if (humanChoice === CHOICES.SCISSORS && computerChoice === CHOICES.ROCK) {
    return WINNERS.COMPUTER;
  }

  if (humanChoice === CHOICES.SCISSORS && computerChoice === CHOICES.PAPER) {
    return WINNERS.HUMAN;
  }
}

function checkIfIsGameOver(humanScore, computerScore) {
  return humanScore === 5 || computerScore === 5;
}

function updateRoundMessages(winner, humanChoice, computerChoice) {
  const emojis = {
    '✊': 'Rock',
    '✋': 'Paper',
    '✌': 'Scissors',
  };

  const mainMessage = document.querySelector('.info-primary');
  const secondaryMessage = document.querySelector('.info-secondary');

  switch (winner) {
    case WINNERS.TIE:
      mainMessage.textContent = "It's a tie!";
      secondaryMessage.textContent = `${emojis[humanChoice]} ties with ${emojis[computerChoice]}`;
      break;

    case WINNERS.HUMAN:
      mainMessage.textContent = 'You win!';
      secondaryMessage.textContent = `${emojis[humanChoice]} beats ${emojis[computerChoice]}.`;
      break;

    case WINNERS.COMPUTER:
      mainMessage.textContent = 'You lose!';
      secondaryMessage.textContent = `${emojis[computerChoice]} beats ${emojis[humanChoice]}.`;
      break;
  }
}

function updateRoundHands(humanChoice, computerChoice) {
  const playerHand = document.getElementById('player-hand');
  const computerHand = document.getElementById('computer-hand');

  playerHand.textContent = humanChoice;
  computerHand.textContent = computerChoice;
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

function updateScore(winner) {
  const playerScoreUiElement = document.getElementById('player-score');
  const computerScoreUiElement = document.getElementById('computer-score');

  if (winner === WINNERS.HUMAN) {
    humanScore++;
    playerScoreUiElement.textContent = `Player: ${humanScore}`;
  }

  if (winner === WINNERS.COMPUTER) {
    computerScore++;
    computerScoreUiElement.textContent = `Computer: ${computerScore}`;
  }
}

function playRound(humanChoice) {
  const computerChoice = getComputerChoice();
  const winner = evaluateRound(humanChoice, computerChoice);

  updateRoundMessages(winner, humanChoice, computerChoice);
  updateRoundHands(humanChoice, computerChoice);
  updateScore(winner);

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
