const {getSeriesEncoder, getSeriesDecoder} = require('custom-numeral-system')
const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const encode = getSeriesEncoder(CHARS)
const decode = getSeriesDecoder(CHARS)

module.exports = {
  encode,
  decode,
}
