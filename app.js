import { createInterface } from 'node:readline/promises';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Game {

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

module.exports = {

};

process.exit(0);
