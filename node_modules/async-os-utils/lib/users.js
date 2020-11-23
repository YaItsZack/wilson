/**
 * author       : Sunil Wang
 * createTime   : 2017/7/10 10:17
 * description  :
 */
const bucket = require('./bucket')

module.exports = {
  openedCount: function () {
    return bucket.exec('who | grep -v localhost | wc -l')()
      .then(function (count) {
        return Promise.resolve(parseInt(count, 10))
      })
      .catch(function () {
        return Promise.resolve(bucket.options.NOT_SUPPORTED_VALUE)
      })
  }
}
