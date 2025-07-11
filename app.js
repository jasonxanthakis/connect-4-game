import { type } from 'node:os';
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

function outputSum(num) {
  return num*2;
}

class Game {

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
    
    for (let i = 0; i < 7; i++) {
      arr.push('col' + i.toString());
      arr.push('col '+ i.toString());
      arr.push(i.toString());
    };
    
    return arr;
  };

  async getValue() {
    this.value = await getInput('Select a column (1-8): ', this.getValid(), rl);
    this.value = this.value.charAt(this.value.length - 1);
    this.value = Number(this.value);
  };
}

class ComputerPlayer extends Player {
    randomise() {
        this.value = Math.floor(Math.random() * 7);
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

/*
module.exports = {
  getInput,
  outputSum
};
*/

const temp = new HumanPlayer();
await temp.getValue();
console.log(temp.value, typeof temp.value);

process.exit(0);