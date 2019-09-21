const string = 'hello 🤔'
const encodings = [
  'ascii',
  'base64',
  'binary',
  'hex',
  'latin1',
  'ucs2',
  'utf16le',
  'utf8',
]

encodings.map((encodeAs) => {
  const buffer = Buffer.from(string, encodeAs)
  encodings.map((decodeAs) => {
    console.log({encodeAs, decodeAs},
      buffer.toString(decodeAs))
  })
})

