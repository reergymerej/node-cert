const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const reduceKeyToValue = (acc, value, i) => ({
  ...acc,
  [i]: value,
})

const reduceValueToKey = (acc, value, i) => ({
  ...acc,
  [value]: i,
})

const getEncoderForSeries = (series) => {
  const values = series.split('').reduce(reduceKeyToValue, {})
  return function encoder(int) {
    const base = series.length
    if (int < base) {
      return values[int]
    } else {
      const left = encoder(Math.floor(int / base))
      const right = encoder(int % base)
      return `${left}${right}`
    }
  }
}

const getIntEncoder = (series) => {
  const encoder = getEncoderForSeries(series)
  encoder.radix = series.length
  encoder.series = series
  return encoder
}

const toBase62 = getIntEncoder(CHARS)

const getDecoderReducerForSeries = (series) => (acc, value, i) => {
  const positionFactor = Math.max(1, i * series.length)
  return acc + (series.indexOf(value) * positionFactor)
}

const getSeriesDecoder = (series) => {
  const values = series.split('').reduce(reduceValueToKey, {})
  const reducer = getDecoderReducerForSeries(series)
  return (string) => string.split('')
    .reverse()
    .reduce(reducer, 0)
}

module.exports = {
  fromInt: toBase62,
  getIntEncoder,
  getSeriesDecoder,
}
