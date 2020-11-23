/**
 * author       : Sunil Wang
 * createTime   : 2017/7/10 14:31
 * description  :
 */
const bucket = require('./bucket')
const cp = require('child_process')
const os = require('os')

const proc = {
  totalProcesses: function () {
    return new Promise(function (resolve) {
      cp.exec("top -bn1 | awk 'NR > 7 && $8 ~ /R|S|D|T/ { print $12 }'",
        { shell: true },
        async function (err, out, stderr) {
          if (err || !out) {
            if (os.platform() === 'darwin') {
              const nb = await bucket.exec('ps -A')()
              nb = nb.toString().split('\n')
              return resolve(nb.length)
            }
            return resolve(bucket.options.NOT_SUPPORTED_VALUE)
          }

          const resultProc = (out.split('\n')).length - 1

          return resolve(resultProc)
        })
    })
  },
  zombieProcesses: function () {
    return new Promise(function (resolve) {
      cp.exec("top -bn1 | awk 'NR > 7 && $8 ~ /Z/ { print $12 }'", { shell: true }, function (err, out, stderr) {
        if (err || stderr) {
          return resolve(bucket.options.NOT_SUPPORTED_VALUE)
        }
        var resultZombie = (out.split('\n')).length - 1

        return resolve(resultZombie)
      })
    })
  }
}

module.exports = proc
