let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const gameBoard = document.getElementById("game-board");
const statusText = document.getElementById("status");

function createBoard() {
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.index = index;
        div.textContent = cell;
        div.addEventListener("click", handleMove);
        gameBoard.appendChild(div);
    });
}

function handleMove(e) {
    const index = e.target.dataset.index;
    if (board[index] !== "") return;

    board[index] = currentPlayer;
    createBoard();

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        disableBoard();
    } else if (!board.includes("")) {
        statusText.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winCombos.some(combo => {
        const [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function disableBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.removeEventListener("click", handleMove));
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

createBoard();
statusText.textContent = `Player ${currentPlayer}'s turn`;
