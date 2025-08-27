const options = ['Rock', 'Paper', 'Scissors'];

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComputerChoice() {
  const choice = getRandomInteger(0, 2);
  return options[choice];
}
