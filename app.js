// Show Modal //
const modalSection = document.querySelector(".modal-sec");
const modalOpen = document.querySelector(".modal-sec__button");
const modalClose = document.querySelector(".modal__button");

modalOpen.addEventListener("click", () => {
  modalSection.classList.toggle("show-modal");
});

modalClose.addEventListener("click", () => {
  modalSection.classList.toggle("show-modal");
});

// Main Game //
const gameContainer = document.querySelector(".game-container");
const choiceButton = document.querySelectorAll(".game-container button");
const resultContainer = document.querySelector(".result-sec");
const showScore = document.querySelector(".header__score span");

// INIT items
const choose = ["rock", "paper", "scissors"];
let score = 0;

// Show score
showScore.textContent = getScore();

// Events Fot Choice Buttons //
choiceButton.forEach((button) => {
  button.addEventListener("click", () => {
    const userChoice = button.dataset.id;
    const aiChoice = aiChoose();

    // Display picked item
    displayChoose(userChoice, aiChoice);

    // Winner
    showWinner(userChoice, aiChoice);
  });
});

// Functions //

// AI choice
function aiChoose() {
  const random = Math.floor(Math.random() * choose.length);
  return choose[random];
}

// Display choices at html docs
function displayChoose(user, ai) {
  gameContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  resultContainer.innerHTML = `
            <div class="${user}-con user-choice">
            <button class="button">
              <img src="./images/icon-${user}.svg" alt="${user}" />
            </button>
            </div>
            <h3 class="user-pick">You Picked</h3>

            <div class="ai-con ai-choice"></div>
            <h3 class="ai-pick">The house picked</h3>
  `;

  setTimeout(() => {
    const aiPic = resultContainer.querySelector(".ai-choice");
    aiPic.classList.remove("ai-con");
    aiPic.classList.add(`${ai}-con`);
    aiPic.innerHTML = ` <button class="button">
                          <img src="./images/icon-${ai}.svg" alt="${ai}" />
                        </button>`;
  }, 500);
}

// Show Winner
function showWinner(user, ai) {
  const div = document.createElement("div");
  div.classList.add("winner-sec");
  const winnerName = document.createElement("h1");
  winnerName.classList.add("winner");
  const againButton = document.createElement("button");
  againButton.classList.add("again-button");
  againButton.textContent = "Play Again";

  // Get winner

  winnerName.textContent = getWinner(user, ai);

  div.append(winnerName, againButton);
  resultContainer.appendChild(div);

  setTimeout(() => {
    div.classList.add("show-winner");
    setScore();
    showScore.textContent = getScore();
  }, 1000);

  // Play again
  restart(againButton);
}

// Get winner
function getWinner(user, ai) {
  let winner = "";
  if (user === ai) {
    winner = "Draw";
  } else if (user === "rock") {
    if (ai === "paper") {
      winner = "You lose";
      const getP = resultContainer.querySelector(".ai-choice");
      showEffect(getP);
      score--;
    } else {
      winner = "you win";
      const getP = resultContainer.querySelector(".user-choice");
      showEffect(getP);
      score++;
    }
  } else if (user === "paper") {
    if (ai === "scissors") {
      winner = "you lose";
      const getP = resultContainer.querySelector(".ai-choice");
      showEffect(getP);
      score--;
    } else {
      winner = "you win";
      const getP = resultContainer.querySelector(".user-choice");
      showEffect(getP);
      score++;
    }
  } else if (user === "scissors") {
    if (ai === "rock") {
      winner = "you lose";
      const getP = resultContainer.querySelector(".ai-choice");
      showEffect(getP);
      score--;
    } else {
      winner = "you win";
      const getP = resultContainer.querySelector(".user-choice");
      showEffect(getP);
      score++;
    }
  }

  return winner;
}

// Play again
function restart(play) {
  play.addEventListener("click", () => {
    resultContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
  });
}

// Local storage for score
function setScore() {
  localStorage.setItem("userScore", score.toString());
}

function getScore() {
  const sc = Number(localStorage.getItem("userScore"));
  return sc;
}

// Show effect
function showEffect(getP) {
  setTimeout(() => {
    getP.classList.add("win");
  }, 1000);
}
