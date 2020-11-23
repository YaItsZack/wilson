var osu = require('async-os-utils');
var cpu = osu.cpu;
var netstat = osu.netstat;

global.GetCpuCount = ()=>{
    return cpu.count();
}

Log(2, `Cores: ${GetCpuCount()}`);