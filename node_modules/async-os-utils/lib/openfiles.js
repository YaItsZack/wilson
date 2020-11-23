/**
 * author       : Sunil Wang
 * createTime   : 2017/7/10 10:26
 * description  :
 */
const bucket = require('./bucket')
const fs = require('fs')

const openfiles = {
  openFd: function () {
    return new Promise(function (resolve) {
      fs.readFile('/proc/sys/fs/file-nr', function (err, out) {
        if (err) {
          return resolve(bucket.options.NOT_SUPPORTED_VALUE)
        }

        let result = out.toString().replace(/\n/g, '').split(' ')[0]

        result = parseInt(result, 10)

        return resolve(result)
      })
    })
  }
}

module.exports = openfiles
