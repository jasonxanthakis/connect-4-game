import { createInterface } from 'node:readline/promises';
//const { createInterface } = require('node:readline/promises');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getInput(prompt, accepted, rl) {
  while (true) {
    let answer = await rl.question(prompt);

    for (let i of accepted) {
      if (i === answer.toLowerCase()) {
        return answer;
      };
    };

    console.log('Invalid input...');
  }
}

class Game {
/*
  constructor({ getInput, HumanPlayer, ComputerPlayer }) {
    this.getInput = getInput;
    this.HumanPlayer = HumanPlayer;
    this.ComputerPlayer = ComputerPlayer;

    this.player1 = new this.HumanPlayer();
    this.player2 = null;
    this.gameRun = true;
  }
*/
  constructor() {
    this.player1 = new HumanPlayer();
    this.player2;

    this.grid = [];
    this.gameRun = true;
  };

  checkWinner(marker) {
    const directions = [
      [0, 1],   // Horizontal →
      [1, 0],   // Vertical ↓
      [1, 1],   // Diagonal ↘
      [-1, 1],  // Diagonal ↗
    ];

    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        if (this.grid[row][col] !== marker) continue;

        for (let [dx, dy] of directions) {
          let count = 1;

          let x = row + dx;
          let y = col + dy;

          while (
            x >= 0 && x < this.grid.length &&
            y >= 0 && y < this.grid[0].length &&
            this.grid[x][y] === marker
          ) {
            count++;
            if (count === 4) return true;
              x += dx;
              y += dy;
          }
        };
      };
    };
    return false;
  };

  placeMarker(column, marker) {
    if (column < 0 || column > 7) {
      console.log("Invalid column");
      return;
    }
    let row = 0
    for(row; row < 5; row++) {
      if (this.grid[row + 1][column] != "-") {
        this.grid[row][column] = marker;
        return;
      }
    }
    this.grid[row][column] = marker;
  }

  async gameLoop() {
    this.grid = generateGrid();
    this.winner = false;
    
    let col;
    
    while (true) {
      await this.player1.getValue();
      await this.player2.getValue();

      col = this.player1.value;
      this.placeMarker(col-1, 'X');
      this.winner = this.checkWinner('X');

      console.log('');
      console.log(`Player 1 placed a marker on column ${col}`);
      displayGrid(this.grid);

      if (this.winner) {
        console.log('Player 1 has four in a row!');
        console.log('Player 1 wins!');
        this.player1.numOfWins++;
        break;
      };

      col = this.player2.value;
      this.placeMarker(col-1, 'O');
      this.winner = this.checkWinner('O');

      console.log('');
      console.log(`Player 2 placed a marker on column ${col}`);
      displayGrid(this.grid);

      if (this.winner) {
        console.log('Player 2 has four in a row!');
        console.log('Player 2 wins!');
        this.player1.numOfWins++;
        break;
      };

    };

    console.log('');
  };

  async mainLoop() {
    while (this.gameRun === true){
      if (this.player1.numOfWins != 0) {
        console.log(`Current wins: ${this.player1.numOfWins}`);
      };
      
      let answer = await getInput('Do you want to play again? ', ['yes','no','','y','n'], rl);
      if (answer === 'no' | answer === 'n') {
        this.gameRun = false;
        return;
      };

      let enemy = await getInput('Do you want to play against a player or a computer?', ['', 'player', 'p', 'c', 'com', 'computer', 'cpu'], rl);
      if (['player', 'p'].includes(enemy)) {
        this.player2 = new HumanPlayer();
      } else {
        this.player2 = new ComputerPlayer();
      };

      await this.gameLoop();
    };
    return;
  };
}

class Player {
    constructor() {
        this.value;
        this.numOfWins = 0;
    };
}

class HumanPlayer extends Player {
  getValid() {
    const arr = [];

    for (let i = 1; i < 8; i++) {
      arr.push('col' + i.toString());
      arr.push('col '+ i.toString());
      arr.push(i.toString());
    };

    return arr;
  };

  async getValue() {
    this.value = await getInput('Select a column (1-7): ', this.getValid(), rl);
    this.value = this.value.charAt(this.value.length - 1);
    this.value = Number(this.value);
  };
}

class ComputerPlayer extends Player {
    randomise() {
        this.value = Math.ceil(Math.random() * 7);
    };

    async getValue() {
      this.randomise();
    };
}

function generateGrid() {
  let array = [];
  for(let i=0; i < 6; i++){
    let row =[];
    for(let j=0; j< 7; j++) {
      row.push('-');
    }
    array.push(row)
  }
  return array;
}

function displayGrid(array) {
    for(let i=0; i < 6; i++) {
      let row = '';
      for (let j=0; j < 7; j++) {
         row += '|';
         row += array[i][j];
      }
    row += '|';
    console.log(row);
    }
}

function placeMarker(array, column) {
  let marker = "X";
  if (column < 0 || column > 7) {
    console.log("Invalid column");
    return;
 }
 let row = 0
 for(row; row < 5; row++) {
      if (array[row + 1][column] !== "-") {
        array[row][column] = marker;
      }
    }
  array[row][column] = marker;
  return array;
}

/*
module.exports = {
  getInput,
  Player,
  HumanPlayer,
  ComputerPlayer
};
*/

const game = new Game();
await game.mainLoop();

process.exit(0);
