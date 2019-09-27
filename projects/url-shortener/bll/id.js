const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const values = CHARS.split('').reduce((acc, value, i) => {
  return {
    ...acc,
    [i]: value,
  }
}, {})

const toBase62 = int => {
  const BASE = CHARS.length
  if (int < BASE) {
    return values[int]
  } else {
    const left = toBase62(Math.floor(int / BASE))
    const right = toBase62(int % BASE)
    return `${left}${right}`
  }
}

module.exports = {
  fromInt: toBase62,
}
