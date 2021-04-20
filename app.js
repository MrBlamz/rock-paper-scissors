const Hands = ["Rock", "Paper", "Scissors"];

function computerPlay() {
  return Hands[Math.round(Math.random() * 2)];
}

function playerPlay() {
  // Ask player for a hand //
  function getPlayerHand() {
    return prompt(
      "Please choose one the following hands:",
      "Rock, Paper, Scissors"
    );
  }

  // Sanitizes player input //
  function sanitizeInput(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  }

  let hand = sanitizeInput(getPlayerHand());

  // Check if user hand is valid (returns a boolean) //
  function isValidHand(hand) {
    return Hands.includes(hand);
  }

  while (!isValidHand(hand)) {
    alert("Please choose a valid hand!");

    hand = sanitizeInput(getPlayerHand());
  }

  return hand;
}

// TODO
function round(playerSelection, computerSelection) {}

console.log(playerPlay());
