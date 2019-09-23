const fs = require('fs')

const name = 'big-ass-file.txt'

// returns fs.WriteStream (extends stream.Writable)
const stream = fs.createWriteStream(name, {
  emitClose: true,
})

const events = [
  'close',
  'drain',
  'error',
  'finish',
  'open',
  'pipe',
  'ready',
  'unpipe',
]

events.map((item) => {
  stream.on(item, () => {
    console.log(item)
  })
})


let i = 5e6
// let data = ''
while (i--) {
  stream.write('asdf')
  // data += 'asdf'
}
// fs.writeFileSync(name, data)
