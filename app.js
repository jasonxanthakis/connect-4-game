//import { createInterface } from 'node:readline/promises';
const { createInterface } = require('node:readline/promises');

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

module.exports = {
  getInput,
  outputSum
};

//process.exit(0);
