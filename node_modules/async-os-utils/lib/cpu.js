/**
 * author       : Sunil Wang
 * createTime   : 2017/7/9 19:39
 * description  :
 */
const fs = require('fs')
const os = require('os')
const { readFile: _readFile, access: _access } = require('fs')
const { promisify } = require('util')
const readFile = promisify(_readFile)
const access = promisify(_access)
const bucket = require('./bucket')

const cpuFields = ['user','nice','system','idle','iowait','irq','softirq','steal','guest','guest_nice']

function assoc(fields, values) {
  var o = {};
  values.forEach(function(v,i){
    if(fields.length <= i) {
      if(!o._) o._ = {};
      o._[i] = v;
    } else o[fields[i]] = v;
  });
  return o;
}

async function readProcStat (_procPath) {
  const procPath = _procPath || '/proc/stat'
  const content = await readFile(procPath, 'utf8')
  const lines = content.trim().split('\n')
  const cpus = []

  lines.forEach((l) => {
    const p = l.indexOf(' ');
    const k = l.substr(0,p);
    const v = l.substr(p).trim();
    if (k.indexOf('cpu') === 0) {
      cpus.push(assoc(cpuFields,v.split(' ')));
    }
  })

  return cpus
}

function readProcStatSync (_procPath) {
  const procPath = _procPath || '/proc/stat'
  const content = fs.readFileSync(procPath, 'utf8')
  const lines = content.trim().split('\n')
  const cpus = []

  lines.forEach((l) => {
    const p = l.indexOf(' ');
    const k = l.substr(0,p);
    const v = l.substr(p).trim();
    if (k.indexOf('cpu') === 0) {
      cpus.push(assoc(cpuFields,v.split(' ')));
    }
  })

  return cpus
}

const cpuUtils = {
  cpusSync: (procPath = '/proc/stat', cpuModel) => {
    if (!fs.existsSync(procPath)) return os.cpus()
    const stats = readProcStatSync(procPath)
    return stats.map(cpu => {
      return {
          model: cpuModel || 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz MOCK',
          speed: 2200,
          times: {
            user: Number(cpu.user),
            nice: Number(cpu.nice),
            sys: Number(cpu.system),
            idle: Number(cpu.idle),
            irq: Number(cpu.irq)
          }
        }
    })
  },
  cpus: async (procPath = '/proc/stat', cpuModel) => {
    try {
      await access(procPath, fs.constants.W_OK)
    } catch (e) {
      return os.cpus()
    }
    const stats = await readProcStat(procPath)
    return stats.map(cpu => {
      return {
          model: cpuModel || 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz MOCK',
          speed: 2200,
          times: {
            user: Number(cpu.user),
            nice: Number(cpu.nice),
            sys: Number(cpu.system),
            idle: Number(cpu.idle),
            irq: Number(cpu.irq)
          }
        }
    })
  },
  average: function (usePolyfill) {
    let totalIdle = 0
    let totalTick = 0
    let cpus

    if (usePolyfill) {
      cpus = cpuUtils.cpusSync()
    } else {
      cpus = os.cpus()
    } 

    for (let i = 0, len = cpus.length; i < len; i++) {
      let cpu = cpus[i]
      Object.keys(cpu.times).forEach(type => {
        totalTick += cpu.times[type]
      })
      totalIdle += cpu.times.idle
    }

    return {
      totalIdle: totalIdle,
      totalTick: totalTick,
      avgIdle: (totalIdle / cpus.length),
      avgTotal: (totalTick / cpus.length)
    }
  },
  usage: (interval, usePolyfill) => {
    if (!interval) {
      interval = bucket.options.INTERVAL
    }
    return new Promise((resolve) => {
      if (typeof interval !== 'number') {
        throw new TypeError('interval must be a number!')
      }

      const startMeasure = cpuUtils.average(usePolyfill)

      setTimeout(() => {
        const endMeasure = cpuUtils.average(usePolyfill)
        const idleDifference = endMeasure.avgIdle - startMeasure.avgIdle
        const totalDifference = endMeasure.avgTotal - startMeasure.avgTotal
        const cpuPercentage = (10000 - Math.round(10000 * idleDifference / totalDifference)) / 100

        return resolve(cpuPercentage)
      }, interval)
    })
  },
  free: (interval) => {
    if (!interval) {
      interval = bucket.options.INTERVAL
    }
    return new Promise((resolve) => {
      if (typeof interval !== 'number') {
        throw new TypeError('interval must be a number!')
      }
      this.usage(interval)
        .then(function (cpuPercentage) {
          return resolve(100 - cpuPercentage)
        })
    })
  },
  count: function () {
    // hulk /var/sankuai/hulk/core_num
    const hulkCoreConfig = '/var/sankuai/hulk/core_num'
    if (fs.existsSync(hulkCoreConfig)) {
      const content = fs.readFileSync(hulkCoreConfig, 'utf8').trim()
      return parseInt(content)
    }
    // use os cpus
    return os.cpus().length
  },
  model: function () {
    return os.cpus()[0].model
  },
  loadavg: function () {
    return os.loadavg()
  },
  loadavgTime: (time) => {
    time = parseInt(time, 10)

    const loads = os.loadavg()

    switch (time) {
      case 5:
        return loads[1]
      case 15:
        return loads[2]
      default: return loads[0]
    }
  }
}

module.exports = cpuUtils