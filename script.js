const CHOICES = {
  ROCK: '✊',
  PAPER: '✋',
  SCISSORS: '✌',
};
const WINNERS = {
  TIE: 'Tie',
  PLAYER: 'Player',
  COMPUTER: 'Computer',
};
let computerScore = 0;
let playerScore = 0;

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

function checkIfIsTie(player, computer) {
  return player === computer;
}

function evaluateRound(playerChoice, computerChoice) {
  if (checkIfIsTie(playerChoice, computerChoice)) {
    return WINNERS.TIE;
  }

  if (playerChoice === CHOICES.ROCK && computerChoice === CHOICES.PAPER) {
    return WINNERS.COMPUTER;
  }

  if (playerChoice === CHOICES.ROCK && computerChoice === CHOICES.SCISSORS) {
    return WINNERS.PLAYER;
  }

  if (playerChoice === CHOICES.PAPER && computerChoice === CHOICES.ROCK) {
    return WINNERS.PLAYER;
  }

  if (playerChoice === CHOICES.PAPER && computerChoice === CHOICES.SCISSORS) {
    return WINNERS.COMPUTER;
  }

  if (playerChoice === CHOICES.SCISSORS && computerChoice === CHOICES.ROCK) {
    return WINNERS.COMPUTER;
  }

  if (playerChoice === CHOICES.SCISSORS && computerChoice === CHOICES.PAPER) {
    return WINNERS.PLAYER;
  }
}

function checkIfIsGameOver(playerScore, computerScore) {
  return playerScore === 5 || computerScore === 5;
}

function updateRoundMessages(winner, playerChoice, computerChoice) {
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
      secondaryMessage.textContent = `${emojis[playerChoice]} ties with ${emojis[computerChoice]}`;
      break;

    case WINNERS.PLAYER:
      mainMessage.textContent = 'You win!';
      secondaryMessage.textContent = `${emojis[playerChoice]} beats ${emojis[computerChoice]}.`;
      break;

    case WINNERS.COMPUTER:
      mainMessage.textContent = 'You lose!';
      secondaryMessage.textContent = `${emojis[computerChoice]} beats ${emojis[playerChoice]}.`;
      break;
  }
}

function updateRoundHands(playerChoice, computerChoice) {
  const playerHand = document.getElementById('player-hand');
  const computerHand = document.getElementById('computer-hand');

  playerHand.textContent = playerChoice;
  computerHand.textContent = computerChoice;
}

function toggleModal() {
  const modal = document.querySelector('.modal');
  modal.classList.toggle('active');
}

function printGameResult(playerScore, computerScore) {
  const text = document.querySelector('.modal .winner');

  if (playerScore === 5) {
    text.textContent = `You won! (${playerScore} - ${computerScore})`;
  }

  if (computerScore === 5) {
    text.textContent = `You lose! (${playerScore} - ${computerScore})`;
  }

  toggleModal();
}

function updateScore(winner) {
  const playerScoreUiElement = document.getElementById('player-score');
  const computerScoreUiElement = document.getElementById('computer-score');

  if (winner === WINNERS.PLAYER) {
    playerScore++;
    playerScoreUiElement.textContent = `Player: ${playerScore}`;
  }

  if (winner === WINNERS.COMPUTER) {
    computerScore++;
    computerScoreUiElement.textContent = `Computer: ${computerScore}`;
  }
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = evaluateRound(playerChoice, computerChoice);

  updateRoundMessages(winner, playerChoice, computerChoice);
  updateRoundHands(playerChoice, computerChoice);
  updateScore(winner);

  const isGameOver = checkIfIsGameOver(playerScore, computerScore);

  if (isGameOver) {
    printGameResult(playerScore, computerScore);
  }
}

function start() {
  const choiceButtons = document.querySelectorAll('.choice-button');

  choiceButtons.forEach((btn) =>
    btn.addEventListener('click', (e) => playRound(e.target.textContent)),
  );
}

function resetUI() {
  const unknownHand = '❔';
  const infoPrimary = document.querySelector('.info-primary');
  const infoSecondary = document.querySelector('.info-secondary');
  const playerHand = document.querySelector('#player-hand');
  const computerHand = document.querySelector('#computer-hand');
  const playerScoreUiElement = document.getElementById('player-score');
  const computerScoreUiElement = document.getElementById('computer-score');

  infoPrimary.textContent = 'Choose your hand';
  infoSecondary.textContent = 'First to score 5 points wins';
  playerHand.textContent = unknownHand;
  computerHand.textContent = unknownHand;
  playerScoreUiElement.textContent = `Player: ${playerScore}`;
  computerScoreUiElement.textContent = `Computer: ${computerScore}`;
}

function reset() {
  const resetButton = document.querySelector('.reset-btn');

  resetButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;

    resetUI();
    toggleModal();
  });
}

function play() {
  start();
  reset();
}

play();
