/**
 * author       : Sunil Wang
 * createTime   : 2017/7/9 19:24
 * description  :
 */
/**
 * update by    : awe
 * createTime   : 2019/08/19
 * description  :
 */
const cp = require('child_process')

const bucket = {
  options: {
    NOT_SUPPORTED_VALUE: 'not supported',
    INTERVAL: 1000
  },
  _setModule (name) {
    Object.defineProperty(bucket, name, {
      get: () => {
        return require(`./${name}`)
      }
    })
  },
  exec: function (command) {
    var self = this

    return function () {
      return new Promise(function (resolve) {
        cp.exec(command, { shell: true }, function (err, stdout, stderr) {
          if (err || !stdout) {
            return resolve(self.options.NOT_SUPPORTED_VALUE)
          }
          return resolve(stdout)
        })
      })
    }
  }
}

module.exports = bucket
