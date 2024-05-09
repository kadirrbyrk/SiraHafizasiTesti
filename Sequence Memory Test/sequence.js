const buttonRows = document.querySelectorAll(".button-row");
let buttons = [];
let delay = 1000;

buttonRows.forEach((row) => {
  const rowButtons = row.querySelectorAll("button");
  buttons = buttons.concat(Array.from(rowButtons));
});

const levelLabel = document.getElementById("level");

let level = 0;
let randomNumbers = [];

let buttonsID = [];

const gameOverDiv = document.getElementById("game-over");
gameOverDiv.style.display = "none";

const gameAreaDiv = document.getElementById("game-area");

const gameOverLevelLabel = document.getElementById("game-over-level");

const tryAgainButton = document.getElementById("try-again");

const backHomePageButton = document.getElementById("back-home-page");

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addRandomNumber() {
  let randomNumber;

  do {
    randomNumber = getRandomInteger(0, 8);
  } while (randomNumber === randomNumbers[randomNumbers.length - 1]);

  randomNumbers.push(randomNumber);
}

function selectedButtonsChangeBackgroundColor() {
  for (let i = 0; i < level + 1; i++) {
    addRandomNumber();
    const buttonIndex = randomNumbers[i];
    setTimeout(() => {
      buttons[buttonIndex].style.backgroundColor = "white";
      setTimeout(() => {
        restoreButton(buttonIndex);
      }, delay);
    }, i * delay);
  }
}

function restoreButton(buttonIndex) {
  buttons[buttonIndex].style.backgroundColor = "#2573C1";
}

function gameStart() {
  buttons.forEach((button) => {
    button.setAttribute("disabled", "true");
  });

  selectedButtonsChangeBackgroundColor();
  levelLabel.innerHTML = `level : ${level + 1}`;
}
gameStart();
setTimeout(() => {
  buttons.forEach((button) => {
    button.removeAttribute("disabled");
  });
}, delay);

let counter = 0;

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    if (randomNumbers[counter] == button.id) {
      counter++;
      button.style.backgroundColor = "white";
      afterClickDelay(button, 300);
    } else {
      gameOverDiv.style.display = "block";
      gameAreaDiv.style.position = "absolute";
      gameAreaDiv.style.left = "-9999px"; // ya da herhangi bir yer
      gameAreaDiv.style.top = "-9999px";
      gameOverLevelLabel.innerHTML = `Level ${level + 1} `;
    }
    if (level + 1 == counter) {
      counter = 0;
      level++;
      setTimeout(() => {
        gameStart();
      }, 1000);

      setTimeout(() => {
        buttons.forEach((button) => {
          button.removeAttribute("disabled");
        });
      }, (level + 1) * delay);
    }
  });
});

function afterClickDelay(button, delay) {
  setTimeout(() => {
    button.style.backgroundColor = "#2573C1";
  }, delay);
}

function restartGame() {
  gameAreaDiv.style.position = "static";
  gameAreaDiv.style.left = "";
  gameAreaDiv.style.top = "";
  gameOverDiv.style.display = "none";
  level = 0;
  counter = 0;
  randomNumbers = [];
  setTimeout(() => {
    buttons.forEach((button) => {
      button.removeAttribute("disabled");
    });
  }, (level + 1) * delay);

  gameStart();
}

tryAgainButton.addEventListener("click", function () {
  restartGame();
});

backHomePageButton.addEventListener("click", function () {
  window.location.href = "index.html";
});
