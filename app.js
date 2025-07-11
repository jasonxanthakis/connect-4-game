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
  constructor() {
    this.player1 = new HumanPlayer();
    this.player2;

    this.gameRun = true;
  };

  gameLoop() {return;};

  async mainLoop() {
    while (this.gameRun === true){
      await this.gameLoop();

      console.log(`Current wins: ${this.player1.numOfWins}`);
      let answer = await getInput('Do you want to play again? ', ['yes','no','','y','n'], rl);
      if (answer === 'no') {
        this.gameRun = false;
        return;
      };
    }
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

const array = generateGrid() ;
displayGrid(array);

/*
module.exports = {
  getInput,
  Player,
  HumanPlayer,
  ComputerPlayer
};
*/

const temp = new HumanPlayer();
await temp.getValue();
console.log(temp.getValid());

const game = new Game();
await game.mainLoop();

process.exit(0);
