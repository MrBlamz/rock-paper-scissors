// UI VERSION //

function startGame() {
  const menu = document.getElementById("menu");
  const startBtn = document.getElementById("start-btn");
  const gameContainer = document.getElementById("game-container");

  function changeClass(element, remove, add) {
    element.classList.remove(remove);
    element.classList.add(add);
  }

  startBtn.addEventListener("click", () => {
    // Toggle fade out animation on menu
    changeClass(menu, "enabled", "disabled");

    // Wait for animation to end
    setTimeout(() => {
      // Hide menu
      menu.style.display = "none";
      // Toggle fade in animation on game container
      changeClass(gameContainer, "disabled", "enabled");
    }, 1500);
  });
}

function controlAudio() {
  const audio = document.querySelector("audio");
  const btn = document.getElementById("audio-controls");
  const playingIcon = document.getElementById("audio-playing");
  const mutedIcon = document.getElementById("audio-muted");
  let isPlaying = true;

  function changeIcon(iconToHide, iconToDisplay) {
    iconToHide.style.display = "none";
    iconToDisplay.style.display = "inline";
  }

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      changeIcon(playingIcon, mutedIcon);
    } else {
      audio.play();
      changeIcon(mutedIcon, playingIcon);
    }
  }

  audio.onplaying = () => {
    isPlaying = true;
  };

  audio.onpause = () => {
    isPlaying = false;
  };

  // Set default volume
  audio.volume = 0.5;

  btn.addEventListener("click", togglePlay);
}

// CONSOLE VERSION //
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

startGame();
controlAudio();
