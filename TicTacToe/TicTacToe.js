$(document).ready(function() {
    let currentPlayer; // Variable to keep track of the current player ("X" or "O")
    let moves; // Variable to keep track of the number of moves made
    let board; // Array to represent the game board

    // Function to initialize the game
    function initializeGame() {
        currentPlayer = "X"; // Set the starting player to "X"
        moves = 0; // Reset the move counter
        board = ["", "", "", "", "", "", "", "", ""]; // Reset the board array
        $("#game-container").removeClass("d-none"); // Show the game container
        updateBoard(); // Update the board display
        $("#start-btn").prop("disabled", true); // Disable the start button
    }
    
    // Function to update the board display
    function updateBoard() {
        $("#board").empty(); // Clear the existing board

        // Generate the board as a 3x3 grid
        for (let i = 0; i < 3; i++) {
            let row = $("<div class='row'></div>"); // Create a new row
            for (let j = 0; j < 3; j++) {
                let index = i * 3 + j; // Calculate the index for the board array
                let square = $(`<div class="col square" data-index="${index}">${board[index]}</div>`); // Create a new square
                row.append(square); // Append the square to the row
            }
            $("#board").append(row); // Append the row to the board
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal win conditions
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical win conditions
            [0, 4, 8], [2, 4, 6] // Diagonal win conditions
        ];

        // Check each win condition
        for (let condition of winConditions) {
            const [a, b, c] = condition; // Destructure the condition into indices
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return the winner ("X" or "O")
            }
        }

        if (moves === 9) {
            return "draw"; // Return "draw" if all squares are filled and there's no winner
        }

        return null; // Return null if there's no winner yet
    }

    // Function to handle click events on the board squares
    function handleClick() {
        const index = $(this).data("index"); // Get the index of the clicked square
        if (board[index] === "") { // Check if the square is empty
            board[index] = currentPlayer; // Mark the square with the current player's symbol
            moves++; // Increment the move counter
            updateBoard(); // Update the board display
            const winner = checkWinner(); // Check for a winner
            if (winner) {
                // Wait for a short delay before showing the alert
                setTimeout(function() {
                    if (winner === "draw") {
                        alert("It's a draw!"); // Show a draw message
                    } else {
                        alert(`${winner} won the match!`); // Show the winner message
                    }
                    $("#game-container").addClass("d-none"); // Hide the game container
                    $("#start-btn").prop("disabled", false); // Enable the start button
                }, 500); // Adjust the delay time as needed
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch the current player
            }
        }
    }
    
    // Event listener for the start button
    $("#start-btn").click(initializeGame);

    // Event listener for clicks on the board squares
    $("#board").on("click", ".square", handleClick);

    // Event listener for the restart button
    $("#restart-btn").click(initializeGame);
});
