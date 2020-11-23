//
// Internal Commands
//
// This file allows the user to use the readline mod to input commands.
// 



rl.on('line', (input) => {
    if(input == "exit"){
        process.exit(1);
    }
});

rl.on('SIGINT', () => {
    process.exit(1);
});