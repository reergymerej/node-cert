// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

function* fooGenerator() {
  console.log('generator running')

  console.log('yielding for one')
  const one = yield 'This is the value that was yielded.'
  console.log('back in the iterator, one is', one)

  return one
}

// Calling a generator function does not execute its body immediately; an
// iterator object for the function is returned instead.
// console.log('creating iterator')
// const iterator = fooGenerator()

// set one
// Run to first yield.
// console.log('starting iteration')
// let result = iterator.next()
// console.log('after next', result)

// The iterator returned a value for us.  We need to send something back in.
// result = iterator.next(111)
// console.log(result)


const barGenerator = function* () {

}

const maybe = function* (generator, condition) {
  const result = (typeof condition === 'function')
    ? condition()
    : condition
  if (result) {
    return yield* generator()
  }
}

module.exports = {
  maybe,
}
