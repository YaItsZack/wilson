/**
 * author       : Sunil Wang
 * createTime   : 2017/7/10 10:36
 * description  :
 */
const bucket = require('./bucket')
const cp = require('child_process')
const fs = require('fs')
const os = require('os')

const originalOperatingSystem = {
  checkLastResort: () => {
    return new Promise(function (resolve) {
      cp.exec('uname -sr', { shell: true }, function (err, out) {
        if (err && !out) {
          return resolve(bucket.options.NOT_SUPPORTED_VALUE)
        }
        return resolve(out)
      })
    })
  },
  darwin: () => {
    return new Promise(function (resolve) {
      cp.exec('sw_vers', { shell: true }, function (err, out) {
        if (err && !out) {
          return originalOperatingSystem.checkLastResort().then(resolve)
        }
        const version = out.match(/[\n\r].*ProductVersion:\s*([^\n\r]*)/)[1]
        const distribution = out.match(/.*ProductName:\s*([^\n\r]*)/)[1]
        const resultOs = distribution + ' ' + version
        return resolve(resultOs)
      })
    })
  },
  linux: () => {
    // Debian, Ubuntu, CentOS
    return new Promise(function (resolve) {
      fs.readFile('/etc/issue', function (err, out) {
        if (err) {
          return originalOperatingSystem.checkLastResort(resolve)
        }
        out = out.toString()
        var version = out.match(/[\d]+(\.[\d][\d]?)?/)

        if (version !== null) {
          version = version[0]
        }
        var distribution = out.match(/[\w]*/)[0]

        if (version !== null && distribution !== null) {
          var resultOs = distribution + ' ' + version
          return resolve(resultOs)
        } else if (distribution !== null && distribution !== '') {
          return resolve(distribution)
        } else if (version === null) {
          fs.readFile('/etc/redhat-release', function (err, out) {
            if (err) {
              return originalOperatingSystem.checkLastResort(resolve)
            }

            out = out.toString()
            version = out.match(/[\d]+(\.[\d][\d]?)?/)

            if (version !== null) {
              version = version[0]
            }

            var resultOs = 'Red Hat ' + version
            return resolve(resultOs)
          })
        }
      })
    })
  }
}

const osUtils = {
  oos: () => {
    const platform = os.platform()

    if (platform === 'linux') {
      return originalOperatingSystem.linux()
    }

    if (platform === 'darwin') {
      return originalOperatingSystem.darwin()
    }

    return originalOperatingSystem.checkLastResort()
  },
  platform: () => {
    return os.platform()
  },
  uptime: () => {
    // seconds
    return os.uptime()
  },
  ip: () => {
    const platform = os.platform()
    const interfaces = os.networkInterfaces()
    let ip = ''
    let i = 0

    if (platform === 'linux') {
      for (i = 0; i < interfaces.eth0.length; i++) {
        if (os.networkInterfaces().eth0[i].family === 'IPv4') {
          ip = os.networkInterfaces().eth0[i].address
          break
        }
      }

      return ip
    }

    if (platform === 'darwin') {
      for (i = 0; i < interfaces.en0.length; i++) {
        if (os.networkInterfaces().en0[i].family === 'IPv4') {
          ip = os.networkInterfaces().en0[i].address
          break
        }
      }

      return ip
    }

    for (i in interfaces) {
      var item = interfaces[i]
      for (var j in item) {
        if (item[j]['internal'] === false && item[j]['family'] === 'IPv4') {
          ip = item[j]['address']
          break
        }
      }
    }

    return ip
  },
  hostname: () => {
    return os.hostname()
  },
  type: () => {
    return os.type()
  },
  arch: () => {
    return os.arch()
  }
}

module.exports = osUtils
