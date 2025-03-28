// function GameBoard() {
//   // this.board = createGameBoard();
//   this.board = (function () {
//     const board = [
//       ["-", "-", "-"], 
//       ["-", "-", "-"], 
//       ["-", "-", "-"], 
//     ];
//     return board;
//   })();
// }

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

// function Player(name) {
//   this.name = name;
//   this.score = 0;
//   this.increaseScore = function() {
//     this.score++
//   }
// }

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
  const board = createGameBoard().board;

  if (typeof player1 === "undefined") {
    player1 = createPlayer("Aron");
    player2 = createPlayer("Jane");
  }
  const game = createGame(board, player1, player2);
  // game.changeTurn();
  // game.declareWinner();
  game.placeSymbols();
  while (checkBoardSpace(game.board)) {
    game.play(parseInt(window.prompt()), parseInt(window.prompt()));
    console.log(game.board[0]);
    console.log(game.board[1]);
    console.log(game.board[2]);
    if (checkWin(game.board)) {
      return game;
    }
  }
  return game;
}

function checkBoardSpace(board) {
  if(board[0].includes("-") || board[1].includes("-") || board[2].includes("-")) {
    return true;
  }
  return false;
}

function checkWin(board) {
  if (checkRows(board) || checkColumns(board) || checkDiagonals(board)) {
    return true;
  }
  return false;
}

function checkRows(board) {
  for (y = 0; y < 3; y++) {
    if (board[y][0] != "-" && board[y][1] == board[y][0] && board[y][2] == board[y][0]) {
      return true;
    }
  }
  return false
}

function checkColumns(board) {
  for (x = 0; x < 3; x++) {
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