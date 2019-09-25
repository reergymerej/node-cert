const app = require('./')
const fs = require('fs')
const request = require('supertest')

const binaryParser = (res, done) => {
  res.setEncoding('binary')
  res.data = ''
  res.on('data', (chunk) => {
    return res.data += chunk
  })
  res.on('end', () => {
    const buffer = Buffer.from(res.data, 'binary')
    return done(null, buffer)
  })
}

describe('when no file is specified', () => {
  it('should return a 404', async () => {
    await request(app)
      .get('/')
      .expect(404)
      .expect('')
  })
})

describe('when an invalid file is specified', () => {
  it('should return a 404', async () => {
    await request(app)
      .get('/bananas.boop')
      .expect(404)
      .expect('')
  })
})

describe('when a valid file is specified', () => {
  it('should return the file', async () => {
    await request(app)
      .get('/wink.txt')
      .expect(200)
      .expect(fs.readFileSync('public/wink.txt', 'utf8'))
  })
})

describe('binary files', () => {
  it('should return binary files too', async () => {
    await request(app)
      .get('/ladybug.jpg')
      .expect(200)
      .buffer(true)
      .parse(binaryParser)
      .then((response) => {
        const buffer = response.res.data
        expect(buffer.toString()).toBe(fs.readFileSync('public/ladybug.jpg', 'binary'))
      })
  })
})
