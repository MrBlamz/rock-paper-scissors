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

function playGame() {
  let playerScore = 0;
  let computerScore = 0;
  let hasWinner = false;
  let gameWinner = undefined;
  // Get all UI hand elements
  const hands = document.querySelectorAll(".hand");

  function playRound(playerHandBtn) {
    // Generates a random hand for the computer (String)
    function drawComputerHand() {
      const HANDS = ["rock", "paper", "scissors"];
      // Get a random computer hand
      return HANDS[Math.round(Math.random() * 2)];
    }

    function unhighlightHands() {
      hands.forEach((hand) => {
        hand.style.backgroundColor = "#262730";
        hand.firstElementChild.style.color = "#d33f49";
      });
    }

    function highlightHand(element) {
      element.style.backgroundColor = "#d33f49";
      element.firstElementChild.style.color = "#eff0d1";
    }

    function getWinner(playerHand, computerHand) {
      switch (playerHand) {
        case "rock":
          if (computerHand === "rock") {
            return "Tie";
          } else if (computerHand === "paper") {
            return "Computer";
          } else {
            return "Player";
          }
        case "paper":
          if (computerHand === "rock") {
            return "Player";
          } else if (computerHand === "paper") {
            return "Tie";
          } else {
            return "Computer";
          }
        case "scissors":
          if (computerHand === "rock") {
            return "Computer";
          } else if (computerHand === "paper") {
            return "Player";
          } else {
            return "Tie";
          }
        default:
          return "Error";
      }
    }

    // Display winner on the UI
    function displayWinner(winner) {
      // Makes results container visible (Container is set to display none on the html)
      function unhideResultsContainer() {
        const resultsContainer = document.querySelector("#results-container");
        resultsContainer.style.display = "flex";
      }

      const display = document.querySelector("#winner");

      unhideResultsContainer();
      // Update winner
      display.textContent = winner;
    }

    function incrementScore(winner) {
      switch (winner) {
        case "Computer":
          computerScore++;
          break;
        case "Player":
          playerScore++;
          break;
        default:
          break;
      }
    }

    function updateUIScore() {
      const playerUIElement = document.querySelector("#player-points");
      const computerUIElement = document.querySelector("#computer-points");

      playerUIElement.textContent = playerScore;
      computerUIElement.textContent = computerScore;
    }

    // Sets hasWinner boolean variable to true if player or computer gets 5 points
    function checkForGameWinner() {
      hasWinner = playerScore >= 5 || computerScore >= 5;

      if (hasWinner) {
        playerScore >= 5
          ? (gameWinner = "Player")
          : computerScore >= 5
          ? (gameWinner = "Computer")
          : undefined;
      }
    }

    // Displays the game winner
    function displayGameWinner() {
      function toggleFadeOut() {
        const resultsContainer = document.querySelector("#results-container");
        const gameContainer = document.querySelector("#game-container");
        // clone the game container to be able to trigger the fade out animation
        const clone = gameContainer.cloneNode(true);

        /*  Add display flex to clone cause by default gameContainer is set to display none and
         when enabled class is removed display none will be enabled causing container to disappear suddenly 
         which prevents the fade out animation */
        clone.style.display = "flex";
        clone.classList.remove("enabled");
        // Adding disabled class triggers the fadeout animation
        clone.classList.add("disabled");
        resultsContainer.classList.add("disabled");

        // Replacing element with its clone makes browser render animation again
        gameContainer.parentNode.replaceChild(clone, gameContainer);
        // Wait for fadeout animation to end
        setTimeout(() => {
          // Hide both elements
          clone.style.display = "none";
          resultsContainer.style.display = "none";
        }, 1500);
      }

      function createWinnerCard() {
        const container = document.createElement("div");
        const text = document.createElement("p");
        const playAgainBtn = document.createElement("button");

        text.textContent = `${gameWinner} won the game!`;
        text.style.fontSize = "75px";
        text.style.color = "#d33f49";
        text.style.marginBottom = "5vh";

        playAgainBtn.textContent = "Play Again";
        playAgainBtn.id = "play-again-btn";

        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.height = "90vh";
        // Hide element till it needs to be shown
        container.style.display = "none";
        container.style.flexDirection = "column";

        container.appendChild(text);
        container.appendChild(playAgainBtn);
        return container;
      }

      function refreshPage() {
        window.location.reload();
      }

      const mainContainer = document.querySelector("#main-container");
      const winnerCard = createWinnerCard();

      toggleFadeOut();
      mainContainer.appendChild(winnerCard);
      // Trigger fadeIn animation
      setTimeout(() => {
        winnerCard.classList.add("enabled");
      }, 1500);

      const playAgainBtn = document.querySelector("#play-again-btn");
      playAgainBtn.addEventListener("click", refreshPage);
    }

    if (!hasWinner) {
      const computerHand = drawComputerHand();
      // Get computer hand button element
      const computerHandBtn = document.querySelector(
        `#computer-${computerHand}-container`
      );
      // Get player hand from button given as a parameter (String)
      const playerHand = playerHandBtn.classList.value.replace("hand ", "");

      // Unhighlights all chosen hands from the previous round
      unhighlightHands();

      // Highlights chosen hands
      highlightHand(computerHandBtn);
      highlightHand(playerHandBtn);
      const winner = getWinner(playerHand, computerHand);
      displayWinner(winner);
      incrementScore(winner);
      updateUIScore();
      checkForGameWinner();
    }

    if (hasWinner) {
      displayGameWinner();
    }
  }

  hands.forEach((hand) => {
    hand.addEventListener("click", (e) => {
      switch (e.target.id) {
        case "player-rock":
          playRound(hand);
          break;
        case "player-paper":
          playRound(hand);
          break;
        case "player-scissors":
          playRound(hand);
          break;

        default:
          break;
      }
    });
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

startGame();
playGame();
controlAudio();
