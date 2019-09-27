const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const values = CHARS.split('').reduce((acc, value, i) => {
  return {
    ...acc,
    [i]: value,
  }
}, {})


const getIntEncoder = (series) => {
  const values = series.split('').reduce((acc, value, i) => {
    return {
      ...acc,
      [i]: value,
    }
  }, {})

  const encoder = (int) => {
    const base = series.length
    if (int < base) {
      return values[int]
    } else {
      const left = encoder(Math.floor(int / base))
      const right = encoder(int % base)
      return `${left}${right}`
    }
  }

  encoder.radix = series.length
  encoder.series = series
  return encoder
}

const toBase62 = getIntEncoder(CHARS)

module.exports = {
  fromInt: toBase62,
  getIntEncoder,
}
