// Define the grid and game variables
let grid = []; // Store the game grid
let score = 0; // Store the current score
let moves = 0; // Store the number of moves made
const gridSize = 4; // Size of the grid (4x4 for standard 2048)

// Function to start the game
function startGame() {
    // Hide landing page and show game page
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
    // Reset the game state
    resetGame();
}

// Function to reset the game
function resetGame() {
    score = 0; // Reset score
    moves = 0; // Reset moves
    // Update UI elements
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("moves").innerText = `Moves: ${moves}`;
    document.getElementById("message").innerText = '';
    // Initialize the grid
    initGrid();
    addNewTile();
    addNewTile();
    // Update the grid UI
    updateGrid();
}

// Function to initialize the grid
function initGrid() {
    grid = [];
    // Create an empty grid
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = 0;
        }
    }
}

// Function to add a new tile to the grid
function addNewTile() {
    let emptyCells = [];
    // Find all empty cells on the grid
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({x: i, y: j});
            }
        }
    }
    // If there are empty cells, add a new tile (2 or 4) to a random empty cell
    if (emptyCells.length > 0) {
        const {x, y} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Function to update the grid UI
function updateGrid() {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';
    // Update each cell in the grid
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.dataset.value = grid[i][j];
            cell.innerText = grid[i][j] !== 0 ? grid[i][j] : '';
            gridContainer.appendChild(cell);
        }
    }
    // Update the score and moves displayed on the UI
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("moves").innerText = `Moves: ${moves}`;
}

// Event listener for keyboard input
document.addEventListener('keydown', function (e) {
    let moved = false;
    // Check the pressed key and perform corresponding movement
    if (e.key === 'ArrowUp') moved = moveUp();
    else if (e.key === 'ArrowDown') moved = moveDown();
    else if (e.key === 'ArrowLeft') moved = moveLeft();
    else if (e.key === 'ArrowRight') moved = moveRight();
    // If a move was made, update grid and check for win/lose conditions
    if (moved) {
        moves++;
        addNewTile();
        updateGrid();
        if (checkWin()) {
            document.getElementById("message").innerText = 'You Win!';
        } else if (checkGameOver()) {
            document.getElementById("message").innerText = 'Game Over!';
        }
    }
});

// Functions to handle movement in different directions
function moveUp() {
    let moved = false;
    // Iterate through each column from top to bottom
    for (let j = 0; j < gridSize; j++) {
        for (let i = 1; i < gridSize; i++) {
            if (grid[i][j] !== 0) {
                let k = i;
                // Move tile upwards until blocked or reaching the top
                while (k > 0 && grid[k - 1][j] === 0) {
                    grid[k - 1][j] = grid[k][j];
                    grid[k][j] = 0;
                    k--;
                    moved = true;
                }
                // Merge tiles if possible
                if (k > 0 && grid[k - 1][j] === grid[k][j]) {
                    grid[k - 1][j] *= 2;
                    grid[k][j] = 0;
                    score += grid[k - 1][j];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Function to move tiles downwards
function moveDown() {
    let moved = false;
    // Iterate through each column from bottom to top
    for (let j = 0; j < gridSize; j++) {
        for (let i = gridSize - 2; i >= 0; i--) {
            if (grid[i][j] !== 0) {
                let k = i;
                // Move tile downwards until blocked or reaching the bottom
                while (k < gridSize - 1 && grid[k + 1][j] === 0) {
                    grid[k + 1][j] = grid[k][j];
                    grid[k][j] = 0;
                    k++;
                    moved = true;
                }
                // Merge tiles if possible
                if (k < gridSize - 1 && grid[k + 1][j] === grid[k][j]) {
                    grid[k + 1][j] *= 2;
                    grid[k][j] = 0;
                    score += grid[k + 1][j];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Function to move tiles to the left
function moveLeft() {
    let moved = false;
    // Iterate through each row from left to right
    for (let i = 0; i < gridSize; i++) {
        for (let j = 1; j < gridSize; j++) {
            if (grid[i][j] !== 0) {
                let k = j;
                // Move tile to the left until blocked or reaching the left edge
                while (k > 0 && grid[i][k - 1] === 0) {
                    grid[i][k - 1] = grid[i][k];
                    grid[i][k] = 0;
                    k--;
                    moved = true;
                }
                // Merge tiles if possible
                if (k > 0 && grid[i][k - 1] === grid[i][k]) {
                    grid[i][k - 1] *= 2;
                    grid[i][k] = 0;
                    score += grid[i][k - 1];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Function to move tiles to the right
function moveRight() {
    let moved = false;
    // Iterate through each row from right to left
    for (let i = 0; i < gridSize; i++) {
        for (let j = gridSize - 2; j >= 0; j--) {
            if (grid[i][j] !== 0) {
                let k = j;
                // Move tile to the right until blocked or reaching the right edge
                while (k < gridSize - 1 && grid[i][k + 1] === 0) {
                    grid[i][k + 1] = grid[i][k];
                    grid[i][k] = 0;
                    k++;
                    moved = true;
                }
                // Merge tiles if possible
                if (k < gridSize - 1 && grid[i][k + 1] === grid[i][k]) {
                    grid[i][k + 1] *= 2;
                    grid[i][k] = 0;
                    score += grid[i][k + 1];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Function to check for a win condition (if any tile equals 2048)
function checkWin() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 2048) {
                return true;
            }
        }
    }
    return false;
}

// Function to check for a game over condition (no more valid moves)
function checkGameOver() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) {
                return false;
            }
            if (i > 0 && grid[i][j] === grid[i - 1][j]) {
                return false;
            }
            if (i < gridSize - 1 && grid[i][j] === grid[i + 1][j]) {
                return false;
            }
            if (j > 0 && grid[i][j] === grid[i][j - 1]) {
                return false;
            }
            if (j < gridSize - 1 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}
