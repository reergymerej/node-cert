const { Writable, Readable } = require('stream')

let writeCount = 0

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    writeCount++
    const waitTime = writeCount * 1222
    console.log(`writing and waiting ${waitTime}`, chunk)
    setTimeout(() => {
      const err = null
      console.log('done with write')
      callback(err)
    }, waitTime)
  },
})

const readableStream = new Readable({
  read(size) {
    console.log(`reading ${size}`)
    const b = this.readableBuffer.head
    if (b) {
      const buffer = b.data
      console.log(buffer, buffer.length)
      console.log(buffer.toString())
    }
  },
})


setTimeout(() => {
  // The readable.push() method is intended be called only by Readable
  // implementers, and only from within the readable._read() method.
  readableStream.push('here is a  chunk')
}, 2000)

readableStream.on('readable', () => {
  console.log('readable')
})

readableStream.on('data', (chunk) => {
  console.log('new chunk', chunk)
})


const addStuff = () => {
  const stuff = `asdf ${Date.now()}\n`
  console.log('calling write')
  const result = writableStream.write(stuff)
}

const max = 5
// Add to the writable stream at a constant rate, spaced out.
for (let i = 0; i < max; i++) {
  // setTimeout(addStuff, i * 1000)
}
