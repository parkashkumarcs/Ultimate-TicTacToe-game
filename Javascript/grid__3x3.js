
const status = document.getElementById('status');
const restartGame = document.getElementById('restart__Game');
const cells = document.querySelectorAll('.cell');

let game_Board = ["", "", "", "", "", "", "", "", ""];
let game_Active = true;
let current_Player = 'X';

const winning_Patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

//Let's create a checkWinner() function for winning patterns:)

function checkWinner() {
    for (const combo of winning_Patterns) {
        const [a, b, c] = combo;
        if (game_Board[a] && game_Board[a] === game_Board[b] && game_Board[b] === game_Board[c]) {
            status.textContent = `Player ${game_Board[a]} Wins 😎!`;
            game_Active = false;
            return;
        }
    }
    if(!game_Board.includes('')){
        status.textContent = "It's Draw 😟!";
    }
}