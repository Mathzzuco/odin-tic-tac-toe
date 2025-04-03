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
      return false;
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
    play : (y, x, boardSquare) => {
      if (game.board[y][x] == "-") {
        game.board[y][x] = game.turn.symbol;
        boardSquare.innerHTML = game.turn.symbol;
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
  // checks if the players already exist
  // this will be used to keep scores through multiple matches
  if (typeof player1 === "undefined") {
    player1 = createPlayer("Aron");
    player2 = createPlayer("Jane");
  }

  console.log("game started");
  const board = createGameBoard().board;
  const boardHTML = [];
  for(let y = 0; y<3; y++) {
    for(let x = 0; x<3; x++) {
      const boardSquare = document.createElement("button");
      boardSquare.addEventListener("click", function() {
        if(!game.checkWin() && game.checkBoardSpace()) {
          game.play(y, x, boardSquare);
          console.log(game.board[0]);
          console.log(game.board[1]);
          console.log(game.board[2]);
          console.log(game.players);
        } else {
          console.log("full board");
        }
      })
      document.querySelector(".gameboard").appendChild(boardSquare);
      boardHTML.push(boardSquare);
    }
  }
    document.querySelector(".reset-button").addEventListener("click", function() {
      // if(!game.checkWin() && game.checkBoardSpace()) {
      // game.play(0, 0);
      // game.play(1, 0);
      // game.play(1, 1);
      // game.play(2, 0);
      // game.play(2, 2);
      // console.log(game.board[0]);
      // console.log(game.board[1]);
      // console.log(game.board[2]);
      // console.log(game.players);
      // } else {
      //   console.log("full board");
      // }
    })

    const game = createGame(board, player1, player2);
    game.placeSymbols();
}
