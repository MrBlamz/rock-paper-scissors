const options = ['Rock', 'Paper', 'Scissors'];
let computerScore = 0;
let humanScore = 0;

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

function getHumanChoice() {
  const choice = prompt('Rock, Paper or Scissors?');
  return sanitizeString(choice);
}

function checkIfIsTie(human, computer) {
  return human === computer;
}

function evaluateRound(humanChoice, computerChoice) {
  if (checkIfIsTie(humanChoice, computerChoice)) {
    return 'Tie';
  }

  if (humanChoice === 'Rock' && computerChoice === 'Paper') {
    return 'Computer';
  }

  if (humanChoice === 'Rock' && computerChoice === 'Scissors') {
    return 'Human';
  }

  if (humanChoice === 'Paper' && computerChoice === 'Rock') {
    return 'Human';
  }

  if (humanChoice === 'Paper' && computerChoice === 'Scissors') {
    return 'Computer';
  }

  if (humanChoice === 'Scissors' && computerChoice === 'Rock') {
    return 'Computer';
  }

  if (humanChoice === 'Scissors' && computerChoice === 'Paper') {
    return 'Human';
  }
}

function printRoundResult(winner, humanChoice, computerChoice) {
  switch (winner) {
    case 'Tie':
      return "It's a tie!";

    case 'Human':
      return `You win! ${humanChoice} beats ${computerChoice}.`;

    case 'Computer':
      return `You lose! ${computerChoice} beats ${humanChoice}.`;
  }
}

function incrementScore(winner) {
  if (winner === 'Human') humanScore++;
  if (winner === 'Computer') computerScore++;
}

function playRound(humanChoice, computerChoice) {
  const winner = evaluateRound(humanChoice, computerChoice);
  const result = printRoundResult(winner, humanChoice, computerChoice);
  console.log(result);
  incrementScore(winner);
}

const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();

playRound(humanChoice, computerChoice);
