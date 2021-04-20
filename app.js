const HANDS = ["Rock", "Paper", "Scissors"];

function computerPlay() {
  return HANDS[Math.round(Math.random() * 2)];
}

function playerPlay() {
  // Ask player for a hand //
  function getPlayerHand() {
    let input = prompt(
      "Please choose one the following hands:",
      "Rock, Paper, Scissors"
    );

    if (input === null) {
      throw "Canceled! Stopping execution!";
    } else {
      return input;
    }
  }

  // Sanitizes player input //
  function sanitizeInput(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  }

  let hand = sanitizeInput(getPlayerHand());

  // Check if user hand is valid (returns a boolean) //
  function isValidHand(hand) {
    return HANDS.includes(hand);
  }

  while (!isValidHand(hand)) {
    alert("Please choose a valid hand!");

    hand = sanitizeInput(getPlayerHand());
  }

  return hand;
}

function round(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "Rock":
      if (computerSelection === "Rock") {
        return "This round ended in a tie!";
      } else if (computerSelection === "Paper") {
        return "You lose! Paper beats Rock";
      } else {
        return "You win! Rock beats Scissors";
      }
    case "Paper":
      if (computerSelection === "Rock") {
        return "You win! Paper beats Rock";
      } else if (computerSelection === "Paper") {
        return "This round ended in a tie!";
      } else {
        return "You lose! Scissors beats Paper";
      }
    case "Scissors":
      if (computerSelection === "Rock") {
        return "You lose! Rock beats Scissors";
      } else if (computerSelection === "Paper") {
        return "You win! Scissors beats Paper";
      } else {
        return "This round ended in a tie!";
      }
  }
}
