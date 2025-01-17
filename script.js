const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restartBtn = document.querySelector(".restartBtn");
const alertbox = document.querySelector(".alertbox");

// Making Variables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;

// Function to start the game
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}


const handleClick = (e) => {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn;
        if (checkWinner()) {
            // console.log(`${playerTurn} is a Winner!`);
            showAlert(`${playerTurn} is the Winner!`);
            disableCells();
        }
        else if (checkTie()) {
            // console.log(`It's a Tie!`);
            showAlert(`It's a Tie!`);
            disableCells();
        }
        else {
            changePlayerTurn();
            showAlert(`Turn for player: ${playerTurn}`);
        }
    }
}


// Function to change turn of the players
const changePlayerTurn = () => {
    if (playerTurn === currentPlayer) {
        playerTurn = nextPlayer;
    }
    else {
        playerTurn = currentPlayer;
    }
}

// Function to check winner
const checkWinner = () => {
    const winningConditions =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];
        if (gameCells[pos1].textContent !== '' &&
            gameCells[pos1].textContent === gameCells[pos2].textContent &&
            gameCells[pos2].textContent === gameCells[pos3].textContent) {
            return true;
        }
    }
    return false;
}

// Function to check tie
const checkTie = () => {
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCellsCount++;
        }
    });

    return emptyCellsCount === 0 && !checkWinner();
}

// Function to disable game board after win or tie
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}

// Function to restart game
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
};

// Function to show alert
const showAlert = (msg) => {
    alertbox.style.display = "block";
    alertbox.textContent = msg;
    setTimeout(() => {
        alertbox.style.display = "none";
    }, 4000);
}

// Adding Event Listener to restart game
restartBtn.addEventListener('click', restartGame);

// Calling start game function
startGame();