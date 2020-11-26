var osu = require('async-os-utils');
var cpu = osu.cpu;
var netstat = osu.netstat;

count = ()=>{
    return cpu.count();
}
usage = async ()=>{
    return await cpu.usage();
}

global.Report = async () => {
    var a = {
        "count":`${count()}`,
        "usage":`${await usage()}`
    }
    return a;
}