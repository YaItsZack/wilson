/* eslint-disable no-undef */
/**
 * author       : Sunil Wang
 * createTime   : 2017/7/10 14:51
 * description  :
 */

const assert = require('assert')
const path = require('path')
const osu = require('../')

describe('cpu', function () {
  it('returns cpu average and count', function (done) {
    this.timeout(5000)

    var cpu = osu.cpu
    var info = cpu.average()
    var count = cpu.count()
    assert.ok(count > 0)
    assert.ok(Object.keys(info).length > 0)
    done()
  })

  it('returns cpu average and count polyfill', function (done) {
    this.timeout(5000)

    var cpu = osu.cpu
    var info = cpu.average(true)
    var count = cpu.count()
    assert.ok(count > 0)
    assert.ok(Object.keys(info).length > 0)
    done()
  })

  it('returns cpu usage', function (done) {
    this.timeout(5000)

    var cpu = osu.cpu

    cpu.usage().then(num => {
      assert.ok(num > 0)
      done()
    })
  })

  it('returns os.cpus polyfill', async function () {
    const procPath = path.resolve(__dirname, './fixtures/stat')
    const result = await osu.cpu.cpus(procPath)
    assert.deepStrictEqual(result[0], {
      model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz MOCK',
      speed: 2200,
      times: { user: 636488, nice: 163, sys: 15612524, idle: 191243694, irq: 0 }
    })
  })
  it('returns os.cpus polyfill sync', function () {
    const procPath = path.resolve(__dirname, './fixtures/stat')
    const result = osu.cpu.cpusSync(procPath)
    assert.deepStrictEqual(result[0], {
      model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz MOCK',
      speed: 2200,
      times: { user: 636488, nice: 163, sys: 15612524, idle: 191243694, irq: 0 }
    })
  })
})

describe('mem', function () {
  it('returns mem info', function (done) {
    var mem = osu.mem
    mem.info().then(info => {
      assert.ok(Object.keys(info).length > 0)
      done()
    })
  })
})

describe('drive', function () {
  it('returns drive info', function (done) {
    var drive = osu.drive

    drive.info().then(info => {
      assert.ok(Object.keys(info).length > 0)
      done()
    })
  })
})

describe('netstat', function () {
  it('returns stats', function (done) {
    const netstat = osu.netstat
    netstat.stats().then(info => {
      assert.ok(Object.keys(info).length > 0)
      done()
    })
  })
})

describe('os', function () {
  it('returns ip', function () {
    const ip = osu.os.ip()
    assert.ok(ip)
  })
  it('returns hostname', function () {
    const result = osu.os.hostname()
    assert.ok(result)
  })
})
