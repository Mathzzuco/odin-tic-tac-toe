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
    placeSymbols : () => {
      game.players[0].symbol = "X";
      game.players[1].symbol = "O";
    },
    changeTurn : () => {
      if (game.turn == player1) {
        game.turn = player2;
      } else {
        game.turn = player1;
      }
    },
    declareWinner : () => {
      game.winner = game.turn.name;
      game.turn.increaseScore();
    },
    // y is the number of the row 0-2
    // x is the number of the column 0-2
    // the function checks if the space is free to put the current playing player symbol
    // if its a winning move, the winner is declared and the score of the player is increased
    play : (y, x) => {
      if (game.board[y][x] == "-") {
        game.board[y][x] = game.turn.symbol;
        if (checkWin(game.board)) {
          game.declareWinner()
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
  // checks if the players already exist
  // this will be used to keep scores through multiple matches
  if (typeof player1 === "undefined") {
    player1 = createPlayer("Aron");
    player2 = createPlayer("Jane");
  }
  // test variable to make the game keep playing through multiple matches
  // when start working on html, it will be replaced by something else
  const test = true;
  while (test) {
    const board = createGameBoard().board;

    const game = createGame(board, player1, player2);
    game.placeSymbols();

    // loops plays until either, there is a winning position or the board is full
    while (!checkWin(game.board) && checkBoardSpace(game.board)) {
      // the check for winning move is done in the play function of game
      // both the window.prompt() will be replaced with values that will come from buttons in html
      game.play(parseInt(window.prompt()), parseInt(window.prompt()));
      console.log(game.board[0]);
      console.log(game.board[1]);
      console.log(game.board[2]);
    }
    console.log(game.players[0]);
    console.log(game.players[1]);
    console.log(game.board[0]);
    console.log(game.board[1]);
    console.log(game.board[2]);
  }
}
// checks if there is still playable spaces in the board,
// returns true if there is
function checkBoardSpace(board) {
  if(board[0].includes("-") || board[1].includes("-") || board[2].includes("-")) {
    return true;
  }
  return false;
}

// checks if there is a winning position currently in the game,
// returns true if there is
function checkWin(board) {
  if (checkRows(board) || checkColumns(board) || checkDiagonals(board)) {
    return true;
  }
  return false;
}

function checkRows(board) {
  for (let y = 0; y < 3; y++) {
    if (board[y][0] != "-" && board[y][1] == board[y][0] && board[y][2] == board[y][0]) {
      return true;
    }
  }
  return false
}

function checkColumns(board) {
  for (let x = 0; x < 3; x++) {
    if (board[0][x] != "-" && board[1][x] == board[0][x] && board[2][x] == board[0][x]) {
      return true;
    }
  }
  return false;
}

function checkDiagonals(board) {
  if ((board[2][0] != "-" && board[1][1] == board[2][0] && board[0][2] == board[2][0]) || 
    (board[0][0] != "-" && board[1][1] == board[0][0] && board[2][2] == board[0][0])) {
    return true;
  }
  return false;
}