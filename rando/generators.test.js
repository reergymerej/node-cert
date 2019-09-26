const { maybe } = require('./generators')

describe('maybe', () => {
  it('should execute if the condition is true', () => {
    const fn = jest.fn()
    const generator = function* () { fn() }
    const condition = true
    const iterator = maybe(generator, condition)
    iterator.next()
    expect(fn).toHaveBeenCalled()
  })

  it('should not execute if the condition is false', () => {
    const fn = jest.fn()
    const generator = function* () { fn() }
    const condition = false
    const iterator = maybe(generator, condition)
    iterator.next()
    expect(fn).not.toHaveBeenCalled()
  })

  it('should handle conditions as functions, true', () => {
    const fn = jest.fn()
    const generator = function* () { fn() }
    const condition = jest.fn(() => true)
    const iterator = maybe(generator, condition)
    iterator.next()
    expect(fn).toHaveBeenCalled()
  })

  it('should handle conditions as functions, false', () => {
    const fn = jest.fn()
    const generator = function* () { fn() }
    const condition = jest.fn(() => false)
    const iterator = maybe(generator, condition)
    iterator.next()
    expect(fn).not.toHaveBeenCalled()
  })

  it('should yield to the generator', () => {
    const fn = function* () {
      yield 1
      yield 2
      yield 3
      return 999
    }
    const condition = true
    const iterator = maybe(fn, condition)
    // start iterator
    let result = iterator.next()
    result = iterator.next()
    result = iterator.next()
    result = iterator.next()
    expect(result.done).toBe(true)
    expect(result.value).toBe(999)
  })
})
