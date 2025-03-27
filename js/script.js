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
    symbol : "X",
    increaseScore : () => {
      player.score++;
    },
    changeSymbol : () => {
      player.symbol = "O";
    }
  }
  return player;
}

function createGame(gameBoard, player1, player2) {
  const game = {
    board : gameBoard,
    players : [player1, player2],
    turn : player1,
    winner : null,
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
      } else {
        console.log("invalid position.")
      }
    }
  }
  return game;
}

function playGame() {
  const board = createGameBoard().board;

  const player1 = createPlayer("Aron");
  const player2 = createPlayer("Jane");
  player2.changeSymbol();

  const game = createGame(board, player1, player2);
  // game.changeTurn();
  // game.declareWinner();
  game.play(0, 1);
  game.play(0, 1);
  return game;
}

function checkRows() {
  for (y = 0; y < 3; y++) {
    if (board[y][0] == player.symbol && board[y][1] == board[y][0] && board[y][2] == board[y][0]) {
      return true;
    }
  }
  return false
}

function checkColumns() {
  for (x = 0; x < 3; x++) {
    if (board[0][x] == player.symbol && board[1][x] == board[0][x] && board[2][x] == board[0][x]) {
      return true;
    }
  }
  return false;
}

function checkDiagonals() {
  if (board[0][2] == player.symbol && board[1][1] == board[0][2] && board[2][0] == board[0][2]) {
    return true;
  }
  return false;
}