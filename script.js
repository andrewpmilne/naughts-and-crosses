const buttons = document.querySelectorAll(".game-board button");
const playerSpan = document.querySelector(".player");
const newGameButton = document.querySelector(".controls button");

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]           
];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "red";
updatePlayerText();

function updatePlayerText() {
    playerSpan.textContent = currentPlayer;
    playerSpan.style.color = currentPlayer;
}

function startNewGame() {
    const confirmReset = confirm("Are you sure you want to start a new game?");

    if (!confirmReset) return;

    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "red";

    buttons.forEach(button => {
        button.classList.remove("red", "blue");
    });

    updatePlayerText();
}

function checkWinner() {
    for (let combo of winningCombos) {
        const a = combo[0];
        const b = combo[1];
        const c = combo[2];
        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a];
        }
        if (board.every(cell => cell !=="")) {
            return "draw"
        }
    }

    return null;
}

function handleClick(button, index) {

    if (board[index] !== "") {
        return;
    }

    // button.style.backgroundColor = currentPlayer;
    button.classList.add(currentPlayer);

    board[index] = currentPlayer;

    const winner = checkWinner();

        if (winner === "draw") {
            setTimeout(() => {
                alert("It's a draw!");
            }, 0);
            return;
        }

        if (winner) {
            setTimeout(() => {
                alert(`${winner} wins!`);
            }, 0);
            return;
        }

    currentPlayer = currentPlayer === "red" ? "blue" : "red";
    updatePlayerText();
}

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        handleClick(button, index);
    });
});

newGameButton.addEventListener("click", startNewGame);
