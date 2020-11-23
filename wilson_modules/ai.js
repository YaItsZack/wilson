//
// A. I.
//
// This mod allows the bot to learn.
//
// https://github.com/BrainJS/brain.js#more-examples
//
var brain = require('brain.js');

global.net = new brain.recurrent.LSTM();

var training = {
    iterations: 100, // 500
    log: (data)=>{
      Log(3, `${data}`);
    }
};

var data = [
    { input: 'whats my rank', output: 'rank'},
    { input: 'whats my role', output: 'rank'},
    { input: 'what time is it', output: 'time'},
    { input: 'whats up', output: 'status'},
    { input: 'hows it going', output: 'status'},
    { input: 'whatcha up to', output: 'status'},
    { input: 'watcha doing', output: 'status'},
    { input: 'what are you doing', output: 'status'},
    { input: 'status', output: 'status'},
    { input: 'wilson help', output: 'help'},
    { input: 'help', output: 'help'},
    { input: 'help me', output: 'help'},
    { input: 'commands', output: 'help'},
    { input: '?', output: 'help'},
    { input: 'wilson', output: 'react'}
];

Log(3, `Starting AI.`);
net.train(data, training);
Log(3, `AI ready!`);