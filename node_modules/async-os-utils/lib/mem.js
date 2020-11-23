/**
 * author       : Sunil Wang
 * createTime   : 2017/7/9 21:49
 * description  :
 */
const bucket = require('./bucket')
const cp = require('child_process')
const os = require('os')

const mappings = {
  'Anonymous pages': 'app',
  'Pages wired down': 'wired',
  'Pages active': 'active',
  'Pages inactive': 'inactive',
  'Pages occupied by compressor': 'compressed'
}

const darwinMem = {
  PAGE_SIZE: 4096,
  physicalMemory: async () => {
    let res = await bucket.exec('sysctl hw.memsize')()
    res = res.trim().split(' ')[1]
    return parseInt(res)
  },
  vmStats: async () => {
    const ret = Object.create(null)
    const res = await bucket.exec('vm_stat')()
    let lines = res.split('\n')

    lines = lines.filter(x => x !== '')

    lines.forEach(x => {
      const parts = x.split(':')
      const key = parts[0]
      const val = parts[1].replace('.', '').trim()

      if (mappings[key]) {
        const k = mappings[key]
        ret[k] = val * darwinMem.PAGE_SIZE
      }
    })
    return ret
  },
  memory: async () => {
    const total = await darwinMem.physicalMemory()
    const stats = await darwinMem.vmStats()
    // This appears to be contested
    // not clear what apple is using for "Memory Used" in app
    const used = (stats.wired + stats.active + stats.inactive)
    return { used: used, total: total }
  }
}

const memUtils = {
  info: async () => {
      let totalMem = 0
      let freeMem = 0

      if (os.platform() === 'darwin') {
        const mem = await darwinMem.memory()
        totalMem = mem.total
        freeMem = mem.total - mem.used
      } else {
        await new Promise((resolve, reject) => {
          cp.exec('cat /proc/meminfo | head -5', (err, out) => {
            if (err || !out) {
              totalMem = os.totalmem() / 1024
              freeMem = os.freemem() / 1024
              resolve()
            } else {
              const resultMemory = (out.match(/\d+/g))
              totalMem = parseInt(resultMemory[0], 10) * 1024
              freeMem = (parseInt(resultMemory[1], 10) + parseInt(resultMemory[3], 10) + parseInt(resultMemory[4], 10)) * 1024
              resolve()
            }
          })
      })
    }

    const totalMemMb = parseFloat((totalMem / 1024 ** 2).toFixed(2))
    const usedMemMb = parseFloat(((totalMem - freeMem) / 1024 ** 2).toFixed(2))
    const freeMemMb = parseFloat((totalMemMb - usedMemMb).toFixed(2))
    const freeMemPercentage = parseFloat((100 * (freeMem / totalMem)).toFixed(2))

    return {
      totalMemMb: totalMemMb,
      usedMemMb: usedMemMb,
      freeMemMb: freeMemMb,
      freeMemPercentage: freeMemPercentage
    }
  },
  free: () => {
    return this.info().then(function (res) {
      return Promise.resolve({
        totalMemMb: res.totalMemMb,
        freeMemMb: res.freeMemMb
      })
    })
  },
  used: () => {
    return this.info().then(function (res) {
      return Promise.resolve({
        totalMemMb: res.totalMemMb,
        usedMemMb: res.usedMemMb
      })
    })
  },
  totalMem: () => {
    return os.totalmem()
  }
}


module.exports = memUtils