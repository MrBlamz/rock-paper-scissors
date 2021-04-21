const HANDS = ["Rock", "Paper", "Scissors"];

function computerPlay() {
  // Get a random computer hand //
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

// Plays a single round - Returns the winner (String) //
function round(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "Rock":
      if (computerSelection === "Rock") {
        return "Tie";
      } else if (computerSelection === "Paper") {
        return "Computer";
      } else {
        return "Player";
      }
    case "Paper":
      if (computerSelection === "Rock") {
        return "Player";
      } else if (computerSelection === "Paper") {
        return "Tie";
      } else {
        return "Computer";
      }
    case "Scissors":
      if (computerSelection === "Rock") {
        return "Computer";
      } else if (computerSelection === "Paper") {
        return "Player";
      } else {
        return "Tie";
      }
  }
}

// Function that runs the entire game //
function game() {
  let currentRound = 1;
  let playerScore = 0;
  let computerScore = 0;

  while (currentRound <= 5) {
    console.log(`Round: ${currentRound}`);

    let playerHand = playerPlay();
    let computerHand = computerPlay();

    roundWinner = round(playerHand, computerHand);

    console.log(`${playerHand} vs ${computerHand}`);

    switch (roundWinner) {
      case "Computer":
        computerScore++;
        console.log("Computer won this round!");
        break;
      case "Player":
        playerScore++;
        console.log("Player won this round!");
        break;
      default:
        console.log("This round ended in a tie!");
        break;
    }

    console.log(`Player: ${playerScore} : Computer: ${computerScore}`);
    currentRound++;
  }

  // Returns the game winner (String) //
  function gameWinner() {
    return playerScore > computerScore
      ? "Player wins the game!"
      : computerScore > playerScore
      ? "Computer wins the game!"
      : "The game ended in a Tie!";
  }

  console.log(gameWinner());
}

game();
