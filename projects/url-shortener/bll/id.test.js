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
