function player(name, choice) {
  return { name, choice };
}

const gameFlow = (() => {
  const players = { player1: null, player2: null };
  let currentPlayer;
  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const getCurrentPlayer = () => currentPlayer;

  function resetBoard() {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    currentPlayer = players.player1;
  }

  //updates the local user array with choices
  function updateBoard(rowNo, cellNo, player) {
    board[rowNo][cellNo] = player.choice;
    _switchPlayer();
    if (_checkWinner()) {
      document.querySelector(".game-alert").textContent = `${player.name} Won`;
      return true;
    } else if (_checkDraw()) {
      document.querySelector(".game-alert").textContent = "Tie Game";
    }
    return false;
  }

  function setPlayers(playerOne, playerTwo) {
    players.player1 = playerOne;
    players.player2 = playerTwo;
    currentPlayer = players.player1;
  }

  function _switchPlayer() {
    if (currentPlayer.name === players.player1.name) {
      currentPlayer = players.player2;
    } else {
      currentPlayer = players.player1;
    }
  }

  function _checkForStreak(list) {
    if (list[0] != null && list[0] === list[1] && list[0] === list[2])
      return true;
    return false;
  }

  function _checkWinner() {
    // checking for row winners
    for (let r = 0; r < 3; r++) {
      if (_checkForStreak(board[r])) return true;
    }

    //checking for column winners
    for (let c = 0; c < 3; c++) {
      const column = [];
      for (let i = 0; i < 3; i++) {
        column.push(board[i][c]);
      }
      if (_checkForStreak(column)) return true;
    }

    //checking for diagonal winnners
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];
    if (_checkForStreak(diagonal1) || _checkForStreak(diagonal2)) return true;

    return false;
  }

  function _checkDraw() {
    for (let i = 0; i < 3; i++) {
      if (board[i].includes(null)) return false;
    }
    return true;
  }

  return { setPlayers, getCurrentPlayer, updateBoard, resetBoard };
})();

gameFlow.setPlayers(player("Player 1", "X"), player("Player 2", "O"));

const gameBoard = (() => {
  // adding the board to the display
  function makeBoard() {
    const displayBoard = document.querySelector(".board");
    displayBoard.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      const row = document.createElement("div");
      row.classList.add("row", `rowNo-${i}`);
      row.setAttribute("data-rowNo", i);
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", `cellNo-${j}`);
        cell.setAttribute("data-cellNo", j);
        row.appendChild(cell);
      }
      displayBoard.appendChild(row);
    }

    _addEvent();
  }

  makeBoard();

  function _updateBoard(rowNo, cellNo, player) {
    const row = document.querySelector(`.rowNo-${rowNo}`);
    const cell = row.querySelector(`.cellNo-${cellNo}`);
    const choice = document.createElement("div");
    choice.classList.add("choice");
    choice.textContent = player.choice;
    cell.append(choice);

    //Updating the board array and checking if there's a winner
    if (gameFlow.updateBoard(rowNo, cellNo, player)) {
      document.querySelector(".board").innerHTML =
        document.querySelector(".board").innerHTML;
    }
    document.querySelector(".turn-info").textContent = `${
      gameFlow.getCurrentPlayer().name
    }'s Turn`;
  }

  // Adding onclick event to all the cells
  function _addEvent() {
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      const cells = row.querySelectorAll(".cell");
      cells.forEach((cell) => {
        cell.addEventListener(
          "click",
          function () {
            let rowNo = row.getAttribute("data-rowNo");
            let cellNo = cell.getAttribute("data-cellNo");
            _updateBoard(rowNo, cellNo, gameFlow.getCurrentPlayer());
          },
          { once: true }
        );
      });
    });
  }

  return { makeBoard };
})();

function resetGame() {
  gameFlow.resetBoard();
  gameBoard.makeBoard();
  document.querySelector(".game-alert").textContent = "";
  document.querySelector(".turn-info").textContent = `${
    gameFlow.getCurrentPlayer().name
  }'s turn`;
}

document.querySelector(".restart-btn").addEventListener("click", resetGame);
