function makeBoard() {
    const displayBoard = document.querySelector(".board");

    for (let i = 0; i < 3; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        }
        displayBoard.appendChild(row);
    }
}

makeBoard();