global.colors = require('colors');
global.moment = require('moment');
var columnify = require('columnify');
var setTitle = require('console-title');
const { Socket } = require('socket.io');

setTitle('Wilson');

global.Log = function(code, output){
    var name = `Unknown`.bgWhite.white;
    if(code == 0){
        name = `System`.red
    }
    if(code == 1){
        name = `Discord`.blue
    }
    if(code == 2){
        name = `Server`.yellow
    }
    if(code == 3){
        name = `AI`.america
    }
    if(code == 4){
        name = `IO`.gray
    }
    var tag = name;
    var out = `${output}`.white;
    var time = moment().format('hh:mm a');
    var time = `${time}`.gray;

    var data = [{
        time: `${time}`, 
        tag: `${tag}`, 
        output: `${out}`
    }];
    var options = {
        preserveNewLines: true,
        minWidth: 10,
        config: {
            time: {maxWidth: 10},
            tag: {maxWidth: 10},
            output: {minWidth: 10,maxWidth:100},
        },
        showHeaders: false
        //columnSplitter: '| '.gray
    };
    console.log(columnify(data, options));
    try{
        io.emit("log", output);
    }catch(err){
        //
    }
}