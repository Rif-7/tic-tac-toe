function player(name, choice) {
    return {name, choice};
}

let playerOne = player("Player 1", "X");
let playerTwo = player("Player 2", "O");

let gameFlow = (() => {
    let players = {player1: null, player2: null};
    let currentPlayer;
    const getCurrentPlayer = () => currentPlayer;

    function setPlayers(playerOne, playerTwo) {
        players.player1 = playerOne;
        players.player2 = playerTwo;
        currentPlayer = players.player1;
    }

    function makeBoard() {
        const displayBoard = document.querySelector(".board");
    
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
    }

    function switchPlayer() {
        if (currentPlayer.name === players.player1.name) {
            currentPlayer = players.player2;
        }
        else {
            currentPlayer = players.player1;
        }
    };

    function checkWinner() {
        return;
    }


    return {switchPlayer, setPlayers, checkWinner, makeBoard, getCurrentPlayer};
})();

gameFlow.makeBoard();
gameFlow.setPlayers(playerOne, playerTwo);


function gameBoard() {
    const updateBoard = (rowNo, cellNo, player) => {
        const row = document.querySelector(`.rowNo-${rowNo}`);
        const cell = row.querySelector(`.cellNo-${cellNo}`);
        const choice = document.createElement("div");
        choice.classList.add("choice");
        choice.textContent = player.choice;
        cell.append(choice);
        gameFlow.switchPlayer();
    }

    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
        const cells = row.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", function () {
                let rowNo = row.getAttribute("data-rowNo");
                let cellNo = cell.getAttribute("data-cellNo");
                updateBoard(rowNo, cellNo, gameFlow.getCurrentPlayer());
                }, {once: true});
            })
        })

    return;
}

gameBoard();


const foo = () => {
    let bar = 0;
    function changeBar() {
        bar++;
    }
    return {changeBar, bar};
}