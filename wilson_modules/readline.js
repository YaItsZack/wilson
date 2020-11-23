//
// Readline
//
// This mod allows the user to create a interface to input to the console.
//
const readline = require('readline');

global.rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
