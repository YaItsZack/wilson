var osu = require('async-os-utils');
var cpu = osu.cpu;
var netstat = osu.netstat;

global.GetCpuCount = ()=>{
    return cpu.count();
}
global.usage = async ()=>{
    return await cpu.usage();
}