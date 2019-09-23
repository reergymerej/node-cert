const { Writable } = require('stream')

class MyWritable extends Writable {
  constructor(options) {
    super(options)
  }

  _write(chunk, encoding, callback) {
    console.log('writing', chunk)
    setTimeout(() => {
      const error = null
      callback(error)
    }, 1000)
  }
}

const w = new MyWritable()

console.log('writing a')
w.write('a')
console.log(w.writableBuffer)

console.log('writing b')
w.write('b')
console.log(w.writableBuffer)

console.log('writing c')
w.write('c')
console.log(w.writableBuffer)
