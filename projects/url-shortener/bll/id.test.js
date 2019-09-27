const id = require('./id')

describe('id', () => {
  const cases = [
    [ 1, '1' ],
    [ 10, 'a' ],
    [ 11, 'b' ],
    [ 36, 'A' ],
    [ 61, 'Z' ],
    [ 62, '10' ],
    [ 63, '11' ],
    [ 124, '20' ],
    [ 125, '21' ],
    [ 619, '9Z' ],
    [ 620, 'a0' ],
  ]

  it.each(cases)('should convert %i to %s', (int, expected) => {
    expect(id.fromInt(int)).toBe(expected)
  })
})

describe('getIntEncoder', () => {
  it('should reveal its radix', () => {
    const encoder = id.getIntEncoder('asdf')
    expect(encoder.radix).toBe(4)
  })

  it('should reveal its series', () => {
    const series = 'asdfqwer1234-xy'
    const encoder = id.getIntEncoder(series)
    expect(encoder.series).toBe(series)
  })

  it('should handle base62', () => {
    const series = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const encoder = id.getIntEncoder(series)
    expect(encoder.radix).toBe(62)
    expect(encoder(620)).toBe('a0')
  })

  describe('012abc', () => {
    const encoder = id.getIntEncoder('012abc')
    it.each`
      int | expected
      ${0}  | ${'0'}
      ${1}  | ${'1'}
      ${2}  | ${'2'}
      ${3}  | ${'a'}
      ${4}  | ${'b'}
      ${5}  | ${'c'}
      ${6}  | ${'10'}
    `('returns $expected for $int', ({ int, expected }) => {
      expect(encoder(int)).toBe(expected)
    })
  })

  describe('abc987', () => {
    const encoder = id.getIntEncoder('abc987')
    it.each`
      int | expected
      ${0}  | ${'a'}
      ${1}  | ${'b'}
      ${2}  | ${'c'}
      ${3}  | ${'9'}
      ${4}  | ${'8'}
      ${5}  | ${'7'}
      ${6}  | ${'ba'}
    `('returns $expected for $int', ({ int, expected }) => {
      expect(encoder(int)).toBe(expected)
    })
  })
})
