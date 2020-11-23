/**
 * author       : Sunil Wang
 * createTime   : 2017/7/9 18:29
 * description  :
 */

const bucket = require('./lib/bucket')

bucket._setModule('cpu')
bucket._setModule('mem')
bucket._setModule('osCmd')
bucket._setModule('os')
bucket._setModule('proc')
bucket._setModule('drive')
bucket._setModule('netstat')
bucket._setModule('openfiles')
bucket._setModule('users')

module.exports = bucket
