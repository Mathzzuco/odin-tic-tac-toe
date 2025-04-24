function createGameBoard() {
  const gameBoard = {
    board : (function () {
      const board = [
        ["-", "-", "-"], 
        ["-", "-", "-"], 
        ["-", "-", "-"], 
      ];
      return board;
    })(),
  }
  
  return gameBoard;
}

function createPlayer(name) {
  const player = {
    name : name,
    score : 0,
    symbol : null,
    increaseScore : () => {
      player.score++;
    },
  }
  return player;
}

function createGame(gameBoard, player1, player2) {
  const game = {
    board : gameBoard,
    players : [player1, player2],
    turn : player1,
    winner : null,

    // places the symbols on the players
    // player 1 will always be X and player 2 will always be O
    placeSymbols : () => {
      game.players[0].symbol = "X";
      game.players[1].symbol = "O";
    },
    // does all the checks to see if there is a winner
    checkWin : () => {
      if (game.checkRows() || game.checkColumns() || game.checkDiagonals()) {
        return true;
      }
      return false;
    },
    checkRows : () => {
      for (let y = 0; y < 3; y++) {
        if (game.board[y][0] != "-" && game.board[y][1] == game.board[y][0] && game.board[y][2] == game.board[y][0]) {
          return true;
        }
      }
      return false
    },
    checkColumns : () => {
      for (let x = 0; x < 3; x++) {
        if (game.board[0][x] != "-" && game.board[1][x] == game.board[0][x] && game.board[2][x] == game.board[0][x]) {
          return true;
        }
      }
      return false;
    },
    checkDiagonals : () => {
      if ((game.board[2][0] != "-" && game.board[1][1] == game.board[2][0] && game.board[0][2] == game.board[2][0]) || 
          (game.board[0][0] != "-" && game.board[1][1] == game.board[0][0] && game.board[2][2] == game.board[0][0])) {
          return true;
      }
      return false;
    },
    // checks if there is still playable spaces in the board,
    // returns true if there is
    checkBoardSpace : () => {
      if(game.board[0].includes("-") || game.board[1].includes("-") || game.board[2].includes("-")) {
        return true;
      }
      document.querySelector(".winner-display").innerHTML = "Tie";
      document.querySelector(".reset-button").disabled = false;
      return false;
    },
    changeTurn : () => {
      if (game.turn == player1) {
        game.turn = player2;
      } else {
        game.turn = player1;
      }
    },

    // declares the player that is currently playing as the winner
    // a message declaring the winner appears and they score goes up by one
    // then players scores get updated
    declareWinner : () => {
      game.winner = game.turn.name;
      document.querySelector(".winner-display").innerHTML = `${game.winner} won the game!`;
      document.querySelector(".reset-button").disabled = false;
      game.turn.increaseScore();
      document.querySelector(".player1").innerHTML = `(X) ${game.players[0].name} - ${game.players[0].score}`;
      document.querySelector(".player2").innerHTML = `${game.players[1].score} - ${game.players[1].name} (O)`;
    },

    // y is the number of the row 0-2
    // x is the number of the column 0-2
    // boardSquare is the square clicked in html to put the player symbol
    // the function checks if the space is free to put the current playing player symbol
    // if its a winning move, the winner is declared and the score of the player is increased
    play : (y, x, boardSquare) => {
      if (game.board[y][x] == "-") {
        game.board[y][x] = game.turn.symbol;
        boardSquare.innerHTML = game.turn.symbol;
        boardSquare.setAttribute("filled", "true");
        if (game.checkWin(game.board)) {
          game.declareWinner();
        } else {
          game.changeTurn();
        }
      } else {
        console.log("invalid position.")
      }
    }
  }
  return game;
}

function playGame() {
  // clears the winner text and removes previous game board squares
  document.querySelector(".winner-display").innerHTML = "";
  document.querySelectorAll(".board-square").forEach((square) => {
    square.remove();
  })

  document.querySelector(".reset-button").disabled = true;

  console.log("game started");
  const board = createGameBoard().board;

  // creates the game board squares
  for(let y = 0; y<3; y++) {
    for(let x = 0; x<3; x++) {
      const boardSquare = document.createElement("button");

      // add a class for css styling and an attribute to check if the board square was filled
      // the attribute is used in the mouseout event
      boardSquare.classList.add("board-square");
      boardSquare.setAttribute("filled", "false");

      // checks if the game is over before playing, then checks if the game has tied after play
      // the second check is used to display the tie text without having to try to play with a full board
      boardSquare.addEventListener("click", function() {
        if(!game.checkWin() && game.checkBoardSpace()) {
          game.play(y, x, boardSquare);
          game.checkBoardSpace();
          console.log(game.board[0]);
          console.log(game.board[1]);
          console.log(game.board[2]);
          console.log(game.players);
        } else {
          console.log("full board");
        }
      })

      // displays the players symbol when hovering a board square
      // has checks to see if there is already a symbol and if the game is over with spaces left
      boardSquare.addEventListener("mouseover", function() {
        if (boardSquare.innerHTML == "" && !game.winner) {
          boardSquare.innerHTML = game.turn.symbol;
        }
      })

      // removes the temporary hover player symbol if the space wasn't filled
      boardSquare.addEventListener("mouseout", function() {
        if (boardSquare.getAttribute("filled") == "false") {
          boardSquare.innerHTML = "";
        }
      })
      document.querySelector(".gameboard").appendChild(boardSquare);
    }
  }

  // reset button starts the game again with the same players
  document.querySelector(".reset-button").addEventListener("click", function (e) {
    e.preventDefault();
    playGame()
  })

  const game = createGame(board, player1, player2);
  game.placeSymbols();
}

// logic for pressing the start game button
// the button is used for starting and restarting new games
// allows new players to be create, overwriting old ones, meaning scores and names will be changed
document.querySelector("button[type=submit]").addEventListener("click", function (e) {
  e.preventDefault();
  // takes names from the form
  const player1Name = document.getElementById("player1-input").value.trim();
  const player2Name = document.getElementById("player2-input").value.trim();

  // verifies if they aren't blank and creates the players
  if (player1Name && player2Name) {  
    document.querySelector(".register-text").innerHTML = "";
    document.querySelector(".reset-button").style.display = "inline";
    document.querySelector(".gameboard").style.display = "grid";
    document.querySelector("button[type=submit]").innerHTML = "Start new Match";

    player1 = createPlayer(player1Name);
    document.querySelector(".player1").innerHTML = `(X) ${player1Name} - 0`;
    player2 = createPlayer(player2Name);
    document.querySelector(".player2").innerHTML = `0 - ${player2Name} (O)`;

    // clears the form inputs
    document.getElementById("player1-input").value = "";
    document.getElementById("player2-input").value = "";

    // starts game
    playGame();
  } else {
    alert("One or both names are missing. Please fill both fields before starting a new match.");
  }
})