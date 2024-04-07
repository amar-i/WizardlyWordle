"use strict";

// Number of guesses and length of the word
var height = 6;
var width = 5;

// Current guess and letter for the attempt
var row = 0;
var col = 0;

// Flag to track if the game is over
var gameOver = false;

// Array of words for the game
var wordList = [
  "beast",
  "potion",
  "snape",
  "raven",
  "music",
  "hound",
  "charm",
  "moony",
  "sneak",
  "felon",
  "wands",
  "spell",
  "mercy",
  "accio",
  "albus",
  "alley",
  "binns",
  "black",
  "blast",
  "blood",
  "charm",
  "chang",
  "circe",
  "cloak",
  "colin",
  "daily",
  "death",
  "dobby",
  "dowse",
  "draco",
  "friar",
  "frogs",
  "fudge",
  "gaunt",
  "ginny",
  "giant",
  "gnome",
  "goyle",
  "grawp",
  "great",
  "harry",
  "hooch",
  "horse",
];
var guessList = [
  "accio",
  "albus",
  "alley",
  "argus",
  "arrow",
  "auror",
  "avada",
  "avery",
  "badge",
  "baron",
  "barty",
  "binns",
  "black",
  "blast",
  "blood",
  "breed",
  "broom",
  "bogey",
  "charm",
  "chang",
  "circe",
  "cloak",
  "colin",
  "comet",
  "cross",
  "curse",
  "daily",
  "death",
  "dobby",
  "dowse",
  "draco",
  "dress",
  "drive",
  "eagle",
  "errol",
  "fancy",
  "fairy",
  "felix",
  "filch",
  "fleur",
  "flies",
  "friar",
  "frogs",
  "fudge",
  "gaunt",
  "ginny",
  "giant",
  "ghost",
  "ghoul",
  "glass",
  "glory",
  "gnome",
  "goyle",
  "grawp",
  "great",
  "harry",
  "hooch",
  "horse",
  "house",
  "james",
  "juice",
  "katie",
  "knarl",
  "leaky",
  "lumos",
  "lupin",
  "madam",
  "magic",
  "major",
  "molly",
  "moody",
  "newts",
  "order",
  "pansy",
  "parse",
  "party",
  "pasty",
  "patil",
  "peace",
  "percy",
  "peter",
  "point",
  "prior",
  "purge",
  "quill",
  "repel",
  "robes",
  "seven",
  "shack",
  "sloth",
  "slugs",
  "snake",
  "snape",
  "snare",
  "snout",
  "spell",
  "squad",
  "squib",
  "stone",
  "stick",
  "stuns",
  "tonks",
  "vance",
  "venom",
  "wands",
  "welsh",
  "winky",
  "witch",
  "zonko",
  "heart",
  "waltz",
  "fiery",
  "quick",
  "petal",
  "unity",
  "whizz",
  "siren",
  "blaze",
  "prism",
  "bliss",
  "venom",
  "douse",
  "nexus",
  "doxie",
  "snake",
  "quirk",
  "pukka",
  "snout",
  "fetch",
  "hexes",
  "jinks",
  "toads",
  "yowls",
  "pixie",
  "tripe",
  "hydra",
  "snarl",
  "xenon",
  "fawke",
  "lunar",
  "gales",
  "honks",
  "ingle",
  "joust",
  "lolly",
  "mires",
  "nudge",
  "orbit",
  "pluck",
  "quack",
  "relay",
  "snark",
  "trace",
  "umbra",
  "vortex",
  "wacky",
  "pyxis",
  "flora",
  "glows",
  "hazel",
  "jumbo",
  "troll",
];

guessList = guessList.concat(wordList);
var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

var openingScreen = document.getElementById("openingScreen");
var gameBoardElement = document.getElementById("gameBoard");

window.onload = function () {
  openingScreen.style.display = "block";
};

function welcomeScreen() {
  var playerNameInput = document.getElementById("name");
  var playerName = playerNameInput.value.trim();

  if (playerName === "") {
    alert("Please enter a valid player name.");
    return;
  }

  openingScreen.style.display = "none";

  var welcomeScreen = document.getElementById("welcomeScreen");
  var displayName = document.getElementById("displayName");
  displayName.innerText = playerName;
  welcomeScreen.style.display = "block";

  if (!gameBoardElement) {
    console.error("Error: gameBoard element not found.");
    return;
  }

  gameBoardElement.style.display = "none";
}

function showInstructions() {
  var instructionScreen = document.getElementById("instructionScreen");
  var gameBoard = document.getElementById("gameBoard");
  var winnerScreen = document.getElementById("winnerScreen");
  var gameOverScreen = document.getElementById("gameOverScreen");
  var keyboard = document.querySelectorAll(".keyboard-row");

  if (instructionScreen && gameBoard && winnerScreen && gameOverScreen) {
    gameBoard.style.display = "none";
    instructionScreen.style.display = "block";
    winnerScreen.style.display = "none";
    gameOverScreen.style.display = "none";
  } else {
    console.error("Error: One or more elements not found.");
    return;
  }

  if (keyboard) {
    keyboard.forEach(function (row) {
      row.style.display = "none";
    });
  } else {
    console.error("Error: Keyboard element not found.");
  }
}

function continueGame() {
  var instructionScreen = document.getElementById("instructionScreen");
  var gameBoard = document.getElementById("gameBoard");
  var keyboard = document.querySelectorAll(".keyboard-row");

  if (instructionScreen && gameBoard && keyboard) {
    instructionScreen.style.display = "none";
    gameBoard.style.display = "block";

    keyboard.forEach(function (row) {
      row.style.display = "flex";
    });
  } else {
    console.error("Error: One or more elements not found.");
  }
}

function startGame() {
  var welcomeScreen = document.getElementById("welcomeScreen");
  if (!welcomeScreen || !gameBoardElement) {
    console.error("Error: welcomeScreen or gameBoard element not found.");
    return;
  }

  welcomeScreen.style.display = "none";
  gameBoardElement.style.display = "block";
  initialize();
}

function initialize() {
  console.log(word);
  createGameBoard();
  createKeyboard();
  addKeyPressListeners();
}

function createGameBoard() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = createTileElement(r, c);
      document.getElementById("board").appendChild(tile);
    }
  }
}

function createTileElement(r, c) {
  let tile = document.createElement("span");
  tile.id = r.toString() + "-" + c.toString();
  tile.classList.add("tile");
  tile.innerText = "";
  return tile;
}

function createKeyboard() {
  let keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
  ];

  for (let i = 0; i < keyboardLayout.length; i++) {
    let currentRow = keyboardLayout[i];
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");

    for (let j = 0; j < currentRow.length; j++) {
      let keyTile = createKeyTileElement(currentRow[j]);
      keyboardRow.appendChild(keyTile);
    }

    document.body.appendChild(keyboardRow);
  }
}

function createKeyTileElement(key) {
  let keyTile = document.createElement("div");
  keyTile.innerText = key;

  if (key === "Enter") {
    keyTile.id = "Enter";
    keyTile.classList.add("enter-key-tile");
  } else if (key === "⌫") {
    keyTile.id = "Backspace";
    keyTile.classList.add("key-tile");
  } else if ("A" <= key && key <= "Z") {
    keyTile.id = "Key" + key;
    keyTile.classList.add("key-tile");
  }

  keyTile.addEventListener("click", processKey);
  return keyTile;
}

function addKeyPressListeners() {
  document.removeEventListener("keyup", processInput);
  document.addEventListener("keyup", processInput);
}

function processKey() {
  let e = { code: this.id };
  processInput(e);
}

function processInput(e) {
  if (gameOver) return;

  if ("KeyA" <= e.code && e.code <= "KeyZ") {
    processAlphabetKey(e);
  } else if (e.code == "Backspace") {
    processBackspaceKey();
  } else if (e.code == "Enter") {
    update();
  }

  if (!gameOver && row == height) {
    gameOver = true;
    gameOverScreen();
    document.getElementById("answer").innerText = word;
  }
}

function processAlphabetKey(e) {
  if (col < width) {
    let currentTile = document.getElementById(
      row.toString() + "-" + col.toString()
    );

    if (currentTile.innerText == "") {
      currentTile.innerText = e.code[3];
      col += 1;
    }
  }
}

function processBackspaceKey() {
  if (0 < col && col <= width) {
    col -= 1;
  }

  let currentTile = document.getElementById(
    row.toString() + "-" + col.toString()
  );
  currentTile.innerText = "";
}

function update() {
  let guess = "";
  document.getElementById("answer").innerText = "";

  for (let c = 0; c < width; c++) {
    let currentTile = document.getElementById(
      row.toString() + "-" + c.toString()
    );
    let letter = currentTile.innerText;
    guess += letter;
  }

  guess = guess.toLowerCase();
  if (!guessList.includes(guess)) {
    document.getElementById("answer").innerText = "Not in word list";
    return;
  }

  let correct = 0;
  let letterCount = {};

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  for (let c = 0; c < width; c++) {
    let currentTile = document.getElementById(
      row.toString() + "-" + c.toString()
    );
    let letter = currentTile.innerText;

    if (word[c] == letter) {
      markCorrectTile(currentTile, letter);
      updateKeyTileStyle(letter, "correct");
      correct += 1;
      letterCount[letter] -= 1;
    }

    if (correct == width) {
      gameOver = true;
      winnerScreen();
    }
  }

  for (let c = 0; c < width; c++) {
    let currentTile = document.getElementById(
      row.toString() + "-" + c.toString()
    );
    let letter = currentTile.innerText;

    if (!currentTile.classList.contains("correct")) {
      processIncorrectTile(letter, currentTile, letterCount);
    }
  }

  row += 1;
  col = 0;
}

function markCorrectTile(tile, letter) {
  tile.classList.add("correct");
  let keyTile = document.getElementById("Key" + letter);
  keyTile.classList.remove("present");
  keyTile.classList.add("correct");
}

function updateKeyTileStyle(letter, styleClass) {
  let keyTile = document.getElementById("Key" + letter);
  if (!keyTile.classList.contains(styleClass)) {
    keyTile.classList.add(styleClass);
  }
}

function processIncorrectTile(letter, currentTile, letterCount) {
  if (word.includes(letter) && letterCount[letter] > 0) {
    markPresentTile(currentTile, letter);
    updateKeyTileStyle(letter, "correct");
    letterCount[letter] -= 1;
  } else {
    currentTile.classList.add("absent");
  }
}

function markPresentTile(tile, letter) {
  tile.classList.add("present");
}

function gameOverScreen() {
  displayResultScreen("gameOverScreen");
}

function winnerScreen() {
  displayResultScreen("winnerScreen");
}

function displayResultScreen(resultScreenId) {
  var gameScreen = document.getElementById("gameBoard");
  var keyboard = document.querySelectorAll(
    ".key-tile, .enter-key-tile, .correct"
  );
  var resultScreen = document.getElementById(resultScreenId);

  if (!resultScreen) {
    console.error("Error: " + resultScreenId + " element not found.");
    return;
  }

  gameScreen.style.display = "none";
  resultScreen.style.display = "block";

  if (keyboard) {
    keyboard.forEach(function (keyTile) {
      keyTile.style.display = "none";
    });
  } else {
    console.error("Error: Keyboard element not found.");
  }
}

function playAgain() {
  resetGameVariables();
  clearPreviousGameBoard();
  clearPreviousKeyboard();
  removeKeyPressListeners();
  resetAnswerDisplay();
  reinitializeGame();
  addKeyPressListeners();
  showGameBoard();
  hideResultScreens();
}

function resetGameVariables() {
  row = 0;
  col = 0;
  gameOver = false;
  word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}

function clearPreviousGameBoard() {
  var board = document.getElementById("board");
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
}

function clearPreviousKeyboard() {
  var keyboardRows = document.querySelectorAll(".keyboard-row");
  keyboardRows.forEach(function (row) {
    row.remove();
  });
}

function removeKeyPressListeners() {
  document.removeEventListener("keyup", processInput);
}

function resetAnswerDisplay() {
  document.getElementById("answer").innerText = "";
}

function reinitializeGame() {
  initialize();
}

function showGameBoard() {
  if (gameBoardElement) {
    gameBoardElement.style.display = "block";
  } else {
    console.error("Error: gameBoard element not found.");
  }
}

function hideResultScreens() {
  hideElement("gameOverScreen");
  hideElement("winnerScreen");
}

function hideElement(elementId) {
  var resultScreen = document.getElementById(elementId);
  if (resultScreen) {
    resultScreen.style.display = "none";
  }
}
